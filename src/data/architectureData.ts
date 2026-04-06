// Claude Code 架构节点数据
export interface ArchitectureNode {
  id: string;
  label: string;
  category: string;
  description: string;
  coreFeatures: string[];
  technicalDetails: string;
  color: string;
  position?: { x: number; y: number };
  relatedFiles: string[]; // 新增：相关代码文件
}

export interface ArchitectureEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  animated?: boolean;
}

// 节点颜色方案
export const colors = {
  core: '#ff6b6b',      // 核心 - 珊瑚红
  tools: '#4ecdc4',     // 工具 - 青绿
  services: '#45b7d1',  // 服务 - 天蓝
  special: '#96ceb4',   // 特殊模式 - 薄荷绿
  security: '#ffeaa7',  // 安全 - 金黄
  hidden: '#fd79a8',    // 隐藏功能 - 粉红
  system: '#6c5ce7',    // 系统 - 紫色
};

// 所有架构节点
export const architectureNodes: ArchitectureNode[] = [
  // ====== 核心入口层 ======
  {
    id: 'cli-entry',
    label: 'CLI 入口',
    category: 'core',
    description: 'Claude Code 的命令行入口点，处理用户输入、参数解析和会话初始化',
    coreFeatures: [
      '命令行参数解析',
      '会话状态初始化',
      '环境配置检测',
      '用户认证验证'
    ],
    technicalDetails: '入口文件为 main.tsx (785KB)，使用 Bun 构建。包含完整的 React 终端渲染器，支持实时 UI 更新。',
    color: colors.core,
    relatedFiles: ['src/main.tsx', 'src/cli/', 'src/setup.ts', 'src/entrypoints/'],
  },
  {
    id: 'react-terminal',
    label: 'React 终端渲染',
    category: 'core',
    description: '基于 React 的终端 UI 渲染系统，提供丰富的交互式界面',
    coreFeatures: [
      'Ink 终端渲染框架',
      '实时响应式布局',
      '键盘快捷键支持',
      '多窗口/分屏显示'
    ],
    technicalDetails: '使用自定义的 Ink 框架变体，支持 ANSI 颜色、Unicode 字符和终端鼠标事件。',
    color: colors.core,
    relatedFiles: ['src/ink/', 'src/ink.ts', 'src/components/', 'src/screens/'],
  },

  // ====== Agent 核心 ======
  {
    id: 'agent-loop',
    label: 'Agent 循环引擎',
    category: 'core',
    description: 'Claude Code 的核心执行循环，管理思考-行动-观察的迭代过程',
    coreFeatures: [
      '思考链(Chain of Thought)',
      '工具调用调度',
      '响应流式处理',
      '上下文窗口管理'
    ],
    technicalDetails: '实现了完整的 ReAct (Reasoning + Acting) 循环，支持多轮对话、中断恢复和错误重试机制。',
    color: colors.core,
    relatedFiles: ['src/Task.ts', 'src/query.ts', 'src/interactiveHelpers.tsx', 'src/history.ts'],
  },
  {
    id: 'query-engine',
    label: '查询引擎',
    category: 'core',
    description: '处理用户输入、历史上下文和工具结果的智能解析系统',
    coreFeatures: [
      '自然语言理解',
      '意图识别',
      '上下文压缩',
      '对话历史管理'
    ],
    technicalDetails: 'QueryEngine.ts (46KB) 负责解析用户输入、构建提示词、管理对话历史和上下文窗口优化。',
    color: colors.core,
    relatedFiles: ['src/QueryEngine.ts', 'src/query.ts', 'src/query/'],
  },

  // ====== 工具系统 ======
  {
    id: 'tools-core',
    label: '工具注册系统',
    category: 'tools',
    description: '管理所有工具的注册、发现和调用的核心系统',
    coreFeatures: [
      '40+ 内置工具',
      '动态工具注册',
      '工具 Schema 缓存',
      '权限门控集成'
    ],
    technicalDetails: '通过 getAllBaseTools() 注册所有工具，使用 JSON Schema 描述参数，支持 MCP (Model Context Protocol) 扩展。',
    color: colors.tools,
    relatedFiles: ['src/tools.ts', 'src/Tool.ts', 'src/tools/', 'src/services/tools/'],
  },
  {
    id: 'tool-bash',
    label: 'Bash/Shell 工具',
    category: 'tools',
    description: '执行终端命令的核心工具，支持沙箱模式',
    coreFeatures: [
      '命令执行',
      '沙箱隔离',
      '超时控制',
      '输出流式处理'
    ],
    technicalDetails: 'BashTool 和 PowerShellTool 支持 Windows/macOS/Linux，可选沙箱模式防止危险操作。',
    color: colors.tools,
    relatedFiles: ['src/tools/BashTool/', 'src/tools/PowerShellTool/', 'src/utils/bash/', 'src/utils/sandbox/'],
  },
  {
    id: 'tool-file',
    label: '文件操作工具',
    category: 'tools',
    description: '文件读写、编辑和搜索工具集',
    coreFeatures: [
      'FileRead/Write/Edit',
      'Glob 模式搜索',
      'Grep 内容搜索',
      '路径穿越防护'
    ],
    technicalDetails: '支持原生 bfs/ugrep 加速，内置路径安全检查，防止目录穿越攻击。',
    color: colors.tools,
    relatedFiles: ['src/tools/FileReadTool/', 'src/tools/FileWriteTool/', 'src/tools/FileEditTool/', 'src/tools/GlobTool/', 'src/tools/GrepTool/'],
  },
  {
    id: 'tool-web',
    label: 'Web 工具',
    category: 'tools',
    description: '网络访问和网页内容处理工具',
    coreFeatures: [
      'WebFetch 网页获取',
      'WebSearch 搜索',
      'WebBrowser 浏览',
      '内容解析'
    ],
    technicalDetails: '集成浏览器自动化，支持 JavaScript 渲染、截图捕获和表单填写。',
    color: colors.tools,
    relatedFiles: ['src/tools/WebFetchTool/', 'src/tools/WebSearchTool/', 'src/utils/claudeInChrome/'],
  },
  {
    id: 'tool-agent',
    label: 'Agent 工具',
    category: 'tools',
    description: '子智能体生成和管理工具',
    coreFeatures: [
      '子 Agent 生成',
      '并行任务执行',
      '结果聚合',
      '任务隔离'
    ],
    technicalDetails: 'AgentTool 可以创建独立的子智能体执行特定任务，支持并行执行和结果汇总。',
    color: colors.tools,
    relatedFiles: ['src/tools/AgentTool/', 'src/utils/swarm/', 'src/coordinator/'],
  },
  {
    id: 'tool-task',
    label: '任务管理工具',
    category: 'tools',
    description: '后台任务创建、监控和管理工具集',
    coreFeatures: [
      'TaskCreate/Get/List',
      'TaskUpdate/Stop',
      'TaskOutput 输出',
      '后台执行'
    ],
    technicalDetails: '完整的任务生命周期管理，支持异步执行、状态轮询和结果获取。',
    color: colors.tools,
    relatedFiles: ['src/tools/TaskCreateTool/', 'src/tools/TaskGetTool/', 'src/tools/TaskListTool/', 'src/tools/TaskUpdateTool/', 'src/tasks.ts', 'src/tasks/'],
  },
  {
    id: 'tool-mcp',
    label: 'MCP 工具',
    category: 'tools',
    description: 'Model Context Protocol 集成工具',
    coreFeatures: [
      'MCP 服务器连接',
      '资源列表/读取',
      '工具发现',
      '协议适配'
    ],
    technicalDetails: '支持与外部 MCP 服务器通信，扩展 Claude Code 的能力边界。',
    color: colors.tools,
    relatedFiles: ['src/tools/MCPTool/', 'src/tools/ListMcpResourcesTool/', 'src/tools/ReadMcpResourceTool/', 'src/services/mcp/'],
  },

  // ====== 服务层 ======
  {
    id: 'service-api',
    label: 'API 服务',
    category: 'services',
    description: '与 Anthropic API 通信的核心服务',
    coreFeatures: [
      'API 请求构建',
      '流式响应处理',
      'Beta 功能协商',
      '速率限制处理'
    ],
    technicalDetails: '支持多种 beta header（如 1M context、fast mode、structured outputs），自动处理速率限制和重试。',
    color: colors.services,
    relatedFiles: ['src/services/api/', 'src/constants/betas.ts', 'src/services/rateLimitMessages.ts'],
  },
  {
    id: 'service-autodream',
    label: 'Dream 系统',
    category: 'services',
    description: '后台记忆整合引擎 - "Claude 真的会做梦"',
    coreFeatures: [
      '三重门触发器',
      '四阶段整合',
      '记忆修剪',
      '知识持久化'
    ],
    technicalDetails: 'autoDream 系统以分叉子智能体形式运行，24小时/5会话触发一次，对记忆进行反思式整理。',
    color: colors.services,
    relatedFiles: ['src/services/autoDream/', 'src/services/autoDream/autoDream.ts', 'src/services/autoDream/consolidationPrompt.ts', 'src/memdir/'],
  },
  {
    id: 'service-lsp',
    label: 'LSP 服务',
    category: 'services',
    description: 'Language Server Protocol 集成',
    coreFeatures: [
      '代码补全',
      '定义跳转',
      '引用查找',
      '错误诊断'
    ],
    technicalDetails: 'LSPTool 提供与 IDE 类似的代码智能功能，支持多种编程语言。',
    color: colors.services,
    relatedFiles: ['src/tools/LSPTool/', 'src/services/lsp/'],
  },
  {
    id: 'service-voice',
    label: '语音服务',
    category: 'services',
    description: '语音输入和语音识别服务',
    coreFeatures: [
      '实时语音识别',
      '关键词检测',
      '语音流处理',
      '多语言支持'
    ],
    technicalDetails: 'voice.ts (17KB) 和 voiceStreamSTT.ts (21KB) 实现语音输入功能。',
    color: colors.services,
    relatedFiles: ['src/services/voice.ts', 'src/services/voiceStreamSTT.ts', 'src/services/voiceKeyterms.ts', 'src/voice/'],
  },

  // ====== 特殊模式 ======
  {
    id: 'mode-buddy',
    label: 'BUDDY 模式',
    category: 'special',
    description: '电子宠物同伴系统 - 你的终端里有只小伙伴',
    coreFeatures: [
      '18 种物种',
      '扭蛋系统',
      '程序化属性',
      '灵魂生成'
    ],
    technicalDetails: '使用 Mulberry32 PRNG 根据用户 ID 确定性生成，包含稀有度系统（普通/稀有/传说）和 1% 闪光概率。',
    color: colors.special,
    relatedFiles: ['src/buddy/', 'src/buddy/CompanionSprite.tsx', 'src/buddy/companion.ts', 'src/buddy/sprites.ts', 'src/buddy/prompt.ts'],
  },
  {
    id: 'mode-kairos',
    label: 'KAIROS 模式',
    category: 'special',
    description: '常驻在线助手 - 主动响应的 AI 伙伴',
    coreFeatures: [
      '主动观察',
      '日志记录',
      '主动响应',
      '15秒阻塞预算'
    ],
    technicalDetails: '维护每日日志，接收 <tick> 提示自行决策。拥有专属工具：SendUserFile、PushNotification。',
    color: colors.special,
    relatedFiles: ['src/assistant/', 'src/assistant/sessionHistory.ts'],
  },
  {
    id: 'mode-ultraplan',
    label: 'ULTRAPLAN 模式',
    category: 'special',
    description: '远程规划系统 - 30 分钟深度思考',
    coreFeatures: [
      '远程 CCR 会话',
      'Opus 4.6 思考',
      '浏览器审批 UI',
      '结果传送回传'
    ],
    technicalDetails: '卸载复杂规划到远程容器，最多 30 分钟思考时间，用户在浏览器中审批结果。',
    color: colors.special,
    relatedFiles: ['src/utils/ultraplan/', 'src/utils/ultraplan/ccrSession.ts', 'src/utils/ultraplan/keyword.ts', 'src/remote/'],
  },
  {
    id: 'mode-bridge',
    label: 'Bridge 模式',
    category: 'special',
    description: '与 claude.ai 集成的桥接系统',
    coreFeatures: [
      'JWT 认证',
      '会话同步',
      '受信设备',
      '远程控制'
    ],
    technicalDetails: '支持 single-session/worktree/same-dir 三种工作模式，提供更高级别的安全层级。',
    color: colors.special,
    relatedFiles: ['src/bridge/', 'src/bridge/bridgeMain.ts', 'src/bridge/bridgeApi.ts', 'src/bridge/replBridge.ts', 'src/bridge/jwtUtils.ts'],
  },
  {
    id: 'mode-coordinator',
    label: 'Coordinator 模式',
    category: 'special',
    description: '多智能体编排系统',
    coreFeatures: [
      'Worker 生成',
      '任务分发',
      '结果聚合',
      '并行执行'
    ],
    technicalDetails: '支持并行研究、集中规划、分布式执行和验证循环。',
    color: colors.special,
    relatedFiles: ['src/coordinator/', 'src/utils/swarm/', 'src/hooks/'],
  },

  // ====== 安全系统 ======
  {
    id: 'security-permissions',
    label: '权限系统',
    category: 'security',
    description: '精细化的操作权限控制系统',
    coreFeatures: [
      '权限模式 (default/auto/bypass)',
      '风险分类 (LOW/MEDIUM/HIGH)',
      'YOLO 分类器',
      '权限解释器'
    ],
    technicalDetails: '每个工具动作都会被分类评估，支持交互式提示和 ML 自动批准。',
    color: colors.security,
    relatedFiles: ['src/tools/permissions/', 'src/utils/permissions/', 'src/tools/shared/'],
  },
  {
    id: 'security-protected',
    label: '受保护文件',
    category: 'security',
    description: '防止敏感文件被自动修改的保护机制',
    coreFeatures: [
      '.gitconfig 保护',
      '.bashrc/.zshrc 保护',
      '.mcp.json 保护',
      '路径穿越防护'
    ],
    technicalDetails: 'URL 编码穿越、Unicode 规范化攻击、反斜杠注入、大小写不敏感路径操控全部处理。',
    color: colors.security,
    relatedFiles: ['src/utils/permissions/', 'src/tools/FileEditTool/', 'src/tools/FileWriteTool/'],
  },
  {
    id: 'security-undercover',
    label: 'Undercover Mode',
    category: 'security',
    description: '防止敏感信息泄露的内部系统',
    coreFeatures: [
      '提交信息过滤',
      'PR 描述检查',
      '敏感词检测',
      '内部细节隐藏'
    ],
    technicalDetails: '讽刺的是，这个系统存在，但整个代码库却通过 sourcemap 泄露了。',
    color: colors.security,
    relatedFiles: ['src/hooks/', 'src/utils/git/'],
  },

  // ====== 隐藏/未发布功能 ======
  {
    id: 'hidden-features',
    label: '功能门控系统',
    category: 'hidden',
    description: '编译期和运行时功能开关系统',
    coreFeatures: [
      'Bun feature() 开关',
      '死代码消除',
      '内部/外部构建区分',
      'GrowthBook 运行时门控'
    ],
    technicalDetails: 'PROACTIVE、KAIROS、BUDDY、BRIDGE_MODE、DAEMON 等功能通过编译期开关控制。',
    color: colors.hidden,
    relatedFiles: ['src/constants/', 'src/context.ts', 'src/hooks/'],
  },
  {
    id: 'hidden-betas',
    label: '未发布 Beta',
    category: 'hidden',
    description: '隐藏的 API beta 功能',
    coreFeatures: [
      '1M Token 上下文',
      'Fast 模式 (Penguin)',
      'AFK 模式',
      'Advisor 工具'
    ],
    technicalDetails: 'constants/betas.ts 揭示了多个未发布的 beta header，如 redact-thinking、afk-mode。',
    color: colors.hidden,
    relatedFiles: ['src/constants/betas.ts', 'src/services/api/'],
  },
  {
    id: 'hidden-computer-use',
    label: 'Computer Use',
    category: 'hidden',
    description: '代号 "Chicago" 的电脑操作能力',
    coreFeatures: [
      '截图捕获',
      '鼠标点击',
      '键盘输入',
      '坐标变换'
    ],
    technicalDetails: '构建于 @ant/computer-use-mcp 之上，仅对 Max/Pro 订阅开放。',
    color: colors.hidden,
    relatedFiles: ['src/utils/computerUse/', 'src/services/mcp/'],
  },

  // ====== 系统组件 ======
  {
    id: 'system-migrations',
    label: '模型迁移系统',
    category: 'system',
    description: '模型代号演变历史',
    coreFeatures: [
      'Fennec → Opus',
      'Sonnet 1M → Sonnet 4.5',
      'Pro 重置到 Opus',
      '版本管理'
    ],
    technicalDetails: '揭示了内部代号演变：Fennec 曾是 Opus 的代号。',
    color: colors.system,
    relatedFiles: ['src/migrations/', 'src/utils/model/'],
  },
  {
    id: 'system-telemetry',
    label: '遥测系统',
    category: 'system',
    description: '使用分析和诊断追踪',
    coreFeatures: [
      '使用统计',
      '错误追踪',
      '性能监控',
      '功能使用分析'
    ],
    technicalDetails: 'diagnosticTracking.ts (12KB) 负责收集匿名使用数据。',
    color: colors.system,
    relatedFiles: ['src/services/diagnosticTracking.ts', 'src/services/analytics/', 'src/utils/telemetry/'],
  },
  {
    id: 'system-attestation',
    label: '客户端证明',
    category: 'system',
    description: '验证请求来自真实 Claude Code 安装',
    coreFeatures: [
      '哈希计算',
      '真实性验证',
      'cch header',
      '防伪造'
    ],
    technicalDetails: 'NATIVE_CLIENT_ATTESTATION 功能让 Bun HTTP 栈计算哈希进行客户端真实性检查。',
    color: colors.system,
    relatedFiles: ['src/services/api/', 'src/upstreamproxy/'],
  },
];

// 连接边
export const architectureEdges: ArchitectureEdge[] = [
  // 入口连接
  { id: 'e1', source: 'cli-entry', target: 'react-terminal', animated: true },
  { id: 'e2', source: 'cli-entry', target: 'agent-loop' },
  { id: 'e3', source: 'agent-loop', target: 'query-engine' },
  
  // Agent 核心 -> 工具
  { id: 'e4', source: 'agent-loop', target: 'tools-core', label: '调用' },
  { id: 'e5', source: 'tools-core', target: 'tool-bash' },
  { id: 'e6', source: 'tools-core', target: 'tool-file' },
  { id: 'e7', source: 'tools-core', target: 'tool-web' },
  { id: 'e8', source: 'tools-core', target: 'tool-agent' },
  { id: 'e9', source: 'tools-core', target: 'tool-task' },
  { id: 'e10', source: 'tools-core', target: 'tool-mcp' },
  
  // Agent 核心 -> 服务
  { id: 'e11', source: 'agent-loop', target: 'service-api', label: 'API' },
  { id: 'e12', source: 'agent-loop', target: 'service-autodream', label: 'Dream' },
  { id: 'e13', source: 'agent-loop', target: 'service-lsp' },
  { id: 'e14', source: 'agent-loop', target: 'service-voice' },
  
  // 特殊模式连接
  { id: 'e15', source: 'agent-loop', target: 'mode-buddy', label: 'BUDDY' },
  { id: 'e16', source: 'agent-loop', target: 'mode-kairos', label: 'KAIROS' },
  { id: 'e17', source: 'agent-loop', target: 'mode-ultraplan', label: 'ULTRAPLAN' },
  { id: 'e18', source: 'agent-loop', target: 'mode-bridge', label: 'Bridge' },
  { id: 'e19', source: 'agent-loop', target: 'mode-coordinator', label: '协调' },
  
  // 安全系统连接
  { id: 'e20', source: 'tools-core', target: 'security-permissions', label: '权限检查' },
  { id: 'e21', source: 'tool-file', target: 'security-protected' },
  { id: 'e22', source: 'agent-loop', target: 'security-undercover' },
  
  // 隐藏功能
  { id: 'e23', source: 'cli-entry', target: 'hidden-features', label: '门控' },
  { id: 'e24', source: 'service-api', target: 'hidden-betas' },
  { id: 'e25', source: 'tools-core', target: 'hidden-computer-use' },
  
  // 系统组件
  { id: 'e26', source: 'agent-loop', target: 'system-telemetry' },
  { id: 'e27', source: 'service-api', target: 'system-attestation' },
  { id: 'e28', source: 'service-api', target: 'system-migrations' },
];

// 节点布局位置（自动计算后会调整）
export const getNodePositions = (width: number, _height: number) => {
  const centerX = width / 2;
  
  // 定义每个节点的相对位置
  const positions: Record<string, { x: number; y: number }> = {
    // 入口层 (顶部)
    'cli-entry': { x: centerX, y: 50 },
    'react-terminal': { x: centerX - 200, y: 150 },
    
    // 核心引擎
    'agent-loop': { x: centerX, y: 200 },
    'query-engine': { x: centerX + 200, y: 200 },
    
    // 工具层 (左侧)
    'tools-core': { x: 200, y: 350 },
    'tool-bash': { x: 50, y: 480 },
    'tool-file': { x: 150, y: 480 },
    'tool-web': { x: 250, y: 480 },
    'tool-agent': { x: 50, y: 560 },
    'tool-task': { x: 150, y: 560 },
    'tool-mcp': { x: 250, y: 560 },
    
    // 服务层 (右侧)
    'service-api': { x: centerX + 300, y: 350 },
    'service-autodream': { x: centerX + 200, y: 480 },
    'service-lsp': { x: centerX + 350, y: 480 },
    'service-voice': { x: centerX + 500, y: 480 },
    
    // 特殊模式 (中间)
    'mode-buddy': { x: 100, y: 700 },
    'mode-kairos': { x: 250, y: 700 },
    'mode-ultraplan': { x: 400, y: 700 },
    'mode-bridge': { x: 550, y: 700 },
    'mode-coordinator': { x: 700, y: 700 },
    
    // 安全系统 (上方)
    'security-permissions': { x: centerX - 100, y: 100 },
    'security-protected': { x: centerX + 100, y: 100 },
    'security-undercover': { x: centerX, y: 100 },
    
    // 隐藏功能 (右侧)
    'hidden-features': { x: centerX + 500, y: 200 },
    'hidden-betas': { x: centerX + 500, y: 300 },
    'hidden-computer-use': { x: centerX + 500, y: 400 },
    
    // 系统组件 (底部)
    'system-migrations': { x: 850, y: 700 },
    'system-telemetry': { x: 950, y: 700 },
    'system-attestation': { x: 1050, y: 700 },
  };
  
  return positions;
};