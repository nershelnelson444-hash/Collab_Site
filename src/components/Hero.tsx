import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import logo from "../assets/collab-logo.png";

const navItems = [
  { label: "Our story", href: "#story", minor: false },
  { label: "Work", href: "#work", minor: false },
  { label: "Services", href: "#services", minor: false },
  { label: "Process", href: "#process", minor: true },
  { label: "FAQ", href: "#faq", minor: true },
  { label: "Contact", href: "#contact", minor: false },
];

const Hero = () => {
  return (
    <section className="h-[100svh] w-full p-2 sm:p-3">
      <div className="relative h-full w-full overflow-hidden rounded-2xl md:rounded-[2rem]" style={{ background: "var(--ink)" }}>

        {/* Background video, same source and treatment as the reference PrismaHero component */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
        />
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-overlay" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

        {/* Navbar */}
        <nav className="absolute left-1/2 top-0 z-20 -translate-x-1/2">
          <div className="flex items-center gap-3 rounded-b-2xl bg-black px-4 py-2 sm:gap-5 md:gap-8 md:rounded-b-3xl md:px-8 lg:gap-10">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`text-[10px] transition-colors sm:text-xs md:text-sm ${item.minor ? "hidden sm:inline-block" : ""}`}
                style={{ color: "var(--cream-dim)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cream)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--cream-dim)")}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-6 sm:px-6 md:px-10 md:pb-8">
          <div className="grid grid-cols-12 items-end gap-4">

            <div className="col-span-12 lg:col-span-8">
              <motion.img
                src={logo}
                alt="co//lab."
                initial={{ y: 34, opacity: 0, scale: 0.97 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="w-[58vw] sm:w-[50vw] md:w-[42vw] lg:w-[36vw] xl:w-[32vw] h-auto"
                style={{ filter: "drop-shadow(0 10px 34px rgba(0,0,0,0.45))" }}
              />
            </div>

            <div className="col-span-12 flex flex-col gap-5 pb-2 lg:col-span-4 lg:pb-4">

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-xs sm:text-sm md:text-base"
                style={{ color: "var(--cream-dim)", lineHeight: 1.35 }}
              >
                Collab is a small studio that designs and builds websites
                around how your business actually works. One point of contact,
                no handoffs, no bloat.
              </motion.p>

              <motion.a
                href="#contact"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="group inline-flex items-center gap-2 self-start rounded-full py-1 pl-5 pr-1 text-sm font-medium transition-all hover:gap-3 sm:text-base"
                style={{ background: "var(--cream)", color: "var(--ink)" }}
              >
                Start a project
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-full transition-transform group-hover:scale-110 sm:h-10 sm:w-10"
                  style={{ background: "var(--ink)" }}
                >
                  <ArrowRight className="h-4 w-4" style={{ color: "var(--cream)" }} />
                </span>
              </motion.a>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
