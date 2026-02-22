"use client"

import { motion } from "framer-motion"
import { AudioVisualizer } from "@/components/audio-visualizer"

interface SoundPanelProps {
  onBack: () => void
}

export function SoundPanel({ onBack }: SoundPanelProps) {
  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center z-10 px-6"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.5 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
    >
      {/* Sound waves background effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"
            style={{ top: `${20 + i * 12}%` }}
            animate={{
              scaleY: [1, 3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* Title */}
      <motion.h2
        className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center"
        style={{
          fontFamily: "var(--font-display), Orbitron, sans-serif",
        }}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
          El Jardin Sonoro
        </span>
      </motion.h2>

      <motion.p
        className="text-white/50 text-center mb-8 max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        Sumérgete en frecuencias que resuenan con tu ser interior
      </motion.p>

      {/* Audio Visualizer */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="w-full max-w-2xl"
      >
        <AudioVisualizer />
      </motion.div>

      {/* Navigation */}
      <motion.button
        onClick={onBack}
        className="absolute top-8 left-8 text-white/40 hover:text-white/80 transition-colors flex items-center gap-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        whileHover={{ x: -5 }}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="text-sm tracking-wider">Explorar</span>
      </motion.button>
    </motion.div>
  )
}
