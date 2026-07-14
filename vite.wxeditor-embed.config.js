import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

const wxEditorRoot = '/Users/karl/apps/UEditor docs/wxeditor-server-new/web'

function portfolioWxEditorTransform() {
  return {
    name: 'portfolio-wxeditor-embed-transform',
    enforce: 'pre',
    transform(code, id) {
      if (id.endsWith('/src/main.tsx')) {
        return code
          .replace(
            "import { BrowserRouter } from 'react-router-dom';",
            "import { HashRouter as BrowserRouter } from 'react-router-dom';",
          )
          .replace(
            "ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(",
            `if (window.location.hash.startsWith('#/portfolio-editor')) {
  localStorage.setItem('wxeditor:editor.firstGuideDismissed', '1');
  localStorage.setItem('wxeditor:editor.dockCollapsed', window.innerWidth < 760 ? '1' : '0');
  localStorage.setItem('wxeditor:blockWorkbenchV2', '1');
}

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(`,
          )
      }

      if (id.endsWith('/src/App.tsx')) {
        return code.replace(
          '{import.meta.env.DEV && <Route path="/block-editor-demo" element={<BlockEditorDemoPage />} />}',
          `<Route
                path="/portfolio-editor/:documentId?"
                element={<EditorPage routeBase="/portfolio-editor" chatRouteKind="portfolio" blockWorkbenchEnabled />}
              />
              <Route path="/block-editor-demo" element={<BlockEditorDemoPage />} />`,
        )
      }

      if (id.endsWith('/src/workspace/hooks/useAuth.tsx')) {
        return code
          .replace(
            'export function AuthProvider({ children }: { children: ReactNode }) {',
            `const PORTFOLIO_DEMO_USER: ApiUser = {
  id: 'portfolio-karl',
  username: 'karl',
  nickname: 'Karl',
  role: 'admin',
  settings: {
    wechatMeta: { accountName: 'AI 产品手记', author: 'Karl', location: '中国' },
  },
  membership: { type: 'pro', daysLeft: 365, isActive: true },
};

const isPortfolioEditorDemo = () => (
  typeof window !== 'undefined' && window.location.hash.startsWith('#/portfolio-editor')
);

export function AuthProvider({ children }: { children: ReactNode }) {`,
          )
          .replace(
            'const [user, setUser] = useState<ApiUser | null>(() => getStoredUser());',
            'const [user, setUser] = useState<ApiUser | null>(() => (isPortfolioEditorDemo() ? PORTFOLIO_DEMO_USER : getStoredUser()));',
          )
          .replace(
            'const [loading, setLoading] = useState<boolean>(Boolean(getStoredTokens()));',
            'const [loading, setLoading] = useState<boolean>(() => (isPortfolioEditorDemo() ? false : Boolean(getStoredTokens())));',
          )
          .replace(
            'const refreshProfile = useCallback(async () => {',
            `const refreshProfile = useCallback(async () => {
    if (isPortfolioEditorDemo()) {
      setUser(PORTFOLIO_DEMO_USER);
      setLoading(false);
      return;
    }`,
          )
      }

      if (id.endsWith('/src/workspace/pages/EditorPage.tsx')) {
        return code
          .replace(
            "const EDITOR_STARTER_TITLE = '';",
            "const EDITOR_STARTER_TITLE = 'AI 产品从能力验证到商业落地';",
          )
          .replace(
            "const EDITOR_STARTER_HTML = '';",
            "const EDITOR_STARTER_HTML = EDITOR_BUILTIN_BLOCKS.slice(0, 6).map((block) => block.html).join('\\n');",
          )
          .replace(
            `    pendingNavigateDocIdRef.current = null;
    navigate(\`${'${routeBase}'}/\${id}\`, { replace: true });`,
            `    pendingNavigateDocIdRef.current = null;
    if (typeof window !== 'undefined' && window.location.hash.startsWith('#/portfolio-editor')) return;
    navigate(\`${'${routeBase}'}/\${id}\`, { replace: true });`,
          )
          .replace(
            'const [assetDockCollapsed, setAssetDockCollapsed] = useState<boolean>(() => {',
            `const [assetDockCollapsed, setAssetDockCollapsed] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.location.hash.startsWith('#/portfolio-editor')) {
      return window.innerWidth < 760;
    }`,
          )
          .replace(
            '  // 手机宽度(<760)连 AI 面板也默认收起:',
            `  useEffect(() => {
    if (!window.location.hash.startsWith('#/portfolio-editor')) return undefined;
    const syncPortfolioDock = () => {
      const viewportWidth = document.documentElement.clientWidth || window.innerWidth;
      setAssetDockCollapsed(viewportWidth < 760);
    };
    const frame = window.requestAnimationFrame(syncPortfolioDock);
    const settle = window.setTimeout(syncPortfolioDock, 240);
    const observer = new ResizeObserver(syncPortfolioDock);
    observer.observe(document.documentElement);
    window.addEventListener('resize', syncPortfolioDock);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(settle);
      observer.disconnect();
      window.removeEventListener('resize', syncPortfolioDock);
    };
  }, []);

  // 手机宽度(<760)连 AI 面板也默认收起:`,
          )
      }

      if (id.endsWith('/src/lib/api.ts')) {
        const httpMarker = `const http: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 120000,
  headers: {
    'Content-Type': 'application/json',
  },
});`

        const demoAdapter = String.raw`

const portfolioDemoEnabled = () => (
  typeof window !== 'undefined' && window.location.hash.startsWith('#/portfolio-editor')
);

let portfolioDemoDocument: DocumentRecord = {
  id: 'portfolio-demo',
  title: 'AI 产品从能力验证到商业落地',
  content: '',
  status: 'draft',
  author_name: 'Karl',
  updated_at: new Date().toISOString(),
  created_at: new Date().toISOString(),
};

const portfolioDemoAdapter = async (config: AxiosRequestConfig) => {
  const url = String(config.url || '');
  const method = String(config.method || 'get').toLowerCase();
  let body: Record<string, any> = {};
  try {
    body = typeof config.data === 'string' ? JSON.parse(config.data) : (config.data || {});
  } catch { body = {}; }

  const user: ApiUser = {
    id: 'portfolio-karl', username: 'karl', nickname: 'Karl', role: 'admin',
    settings: { wechatMeta: { accountName: 'AI 产品手记', author: 'Karl', location: '中国' } },
    membership: { type: 'pro', daysLeft: 365, isActive: true },
  };

  let data: any = {};
  if (url === '/auth/me') data = user;
  else if (url === '/agent/usage') data = { used: 18, quota: 200, remaining: 182, plan: 'pro', planActive: true };
  else if (url === '/agent/precheck') data = { pass: true, errorCount: 0, warnCount: 0, groups: [] };
  else if (url === '/agent/feedback') data = { ok: true };
  else if (url.startsWith('/agent/conversations')) data = { success: true, items: [] };
  else if (url === '/ai/models') data = { models: [{ id: 'portfolio-agent', display_name: 'WXEditor Agent', provider_name: 'Local demo', is_default: true }] };
  else if (url === '/ai/model-preference') data = { model_id: 'portfolio-agent' };
  else if (url === '/collab/documents' && method === 'get') data = { list: [portfolioDemoDocument], total: 1, page: 1, limit: 12 };
  else if (url === '/collab/documents' && method === 'post') {
    portfolioDemoDocument = { ...portfolioDemoDocument, ...body, id: 'portfolio-demo', updated_at: new Date().toISOString() };
    data = portfolioDemoDocument;
  }
  else if (/^\/collab\/documents\/[^/]+$/.test(url) && method === 'get') data = portfolioDemoDocument;
  else if (/^\/collab\/documents\/[^/]+$/.test(url) && method === 'put') {
    portfolioDemoDocument = { ...portfolioDemoDocument, ...body, updated_at: new Date().toISOString() };
    data = portfolioDemoDocument;
  }
  else if (url.endsWith('/shares')) data = [];
  else if (url === '/templates') data = { list: [], total: 0 };
  else if (url === '/materials') data = { list: [], total: 0 };
  else if (url.startsWith('/comments/document/')) data = [];
  else if (url === '/wechat-accounts') data = { list: [{ id: 'portfolio-account', name: 'AI 产品手记', status: 'active' }] };
  else data = { success: true };

  return {
    data: { success: true, data },
    status: 200,
    statusText: 'OK',
    headers: {},
    config,
    request: null,
  };
};`

        return code
          .replace(httpMarker, `${httpMarker}${demoAdapter}`)
          .replace(
            `http.interceptors.request.use((config) => {
  const tokens = getStoredTokens();`,
            `http.interceptors.request.use((config) => {
  if (portfolioDemoEnabled()) config.adapter = portfolioDemoAdapter;
  const tokens = getStoredTokens();`,
          )
          .replace(
            `    ): { abort: () => void } => {
      const controller = new AbortController();`,
            `    ): { abort: () => void } => {
      if (portfolioDemoEnabled()) {
        let aborted = false;
        const timers: number[] = [];
        const schedule = (fn: () => void, delay: number) => {
          timers.push(window.setTimeout(() => { if (!aborted) fn(); }, delay));
        };
        const reply = payload.message.includes('标题')
          ? '我已读取当前文章。建议把标题改为“AI 产品从能力验证到商业落地：三个关键决策”，同时保留用户价值与商业结果两个信息点。'
          : '我已读取当前文章结构。建议先强化标题的信息密度，再把正文拆成“用户问题、产品机制、商业验证”三段；你也可以继续指定某个模块，我会只处理目标内容。';
        const chunks = reply.match(/.{1,18}/g) || [reply];
        handlers.onConversation?.({ conversationId: 2026, title: '产品内容优化', documentId: payload.documentId || 'portfolio-demo' });
        schedule(() => handlers.onThinking?.({ text: '正在读取文档结构与当前选区…' }), 120);
        schedule(() => handlers.onPlan?.({ plan: { user_goal: '优化当前文章，并保留非目标模块' } }), 360);
        chunks.forEach((chunk, index) => schedule(() => handlers.onContentDelta?.({ text: chunk }), 620 + index * 70));
        schedule(() => handlers.onContent?.({ text: reply }), 680 + chunks.length * 70);
        schedule(() => handlers.onDone?.({ iterations: 1, conversationId: 2026 }), 760 + chunks.length * 70);
        return {
          abort: () => {
            aborted = true;
            timers.forEach((timer) => window.clearTimeout(timer));
            handlers.onAbort?.();
          },
        };
      }
      const controller = new AbortController();`,
          )
      }

      if (id.endsWith('/src/workspace/pages/BlockEditorDemoPage.tsx')) {
        return code.replace(
          /\n\s*<div style=\{\{ padding: '8px 16px', background: '#111827'[\s\S]*?<\/div>\n(?=\s*<div style=\{\{ flex: 1)/,
          '\n',
        )
      }

      return null
    },
  }
}

export default defineConfig({
  root: wxEditorRoot,
  base: '/wxeditor-app/',
  publicDir: false,
  resolve: {
    alias: {
      '@': resolve(wxEditorRoot, 'src'),
    },
  },
  plugins: [portfolioWxEditorTransform(), react()],
  build: {
    target: 'esnext',
    outDir: '/Users/karl/AIPM work/portfolio/public/wxeditor-app',
    emptyOutDir: true,
  },
})
