import React from 'react'
import styles from './TableHeader.module.scss'
import { ImageIcon, MoreHorizontal } from 'lucide-react';
import { Plus } from 'lucide-react';
export default function TableHeader({activeTab , handleTabChange , activeList}) {

 
  return (
    <div className={styles.list_btn}>
    <div>
      <button
        className={activeTab === 'employees' ? styles.active : ''}
        onClick={() => handleTabChange('employees')}
      >
        Employee List
      </button>
      <button
        className={activeTab === 'retirees' ? styles.active : ''}
        onClick={() => handleTabChange('retirees')}
      >
        Retirement List
      </button>
    </div>


    <div className={styles.list_total}>
      <p>Total {activeTab === 'employees' ? 'Employees' : 'Retirees'}: {activeList.length}</p>
    </div>

    <div className={styles.add_employee_btn}>
      <button>
        <Plus /> Add New Employee
      </button>
    </div>
  </div>
  )
}
