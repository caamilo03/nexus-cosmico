"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface PortalProps {
  title: string
  color: string
  secondaryColor: string
  onClick: () => void
  delay?: number
}

export function Portal({ title, color, secondaryColor, onClick, delay = 0 }: PortalProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.button
      className="relative flex flex-col items-center gap-4 cursor-pointer group"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, scale: 0, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ 
        duration: 0.8, 
        delay,
        type: "spring",
        stiffness: 100 
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Outer glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full blur-2xl"
        style={{ backgroundColor: color }}
        animate={{
          opacity: isHovered ? 0.6 : 0.2,
          scale: isHovered ? 1.5 : 1,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Main portal circle */}
      <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48">
        {/* Rotating outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(from 0deg, ${color}, ${secondaryColor}, ${color})`,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />

        {/* Inner dark circle */}
        <motion.div
          className="absolute inset-2 rounded-full bg-[#05020f]/80 backdrop-blur-sm"
          animate={{
            boxShadow: isHovered
              ? `inset 0 0 40px ${color}80, 0 0 60px ${color}60`
              : `inset 0 0 20px ${color}40, 0 0 30px ${color}30`,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Pulsing core */}
        <motion.div
          className="absolute inset-6 rounded-full"
          style={{
            background: `radial-gradient(circle, ${color}60 0%, transparent 70%)`,
          }}
          animate={{
            scale: isHovered ? [1, 1.2, 1] : [1, 1.1, 1],
            opacity: isHovered ? [0.8, 1, 0.8] : [0.5, 0.7, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Particle effects when hovered */}
        {isHovered && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  backgroundColor: i % 2 === 0 ? color : secondaryColor,
                  left: "50%",
                  top: "50%",
                }}
                initial={{ x: 0, y: 0, opacity: 1 }}
                animate={{
                  x: Math.cos((i * Math.PI) / 4) * 80,
                  y: Math.sin((i * Math.PI) / 4) * 80,
                  opacity: 0,
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeOut",
                }}
              />
            ))}
          </>
        )}
      </div>

      {/* Title */}
      <motion.span
        className="text-sm md:text-base lg:text-lg font-medium tracking-wider"
        style={{ color: isHovered ? color : "white" }}
        animate={{
          textShadow: isHovered ? `0 0 20px ${color}` : "none",
        }}
        transition={{ duration: 0.3 }}
      >
        {title}
      </motion.span>
    </motion.button>
  )
}
