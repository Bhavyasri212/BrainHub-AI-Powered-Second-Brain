"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Box,
  Cpu,
  Layers,
  Share2,
  Database,
  Layout,
  Server,
  Brain,
  CheckCircle,
  Terminal,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Docs() {
  const [activeTab, setActiveTab] = useState("portable");

  const architectureLayers = [
    {
      icon: Layout,
      label: "Frontend (The Face)",
      tech: "Next.js 14 + Tailwind",
      desc: "What you see. A fast, interactive interface that runs in your browser.",
    },
    {
      icon: Server,
      label: "API Layer (The Connector)",
      tech: "Next.js API Routes",
      desc: "Securely handles requests between the frontend and our database/AI.",
    },
    {
      icon: Brain,
      label: "Intelligence (The Brain)",
      tech: "Gemini 1.5 Flash",
      desc: "Google's AI model that reads, summarizes, and tags your notes automatically.",
    },
    {
      icon: Database,
      label: "Memory (The Vault)",
      tech: "Supabase (PostgreSQL)",
      desc: "A robust cloud database that stores your knowledge forever.",
    },
  ];

  return (
    <div
      className="min-h-screen bg-[#0B0B0B] pt-10
     pb-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-[#E5C07B]/30"
    >
      <div className="max-w-6xl mx-auto">
        {/* Navigation */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#A1A1AA] hover:text-[#E5C07B] mb-8 transition-colors group text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 border-b border-[#262626] pb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-[#E5C07B]/10 text-[#E5C07B] border border-[#E5C07B]/20 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider">
              System Architecture
            </span>
          </div>
          <h1 className="text-5xl font-bold text-[#F5F5F5] mb-6 tracking-tight">
            How KnowledgeVault <span className="text-[#E5C07B]">Works</span>
          </h1>
          <p className="text-xl text-[#A1A1AA] max-w-2xl leading-relaxed">
            A simple breakdown of the four core principles that make this app
            smart, fast, and scalable.
          </p>
        </motion.div>

        {/* Content Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-3 space-y-2 sticky top-24 self-start">
            {[
              { id: "portable", icon: Box, label: "Portable Architecture" },
              { id: "ux", icon: Layers, label: "Principles-Based UX" },
              { id: "agent", icon: Cpu, label: "Agent Thinking" },
              { id: "infra", icon: Share2, label: "Infrastructure Mindset" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                  activeTab === item.id
                    ? "bg-[#E5C07B] text-black shadow-lg shadow-[#E5C07B]/20"
                    : "text-[#A1A1AA] hover:bg-[#1A1A1A] hover:text-[#F5F5F5]"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9 min-h-[600px]">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* SECTION 1: PORTABLE ARCHITECTURE */}
              {activeTab === "portable" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold text-[#F5F5F5] mb-4">
                      Portable Architecture
                    </h2>
                    <p className="text-[#A1A1AA] leading-relaxed">
                      Imagine building with Lego blocks instead of glue. We
                      designed this system so that any part (the AI, the
                      database, or the design) can be swapped out without
                      breaking the whole app. It's built to last and easy to
                      upgrade.
                    </p>
                  </div>

                  <div className="grid gap-4">
                    {architectureLayers.map((layer, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-6 p-6 bg-[#141414] border border-[#262626] rounded-2xl relative overflow-hidden group"
                      >
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#E5C07B] opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="p-3 bg-[#0B0B0B] rounded-lg border border-[#262626]">
                          <layer.icon className="w-6 h-6 text-[#E5C07B]" />
                        </div>
                        <div>
                          <h3 className="text-[#F5F5F5] font-semibold">
                            {layer.label}
                          </h3>
                          <p className="text-sm text-[#A1A1AA]">{layer.desc}</p>
                        </div>
                        <div className="ml-auto hidden sm:block text-xs font-mono text-[#52525B] bg-[#0B0B0B] px-3 py-1 rounded-full border border-[#262626]">
                          {layer.tech}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SECTION 2: PRINCIPLES-BASED UX */}
              {activeTab === "ux" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold text-[#F5F5F5] mb-4">
                      Principles-Based UX
                    </h2>
                    <p className="text-[#A1A1AA] leading-relaxed">
                      Software shouldn't just look good; it should feel good. We
                      followed specific design principles to ensure capturing
                      knowledge feels effortless, not like a chore.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-[#141414] border border-[#262626] rounded-2xl">
                      <div className="mb-4 bg-[#0B0B0B] h-32 rounded-xl flex items-center justify-center border border-[#262626] overflow-hidden">
                        {/* Mock Animation */}
                        <div className="flex gap-2 items-center">
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="w-3 h-3 rounded-full bg-[#E5C07B]"
                          />
                          <div className="h-1 w-12 bg-[#262626] rounded-full" />
                          <div className="w-8 h-8 rounded-lg bg-[#262626] border border-[#333] flex items-center justify-center text-[10px] text-[#555]">
                            AI
                          </div>
                        </div>
                      </div>
                      <h3 className="text-[#F5F5F5] font-bold mb-2">
                        Motion with Meaning
                      </h3>
                      <p className="text-sm text-[#A1A1AA]">
                        We use smooth animations (Framer Motion) to guide your
                        eye. Notice how lists slide in and modals fade? That's
                        intentional to reduce cognitive load.
                      </p>
                    </div>
                    <div className="p-6 bg-[#141414] border border-[#262626] rounded-2xl">
                      <div className="mb-4 bg-[#0B0B0B] h-32 rounded-xl flex items-center justify-center border border-[#262626]">
                        <div className="px-4 py-2 bg-[#E5C07B]/10 border border-[#E5C07B] text-[#E5C07B] rounded-lg text-sm font-mono">
                          Auto-Save
                        </div>
                      </div>
                      <h3 className="text-[#F5F5F5] font-bold mb-2">
                        Optimistic UI
                      </h3>
                      <p className="text-sm text-[#A1A1AA]">
                        The app feels instant. When you add an item or chat, the
                        interface updates immediately while the data saves in
                        the background. No waiting for spinners.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION 3: AGENT THINKING */}
              {activeTab === "agent" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold text-[#F5F5F5] mb-4">
                      Agent Thinking
                    </h2>
                    <p className="text-[#A1A1AA] leading-relaxed">
                      Most apps are "passive"—they just store what you type.
                      KnowledgeVault is "active." It uses an AI Agent (Gemini)
                      to act as a librarian that cleans and organizes your data
                      for you.
                    </p>
                  </div>

                  <div className="bg-[#141414] border border-[#262626] rounded-2xl p-8">
                    <h3 className="text-lg font-bold text-[#F5F5F5] mb-6 flex items-center gap-2">
                      <Brain className="w-5 h-5 text-[#E5C07B]" /> The
                      Automation Workflow
                    </h3>
                    <div className="space-y-6 relative before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-0.5 before:bg-[#262626]">
                      {[
                        {
                          title: "1. You Input Messy Data",
                          desc: "You paste a long URL or type a quick, unstructured thought.",
                        },
                        {
                          title: "2. The Agent Wakes Up",
                          desc: "Before saving, our AI reads your content to understand the context.",
                        },
                        {
                          title: "3. Auto-Enhancement",
                          desc: "It generates a clear title, a 1-sentence summary, and relevant tags automatically.",
                        },
                        {
                          title: "4. Organized Storage",
                          desc: "Your data is saved, cleanly structured, making it easy to find later.",
                        },
                      ].map((step, i) => (
                        <div key={i} className="relative pl-12">
                          <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-[#0B0B0B] border border-[#262626] flex items-center justify-center z-10">
                            <span className="text-[#E5C07B] font-mono text-sm">
                              {i + 1}
                            </span>
                          </div>
                          <h4 className="text-[#F5F5F5] font-semibold">
                            {step.title}
                          </h4>
                          <p className="text-sm text-[#A1A1AA]">{step.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION 4: INFRASTRUCTURE MINDSET */}
              {activeTab === "infra" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold text-[#F5F5F5] mb-4">
                      Infrastructure Mindset
                    </h2>
                    <p className="text-[#A1A1AA] leading-relaxed">
                      We didn't just build a website; we built a platform. The
                      core features (like Search and Chat) are built as API
                      endpoints (`/api/search`, `/api/chat`). This means you
                      could eventually build a mobile app or Chrome extension
                      that connects to this same brain.
                    </p>
                  </div>

                  <div className="bg-[#0B0B0B] border border-[#262626] rounded-2xl overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 bg-[#141414] border-b border-[#262626]">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-[#A1A1AA]" />
                        <span className="text-xs text-[#A1A1AA] font-mono">
                          Developer Terminal
                        </span>
                      </div>
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                      </div>
                    </div>
                    <div className="p-6 font-mono text-sm overflow-x-auto">
                      <div className="text-[#A1A1AA] mb-2">
                        # Example: Asking the Semantic Search API
                      </div>
                      <div className="flex gap-2">
                        <span className="text-[#E5C07B]">curl</span>
                        <span className="text-[#F5F5F5]">-X POST</span>
                        <span className="text-[#A1A1AA]">.../api/search \</span>
                      </div>
                      <div className="pl-4">
                        <span className="text-[#F5F5F5]">-H</span>{" "}
                        <span className="text-[#98C379]">
                          'Content-Type: application/json'
                        </span>{" "}
                        <span className="text-[#A1A1AA]">\</span>
                      </div>
                      <div className="pl-4 mb-4">
                        <span className="text-[#F5F5F5]">-d</span>{" "}
                        <span className="text-[#98C379]">
                          '{"{"} "query": "Machine Learning" {"}"}'
                        </span>
                      </div>

                      <div className="text-[#A1A1AA] mt-6 mb-2">
                        # The System Returns (JSON)
                      </div>
                      <div className="text-[#61AFEF]">
                        {"["}
                        <div className="pl-4">
                          {"{"} <span className="text-[#E06C75]">"id"</span>:{" "}
                          <span className="text-[#D19A66]">101</span>,{" "}
                          <span className="text-[#E06C75]">"title"</span>:{" "}
                          <span className="text-[#98C379]">"Intro to AI"</span>,{" "}
                          <span className="text-[#E06C75]">"relevance"</span>:{" "}
                          <span className="text-[#D19A66]">0.98</span> {"}"}
                        </div>
                        {"]"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-[#E5C07B]/5 border border-[#E5C07B]/20 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-[#E5C07B] mt-0.5" />
                    <div>
                      <h4 className="text-[#F5F5F5] font-semibold text-sm">
                        Why this matters?
                      </h4>
                      <p className="text-sm text-[#A1A1AA] mt-1">
                        It ensures your data isn't trapped. In the future, you
                        can connect this backend to Slack, Discord, or any other
                        tool you work with.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
