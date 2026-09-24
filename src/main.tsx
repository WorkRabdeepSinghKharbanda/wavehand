import { StrictMode, Suspense, lazy } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./styles/global.css"
import App from "./App.tsx"

const GuidePage = lazy(() => import("./pages/GuidePage").then((m) => ({ default: m.GuidePage })))
const BlogIndexPage = lazy(() => import("./pages/BlogIndexPage").then((m) => ({ default: m.BlogIndexPage })))
const BlogPostPage = lazy(() => import("./pages/BlogPostPage").then((m) => ({ default: m.BlogPostPage })))
const ListicleIndexPage = lazy(() => import("./pages/ListicleIndexPage").then((m) => ({ default: m.ListicleIndexPage })))
const ListiclePage = lazy(() => import("./pages/ListiclePage").then((m) => ({ default: m.ListiclePage })))
const NotFoundPage = lazy(() => import("./pages/NotFoundPage").then((m) => ({ default: m.NotFoundPage })))

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/guides/:slug" element={<GuidePage />} />
          <Route path="/blog" element={<BlogIndexPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/best" element={<ListicleIndexPage />} />
          <Route path="/best/:slug" element={<ListiclePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
)
