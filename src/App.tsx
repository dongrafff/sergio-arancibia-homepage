import { ThemeProvider } from "./components/ui/ThemeProvider";
import { NeuralBackground } from "./components/ui/NeuralBackground";
import { Layout } from "./layouts/Layout";
import { Hero } from "./components/sections/Hero";
import { Features } from "./components/sections/Features";
import { Trajectory } from "./components/sections/Trajectory";
import { Projects } from "./components/sections/Projects";
import { HowItWorks } from "./components/sections/HowItWorks";
import { Stats } from "./components/sections/Stats";
import { Faq } from "./components/sections/Faq";
import { Contact } from "./components/sections/Contact";

export default function App() {
  return (
    <ThemeProvider>
      <NeuralBackground />
      <Layout>
        <Hero />
        <Features />
        <Trajectory />
        <Projects />
        <HowItWorks />
        <Stats />
        <Faq />
        <Contact />
      </Layout>
    </ThemeProvider>
  );
}
