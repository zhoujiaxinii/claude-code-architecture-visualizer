import React, { useState } from 'react';
import ArchitectureFlow from './components/ArchitectureFlow';
import InfoPanel from './components/InfoPanel';
import { ArchitectureNode, colors } from './data/architectureData';

const App: React.FC = () => {
  const [hoveredNode, setHoveredNode] = useState<ArchitectureNode | null>(null);
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode | null>(null);

  const handleNodeHover = (node: ArchitectureNode | null) => {
    setHoveredNode(node);
  };

  const handleNodeClick = (node: ArchitectureNode) => {
    setSelectedNode(selectedNode?.id === node.id ? null : node);
  };

  // GitHub 仓库 URL（用户需要创建后替换）
  const GITHUB_REPO_URL = 'https://github.com/YOUR_USERNAME/claude-code-architecture-visualizer';

  // 源码泄露仓库 URL
  const SOURCE_REPO_URL = 'https://github.com/Ringmast4r/claw-cli-claude-code-source-code-v2.1.88';

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <h1>🤖 Claude Code 架构可视化</h1>
          <p>探索 Claude Code v2.1.88 源码泄露背后的内部架构</p>
        </div>
        <div className="header-right">
          <a
            href={SOURCE_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            📦 源码仓库
          </a>
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            🔗 GitHub 项目
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="flow-container">
          <ArchitectureFlow
            onNodeHover={handleNodeHover}
            onNodeClick={handleNodeClick}
          />
        </div>

        {/* Info Panel */}
        <InfoPanel
          node={hoveredNode || selectedNode}
          visible={!!hoveredNode || !!selectedNode}
        />
      </main>

      {/* Legend */}
      <div className="legend">
        <div className="legend-item">
          <div className="legend-dot" style={{ backgroundColor: colors.core }}></div>
          <span>核心组件</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot" style={{ backgroundColor: colors.tools }}></div>
          <span>工具系统</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot" style={{ backgroundColor: colors.services }}></div>
          <span>服务层</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot" style={{ backgroundColor: colors.special }}></div>
          <span>特殊模式</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot" style={{ backgroundColor: colors.security }}></div>
          <span>安全系统</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot" style={{ backgroundColor: colors.hidden }}></div>
          <span>隐藏功能</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot" style={{ backgroundColor: colors.system }}></div>
          <span>系统组件</span>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>
          基于泄露的 Claude Code v2.1.88 源码分析 | 
          <a href={SOURCE_REPO_URL} target="_blank" rel="noopener noreferrer">
            查看源码仓库
          </a>
        </p>
        <p style={{ marginTop: '10px', fontSize: '0.8rem' }}>
          💡 提示：将鼠标悬停在节点上查看详细信息，拖动节点可重新排列
        </p>
      </footer>
    </div>
  );
};

export default App;