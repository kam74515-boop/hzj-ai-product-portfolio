export const projects = [
  {
    id: 'wxeditor',
    order: '01',
    status: '已上线',
    tag: 'AI Agent · SaaS',
    title: 'WXEditor',
    subtitle: '把公众号写作、排版与发布，收进一个可控的 AI 工作台',
    summary:
      '面向公众号创作者与内容团队，将选题、写作、局部改稿、排版、协作、发布体检和微信同步串成连续工作流。AI 不只给建议，而是通过工具调用直接修改文档，同时保留可恢复、可审查、可追踪的控制权。',
    role: '产品设计 · Agent 方案 · 评测体系',
    period: '2026',
    accent: '#f2df72',
    url: 'https://wxditor.chat/',
    heroImage: '/assets/wxeditor-workbench.png',
    cardImage: '/assets/wxeditor-home.png',
    facts: [
      { value: '19', label: '项一等 AI 工具能力' },
      { value: '80+', label: '精选排版模板' },
      { value: '3 层', label: 'Agent 评测体系' },
    ],
    problem: {
      kicker: '产品问题',
      title: '创作者不是缺一个聊天框，而是缺一条不断裂的生产链。',
      copy:
        '公众号内容生产通常跨越灵感工具、AI 对话、编辑器、素材库和微信后台。每一次复制粘贴都会丢失排版、上下文和协作状态。产品目标不是“加一个 AI 按钮”，而是让 AI 进入文档工作流，并在出错时仍然可控。',
    },
    decisions: [
      {
        no: '01',
        title: '文档是主角，AI 是协作者',
        copy: '编辑画布保持中心位置，AI 面板常驻右侧；用户始终能看到 AI 对正文造成了什么变化。',
      },
      {
        no: '02',
        title: '用工具调用替代整篇重写',
        copy: '把新增、替换、移动、套模板、配图等动作拆成明确工具，降低误改全文和格式污染。',
      },
      {
        no: '03',
        title: '发布前设置硬护栏',
        copy: '在同步微信前检查兼容性、广告法用词、违规内容与外链图片，把概率问题变成可验证清单。',
      },
    ],
    flow: [
      { label: '01', title: '进入工作台', copy: '作品集直接进入已登录编辑状态，不把登录或注册作为案例体验前置条件。' },
      { label: '02', title: '补齐上下文', copy: '读取文档块、@ 引用、模板、附件与用户写作偏好。' },
      { label: '03', title: '执行工具', copy: '按需调用写入、替换、移动、检索、模板和图片工具。' },
      { label: '04', title: '校验变更', copy: '检查结构、微信兼容性、非目标块与危险内容。' },
      { label: '05', title: '用户确认', copy: '展示改动说明，支持恢复到改前并继续局部迭代。' },
      { label: '06', title: '同步发布', copy: '净化 HTML、转存图片并同步至公众号草稿箱。' },
    ],
    gallery: [
      {
        src: '/assets/wxeditor-workbench.png',
        label: '三栏编辑工作台',
        note: '素材、文档与 AI 协作并行，手机预览让排版结果始终贴近发布终端。',
      },
      {
        src: '/assets/wxeditor-home.png',
        label: '上线官网',
        note: '用“从灵感到发布”的完整价值链，而不是单点 AI 能力来解释产品。',
      },
      {
        src: '/assets/wxeditor-extension.png',
        label: '公众号侧边扩展',
        note: '把素材检索与内容插入带进公众号编辑器，降低跨工具复制粘贴造成的上下文与格式损耗。',
      },
    ],
    logic: [
      {
        title: '上下文策略',
        copy: '完整文档、当前选区、@ 引用和用户偏好分层进入上下文；轻量任务走快速路由，复杂任务进入 Agent Loop。',
      },
      {
        title: '评测设计',
        copy: 'L1 确定性回归进入 CI，L2 用真实模型跑行为评测，L3 以人工金标校准裁判模型。',
      },
      {
        title: '安全边界',
        copy: '提示注入、越权文档、SSRF、配额、内容安全与截断恢复均设置发布硬门槛。',
      },
      {
        title: '商业闭环',
        copy: '免费体验承担获客，模板、AI 配额、多人协作与企业权限形成分层付费价值。',
      },
    ],
    takeaway:
      'AI 写作产品的壁垒不在“生成一篇文章”，而在能否安全地修改用户已有内容，并把生成结果送到真正的发布终点。',
  },
  {
    id: 'aigc-education',
    order: '02',
    status: '线上产品',
    tag: 'AI Education · Canvas',
    title: 'AIGC 先锋学会',
    subtitle: '连接课程学习、无限画布创作与作品社区发布',
    summary:
      '面向设计师与创意从业者，将线上与线下课程、AI 创作工具、无限画布和作品发布放在同一产品体系中。用户可以从课程进入画布完成项目，再将结果发布到作品社区。',
    role: '教育产品体验 · 创作链路 · 无限画布',
    period: '2024 — 2026',
    accent: '#5f7cff',
    url: 'https://aigcdesign.art/',
    heroImage: '/assets/aigc-canvas.png',
    cardImage: '/assets/aigc-courses.png',
    cardLayout: 'web',
    facts: [
      { value: '4+2', label: '线上与线下课程方向' },
      { value: '5 步', label: '学习到社区的闭环' },
      { value: '4.9/5', label: '官网展示课程口碑' },
    ],
    problem: {
      kicker: '产品问题',
      title: '如何把课程学习连接到画布创作和作品发布。',
      copy:
        '设计类课程需要练习、素材组织、方案比较与作业反馈。如果课程、生成工具和作品展示相互分离，用户需要重复迁移任务上下文，也更难完成并发布项目成果。',
    },
    decisions: [
      {
        no: '01',
        title: '按职业任务组织课程',
        copy: '课程不是按软件菜单分类，而是围绕视觉、产品、商业空间和居住空间等工作结果组织。',
      },
      {
        no: '02',
        title: '让画布承接学习后的行动',
        copy: '无限画布同时容纳参考图、设计说明、生成结果和方案板，减少工具切换与素材失联。',
      },
      {
        no: '03',
        title: '作品社区成为学习反馈层',
        copy: '作品发布、浏览、点赞与作者身份让作业从一次性交付变成可持续积累的个人资产。',
      },
    ],
    flow: [
      { label: '01', title: '发现方向', copy: '通过课程系列和真实作品明确学习目标。' },
      { label: '02', title: '系统学习', copy: '线上内容与线下工作坊覆盖知识和实操。' },
      { label: '03', title: '画布创作', copy: '在无限画布中组织素材、提示词、图片与方案。' },
      { label: '04', title: '发布作品', copy: '从画布直接生成可展示的项目成果。' },
      { label: '05', title: '社区反馈', copy: '通过浏览、互动和作品归档形成持续学习动力。' },
    ],
    gallery: [
      {
        src: '/assets/aigc-courses.png',
        label: '课程发现页',
        note: '深色科技视觉建立 AI 设计定位，课程方向、口碑与价格承担不同决策阶段的信息。',
      },
      {
        src: '/assets/aigc-canvas.png',
        label: '无限画布',
        note: '创作区保持低干扰；模型、比例、生成动作和积分成本集中在底部，项目管理置于顶部。',
      },
      {
        src: '/assets/aigc-works.png',
        label: '作品社区',
        note: '瀑布流让视觉内容成为第一信息，搜索、分类与推荐排序支持目的性发现。',
      },
    ],
    logic: [
      {
        title: '双产品对象',
        copy: '“课程”承载结构化知识，“作品”承载学习结果；无限画布是连接两者的生产工具。',
      },
      {
        title: '画布信息架构',
        copy: '左侧负责对象工具，底部负责生成参数，右侧负责视图控制，顶部负责项目与发布，功能按频率分区。',
      },
      {
        title: '生成成本可感知',
        copy: '模型、比例与积分消耗在生成前可见，帮助用户理解不同输出质量与成本之间的取舍。',
      },
      {
        title: '增长飞轮',
        copy: '课程带来创作者，画布提升产出，作品丰富社区内容，优质作品再反向证明课程价值。',
      },
    ],
    takeaway:
      '课程完成率用于衡量学习过程，作品完成与发布率更直接反映用户是否把学习内容用于实际创作。',
  },
  {
    id: 'ark',
    order: '03',
    status: '高保真原型',
    tag: 'AI Commerce · Multimodal',
    title: 'ARK AI 家居导购',
    subtitle: '把“我想要这样的家”翻译成商品、空间方案、报价与订单',
    summary:
      '面向有家居搭配与装修需求的用户，把自然语言需求、空间照片、商品库和生成式效果图连接起来。产品不是停在灵感图，而是把每个空间方案绑定到可购买商品、商家报价和拆分订单。',
    role: '0→1 产品定义 · 信息架构 · 原型 · 模型评测',
    period: '2026',
    accent: '#ddff63',
    heroImage: '/assets/ark-home.png',
    cardLayout: 'ui-strip',
    cardImages: [
      '/assets/ark-ui-home.png',
      '/assets/ark-ui-ai.png',
      '/assets/ark-ui-product.png',
      '/assets/ark-ui-result.png',
    ],
    facts: [
      { value: '5', label: '条核心家居 Workflow' },
      { value: '2 路', label: '文本 + 图像融合检索' },
      { value: '6 步', label: '从选品到方案确认' },
    ],
    problem: {
      kicker: '产品问题',
      title: '家居购买的真正难点，不是找到一把椅子，而是判断它放进我家是否合适。',
      copy:
        '传统电商以单品 SKU 为中心，但用户的真实任务是搭配一个空间：预算、尺寸、风格、材质和已有硬装必须一起考虑。纯生成效果图又缺少商品真实性，无法自然走向交易。',
    },
    decisions: [
      {
        no: '01',
        title: '以“方案”而非购物车为中心',
        copy: '方案同时保存效果图、空间约束、家具槽位、商品映射与报价，是贯穿生成和交易的一等对象。',
      },
      {
        no: '02',
        title: '先检索真实商品，再进行生成',
        copy: '文本/结构化召回与视觉相似度召回融合，减少“图很好看但买不到”的断层。',
      },
      {
        no: '03',
        title: '为效果图建立可信度等级',
        copy: '区分灵感示意、商品近似和严格映射，明确生成结果能承诺到什么程度。',
      },
    ],
    flow: [
      { label: '01', title: '表达需求', copy: '输入预算、风格、空间类型，或直接上传现场照片。' },
      { label: '02', title: '约束结构化', copy: '抽取品类、尺寸、材质、颜色、品牌和环保偏好。' },
      { label: '03', title: '融合检索', copy: '从生态库召回真实 SKU、空间组合与相似案例。' },
      { label: '04', title: '生成方案', copy: '基于空间与商品映射生成效果图，并保留可替换槽位。' },
      { label: '05', title: '确认报价', copy: '将方案拆为标准商品与非标定制两条报价路径。' },
      { label: '06', title: '交易履约', copy: '按商家拆分子订单，跟踪支付、物流与售后。' },
    ],
    gallery: [
      {
        src: '/assets/ark-overview-poster.png',
        label: '产品总览',
        note: '从目标用户、价值主张到核心能力，建立 ARK AI 家居导购的完整产品定义。',
        group: 'evidence',
      },
      {
        src: '/assets/ark-business-loop.png',
        label: '业务闭环',
        note: 'AI 需求理解、真实商品供给、效果图与订单履约形成从灵感到成交的完整路径。',
        group: 'evidence',
      },
      {
        src: '/assets/ark-data-flywheel.png',
        label: '数据飞轮',
        note: '搜索、替换、收藏、下单与售后信号持续反哺召回、排序和生成策略。',
        group: 'evidence',
      },
      {
        src: '/assets/ark-plan-suborders.png',
        label: '方案拆单',
        note: '以 Plan 为交易主对象，把标准商品、非标定制、商家报价与多商家子订单统一到同一履约链路。',
        group: 'evidence',
      },
      {
        src: '/assets/ark-ui-home.png',
        label: '移动端首页',
        note: '首页用需求输入和五类任务入口表达产品能做什么，让不同成熟度的家居需求都有明确起点。',
        device: 'mobile',
        group: 'ui',
      },
      {
        src: '/assets/ark-ui-ai.png',
        label: 'AI 能力中心',
        note: '生成链路和技能库并列，既支持连续 Agent 任务，也允许用户从明确技能快速进入。',
        device: 'mobile',
        group: 'ui',
      },
      {
        src: '/assets/ark-ui-product.png',
        label: '商品详情',
        note: '商品参数与“加入方案”并列，让单品决策持续归属于空间方案，而不是退化成普通购物车。',
        device: 'mobile',
        group: 'ui',
      },
      {
        src: '/assets/ark-ui-result.png',
        label: '生成结果与热点',
        note: '效果图、家具热点、匹配商品、预算和替换动作出现在同一屏，直接把视觉结果连接到商品选择。',
        device: 'mobile',
        group: 'ui',
      },
    ],
    logic: [
      {
        title: '多路召回',
        copy: '结构化关键词解决硬约束，图像向量召回解决风格相似度，再按场景动态调整融合权重。',
      },
      {
        title: '对象模型',
        copy: 'Merchant、Plan、LineItem、Quote、Order 与 SubOrder 明确分层，支持多商家和非标定制。',
      },
      {
        title: '模型选型',
        copy: '对意图准确率、JSON 合法率、工具调用、图像遵循度、延迟和成本设置离线门槛。',
      },
      {
        title: '降级策略',
        copy: '生成失败时保留已选商品和空间参数；低置信识别进入人工确认，不让用户从头再来。',
      },
    ],
    takeaway:
      'AI 电商不能只优化“生成得像不像”，还要对商品真实性、价格、履约和责任边界负责。',
  },
]

export const principles = [
  {
    no: '01',
    title: '识别值得解决的用户问题',
    copy: '结合用户研究、行为数据和业务反馈判断问题频率、痛点强度与替代方案，优先解决能显著提升体验或效率的关键任务。',
  },
  {
    no: '02',
    title: '建立可持续的商业路径',
    copy: '将产品价值映射到增长、转化、收入或降本目标，同时评估模型成本、交付复杂度和规模化条件。',
  },
  {
    no: '03',
    title: '用指标与反馈验证决策',
    copy: '围绕激活、留存、转化、质量和单位成本建立验证闭环，并根据真实用户反馈持续迭代。',
  },
]
