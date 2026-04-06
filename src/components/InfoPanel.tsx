import React from 'react';
import { ArchitectureNode } from '../data/architectureData';

interface InfoPanelProps {
  node: ArchitectureNode | null;
  visible: boolean;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ node, visible }) => {
  if (!node) return null;

  const categoryLabels: Record<string, string> = {
    core: '核心',
    tools: '工具',
    services: '服务',
    special: '特殊模式',
    security: '安全',
    hidden: '隐藏功能',
    system: '系统',
  };

  const categoryColors: Record<string, string> = {
    core: '#ff6b6b',
    tools: '#4ecdc4',
    services: '#45b7d1',
    special: '#96ceb4',
    security: '#ffeaa7',
    hidden: '#fd79a8',
    system: '#6c5ce7',
  };

  return (
    <div
      className={`info-panel ${visible ? 'visible' : ''}`}
      style={{
        borderColor: node.color,
      }}
    >
      {/* 标题区域 */}
      <div className="info-header">
        <div className="info-title-row">
          <div
            className="info-dot"
            style={{ backgroundColor: node.color }}
          />
          <h3 className="info-title" style={{ color: node.color }}>
            {node.label}
          </h3>
        </div>
        <span
          className="info-category-tag"
          style={{
            backgroundColor: categoryColors[node.category] + '22',
            color: categoryColors[node.category],
            borderColor: categoryColors[node.category],
          }}
        >
          {categoryLabels[node.category] || node.category}
        </span>
      </div>

      {/* 描述 */}
      <p className="info-description">{node.description}</p>

      {/* 核心功能 */}
      <div className="info-section">
        <h4 className="info-section-title" style={{ color: '#ffeaa7' }}>
          ⚡ 核心功能
        </h4>
        <ul className="info-feature-list">
          {node.coreFeatures.map((feature, index) => (
            <li key={index} className="info-feature-item">
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* 技术细节 */}
      <div className="info-section">
        <h4 className="info-section-title" style={{ color: '#4ecdc4' }}>
          🔧 技术细节
        </h4>
        <p className="info-tech-details">{node.technicalDetails}</p>
      </div>

      {/* 相关代码文件 */}
      <div className="info-section">
        <h4 className="info-section-title" style={{ color: '#fd79a8' }}>
          📁 相关代码文件
        </h4>
        <div className="info-files-container">
          {node.relatedFiles.map((file, index) => (
            <span key={index} className="info-file-tag">
              {file}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;