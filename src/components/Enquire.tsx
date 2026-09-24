import { useState, useRef, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, AlertCircle, Loader2 } from "lucide-react";

const serviceOptions = [
  "New website",
  "Website redesign",
  "Development only",
  "Website updates",
  "Not sure yet",
];

const budgetOptions = [
  "₹5k–₹15k",
  "₹15k–₹30k",
  "₹30k–₹60k",
  "₹60k+",
  "Let's discuss",
];

type Status = "idle" | "loading" | "success" | "error";

const Enquire = () => {
  const [service, setService] = useState("Not sure yet");
  const [budget, setBudget] = useState("Let's discuss");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const isSubmitting = status === "loading";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return; // prevent double-submit

    setStatus("loading");
    setErrorMsg("");

    const form = new FormData(e.currentTarget);

    const name    = (form.get("name")     as string ?? "").trim();
    const email   = (form.get("email")    as string ?? "").trim();
    const phone   = (form.get("phone")    as string ?? "").trim();
    const business = (form.get("business") as string ?? "").trim();
    const message = (form.get("message")  as string ?? "").trim();
    const website = (form.get("website")  as string ?? "").trim(); // honeypot

    // Client-side validation
    if (!name) { setStatus("error"); setErrorMsg("Please enter your name."); return; }
    if (!email) { setStatus("error"); setErrorMsg("Please enter your email address."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setStatus("error"); setErrorMsg("Please enter a valid email address."); return; }
    if (!message) { setStatus("error"); setErrorMsg("Please describe your project."); return; }

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, business, service, budget, message, website }),
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok || !json.success) {
        throw new Error(json.message || "Something went wrong. Please try again.");
      }

      setStatus("success");
      formRef.current?.reset();
      setService("Not sure yet");
      setBudget("Let's discuss");

    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Something went wrong while sending your enquiry. Please try again."
      );
    }
  };

  const fieldBase = {
    background: "transparent",
    borderBottom: "1px solid var(--line)",
    color: "var(--cream)",
    width: "100%",
    outline: "none",
  };

  return (
    <section
      id="contact"
      className="section-pad-y"
      style={{ background: "var(--ink)" }}
    >
      <div className="site-container">
        <div className="grid grid-cols-12 gap-8 md:gap-12">

          {/* Left column */}
          <div className="col-span-12 lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2
                className="font-display font-medium leading-[0.98] tracking-[-0.02em]"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.6rem)", color: "var(--cream)" }}
              >
                Have a project
                <br />in mind?
              </h2>
              <p className="body-text mt-6" style={{ maxWidth: "32ch" }}>
                A few details are enough to start. We'll review your enquiry and get back to you.
              </p>
              <a
                href="mailto:collabstudio.in@gmail.com"
                className="inline-flex items-center gap-2 mt-8 text-sm transition-colors"
                style={{ color: "var(--brass)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cream)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--brass)")}
              >
                collabstudio.in@gmail.com
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </motion.div>
          </div>

          {/* Right column — form */}
          <div className="col-span-12 lg:col-span-7 lg:col-start-6">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  className="flex items-start gap-5 py-16"
                  style={{ borderTop: "1px solid var(--line)" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full mt-1"
                    style={{ background: "var(--brass)" }}
                  >
                    <Check className="h-5 w-5" style={{ color: "var(--ink)" }} />
                  </span>
                  <div>
                    <div
                      className="font-display text-2xl md:text-3xl mb-3"
                      style={{ color: "var(--cream)" }}
                    >
                      Enquiry sent
                    </div>
                    <p className="body-text" style={{ maxWidth: "40ch" }}>
                      Thanks — your enquiry has been sent. We'll get back to you shortly.
                      A confirmation has been sent to your email address.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  onSubmit={handleSubmit}
                  noValidate
                  className="flex flex-col gap-10 pt-2"
                  style={{ borderTop: "1px solid var(--line)" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Honeypot — hidden from real users */}
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    style={{ display: "none" }}
                  />

                  {/* Row 1: Name + Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 pt-8">
                    <label className="flex flex-col gap-2">
                      <span className="label-text">Name <span style={{ color: "var(--brass)" }}>*</span></span>
                      <input
                        required
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Your name"
                        disabled={isSubmitting}
                        className="py-2.5 text-base"
                        style={fieldBase}
                      />
                    </label>
                    <label className="flex flex-col gap-2">
                      <span className="label-text">Email <span style={{ color: "var(--brass)" }}>*</span></span>
                      <input
                        required
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@business.com"
                        disabled={isSubmitting}
                        className="py-2.5 text-base"
                        style={fieldBase}
                      />
                    </label>
                  </div>

                  {/* Row 2: Business + Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                    <label className="flex flex-col gap-2">
                      <span className="label-text">Business / Brand Name</span>
                      <input
                        name="business"
                        type="text"
                        autoComplete="organization"
                        placeholder="Your business name"
                        disabled={isSubmitting}
                        className="py-2.5 text-base"
                        style={fieldBase}
                      />
                    </label>
                    <label className="flex flex-col gap-2">
                      <span className="label-text">Phone number</span>
                      <input
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+91 00000 00000"
                        disabled={isSubmitting}
                        className="py-2.5 text-base"
                        style={fieldBase}
                      />
                    </label>
                  </div>

                  {/* Service */}
                  <div className="flex flex-col gap-3">
                    <span className="label-text">What do you need?</span>
                    <div className="flex flex-wrap gap-2">
                      {serviceOptions.map((s) => (
                        <button
                          type="button"
                          key={s}
                          onClick={() => setService(s)}
                          disabled={isSubmitting}
                          className="rounded-full px-4 py-2 text-sm transition-all duration-200 cursor-pointer"
                          style={{
                            border: `1px solid ${service === s ? "var(--brass)" : "var(--line)"}`,
                            color: service === s ? "var(--brass)" : "var(--cream-dim)",
                            background: service === s ? "rgba(199,160,74,0.08)" : "transparent",
                          }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Budget */}
                  <div className="flex flex-col gap-3">
                    <span className="label-text">Estimated budget</span>
                    <div className="flex flex-wrap gap-2">
                      {budgetOptions.map((b) => (
                        <button
                          type="button"
                          key={b}
                          onClick={() => setBudget(b)}
                          disabled={isSubmitting}
                          className="rounded-full px-4 py-2 text-sm transition-all duration-200 cursor-pointer"
                          style={{
                            border: `1px solid ${budget === b ? "var(--brass)" : "var(--line)"}`,
                            color: budget === b ? "var(--brass)" : "var(--cream-dim)",
                            background: budget === b ? "rgba(199,160,74,0.08)" : "transparent",
                          }}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <label className="flex flex-col gap-2">
                    <span className="label-text">
                      Project details <span style={{ color: "var(--brass)" }}>*</span>
                    </span>
                    <textarea
                      required
                      name="message"
                      rows={4}
                      disabled={isSubmitting}
                      placeholder="Tell us about the project — what the business does, what you need, any details that help us understand the scope."
                      className="py-2.5 text-base resize-none"
                      style={fieldBase}
                    />
                  </label>

                  {/* Error message */}
                  <AnimatePresence>
                    {status === "error" && errorMsg && (
                      <motion.div
                        className="flex items-start gap-3 text-sm"
                        style={{ color: "#E5564D" }}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                        <span>
                          {errorMsg}{" "}
                          {errorMsg.toLowerCase().includes("couldn't send") && (
                            <a
                              href="mailto:collabstudio.in@gmail.com"
                              style={{ color: "#E5564D", textDecoration: "underline" }}
                            >
                              Or email us directly.
                            </a>
                          )}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group inline-flex items-center gap-2 self-start rounded-full py-1.5 pl-6 pr-1.5 text-sm font-medium transition-all hover:gap-3 sm:text-base disabled:opacity-60 cursor-pointer"
                    style={{ background: "var(--cream)", color: "var(--ink)" }}
                  >
                    {isSubmitting ? (
                      <>
                        Sending...
                        <span
                          className="flex h-9 w-9 items-center justify-center rounded-full sm:h-10 sm:w-10"
                          style={{ background: "var(--ink)" }}
                        >
                          <Loader2 className="h-4 w-4 animate-spin" style={{ color: "var(--cream)" }} />
                        </span>
                      </>
                    ) : (
                      <>
                        Send enquiry
                        <span
                          className="flex h-9 w-9 items-center justify-center rounded-full transition-transform group-hover:scale-110 sm:h-10 sm:w-10"
                          style={{ background: "var(--ink)" }}
                        >
                          <ArrowRight className="h-4 w-4" style={{ color: "var(--cream)" }} />
                        </span>
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Enquire;
