import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "How long does a website take?",
    a: "Most projects take three to six weeks from the first conversation to launch, depending on the scope, how much content is ready, and how many rounds of review we go through.",
  },
  {
    q: "How much does a website cost?",
    a: "It depends on the scope and complexity. Tell us about your project in the form below and we'll come back with a clear estimate based on what you actually need.",
  },
  {
    q: "Do I get to see the design before development?",
    a: "Yes. We design the full interface in Figma first. You review it, give feedback, and approve everything before we write a single line of code.",
  },
  {
    q: "Can I request changes to the design?",
    a: "Of course. The review stage exists specifically for that. We refine the design with you until you're happy with the direction.",
  },
  {
    q: "What happens after launch?",
    a: "The website is yours. If you'd rather not manage updates yourself, our care plan covers edits, fixes and new sections for a flat monthly rate.",
  },
];

const FAQItem = ({ q, a, index }: { q: string; a: string; index: number }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      style={{ borderBottom: "1px solid var(--line)" }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.04,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-6 py-6 md:py-7 text-left cursor-pointer"
        aria-expanded={open}
        aria-controls={`faq-answer-${index}`}
      >
        <span
          className="font-display tracking-[-0.01em]"
          style={{
            fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
            color: "var(--cream)",
          }}
        >
          {q}
        </span>
        <motion.span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
          style={{
            border: "1px solid var(--line)",
            color: "var(--brass)",
          }}
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <Plus className="h-4 w-4" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`faq-answer-${index}`}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p
              className="text-sm md:text-base pb-7 max-w-2xl leading-relaxed"
              style={{ color: "var(--cream-dim)" }}
            >
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  return (
    <section
      id="faq"
      className="section-pad-y"
      style={{ background: "var(--ink)" }}
    >
      <div className="site-container">
        {/* Header */}
        <div className="grid grid-cols-12 gap-6 md:gap-10 mb-12 md:mb-16">
          <motion.div
            className="col-span-12 lg:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="heading-xl">Questions, answered</h2>
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
              The things people usually ask before the first call. Anything
              else, put it in the message field below.
            </p>
          </motion.div>
        </div>

        {/* Accordion */}
        <div>
          <motion.div
            className="divider-anim"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          />
          {faqs.map((f, i) => (
            <FAQItem key={f.q} q={f.q} a={f.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
