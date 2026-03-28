import './index.css'
import { LangProvider } from './LangContext'
import { ThemeProvider } from './ThemeContext'
import Cursor from './components/Cursor'
import Sidebar from './components/Sidebar'
import Main from './components/Main'
import { useIsMobile } from './useIsMobile'

function Layout() {
  const isMobile = useIsMobile()
  return isMobile ? (
    <>
      <Sidebar />
      <div style={{ paddingTop: 52 }}><Main /></div>
    </>
  ) : (
    <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', minHeight: '100vh' }}>
      <Sidebar />
      <Main />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <LangProvider>
        <Cursor />
        <Layout />
      </LangProvider>
    </ThemeProvider>
  )
}
