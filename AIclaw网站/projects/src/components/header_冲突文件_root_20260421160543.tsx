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
  { name: "AI 工具", slug: "ai-tools", icon: Bot, color: "#6366f1", subcategories: [
    { name: "生成式 AI", slug: "generative-ai", icon: Sparkles, color: "#8b5cf6" },
    { name: "对话助手", slug: "chatbots", icon: MessageCircle, color: "#ec4899" },
    { name: "图像生成", slug: "image-generators", icon: Sparkles, color: "#f59e0b" },
    { name: "视频生成", slug: "video-generators", icon: Sparkles, color: "#10b981" },
    { name: "音频工具", slug: "audio-tools", icon: Sparkles, color: "#06b6d4" },
    { name: "代码工具", slug: "code-tools", icon: Sparkles, color: "#6366f1" },
  ]},
  { name: "行业资讯", slug: "news", icon: Newspaper, color: "#10b981", subcategories: [
    { name: "企业动态", slug: "company-news", icon: Newspaper, color: "#10b981" },
    { name: "技术突破", slug: "tech-breakthroughs", icon: Newspaper, color: "#6366f1" },
    { name: "投资融资", slug: "funding", icon: Newspaper, color: "#f59e0b" },
    { name: "政策法规", slug: "policy", icon: Newspaper, color: "#ec4899" },
  ]},
  { name: "技术教程", slug: "tutorials", icon: BookOpen, color: "#f59e0b", subcategories: [
    { name: "大模型", slug: "llm", icon: BookOpen, color: "#6366f1" },
    { name: "机器学习", slug: "machine-learning", icon: BookOpen, color: "#10b981" },
    { name: "深度学习", slug: "deep-learning", icon: BookOpen, color: "#f59e0b" },
    { name: "计算机视觉", slug: "computer-vision", icon: BookOpen, color: "#ec4899" },
    { name: "自然语言处理", slug: "nlp", icon: BookOpen, color: "#8b5cf6" },
  ]},
  { name: "讨论区", slug: "discussion", icon: MessageCircle, color: "#ec4899", subcategories: [
    { name: "技术讨论", slug: "tech-discussion", icon: MessageCircle, color: "#6366f1" },
    { name: "工具评测", slug: "tool-reviews", icon: MessageCircle, color: "#10b981" },
    { name: "职业发展", slug: "career", icon: MessageCircle, color: "#f59e0b" },
    { name: "学习交流", slug: "learning", icon: MessageCircle, color: "#ec4899" },
  ]},
  { name: "创意展示", slug: "showcase", icon: Sparkles, color: "#8b5cf6", subcategories: [
    { name: "AI 绘画", slug: "ai-art", icon: Sparkles, color: "#f59e0b" },
    { name: "AI 写作", slug: "ai-writing", icon: Sparkles, color: "#10b981" },
    { name: "AI 音乐", slug: "ai-music", icon: Sparkles, color: "#ec4899" },
    { name: "AI 视频", slug: "ai-video", icon: Sparkles, color: "#06b6d4" },
  ]},
  { name: "资源分享", slug: "resources", icon: LinkIcon, color: "#06b6d4", subcategories: [
    { name: "数据集", slug: "datasets", icon: LinkIcon, color: "#6366f1" },
    { name: "论文", slug: "papers", icon: LinkIcon, color: "#10b981" },
    { name: "代码库", slug: "code-repos", icon: LinkIcon, color: "#f59e0b" },
    { name: "学习资料", slug: "learning-materials", icon: LinkIcon, color: "#ec4899" },
  ]},
  { name: "专业深度", slug: "professional", icon: BookOpen, color: "#6366f1", subcategories: [
    { name: "研究报告", slug: "research-reports", icon: BookOpen, color: "#6366f1" },
    { name: "案例分析", slug: "case-studies", icon: BookOpen, color: "#10b981" },
    { name: "行业洞察", slug: "industry-insights", icon: BookOpen, color: "#f59e0b" },
    { name: "技术前沿", slug: "tech-frontier", icon: BookOpen, color: "#ec4899" },
  ]},
];

interface Category {
  name: string;
  slug: string;
  icon: any;
  color: string;
  subcategories?: {
    name: string;
    slug: string;
    icon: any;
    color: string;
  }[];
}

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
                  <div key={cat.slug} className="relative group">
                    <Link
                      href={`/category/${cat.slug}`}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-accent",
                        isActive && "bg-accent"
                      )}
                    >
                      <Icon className="w-4 h-4" style={{ color: cat.color }} />
                      <span className="hidden lg:inline">{cat.name}</span>
                      {cat.subcategories && cat.subcategories.length > 0 && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                          <path d="m6 9 6 6 6-6"/>
                        </svg>
                      )}
                    </Link>
                    {cat.subcategories && cat.subcategories.length > 0 && (
                      <div className="absolute left-0 top-full mt-1 w-48 bg-background border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                        <div className="py-1">
                          {cat.subcategories.map((subcat) => {
                            const SubIcon = subcat.icon;
                            return (
                              <Link
                                key={subcat.slug}
                                href={`/category/${cat.slug}/${subcat.slug}`}
                                className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent transition-colors"
                              >
                                <SubIcon className="w-4 h-4" style={{ color: subcat.color }} />
                                {subcat.name}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
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
              <div className="space-y-2">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <div key={cat.slug} className="space-y-1">
                      <Link
                        href={`/category/${cat.slug}`}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium hover:bg-accent"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Icon className="w-4 h-4" style={{ color: cat.color }} />
                        {cat.name}
                        {cat.subcategories && cat.subcategories.length > 0 && (
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto">
                            <path d="m6 9 6 6 6-6"/>
                          </svg>
                        )}
                      </Link>
                      {cat.subcategories && cat.subcategories.length > 0 && (
                        <div className="pl-6 space-y-1">
                          {cat.subcategories.map((subcat) => {
                            const SubIcon = subcat.icon;
                            return (
                              <Link
                                key={subcat.slug}
                                href={`/category/${cat.slug}/${subcat.slug}`}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm hover:bg-accent transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                <SubIcon className="w-3 h-3" style={{ color: subcat.color }} />
                                {subcat.name}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
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
