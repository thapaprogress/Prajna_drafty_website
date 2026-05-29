"use client";

import { motion } from "framer-motion";
import { MonitorDot, Radar, ScanEye, Sparkles, Terminal, Waypoints } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const PARTICLE_COUNT = 60;

function randomBetween(a: number, b: number) {
  return Math.random() * (b - a) + a;
}

/** Generates explosion particles that fly outward from center */
function generateParticles() {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const angle = (i / PARTICLE_COUNT) * Math.PI * 2 + randomBetween(-0.3, 0.3);
    const distance = randomBetween(120, 500);
    const size = randomBetween(2, 7);
    const delay = randomBetween(0, 0.5);
    const duration = randomBetween(1.2, 2.5);
    return {
      id: i,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      size,
      delay,
      duration,
      color: i % 3 === 0 ? "var(--cyan)" : i % 3 === 1 ? "var(--violet)" : "var(--pink)",
    };
  });
}

const features = [
  { Icon: Terminal, label: "Neural CLI", desc: "Command-line AI orchestration" },
  { Icon: Radar, label: "Live Radar", desc: "Real-time threat detection" },
  { Icon: ScanEye, label: "Vision AI", desc: "Computer vision pipelines" },
  { Icon: Waypoints, label: "Data Mesh", desc: "Distributed data routing" },
  { Icon: MonitorDot, label: "Holo-Monitor", desc: "3D system dashboards" },
  { Icon: Sparkles, label: "Auto-Heal", desc: "Self-repairing infrastructure" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.6 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.85 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export function HolographicReveal() {
  const [exploded, setExploded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const particles = useRef(generateParticles());

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !exploded) {
          setExploded(true);
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [exploded]);

  return (
    <section className="holo-reveal-section" ref={sectionRef}>
      {/* Explosion particles */}
      <div className="holo-particles" aria-hidden="true">
        {exploded &&
          particles.current.map((p) => (
            <motion.div
              key={p.id}
              className="holo-particle"
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{
                x: p.x,
                y: p.y,
                opacity: 0,
                scale: 0.2,
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                ease: "easeOut",
              }}
              style={{
                width: p.size,
                height: p.size,
                background: p.color,
                boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
              }}
            />
          ))}

        {/* Central flash */}
        {exploded && (
          <motion.div
            className="holo-flash"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 8, opacity: 0 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
          />
        )}
      </div>

      {/* Content revealed after explosion */}
      <motion.div
        className="holo-content"
        initial="hidden"
        animate={exploded ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div className="section-kicker" variants={itemVariants}>
          System Control
        </motion.div>
        <motion.h2 className="holo-title" variants={itemVariants}>
          Holographic UI &<br />
          <span className="gradient-text">Neural Command Layers</span>
        </motion.h2>
        <motion.p className="holo-desc" variants={itemVariants}>
          Monitor, debug, and optimize multi-cloud architectures through custom
          holographic visualizers. We build bespoke terminal control rooms that
          give engineering teams total operational clarity.
        </motion.p>

        <motion.div className="holo-features" variants={containerVariants}>
          {features.map(({ Icon, label, desc }) => (
            <motion.div
              className="holo-feature-card"
              key={label}
              variants={itemVariants}
              whileHover={{ y: -4, scale: 1.04 }}
            >
              <div className="holo-feature-icon">
                <Icon size={20} />
              </div>
              <strong>{label}</strong>
              <p>{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Background grid */}
      <div className="holo-bg-grid" />
    </section>
  );
}
