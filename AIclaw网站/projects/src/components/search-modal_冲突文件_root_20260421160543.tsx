"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  X,
  Bot,
  Newspaper,
  BookOpen,
  MessageCircle,
  Sparkles,
  Link as LinkIcon,
  TrendingUp,
  Eye,
  Heart,
  MessageSquare,
  Loader2,
  Filter
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

const categoryIcons: Record<string, any> = {
  "ai-tools": Bot,
  "news": Newspaper,
  "tutorials": BookOpen,
  "discussion": MessageCircle,
  "showcase": Sparkles,
  "resources": LinkIcon,
};

interface Post {
  id: string;
  title: string;
  summary: string;
  view_count: number;
  like_count: number;
  comment_count: number;
  created_at: string;
  cover_image?: string;
  profiles: {
    username: string;
    display_name: string;
    avatar_url?: string;
  };
  categories: {
    name: string;
    slug: string;
    icon: string;
    color: string;
  };
}

export function SearchModal({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchType, setSearchType] = useState<"all" | "ai-tools" | "news" | "tutorials" | "discussion" | "showcase" | "resources" | "professional">('all');
  const [sortBy, setSortBy] = useState<"relevance" | "latest" | "popular">('relevance');
  const router = useRouter();

  const search = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      let url = `/api/posts?search=${encodeURIComponent(searchQuery)}&limit=10&sort=${sortBy}`;
      if (searchType !== "all") {
        url += `&category=${searchType}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      if (data.data) {
        setResults(data.data);
      }
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  }, [searchType, sortBy]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      search(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query, search]);

  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const categoryFilters = [
    { value: "all", label: "全部" },
    { value: "ai-tools", label: "AI工具" },
    { value: "news", label: "资讯" },
    { value: "tutorials", label: "教程" },
    { value: "discussion", label: "讨论" },
    { value: "showcase", label: "创意" },
    { value: "resources", label: "资源" },
    { value: "professional", label: "专业" },
  ];

  const sortOptions = [
    { value: "relevance", label: "相关度" },
    { value: "latest", label: "最新" },
    { value: "popular", label: "热门" },
  ];

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative mx-auto mt-[10vh] max-w-2xl w-full mx-4">
        <Card className="shadow-2xl">
          <CardContent className="p-0">
            {/* Search Input */}
            <div className="flex items-center border-b px-4">
              <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              <Input
                type="text"
                placeholder="搜索帖子标题、内容..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="border-0 focus-visible:ring-0 text-lg h-14"
                autoFocus
              />
              {query && (
                <Button variant="ghost" size="icon" onClick={() => setQuery("")}>
                  <X className="w-4 h-4" />
                </Button>
              )}
              <Button variant="ghost" size="icon" onClick={onClose}>
                <span className="text-xs text-muted-foreground">ESC</span>
              </Button>
            </div>

            {/* Category Filters */}
            <div className="flex items-center gap-2 px-4 py-2 border-b overflow-x-auto">
              {categoryFilters.map((cat) => (
                <Button
                  key={cat.value}
                  variant={searchType === cat.value ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSearchType(cat.value as any)}
                  className="flex-shrink-0"
                >
                  {cat.label}
                </Button>
              ))}
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-2 px-4 py-2 border-b overflow-x-auto">
              {sortOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={sortBy === option.value ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSortBy(option.value as any)}
                  className="flex-shrink-0"
                >
                  {option.label}
                </Button>
              ))}
            </div>

            {/* Results */}
            <div className="max-h-[50vh] overflow-y-auto p-2">
              {loading ? (
                <div className="space-y-2 p-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex gap-3 p-2">
                      <Skeleton className="w-16 h-16 rounded-lg" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-full" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : results.length > 0 ? (
                <div className="space-y-1">
                  {results.map((post) => {
                    const Icon = categoryIcons[post.categories?.slug] || Bot;
                    return (
                      <Link
                        key={post.id}
                        href={`/post/${post.id}`}
                        onClick={onClose}
                        className="flex gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                      >
                        {post.cover_image ? (
                          <img
                            src={post.cover_image}
                            alt=""
                            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                          />
                        ) : (
                          <div 
                            className="w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: `${post.categories?.color || '#6366f1'}20` }}
                          >
                            <Icon className="w-6 h-6" style={{ color: post.categories?.color || '#6366f1' }} />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge 
                              variant="secondary" 
                              className="text-xs"
                              style={{ 
                                color: post.categories?.color,
                                backgroundColor: `${post.categories?.color}20`
                              }}
                            >
                              {post.categories?.name}
                            </Badge>
                          </div>
                          <h4 className="font-medium line-clamp-1">{post.title}</h4>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {post.summary}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {post.view_count}
                            </span>
                            <span className="flex items-center gap-1">
                              <Heart className="w-3 h-3" />
                              {post.like_count}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageSquare className="w-3 h-3" />
                              {post.comment_count}
                            </span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : query ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>没有找到与 "{query}" 相关的内容</p>
                  <p className="text-sm mt-1">试试其他关键词</p>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>输入关键词开始搜索</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t px-4 py-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>按 Enter 键搜索</span>
              <span>按 ESC 关闭</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
