# Claude Code 架构可视化项目

<div align="center">
  <img src="https://img.shields.io/badge/React-18.3-blue" />
  <img src="https://img.shields.io/badge/ReactFlow-11.11-green" />
  <img src="https://img.shields.io/badge/Vite-5.4-purple" />
  <img src="https://img.shields.io/badge/License-MIT-yellow" />
</div>

<p align="center">
  <strong>Claude Code v2.1.88 源码架构可视化</strong><br>
  <sub>探索 AI 编程助手的内部世界</sub>
</p>

---

## 📖 项目简介

这个项目基于 [Claude Code v2.1.88 泄露源码](https://github.com/Ringmast4r/claw-cli-claude-code-source-code-v2.1.88)，使用交互式流程图展示了 Claude Code 的完整架构。

**特性：**

- 🎨 **科技黑底色 + 彩色节点**：美观的可视化界面
- 🖱️ **交互式流程图**：拖动节点、缩放查看、小地图导航
- 📋 **详细信息展示**：鼠标悬停显示节点功能和技术细节
- 📱 **响应式设计**：支持桌面和移动设备
- 🚀 **零成本部署**：可直接部署到 GitHub Pages

---

## 🎯 在线演示

👉 [点击查看在线演示](https://YOUR_USERNAME.github.io/claude-code-architecture-visualizer)

---

## 🏗️ 架构概览

流程图展示了 Claude Code 的以下核心组件：

| 分类 | 组件 | 说明 |
|------|------|------|
| **核心** | CLI 入口、Agent 循环、查询引擎 | Claude Code 的心脏 |
| **工具** | 40+ 内置工具 | 文件操作、Shell、Web、任务管理等 |
| **服务** | API、Dream、LSP、语音 | 后台服务支持 |
| **特殊模式** | BUDDY、KAIROS、ULTRAPLAN、Bridge | 隐藏的高级功能 |
| **安全** | 权限系统、受保护文件、Undercover | 安全防护机制 |
| **隐藏功能** | 功能门控、Beta 功能、Computer Use | 未发布的功能 |

---

## 🛠️ 本地运行

### 环境要求

- Node.js 18+
- pnpm（推荐）或 npm

### 安装依赖

```bash
# 使用 pnpm（推荐）
pnpm install

# 或使用 npm
npm install
```

### 本地开发

```bash
pnpm dev
# 或
npm run dev
```

然后打开浏览器访问 http://localhost:5173

### 构建生产版本

```bash
pnpm build
# 或
npm run build
```

构建产物在 `dist` 目录中。

---

## 🚀 部署到 GitHub Pages

### 方法一：手动部署

1. Fork 这个仓库
2. 修改 `vite.config.ts` 中的 `base` 配置：
   ```ts
   base: '/你的仓库名/'
   ```
3. 构建项目：
   ```bash
   pnpm build
   ```
4. 将 `dist` 目录内容推送到 `gh-pages` 分支

### 方法二：使用 GitHub Actions

在仓库中创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: pnpm/action-setup@v2
        with:
          version: 8
          
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'pnpm'
          
      - run: pnpm install
      - run: pnpm build
      
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## 📹 视频脚本

本项目的配套视频脚本已包含在 `VIDEO_SCRIPT.md` 文件中，内容包括：

- Claude Code 源码泄露事件讲解
- 架构可视化项目的演示解说
- 录制建议和时间规划

---

## 📚 相关资源

- [Claude Code 源码泄露仓库](https://github.com/Ringmast4r/claw-cli-claude-code-source-code-v2.1.88)
- [React Flow 官方文档](https://reactflow.dev/)
- [Vite 官方文档](https://vitejs.dev/)

---

## 📄 许可证

本项目采用 MIT 许可证。

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

<p align="center">
  Made with ❤️ for the AI developer community
</p>