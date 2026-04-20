"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import {
  Bot,
  Newspaper,
  BookOpen,
  MessageCircle,
  Sparkles,
  Link as LinkIcon,
  Menu,
  X,
  Search,
  PenSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { SearchModal } from "./search-modal";

const categories = [
  { name: "AI 工具", slug: "ai-tools", icon: Bot, color: "#6366f1" },
  { name: "行业资讯", slug: "news", icon: Newspaper, color: "#10b981" },
  { name: "技术教程", slug: "tutorials", icon: BookOpen, color: "#f59e0b" },
  { name: "讨论区", slug: "discussion", icon: MessageCircle, color: "#ec4899" },
  { name: "创意展示", slug: "showcase", icon: Sparkles, color: "#8b5cf6" },
  { name: "资源分享", slug: "resources", icon: LinkIcon, color: "#06b6d4" },
];

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Global keyboard shortcut for search
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setIsSearchOpen(true);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-200",
          scrolled && "shadow-sm"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">AIclaw</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = pathname === `/category/${cat.slug}`;
                return (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-accent",
                      isActive && "bg-accent"
                    )}
                  >
                    <Icon className="w-4 h-4" style={{ color: cat.color }} />
                    <span className="hidden lg:inline">{cat.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Search & Actions */}
            <div className="flex items-center gap-2">
              {/* Search Button */}
              <Button 
                variant="outline" 
                className="hidden sm:flex items-center gap-2 w-48 lg:w-64 justify-start text-muted-foreground"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="w-4 h-4" />
                <span className="flex-1 text-left text-sm">搜索帖子...</span>
                <kbd className="hidden lg:inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </Button>

              <Button size="sm" asChild className="hidden sm:flex">
                <Link href="/create">
                  <PenSquare className="w-4 h-4 mr-2" />
                  发帖
                </Link>
              </Button>
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t animate-fadeIn">
              <button
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent mb-3"
                onClick={() => {
                  setIsSearchOpen(true);
                  setIsMenuOpen(false);
                }}
              >
                <Search className="w-4 h-4" />
                搜索帖子
              </button>
              <nav className="grid grid-cols-2 gap-2">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium hover:bg-accent"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon className="w-4 h-4" style={{ color: cat.color }} />
                      {cat.name}
                    </Link>
                  );
                })}
              </nav>
              <Button className="w-full mt-4" asChild>
                <Link href="/create" onClick={() => setIsMenuOpen(false)}>
                  <PenSquare className="w-4 h-4 mr-2" />
                  发帖
                </Link>
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
