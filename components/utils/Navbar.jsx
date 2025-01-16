import { Menu, Bell, Settings } from 'lucide-react'
import styles from './Navbar.module.scss'

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_left}>
        <button>
          <Menu />
        </button>
      </div>
      <div className={styles.navbar_right}>
        <button className={styles.icon_button}>
          <Bell />
        </button>
        <button className={styles.icon_button}>
          <Settings />
        </button>
        <div className={styles.profile}>Batman</div>
      </div>
    </nav>
  )
}

