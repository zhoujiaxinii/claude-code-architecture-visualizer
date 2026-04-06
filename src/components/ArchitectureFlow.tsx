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
  Handle,
  Position,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { architectureNodes, architectureEdges, getNodePositions, ArchitectureNode as ArchNode } from '../data/architectureData';

// ====== 自定义业务节点 ======
const CustomNode: React.FC<NodeProps> = ({ data, selected }) => {
  const { label, color, coreFeatures } = data as ArchNode & { label: string; color: string; coreFeatures: string[] };

  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${color}22, ${color}44)`,
        border: `2px solid ${color}`,
        borderRadius: '10px',
        padding: '10px 16px',
        minWidth: '120px',
        textAlign: 'center',
        boxShadow: selected ? `0 0 25px ${color}88` : `0 4px 15px ${color}33`,
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      }}
    >
      <Handle type="target" position={Position.Top} style={{ background: color, width: 8, height: 8, border: '2px solid #1a1a25' }} />
      <div style={{ fontWeight: 700, color, fontSize: '13px', whiteSpace: 'nowrap' }}>
        {label}
      </div>
      {selected && (
        <div style={{ marginTop: '6px', fontSize: '10px', color: '#a0a0a0' }}>
          {coreFeatures?.slice(0, 2).join(' · ')}
        </div>
      )}
      <Handle type="source" position={Position.Bottom} style={{ background: color, width: 8, height: 8, border: '2px solid #1a1a25' }} />
    </div>
  );
};

// ====== 分组框节点（虚线边框，无 Handle，不参与连线） ======
const GroupNode: React.FC<NodeProps> = ({ data }) => {
  const { label, borderColor } = data as { label: string; borderColor: string; width: number; height: number };
  return (
    <div
      style={{
        width: data.width,
        height: data.height,
        border: `2px dashed ${borderColor}`,
        borderRadius: '14px',
        background: `${borderColor}08`,
        padding: '6px 14px',
        pointerEvents: 'none',
      }}
    >
      <div style={{
        fontWeight: 700,
        color: borderColor,
        fontSize: '11px',
        letterSpacing: '1px',
        opacity: 0.8,
      }}>
        {label}
      </div>
    </div>
  );
};

const nodeTypes = { custom: CustomNode, group: GroupNode };

interface ArchitectureFlowProps {
  onNodeHover: (node: ArchNode | null) => void;
  onNodeClick: (node: ArchNode) => void;
}

const ArchitectureFlow: React.FC<ArchitectureFlowProps> = ({ onNodeHover, onNodeClick }) => {
  const positions = getNodePositions();

  const initialNodes: Node[] = useMemo(() => {
    // 业务节点
    const bizNodes = architectureNodes.map((node) => ({
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
        relatedFiles: node.relatedFiles,
      },
    }));

    // 分组框节点（纯装饰，不参与连线）
    const groupNodes: Node[] = [
      {
        id: 'group-hidden',
        type: 'group',
        position: { x: -30, y: 1135 },
        draggable: false,
        selectable: false,
        data: {
          label: '🔒 隐藏 / 未发布功能',
          borderColor: '#fd79a8',
          width: 500,
          height: 120,
        },
      },
      {
        id: 'group-system',
        type: 'group',
        position: { x: 470, y: 1135 },
        draggable: false,
        selectable: false,
        data: {
          label: '⚙️ 系统组件',
          borderColor: '#6c5ce7',
          width: 720,
          height: 120,
        },
      },
    ];

    return [...bizNodes, ...groupNodes];
  }, []);

  const initialEdges: Edge[] = useMemo(() => {
    return architectureEdges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      label: edge.label,
      animated: edge.animated || false,
      type: 'smoothstep',
      style: { stroke: '#5a5a8a', strokeWidth: 2 },
      labelStyle: { fill: '#c0c0d0', fontSize: 11, fontWeight: 600 },
      labelBgStyle: { fill: '#1a1a25', fillOpacity: 0.9 },
      labelBgPadding: [8, 4] as [number, number],
      labelBgBorderRadius: 4,
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#5a5a8a',
        width: 16,
        height: 16,
      },
    }));
  }, []);

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const onNodeMouseEnter = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      const archNode = architectureNodes.find((n) => n.id === node.id);
      if (archNode) onNodeHover(archNode);
    },
    [onNodeHover]
  );

  const onNodeMouseLeave = useCallback(() => {
    onNodeHover(null);
  }, [onNodeHover]);

  const onNodeClickHandler = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      const archNode = architectureNodes.find((n) => n.id === node.id);
      if (archNode) onNodeClick(archNode);
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
        fitViewOptions={{ padding: 0.15 }}
        minZoom={0.1}
        maxZoom={2}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#1e1e30" gap={24} size={1} />
        <Controls
          showInteractive={false}
          style={{ backgroundColor: '#1a1a25', borderRadius: '8px', border: '1px solid #2a2a3a' }}
        />
        <MiniMap
          nodeColor={(node) => {
            if (node.type === 'group') return 'transparent';
            return (node.data as { color: string }).color || '#4a4a6a';
          }}
          style={{ backgroundColor: '#12121a', borderRadius: '8px', border: '1px solid #2a2a3a' }}
          maskColor="rgba(10, 10, 15, 0.85)"
          zoomable
          pannable
        />
      </ReactFlow>
    </div>
  );
};

export default ArchitectureFlow;