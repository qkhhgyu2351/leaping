"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { ArrowLeft, Loader2, Image as ImageIcon, X } from "lucide-react";

interface Category {
  id: number;
  name: string;
  slug: string;
  color: string;
}

export default function CreatePostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category_id: "",
    summary: "",
    cover_image: "",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      if (data.data) {
        setCategories(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error("请输入标题");
      return;
    }
    if (!formData.content.trim()) {
      toast.error("请输入内容");
      return;
    }
    if (!formData.category_id) {
      toast.error("请选择分类");
      return;
    }

    try {
      setLoading(true);
      
      // 使用默认用户ID（实际项目中应该是登录用户的ID）
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          author_id: "anonymous",
          summary: formData.summary || formData.content.substring(0, 200),
        }),
      });

      const data = await res.json();
      
      if (data.data) {
        toast.success("发布成功！");
        router.push(`/post/${data.data.id}`);
      } else {
        toast.error(data.error || "发布失败");
      }
    } catch (err) {
      toast.error("发布失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <Button variant="ghost" asChild>
                <Link href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  返回
                </Link>
              </Button>
              <h1 className="text-2xl font-bold">发布帖子</h1>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <Card>
                <CardContent className="p-6 space-y-6">
                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title">标题 <span className="text-destructive">*</span></Label>
                    <Input
                      id="title"
                      placeholder="输入一个有吸引力的标题..."
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      maxLength={100}
                    />
                    <p className="text-xs text-muted-foreground text-right">
                      {formData.title.length}/100
                    </p>
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <Label>分类 <span className="text-destructive">*</span></Label>
                    <Select
                      value={formData.category_id}
                      onValueChange={(value) => handleInputChange("category_id", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="选择一个分类" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id.toString()}>
                            <span className="flex items-center gap-2">
                              <span 
                                className="w-2 h-2 rounded-full" 
                                style={{ backgroundColor: cat.color }}
                              />
                              {cat.name}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Cover Image */}
                  <div className="space-y-2">
                    <Label htmlFor="cover_image">封面图片</Label>
                    <div className="flex gap-3">
                      <Input
                        id="cover_image"
                        placeholder="输入图片 URL..."
                        value={formData.cover_image}
                        onChange={(e) => handleInputChange("cover_image", e.target.value)}
                        className="flex-1"
                      />
                      {formData.cover_image && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => handleInputChange("cover_image", "")}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    {formData.cover_image && (
                      <div className="mt-2 rounded-lg overflow-hidden border">
                        <img
                          src={formData.cover_image}
                          alt="封面预览"
                          className="w-full h-48 object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Summary */}
                  <div className="space-y-2">
                    <Label htmlFor="summary">摘要</Label>
                    <Input
                      id="summary"
                      placeholder="简短描述帖子内容（可选）..."
                      value={formData.summary}
                      onChange={(e) => handleInputChange("summary", e.target.value)}
                      maxLength={300}
                    />
                    <p className="text-xs text-muted-foreground text-right">
                      {formData.summary.length}/300
                    </p>
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <Label htmlFor="content">内容 <span className="text-destructive">*</span></Label>
                    <Textarea
                      id="content"
                      placeholder="分享你的想法、经验或发现..."
                      value={formData.content}
                      onChange={(e) => handleInputChange("content", e.target.value)}
                      className="min-h-[300px] font-mono text-sm"
                    />
                  </div>

                  {/* Submit */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      发布即表示你同意社区规范
                    </p>
                    <div className="flex gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.back()}
                      >
                        取消
                      </Button>
                      <Button type="submit" disabled={loading}>
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            发布中...
                          </>
                        ) : (
                          "发布帖子"
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </form>

            {/* Tips */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-base">发帖小贴士</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>1. 使用清晰、具体的标题，让他人一眼就知道你的帖子内容</p>
                <p>2. 选择最合适的分类，方便他人发现你的帖子</p>
                <p>3. 添加封面图片可以让帖子更加吸引人</p>
                <p>4. 内容详实、有价值的帖子更容易获得关注和回复</p>
                <p>5. 请遵守社区规范，禁止发布违规内容</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
