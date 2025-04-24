import { useEffect, useState } from "react";
import axios from "axios";

import MainLayout from "@/components/layouts/MainLayout.jsx";
import TableHeader from "@/components/listing/TableHeader.jsx";
import EmployeeList from "@/components/listing/EmployeeList.jsx";
import SearchPanel from "@/components/listing/SearchPanel.jsx";

import styles from "@/components/layouts/ListingLayout.module.scss";

export default function EmployeesPage() {
  const [activeTab, setActiveTab] = useState("employees");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    team: "",
    role: "",
    status: "",
  });
  const [allEmployees, setAllEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch employee data
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:2244/employees/list");
        setAllEmployees(res.data);
      } catch (err) {
        console.error("Error fetching employees:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleTabChange = (tab) => setActiveTab(tab);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  // Filter employees based on active tab, filters, and search
  const activeList = activeTab === "employees" ? allEmployees : [];

  const filteredList = activeList.filter((emp) => {
    return (
      (filters.team === "" || emp.teamid === filters.team) &&
      (filters.role === "" || emp.role === filters.role) &&
      (filters.status === "" || emp.status === filters.status) &&
      (searchTerm === "" ||
        emp.name?.toLowerCase().includes(searchTerm) ||
        emp.email?.toLowerCase().includes(searchTerm) ||
        emp.phoneNumber?.includes(searchTerm))
    );
  });

  return (
    <MainLayout>
      <div className={styles.content_wrapper}>
        {loading ? (
          <div className={styles.loading}>Loading...</div>
        ) : (
          <>
            <TableHeader
              activeTab={activeTab}
              handleTabChange={handleTabChange}
              activeList={filteredList}
              context="employees"
            />

            <div className={styles.content_container}>
              <EmployeeList activeList={filteredList} />

              <SearchPanel
                onSearch={handleSearchChange}
                onFilterChange={handleFilterChange}
                filters={filters}
                context="employees"
              />
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
}