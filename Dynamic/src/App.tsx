import { useEffect, useRef, useState } from "react";

type IconName = "arrow" | "asterisk" | "check" | "globe" | "menu" | "moon" | "spark" | "sun" | "x";

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    asterisk: (
      <>
        <path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    globe: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c3 3.5 3 14 0 18M12 3c-3 3.5-3 14 0 18" />
      </>
    ),
    menu: (
      <>
        <path d="M4 8h16M4 16h16" />
      </>
    ),
    moon: <path d="M20.5 15.5A8.5 8.5 0 0 1 8.5 3.5a8.5 8.5 0 1 0 12 12Z" />,
    spark: <path d="m12 2 1.5 6.5L20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5L12 2Z" />,
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
      </>
    ),
    x: (
      <>
        <path d="m6 6 12 12M18 6 6 18" />
      </>
    ),
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

const projects = [
  {
    name: "Aster Labs",
    type: "Digital product",
    tag: "Product",
    color: "coral",
    number: "01",
    year: "2025",
  },
  {
    name: "Northline",
    type: "Brand platform",
    tag: "Brand",
    color: "blue",
    number: "02",
    year: "2024",
  },
  {
    name: "Noon Radio",
    type: "Culture & commerce",
    tag: "Commerce",
    color: "lime",
    number: "03",
    year: "2025",
  },
  {
    name: "Field Notes",
    type: "Editorial system",
    tag: "Product",
    color: "violet",
    number: "04",
    year: "2024",
  },
];

const services = [
  [
    "01",
    "Strategy",
    "Clarity before craft. We define the opportunity, audience, and position that will move your business forward.",
  ],
  [
    "02",
    "Identity",
    "Distinctive visual systems built to be recognized, remembered, and flexible enough to grow.",
  ],
  [
    "03",
    "Digital",
    "Fast, expressive websites and products that turn attention into meaningful action.",
  ],
];

function App() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const [submitted, setSubmitted] = useState(false);
  const [cursor, setCursor] = useState({ x: -100, y: -100, visible: false });
  const cursorFrame = useRef<number | null>(null);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      if (cursorFrame.current) cancelAnimationFrame(cursorFrame.current);
      cursorFrame.current = requestAnimationFrame(() =>
        setCursor({ x: event.clientX, y: event.clientY, visible: true }),
      );
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const filteredProjects =
    filter === "All" ? projects : projects.filter((project) => project.tag === filter);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <main>
      <div
        className={`cursor-orb ${cursor.visible ? "is-visible" : ""}`}
        style={{ transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)` }}
      />

      <header className="nav-shell">
        <button className="brand" onClick={() => scrollTo("top")} aria-label="Go to top">
          <Icon name="asterisk" size={24} />
          <span>Form&Flux</span>
        </button>
        <nav className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="Main navigation">
          <button onClick={() => scrollTo("work")}>Work</button>
          <button onClick={() => scrollTo("services")}>Services</button>
          <button onClick={() => scrollTo("about")}>About</button>
          <button className="mobile-contact" onClick={() => scrollTo("contact")}>
            Start a project
          </button>
        </nav>
        <div className="nav-actions">
          <button
            className="icon-button"
            onClick={() => setDark(!dark)}
            aria-label={`Switch to ${dark ? "light" : "dark"} mode`}
          >
            <Icon name={dark ? "sun" : "moon"} size={18} />
          </button>
          <button className="contact-link" onClick={() => scrollTo("contact")}>
            Let&apos;s talk <Icon name="arrow" size={17} />
          </button>
          <button
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <Icon name={menuOpen ? "x" : "menu"} />
          </button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="eyebrow">
          <span className="status-dot" /> Independent creative studio · London / Everywhere
        </div>
        <div className="hero-title-wrap">
          <h1>
            Ideas with
            <br />
            <em>momentum.</em>
          </h1>
          <div className="hero-stamp" aria-hidden="true">
            <span>DESIGN FOR WHAT’S NEXT · </span>
            <div>
              <Icon name="asterisk" size={34} />
            </div>
          </div>
        </div>
        <div className="hero-footer">
          <p>
            We partner with ambitious teams to build brands and digital experiences that shape
            culture and drive growth.
          </p>
          <button
            className="circle-cta"
            onClick={() => scrollTo("work")}
            aria-label="Explore selected work"
          >
            <span>Explore</span>
            <Icon name="arrow" size={22} />
          </button>
        </div>
        <div className="marquee" aria-hidden="true">
          <div>
            STRATEGY <Icon name="asterisk" /> IDENTITY <Icon name="asterisk" /> DIGITAL{" "}
            <Icon name="asterisk" /> STRATEGY <Icon name="asterisk" /> IDENTITY{" "}
            <Icon name="asterisk" /> DIGITAL <Icon name="asterisk" />
          </div>
        </div>
      </section>

      <section className="work-section" id="work">
        <div className="section-heading">
          <div>
            <span className="kicker">Selected work</span>
            <h2>
              Built to make
              <br />a difference.
            </h2>
          </div>
          <p>A selection of partnerships where sharp thinking met bold execution.</p>
        </div>
        <div className="filter-row" role="group" aria-label="Filter projects">
          {["All", "Brand", "Product", "Commerce"].map((item) => (
            <button
              key={item}
              className={filter === item ? "active" : ""}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="project-grid">
          {filteredProjects.map((project) => (
            <article className="project-card" key={project.name}>
              <div className={`project-visual ${project.color}`}>
                <span className="project-number">{project.number}</span>
                {project.name === "Aster Labs" && (
                  <div className="aster-shape">
                    <Icon name="asterisk" size={150} />
                  </div>
                )}
                {project.name === "Northline" && (
                  <div className="north-shape">
                    <span>N</span>
                  </div>
                )}
                {project.name === "Noon Radio" && (
                  <div className="noon-shape">
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                )}
                {project.name === "Field Notes" && (
                  <div className="field-shape">
                    <span>FIELD</span>
                    <small>ISSUE 08</small>
                  </div>
                )}
                <div className="project-hover">
                  View case <Icon name="arrow" size={17} />
                </div>
              </div>
              <div className="project-info">
                <h3>{project.name}</h3>
                <div>
                  <span>{project.type}</span>
                  <span>{project.year}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="services-section" id="services">
        <div className="services-intro">
          <span className="kicker">How we help</span>
          <h2>
            One studio.
            <br />
            <em>Whole picture.</em>
          </h2>
          <p>
            From first thought to final launch, our senior team works together across every
            touchpoint.
          </p>
        </div>
        <div className="service-list">
          {services.map(([number, title, description]) => (
            <article className="service-item" key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
              <div className="service-icon">
                <Icon name="arrow" size={20} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="about-art">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="orbit-center">
            <Icon name="spark" size={40} />
          </div>
          <span className="orbit-label one">CURIOSITY</span>
          <span className="orbit-label two">CRAFT</span>
          <span className="orbit-label three">IMPACT</span>
        </div>
        <div className="about-copy">
          <span className="kicker">Small by design</span>
          <blockquote>
            We believe the best work happens when the people you meet are the people who make.
          </blockquote>
          <p>
            No hand-offs, no layers. Just a focused group of strategists, designers, and developers
            working directly with you.
          </p>
          <div className="stats">
            <div>
              <strong>12</strong>
              <span>People</span>
            </div>
            <div>
              <strong>08</strong>
              <span>Countries</span>
            </div>
            <div>
              <strong>47</strong>
              <span>Launches</span>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        {!submitted ? (
          <>
            <div className="contact-copy">
              <span className="kicker">Have a project?</span>
              <h2>
                Let&apos;s make
                <br />
                <em>something matter.</em>
              </h2>
              <p>
                Tell us where you want to go. We&apos;ll help you find the most interesting way
                there.
              </p>
            </div>
            <form
              className="contact-form"
              onSubmit={(event) => {
                event.preventDefault();
                setSubmitted(true);
              }}
            >
              <label>
                Your name
                <input required placeholder="Jane Smith" />
              </label>
              <label>
                Work email
                <input required type="email" placeholder="jane@company.com" />
              </label>
              <label className="full">
                What are you looking to make?
                <textarea
                  required
                  rows={3}
                  placeholder="A new brand, a digital product, something else..."
                />
              </label>
              <button type="submit">
                Send enquiry <Icon name="arrow" size={19} />
              </button>
            </form>
          </>
        ) : (
          <div className="success-message">
            <div>
              <Icon name="check" size={40} />
            </div>
            <span className="kicker">Message received</span>
            <h2>
              Great things
              <br />
              <em>start here.</em>
            </h2>
            <p>Thanks for reaching out. We&apos;ll be in your inbox within two working days.</p>
            <button onClick={() => setSubmitted(false)}>Send another message</button>
          </div>
        )}
      </section>

      <footer>
        <div className="footer-brand">
          <Icon name="asterisk" size={42} />
          <span>Form&Flux</span>
        </div>
        <div className="footer-meta">
          <span>© 2025 Form&Flux Studio</span>
          <div>
            <a href="#top">Instagram</a>
            <a href="#top">LinkedIn</a>
            <a href="#top">Behance</a>
          </div>
          <button onClick={() => scrollTo("top")}>
            Back to top <Icon name="arrow" size={16} />
          </button>
        </div>
      </footer>
    </main>
  );
}

export default App;
