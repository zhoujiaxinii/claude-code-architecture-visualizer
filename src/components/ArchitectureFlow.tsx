import React, { useCallback, useMemo } from 'react';
import ReactFlow, {
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  Background,
  Controls,
  MiniMap,
  NodeProps,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { architectureNodes, architectureEdges, getNodePositions, ArchitectureNode as ArchNode } from '../data/architectureData';

// 自定义节点组件
const CustomNode: React.FC<NodeProps> = ({ data, selected }) => {
  const { label, color, coreFeatures } = data as ArchNode & { label: string; color: string; coreFeatures: string[] };
  
  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${color}22, ${color}44)`,
        border: `2px solid ${color}`,
        borderRadius: '12px',
        padding: '12px 16px',
        minWidth: '120px',
        textAlign: 'center',
        boxShadow: selected ? `0 0 20px ${color}66` : `0 4px 15px ${color}33`,
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      }}
      className="custom-node"
    >
      <div style={{ fontWeight: 700, color: color, fontSize: '14px' }}>
        {label}
      </div>
      {selected && (
        <div style={{ marginTop: '8px', fontSize: '11px', color: '#a0a0a0' }}>
          {coreFeatures?.slice(0, 2).join(' • ')}
        </div>
      )}
    </div>
  );
};

// 节点类型映射
const nodeTypes = {
  custom: CustomNode,
};

interface ArchitectureFlowProps {
  onNodeHover: (node: ArchNode | null) => void;
  onNodeClick: (node: ArchNode) => void;
}

const ArchitectureFlow: React.FC<ArchitectureFlowProps> = ({ onNodeHover, onNodeClick }) => {
  // 初始化节点
  const initialNodes: Node[] = useMemo(() => {
    const positions = getNodePositions(1200, 800);
    return architectureNodes.map((node) => ({
      id: node.id,
      type: 'custom',
      position: positions[node.id] || { x: 0, y: 0 },
      data: {
        label: node.label,
        color: node.color,
        description: node.description,
        coreFeatures: node.coreFeatures,
        technicalDetails: node.technicalDetails,
        category: node.category,
      },
    }));
  }, []);

  // 初始化边
  const initialEdges: Edge[] = useMemo(() => {
    return architectureEdges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      label: edge.label,
      animated: edge.animated || false,
      style: { stroke: '#4a4a6a', strokeWidth: 2 },
      labelStyle: { fill: '#a0a0a0', fontSize: 11 },
      labelBgStyle: { fill: '#1a1a25', fillOpacity: 0.8 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#4a4a6a',
      },
    }));
  }, []);

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  // 鼠标悬停处理
  const onNodeMouseEnter = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      const archNode = architectureNodes.find((n) => n.id === node.id);
      if (archNode) {
        onNodeHover(archNode);
      }
    },
    [onNodeHover]
  );

  const onNodeMouseLeave = useCallback(() => {
    onNodeHover(null);
  }, [onNodeHover]);

  // 点击处理
  const onNodeClickHandler = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      const archNode = architectureNodes.find((n) => n.id === node.id);
      if (archNode) {
        onNodeClick(archNode);
      }
    },
    [onNodeClick]
  );

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeMouseEnter={onNodeMouseEnter}
        onNodeMouseLeave={onNodeMouseLeave}
        onNodeClick={onNodeClickHandler}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.3}
        maxZoom={2}
        defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
      >
        <Background color="#2a2a3a" gap={20} size={1} />
        <Controls
          style={{
            backgroundColor: '#1a1a25',
            borderRadius: '8px',
          }}
        />
        <MiniMap
          nodeColor={(node) => (node.data as { color: string }).color || '#4a4a6a'}
          style={{
            backgroundColor: '#12121a',
            borderRadius: '8px',
          }}
          maskColor="rgba(10, 10, 15, 0.8)"
        />
      </ReactFlow>
    </div>
  );
};

export default ArchitectureFlow;