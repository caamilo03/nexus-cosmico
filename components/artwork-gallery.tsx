"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

const artworks = [
  {
    id: 1,
    title: "Fractales del Alma",
    gradient: "from-fuchsia-500 via-purple-600 to-blue-700",
    pattern: "radial",
  },
  {
    id: 2,
    title: "Nebulosa Interior",
    gradient: "from-cyan-400 via-teal-500 to-emerald-600",
    pattern: "spiral",
  },
  {
    id: 3,
    title: "Geometria Sagrada",
    gradient: "from-orange-500 via-rose-500 to-purple-600",
    pattern: "geometric",
  },
  {
    id: 4,
    title: "Ondas de Consciencia",
    gradient: "from-indigo-500 via-violet-500 to-fuchsia-500",
    pattern: "waves",
  },
]

function GenerativeArt({ gradient, pattern }: { gradient: string; pattern: string }) {
  const renderPattern = () => {
    switch (pattern) {
      case "radial":
        return (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute rounded-full bg-gradient-to-br ${gradient} opacity-30`}
                style={{
                  width: `${(i + 1) * 12}%`,
                  height: `${(i + 1) * 12}%`,
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
                animate={{
                  rotate: i % 2 === 0 ? 360 : -360,
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotate: { duration: 20 + i * 5, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4 + i, repeat: Infinity, ease: "easeInOut" },
                }}
              />
            ))}
          </>
        )
      case "spiral":
        return (
          <>
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-4 h-24 bg-gradient-to-t ${gradient} rounded-full opacity-40`}
                style={{
                  left: "50%",
                  top: "50%",
                  transformOrigin: "center bottom",
                }}
                animate={{
                  rotate: [i * 30, i * 30 + 360],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.2,
                }}
              />
            ))}
          </>
        )
      case "geometric":
        return (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute bg-gradient-to-br ${gradient} opacity-30`}
                style={{
                  width: "30%",
                  height: "30%",
                  left: `${20 + (i % 3) * 25}%`,
                  top: `${25 + Math.floor(i / 3) * 30}%`,
                  clipPath: i % 2 === 0 ? "polygon(50% 0%, 100% 100%, 0% 100%)" : "polygon(50% 100%, 0% 0%, 100% 0%)",
                }}
                animate={{
                  rotate: [0, 180, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 10 + i * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </>
        )
      case "waves":
        return (
          <>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute h-2 bg-gradient-to-r ${gradient} rounded-full opacity-50`}
                style={{
                  width: "120%",
                  left: "-10%",
                  top: `${20 + i * 15}%`,
                }}
                animate={{
                  scaleY: [1, 3, 1],
                  x: ["-5%", "5%", "-5%"],
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3,
                }}
              />
            ))}
          </>
        )
      default:
        return null
    }
  }

  return (
    <div className="relative w-full aspect-square max-w-md mx-auto overflow-hidden rounded-2xl bg-[#0a0512]">
      {renderPattern()}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-10`} />
    </div>
  )
}

export function ArtworkGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  }

  const navigate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prev) => {
      if (newDirection > 0) {
        return prev === artworks.length - 1 ? 0 : prev + 1
      }
      return prev === 0 ? artworks.length - 1 : prev - 1
    })
  }

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <div className="relative w-full max-w-lg aspect-square">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <GenerativeArt
              gradient={artworks[currentIndex].gradient}
              pattern={artworks[currentIndex].pattern}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.h3
        key={currentIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl md:text-2xl font-medium text-center"
      >
        {artworks[currentIndex].title}
      </motion.h3>

      <div className="flex items-center gap-6">
        <motion.button
          onClick={() => navigate(-1)}
          className="p-3 rounded-full border border-white/20 hover:border-white/40 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>

        <div className="flex gap-2">
          {artworks.map((_, i) => (
            <motion.div
              key={i}
              className={`w-2 h-2 rounded-full ${i === currentIndex ? "bg-white" : "bg-white/30"}`}
              animate={{ scale: i === currentIndex ? 1.3 : 1 }}
            />
          ))}
        </div>

        <motion.button
          onClick={() => navigate(1)}
          className="p-3 rounded-full border border-white/20 hover:border-white/40 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>
      </div>
    </div>
  )
}
