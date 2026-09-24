import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const steps = [
  { n: "01", title: "Discover", detail: "We start with your business — what you do, who you're trying to reach, what the website needs to achieve, and what isn't working right now." },
  { n: "02", title: "Design in Figma", detail: "We create the visual direction and full interface before development begins." },
  { n: "03", title: "Review", detail: "You see the design, give feedback, and approve the direction before we start building." },
  { n: "04", title: "Develop", detail: "We turn the approved design into a responsive, fast and accessible website." },
  { n: "05", title: "Test", detail: "We test layouts, devices, links, forms and the details people usually notice only when they're broken." },
  { n: "06", title: "Launch", detail: "After final approval, we connect the domain, deploy the site and make sure everything is working properly." },
  { n: "07", title: "Care", detail: "If the website needs new pages, changes or occasional maintenance, we can stay around after launch." },
];

const Process = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      id="process"
      style={{
        background: "var(--ink)",
        position: "relative",
      }}
    >
      <div className="site-container">
        <motion.div
          className="pt-[clamp(80px,12vw,200px)] pb-14 md:pb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="label-text block mb-4" style={{ color: "var(--brass)" }}>
            Process
          </span>
          <h2 className="heading-xl">
            From first conversation
            <br className="hidden sm:block" /> to launch.
          </h2>
        </motion.div>

        <div className="grid grid-cols-12 gap-6 md:gap-10 pb-[clamp(80px,12vw,200px)]">
          <div className="col-span-12 lg:col-span-5">
            <div className="lg:sticky lg:top-[30vh]">
              <div className="relative overflow-hidden">
                <motion.div
                  className="font-display font-bold leading-none"
                  style={{
                    fontSize: "clamp(5rem, 14vw, 12rem)",
                    color: "var(--cream)",
                  }}
                  key={`number-${activeIndex}`}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {steps[activeIndex].n}
                </motion.div>
              </div>
              <motion.div
                className="font-display tracking-[-0.02em] mt-4"
                style={{
                  fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                  color: "var(--cream)",
                }}
                key={`title-${activeIndex}`}
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.4,
                  delay: 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {steps[activeIndex].title}
              </motion.div>

              <div className="flex gap-2 mt-8">
                {steps.map((_, i) => (
                  <div
                    key={i}
                    className="h-1 rounded-full transition-all duration-500"
                    style={{
                      width: i === activeIndex ? "28px" : "8px",
                      background:
                        i === activeIndex
                          ? "var(--brass)"
                          : i < activeIndex
                            ? "var(--cream-dim)"
                            : "var(--line)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            {steps.map((s, i) => (
              <StepCard
                key={s.n}
                step={s}
                index={i}
                isActive={i === activeIndex}
                setActiveIndex={setActiveIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const StepCard = ({
  step,
  index,
  isActive,
  setActiveIndex,
}: {
  step: (typeof steps)[0];
  index: number;
  isActive: boolean;
  setActiveIndex: (idx: number) => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start center", "end center"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0 && latest < 1) {
      setActiveIndex(index);
    }
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);
  
  return (
    <motion.div
      ref={cardRef}
      className="py-10 md:py-14"
      style={{
        opacity,
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div className="flex items-baseline gap-4 mb-4">
        <span
          className="font-display text-lg"
          style={{
            color: isActive ? "var(--brass)" : "var(--cream-dim)",
            transition: "color 0.4s ease",
          }}
        >
          {step.n}
        </span>
        <span
          className="font-display tracking-[-0.01em] lg:hidden"
          style={{
            fontSize: "clamp(1.2rem, 2vw, 1.6rem)",
            color: "var(--cream)",
          }}
        >
          {step.title}
        </span>
      </div>
      <p className="body-text" style={{ maxWidth: "40ch" }}>
        {step.detail}
      </p>
    </motion.div>
  );
};

export default Process;
