import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

const services = [
  {
    index: "01",
    name: "Web Design",
    detail:
      "We design the full interface and experience in Figma before development begins.",
  },
  {
    index: "02",
    name: "Development",
    detail:
      "We turn approved designs into responsive, accessible and production-ready websites.",
  },
  {
    index: "03",
    name: "Content & Structure",
    detail:
      "We help organise what the website needs to say and how visitors should move through it.",
  },
  {
    index: "04",
    name: "Care & Updates",
    detail:
      "For businesses that need occasional changes, new sections or continued support after launch.",
  },
  {
    index: "05",
    name: "Brand Direction",
    detail:
      "When a business needs stronger visual consistency online, we can establish the digital direction alongside the website.",
  },
];

const Services = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="services"
      className="pt-[clamp(40px,6vw,100px)] pb-[clamp(80px,12vw,200px)]"
      style={{ background: "var(--ink)" }}
    >
      <div className="site-container">
        {/* Header */}
        <div className="grid grid-cols-12 gap-6 md:gap-10 mb-14 md:mb-20">
          <motion.div
            className="col-span-12 lg:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="heading-xl">What we do</h2>
          </motion.div>
          <motion.div
            className="col-span-12 lg:col-span-4 lg:col-start-9 flex items-end"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.7,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <p className="body-text">
              A focused set of services, done properly, rather than a long menu
              done thin.
            </p>
          </motion.div>
        </div>

        {/* Service rows */}
        <div>
          <motion.div
            className="divider-anim"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          />

          {services.map((s, i) => (
            <motion.div
              key={s.name}
              className="relative cursor-default"
              style={{ borderBottom: "1px solid var(--line)" }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Subtle hover bg */}
              <AnimatePresence>
                {hoveredIndex === i && (
                  <motion.span
                    className="pointer-events-none absolute inset-0"
                    style={{ background: "var(--ink-raised)" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </AnimatePresence>

              <div className="relative grid grid-cols-12 items-center gap-4 py-7 md:py-10 px-2 md:px-4">
                {/* Number */}
                <div className="col-span-2 md:col-span-1">
                  <span
                    className="font-display text-lg md:text-xl"
                    style={{ color: "var(--brass)" }}
                  >
                    {s.index}
                  </span>
                </div>

                {/* Name */}
                <div className="col-span-10 md:col-span-4">
                  <motion.span
                    className="font-display tracking-[-0.01em]"
                    style={{
                      fontSize: "clamp(1.3rem, 2.4vw, 2rem)",
                      color: "var(--cream)",
                      display: "inline-block",
                    }}
                    animate={
                      hoveredIndex === i ? { x: 4 } : { x: 0 }
                    }
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {s.name}
                  </motion.span>
                </div>

                {/* Description */}
                <div className="col-span-12 md:col-span-6 pl-0 md:pl-0">
                  <p
                    className="text-sm md:text-base leading-relaxed"
                    style={{ color: "var(--cream-dim)", maxWidth: "42ch" }}
                  >
                    {s.detail}
                  </p>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex col-span-1 justify-end">
                  <motion.span
                    style={{ color: "var(--cream-dim)" }}
                    animate={
                      hoveredIndex === i
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: -8 }
                    }
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
