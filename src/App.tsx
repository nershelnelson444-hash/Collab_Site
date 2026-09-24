import Hero from "./components/Hero";
import IntroStatement from "./components/IntroStatement";
import Work from "./components/Work";
import Services from "./components/Services";
import Process from "./components/Process";
import FAQ from "./components/FAQ";
import Enquire from "./components/Enquire";
import Footer from "./components/Footer";

function App() {
  return (
    <div style={{ background: "var(--ink)" }}>
      <Hero />
      <IntroStatement />
      <Work />
      <Services />
      <Process />
      <FAQ />
      <Enquire />
      <Footer />
    </div>
  );
}

export default App;
