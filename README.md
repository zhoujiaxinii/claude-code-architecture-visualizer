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
- 📋 **详细信息展示**：鼠标悬停显示节点功能、技术细节和相关代码文件
- ✨ **平滑动画过渡**：所有交互都有流畅的动画效果
- 📱 **响应式设计**：支持桌面和移动设备
- 🚀 **自动部署**：推送到 GitHub 后自动部署到 GitHub Pages

---

## 🎯 在线演示

👉 [点击查看在线演示](https://zhoujiaxinii.github.io/claude-code-architecture-visualizer/)

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

### 自动部署（推荐）

本项目已配置 GitHub Actions，推送代码后会自动部署。

1. 点击仓库的 **Settings** → **Pages**
2. 在 **Source** 下选择 **GitHub Actions**
3. 推送代码到 `main` 分支，等待自动部署完成

### 手动部署

如果需要手动部署，可以使用以下步骤：

```bash
# 构建
pnpm build

# 将 dist 目录内容推送到 gh-pages 分支
```

---

## 📊 流程图节点说明

### 节点交互

- **鼠标悬停**：显示节点详细信息（功能描述、核心特性、技术细节、相关代码文件）
- **点击节点**：固定显示信息面板
- **拖动节点**：可自由重新排列节点位置
- **滚轮缩放**：支持鼠标滚轮或触控板缩放
- **小地图**：右下角显示整体缩略图，可快速定位

### 颜色说明

| 颜色 | 类别 | 说明 |
|------|------|------|
| 🔴 珊瑚红 | 核心 | CLI入口、Agent循环等核心组件 |
| 🟢 青绿 | 工具 | 40+ 内置工具 |
| 🔵 天蓝 | 服务 | API、Dream、LSP等服务 |
| 🟢 薄荷绿 | 特殊模式 | BUDDY、KAIROS、ULTRAPLAN等 |
| 🟡 金黄 | 安全 | 权限系统、受保护文件 |
| 🩷 粉红 | 隐藏功能 | 功能门控、Beta功能 |
| 🟣 紫色 | 系统 | 模型迁移、遥测等 |

---

## 📚 相关资源

- [Claude Code 源码泄露仓库](https://github.com/Ringmast4r/claw-cli-claude-code-source-code-v2.1.88)
- [React Flow 官方文档](https://reactflow.dev/)
- [Vite 官方文档](https://vitejs.dev/)

---

## 📄 许可证

本项目采用 MIT 许可证。

---

<p align="center">
  Made with ❤️ for the AI developer community
</p>