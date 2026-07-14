import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const arkRoot = '/Users/karl/apps/ark Mini program/web'

const embedCss = `
/* Portfolio embed mode: preserve the original mini-program UI inside the portfolio device frame. */
html, body, #root { width: 100%; min-width: 0; min-height: 100%; margin: 0; }
body { overflow-x: hidden; background: #f7f7fb; }
.global-fab-wrapper { display: none !important; }
.app-shell, .phone-frame { width: 100% !important; max-width: none !important; min-height: 100vh !important; margin: 0 !important; border-radius: 0 !important; box-shadow: none !important; }
.phone-frame { overflow-x: hidden !important; }
.phone-frame--tab { padding-bottom: 94px !important; }
.global-top-bar { top: 54px !important; width: calc(100% - 24px) !important; max-width: 430px !important; height: 32px !important; padding: 0 !important; }
.ai-panel--skills .page__content, .ai-panel--agent .agent-chat-area, .page > .page__content { width: 100%; margin-inline: auto; padding-left: 18px; padding-right: 18px; }
.ai-panel--skills .page__content, .ai-panel--agent .agent-chat-area { padding-top: 94px !important; }
.ai-panel--agent .agent-chat-area { min-height: 100vh; }
.agent-skills-grid { display: grid !important; grid-template-columns: repeat(2, minmax(0, 1fr)); margin: 0 !important; padding: 0 0 20px !important; overflow: visible !important; }
.agent-skill-btn { min-width: 0 !important; width: 100% !important; }
.result-page { width: 100% !important; }
.result-page > div:nth-of-type(2) { max-width: 430px !important; padding-inline: 18px !important; }
.bottom-bar { width: min(430px, 100vw) !important; padding-inline: 18px !important; }
.detail-cover { height: 320px !important; }
@media (max-width: 760px) {
  .global-top-bar { width: calc(100% - 24px) !important; }
  .ai-panel--skills .page__content, .ai-panel--agent .agent-chat-area, .page > .page__content { padding-left: 18px; padding-right: 18px; }
  .agent-skills-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
`

function portfolioEmbedTransform() {
  return {
    name: 'portfolio-ark-embed-transform',
    enforce: 'pre',
    transform(code, id) {
      if (id.endsWith('/src/App.jsx')) {
        return code.replace(
          "import { BrowserRouter, Link, Route, Routes, useLocation, useParams, useNavigate } from 'react-router-dom';",
          "import { HashRouter as BrowserRouter, Link, Route, Routes, useLocation, useParams, useNavigate } from 'react-router-dom';",
        ).replaceAll(' item={item}', ' line={item}')
      }

      if (id.endsWith('/src/styles/app.css')) {
        return `${code}\n${embedCss}`
      }

      if (id.endsWith('/src/context/WorkflowContext.jsx')) {
        return code
          .replace('selectedProducts: [],', 'selectedProducts: [products[0], products[1], products[3], products[4]],')
          .replace("type: '',", "type: '客厅',")
          .replace("source: '',", "source: 'portfolio-demo',")
          .replace("style: '',", "style: '奶油风',")
          .replace("generationStatus: 'idle'", "generationStatus: 'success'")
          .replace('generationProgress: 0,', 'generationProgress: 100,')
      }

      return null
    },
  }
}

export default defineConfig({
  root: arkRoot,
  base: '/ark-app/',
  publicDir: false,
  plugins: [portfolioEmbedTransform(), react()],
  build: {
    outDir: '/Users/karl/AIPM work/portfolio/public/ark-app',
    emptyOutDir: true,
  },
})
