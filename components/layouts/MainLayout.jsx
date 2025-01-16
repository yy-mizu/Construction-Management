import Sidebar from '../utils/Sidebar.jsx'
import Navbar from '../utils/Navbar.jsx'
import styles from './MainLayout.module.scss'

export default function Layout({ children }) {
  return (
    <div className={styles.dashboard}>
      <Sidebar />
      <div className={styles.main_content}>
        <Navbar />
        {children}
      </div>
    </div>
  )
}

