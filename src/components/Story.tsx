import { WordsPullUp } from "./WordsPullUp";

const marqueeWords = ["Websites", "Brand systems", "Content", "Care & updates"];

const Story = () => {
  return (
    <section id="story" style={{ background: "var(--ink)" }}>
      <div className="px-4 pt-24 pb-16 sm:px-6 md:px-10 md:pt-32 md:pb-20">
        <div className="grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 lg:col-span-8">
            <WordsPullUp
              text="We build the site your business actually needs, then get out of the way."
              className="font-display font-medium leading-[1.02] tracking-[-0.02em] text-[9vw] sm:text-[7vw] md:text-[4.6vw] lg:text-[3.6vw]"
              style={{ color: "var(--cream)" }}
            />
          </div>
          <div className="col-span-12 flex flex-col gap-6 lg:col-span-4 lg:pt-2">
            <p className="text-sm md:text-base" style={{ color: "var(--cream-dim)", lineHeight: 1.6 }}>
              Collab is run by the same two people from the first call to the
              day your site ships. No account managers, no junior hand-offs,
              no recycled template dressed up as "custom." We take on a short
              list of businesses at a time so each one gets full attention.
            </p>
            <div className="flex gap-10 pt-6" style={{ borderTop: "1px solid var(--line)" }}>
              <div>
                <div className="font-display text-4xl md:text-5xl" style={{ color: "var(--cream)" }}>2</div>
                <div className="text-xs mt-1" style={{ color: "var(--cream-dim)" }}>founders, no bench</div>
              </div>
              <div>
                <div className="font-display text-4xl md:text-5xl" style={{ color: "var(--cream)" }}>1</div>
                <div className="text-xs mt-1" style={{ color: "var(--cream-dim)" }}>client per slot, at a time</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee strip — one deliberate continuous motion, ties the page together */}
      <div
        className="relative overflow-hidden py-5 md:py-7"
        style={{ borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}
      >
        <div className="marquee-track flex w-max items-center">
          {[0, 1].map((rep) => (
            <div key={rep} className="flex items-center shrink-0">
              {marqueeWords.map((w) => (
                <span key={w} className="flex items-center shrink-0">
                  <span
                    className="font-display text-[7vw] sm:text-[5vw] md:text-[2.6vw] px-6 md:px-10"
                    style={{ color: "var(--cream)" }}
                  >
                    {w}
                  </span>
                  <span className="text-[7vw] sm:text-[5vw] md:text-[2.6vw]" style={{ color: "var(--brass)" }}>
                    //
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Story;
