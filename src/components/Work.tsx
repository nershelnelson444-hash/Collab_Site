import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import amberDunesLogo from "../assets/amber-dunes-logo.png";
import kl7GarageLogo from "../assets/kl7-garage-logo.png";

const projects = [
  {
    index: "01",
    name: "Amber Dunes",
    category: "Fragrance / Blog",
    url: "amberdunes.blog",
    href: "https://amberdunes.blog",
    description:
      "A fragrance blog covering sourced perfumes, scent reviews and the world of niche fragrances — built around clean reading and an editorial feel.",
    logo: amberDunesLogo,
    logoBg: "#0e0e0e",
  },
  {
    index: "02",
    name: "KL7 Garage",
    category: "Automotive / Local Business",
    url: "kl7garage.in",
    href: "https://kl7garage.in",
    description:
      "A website for a used-bike showroom designed around inventory discovery, enquiries and essential customer information.",
    logo: kl7GarageLogo,
    logoBg: "#ffffff",
  },
];

const Work = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="work"
      className="pt-[clamp(80px,12vw,200px)] pb-[clamp(40px,6vw,100px)]"
      style={{ background: "var(--ink)" }}
    >
      <div className="site-container">
        {/* Section header */}
        <motion.div
          className="flex items-end justify-between mb-14 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="heading-xl">Recent work</h2>
          <span
            className="hidden sm:block label-text pb-1"
          >
            {String(projects.length).padStart(2, "0")} projects
          </span>
        </motion.div>

        {/* Project rows */}
        <div>
          <motion.div
            className="divider-anim"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          />

          {projects.map((p, i) => (
            <motion.a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="group relative block"
              style={{ borderBottom: "1px solid var(--line)" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Hover background fill */}
              <AnimatePresence>
                {hoveredIndex === i && (
                  <motion.span
                    className="pointer-events-none absolute inset-0 -z-10"
                    style={{ background: "var(--ink-raised)" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  />
                )}
              </AnimatePresence>

              <div className="grid grid-cols-12 items-center gap-4 py-8 md:py-12 px-2 md:px-4">
                {/* Number */}
                <div className="col-span-2 md:col-span-1">
                  <span
                    className="font-display text-lg md:text-xl"
                    style={{ color: "var(--cream-dim)" }}
                  >
                    {p.index}
                  </span>
                </div>

                {/* Logo thumbnail */}
                <motion.div
                  className="col-span-2 md:col-span-1 h-14 w-14 md:h-16 md:w-16 rounded-lg relative overflow-hidden hidden sm:flex items-center justify-center shrink-0"
                  style={{ background: p.logoBg }}
                  animate={
                    hoveredIndex === i
                      ? { scale: 1.08, rotate: -2 }
                      : { scale: 1, rotate: 0 }
                  }
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <img
                    src={p.logo}
                    alt={p.name}
                    className="w-full h-full object-contain p-1"
                  />
                </motion.div>

                {/* Project info */}
                <div className="col-span-8 sm:col-span-6 md:col-span-5">
                  <motion.div
                    className="font-display tracking-[-0.02em] leading-none"
                    style={{
                      fontSize: "clamp(1.6rem, 3.2vw, 2.6rem)",
                      color: "var(--cream)",
                    }}
                    animate={
                      hoveredIndex === i ? { x: 6 } : { x: 0 }
                    }
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {p.name}
                  </motion.div>
                  <div
                    className="text-sm mt-2"
                    style={{ color: "var(--cream-dim)" }}
                  >
                    {p.category}
                  </div>
                </div>

                {/* Description - desktop only */}
                <div className="hidden lg:block col-span-3">
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--cream-dim)", maxWidth: "32ch" }}
                  >
                    {p.description}
                  </p>
                </div>

                {/* URL + Arrow */}
                <div className="col-span-2 flex items-center justify-end gap-3">
                  <span
                    className="hidden md:block text-sm"
                    style={{ color: "var(--brass)" }}
                  >
                    {p.url}
                  </span>
                  <motion.span
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full shrink-0"
                    style={{
                      border: "1px solid var(--line)",
                      color: "var(--cream)",
                    }}
                    animate={
                      hoveredIndex === i
                        ? {
                            rotate: 45,
                            backgroundColor: "var(--cream)",
                            color: "var(--ink)",
                            borderColor: "var(--cream)",
                          }
                        : {
                            rotate: 0,
                            backgroundColor: "transparent",
                            color: "var(--cream)",
                            borderColor: "rgba(255,255,255,0.08)",
                          }
                    }
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </motion.span>
                </div>
              </div>

              {/* Mobile description */}
              <div className="lg:hidden px-2 pb-6 -mt-2">
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--cream-dim)", maxWidth: "48ch" }}
                >
                  {p.description}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
