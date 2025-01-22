import MainLayout from "@/components/layouts/MainLayout.jsx";
import EmployeeList from "@/components/listing/EmployeeList.jsx";
import SearchPanel from "@/components/listing/SearchPanel.jsx";
import styles from "@/components/layouts/ListingLayout.module.scss";
import TableHeader from "@/components/listing/TableHeader.jsx";
import { useState } from "react";

const sampleEmployees = Array.from({ length: 30 }, (_, index) => {
  if (index % 3 === 0) {
    return {
      name: "Jack",
      email: "jack@gmail.com",
      phone: "123456789",
      assignedTask: "2",
      team: "Team-One",
      role: "Manager",
      status: "Active",
    };
  } else if (index % 3 === 1) {
    return {
      name: "Sithu",
      email: "sithu@gmail.com",
      phone: "987654321",
      assignedTask: "3",
      team: "Team-Two",
      role: "Designer",
      status: "Inactive",
    };
  } else {
    return {
      name: "Robin",
      email: "robin@gmail.com",
      phone: "555666777",
      assignedTask: "5",
      team: "Team-Two",
      role: "Developer",
      status: "On Leave",
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
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    team: "",
    role: "",
    status: "",
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const activeList = activeTab === "employees" ? sampleEmployees : retirees;

  const filteredList = activeList.filter((person) => {
    return (
      (filters.team === "" || person.team === filters.team) &&
      (filters.role === "" || person.role === filters.role) &&
      (filters.status === "" || person.status === filters.status) &&
      (searchTerm === "" ||
        person.name.toLowerCase().includes(searchTerm) ||
        person.email.toLowerCase().includes(searchTerm) ||
        person.phone.includes(searchTerm))
    );
  });

  return (
    <MainLayout>
      <div className={styles.content_wrapper}>
        <TableHeader
          activeTab={activeTab}
          handleTabChange={handleTabChange}
          activeList={activeList}
        />

        <div className={styles.content_container}>
          {/* <EmployeeList employees={sampleEmployees} activeList={activeList} /> */}
          <EmployeeList employees={sampleEmployees} activeList={filteredList} />
          <SearchPanel
            onSearch={handleSearchChange}
            onFilterChange={handleFilterChange}
            filters={filters}
          />
        </div>
      </div>
    </MainLayout>
  );
}
