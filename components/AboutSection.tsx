"use client";

import { motion } from "framer-motion";
import {
  BrainCircuit,
  CloudCog,
  Code2,
  Globe,
  Layers,
  LineChart,
  Rocket,
  Shield,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";

const stats = [
  { value: "50+", label: "Projects Delivered", Icon: Rocket },
  { value: "99.9%", label: "Uptime Guaranteed", Icon: Zap },
  { value: "24/7", label: "Support Coverage", Icon: Shield },
  { value: "12+", label: "Countries Served", Icon: Globe },
];

const capabilities = [
  {
    Icon: BrainCircuit,
    title: "AI-First Architecture",
    desc: "We embed machine learning into the product layer — not as an afterthought, but as the foundation every decision routes through.",
  },
  {
    Icon: CloudCog,
    title: "Multi-Cloud Strategy",
    desc: "AWS, Azure, GCP — we build portable infrastructure that avoids vendor lock-in and maximizes cost efficiency.",
  },
  {
    Icon: Code2,
    title: "Modern Engineering",
    desc: "TypeScript, Rust, Go, Python. CI/CD pipelines, containerised deployments, and automated testing at every layer.",
  },
  {
    Icon: ShieldCheck,
    title: "Zero-Trust Security",
    desc: "Identity-first controls, encrypted pipelines, SOC 2 compliance, and continuous vulnerability scanning.",
  },
  {
    Icon: Users,
    title: "Cross-Functional Teams",
    desc: "Designers, engineers, and strategists work as one unit — no silos, no hand-off friction, no wasted cycles.",
  },
  {
    Icon: LineChart,
    title: "Data-Driven Decisions",
    desc: "Real-time dashboards, predictive analytics, and automated reporting that turns raw data into operational clarity.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

export function AboutSection() {
  return (
    <section className="about-section" id="about">
      {/* Hero intro */}
      <motion.div
        className="about-intro"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
      >
        <motion.div className="section-kicker" variants={fadeUp} custom={0}>
          About Prajna World Tech
        </motion.div>
        <motion.h2 className="about-title" variants={fadeUp} custom={1}>
          Future-ready intelligence for companies that want{" "}
          <span className="gradient-text">sharper systems</span>, not louder software.
        </motion.h2>
        <motion.p className="about-lead" variants={fadeUp} custom={2}>
          Prajna World Tech builds AI, IT, cloud, and automation platforms for modern teams.
          We connect strategy, engineering, security, and product design into digital
          infrastructure that feels fast, resilient, and almost invisible when it works.
        </motion.p>
      </motion.div>

      {/* Animated stats row */}
      <div className="about-stats">
        {stats.map(({ value, label, Icon }, i) => (
          <motion.div
            className="stat-card"
            key={label}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scaleIn}
            custom={i}
          >
            <div className="stat-icon">
              <Icon size={22} />
            </div>
            <div className="stat-value">{value}</div>
            <div className="stat-label">{label}</div>
          </motion.div>
        ))}
      </div>

      {/* Capabilities grid */}
      <motion.div
        className="about-capabilities-header"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div className="section-kicker" variants={fadeUp} custom={0}>
          What We Do
        </motion.div>
        <motion.h3 variants={fadeUp} custom={1}>
          End-to-end capabilities, not isolated services.
        </motion.h3>
      </motion.div>

      <div className="capabilities-grid">
        {capabilities.map(({ Icon, title, desc }, i) => (
          <motion.div
            className="capability-card"
            key={title}
            initial="hidden"
            whileInView="visible"
            whileHover={{ y: -6, scale: 1.02 }}
            viewport={{ once: true }}
            variants={fadeUp}
            custom={i}
          >
            <div className="capability-icon">
              <Icon size={22} />
            </div>
            <h4>{title}</h4>
            <p>{desc}</p>
            <div className="capability-glow" />
          </motion.div>
        ))}
      </div>

      {/* Visual divider with animated layers */}
      <motion.div
        className="about-visual-strip"
        initial={{ opacity: 0, scaleX: 0.4 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      >
        <Layers size={18} />
        <span className="strip-line" />
        <span className="strip-label">Strategy → Engineering → Launch → Scale</span>
        <span className="strip-line" />
        <Layers size={18} />
      </motion.div>
    </section>
  );
}
