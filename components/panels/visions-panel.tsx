"use client"

import { motion } from "framer-motion"
import { ArtworkGallery } from "@/components/artwork-gallery"

interface VisionsPanelProps {
  onBack: () => void
}

export function VisionsPanel({ onBack }: VisionsPanelProps) {
  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center z-10 px-6"
      initial={{ opacity: 0, rotate: -10 }}
      animate={{ opacity: 1, rotate: 0 }}
      exit={{ opacity: 0, rotate: 10 }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, #ec4899 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, #a855f7 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -20, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Title */}
      <motion.h2
        className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center"
        style={{
          fontFamily: "var(--font-display), Orbitron, sans-serif",
        }}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
          Visiones Internas
        </span>
      </motion.h2>

      <motion.p
        className="text-white/50 text-center mb-8 max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        Arte generativo que refleja los paisajes de tu subconsciente
      </motion.p>

      {/* Artwork Gallery */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="w-full max-w-lg"
      >
        <ArtworkGallery />
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
