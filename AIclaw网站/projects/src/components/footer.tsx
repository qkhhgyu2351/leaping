"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">LeapClaw</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              AI 爱好者社区，聚合 AI 资讯、工具、教程与讨论
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-3">快速链接</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-primary">首页</Link></li>
              <li><Link href="/category/news" className="hover:text-primary">行业资讯</Link></li>
              <li><Link href="/category/tutorials" className="hover:text-primary">技术教程</Link></li>
              <li><Link href="/category/discussion" className="hover:text-primary">讨论区</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-3">资源</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/category/ai-tools" className="hover:text-primary">AI 工具</Link></li>
              <li><Link href="/category/resources" className="hover:text-primary">资源分享</Link></li>
              <li><Link href="/category/showcase" className="hover:text-primary">创意展示</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold mb-3">关于</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary">关于我们</Link></li>
              <li><Link href="#" className="hover:text-primary">使用条款</Link></li>
              <li><Link href="#" className="hover:text-primary">隐私政策</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} LeapClaw. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
