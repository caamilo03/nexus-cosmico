"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

export function AudioVisualizer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [bars, setBars] = useState<number[]>(Array(32).fill(0.2))
  const animationRef = useRef<number>(0)

  useEffect(() => {
    if (!isPlaying) {
      setBars(Array(32).fill(0.2))
      return
    }

    const animate = () => {
      setBars((prev) =>
        prev.map((_, i) => {
          const baseHeight = 0.3 + Math.sin(Date.now() * 0.002 + i * 0.3) * 0.2
          const randomness = Math.random() * 0.3
          return Math.min(1, Math.max(0.1, baseHeight + randomness))
        })
      )
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()
    return () => cancelAnimationFrame(animationRef.current)
  }, [isPlaying])

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Visualizer bars */}
      <div className="flex items-end justify-center gap-1 h-48 md:h-64 w-full max-w-xl px-4">
        {bars.map((height, i) => (
          <motion.div
            key={i}
            className="w-2 md:w-3 rounded-full"
            style={{
              background: `linear-gradient(to top, #06b6d4, #8b5cf6)`,
              boxShadow: isPlaying ? "0 0 10px rgba(6, 182, 212, 0.5)" : "none",
            }}
            animate={{ height: `${height * 100}%` }}
            transition={{ duration: 0.1 }}
          />
        ))}
      </div>

      {/* Play/Pause button */}
      <motion.button
        onClick={() => setIsPlaying(!isPlaying)}
        className="relative w-20 h-20 rounded-full flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)",
          }}
          animate={{
            boxShadow: isPlaying
              ? ["0 0 30px rgba(6, 182, 212, 0.6)", "0 0 50px rgba(139, 92, 246, 0.6)", "0 0 30px rgba(6, 182, 212, 0.6)"]
              : "0 0 20px rgba(6, 182, 212, 0.3)",
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Icon */}
        {isPlaying ? (
          <div className="flex gap-1.5 relative z-10">
            <div className="w-2 h-8 bg-white rounded-sm" />
            <div className="w-2 h-8 bg-white rounded-sm" />
          </div>
        ) : (
          <div
            className="relative z-10 w-0 h-0 ml-1"
            style={{
              borderLeft: "20px solid white",
              borderTop: "12px solid transparent",
              borderBottom: "12px solid transparent",
            }}
          />
        )}
      </motion.button>

      <p className="text-center text-muted-foreground text-sm md:text-base max-w-md">
        Cierra los ojos y deja que los sonidos te guien hacia tu interior
      </p>
    </div>
  )
}
