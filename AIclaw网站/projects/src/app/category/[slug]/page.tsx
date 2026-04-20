"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Bot, Newspaper, BookOpen, MessageCircle,
  Sparkles, Link as LinkIcon, ArrowLeft,
  Heart, Eye, MessageSquare, Filter
} from "lucide-react";

const categoryIcons: Record<string, any> = {
  "ai-tools": Bot,
  "news": Newspaper,
  "tutorials": BookOpen,
  "discussion": MessageCircle,
  "showcase": Sparkles,
  "resources": LinkIcon,
};

const categoryNames: Record<string, string> = {
  "ai-tools": "AI 工具",
  "news": "行业资讯",
  "tutorials": "技术教程",
  "discussion": "讨论区",
  "showcase": "创意展示",
  "resources": "资源分享",
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

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("latest");

  useEffect(() => {
    fetchPosts();
  }, [slug, sort]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/posts?category=${slug}&sort=${sort}&limit=20`);
      const data = await res.json();
      if (data.data) {
        setPosts(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    } finally {
      setLoading(false);
    }
  };

  const Icon = categoryIcons[slug] || Bot;
  const categoryName = categoryNames[slug] || slug;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Category Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-12">
          <div className="container mx-auto px-4">
            <Button variant="ghost" className="text-white hover:text-white hover:bg-white/20 mb-4" asChild>
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回首页
              </Link>
            </Button>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                <Icon className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{categoryName}</h1>
                <p className="text-white/80 mt-1">
                  探索 {categoryName} 相关的精彩内容
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <Tabs value={sort} onValueChange={setSort}>
              <TabsList>
                <TabsTrigger value="latest">最新</TabsTrigger>
                <TabsTrigger value="popular">热门</TabsTrigger>
                <TabsTrigger value="hot">飙升</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              筛选
            </Button>
          </div>

          {/* Posts Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <Skeleton className="h-40 w-full rounded-lg mb-4" />
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-3 w-full mb-2" />
                    <Skeleton className="h-3 w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {posts.map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                  {post.cover_image && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.cover_image}
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {post.categories.name}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatTime(post.created_at)}
                      </span>
                    </div>
                    <Link href={`/post/${post.id}`}>
                      <h3 className="font-semibold hover:text-primary transition-colors line-clamp-2 mb-2">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {post.summary}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        by {post.profiles.display_name || post.profiles.username}
                      </span>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
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
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                  <Icon className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold mb-2">暂无内容</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  这个分类还没有帖子，成为第一个分享者吧！
                </p>
                <Button asChild>
                  <Link href="/create">发布帖子</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function formatTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  const days = Math.floor(diff / 86400000);
  if (days < 1) return "今天";
  if (days < 7) return `${days} 天前`;
  
  return date.toLocaleDateString("zh-CN");
}
