"use client"

import { useState, useCallback } from "react"
import { AnimatePresence } from "framer-motion"
import { NebulaBackground } from "@/components/nebula-background"
import { GatewayPanel } from "@/components/panels/gateway-panel"
import { ExplorationPanel } from "@/components/panels/exploration-panel"
import { MindPanel } from "@/components/panels/mind-panel"
import { SoundPanel } from "@/components/panels/sound-panel"
import { VisionsPanel } from "@/components/panels/visions-panel"
import { ConnectionPanel } from "@/components/panels/connection-panel"

type Section = "gateway" | "exploration" | "mind" | "sound" | "visions" | "connection"

const sectionToVariant: Record<Section, "gateway" | "exploration" | "mind" | "sound" | "visions" | "connection"> = {
  gateway: "gateway",
  exploration: "exploration",
  mind: "mind",
  sound: "sound",
  visions: "visions",
  connection: "connection",
}

export default function NexusCosmico() {
  const [currentSection, setCurrentSection] = useState<Section>("gateway")

  const handleNavigate = useCallback((section: string) => {
    setCurrentSection(section as Section)
  }, [])

  const handleBackToExploration = useCallback(() => {
    setCurrentSection("exploration")
  }, [])

  const renderPanel = () => {
    switch (currentSection) {
      case "gateway":
        return (
          <GatewayPanel
            key="gateway"
            onEnter={() => handleNavigate("exploration")}
          />
        )
      case "exploration":
        return (
          <ExplorationPanel
            key="exploration"
            onNavigate={handleNavigate}
          />
        )
      case "mind":
        return (
          <MindPanel
            key="mind"
            onBack={handleBackToExploration}
          />
        )
      case "sound":
        return (
          <SoundPanel
            key="sound"
            onBack={handleBackToExploration}
          />
        )
      case "visions":
        return (
          <VisionsPanel
            key="visions"
            onBack={handleBackToExploration}
          />
        )
      case "connection":
        return (
          <ConnectionPanel
            key="connection"
            onBack={handleBackToExploration}
          />
        )
      default:
        return null
    }
  }

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#05020f]">
      {/* Animated background */}
      <AnimatePresence mode="wait">
        <NebulaBackground key={currentSection} variant={sectionToVariant[currentSection]} />
      </AnimatePresence>

      {/* Panels */}
      <AnimatePresence mode="wait">
        {renderPanel()}
      </AnimatePresence>

      {/* Vignette overlay for depth */}
      <div
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, rgba(5, 2, 15, 0.4) 100%)",
        }}
      />
    </main>
  )
}
