"use client";
import logo from "../assets/collab-logo.png";
interface NavLink {
  text: string;
  url: string;
}

interface FooterWithSuiteProps {
  brandName?: string;
  tagline?: string;
  navLinks?: NavLink[];
  socialLinks?: NavLink[];
  description?: string;
  ctaText?: string;
  ctaUrl?: string;
  email?: string;
  copyright?: string;
  className?: string;
}

const defaultNavLinks: NavLink[] = [
  { text: "Home", url: "#" },
  { text: "Work", url: "#work" },
  { text: "Services", url: "#services" },
  { text: "Process", url: "#process" },
  { text: "FAQ", url: "#faq" },
  { text: "Contact", url: "#contact" },
];

const defaultSocialLinks: NavLink[] = [
  { text: "Instagram", url: "https://www.instagram.com/collabdigitalhq?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==" },
  { text: "Email", url: "mailto:collabstudio.in@gmail.com" },
];

export default function Footer({
  brandName = "Collab",
  navLinks = defaultNavLinks,
  socialLinks = defaultSocialLinks,
  description = "A small web design and development studio creating thoughtful websites for businesses.",
  ctaText = "Start a project",
  ctaUrl = "#contact",
  email = "collabstudio.in@gmail.com",
  copyright = "© 2026 Collab.",
  className = "",
}: FooterWithSuiteProps) {
  return (
    <footer
      className={`w-full relative overflow-hidden select-none ${className}`}
      style={{ background: "var(--ink)" }}
    >
      <div className="grid grid-cols-2 gap-8 px-8 pt-12 pb-4 md:px-12">
        <div className="flex flex-col gap-0">
          {navLinks.map((link, i) => (
            <a
              key={i}
              href={link.url}
              className="py-0.75 text-[11px] tracking-[0.14em] uppercase hover:opacity-60 transition-colors duration-200"
              style={{ color: "var(--cream)" }}
            >
              {link.text}
            </a>
          ))}

          <div className="h-5" />

          {socialLinks.map((link, i) => (
            <a
              key={i}
              href={link.url}
              className="py-0.75 text-[11px] tracking-[0.14em] uppercase hover:opacity-60 transition-colors duration-200"
              style={{ color: "var(--cream)" }}
            >
              {link.text}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-0">
          <p className="text-[11px] tracking-[0.12em] uppercase leading-relaxed" style={{ color: "var(--cream)" }}>
            {description}
          </p>

          <div className="h-5" />

          <p className="text-[11px] tracking-[0.12em] uppercase leading-relaxed" style={{ color: "var(--cream-dim)" }}>
            Have something in mind? Just want to talk?
          </p>

          <div className="h-4" />

          <a
            href={ctaUrl}
            className="text-[11px] tracking-[0.14em] uppercase hover:opacity-60 transition-colors duration-200"
            style={{ color: "var(--cream)" }}
          >
            {ctaText}
          </a>

          <div className="h-4" />

          <a
            href={`mailto:${email}`}
            className="text-[11px] tracking-[0.14em] uppercase hover:opacity-60 transition-colors duration-200 break-all"
            style={{ color: "var(--cream)" }}
          >
            {email}
          </a>

          <div className="h-4" />

          <p className="text-[11px] tracking-[0.12em] uppercase" style={{ color: "var(--cream-dim)" }}>
            {copyright}
          </p>
        </div>
      </div>

      <div className="w-full px-8 md:px-12 overflow-hidden py-4">
        <img
          src={logo}
          alt={brandName}
          className="h-auto object-contain opacity-90"
          style={{ maxWidth: "min(360px, 60vw)" }}
        />
      </div>
    </footer>
  );
}
