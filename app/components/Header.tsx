"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, User, PlusCircle, LayoutGrid, Bot } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B0B0B]/80 backdrop-blur-xl border-b border-[#262626]">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo -> Landing Page */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
              className="w-8 h-8 bg-gradient-to-br from-[#E5C07B] to-[#C9B26A] rounded-lg flex items-center justify-center"
            >
              <Sparkles className="w-5 h-5 text-black" />
            </motion.div>
            <span className="text-xl font-bold text-[#F5F5F5] group-hover:text-[#E5C07B] transition-colors">
              KnowledgeVault
            </span>
          </Link>

          {/* Public Navigation Items (Always Visible) */}
          <div className="flex items-center gap-6">
            {/* 1. Collections */}
            <Link
              href="/collections"
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                isActive("/collections")
                  ? "text-[#E5C07B]"
                  : "text-[#A1A1AA] hover:text-[#F5F5F5]"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              Collections
            </Link>
            {/* 2. Add Knowledge (Points to /add) */}
            <Link
              href="/add"
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                isActive("/add")
                  ? "text-[#E5C07B]"
                  : "text-[#A1A1AA] hover:text-[#F5F5F5]"
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              Add Knowledge
            </Link>
            {/* 3. Profile */}
            <Link
              href="/profile"
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                isActive("/profile")
                  ? "text-[#E5C07B]"
                  : "text-[#A1A1AA] hover:text-[#F5F5F5]"
              }`}
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
            </Link>

            {/* 4. Chat AI */}
            <Link
              href="/chat"
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                isActive("/chat")
                  ? "text-[#E5C07B]"
                  : "text-[#A1A1AA] hover:text-[#F5F5F5]"
              }`}
            >
              <Bot className="w-4 h-4" />
              Ask AI
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
