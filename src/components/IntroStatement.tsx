import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const statement = "We design it first. Then we build it properly.";
const words = statement.split(" ");

const ScrollRevealWord = ({
  word,
  index,
  progress,
  total,
}: {
  word: string;
  index: number;
  progress: MotionValue<number>;
  total: number;
}) => {
  const start = index / total;
  const end = start + 1 / total;
  const opacity = useTransform(progress, [start, end], [0.18, 1]);

  return (
    <>
      <motion.span style={{ opacity }}>{word}</motion.span>
      {index < total - 1 && " "}
    </>
  );
};

const IntroStatement = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "center center"],
  });

  return (
    <section
      ref={containerRef}
      id="intro"
      className="section-pad-y"
      style={{ background: "var(--ink)" }}
    >
      <div className="site-container">
        <div className="grid grid-cols-12 gap-6 md:gap-10 items-start">
          <div className="col-span-12 lg:col-span-7">
            <h2
              className="font-display font-medium leading-[1.04] tracking-[-0.025em]"
              style={{
                fontSize: "clamp(2rem, 5.2vw, 4.6rem)",
                color: "var(--cream)",
              }}
            >
              {words.map((word, i) => (
                <ScrollRevealWord
                  key={i}
                  word={word}
                  index={i}
                  progress={scrollYProgress}
                  total={words.length}
                />
              ))}
            </h2>
          </div>

          <div className="col-span-12 lg:col-span-4 lg:col-start-9 lg:pt-4">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="body-text" style={{ maxWidth: "36ch" }}>
                Every project starts with understanding the business. We turn
                that into a clear visual direction in Figma, refine it with you,
                and only then move into development.
              </p>
              <p
                className="body-text mt-5"
                style={{ maxWidth: "36ch", color: "var(--cream-faint)" }}
              >
                No disappearing into development for three weeks and returning
                with something you never approved.
              </p>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="divider-anim mt-16 md:mt-24"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </section>
  );
};

export default IntroStatement;
