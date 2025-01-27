import MainLayout from "@/components/layouts/MainLayout.jsx";
import VehicleList from "@/components/listing/VehicleList";
import SearchPanel from "@/components/listing/SearchPanel.jsx";
import styles from "@/components/layouts/ListingLayout.module.scss";
import TableHeader from "@/components/listing/TableHeader.jsx";
import { useState } from "react";

const sampleVehicles = Array.from({ length: 30 }, (_, index) => {
  if (index % 3 === 0) {
    return {
      name: "Toyota",
      InspectionDate: "1-1-2025",
      displayName: "Toyota",
      team: "Team-One",
    };
  } else if (index % 3 === 1) {
    return {
      name: "Honda",
      InspectionDate: "1-1-2025",
      displayName: "Honda",
      team: "Team-Two",
    };
  } else {
    return {
      name: "Tesla",
      InspectionDate: "12-12-2025",
      displayName: "Tesla",
      team: "Team-Three",
    };
  }
});

const scrappedVehicles = Array.from({ length: 10 }, (_, index) => {
  if (index % 2 === 0) {
    return {
      name: "Audi",
      InspectionDate: "1-1-2025",
      displayName: "Honda",
      team: "Team-Three",
    };
  } else {
    return {
      name: "BMW",
      InspectionDate: "1-1-2025",
      displayName: "Honda",
      team: "Team-Two",
    };
  }
});

export default function VehiclesPage() {
  const [activeTab, setActiveTab] = useState("vehicles");
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

  const activeList =
    activeTab === "vehicles" ? sampleVehicles : scrappedVehicles;

  // const filteredList = activeList.filter((vehicle) => {
  //   return (
  //     (filters.team === "" || vehicle.team === filters.team) &&
  //     (filters.role === "" || vehicle.role === filters.role) &&
  //     (filters.status === "" || vehicle.status === filters.status) &&
  //     (searchTerm === "" ||
  //       vehicle.name.toLowerCase().includes(searchTerm) ||
  //       vehicle.email.toLowerCase().includes(searchTerm) ||
  //       vehicle.phone.includes(searchTerm))
  //   );
  // });

  const filteredList = activeList.filter((vehicle) => {
    return (
      (filters.team === "" || vehicle.team === filters.team) &&
      (searchTerm === "" ||
        (vehicle.name && vehicle.name.toLowerCase().includes(searchTerm)) ||
        (vehicle.displayName &&
          vehicle.displayName.toLowerCase().includes(searchTerm)))
    );
  });

  return (
    <MainLayout>
      <div className={styles.content_wrapper}>
        <TableHeader
          activeTab={activeTab}
          handleTabChange={handleTabChange}
          activeList={activeList}
          context="vehicles"
        />

        <div className={styles.content_container}>
          <VehicleList employees={sampleVehicles} activeList={filteredList} />
          <SearchPanel
            onSearch={handleSearchChange}
            onFilterChange={handleFilterChange}
            filters={filters}
            context="vehicles"
          />
        </div>
      </div>
    </MainLayout>
  );
}
