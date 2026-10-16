import React from "react";
import { m, AnimatePresence } from "framer-motion";
import { EmailRoundedIcon, LinkedInIcon, GitHubIcon } from "./Icons";
import { EASE } from "../animations/variants";
import ThemeToggle from "./ThemeToggle";
import "../styles/NavBar.css";

const NAV_LINKS = [
  { id: "intro", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

const SOCIALS = [
  {
    href: "mailto:avishkarkakde2004@gmail.com",
    label: "Email",
    Icon: EmailRoundedIcon,
    size: 20,
  },
  {
    href: "https://github.com/Avishkar2004",
    label: "GitHub",
    Icon: GitHubIcon,
    size: 19,
  },
  {
    href: "https://www.linkedin.com/in/avishkar-kakde-6592b825b/",
    label: "LinkedIn",
    Icon: LinkedInIcon,
    size: 21,
  },
];

function useScrollDirection() {
  const [hidden, setHidden] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      // Hide when scrolling down past the hero, show when scrolling up.
      if (y > last && y > 120) setHidden(true);
      else if (y < last) setHidden(false);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { hidden, scrolled };
}

// Scroll-spy: which section is currently in view, for the active underline.
function useActiveSection() {
  const [active, setActive] = React.useState("intro");
  React.useEffect(() => {
    let observer;
    let timer;
    let tries = 0;
    // Sections below the hero are lazy-loaded (App.js), so they can mount
    // after the nav; retry briefly until they're all in the DOM.
    const setup = () => {
      const sections = NAV_LINKS.map((l) =>
        document.getElementById(l.id)
      ).filter(Boolean);
      if (sections.length < NAV_LINKS.length && tries++ < 40) {
        timer = setTimeout(setup, 250);
        return;
      }
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(entry.target.id);
          });
        },
        { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
      );
      sections.forEach((s) => observer.observe(s));
    };
    setup();
    return () => {
      clearTimeout(timer);
      if (observer) observer.disconnect();
    };
  }, []);
  return active;
}

// Sliding underline under the active link, positioned by measuring that
// link. Doing it by hand (instead of framer's layoutId) lets the app use
// framer's lighter animation bundle, which has no layout animations.
function useUnderline(navRef, active) {
  const [bar, setBar] = React.useState(null);
  React.useLayoutEffect(() => {
    const measure = () => {
      const link = navRef.current?.querySelector(`[data-id="${active}"]`);
      if (link) setBar({ x: link.offsetLeft + 10, w: link.offsetWidth - 20 });
    };
    measure();
    window.addEventListener("resize", measure);
    // Link widths change once the web font arrives.
    document.fonts?.ready.then(measure);
    return () => window.removeEventListener("resize", measure);
  }, [navRef, active]);
  return bar;
}

export default function NavBar() {
  const { hidden, scrolled } = useScrollDirection();
  const active = useActiveSection();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const navRef = React.useRef(null);
  const bar = useUnderline(navRef, active);

  return (
    <m.header
      className={`site-nav${scrolled ? " is-scrolled" : ""}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden && !menuOpen ? -90 : 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: EASE }}
    >
      <div className="site-nav__inner">
        <a className="site-nav__brand" href="#intro">
          Avishkar Kakde
        </a>

        <nav className="site-nav__links" aria-label="Primary" ref={navRef}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              data-id={link.id}
              href={`#${link.id}`}
              className={`site-nav__link${
                active === link.id ? " is-active" : ""
              }`}
              aria-current={active === link.id ? "location" : undefined}
            >
              {link.label}
            </a>
          ))}
          {bar && (
            <span
              className="site-nav__underline"
              aria-hidden="true"
              style={{ width: bar.w, transform: `translateX(${bar.x}px)` }}
            />
          )}
        </nav>

        <div className="site-nav__socials">
          {SOCIALS.map(({ href, label, Icon, size }) => (
            <m.a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={label}
              className="site-nav__social"
              whileHover={{ y: -3, scale: 1.12 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Icon style={{ fontSize: size }} />
            </m.a>
          ))}
        </div>

        <ThemeToggle />

        <button
          className="site-nav__burger"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <m.span
            animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
          />
          <m.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} />
          <m.span
            animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
          />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <m.nav
            className="site-nav__mobile"
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <m.ul
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.06, delayChildren: 0.05 },
                },
              }}
            >
              {NAV_LINKS.map((link) => (
                <m.li
                  key={link.id}
                  variants={{
                    hidden: { opacity: 0, x: -16 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <a href={`#${link.id}`} onClick={() => setMenuOpen(false)}>
                    {link.label}
                  </a>
                </m.li>
              ))}
            </m.ul>
            <div className="site-nav__mobile-socials">
              {SOCIALS.map(({ href, label, Icon, size }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  aria-label={label}
                >
                  <Icon style={{ fontSize: size + 2 }} />
                </a>
              ))}
            </div>
          </m.nav>
        )}
      </AnimatePresence>
    </m.header>
  );
}
