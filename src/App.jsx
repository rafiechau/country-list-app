import Navigation from "./components/Navigation"
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Container from "./styles/main.module.scss";
import DetailPage from "./pages/DetailPage";
import { useEffect, useState } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import FavoritePage from "./pages/FavoritePage";

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')

  useEffect(() => {
      document.documentElement.setAttribute('data-theme', theme)
      localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
      setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeProvider value={{ theme, toggleTheme }}>
        <>
          <Navigation />
          <main className={Container.container}>
            <Routes>
              <Route path="/" element={<HomePage />}/>
              <Route path="/detail/:countryName" element={<DetailPage />}/>
              <Route path="/favorites" element={<FavoritePage />} />
            </Routes>
          </main>
        </>
    </ThemeProvider>
  )
}

export default App
