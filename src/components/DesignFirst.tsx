import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const flowSteps = [
  { label: "Brief", accent: false },
  { label: "Figma", accent: true },
  { label: "Client Review", accent: false },
  { label: "Approved", accent: true },
  { label: "Development", accent: false },
];

const DesignFirst = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.3"],
  });

  const flowY = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const flowOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="design-first"
      className="section-pad-y"
      style={{ background: "var(--ink-2)" }}
    >
      <div className="site-container">
        <div className="grid grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Left: Heading and copy */}
          <div className="col-span-12 lg:col-span-7">
            <motion.h2
              className="font-display font-medium leading-[1.04] tracking-[-0.025em]"
              style={{
                fontSize: "clamp(2rem, 5vw, 4.4rem)",
                color: "var(--cream)",
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              You see the website
              <br />
              before we build the website.
            </motion.h2>

            <motion.p
              className="body-text mt-8 md:mt-10"
              style={{ maxWidth: "44ch" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              We design the interface in Figma first. You can review the layout,
              visual direction and content structure, request changes, and
              approve the design before development begins.
            </motion.p>
          </div>

          {/* Right: Visual flow diagram */}
          <motion.div
            className="col-span-12 lg:col-span-4 lg:col-start-9"
            style={{ y: flowY, opacity: flowOpacity }}
          >
            <div className="relative pl-8 md:pl-10">
              {/* Vertical line */}
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-px"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent, var(--line-strong) 15%, var(--line-strong) 85%, transparent)",
                }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 1.2,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.2,
                }}
              />

              {flowSteps.map((step, i) => (
                <motion.div
                  key={step.label}
                  className="relative flex items-center gap-4 py-5 md:py-6"
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {/* Dot on the line */}
                  <div
                    className="absolute -left-8 md:-left-10 w-2 h-2 rounded-full"
                    style={{
                      background: step.accent
                        ? "var(--brass)"
                        : "var(--cream-dim)",
                      left: "calc(-2rem - 3px)",
                    }}
                  />
                  <span
                    className="label-text"
                    style={{
                      color: step.accent
                        ? "var(--brass)"
                        : "var(--cream-dim)",
                      fontSize: "0.75rem",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {step.label}
                  </span>
                  {i < flowSteps.length - 1 && (
                    <span
                      className="text-xs"
                      style={{ color: "var(--cream-faint)" }}
                    >
                      ↓
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DesignFirst;
