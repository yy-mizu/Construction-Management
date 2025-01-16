import Link from 'next/link'
import { Home, Users, Truck, Folder, List } from 'lucide-react'
import styles from './Sidebar.module.scss'

const menuItems = [
  { icon: <Home />, href: '/main', title: 'Home', active: true },
  { icon: <Users />, href: '/employees', title: 'Employees' },
  { icon: <Truck />, href: '/vehicles', title: 'Vehicles' },
  { icon: <Folder />, href: '/projects', title: 'Projects' },
  { icon: <List />, href: '/tasks', title: 'Tasks' }
]

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <ul className={styles.menu}>
        {menuItems.map((item, index) => (
          <li key={index} className={`${styles.menu_item} ${item.active ? styles.active : ''}`}>
            <Link href={item.href} className={styles.menu_link}>
              {item.icon}
              <span className={styles.menu_title}>{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}
