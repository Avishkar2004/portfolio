import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/Contact.css";
import {
  EASE,
  fadeUp,
  staggerContainer,
  viewportOnce,
} from "../animations/variants";

const EMAIL = "avishkarkakde2004@gmail.com";

const LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/avishkar-kakde-6592b825b/",
  },
  { label: "GitHub", href: "https://github.com/Avishkar2004" },
];

// Web3Forms access key. It can only send mail *to* the inbox it was created
// for, so it is safe to ship in client code. While it's empty the form falls
// back to opening a pre-filled email instead.
const WEB3FORMS_KEY = "d63dd120-1dec-4596-9f83-e8a246184eee";

const STATUS_TEXT = {
  sending: "Sending…",
  sent: "Thanks — your message is on its way.",
  error: `That didn't go through. Please email me at ${EMAIL}.`,
};

function CopyEmail() {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (!copied) return undefined;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
    } catch (e) {
      // Clipboard blocked (old browser / insecure context) — open mail instead.
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <div className="contact-email">
      <a className="contact-email__address" href={`mailto:${EMAIL}`}>
        {EMAIL}
      </a>
      <button type="button" className="contact-email__copy" onClick={copy}>
        {copied ? "Copied ✓" : "Copy"}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Email address copied" : ""}
      </span>
    </div>
  );
}

function ContactForm() {
  const [status, setStatus] = React.useState("idle"); // idle | sending | sent | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    if (!WEB3FORMS_KEY) {
      const subject = encodeURIComponent(`Portfolio message from ${data.name}`);
      const body = encodeURIComponent(
        `${data.message}\n\n— ${data.name} (${data.email})`,
      );
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
      return;
    }

    formData.append("access_key", WEB3FORMS_KEY);
    formData.append("subject", `Portfolio message from ${data.name}`);
    formData.append("from_name", "Portfolio contact form");

    setStatus("sending");
    try {
      // Plain FormData (no custom headers) keeps this a "simple" CORS request,
      // so the browser skips the preflight that Web3Forms' firewall can reject.
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.message);
      form.reset();
      setStatus("sent");
    } catch (err) {
      setStatus("error");
    }
  };

  const sending = status === "sending";

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-field">
        <label htmlFor="contact-name">Name</label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          required
        />
      </div>
      <div className="contact-field">
        <label htmlFor="contact-email">Email</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
      </div>
      <div className="contact-field">
        <label htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          maxLength={5000}
          required
        />
      </div>
      {/* Honeypot: hidden from people, bots tick it, Web3Forms drops those. */}
      <input
        type="checkbox"
        name="botcheck"
        className="contact-honeypot"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="contact-actions">
        <button type="submit" className="contact-submit" disabled={sending}>
          {sending ? "Sending…" : "Send message"}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
        <div aria-live="polite">
          <AnimatePresence mode="wait">
            {status !== "idle" && !sending && (
              <motion.p
                key={status}
                className={`contact-status is-${status}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                {STATUS_TEXT[status]}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </form>
  );
}

export default function Contact() {
  return (
    <div id="contact">
      <div className="section-header">
        <span className="section-index">05</span>
        <h2 className="section-title">Contact</h2>
      </div>

      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.p className="contact-headline" variants={fadeUp}>
          Let's build something <em>together.</em>
        </motion.p>

        <div className="contact-grid">
          <motion.div className="contact-aside" variants={fadeUp}>
            <div>
              <p className="contact-label">Email</p>
              <CopyEmail />
            </div>
            <div>
              <p className="contact-label">Elsewhere</p>
              <ul className="contact-links">
                {LINKS.map(({ label, href }) => (
                  <li key={label}>
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      {label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="contact-label">Based in</p>
              <p className="contact-note">Pune, India (IST)</p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <ContactForm />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
