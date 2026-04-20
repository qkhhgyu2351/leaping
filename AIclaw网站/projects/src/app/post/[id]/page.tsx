"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft, Heart, Eye, MessageSquare, Share2,
  Bookmark, MoreHorizontal, Send, Loader2,
  CheckCircle, User
} from "lucide-react";
import { toast } from "sonner";

interface Post {
  id: string;
  title: string;
  content: string;
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
    bio?: string;
    is_verified: boolean;
  };
  categories: {
    name: string;
    slug: string;
    icon: string;
    color: string;
  };
}

interface Comment {
  id: string;
  content: string;
  like_count: number;
  created_at: string;
  profiles: {
    username: string;
    display_name: string;
    avatar_url?: string;
  };
  replies?: Comment[];
}

export default function PostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params.id as string;
  
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentContent, setCommentContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [postId]);

  const fetchPost = async () => {
    try {
      const res = await fetch(`/api/posts/${postId}`);
      const data = await res.json();
      if (data.data) {
        setPost(data.data);
        // 检查是否已点赞
        const likeRes = await fetch(`/api/likes?user_id=anonymous&target_type=post&target_id=${postId}`);
        const likeData = await likeRes.json();
        setLiked(likeData.liked || false);
      }
    } catch (err) {
      console.error("Failed to fetch post:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/posts/${postId}/comments`);
      const data = await res.json();
      if (data.data) {
        // 组织评论结构（一级评论 + 回复）
        const organized = organizeComments(data.data);
        setComments(organized);
      }
    } catch (err) {
      console.error("Failed to fetch comments:", err);
    }
  };

  const organizeComments = (rawComments: Comment[]): Comment[] => {
    const commentMap = new Map<string, Comment>();
    const rootComments: Comment[] = [];

    rawComments.forEach(comment => {
      commentMap.set(comment.id, { ...comment, replies: [] });
    });

    rawComments.forEach(comment => {
      const organized = commentMap.get(comment.id)!;
      if ((comment as any).parent_id) {
        const parent = commentMap.get((comment as any).parent_id);
        if (parent) {
          parent.replies = parent.replies || [];
          parent.replies.push(organized);
        } else {
          rootComments.push(organized);
        }
      } else {
        rootComments.push(organized);
      }
    });

    return rootComments;
  };

  const handleLike = async () => {
    try {
      const res = await fetch("/api/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: "anonymous",
          target_type: "post",
          target_id: postId
        })
      });
      const data = await res.json();
      setLiked(data.liked);
      setPost(prev => prev ? {
        ...prev,
        like_count: prev.like_count + (data.liked ? 1 : -1)
      } : null);
    } catch (err) {
      toast.error("操作失败");
    }
  };

  const handleSubmitComment = async () => {
    if (!commentContent.trim()) return;
    
    try {
      setSubmitting(true);
      const res = await fetch(`/api/posts/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: commentContent,
          author_id: "anonymous"
        })
      });
      
      if (res.ok) {
        setCommentContent("");
        fetchComments();
        setPost(prev => prev ? {
          ...prev,
          comment_count: prev.comment_count + 1
        } : null);
        toast.success("评论成功");
      }
    } catch (err) {
      toast.error("评论失败");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <Skeleton className="h-8 w-2/3 mb-4" />
            <Skeleton className="h-4 w-1/3 mb-8" />
            <Skeleton className="h-96 w-full" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">帖子不存在</h2>
            <p className="text-muted-foreground mb-4">该帖子可能已被删除或不存在</p>
            <Button asChild>
              <Link href="/">返回首页</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Button variant="ghost" className="mb-6" asChild>
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回
              </Link>
            </Button>

            {/* Article */}
            <article>
              {/* Header */}
              <header className="mb-8">
                <Badge 
                  variant="secondary" 
                  className="mb-4"
                  style={{ 
                    color: post.categories.color,
                    backgroundColor: `${post.categories.color}20`
                  }}
                >
                  {post.categories.name}
                </Badge>
                
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {post.title}
                </h1>

                {/* Author Info */}
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={post.profiles.avatar_url} />
                    <AvatarFallback>
                      <User className="w-6 h-6" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">
                        {post.profiles.display_name || post.profiles.username}
                      </span>
                      {post.profiles.is_verified && (
                        <CheckCircle className="w-4 h-4 text-blue-500" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {formatTime(post.created_at)} · {post.view_count} 阅读
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button 
                    variant={liked ? "default" : "outline"} 
                    size="sm"
                    onClick={handleLike}
                  >
                    <Heart className={`w-4 h-4 mr-2 ${liked ? "fill-current" : ""}`} />
                    {post.like_count}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Bookmark className="w-4 h-4 mr-2" />
                    收藏
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    分享
                  </Button>
                </div>
              </header>

              {/* Cover Image */}
              {post.cover_image && (
                <div className="mb-8 rounded-xl overflow-hidden">
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    className="w-full"
                  />
                </div>
              )}

              {/* Content */}
              <div className="post-content mb-12">
                <div dangerouslySetInnerHTML={{ __html: formatContent(post.content) }} />
              </div>

              <Separator className="my-8" />
            </article>

            {/* Comments Section */}
            <section className="mb-12">
              <h2 className="text-xl font-bold mb-6">
                评论 ({post.comment_count})
              </h2>

              {/* Comment Form */}
              <div className="mb-8">
                <Textarea
                  placeholder="写下你的评论..."
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  className="mb-3 min-h-[100px]"
                />
                <div className="flex justify-end">
                  <Button onClick={handleSubmitComment} disabled={submitting || !commentContent.trim()}>
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        发布中...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        发布评论
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-6">
                {comments.map((comment) => (
                  <CommentItem key={comment.id} comment={comment} />
                ))}
                
                {comments.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    暂无评论，来发表第一看法吧
                  </p>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function CommentItem({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) {
  return (
    <div className={`${isReply ? "ml-12 mt-4" : ""}`}>
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-3">
            <Avatar className="w-8 h-8 flex-shrink-0">
              <AvatarImage src={comment.profiles.avatar_url} />
              <AvatarFallback className="text-xs">
                {comment.profiles.display_name?.[0] || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-sm">
                  {comment.profiles.display_name || comment.profiles.username}
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatTime(comment.created_at)}
                </span>
              </div>
              <p className="text-sm whitespace-pre-wrap">{comment.content}</p>
              <div className="flex items-center gap-4 mt-2">
                <button className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1">
                  <Heart className="w-3 h-3" />
                  {comment.like_count}
                </button>
              </div>

              {/* Replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="mt-4 space-y-4">
                  {comment.replies.map((reply) => (
                    <CommentItem key={reply.id} comment={reply} isReply />
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function formatTime(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatContent(content: string): string {
  // 简单的内容格式化，转换为HTML
  return content
    .split('\n\n')
    .map(para => `<p>${para}</p>`)
    .join('');
}
