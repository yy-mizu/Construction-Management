import MainLayout from "@/components/layouts/MainLayout.jsx";
import EmployeeList from "@/components/listing/EmployeeList.jsx";
import SearchPanel from "@/components/listing/SearchPanel.jsx";
import styles from "@/components/layouts/ListingLayout.module.scss";
import TableHeader from "@/components/listing/TableHeader.jsx";
import { useState } from "react";
// Sample data - replace with actual data fetching
// const sampleEmployees = Array(16).fill({
//   name: "Jack",
//   email: "jack@mail.com",
//   team: "Team-One",
// });
// Updated sample data with both Jack and Sithu
const sampleEmployees = Array.from({ length: 16 }, (_, index) => {
  if (index % 2 === 0) {
    return {
      name: "Jack",
      email: "jack@gmail.com",
      phone: "123456789",
      assignedTask: "2",
      team: "Team-One",
      role: "Manager",
      status: "Active",
    };
  } else {
    return {
      name: "Sithu",
      email: "sithu@gmail.com",
      phone: "123456789",
      assignedTask: "3",
      team: "Team-Two",
      role: "Designer",
      status: "Inactive",
    };
  }
});

const retirees = Array.from({ length: 10 }, (_, index) => {
  if (index % 2 === 0) {
    return {
      name: "Jack",
      email: "jack@gmail.com",
      phone: "123456789",
      assignedTask: "2",
      team: "Team-One",
      role: "Manager",
      status: "Active",
    };
  } else {
    return {
      name: "Sithu",
      email: "sithu@gmail.com",
      phone: "123456789",
      assignedTask: "3",
      team: "Team-Two",
      role: "Designer",
      status: "Inactive",
    };
  }
});

export default function EmployeesPage() {
  const [activeTab, setActiveTab] = useState("employees");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const activeList = activeTab === "employees" ? sampleEmployees : retirees;

  return (
    <MainLayout>
      <div className={styles.content_wrapper}>
        <TableHeader
          activeTab={activeTab}
          handleTabChange={handleTabChange}
          activeList={activeList}
        />

        <div className={styles.content_container}>
          <EmployeeList employees={sampleEmployees} activeList={activeList} />
          <SearchPanel />
        </div>
      </div>
    </MainLayout>
  );
}
