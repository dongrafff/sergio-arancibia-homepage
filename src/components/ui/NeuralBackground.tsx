import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  violet: boolean;
}

interface Pulse {
  a: number; // índice del nodo origen
  b: number; // índice del nodo destino
  t: number; // progreso 0..1
  speed: number;
}

const MAX_LINK = 150; // px — distancia máxima para trazar una conexión
const MOUSE_RADIUS = 170; // px — influencia sutil del cursor

/** Red neuronal de fondo: nodos a la deriva, conexiones y pulsos de datos.
 *  Canvas fijo detrás de todo el contenido (aria-hidden, muy discreto). */
export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    let lastPulseAt = 0;
    const mouse = { x: -9999, y: -9999 };

    // Colores leídos de los tokens CSS (respetan el tema activo).
    let teal = "0, 212, 170";
    let violet = "124, 92, 255";
    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      const parse = (v: string) => {
        const m = v.trim().match(/^#([0-9a-f]{6})$/i);
        if (!m) return null;
        const n = parseInt(m[1], 16);
        return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
      };
      const t = parse(cs.getPropertyValue("--accent"));
      if (t) teal = t;
      const v = parse(cs.getPropertyValue("--accent-2"));
      if (v) violet = v;
    };

    const spawnNodes = () => {
      const count = Math.min(90, Math.floor((width * height) / 26000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: 1 + Math.random() * 1.4,
        violet: Math.random() < 0.16,
      }));
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      spawnNodes();
    };

    const drawFrame = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Movimiento de nodos (rebote en bordes).
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20) n.x = width + 20;
        else if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        else if (n.y > height + 20) n.y = -20;
      }

      // Conexiones entre nodos cercanos.
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > MAX_LINK * MAX_LINK) continue;
          const alpha = (1 - Math.sqrt(d2) / MAX_LINK) * 0.22;
          ctx.strokeStyle = `rgba(${a.violet || b.violet ? violet : teal}, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }

        // Conexión sutil al cursor.
        const mdx = a.x - mouse.x;
        const mdy = a.y - mouse.y;
        const md2 = mdx * mdx + mdy * mdy;
        if (md2 < MOUSE_RADIUS * MOUSE_RADIUS) {
          const alpha = (1 - Math.sqrt(md2) / MOUSE_RADIUS) * 0.3;
          ctx.strokeStyle = `rgba(${teal}, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      // Nodos (partículas estables).
      for (const n of nodes) {
        ctx.fillStyle = `rgba(${n.violet ? violet : teal}, ${n.violet ? 0.65 : 0.5})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Pulsos de datos viajando por las conexiones (muy discretos).
      if (time - lastPulseAt > 750 && pulses.length < 3) {
        const i = Math.floor(Math.random() * nodes.length);
        let best = -1;
        let bestD = Infinity;
        for (let j = 0; j < nodes.length; j++) {
          if (j === i) continue;
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < MAX_LINK * MAX_LINK && d2 < bestD) {
            bestD = d2;
            best = j;
          }
        }
        if (best >= 0) {
          pulses.push({ a: i, b: best, t: 0, speed: 0.008 + Math.random() * 0.006 });
          lastPulseAt = time;
        }
      }

      ctx.lineWidth = 1.2;
      for (const p of pulses) {
        const a = nodes[p.a];
        const b = nodes[p.b];
        if (!a || !b) continue;
        // Si los nodos ya no están conectados, el pulso muere.
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        if (dx * dx + dy * dy > MAX_LINK * MAX_LINK * 1.2) {
          p.t = 1;
        } else {
          const x = a.x + (b.x - a.x) * p.t;
          const y = a.y + (b.y - a.y) * p.t;
          ctx.fillStyle = `rgba(${teal}, ${0.55 * Math.sin(p.t * Math.PI)})`;
          ctx.beginPath();
          ctx.arc(x, y, 1.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      pulses = pulses.filter((p) => p.t < 1).map((p) => ({ ...p, t: p.t + p.speed }));
    };

    const loop = (time: number) => {
      drawFrame(time);
      raf = requestAnimationFrame(loop);
    };

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reducedMotion.matches) {
        raf = requestAnimationFrame(loop);
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    // Si el usuario prefiere menos movimiento: un fotograma estático.
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    readColors();
    resize();
    if (reducedMotion.matches) {
      drawFrame(0);
    } else {
      raf = requestAnimationFrame(loop);
    }

    // Re-leer colores cuando cambie el tema (.dark / .light en <html>).
    const themeObserver = new MutationObserver(readColors);

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      cancelAnimationFrame(raf);
      themeObserver.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("mousemove", onMouseMove);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      {/* Brillo radial muy sutil en las esquinas, en los acentos de la marca */}
      <div className="absolute inset-0 [background:radial-gradient(60%_45%_at_78%_-5%,var(--accent-2-soft),transparent_70%),radial-gradient(55%_40%_at_12%_110%,var(--accent-soft),transparent_70%)]" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
