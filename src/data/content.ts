import {
  ArrowUpRight,
  BarChart3,
  Database,
  FileSearch,
  LineChart,
  Timer,
  UploadCloud,
} from "lucide-react";
import type {
  Capability,
  EducationItem,
  ExperienceItem,
  FaqItem,
  NavItem,
  Project,
  Stat,
  Step,
} from "../types";

export const site = {
  name: "Sergio Arancibia",
  role: "Analista de Datos",
  credentials: "Ingeniero Estadístico · MSc Bioestadística · MSc Data Science",
  location: "Santiago, Chile",
  email: "ser.arancibia@gmail.com",
  // versión visible (obfuscar @ para que no lo raspéen buscadores/spam)
  emailDisplay: "ser.arancibia(a)gmail.com",
};

export const navItems: NavItem[] = [
  { label: "Qué hago", href: "#que-hago" },
  { label: "Trayectoria", href: "#trayectoria" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Cómo trabajo", href: "#como-trabajo" },
  { label: "Preguntas", href: "#preguntas" },
];

export const hero = {
  badge: "Disponible para nuevos proyectos",
  titleLine1: "Tus datos, de crudos a",
  titleHighlight: "decisiones confiables.",
  subtitle:
    "Limpio, analizo y automatizo información con Stata y Python. Dashboards interactivos que te dicen qué está pasando — sin esperar al cierre de trimestre.",
  ctaPrimary: { label: "Ver proyectos", href: "#proyectos" },
  ctaSecondary: { label: "Hablemos", href: "#contacto" },
};

export const capabilities: Capability[] = [
  {
    icon: Database,
    title: "Limpieza y validación",
    description:
      "Datos crudos con campos faltantes, duplicados e inconsistencias. Los dejo listos para analizar, documentando cada regla aplicada.",
  },
  {
    icon: LineChart,
    title: "Análisis estadístico",
    description:
      "Stata para lo que exige rigor: regresiones, series temporales y pruebas de hipótesis sobre datos panel.",
  },
  {
    icon: BarChart3,
    title: "Dashboards interactivos",
    description:
      "Python + Streamlit: paneles vivos que tu equipo filtra y explora solo, sin pedirle un Excel a nadie.",
  },
  {
    icon: Timer,
    title: "Automatización de reportes",
    description:
      "Pipelines programados que corren solas cada semana o mes. El reporte llega antes de que preguntes por él.",
  },
];

export const projects: Project[] = [
  {
    title: "Rastreador automático de precios",
    tagline: "Scrapers + alertas automáticas",
    description:
      "Sistema que rastrea el precio de un catálogo de productos en varios sitios de comercio electrónico, detecta cambios relevantes por categoría y dispara alertas cuando se supera el umbral definido.",
    tech: ["Python", "Playwright", "Streamlit"],
    metric: "Catálogo completo verificado a cada actualización",
  },
  {
    title: "Panel de seguimiento de tareas",
    tagline: "Streamlit + Excel en vivo",
    description:
      "Dashboard para dar seguimiento del estado de tareas y observaciones entre equipos, con filtros por categoría y datos cargados automáticamente desde un registro maestro.",
    tech: ["Python", "Pandas", "Streamlit"],
    metric: "Estado de cada tarea visible en tiempo real",
  },
  {
    title: "Auditoría de datos panel",
    tagline: "Stata + detección automática",
    description:
      "Rutinas que validan bases grandes registro a registro: campos faltantes, duplicados e inconsistencias entre periodos, con un informe de hallazgos listo para compartir.",
    tech: ["Stata", "Python"],
    metric: "Bases completas revisadas antes de entregar",
  },
];

export const experience: ExperienceItem[] = [
  {
    title: "Dirección de Presupuesto",
    org: "Ministerio de Hacienda",
    period: "Jul 2014 — hoy",
    current: true,
    description:
      "Subdirección de Racionalización y Función Pública: diseño y rediseño de instrumentos de captación de información de personal desde los servicios públicos, validación, corrección y sistematización de la información recopilada, y procesamiento de requerimientos estandarizados y no estandarizados.",
  },
  {
    title: "Estudios Previsionales",
    org: "Subsecretaría de Previsión Social",
    period: "May — Jun 2014",
    description:
      "Análisis actuarial para la formulación de estudios previsionales del sistema de seguridad social.",
  },
  {
    title: "División de Prospectiva y Política Energética",
    org: "Ministerio de Energía",
    period: "Mar 2013 — Mar 2014",
    description:
      "Actualización del inventario nacional de gases de efecto invernadero para el sector energía (UNFCCC), junto con asesoría técnica en estadísticas y proyecciones a las distintas divisiones del ministerio.",
  },
  {
    title: "Dirección de Presupuesto",
    org: "Ministerio de Hacienda",
    period: "Jun 2010 — Mar 2013",
    description:
      "Manejo y análisis de información estadística y bases de datos para estimaciones de gasto fiscal y elaboración de reportes estadísticos en el área de protección social.",
  },
  {
    title: "Analista Estadístico",
    org: "Instituto Nacional de Estadísticas (INE)",
    period: "Jun 2008 — May 2010",
    description:
      "Departamento de proyectos de estadísticas económicas.",
  },
];

export const education: EducationItem[] = [
  {
    degree: "Magíster en Data Science",
    school: "Universidad del Desarrollo",
    years: "2019 — 2020",
  },
  {
    degree: "Diplomatura en Big Data",
    school: "Universidad del Desarrollo",
    years: "2019 — 2020",
  },
  {
    degree: "Diplomatura en Data Science",
    school: "Universidad del Desarrollo",
    years: "2019",
  },
  {
    degree: "Diploma en Técnicas Actuariales Aplicadas a la Seguridad Social",
    school: "Universidad de Chile",
    years: "2010",
  },
  {
    degree: "Magíster en Bioestadística",
    school: "Universidad de Chile",
    years: "2006 — 2008",
  },
  {
    degree: "Ingeniero Estadístico",
    school: "Universidad de Valparaíso",
    years: "2000 — 2006",
  },
];

export const steps: Step[] = [
  {
    icon: UploadCloud,
    title: "Me compartes los datos",
    description:
      "CSV, Excel o bases crudas. Defino juntos qué preguntas debes poder responder con ellas.",
  },
  {
    icon: FileSearch,
    title: "Limpio y valido",
    description:
      "Detección de faltantes, duplicados e inconsistencias, con el registro completo de cada corrección aplicada.",
  },
  {
    icon: BarChart3,
    title: "Analizo y visualizo",
    description:
      "Análisis en Stata o Python según lo que exija la pregunta. Resultados en dashboards interactivos o reportes claros.",
  },
  {
    icon: ArrowUpRight,
    title: "Automatizamos el seguimiento",
    description:
      "Si el dato se repite en el tiempo, programo el pipeline para que el panel se actualice solo. Tú solo miras resultados.",
  },
];

export const stats: Stat[] = [
  { value: "6+", label: "años analizando datos" },
  { value: "20+", label: "proyectos de datos entregados" },
  { value: "3", label: "dashboards en producción" },
  { value: "100%", label: "de los hallazgos documentados" },
];

export const faqItems: FaqItem[] = [
  {
    question: "¿Qué formatos de datos trabajas?",
    answer:
      "CSV, Excel y bases exportadas desde cualquier sistema. Si tu dato vive en un ERP o en una API, también puedo conectarlo directamente.",
  },
  {
    question: "¿Stata o Python? ¿Cuál usarás?",
    answer:
      "Depende de la pregunta. Stata cuando el análisis exige rigor estadístico (panel, series temporales). Python para limpieza a gran escala, automatización y dashboards. A veces los dos en el mismo proyecto.",
  },
  {
    question: "¿El dashboard queda funcionando después?",
    answer:
      "Sí. Entrego código documentado y el panel corriendo en un servidor o contenedor, con instrucciones para actualizarlo sin tocar una línea de código.",
  },
  {
    question: "¿Trabajas a distancia?",
    answer:
      "Totalmente. Vivo en Santiago (Chile) y trabajo con equipos de Chile y resto de Latinoamérica por videollamada. También puedo viajar cuando hace falta.",
  },
];

export const contact = {
  heading: "Tienes datos que deberían responder algo",
  subheading:
    "Cuéntame qué estás intentando resolver. Respondo en menos de 24 horas hábiles.",
};

export const footer = {
  blurb:
    "Analista de datos en Santiago, Chile. Stata para el análisis, Python para todo lo demás.",
  navHeading: "Secciones",
  contactHeading: "Contacto",
  copyright: `© ${new Date().getFullYear()} Sergio Arancibia. Todos los derechos reservados.`,
};
