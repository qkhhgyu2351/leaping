# LeapClaw - AI 爱好者社区平台

## 项目信息

- **项目名称**: LeapClaw
- **创建时间**: 2024年
- **技术栈**: Next.js 16 + React 19 + TypeScript + Tailwind CSS 4 + shadcn/ui + Supabase
- **访问地址**: http://abc123.dev.coze.site

---

## 项目概述

LeapClaw 是一个面向 AI 爱好者的社区平台，提供 AI 资讯聚合、内容浏览和社区交流功能。

### 核心功能
- 帖子浏览（列表、详情）
- 多维度排序（最新、热门、飙升）
- 评论互动
- 点赞功能
- 分类筛选
- 全文搜索（⌘K / Ctrl+K）
- 响应式设计
- 深色模式支持

### 六大分类
1. AI 工具 (ai-tools) - AI 工具推荐、使用技巧和评测
2. 行业资讯 (news) - AI 行业最新动态和新闻
3. 技术教程 (tutorials) - AI 相关的技术教程和学习资源
4. 讨论区 (discussion) - AI 相关话题讨论和问答
5. 创意展示 (showcase) - AI 生成作品展示
6. 资源分享 (resources) - AI 相关资源、论文和数据集

---

## 目录结构

```
src/
├── app/
│   ├── api/                    # API 路由
│   │   ├── categories/         # 分类接口
│   │   │   └── route.ts       # GET /api/categories
│   │   ├── posts/             # 帖子接口
│   │   │   ├── route.ts       # GET/POST /api/posts
│   │   │   └── [id]/
│   │   │       ├── route.ts   # GET/PUT/DELETE /api/posts/[id]
│   │   │       └── comments/
│   │   │           └── route.ts # GET/POST /api/posts/[id]/comments
│   │   ├── likes/             # 点赞接口
│   │   │   └── route.ts       # GET/POST /api/likes
│   │   └── profiles/          # 用户资料接口
│   │       └── route.ts       # GET/POST /api/profiles
│   ├── category/[slug]/       # 分类页面
│   │   └── page.tsx
│   ├── post/[id]/             # 帖子详情页
│   │   └── page.tsx
│   ├── create/                # 发帖页面
│   │   └── page.tsx
│   ├── page.tsx               # 首页
│   ├── layout.tsx             # 根布局
│   └── globals.css            # 全局样式
├── components/
│   ├── ui/                    # shadcn/ui 组件库
│   ├── header.tsx             # 页头导航
│   ├── footer.tsx             # 页脚
│   ├── home-feed.tsx          # 首页内容组件
│   ├── search-modal.tsx       # 搜索弹窗
│   └── theme-provider.tsx     # 主题提供者
└── storage/
    └── database/               # 数据库相关
        ├── shared/
        │   └── schema.ts      # 数据模型定义
        └── supabase-client.ts # Supabase 客户端
```

---

## 数据库模型

### 表结构

#### 1. categories（分类表）
| 字段 | 类型 | 说明 |
|------|------|------|
| id | SERIAL | 主键 |
| name | VARCHAR(100) | 分类名称 |
| slug | VARCHAR(100) | URL 标识 |
| description | TEXT | 分类描述 |
| icon | VARCHAR(50) | 图标名称 |
| color | VARCHAR(20) | 主题色 |
| created_at | TIMESTAMP | 创建时间 |

#### 2. profiles（用户资料表）
| 字段 | 类型 | 说明 |
|------|------|------|
| id | VARCHAR(36) | 主键 |
| username | VARCHAR(50) | 用户名 |
| display_name | VARCHAR(100) | 显示名称 |
| avatar_url | TEXT | 头像 URL |
| bio | TEXT | 个人简介 |
| is_verified | BOOLEAN | 是否认证 |
| created_at | TIMESTAMP | 创建时间 |

#### 3. posts（帖子表）
| 字段 | 类型 | 说明 |
|------|------|------|
| id | VARCHAR(36) | 主键 (UUID) |
| author_id | VARCHAR(36) | 作者 ID |
| category_id | INTEGER | 分类 ID |
| title | VARCHAR(255) | 标题 |
| content | TEXT | 内容 |
| summary | VARCHAR(300) | 摘要 |
| cover_image | TEXT | 封面图 URL |
| view_count | INTEGER | 浏览量 |
| like_count | INTEGER | 点赞数 |
| comment_count | INTEGER | 评论数 |
| is_pinned | BOOLEAN | 是否置顶 |
| is_deleted | BOOLEAN | 是否删除 |
| created_at | TIMESTAMP | 创建时间 |

#### 4. comments（评论表）
| 字段 | 类型 | 说明 |
|------|------|------|
| id | VARCHAR(36) | 主键 (UUID) |
| post_id | VARCHAR(36) | 帖子 ID |
| author_id | VARCHAR(36) | 作者 ID |
| parent_id | VARCHAR(36) | 父评论 ID |
| content | TEXT | 评论内容 |
| like_count | INTEGER | 点赞数 |
| is_deleted | BOOLEAN | 是否删除 |
| created_at | TIMESTAMP | 创建时间 |

#### 5. likes（点赞表）
| 字段 | 类型 | 说明 |
|------|------|------|
| id | VARCHAR(36) | 主键 (UUID) |
| user_id | VARCHAR(36) | 用户 ID |
| target_type | VARCHAR(20) | 目标类型 (post/comment) |
| target_id | VARCHAR(36) | 目标 ID |
| created_at | TIMESTAMP | 创建时间 |

---

## API 接口文档

### 分类接口

#### GET /api/categories
获取所有分类

**响应示例:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "AI 工具",
      "slug": "ai-tools",
      "description": "AI 工具推荐、使用技巧和评测",
      "icon": "bot",
      "color": "#6366f1"
    }
  ]
}
```

---

### 帖子接口

#### GET /api/posts
获取帖子列表

**查询参数:**
| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| category | string | - | 分类 slug |
| sort | string | latest | 排序方式 (latest/popular/hot) |
| page | number | 1 | 页码 |
| limit | number | 10 | 每页数量 |
| search | string | - | 搜索关键词 |

**响应示例:**
```json
{
  "data": [...],
  "total": 6,
  "page": 1,
  "limit": 10
}
```

#### POST /api/posts
创建帖子

**请求体:**
```json
{
  "title": "帖子标题",
  "content": "帖子内容",
  "category_id": 1,
  "author_id": "user-1",
  "summary": "摘要",
  "cover_image": "https://..."
}
```

#### GET /api/posts/[id]
获取帖子详情

**响应:** 返回单个帖子完整信息，浏览量 +1

#### PUT /api/posts/[id]
更新帖子

#### DELETE /api/posts/[id]
删除帖子（软删除）

---

### 评论接口

#### GET /api/posts/[id]/comments
获取帖子评论

**响应示例:**
```json
{
  "data": [
    {
      "id": "comment-1",
      "content": "评论内容",
      "profiles": {
        "username": "user",
        "display_name": "用户名"
      }
    }
  ]
}
```

#### POST /api/posts/[id]/comments
添加评论

**请求体:**
```json
{
  "content": "评论内容",
  "author_id": "user-1",
  "parent_id": null
}
```

---

### 点赞接口

#### POST /api/likes
点赞/取消点赞

**请求体:**
```json
{
  "user_id": "user-1",
  "target_type": "post",
  "target_id": "post-1"
}
```

**响应:**
```json
{ "liked": true }  // true = 点赞成功, false = 取消点赞
```

#### GET /api/likes
检查是否已点赞

**查询参数:** user_id, target_type, target_id

---

### 用户接口

#### GET /api/profiles
获取用户资料

**查询参数:** username

#### POST /api/profiles
创建/更新用户资料

---

## 开发指南

### 环境要求
- Node.js 24+
- pnpm 包管理器

### 安装依赖
```bash
pnpm install
```

### 开发模式
```bash
pnpm dev
# 或
coze dev
```

### 构建生产版本
```bash
pnpm build
```

### 启动生产服务
```bash
pnpm start
```

---

## 已安装的 shadcn/ui 组件

- Button
- Input
- Textarea
- Card
- Badge
- Avatar
- Tabs
- Select
- Label
- Separator
- Skeleton
- Sonner (Toast)

---

## 示例数据

### 用户
| ID | 用户名 | 显示名称 |
|----|--------|----------|
| user-1 | ai_enthusiast | AI爱好者 |
| user-2 | tech_pro | 技术大牛 |
| user-3 | ml_researcher | 机器学习研究员 |
| user-4 | prompt_master | 提示词大师 |
| user-5 | ai_news_bot | AI资讯君 |

### 帖子
| ID | 标题 | 分类 |
|----|------|------|
| post-1 | ChatGPT-5 即将发布？ | AI 工具 |
| post-2 | Claude 3.5 发布 | 行业资讯 |
| post-3 | 深入理解 Transformer 架构 | 技术教程 |
| post-4 | 我用 AI 生成的像素艺术头像 | 创意展示 |
| post-5 | 本周 AI 领域要闻回顾 | 行业资讯 |
| post-6 | 关于 AGI 的实现路径讨论 | 讨论区 |

---

## 待完善功能

1. **用户认证** - 目前使用匿名用户，需要接入真实认证系统
2. **图片上传** - 目前只支持 URL，需要实现图片上传
3. **Markdown 编辑器** - 发帖页面需要更好的编辑器
4. **标签系统** - 给帖子添加标签
5. **收藏功能** - 用户收藏帖子
6. **消息通知** - 评论/点赞通知
7. **用户等级/积分** - 鼓励高质量内容
8. **热门榜单** - 每周/每月精选

---

## 环境变量

Supabase 相关环境变量由平台自动注入，无需手动配置。

---

## 联系信息

如有问题，请查看项目代码或联系开发团队。
