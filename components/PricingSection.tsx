"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const plans = [
  {
    name: "Basic",
    price: "20,000",
    badge: null,
    features: [
      { text: "12 Content (1 Poster & 2 Reel)", included: true },
      { text: "1 Photo/Video Shoot", included: true },
      { text: "Ads creation & Management", included: true },
      { text: "Meta Platform", included: true },
      { text: "Tiktok Profile Management", included: true },
      { text: "Monthly Reporting", included: true },
      { text: "GMB Management", included: false },
      { text: "Content calendar", included: false },
    ],
  },
  {
    name: "Standard",
    price: "30,000",
    badge: "Top Choice",
    features: [
      { text: "20 Content (1 Poster & 3 Reel)", included: true },
      { text: "3 Photo/Video Shoot", included: true },
      { text: "Ads creation & Management", included: true },
      { text: "Meta Platform", included: true },
      { text: "Tiktok Profile Management", included: true },
      { text: "GMB Management", included: true },
      { text: "Monthly Reporting", included: true },
      { text: "Content calendar", included: false },
    ],
  },
  {
    name: "Premium",
    price: "45,000",
    badge: null,
    features: [
      { text: "24 Content (2 Poster & 4 Reel)", included: true },
      { text: "4 Photo/Video Shoot", included: true },
      { text: "Ads creation & Management", included: true },
      { text: "Meta Platform", included: true },
      { text: "Tiktok Profile Management", included: true },
      { text: "GMB Management", included: true },
      { text: "Monthly Reporting", included: true },
      { text: "Content calendar", included: true },
    ],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

export function PricingSection() {
  return (
    <section className="section pricing-section" id="pricing">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="section-kicker">Pricing</div>
        <h2>Transparent plans for every stage of growth.</h2>
      </motion.div>

      <div className="pricing-grid">
        {plans.map((plan, i) => (
          <motion.div
            className={`pricing-card ${plan.badge ? "featured" : ""}`}
            key={plan.name}
            initial="hidden"
            whileInView="visible"
            whileHover={{ y: -8, scale: 1.02 }}
            viewport={{ once: true }}
            variants={cardVariants}
            custom={i}
          >
            {plan.badge && <span className="pricing-badge">{plan.badge}</span>}
            <h3 className="pricing-name">{plan.name}</h3>
            <p className="pricing-subtitle">Plan</p>
            <div className="pricing-price">
              <span className="pricing-currency">Rs</span>
              <span className="pricing-amount">{plan.price}</span>
              <span className="pricing-period">/Month</span>
            </div>
            <div className="pricing-divider" />
            <ul className="pricing-features">
              {plan.features.map((f) => (
                <li key={f.text} className={f.included ? "included" : "excluded"}>
                  {f.included ? (
                    <Check size={16} className="feature-check" />
                  ) : (
                    <X size={16} className="feature-x" />
                  )}
                  {f.text}
                </li>
              ))}
            </ul>
            <button className={`button ${plan.badge ? "primary" : "ghost"} pricing-btn`}>
              Buy Now
            </button>
            <div className="pricing-bottom-line" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
