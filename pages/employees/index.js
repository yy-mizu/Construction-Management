import MainLayout from '@/components/layouts/MainLayout.jsx'
import EmployeeList from '@/components/listing/EmployeeList.jsx'
import SearchPanel from '@/components/listing/SearchPanel.jsx'
import styles from '@/components/layouts/ListingLayout.module.scss'
import TableHeader from '@/components/listing/TableHeader.jsx'
import { useState } from 'react';
// Sample data - replace with actual data fetching
const sampleEmployees = Array(16).fill({
  // image: '/placeholder.svg',
  name: 'Jack',
  email: 'jack@mail.com',
  team: 'Team-One',

})

const retirees = Array(1).fill({
  // image: '/placeholder.svg',
  name: 'Jack',
  email: 'jack@mail.com',
  team: 'Team-One',

})

export default function EmployeesPage() {
  const [activeTab, setActiveTab] = useState('employees');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const activeList = activeTab === 'employees' ? sampleEmployees : retirees;

  return (
    <MainLayout>
      <div  className={styles.content_wrapper}>

        <TableHeader activeTab={activeTab} handleTabChange={handleTabChange} activeList={activeList}/>

        <div className={styles.content_container}>
        <EmployeeList employees={sampleEmployees} activeList={activeList}/>
        <SearchPanel />
        </div>
       
      </div>
    </MainLayout>
  )
}

