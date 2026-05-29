import { AboutSection } from "@/components/AboutSection";
import { CinematicCanvas } from "@/components/CinematicCanvas";
import { HolographicReveal } from "@/components/HolographicReveal";
import { MotionSection } from "@/components/MotionSection";
import { PricingSection } from "@/components/PricingSection";
import { Services } from "@/components/Services";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { TechVisual } from "@/components/TechVisual";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <main>
        {/* ── Hero ── */}
        <CinematicCanvas
          eyebrow="Prajna World Tech"
          title="AI-Powered Digital Transformation by Prajna World Tech"
          copy="We design intelligent digital systems where automation, cloud infrastructure, secure software, and AI-native interfaces move as one cinematic operating layer."
          mode="hero"
          folder="globe"
          frameCount={192}
          align="left"
        />

        {/* ── UI/UX Design Showcase — workspace holographic panels ── */}
        <CinematicCanvas
          eyebrow="Design-First Engineering"
          title="Holographic UI & Immersive Product Design"
          copy="From wireframe to deployment — we craft interfaces that feel alive. Our design systems bridge holographic prototyping, interactive dashboards, and real-time data layers into a seamless product experience."
          mode="showcase"
          folder="workspace"
          frameCount={240}
          align="right"
          textRevealAt={0.6}
        />

        {/* ── About (rich) ── */}
        <AboutSection />

        {/* ── Services ── */}
        <MotionSection className="section" id="services">
          <div className="section-header">
            <div className="section-kicker">Services</div>
            <h2>Engineered systems for intelligent growth.</h2>
          </div>
          <Services />
        </MotionSection>

        {/* ── Intelligent Workspaces — text reveals after 60% scroll ── */}
        <CinematicCanvas
          eyebrow="Intelligent Workspaces"
          title="From Office Desks to Global Enterprise Scale"
          copy="Bridge the gap between strategic design and production-grade software. Our environments transition smoothly from high-fidelity office mockups to robust cloud infrastructure running at scale."
          mode="showcase"
          folder="office"
          frameCount={192}
          align="left"
          textRevealAt={0.6}
        />

        {/* ── Technology ── */}
        <MotionSection className="section technology">
          <div className="section-header">
            <div className="section-kicker">Technology</div>
            <h2>Neural interfaces, cloud diagrams, and animated data paths working in one visual layer.</h2>
          </div>
          <TechVisual />
        </MotionSection>

        {/* ── Smart City AI — text reveals after 45% ── */}
        <CinematicCanvas
          eyebrow="Industrial Scale"
          title="Smart City AI & Decentralized Systems"
          copy="Orchestrate large-scale automation, IoT grids, and smart energy flows. Our cloud platforms are built for high-throughput stream processing, security compliance, and continuous runtime operations."
          mode="showcase"
          folder="city"
          frameCount={240}
          align="left"
          textRevealAt={0.45}
        />

        {/* ── Holographic UI (exploding particle reveal) ── */}
        <HolographicReveal />

        {/* ── Pricing ── */}
        <PricingSection />

        {/* ── Contact / CTA ── */}
        <section className="section cta" id="contact">
          <div className="contact-copy">
            <div className="section-kicker">Contact</div>
            <h2>Build your next AI advantage with Prajna World Tech.</h2>
            <p>Tell us what you want to automate, modernize, secure, or launch. We will shape the system around your business reality.</p>
            <div className="contact-lines">
              <span>hello@prajnaworldtech.com</span>
              <span>+1 (555) 014-2026</span>
            </div>
          </div>
          <form className="contact-form">
            <label>
              Name
              <input type="text" name="name" placeholder="Your name" />
            </label>
            <label>
              Email
              <input type="email" name="email" placeholder="you@company.com" />
            </label>
            <label>
              Project
              <textarea name="project" placeholder="AI agents, cloud migration, product build, security..." />
            </label>
            <button type="button" className="button primary">Start the Conversation</button>
          </form>
        </section>
      </main>
    </SmoothScrollProvider>
  );
}
