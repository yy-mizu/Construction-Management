import { useEffect, useState } from "react";
import axios from "axios";

import MainLayout from "@/components/layouts/MainLayout.jsx";
import TableHeader from "@/components/listing/TableHeader.jsx";
import VehicleList from "@/components/listing/VehicleList.jsx";
import SearchPanel from "@/components/listing/SearchPanel.jsx";

import styles from "@/components/layouts/ListingLayout.module.scss";

export default function VehiclesPage() {
  const [activeTab, setActiveTab] = useState("vehicles");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    team: "",
    type: "",
    status: "",
  });
  const [allVehicles, setAllVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch vehicle data
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await axios.get("http://localhost:2244/vehicles/list");
        setAllVehicles(res.data);
      } catch (err) {
        console.error("Error fetching vehicles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const handleTabChange = (tab) => setActiveTab(tab);
  const handleSearchChange = (e) => setSearchTerm(e.target.value.toLowerCase());
  const handleFilterChange = (field, value) =>
    setFilters((prev) => ({ ...prev, [field]: value }));

  const activeList = activeTab === "vehicles" ? allVehicles : [];

  const filteredList = activeList.filter((vehicle) => {
    return (
      (filters.team === "" || vehicle.team === filters.team) &&
      (filters.type === "" || vehicle.type === filters.type) &&
      (filters.status === "" || vehicle.status === filters.status) &&
      (searchTerm === "" ||
        (vehicle.name && vehicle.name.toLowerCase().includes(searchTerm)) ||
        (vehicle.license_plate &&
          vehicle.license_plate.toLowerCase().includes(searchTerm)))
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
              context="vehicles"
            />

            <div className={styles.content_container}>
              <VehicleList activeList={filteredList} />
              <SearchPanel
                onSearch={handleSearchChange}
                onFilterChange={handleFilterChange}
                filters={filters}
                context="vehicles"
              />
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
}
