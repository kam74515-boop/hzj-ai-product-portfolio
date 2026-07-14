import React, { useRef, useState } from 'react'
import { ArrowRight, BookOpen, ExternalLink, Layers3, LoaderCircle, Route, Sparkles } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const aigcViews = [
  {
    id: 'course',
    label: '课程发现',
    phase: '建立目标',
    signal: '职业任务 → 学习路径',
    src: '/assets/aigc-courses.png',
    alt: 'AIGC 先锋学会课程发现页',
    icon: BookOpen,
  },
  {
    id: 'canvas',
    label: '无限画布',
    phase: '完成创作',
    signal: '素材组织 → 生成输出',
    src: '/assets/aigc-canvas.png',
    alt: 'AIGC 先锋学会无限画布',
    icon: Layers3,
  },
  {
    id: 'works',
    label: '作品社区',
    phase: '沉淀反馈',
    signal: '发布作品 → 社区反馈',
    src: '/assets/aigc-works.png',
    alt: 'AIGC 先锋学会作品社区',
    icon: Sparkles,
  },
]

const arkViews = [
  {
    id: 'skills',
    label: 'AI 能力中心',
    path: '/ai',
    kicker: '能力入口',
    detail: '用任务卡而不是模型名解释产品能为家居用户做什么。',
    signal: '任务发现',
  },
  {
    id: 'agent',
    label: 'Agent',
    path: '/ai/agent',
    kicker: '需求理解',
    detail: '通过对话补齐空间、预算、风格与已有家具等真实约束。',
    signal: '意图结构化',
  },
  {
    id: 'result',
    label: '生成结果',
    path: '/result',
    kicker: '方案生成',
    detail: '把效果图、家具热点与可购商品放在同一结果页面。',
    signal: '视觉到商品',
  },
  {
    id: 'plan',
    label: '方案确认',
    path: '/plan',
    kicker: '交易承接',
    detail: '方案继续连接预算、商品替换、报价与多商家履约。',
    signal: '方案到成交',
  },
]

function RefreshOnLoad({ setLoading }) {
  return () => {
    setLoading?.(false)
    requestAnimationFrame(() => ScrollTrigger.refresh())
  }
}

function WxEditorEmbed({ placement }) {
  const root = useRef(null)
  const [loading, setLoading] = useState(true)

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.fromTo(
      '.real-embed__viewport',
      { autoAlpha: 0, y: 20, scale: 0.995 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out' },
    )
  }, { scope: root })

  return (
    <div className={`product-demo real-embed wx-live-embed product-demo--${placement}`} ref={root}>
      <div className="real-embed__bar">
        <div>
          <span>WXEDITOR / AUTHENTICATED WORKSPACE</span>
          <strong>已登录完整编辑工作台</strong>
        </div>
        <a href="https://wxditor.chat/" target="_blank" rel="noreferrer">
          查看线上产品 <ExternalLink size={15} />
        </a>
      </div>
      <div className="wx-live-embed__desktop">
        <div className="real-embed__viewport">
          {loading && <div className="real-embed__loading"><LoaderCircle size={18} /> 正在加载已登录工作台…</div>}
          <iframe
            title="WXEditor 已登录完整编辑工作台"
            src="/wxeditor-app/index.html?embed=workbench-v2#/portfolio-editor"
            allow="clipboard-read; clipboard-write"
            onLoad={RefreshOnLoad({ setLoading })}
          />
        </div>
      </div>
      <p className="real-embed__note">作品集固定进入已登录完整工作台；三栏编辑器、素材 Dock、正文画布和 AI 助手均来自 WXEditor 前端源码，并使用本地演示数据解除登录与后端依赖。</p>
    </div>
  )
}

function ArkSourceEmbed({ placement }) {
  const root = useRef(null)
  const [activeId, setActiveId] = useState('skills')
  const [loading, setLoading] = useState(true)
  const activeView = arkViews.find((view) => view.id === activeId)
  const src = `/ark-app/index.html#${activeView.path}`

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.fromTo(
      '.ark-source-embed__frame',
      { autoAlpha: 0, y: 18, scale: 0.996 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.52, ease: 'power3.out' },
    )
  }, { scope: root, dependencies: [activeId], revertOnUpdate: true })

  const chooseView = (id) => {
    if (id === activeId) return
    setLoading(true)
    setActiveId(id)
  }

  return (
    <div className={`product-demo real-embed ark-source-embed product-demo--${placement}`} ref={root}>
      <div className="real-embed__bar">
        <div>
          <span>ARK / ORIGINAL REACT SOURCE</span>
          <strong>四个真实产品视图</strong>
        </div>
        <span className="real-embed__status"><i /> 源码构建</span>
      </div>
      <div className="ark-source-embed__showcase">
        <aside className="ark-source-embed__rail">
          <div className="ark-source-embed__rail-intro">
            <span>MINI PROGRAM JOURNEY</span>
            <h3>把一次家居需求，推进到可确认的空间方案。</h3>
            <p>右侧直接运行 ARK 原 React 项目；左侧按小程序任务链切换真实页面。</p>
          </div>
          <div className="ark-source-embed__tabs" role="tablist" aria-label="ARK 原源码视图">
            {arkViews.map((view, index) => (
              <button
                key={view.id}
                type="button"
                role="tab"
                aria-selected={activeId === view.id}
                className={activeId === view.id ? 'is-active' : ''}
                onClick={() => chooseView(view.id)}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <strong>{view.label}</strong>
                  <small>{view.signal}</small>
                </div>
              </button>
            ))}
          </div>
          <div className="ark-source-embed__active-copy" aria-live="polite">
            <span>{activeView.kicker}</span>
            <p>{activeView.detail}</p>
          </div>
        </aside>
        <div className="ark-source-embed__device-stage">
          <div className="ark-device" aria-label={`ARK 小程序 · ${activeView.label}`}>
            <div className="real-embed__viewport ark-source-embed__frame">
              {loading && <div className="real-embed__loading"><LoaderCircle size={18} /> 正在加载 ARK 原项目…</div>}
              <iframe
                key={activeId}
                title={`ARK ${activeView.label}原源码视图`}
                src={src}
                onLoad={RefreshOnLoad({ setLoading })}
              />
            </div>
          </div>
        </div>
      </div>
      <p className="real-embed__note">保留小程序内容比例与克制的胶囊设备提示；页面、数据和内部路由均来自 ARK 原 React 项目。</p>
    </div>
  )
}

function AigcEvidenceTour({ placement }) {
  const root = useRef(null)
  const [activeId, setActiveId] = useState('course')
  const activeView = aigcViews.find((view) => view.id === activeId)

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.fromTo(
      '.aigc-tour__image',
      { autoAlpha: 0, y: 16, scale: 0.992 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.55, ease: 'power3.out' },
    )
  }, { scope: root, dependencies: [activeId], revertOnUpdate: true })

  return (
    <div className={`product-demo aigc-tour product-demo--${placement}`} ref={root}>
      <div className="product-demo__topline">
        <div>
          <span>PRODUCT UI</span>
          <strong>课程、画布与作品页面</strong>
        </div>
        <a href="https://aigcdesign.art/" target="_blank" rel="noreferrer">访问线上产品 <ArrowRight size={14} /></a>
      </div>
      <div className="aigc-tour__showcase">
        <div className="aigc-tour__journey" role="tablist" aria-label="学习到作品的产品闭环">
          <div className="aigc-tour__journey-intro">
            <Route size={18} />
            <span>COURSE → CANVAS → WORK</span>
            <h3>课程学习、画布创作与作品发布</h3>
          </div>
          {aigcViews.map((view, index) => {
            const Icon = view.icon
            return (
              <button
                key={view.id}
                type="button"
                role="tab"
                aria-selected={activeId === view.id}
                className={activeId === view.id ? 'is-active' : ''}
                onClick={() => setActiveId(view.id)}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <Icon size={17} />
                <div>
                  <strong>{view.phase}</strong>
                  <small>{view.label}</small>
                </div>
              </button>
            )
          })}
        </div>
        <div className="aigc-tour__stage">
          <div className="aigc-tour__stage-meta">
            <span>{activeView.phase}</span>
            <strong>{activeView.signal}</strong>
          </div>
          <div className="aigc-tour__viewport">
            <img className="aigc-tour__image" src={activeView.src} alt={activeView.alt} onLoad={() => ScrollTrigger.refresh()} />
          </div>
        </div>
      </div>
      <p>课程页、无限画布与作品社区组成完整的学习和创作路径。</p>
    </div>
  )
}

export default function ProductDemo({ projectId, placement = 'section' }) {
  if (projectId === 'wxeditor') return <WxEditorEmbed placement={placement} />
  if (projectId === 'ark') return <ArkSourceEmbed placement={placement} />
  if (projectId === 'aigc-education') return <AigcEvidenceTour placement={placement} />
  return null
}
