"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Bot, Newspaper, BookOpen, MessageCircle, 
  Sparkles, Link as LinkIcon, TrendingUp, 
  Eye, Heart, MessageSquare, MoreHorizontal,
  Loader2
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

export function HomeFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, [sort]);

  const fetchPosts = async (loadMore = false) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/posts?sort=${sort}&page=${loadMore ? page + 1 : 1}&limit=10`);
      const data = await res.json();
      
      if (data.data) {
        if (loadMore) {
          setPosts([...posts, ...data.data]);
          setPage(page + 1);
        } else {
          setPosts(data.data);
          setPage(1);
        }
        setHasMore(data.data.length === 10);
      }
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (hasMore && !loading) {
      fetchPosts(true);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-4">
          {/* Hero Banner */}
          <Card className="overflow-hidden border-0 shadow-lg">
            <div className="bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 p-8 text-white">
              <div className="max-w-xl">
                <h1 className="text-3xl font-bold mb-3">
                  AIclaw - 探索人工智能的无限可能
                </h1>
                <p className="text-white/80 mb-4">
                  加入 AIclaw 社区，与志同道合的 AI 爱好者一起分享、学习、成长，探索人工智能的前沿技术
                </p>
                <Button variant="secondary" asChild>
                  <Link href="/create">
                    <Bot className="w-4 h-4 mr-2" />
                    开始分享
                  </Link>
                </Button>
              </div>
            </div>
          </Card>

          {/* Filter Tabs */}
          <div className="flex items-center justify-between">
            <Tabs value={sort} onValueChange={setSort}>
              <TabsList>
                <TabsTrigger value="latest" className="gap-1">
                  <Sparkles className="w-4 h-4" />
                  最新
                </TabsTrigger>
                <TabsTrigger value="popular" className="gap-1">
                  <Heart className="w-4 h-4" />
                  热门
                </TabsTrigger>
                <TabsTrigger value="hot" className="gap-1">
                  <TrendingUp className="w-4 h-4" />
                  飙升
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Posts List */}
          <div className="space-y-4">
            {loading && posts.length === 0 ? (
              // Loading skeletons
              Array.from({ length: 3 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <Skeleton className="w-20 h-20 rounded-lg" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-full" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              posts.map((post) => {
                const Icon = categoryIcons[post.categories.slug] || Bot;
                return (
                  <Card key={post.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        {post.cover_image ? (
                          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={post.cover_image}
                              alt={post.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div 
                            className="w-20 h-20 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: `${post.categories.color}20` }}
                          >
                            <Icon className="w-8 h-8" style={{ color: post.categories.color }} />
                          </div>
                        )}
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge 
                              variant="secondary" 
                              className="text-xs"
                              style={{ 
                                color: post.categories.color,
                                backgroundColor: `${post.categories.color}20`
                              }}
                            >
                              {post.categories.name}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {formatTime(post.created_at)}
                            </span>
                          </div>
                          
                          <Link href={`/post/${post.id}`} className="block group">
                            <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-1">
                              {post.title}
                            </h3>
                          </Link>
                          
                          <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                            {post.summary}
                          </p>
                          
                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-2">
                              <Avatar className="w-5 h-5">
                                <AvatarImage src={post.profiles.avatar_url} />
                                <AvatarFallback className="text-xs">
                                  {post.profiles.display_name?.[0] || 'U'}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-xs text-muted-foreground">
                                {post.profiles.display_name || post.profiles.username}
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
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
                        </div>
                        
                        <Button variant="ghost" size="icon" className="flex-shrink-0">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>

          {/* Load More */}
          {hasMore && (
            <div className="flex justify-center pt-4">
              <Button variant="outline" onClick={loadMore} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    加载中...
                  </>
                ) : (
                  "加载更多"
                )}
              </Button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold">社区数据</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">今日新增帖子</span>
                <span className="font-semibold">128</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">活跃用户</span>
                <span className="font-semibold">2,456</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">总帖子数</span>
                <span className="font-semibold">12,890</span>
              </div>
            </CardContent>
          </Card>

          {/* Hot Categories */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold">热门分类</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "AI 工具", count: 1234, icon: Bot, color: "#6366f1" },
                  { name: "行业资讯", count: 892, icon: Newspaper, color: "#10b981" },
                  { name: "技术教程", count: 756, icon: BookOpen, color: "#f59e0b" },
                  { name: "讨论区", count: 2103, icon: MessageCircle, color: "#ec4899" },
                ].map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <Link
                      key={cat.name}
                      href={`/category/${cat.name.toLowerCase().replace(' ', '-')}`}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-accent transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${cat.color}20` }}
                        >
                          <Icon className="w-4 h-4" style={{ color: cat.color }} />
                        </div>
                        <span className="text-sm font-medium">{cat.name}</span>
                      </div>
                      <Badge variant="secondary">{cat.count}</Badge>
                    </Link>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Trending Topics */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold">热门话题</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {["#GPT-5", "#AI-编程", "#大模型", "#AGI", "#AI绘画", "#AI-工具", "#机器学习"].map((tag) => (
                  <Link
                    key={tag}
                    href={`/search?q=${encodeURIComponent(tag)}`}
                    className="block text-sm text-primary hover:underline"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function formatTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  
  if (minutes < 1) return "刚刚";
  if (minutes < 60) return `${minutes} 分钟前`;
  if (hours < 24) return `${hours} 小时前`;
  if (days < 7) return `${days} 天前`;
  
  return date.toLocaleDateString("zh-CN");
}
