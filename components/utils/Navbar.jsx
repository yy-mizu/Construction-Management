import { useRouter } from 'next/router'
import { Search, Home, List, Clock, MoreVertical, Bell, Calendar, Users, Truck, Folder } from 'lucide-react'
import { useState, useEffect } from 'react'
import styles from './Navbar.module.scss'

export default function Navbar() {
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isActive = (path) => router.pathname === path ? styles.active : ''

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_left}>
        <div className={styles.search}>
          <Search />
          <input type="text" placeholder="Search" />
        </div>
      </div>

      <div className={styles.navbar_center}>
        <button className={`${styles.menu_button} ${isActive('/')}`} onClick={() => router.push('/')}>
          <Home />
          <span>Home</span>
        </button>
        <button className={`${styles.menu_button} ${isActive('/timeline')}`} onClick={() => router.push('/timeline')}>
          <Clock />
          <span>Timeline</span>
        </button>
        <button className={`${styles.menu_button} ${isActive('/objectives')}`} onClick={() => router.push('/objectives')}>
          <List />
          <span>Objectives</span>
        </button>

        {isMobile ? (
          <div className={styles.dropdown}>
            <button className={styles.menu_button}>
              <MoreVertical />
              <span>More</span>
            </button>
            <div className={styles.dropdown_content}>
              <button className={`${styles.menu_button} ${isActive('/employees')}`} onClick={() => router.push('/employees')}>
                <Users />
                <span>Employees</span>
              </button>
              <button className={`${styles.menu_button} ${isActive('/vehicles')}`} onClick={() => router.push('/vehicles')}>
                <Truck />
                <span>Vehicles</span>
              </button>
              <button className={`${styles.menu_button} ${isActive('/projects')}`} onClick={() => router.push('/projects')}>
                <Folder />
                <span>Projects</span>
              </button>
            </div>
          </div>
        ) : (
          <>
            <button className={`${styles.menu_button} ${isActive('/employees')}`} onClick={() => router.push('/employees')}>
              <Users />
              <span>Employees</span>
            </button>
            <button className={`${styles.menu_button} ${isActive('/vehicles')}`} onClick={() => router.push('/vehicles')}>
              <Truck />
              <span>Vehicles</span>
            </button>
            <button className={`${styles.menu_button} ${isActive('/projects')}`} onClick={() => router.push('/projects')}>
              <Folder />
              <span>Projects</span>
            </button>
          </>
        )}
      </div>

      <div className={styles.navbar_right}>
        <button className={styles.icon_button}>
          <Bell />
        </button>
        <button className={styles.icon_button}>
          <Calendar />
        </button>
        <div className={styles.profile}>
          <img src="your-profile-image-url.jpg" alt="Profile" />
        </div>
      </div>
    </nav>
  )
}
