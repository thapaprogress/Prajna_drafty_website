"use client";

import { motion } from "framer-motion";
import { Activity, Cpu, Database, Network, Server } from "lucide-react";

export function TechVisual() {
  return (
    <div className="tech-visual">
      <motion.div className="neural-core" animate={{ rotate: 360 }} transition={{ duration: 38, repeat: Infinity, ease: "linear" }}>
        {Array.from({ length: 18 }).map((_, index) => (
          <span key={index} style={{ transform: `rotate(${index * 20}deg) translateX(44%)` }} />
        ))}
      </motion.div>
      <div className="panel panel-a">
        <Cpu size={20} />
        <strong>AI neural network</strong>
        <p>Model routing, memory, vector intelligence, and automated decisions.</p>
      </div>
      <div className="panel panel-b">
        <CloudDiagram />
      </div>
      <div className="panel panel-c">
        <Activity size={20} />
        <strong>Live data flow</strong>
        <div className="flow-lines"><span /><span /><span /></div>
      </div>
    </div>
  );
}

function CloudDiagram() {
  return (
    <div className="cloud-diagram">
      <div><Server size={18} /> Edge</div>
      <span />
      <div><Network size={18} /> Orchestration</div>
      <span />
      <div><Database size={18} /> Data mesh</div>
    </div>
  );
}
