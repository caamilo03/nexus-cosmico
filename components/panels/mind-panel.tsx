"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

interface MindPanelProps {
  onBack: () => void
}

const quotes = [
  {
    text: "La mente es como el agua: cuando está calmada, refleja la realidad con claridad.",
    author: "Proverbio Zen",
  },
  {
    text: "No somos seres humanos teniendo una experiencia espiritual, somos seres espirituales teniendo una experiencia humana.",
    author: "Pierre Teilhard de Chardin",
  },
  {
    text: "El observador cambia lo observado por el mero acto de observar.",
    author: "Werner Heisenberg",
  },
]

export function MindPanel({ onBack }: MindPanelProps) {
  const [currentQuote, setCurrentQuote] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center z-10 px-6"
      initial={{ opacity: 0, rotateY: 90 }}
      animate={{ opacity: 1, rotateY: 0 }}
      exit={{ opacity: 0, rotateY: -90 }}
      transition={{ duration: 0.8 }}
    >
      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 rounded-full opacity-20"
            style={{
              background: `radial-gradient(circle, ${i % 2 === 0 ? "#8b5cf6" : "#6366f1"} 0%, transparent 70%)`,
              left: `${20 + i * 15}%`,
              top: `${10 + (i % 3) * 30}%`,
            }}
            animate={{
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Title */}
      <motion.h2
        className="text-3xl md:text-4xl lg:text-5xl font-bold mb-16 text-center"
        style={{
          fontFamily: "var(--font-display), Orbitron, sans-serif",
        }}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
          Ecos de la Mente
        </span>
      </motion.h2>

      {/* Quote container */}
      <motion.div
        className="relative max-w-2xl mx-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        {/* Quote marks */}
        <div className="absolute -left-4 -top-4 text-6xl text-violet-500/30 font-serif">{'"'}</div>
        <div className="absolute -right-4 -bottom-4 text-6xl text-violet-500/30 font-serif">{'"'}</div>

        {/* Quote text */}
        <motion.div
          key={currentQuote}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-center px-8"
        >
          <p className="text-xl md:text-2xl lg:text-3xl text-white/90 leading-relaxed font-light italic">
            {quotes[currentQuote].text}
          </p>
          <p className="mt-6 text-violet-400/80 text-sm md:text-base tracking-wider">
            — {quotes[currentQuote].author}
          </p>
        </motion.div>
      </motion.div>

      {/* Quote indicators */}
      <div className="flex gap-3 mt-12">
        {quotes.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setCurrentQuote(i)}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === currentQuote ? "bg-violet-400" : "bg-white/20"
            }`}
            whileHover={{ scale: 1.5 }}
          />
        ))}
      </div>

      {/* Navigation */}
      <NavigationButton onBack={onBack} />
    </motion.div>
  )
}

function NavigationButton({ onBack }: { onBack: () => void }) {
  return (
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
  )
}
