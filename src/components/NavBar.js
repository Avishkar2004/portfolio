import React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import EmailRoundedIcon from "@material-ui/icons/EmailRounded";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import { EASE } from "../animations/variants";
import "../styles/NavBar.css";

const NAV_LINKS = [
  { id: "intro", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
];

const SOCIALS = [
  { href: "mailto:avishkarkakde2004@gmail.com", label: "Email", Icon: EmailRoundedIcon, size: 20 },
  { href: "https://github.com/Avishkar2004", label: "GitHub", Icon: GitHubIcon, size: 19 },
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
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(
      Boolean
    );
    if (!sections.length) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);
  return active;
}

export default function NavBar() {
  const { hidden, scrolled } = useScrollDirection();
  const active = useActiveSection();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const reduce = useReducedMotion();

  return (
    <motion.header
      className={`site-nav${scrolled ? " is-scrolled" : ""}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden && !menuOpen ? -90 : 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: EASE }}
    >
      <div className="site-nav__inner">
        <a className="site-nav__brand" href="#intro">
          Avishkar Kakde
        </a>

        <nav className="site-nav__links" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`site-nav__link${active === link.id ? " is-active" : ""}`}
            >
              {link.label}
              {active === link.id && (
                <motion.span
                  className="site-nav__underline"
                  layoutId="nav-underline"
                  transition={
                    reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 30 }
                  }
                />
              )}
            </a>
          ))}
        </nav>

        <div className="site-nav__socials">
          {SOCIALS.map(({ href, label, Icon, size }) => (
            <motion.a
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
            </motion.a>
          ))}
        </div>

        <button
          className="site-nav__burger"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <motion.span animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} />
          <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} />
          <motion.span animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="site-nav__mobile"
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } } }}
            >
              {NAV_LINKS.map((link) => (
                <motion.li
                  key={link.id}
                  variants={{
                    hidden: { opacity: 0, x: -16 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <a href={`#${link.id}`} onClick={() => setMenuOpen(false)}>
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
            <div className="site-nav__mobile-socials">
              {SOCIALS.map(({ href, label, Icon, size }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                >
                  <Icon style={{ fontSize: size + 2 }} />
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
