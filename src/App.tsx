import './index.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { LangProvider } from './LangContext'
import { ThemeProvider } from './ThemeContext'
import Cursor from './components/Cursor'
import Sidebar from './components/Sidebar'
import Main from './components/Main'
import LegacyWorkRedirect from './pages/LegacyWorkRedirect'
import ScrollToSection from './ScrollToSection'
import SmoothScroll from './SmoothScroll'
import { useIsMobile } from './useIsMobile'

function Shell({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile()
  return isMobile ? (
    <>
      <Sidebar />
      <div style={{ paddingTop: 52 }}>{children}</div>
    </>
  ) : (
    <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', minHeight: '100vh' }}>
      <Sidebar />
      {children}
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <LangProvider>
        <SmoothScroll>
          <Cursor />
          <ScrollToSection />
          <Routes>
            <Route path="/" element={<Shell><Main /></Shell>} />
            <Route path="/work/:slug" element={<Shell><LegacyWorkRedirect /></Shell>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </SmoothScroll>
      </LangProvider>
    </ThemeProvider>
  )
}
