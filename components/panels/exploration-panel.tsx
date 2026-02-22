"use client"

import { motion } from "framer-motion"
import { Portal } from "@/components/portal"

interface ExplorationPanelProps {
  onNavigate: (section: string) => void
}

const portals = [
  {
    id: "mind",
    title: "Ecos de la Mente",
    color: "#8b5cf6",
    secondaryColor: "#6366f1",
  },
  {
    id: "sound",
    title: "El Jardin Sonoro",
    color: "#06b6d4",
    secondaryColor: "#14b8a6",
  },
  {
    id: "visions",
    title: "Visiones Internas",
    color: "#ec4899",
    secondaryColor: "#f43f5e",
  },
  {
    id: "connection",
    title: "Conexion Profunda",
    color: "#10b981",
    secondaryColor: "#22d3ee",
  },
]

export function ExplorationPanel({ onNavigate }: ExplorationPanelProps) {
  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center z-10 px-4"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.2 }}
      transition={{ duration: 0.8 }}
    >
      {/* Title */}
      <motion.h2
        className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center"
        style={{
          fontFamily: "var(--font-display), Orbitron, sans-serif",
        }}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
          Elige tu Dimension
        </span>
      </motion.h2>

      <motion.p
        className="text-white/50 text-center mb-12 max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Cada portal te llevara a una experiencia unica de introspección
      </motion.p>

      {/* Portals grid */}
      <div className="grid grid-cols-2 gap-8 md:gap-12 lg:gap-16">
        {portals.map((portal, index) => (
          <Portal
            key={portal.id}
            title={portal.title}
            color={portal.color}
            secondaryColor={portal.secondaryColor}
            onClick={() => onNavigate(portal.id)}
            delay={0.2 + index * 0.15}
          />
        ))}
      </div>

      {/* Back hint */}
      <motion.button
        onClick={() => onNavigate("gateway")}
        className="absolute top-8 left-8 text-white/40 hover:text-white/80 transition-colors flex items-center gap-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        whileHover={{ x: -5 }}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="text-sm tracking-wider">Volver</span>
      </motion.button>
    </motion.div>
  )
}
