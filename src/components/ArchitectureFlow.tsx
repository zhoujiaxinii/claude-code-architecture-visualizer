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

const CustomNode: React.FC<NodeProps> = ({ data, selected }) => {
  const { label, color, coreFeatures } = data as ArchNode & { label: string; color: string; coreFeatures: string[] };

  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${color}22, ${color}44)`,
        border: `2px solid ${color}`,
        borderRadius: '12px',
        padding: '14px 20px',
        minWidth: '140px',
        textAlign: 'center',
        boxShadow: selected ? `0 0 25px ${color}88` : `0 4px 15px ${color}33`,
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      }}
    >
      <Handle type="target" position={Position.Top} style={{ background: color, width: 10, height: 10, border: '2px solid #1a1a25' }} />
      <div style={{ fontWeight: 700, color, fontSize: '14px', whiteSpace: 'nowrap' }}>
        {label}
      </div>
      {selected && (
        <div style={{ marginTop: '8px', fontSize: '11px', color: '#a0a0a0' }}>
          {coreFeatures?.slice(0, 2).join(' · ')}
        </div>
      )}
      <Handle type="source" position={Position.Bottom} style={{ background: color, width: 10, height: 10, border: '2px solid #1a1a25' }} />
    </div>
  );
};

const nodeTypes = { custom: CustomNode };

interface ArchitectureFlowProps {
  onNodeHover: (node: ArchNode | null) => void;
  onNodeClick: (node: ArchNode) => void;
}

const ArchitectureFlow: React.FC<ArchitectureFlowProps> = ({ onNodeHover, onNodeClick }) => {
  const initialNodes: Node[] = useMemo(() => {
    const positions = getNodePositions();
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
        relatedFiles: node.relatedFiles,
      },
    }));
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
        minZoom={0.15}
        maxZoom={2}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#1e1e30" gap={24} size={1} />
        <Controls
          showInteractive={false}
          style={{ backgroundColor: '#1a1a25', borderRadius: '8px', border: '1px solid #2a2a3a' }}
        />
        <MiniMap
          nodeColor={(node) => (node.data as { color: string }).color || '#4a4a6a'}
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