"use client"

import { useEffect, useRef, useMemo } from "react"
import { motion } from "framer-motion"

interface NebulaBackgroundProps {
  variant?: "gateway" | "exploration" | "mind" | "sound" | "visions" | "connection"
}

const colorSchemes = {
  gateway: {
    colors: ["#4f46e5", "#7c3aed", "#c026d3", "#0ea5e9"],
    speed: 0.0003,
  },
  exploration: {
    colors: ["#8b5cf6", "#ec4899", "#06b6d4", "#10b981"],
    speed: 0.0004,
  },
  mind: {
    colors: ["#3b82f6", "#6366f1", "#8b5cf6", "#a855f7"],
    speed: 0.0002,
  },
  sound: {
    colors: ["#14b8a6", "#06b6d4", "#0ea5e9", "#3b82f6"],
    speed: 0.0003,
  },
  visions: {
    colors: ["#f43f5e", "#ec4899", "#d946ef", "#a855f7"],
    speed: 0.0004,
  },
  connection: {
    colors: ["#10b981", "#14b8a6", "#06b6d4", "#22d3ee"],
    speed: 0.0002,
  },
}

export function NebulaBackground({ variant = "gateway" }: NebulaBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const timeRef = useRef(0)
  const scheme = colorSchemes[variant]

  const particles = useMemo(() => {
    return Array.from({ length: 100 }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.0002,
      speedY: (Math.random() - 0.5) * 0.0002,
      opacity: Math.random() * 0.5 + 0.2,
    }))
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const drawNebula = (time: number) => {
      const { width, height } = canvas
      ctx.fillStyle = "rgba(5, 2, 15, 0.1)"
      ctx.fillRect(0, 0, width, height)

      // Draw flowing nebula clouds
      for (let i = 0; i < 4; i++) {
        const color = scheme.colors[i]
        const centerX = width * (0.3 + 0.4 * Math.sin(time * scheme.speed * (i + 1) + i * Math.PI * 0.5))
        const centerY = height * (0.3 + 0.4 * Math.cos(time * scheme.speed * (i + 0.5) + i * Math.PI * 0.3))
        const radius = Math.min(width, height) * (0.3 + 0.2 * Math.sin(time * scheme.speed * 0.5 + i))

        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)
        gradient.addColorStop(0, color + "40")
        gradient.addColorStop(0.5, color + "15")
        gradient.addColorStop(1, "transparent")

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw particles
      particles.forEach((particle) => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x < 0) particle.x = 1
        if (particle.x > 1) particle.x = 0
        if (particle.y < 0) particle.y = 1
        if (particle.y > 1) particle.y = 0

        const x = particle.x * width
        const y = particle.y * height
        const twinkle = 0.5 + 0.5 * Math.sin(time * 0.003 + particle.x * 10)

        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity * twinkle})`
        ctx.beginPath()
        ctx.arc(x, y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    const animate = () => {
      timeRef.current += 16
      drawNebula(timeRef.current)
      animationRef.current = requestAnimationFrame(animate)
    }

    // Initial fill
    ctx.fillStyle = "#05020f"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    animate()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationRef.current)
    }
  }, [scheme, particles])

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    />
  )
}
