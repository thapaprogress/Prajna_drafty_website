"use client";

import { motion } from "framer-motion";
import { BrainCircuit, CloudCog, Code2, ShieldCheck } from "lucide-react";

const services = [
  {
    title: "AI Solutions",
    body: "Custom assistants, intelligent workflow agents, predictive analytics, and automation systems built around real business operations.",
    Icon: BrainCircuit
  },
  {
    title: "Cloud Infrastructure",
    body: "Secure, elastic cloud platforms with observability, deployment pipelines, cost controls, and resilient architecture.",
    Icon: CloudCog
  },
  {
    title: "Web & App Development",
    body: "High-performance product interfaces, internal platforms, and mobile-ready systems designed for speed and scale.",
    Icon: Code2
  },
  {
    title: "Cybersecurity Systems",
    body: "Zero-trust controls, incident readiness, hardened infrastructure, identity protection, and continuous risk monitoring.",
    Icon: ShieldCheck
  }
];

export function Services() {
  return (
    <div className="service-grid">
      {services.map(({ title, body, Icon }, index) => (
        <motion.article
          className="service-card"
          key={title}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -8, scale: 1.015 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08, duration: 0.55 }}
        >
          <div className="service-icon"><Icon size={24} /></div>
          <h3>{title}</h3>
          <p>{body}</p>
        </motion.article>
      ))}
    </div>
  );
}
