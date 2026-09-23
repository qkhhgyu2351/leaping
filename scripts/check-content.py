#!/usr/bin/env python3
"""Validate static-site content before committing changes."""

from __future__ import annotations

import hashlib
import re
import sys
from datetime import date
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def extract_objects(source: str) -> list[str]:
    match = re.search(r"window\.POSTS\s*=\s*\[", source)
    if not match:
        return []

    objects: list[str] = []
    start = None
    depth = 0
    quote = None
    escaped = False
    for index, char in enumerate(source[match.end() :], start=match.end()):
        if quote:
            if escaped:
                escaped = False
            elif char == "\\":
                escaped = True
            elif char == quote:
                quote = None
            continue
        if char in ("'", '"', "`"):
            quote = char
        elif char == "{":
            if depth == 0:
                start = index
            depth += 1
        elif char == "}" and depth:
            depth -= 1
            if depth == 0 and start is not None:
                objects.append(source[start : index + 1])
    return objects


def field_value(block: str, field: str) -> str | None:
    match = re.search(rf'\b{re.escape(field)}\s*:\s*["\']([^"\']+)["\']', block)
    return match.group(1).strip() if match else None


def validate_posts(path: Path, required: tuple[str, ...], check_urls: bool = False) -> list[str]:
    errors: list[str] = []
    objects = extract_objects(path.read_text(encoding="utf-8"))
    if not objects:
        return [f"{path.relative_to(ROOT)}: 未找到 window.POSTS 数组"]

    seen_ids: set[str] = set()
    for number, block in enumerate(objects, start=1):
        values = {field: field_value(block, field) for field in (*required, "url")}
        label = values.get("id") or f"第 {number} 条"
        for field in required:
            if not values[field]:
                errors.append(f"{path.relative_to(ROOT)}: {label} 缺少 {field}")

        item_id = values.get("id")
        if item_id:
            if item_id in seen_ids:
                errors.append(f"{path.relative_to(ROOT)}: 重复 ID {item_id}")
            seen_ids.add(item_id)

        item_date = values.get("date")
        if item_date:
            try:
                date.fromisoformat(item_date)
            except ValueError:
                errors.append(f"{path.relative_to(ROOT)}: {label} 日期无效 {item_date}")

        url = values.get("url")
        if check_urls and url and url.startswith("posts/") and not (path.parent / url).is_file():
            errors.append(f"{path.relative_to(ROOT)}: {label} 链接文件不存在 {url}")

    print(f"✓ {path.relative_to(ROOT)}：{len(objects)} 篇文章，ID 与字段检查完成")
    return errors


def validate_duplicate_pages(posts_dir: Path) -> list[str]:
    pages: dict[str, list[Path]] = {}
    for page in posts_dir.glob("*.html"):
        digest = hashlib.sha256(page.read_bytes()).hexdigest()
        pages.setdefault(digest, []).append(page)

    errors = []
    for duplicates in pages.values():
        if len(duplicates) > 1:
            names = ", ".join(page.name for page in duplicates)
            errors.append(f"{posts_dir.relative_to(ROOT)}: 完全重复的文章页 {names}")
    print(f"✓ {posts_dir.relative_to(ROOT)}：{len(pages)} 组内容哈希检查完成")
    return errors


def main() -> int:
    errors = []
    errors += validate_posts(
        ROOT / "AI超级个体" / "posts.js",
        ("id", "title", "summary", "date"),
    )
    errors += validate_posts(
        ROOT / "AI首席财务官" / "posts.js",
        ("id", "title", "summary", "date"),
        check_urls=True,
    )
    errors += validate_duplicate_pages(ROOT / "AI首席财务官" / "posts")

    if errors:
        print("\n发现问题：")
        for error in errors:
            print(f"- {error}")
        return 1

    print("\n✓ 内容校验通过")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
