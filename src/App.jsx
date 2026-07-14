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
              以用户和业务需求为起点，
              <em>设计可实施的 AI 产品。</em>
            </h1>
            <p>
              我是 Karl，负责 AI 产品的需求分析、方案设计与落地，
              工作涵盖交互、Agent、模型评测、商业化与上线协同。
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
          <div><strong>03</strong><span>个 AI 产品案例</span></div>
          <div><strong>02</strong><span>个上线产品</span></div>
          <div><strong>01</strong><span>个产品设计方案</span></div>
          <p>覆盖需求分析、产品设计、Agent 方案、评测与商业化</p>
        </section>

        <section className="section home-shell" id="cases">
          <div className="section-heading motion-reveal">
            <div>
              <Pill>SELECTED CASES</Pill>
              <h2>三个产品案例，<br />分别说明问题、方案与验证。</h2>
            </div>
            <p>
              案例包含用户场景、业务目标、核心方案、AI 能力边界、
              系统设计和验证指标。
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
                <h2>兼顾用户需求、商业目标<br />与技术可行性。</h2>
              </div>
              <p>从用户场景和业务目标定义问题，结合 AI 能力、成本与风险制定方案，并通过指标和用户反馈验证。</p>
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
            <h2>产品策略、交互设计与 AI 技术方案。</h2>
            <p>
              工作范围包括需求分析、用户流程、交互原型、Agent 与检索方案、模型评测及商业化设计。
              根据项目阶段与研发协作推进实现和验证。
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
    ? '包含产品与商业逻辑，以及四个小程序界面；点击可查看原尺寸。'
    : projectId === 'wxeditor'
      ? '包含桌面工作台、产品官网和公众号侧边扩展三个产品触点。'
      : '包含课程发现、画布创作和作品发布三个页面。'
  const groups = projectId === 'ark'
    ? [
        {
          id: 'evidence',
          label: '产品与商业逻辑',
          copy: '包含产品总览、业务流程、数据反馈机制与方案拆单。',
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
        <h2>项目背景、目标与范围。</h2>
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

function ModelEvaluation({ evaluation }) {
  return (
    <div className="model-eval">
      <div className="model-eval__meta">
        {evaluation.meta.map((item) => (
          <article key={item.label} className="motion-reveal">
            <strong>{item.value}</strong>
            <span>{item.label}</span>
            <p>{item.copy}</p>
          </article>
        ))}
      </div>

      <div className="model-eval__table-wrap motion-reveal">
        <table className="model-eval__table">
          <thead>
            <tr>
              <th>模型</th>
              <th>选题</th>
              <th>文风</th>
              <th>合规</th>
              <th>总采纳率</th>
              <th>硬门槛</th>
              <th>Judge / 5</th>
              <th>平均延时</th>
              <th>失败</th>
            </tr>
          </thead>
          <tbody>
            {evaluation.rows.map((row) => (
              <tr key={row.model} className={row.recommended ? 'is-recommended' : undefined}>
                <th scope="row">
                  {row.model}
                  {row.recommended && <span>质量优先</span>}
                </th>
                <td>{row.topic}</td>
                <td>{row.style}</td>
                <td>{row.compliance}</td>
                <td><strong>{row.accepted}</strong></td>
                <td>{row.hardGate}</td>
                <td>{row.judge}</td>
                <td>{row.latency}</td>
                <td>{row.failures}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="model-eval__note motion-reveal">{evaluation.note}</p>

      <div className="model-eval__findings">
        {evaluation.findings.map((item) => (
          <article key={item.label} className="motion-reveal">
            <span>{item.label}</span>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

const casePresentation = {
  wxeditor: {
    flowTitle: <>把写作意图推进到<br />可发布的公众号草稿。</>,
    decisionTitle: <>围绕文档控制权，<br />确定 Agent 的产品边界。</>,
    atlasTitle: <>编辑、协作<br />与发布界面。</>,
    systemTitle: <>文档工作流中的 Agent 执行框架。</>,
    metricTitle: <>内容效率、质量<br />与可控性指标。</>,
  },
  'aigc-education': {
    flowTitle: <>课程学习、画布创作<br />与作品发布流程。</>,
    decisionTitle: <>课程、创作工具与社区<br />的产品设计要点。</>,
    atlasTitle: <>课程页、无限画布<br />与作品社区页面。</>,
    systemTitle: <>课程、画布、作品与作者资产的对象关系。</>,
    metricTitle: <>学习、创作<br />与作品发布指标。</>,
  },
  ark: {
    flowTitle: <>从需求输入到方案确认<br />的任务流程。</>,
    decisionTitle: <>移动端交互<br />与交易流程的衔接。</>,
    atlasTitle: <>小程序界面<br />与业务结构。</>,
    systemTitle: <>需求理解、检索、生成与履约系统。</>,
    metricTitle: <>生成质量、商品匹配<br />与交易指标。</>,
  },
}

function CasePage({ project }) {
  const detail = caseStudyDetails[project.id]
  const presentation = casePresentation[project.id]
  const hasInteractiveDemo = detail.demo.enabled
  const hasHeroInteraction = hasInteractiveDemo || project.id === 'aigc-education'
  const liveLabel = project.id === 'wxeditor'
    ? 'PRODUCT WORKSPACE'
    : project.id === 'ark'
      ? 'INTERACTIVE PRODUCT UI'
      : 'PRODUCT UI / THREE SURFACES'
  const liveDescription = project.id === 'wxeditor'
    ? '已登录编辑工作台：素材、正文编辑与 AI 协作'
    : project.id === 'ark'
      ? '切换 AI 能力、Agent、生成结果与方案确认页面'
      : '课程发现、画布创作与作品发布'
  const sectionIndex = detail.evaluation
    ? { atlas: '05', system: '06', evaluation: '07', measurement: '08' }
    : { atlas: '05', system: '06', measurement: '07' }

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

        {detail.evaluation && (
          <section className="case-section case-shell case-evaluation">
            <div className="case-index">{sectionIndex.evaluation} / MODEL EVALUATION</div>
            <div>
              <div className="case-section__heading motion-reveal">
                <Pill>MODEL EVALUATION</Pill>
                <h2>{detail.evaluation.title}</h2>
                <p className="case-section__intro">{detail.evaluation.intro}</p>
              </div>
              <ModelEvaluation evaluation={detail.evaluation} />
            </div>
          </section>
        )}

        <section className="case-section case-shell">
          <div className="case-index">{sectionIndex.measurement} / MEASUREMENT</div>
          <div>
            <div className="case-section__heading motion-reveal">
              <Pill>SUCCESS & GUARDRAILS</Pill>
              <h2>{presentation.metricTitle}</h2>
              <p className="case-section__intro">指标区分现状、产品目标和建议验证口径；未实测数据均标注为目标值。</p>
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
        <p>AI 产品经理作品集：内容创作、教育与家居导购。</p>
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
