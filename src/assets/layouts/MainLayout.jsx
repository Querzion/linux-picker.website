import { useNavigate, useLocation } from 'react-router-dom'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

export default function MainLayout({ children, selectedDistro }) {
    const navigate = useNavigate()
    const location = useLocation()
    const isAbout = location.pathname === '/about'

    const handleNavToggle = () => {
        if (isAbout) navigate('/')
        else navigate('/about')
    }

    return (
        <div className={styles.layout}>
            <Header />
            
            <main className={styles.main}>
                {children}
            </main>
            
            <Footer />
        </div>
    )
}
