import Link from "next/link";

import {
  CalendarIcon,
  SettingsIcon,
  UsersIcon,
} from "@/components/dashboard/dashboard-icons";

function Arrow() {
  return <span aria-hidden="true">→</span>;
}

/* ---------- Inline icons (kept local to avoid touching dashboard-icons.tsx) ---------- */

function ClipboardIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="5" y="3.5" width="10" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7.5 3.5V3a2.5 2.5 0 0 1 5 0v.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7.5 9h5M7.5 12h5M7.5 15h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function NoteIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M5 3.5h7l3 3V16a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V4a.5.5 0 0 1 .5-.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M7 9h6M7 12h6M7 6.5h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M10 3.5c-2.2 0-3.6 1.7-3.6 4v2.3c0 .5-.2 1-.6 1.4L5 12.5h10l-.8-1.3a2 2 0 0 1-.6-1.4V7.5c0-2.3-1.4-4-3.6-4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8.5 15a1.5 1.5 0 0 0 3 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function SyncIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4.5 9a5.5 5.5 0 0 1 9.3-3.9l1.2 1.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M15.5 11a5.5 5.5 0 0 1-9.3 3.9l-1.2-1.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14.6 3.8v2.6H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.4 16.2v-2.6H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M10 3.5a6 6 0 0 0-5.1 9.1L4 16.5l4-1a6 6 0 1 0 2-12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M7.2 9h5.6M7.2 11.5h3.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="6" y="2.5" width="8" height="15" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 15h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* ---------- Content ---------- */

const VALUE_PILLARS = [
  ["Agenda", CalendarIcon],
  ["Citas", ClipboardIcon],
  ["Pacientes", UsersIcon],
  ["Consultas", NoteIcon],
] as const;

const FEATURES = [
  [
    "Agenda",
    CalendarIcon,
    "Visualiza tu semana de un vistazo y evita cruces de horarios.",
  ],
  [
    "Citas",
    ClipboardIcon,
    "Registra, confirma y reprograma sin ir y venir por mensajes.",
  ],
  [
    "Pacientes",
    UsersIcon,
    "Ten el historial de cada persona a la mano, siempre organizado.",
  ],
  [
    "Consultas",
    NoteIcon,
    "Lleva un registro claro de cada consulta realizada.",
  ],
  [
    "Recordatorios",
    BellIcon,
    "Tus pacientes reciben aviso de su cita, sin que tengas que escribirles.",
  ],
  [
    "Google Calendar",
    SyncIcon,
    "Tu agenda se mantiene sincronizada con el calendario que ya usas.",
  ],
  [
    "WhatsApp",
    ChatIcon,
    "Recibe y confirma citas directamente desde WhatsApp.",
  ],
] as const;

const STEPS = [
  ["01", "Configura tus horarios", "Define tu disponibilidad y cómo quieres recibir citas."],
  ["02", "Registra pacientes y consultas", "Mantén la información de cada persona en un solo lugar."],
  ["03", "Administra tus citas", "Confirma, reprograma o cancela sin depender de mensajes sueltos."],
  ["04", "Recibe confirmaciones automáticas", "Recordatorios y avisos se envían sin que tengas que hacerlo tú."],
] as const;

const SPECIALTIES = [
  "Medicina general",
  "Odontología",
  "Psicología",
  "Nutrición",
  "Fisioterapia",
] as const;

const PROBLEM_MESSAGES = [
  "¿A qué hora tienes disponibilidad?",
  "¿Me puedes cambiar la cita?",
  "Déjame revisar mi calendario…",
  "¿Todavía hay espacio mañana?",
] as const;

export default function LandingPage() {
  return (
    <main className="landing">
      {/* Hero */}
      <section className="landing-hero">
        <p className="landing-kicker">
          <i /> Software de agenda para profesionales independientes
        </p>
        <h1>Organiza tus citas sin perder el control de tu día.</h1>
        <p className="landing-hero-copy">
          Agenda, pacientes, consultas, recordatorios y WhatsApp — todo en un
          solo lugar, para que dejes de administrar tu consultorio a mano.
        </p>
        <div className="landing-cta-group">
          <Link href="/register" className="submit-button landing-cta">
            <span>Crear mi cuenta</span>
            <Arrow />
          </Link>
          <a href="#como-funciona" className="landing-secondary-cta">
            Ver cómo funciona
          </a>
        </div>
        <p className="landing-helper">
          Empieza con una cuenta gratuita. Sin tarjeta de crédito.
        </p>
      </section>

      {/* Product preview */}
      <section className="landing-showcase" id="producto">
        <div className="section-heading">
          <p className="section-label">ENTORNO DE TRABAJO</p>
          <h2>Una jornada ordenada, en tiempo real.</h2>
        </div>
        <div className="product-preview">
          <div className="preview-top">
            <strong>Tu agenda de hoy</strong>
            <span className="preview-live">
              <i /> Disponible para reservar
            </span>
          </div>
          <div className="preview-metrics">
            <span>
              <small>Próxima cita</small>
              <b>09:30 · Mariana</b>
            </span>
            <span>
              <small>Hoy</small>
              <b>4 citas</b>
            </span>
            <span>
              <small>Por confirmar</small>
              <b>1 pendiente</b>
            </span>
          </div>
          <div className="preview-body">
            <div className="preview-next">
              <small>EN CURSO / INMINENTE</small>
              <b>Mariana Ortiz</b>
              <p>Consulta inicial · Presencial</p>
              <span className="preview-detail">Detalle de la cita</span>
            </div>
            <div className="preview-list">
              <small>CRONOGRAMA DIARIO</small>
              {[
                { time: "09:30", name: "Mariana Ortiz", status: "confirmed" },
                { time: "10:30", name: "Espacio disponible", status: "open" },
                { time: "12:00", name: "Lucía Benítez", status: "scheduled" },
                { time: "14:30", name: "Roberto Gómez", status: "scheduled" },
              ].map((item, index) => (
                <p className={index === 0 ? "active" : ""} key={item.time + item.name}>
                  <span className="preview-list-time">{item.time}</span>
                  <span className="preview-list-name">{item.name}</span>
                  {item.status === "open" ? (
                    <span className="preview-list-action">Reservar</span>
                  ) : (
                    <span
                      className={
                        item.status === "confirmed"
                          ? "status-badge status-badge-confirmed"
                          : "status-badge status-badge-pending"
                      }
                    >
                      <span className="status-dot" />
                      {item.status === "confirmed" ? "Confirmada" : "Programada"}
                    </span>
                  )}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problema */}
      <section className="landing-problem" id="problema">
        <div className="section-heading center">
          <p className="section-label">LA GESTIÓN MANUAL, DÍA A DÍA</p>
          <h2>¿Sigues gestionando tus citas por WhatsApp?</h2>
        </div>
        <div className="chat-bubbles">
          {PROBLEM_MESSAGES.map((msg) => (
            <p className="chat-bubble" key={msg}>
              {msg}
            </p>
          ))}
        </div>
        <p className="landing-problem-closing">
          Si esto te suena familiar, tu agenda necesita un lugar propio.
        </p>
      </section>

      {/* Propuesta de valor */}
      <section className="landing-value">
        <div className="value-inner">
          <h2>Todo lo necesario para organizar tu consultorio, sin complicarte el día.</h2>
          <div className="value-pillars">
            {VALUE_PILLARS.map(([label, Icon]) => (
              <span className="value-pill" key={label}>
                <Icon />
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Funcionalidades */}
      <section className="landing-section" id="funcionalidades">
        <div className="section-heading">
          <p className="section-label">FUNCIONALIDADES</p>
          <h2>Lo que necesitas, nada de lo que sobra.</h2>
          <p>
            Cada función existe para quitarte una tarea administrativa de
            encima, no para sumar complejidad.
          </p>
        </div>
        <div className="lp-feature-grid">
          {FEATURES.map(([title, Icon, description]) => (
            <article className="lp-feature-card" key={title}>
              <span className="lp-feature-icon">
                <Icon />
              </span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
          <article className="lp-feature-card lp-feature-soon">
            <span className="lp-feature-soon-badge">Próximamente</span>
            <span className="lp-feature-icon">
              <PhoneIcon />
            </span>
            <h3>Aplicación móvil</h3>
            <p>Lleva tu consultorio contigo, desde cualquier lugar.</p>
          </article>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="landing-section landing-steps" id="como-funciona">
        <div className="section-heading center">
          <p className="section-label">CÓMO FUNCIONA</p>
          <h2>De cero a organizado, en cuatro pasos.</h2>
        </div>
        <div className="steps-grid">
          {STEPS.map(([number, title, description]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Para quién */}
      <section className="landing-section" id="para-quien">
        <div className="section-heading">
          <p className="section-label">PARA QUIÉN ES</p>
          <h2>Pensado para profesionales que trabajan por citas.</h2>
          <p>
            Empezamos con salud y bienestar, con una base que crecerá hacia
            más tipos de negocio basados en citas.
          </p>
        </div>
        <div className="specialty-grid">
          {SPECIALTIES.map((item) => (
            <article key={item}>
              <SettingsIcon />
              <h3>{item}</h3>
              <p>Una experiencia de agenda adaptable a tu forma de atender.</p>
            </article>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="landing-final" id="empezar">
        <h2>Empieza a organizar tu consultorio hoy.</h2>
        <p>Da el primer paso hacia una gestión más clara de tus citas.</p>
        <Link href="/register" className="landing-final-cta">
          Crear mi cuenta <Arrow />
        </Link>
      </section>

      {/* Footer */}
      <footer className="landing-footer-expanded">
        <div className="footer-inner">
          <div className="footer-brand">
            <strong>Agenda Clara</strong>
            <p>Una forma más clara de organizar citas para profesionales independientes.</p>
          </div>
          <nav className="footer-links" aria-label="Enlaces del pie de página">
            <a href="#funcionalidades">Funcionalidades</a>
            <a href="#como-funciona">Cómo funciona</a>
            <a href="#para-quien">Para quién</a>
          </nav>
        </div>
        <p className="footer-bottom">© {new Date().getFullYear()} Agenda Clara. Todos los derechos reservados.</p>
      </footer>
    </main>
  );
}
