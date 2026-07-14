import React, { useEffect, useMemo, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Github,
  Mail,
  Maximize2,
  Menu,
  X,
} from 'lucide-react'
import { principles, projects } from './data'
import { caseStudyDetails } from './caseStudyDetails'
import MermaidDiagram from './MermaidDiagram'
import PageMotion from './PageMotion'
import ProductDemo from './ProductDemos'

const EMAIL = 'karlD574515@gmail.com'

function useRoute() {
  const [hash, setHash] = useState(window.location.hash)

  useEffect(() => {
    const onChange = () => {
      setHash(window.location.hash)
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  const match = hash.match(/^#\/case\/([^/]+)/)
  return match ? { type: 'case', id: match[1] } : { type: 'home' }
}

function Brand() {
  return (
    <a className="brand" href="#/" aria-label="Karl AI 产品作品集首页">
      <span className="brand__mark">K</span>
      <span>KARL</span>
      <i>AI PM</i>
    </a>
  )
}

function Header({ detail = false }) {
  const [open, setOpen] = useState(false)

  useEffect(() => setOpen(false), [detail])

  return (
    <header className="topbar">
      <Brand />
      <button
        className="menu-button"
        type="button"
        aria-label={open ? '关闭导航' : '打开导航'}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
      <nav className={open ? 'nav nav--open' : 'nav'} aria-label="主导航">
        {detail ? (
          <a href="#/" className="nav__back">
            <ArrowLeft size={16} /> 返回全部案例
          </a>
        ) : (
          <>
            <a href="#cases">案例</a>
            <a href="#method">方法</a>
            <a href="#about">关于</a>
          </>
        )}
        <a className="nav__cta" href={`mailto:${EMAIL}`}>
          联系我 <ArrowUpRight size={15} />
        </a>
      </nav>
    </header>
  )
}

function Pill({ children }) {
  return <span className="pill">{children}</span>
}

function ProjectCard({ project, featured = false }) {
  const className = [
    'project-card',
    `project-card--${project.id}`,
    project.cardLayout ? `project-card--${project.cardLayout}` : '',
    featured ? 'project-card--featured' : '',
    'motion-reveal',
  ].filter(Boolean).join(' ')

  return (
    <a
      className={className}
      href={`#/case/${project.id}`}
      style={{ '--project-accent': project.accent }}
    >
      <div className="project-card__media">
        {project.cardImages ? (
          <div className="project-card__media-strip" aria-label={`${project.title} 四个关键产品页面`}>
            {project.cardImages.map((src, index) => (
              <img
                key={src}
                className="project-card__media-shot"
                src={src}
                alt={`${project.title} 产品界面 ${index + 1}`}
                loading="lazy"
              />
            ))}
          </div>
        ) : (
          <img className="project-card__media-main" src={project.cardImage || project.heroImage} alt={`${project.title} 产品界面`} loading="lazy" />
        )}
        <span className="project-card__status"><i /> {project.status}</span>
      </div>
      <div className="project-card__body">
        <div className="project-card__meta">
          <span>{project.order}</span>
          <span>{project.tag}</span>
        </div>
        <h3>{project.title}</h3>
        <p>{project.subtitle}</p>
        <span className="project-card__link">
          查看完整案例 <ArrowRight size={18} />
        </span>
      </div>
    </a>
  )
}

function Home() {
  return (
    <>
      <Header />
      <main>
        <section className="hero home-shell">
          <div className="hero__copy motion-hero">
            <Pill>AI PRODUCT MANAGER · 2026</Pill>
            <h1>
              把不确定的模型能力，
              <em>做成用户敢用的产品。</em>
            </h1>
            <p>
              我是 Karl，关注 AI 应用的最后一公里：从用户问题、产品逻辑与 UI，
              到 Agent、评测、商业闭环和真正上线。
            </p>
            <div className="hero__actions">
              <a className="button button--primary" href="#cases">
                查看产品案例 <ArrowRight size={18} />
              </a>
              <a className="button button--ghost" href={`mailto:${EMAIL}`}>
                <Mail size={17} /> {EMAIL}
              </a>
            </div>
          </div>
          <div className="hero__visual motion-hero-media" aria-label="三个产品界面预览">
            <div className="hero-shot hero-shot--back">
              <img src="/assets/aigc-canvas.png" alt="AIGC 无限画布" />
            </div>
            <div className="hero-shot hero-shot--side">
              <img src="/assets/ark-ui-home.png" alt="ARK AI 家居导购小程序首页" />
            </div>
            <div className="hero-shot hero-shot--front">
              <div className="hero-shot__bar">
                <span /><span /><span />
                <small>wxditor.chat</small>
              </div>
              <img src="/assets/wxeditor-workbench.png" alt="WXEditor 工作台" />
            </div>
          </div>
        </section>

        <section className="proof home-shell motion-reveal" aria-label="作品集概览">
          <div><strong>03</strong><span>个端到端产品案例</span></div>
          <div><strong>02</strong><span>个已上线产品</span></div>
          <div><strong>01</strong><span>套高保真商业原型</span></div>
          <p>从需求定义到界面、Agent、评测与商业化</p>
        </section>

        <section className="section home-shell" id="cases">
          <div className="section-heading motion-reveal">
            <div>
              <Pill>SELECTED CASES</Pill>
              <h2>不是功能清单，<br />是三条完整的产品逻辑。</h2>
            </div>
            <p>
              每个案例都回答同一组问题：用户为什么需要它、AI 在哪里创造价值、
              出错时如何控制，以及产品如何到达真实业务终点。
            </p>
          </div>
          <div className="project-grid">
            <ProjectCard project={projects[0]} featured />
            <ProjectCard project={projects[1]} />
            <ProjectCard project={projects[2]} />
          </div>
        </section>

        <section className="method" id="method">
          <div className="home-shell">
            <div className="section-heading section-heading--light motion-reveal">
              <div>
                <Pill>PRODUCT PRACTICE</Pill>
                <h2>以用户价值定义产品，<br />用商业结果验证决策。</h2>
              </div>
              <p>我从用户场景和业务目标共同定义问题，评估 AI 能力、成本与风险，再通过产品机制、数据指标和持续迭代推进落地。</p>
            </div>
            <div className="principle-grid">
              {principles.map((item) => (
                <article key={item.no} className="motion-reveal">
                  <span>{item.no}</span>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about home-shell" id="about">
          <div className="about__copy motion-reveal">
            <Pill>ABOUT KARL</Pill>
            <h2>能定义产品，也愿意把原型真正跑起来。</h2>
            <p>
              我的工作横跨产品策略、用户流程、交互原型、AI 能力设计与工程落地。
              我更相信能被操作、被测试、被用户指出问题的产品，而不是停在演示稿里的概念。
            </p>
          </div>
          <div className="about__skills motion-reveal">
            {['AI 产品策略', 'Agent 与工作流', 'RAG / 检索设计', '模型评测', '交互原型', '商业化设计'].map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

function Gallery({ items, projectId }) {
  const [active, setActive] = useState(null)
  const summaryCopy = projectId === 'ark'
    ? '先看商业与系统证据，再看四张真实小程序 UI；点击任一界面查看原尺寸细节。'
    : projectId === 'wxeditor'
      ? '从桌面工作台、官网到公众号侧边扩展，按 Web 产品触点展开。'
      : '按课程发现、画布创作与作品反馈三段闭环展开真实页面。'
  const groups = projectId === 'ark'
    ? [
        {
          id: 'evidence',
          label: '产品与商业逻辑',
          copy: '产品总览、业务闭环、数据飞轮与方案拆单，均按原始宽高比呈现。',
          items: items.filter((item) => item.group === 'evidence'),
        },
        {
          id: 'ui',
          label: '原产品 UI',
          copy: '首页、AI 能力中心、商品详情与生成结果，统一按 375:812 比例铺满展示。',
          items: items.filter((item) => item.group === 'ui'),
        },
      ]
    : [{ id: 'all', label: null, copy: null, items }]

  useEffect(() => {
    if (!active) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setActive(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [active])

  return (
    <div className={`gallery gallery--${projectId}`} aria-label="产品 UI 页面全景">
      <div className="gallery__summary">
        <span>{String(items.length).padStart(2, '0')} SCREENS</span>
        <p>{summaryCopy}</p>
      </div>

      {groups.map((group) => (
        <section key={group.id} className={`gallery__group gallery__group--${group.id}`}>
          {group.label && (
            <div className="gallery__group-heading motion-reveal">
              <h3>{group.label}</h3>
              <p>{group.copy}</p>
            </div>
          )}
          <div className={`gallery__atlas gallery__atlas--${group.id}`}>
            {group.items.map((item, itemIndex) => (
              <figure
                key={item.src}
                className={item.device === 'mobile' ? 'gallery__card gallery__card--mobile motion-reveal' : 'gallery__card motion-reveal'}
              >
                <button
                  type="button"
                  className="gallery__image"
                  onClick={() => setActive(item)}
                  aria-label={`放大查看：${item.label}`}
                  aria-haspopup="dialog"
                >
                  <img src={item.src} alt={item.label} loading="lazy" />
                  <span><Maximize2 size={16} /> 查看大图</span>
                </button>
                <figcaption>
                  <span>{String(itemIndex + 1).padStart(2, '0')}</span>
                  <div>
                    <strong>{item.label}</strong>
                    <p>{item.note}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      ))}

      {active && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={active.label}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActive(null)
          }}
        >
          <div className={active.device === 'mobile' ? 'lightbox__panel lightbox__panel--mobile' : 'lightbox__panel'}>
            <button type="button" className="lightbox__close" onClick={() => setActive(null)} aria-label="关闭大图">
              <X size={20} />
            </button>
            <img src={active.src} alt={active.label} />
            <div>
              <strong>{active.label}</strong>
              <p>{active.note}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function CaseBrief({ detail }) {
  return (
    <div>
      <div className="case-section__heading motion-reveal">
        <Pill>PROJECT BRIEF</Pill>
        <h2>先把产品命题说完整。</h2>
      </div>
      <div className="case-narrative motion-reveal">
        {detail.narrative.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
      <div className="brief-grid">
        {detail.brief.map((item) => (
          <article key={item.label} className="motion-reveal">
            <span>{item.label}</span>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </article>
        ))}
      </div>
      <div className="scope-board motion-reveal">
        <div>
          <span>IN SCOPE</span>
          <ul>{detail.scope.in.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <div>
          <span>NOT IN SCOPE</span>
          <ul>{detail.scope.out.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </div>
      <p className="evidence-note motion-reveal">{detail.evidence}</p>
    </div>
  )
}

function JourneyMatrix({ rows }) {
  return (
    <div className="journey-matrix motion-reveal">
      <div className="journey-matrix__head" aria-hidden="true">
        <span>阶段</span>
        <span>用户状态</span>
        <span>主要阻力</span>
        <span>产品响应</span>
        <span>验证信号</span>
      </div>
      {rows.map((row) => (
        <article key={row.stage}>
          <strong>{row.stage}</strong>
          <p data-label="用户状态">{row.user}</p>
          <p data-label="主要阻力">{row.friction}</p>
          <p data-label="产品响应">{row.design}</p>
          <span data-label="验证信号">{row.signal}</span>
        </article>
      ))}
    </div>
  )
}

function DiagramFeature({ diagram, accent }) {
  return (
    <article className="diagram-feature motion-reveal">
      <header>
        <span>{diagram.eyebrow}</span>
        <h3>{diagram.title}</h3>
        <p>{diagram.description}</p>
      </header>
      <MermaidDiagram chart={diagram.chart} accent={accent} title={diagram.title} />
    </article>
  )
}

function MeasurementGrid({ items }) {
  return (
    <div className="measurement-grid">
      {items.map((item) => (
        <article key={item.name} className="motion-reveal">
          <span>{item.type}</span>
          <h3>{item.name}</h3>
          <p>{item.copy}</p>
        </article>
      ))}
    </div>
  )
}

const casePresentation = {
  wxeditor: {
    flowTitle: <>把写作意图推进到<br />可发布的公众号草稿。</>,
    decisionTitle: <>围绕文档控制权，<br />确定 Agent 的产品边界。</>,
    atlasTitle: <>用桌面产品的真实宽度，<br />展开编辑、协作与发布触点。</>,
    systemTitle: <>Agent 如何安全地进入文档工作流。</>,
    metricTitle: <>内容生产效率之外，<br />同时验证质量与可控性。</>,
  },
  'aigc-education': {
    flowTitle: <>课程学习、画布创作<br />与作品发布流程。</>,
    decisionTitle: <>课程、创作工具与社区<br />的产品设计要点。</>,
    atlasTitle: <>课程页、无限画布<br />与作品社区页面。</>,
    systemTitle: <>课程、画布、作品与作者资产的对象关系。</>,
    metricTitle: <>学习、创作<br />与作品发布指标。</>,
  },
  ark: {
    flowTitle: <>沿着小程序任务流，<br />从需求走到方案确认。</>,
    decisionTitle: <>让手机里的每一步，<br />都继续连接真实交易。</>,
    atlasTitle: <>先看小程序 UI，<br />再看它如何连接商业闭环。</>,
    systemTitle: <>从小程序交互到检索、生成与履约。</>,
    metricTitle: <>既验证生成体验，<br />也验证商品与交易结果。</>,
  },
}

function CasePage({ project }) {
  const detail = caseStudyDetails[project.id]
  const presentation = casePresentation[project.id]
  const hasInteractiveDemo = detail.demo.enabled
  const hasHeroInteraction = hasInteractiveDemo || project.id === 'aigc-education'
  const liveLabel = project.id === 'wxeditor'
    ? 'AUTHENTICATED WORKSPACE / SOURCE'
    : project.id === 'ark'
      ? 'ORIGINAL SOURCE / INTERACTIVE'
      : 'PRODUCT UI / THREE SURFACES'
  const liveDescription = project.id === 'wxeditor'
    ? '直接进入已登录完整工作台，体验素材、正文与 AI 协作链路'
    : project.id === 'ark'
      ? '切换真实源码页面，体验 AI 到方案链路'
      : '课程发现、画布创作与作品发布'
  const sectionIndex = detail.demo.enabled
    ? { atlas: '06', system: '07', measurement: '08' }
    : { atlas: '05', system: '06', measurement: '07' }
  const evidenceRecap = project.id === 'wxeditor'
    ? {
        eyebrow: 'AUTHENTICATED WORKSPACE ABOVE THE FOLD',
        title: '已登录编辑工作台已前置到案例首屏。',
        copy: '首屏直接运行 WXEditor 前端源码中的完整编辑工作台，跳过登录和注册；素材 Dock、正文画布、块级编辑、拖拽、撤销与 AI 助手均保持可交互。',
        link: '回到已登录工作台',
      }
    : {
        eyebrow: 'ORIGINAL SOURCE EMBEDDED ABOVE THE FOLD',
        title: 'ARK 原项目代码已前置到案例首屏。',
        copy: '案例直接加载 ARK React 原项目的 AI 能力中心、Agent、生成结果和方案确认视图，内部路由与产品交互保持可用。',
        link: '回到源码界面',
      }

  return (
    <>
      <Header detail />
      <main className={`case case--${project.id}`} style={{ '--project-accent': project.accent }}>
        <section className="case-hero case-shell">
          <div className="case-hero__intro">
            <div className="case-hero__meta motion-hero">
              <Pill>{project.tag}</Pill>
              <span>{project.status}</span>
            </div>
            <h1 className="motion-hero">{project.title}</h1>
            <p className="case-hero__subtitle motion-hero">{project.subtitle}</p>
            <div className="case-hero__info motion-hero">
              <div><span>我的角色</span><strong>{project.role}</strong></div>
              <div><span>项目时间</span><strong>{project.period}</strong></div>
              <div><span>产品状态</span><strong>{project.status}</strong></div>
            </div>
          </div>
          <div
            id={hasHeroInteraction ? 'interactive-demo' : undefined}
            className={hasHeroInteraction ? 'case-hero__experience motion-hero-media' : 'case-hero__media motion-hero-media'}
          >
            {hasHeroInteraction ? (
              <>
                <div className="case-hero__experience-label">
                  <span>{liveLabel}</span>
                  <strong>{liveDescription}</strong>
                </div>
                <ProductDemo projectId={project.id} placement="hero" />
              </>
            ) : (
              <>
                <img src={project.heroImage} alt={`${project.title} 产品界面`} />
                {project.url && (
                  <a href={project.url} target="_blank" rel="noreferrer">
                    访问线上产品 <ArrowUpRight size={17} />
                  </a>
                )}
              </>
            )}
          </div>
          <div className="case-facts motion-reveal">
            {project.facts.map((fact) => (
              <div key={fact.label}>
                <strong>{fact.value}</strong>
                <span>{fact.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="case-section case-shell">
          <div className="case-index">01 / CONTEXT</div>
          <CaseBrief detail={detail} />
        </section>

        <section className="case-section case-shell case-problem">
          <div className="case-index">02 / USER PROBLEM</div>
          <div>
            <div className="motion-reveal">
              <Pill>{project.problem.kicker}</Pill>
              <h2>{project.problem.title}</h2>
              <p>{project.problem.copy}</p>
            </div>
            <div className="case-subheading motion-reveal">
              <span>USER JOURNEY MATRIX</span>
              <h3>按阶段拆开用户状态、阻力、产品响应与验证信号。</h3>
            </div>
            <JourneyMatrix rows={detail.journey} />
          </div>
        </section>

        <section className="case-section case-shell">
          <div className="case-index">03 / PRODUCT FLOW</div>
          <div>
            <div className="case-section__heading motion-reveal">
              <Pill>END-TO-END FLOW</Pill>
              <h2>{presentation.flowTitle}</h2>
            </div>
            <DiagramFeature diagram={detail.diagrams[0]} accent={project.accent} />
            <div className="flow-list motion-reveal">
              {project.flow.map((step) => (
                <article key={step.label}>
                  <span>{step.label}</span>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="case-section case-shell">
          <div className="case-index">04 / DECISIONS</div>
          <div>
            <div className="case-section__heading motion-reveal">
              <Pill>KEY PRODUCT DECISIONS</Pill>
              <h2>{presentation.decisionTitle}</h2>
            </div>
            <div className="decision-grid">
              {project.decisions.map((decision) => (
                <article key={decision.no} className="motion-reveal">
                  <span>{decision.no}</span>
                  <h3>{decision.title}</h3>
                  <p>{decision.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {detail.demo.enabled && (
          <section className="case-demo">
            <div className="case-shell case-demo__inner">
              <div className="case-index">05 / PRODUCT EVIDENCE</div>
              <div>
                <div className="case-section__heading motion-reveal">
                  <Pill>{detail.demo.label}</Pill>
                  <h2>{detail.demo.title}</h2>
                  <p className="case-section__intro">{detail.demo.copy}</p>
                </div>
                <div className="demo-recap motion-reveal">
                  <span>{evidenceRecap.eyebrow}</span>
                  <strong>{evidenceRecap.title}</strong>
                  <p>{evidenceRecap.copy}</p>
                  <a href="#interactive-demo">{evidenceRecap.link} <ArrowUpRight size={16} /></a>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="case-section case-shell">
          <div className="case-index">{sectionIndex.atlas} / UI ATLAS</div>
          <div>
            <div className="case-section__heading motion-reveal">
              <Pill>UI & INTERACTION</Pill>
              <h2>{presentation.atlasTitle}</h2>
            </div>
            <Gallery items={project.gallery} projectId={project.id} />
          </div>
        </section>

        <section className="case-logic">
          <div className="case-shell case-logic__inner">
            <div className="case-index">{sectionIndex.system} / SYSTEM</div>
            <div>
              <div className="case-section__heading motion-reveal">
                <Pill>PRODUCT LOGIC</Pill>
                <h2>{presentation.systemTitle}</h2>
              </div>
              <DiagramFeature diagram={detail.diagrams[1]} accent={project.accent} />
              {detail.agentFramework && (
                <div className="agent-framework">
                  <div className="case-subheading motion-reveal">
                    <span>AGENT FRAMEWORK</span>
                    <h3>{project.id === 'ark'
                      ? '按任务选择模型，并通过 Agent 状态、工具调用与护栏完成方案生成。'
                      : '把上下文、规划、工具、护栏与评测放进同一套执行框架。'}
                    </h3>
                  </div>
                  <DiagramFeature diagram={detail.agentFramework} accent={project.accent} />
                </div>
              )}
              <div className="logic-grid">
                {project.logic.map((item, index) => (
                  <article key={item.title} className="motion-reveal">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="case-section case-shell">
          <div className="case-index">{sectionIndex.measurement} / MEASUREMENT</div>
          <div>
            <div className="case-section__heading motion-reveal">
              <Pill>SUCCESS & GUARDRAILS</Pill>
              <h2>{presentation.metricTitle}</h2>
              <p className="case-section__intro">区分已观察事实、PRD 定义与建议验证口径，不把目标阈值包装成线上成绩。</p>
            </div>
            <MeasurementGrid items={detail.measurement} />
          </div>
        </section>

        <section className="takeaway case-shell motion-reveal">
          <span>产品复盘</span>
          <blockquote>“{project.takeaway}”</blockquote>
          <div className="takeaway__actions">
            <a href="#/" className="button button--ghost">
              <ArrowLeft size={17} /> 返回全部案例
            </a>
            {project.url && (
              <a href={project.url} target="_blank" rel="noreferrer" className="button button--primary">
                访问线上产品 <ArrowUpRight size={17} />
              </a>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div>
        <Brand />
        <p>让 AI 不只惊艳一次，而是持续解决真实问题。</p>
      </div>
      <div className="footer__links">
        <a href={`mailto:${EMAIL}`}><Mail size={17} /> Email</a>
        <a href="https://github.com/kam74515-boop" target="_blank" rel="noreferrer"><Github size={17} /> GitHub</a>
      </div>
      <small>© 2026 Karl · AI Product Portfolio</small>
    </footer>
  )
}

export default function App() {
  const route = useRoute()
  const project = useMemo(
    () => (route.type === 'case' ? projects.find((item) => item.id === route.id) : null),
    [route],
  )

  if (route.type === 'case' && project) {
    return (
      <PageMotion key={`case-${project.id}`} variant="case">
        <CasePage project={project} />
      </PageMotion>
    )
  }

  return (
    <PageMotion key="home" variant="home">
      <Home />
    </PageMotion>
  )
}
