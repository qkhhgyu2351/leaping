# LeapClaw - AI 爱好者社区平台

## 项目概述

LeapClaw 是一个面向 AI 爱好者的社区平台，提供 AI 资讯聚合、内容浏览和社区交流功能。

## 技术栈

- **Framework**: Next.js 16 (App Router)
- **Core**: React 19
- **Language**: TypeScript 5
- **UI 组件**: shadcn/ui (基于 Radix UI)
- **Styling**: Tailwind CSS 4
- **数据库**: Supabase (PostgreSQL)

## 目录结构

```
src/
├── app/
│   ├── api/                    # API 路由
│   │   ├── categories/         # 分类接口
│   │   ├── posts/             # 帖子接口
│   │   │   ├── [id]/          # 帖子详情
│   │   │   │   └── comments/  # 评论接口
│   │   ├── likes/             # 点赞接口
│   │   └── profiles/          # 用户资料接口
│   ├── category/[slug]/       # 分类页面
│   ├── post/[id]/             # 帖子详情页
│   ├── create/                 # 发帖页面
│   └── page.tsx               # 首页
├── components/
│   ├── ui/                    # shadcn/ui 组件
│   ├── header.tsx             # 页头导航
│   ├── footer.tsx             # 页脚
│   └── home-feed.tsx          # 首页内容组件
└── storage/
    └── database/              # 数据库相关
        ├── shared/schema.ts   # 数据模型定义
        └── supabase-client.ts # Supabase 客户端
```

## 数据库模型

### 表结构

| 表名 | 说明 | 主要字段 |
|------|------|----------|
| categories | 帖子分类 | id, name, slug, description, icon, color |
| profiles | 用户资料 | id, username, display_name, avatar_url, bio |
| posts | 帖子 | id, author_id, category_id, title, content, view_count, like_count |
| comments | 评论 | id, post_id, author_id, content, parent_id |
| likes | 点赞 | id, user_id, target_type, target_id |

### 分类

- AI 工具 (ai-tools)
- 行业资讯 (news)
- 技术教程 (tutorials)
- 讨论区 (discussion)
- 创意展示 (showcase)
- 资源分享 (resources)

## API 接口

| 接口 | 方法 | 说明 |
|------|------|------|
| `/api/categories` | GET | 获取所有分类 |
| `/api/posts` | GET | 获取帖子列表（支持分类、排序、搜索） |
| `/api/posts` | POST | 创建帖子 |
| `/api/posts/[id]` | GET | 获取帖子详情 |
| `/api/posts/[id]/comments` | GET | 获取帖子评论 |
| `/api/posts/[id]/comments` | POST | 添加评论 |
| `/api/likes` | POST | 点赞/取消点赞 |
| `/api/profiles` | GET/POST | 获取/创建用户资料 |

## 开发命令

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建
pnpm build

# 生产环境
pnpm start
```

## 环境变量

项目使用 Supabase 作为后端服务，相关环境变量由平台自动注入。

## 功能特性

- 帖子浏览（列表、详情）
- 多维度排序（最新、热门、飙升）
- 评论互动
- 点赞功能
- 分类筛选
- 响应式设计
- 深色模式支持
