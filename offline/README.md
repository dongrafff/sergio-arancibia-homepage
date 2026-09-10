# Copia offline de la Homepage (13 Homepage)

Copia autocontenida del build (`dist/`) pensada para revisarse **sin internet**:

- `index.html` — el sitio con el JS del bundle **incrustado dentro** (así evita el bloqueo CORS de módulos ES bajo protocolo `file://`, que es lo que rompía la primera copia).
- `assets/fonts.css` — fuentes Inter y JetBrains Mono incrustadas en base64, sin depender de Google Fonts.
- `assets/index-cTLyBa5K.css` — CSS del build (rutas relativas, funciona con doble clic).

Verificado el 2026-08-28 con Chromium headless contra `file://`: cero errores de consola, cero peticiones externas y tipografías cargadas.

## Cómo abrirla

Doble clic en **index.html** — o arrástrala a cualquier navegador.
También puedes servir la carpeta: `npx serve offline` y entrar al puerto que indique.

## Nota

El código fuente está en `..\src` (este proyecto). Para regenerar esta copia tras
cambiar el código, ejecuta `npm run build` en la raíz del proyecto y vuelve a copiar
`dist/` aquí. Fecha de esta copia: 2026-08-28.
