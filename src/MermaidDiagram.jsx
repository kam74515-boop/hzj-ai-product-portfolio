import React, { useEffect, useId, useRef, useState } from 'react'
import { Minus, Plus, RotateCcw } from 'lucide-react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let mermaidPromise

function loadMermaid() {
  if (!mermaidPromise) {
    mermaidPromise = import('mermaid').then(({ default: mermaid }) => {
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'strict',
      })
      return mermaid
    })
  }
  return mermaidPromise
}

export default function MermaidDiagram({ chart, accent, title }) {
  const root = useRef(null)
  const reactId = useId().replace(/[^a-zA-Z0-9-]/g, '')
  const [svg, setSvg] = useState('')
  const [error, setError] = useState('')
  const [zoom, setZoom] = useState(1)

  useEffect(() => setZoom(1), [chart])

  useEffect(() => {
    let cancelled = false
    const renderId = `portfolio-diagram-${reactId}-${Date.now()}`
    const config = {
      theme: 'base',
      themeVariables: {
        darkMode: true,
        background: '#0d0f14',
        primaryColor: '#111319',
        primaryTextColor: '#f4f5f7',
        primaryBorderColor: accent,
        secondaryColor: '#161922',
        secondaryTextColor: '#f4f5f7',
        secondaryBorderColor: '#444955',
        tertiaryColor: '#0d0f14',
        tertiaryTextColor: '#f4f5f7',
        tertiaryBorderColor: '#333743',
        lineColor: accent,
        edgeLabelBackground: '#08090c',
        clusterBkg: '#0d0f14',
        clusterBorder: '#333743',
        fontFamily: 'Inter, PingFang SC, Microsoft YaHei, sans-serif',
        fontSize: '16px',
      },
      flowchart: {
        curve: 'linear',
        htmlLabels: true,
        nodeSpacing: 42,
        rankSpacing: 48,
        padding: 14,
      },
    }

    const source = `%%{init: ${JSON.stringify(config)}}%%\n${chart}`

    loadMermaid()
      .then((mermaid) => mermaid.render(renderId, source))
      .then(({ svg: renderedSvg }) => {
        if (cancelled) return
        setSvg(renderedSvg)
        setError('')
        requestAnimationFrame(() => ScrollTrigger.refresh())
      })
      .catch((renderError) => {
        if (cancelled) return
        setError(renderError instanceof Error ? renderError.message : '流程图加载失败')
      })

    return () => {
      cancelled = true
    }
  }, [accent, chart, reactId])

  useEffect(() => {
    if (!svg || !root.current || typeof ResizeObserver === 'undefined') return undefined
    const observer = new ResizeObserver(() => ScrollTrigger.refresh())
    observer.observe(root.current)
    return () => observer.disconnect()
  }, [svg])

  const adjustZoom = (nextZoom) => {
    setZoom(Math.min(1.6, Math.max(0.7, Number(nextZoom.toFixed(1)))))
  }

  return (
    <div className="diagram" ref={root} aria-label={`${title}流程图`}>
      <div className="diagram__toolbar">
        <span>可缩放流程图</span>
        <div>
          <button type="button" aria-label="缩小流程图" onClick={() => adjustZoom(zoom - 0.1)}>
            <Minus size={16} />
          </button>
          <output aria-label="流程图缩放比例">{Math.round(zoom * 100)}%</output>
          <button type="button" aria-label="放大流程图" onClick={() => adjustZoom(zoom + 0.1)}>
            <Plus size={16} />
          </button>
          <button type="button" aria-label="恢复流程图缩放" onClick={() => setZoom(1)}>
            <RotateCcw size={15} />
          </button>
        </div>
      </div>
      <div className="diagram__viewport">
        {error ? (
          <p className="diagram__error">{error}</p>
        ) : svg ? (
          <div
            className="diagram__svg"
            style={{ '--diagram-zoom': zoom }}
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        ) : (
          <p className="diagram__loading">正在绘制产品链路…</p>
        )}
      </div>
    </div>
  )
}
