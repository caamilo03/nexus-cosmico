"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface ConnectionPanelProps {
  onBack: () => void
}

export function ConnectionPanel({ onBack }: ConnectionPanelProps) {
  const [reflection, setReflection] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = () => {
    if (reflection.trim()) {
      setIsSubmitted(true)
    }
  }

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center z-10 px-6"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
    >
      {/* Peaceful flowing lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px w-full"
            style={{
              background: `linear-gradient(90deg, transparent, ${i % 2 === 0 ? "#10b981" : "#22d3ee"}40, transparent)`,
              top: `${10 + i * 10}%`,
            }}
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Gentle pulsing orb */}
      <motion.div
        className="absolute w-96 h-96 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, #10b981 0%, #22d3ee 50%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Title */}
      <motion.h2
        className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center relative z-10"
        style={{
          fontFamily: "var(--font-display), Orbitron, sans-serif",
        }}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          Conexión Profunda
        </span>
      </motion.h2>

      <motion.p
        className="text-white/60 text-center mb-8 max-w-md relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        Integra la experiencia. Toma un momento para reflexionar sobre tu viaje interior.
      </motion.p>

      {/* Reflection area */}
      <motion.div
        className="w-full max-w-lg relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        {!isSubmitted ? (
          <>
            <div className="relative">
              <textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="¿Qué descubriste en este viaje? Escribe tu reflexión..."
                className="w-full h-40 p-4 rounded-2xl bg-white/5 border border-white/10 text-white/90 placeholder:text-white/30 resize-none focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all"
              />
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                animate={{
                  boxShadow: reflection
                    ? "0 0 30px rgba(16, 185, 129, 0.2)"
                    : "0 0 0px rgba(16, 185, 129, 0)",
                }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <motion.button
              onClick={handleSubmit}
              className="mt-6 w-full py-4 rounded-full relative overflow-hidden group"
              style={{
                background: "linear-gradient(135deg, rgba(16, 185, 129, 0.3) 0%, rgba(34, 211, 238, 0.3) 100%)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: "linear-gradient(135deg, rgba(16, 185, 129, 0.5) 0%, rgba(34, 211, 238, 0.5) 100%)",
                }}
              />
              <span className="relative z-10 text-white/90 tracking-wider font-medium">
                Integra la Experiencia
              </span>
            </motion.button>
          </>
        ) : (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #10b981 0%, #22d3ee 100%)",
              }}
              animate={{
                boxShadow: [
                  "0 0 20px rgba(16, 185, 129, 0.5)",
                  "0 0 40px rgba(34, 211, 238, 0.5)",
                  "0 0 20px rgba(16, 185, 129, 0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>

            <h3 className="text-2xl font-medium text-white/90 mb-3">Gracias por tu Reflexión</h3>
            <p className="text-white/50 max-w-sm mx-auto">
              Tu viaje hacia la conciencia continúa. Lleva esta paz interior contigo.
            </p>

            <motion.button
              onClick={() => {
                setIsSubmitted(false)
                setReflection("")
              }}
              className="mt-8 text-emerald-400/70 hover:text-emerald-400 transition-colors text-sm tracking-wider"
              whileHover={{ scale: 1.05 }}
            >
              Comenzar de Nuevo
            </motion.button>
          </motion.div>
        )}
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
