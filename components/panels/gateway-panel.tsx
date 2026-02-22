"use client"

import { motion } from "framer-motion"

interface GatewayPanelProps {
  onEnter: () => void
}

export function GatewayPanel({ onEnter }: GatewayPanelProps) {
  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.5 }}
      transition={{ duration: 0.8 }}
    >
      {/* Decorative rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-white/10"
            style={{
              width: `${(i + 1) * 300}px`,
              height: `${(i + 1) * 300}px`,
            }}
            animate={{
              rotate: i % 2 === 0 ? 360 : -360,
              scale: [1, 1.05, 1],
            }}
            transition={{
              rotate: { duration: 30 + i * 10, repeat: Infinity, ease: "linear" },
              scale: { duration: 4 + i * 2, repeat: Infinity, ease: "easeInOut" },
            }}
          />
        ))}
      </div>

      {/* Main title */}
      <motion.h1
        className="relative text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider text-center px-4"
        style={{
          fontFamily: "var(--font-display), Orbitron, sans-serif",
          background: "linear-gradient(135deg, #c084fc 0%, #f472b6 50%, #22d3ee 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <motion.span
          animate={{
            textShadow: [
              "0 0 20px rgba(192, 132, 252, 0.5)",
              "0 0 40px rgba(244, 114, 182, 0.5)",
              "0 0 20px rgba(192, 132, 252, 0.5)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Nexus Cosmico
        </motion.span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="mt-4 text-lg md:text-xl text-white/60 tracking-widest text-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        Un Viaje a la Conciencia
      </motion.p>

      {/* Enter button */}
      <motion.button
        onClick={onEnter}
        className="relative mt-12 px-8 py-4 rounded-full overflow-hidden group"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Button background */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "linear-gradient(135deg, rgba(192, 132, 252, 0.3) 0%, rgba(34, 211, 238, 0.3) 100%)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
          animate={{
            boxShadow: [
              "0 0 20px rgba(192, 132, 252, 0.3), inset 0 0 20px rgba(192, 132, 252, 0.1)",
              "0 0 40px rgba(34, 211, 238, 0.3), inset 0 0 30px rgba(34, 211, 238, 0.1)",
              "0 0 20px rgba(192, 132, 252, 0.3), inset 0 0 20px rgba(192, 132, 252, 0.1)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Button text */}
        <span className="relative z-10 text-lg md:text-xl tracking-widest text-white/90 font-medium">
          Comienza el Viaje
        </span>

        {/* Hover glow */}
        <motion.div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            background: "linear-gradient(135deg, rgba(192, 132, 252, 0.4) 0%, rgba(34, 211, 238, 0.4) 100%)",
          }}
        />
      </motion.button>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border border-white/30 flex justify-center pt-2"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div className="w-1 h-2 bg-white/50 rounded-full" />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
