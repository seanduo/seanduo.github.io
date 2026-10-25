
import { defineConfig } from 'vitepress'
import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const docsDir = join(dirname(fileURLToPath(import.meta.url)), '..')

type SidebarItem = {
  text: string
  link?: string
  collapsed?: boolean
  items?: SidebarItem[]
}

// 读取 Markdown 一级标题，读取失败则使用文件名
function getTitle(file: string, fallback: string): string {
  const content = readFileSync(file, 'utf-8')
  const match = content.match(/^#\s+(.+)$/m)
  return match ? match[1].trim() : fallback
}

// 递归扫描目录，生成 VitePress sidebar
function scanDir(dir: string, url: string): SidebarItem[] {
  if (!existsSync(dir)) return []

  const entries = readdirSync(dir, { withFileTypes: true })
    .filter(e => !e.name.startsWith('.'))
    .sort((a, b) => a.name.localeCompare(b.name))

  const items: SidebarItem[] = []

  // index.md 固定排在最前面
  if (existsSync(join(dir, 'index.md'))) {
    items.push({ text: '概览', link: url + '/' })
  }

  for (const entry of entries) {
    const path = join(dir, entry.name)

    if (entry.isDirectory()) {
      const children = scanDir(path, `${url}/${entry.name}`)
      if (children.length) {
        items.push({
          text: entry.name,            // 子文件夹名称
          collapsed: true,            // 默认折叠
          items: children
        })
      }
    } else if (entry.isFile() && entry.name.endsWith('.md') && entry.name !== 'index.md') {
      const name = entry.name.slice(0, -3)
      items.push({
        text: getTitle(path, name),    // 优先读取 # 标题
        link: `${url}/${name}`         // Markdown 对应的网址
      })
    }
  }

  return items
}

export default defineConfig({
  // 网站基本配置
  lang: 'zh-CN',
  title: 'My Knowledge',
  description: 'Personal Knowledge Base',
  cleanUrls: true,

  themeConfig: {
    // 顶部导航栏
    nav: [
      { text: '首页', link: '/' },
      { text: 'LINUX', link: '/linux/' },
      { text: 'AI', link: '/ai/' }
    ],

    // 左侧导航栏：自动扫描 Markdown
    sidebar: [
      {
        text: 'LINUX',
        collapsed: false,
        items: scanDir(join(docsDir, 'linux'), '/linux')
      },
      {
        text: 'AI',
        collapsed: false,
        items: scanDir(join(docsDir, 'ai'), '/ai')
      }
    ],

    // 右侧文章目录
    outline: {
      level: [2, 3],
      label: '本页目录'
    },

    // 本地全文搜索
    search: {
      provider: 'local'
    }
  }
})
