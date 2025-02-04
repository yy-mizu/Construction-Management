import MainLayout from "@/components/layouts/MainLayout.jsx";
import ProjectList from "@/components/listing/ProjectList";
import SearchPanel from "@/components/listing/SearchPanel.jsx";
import styles from "@/components/layouts/ListingLayout.module.scss";
import TableHeader from "@/components/listing/TableHeader.jsx";
import { useState } from "react";

const sampleProjects = Array.from({ length: 30 }, (_, index) => {
  if (index % 3 === 0) {
    return {
      businessPartner: "ABC Corp",
      customerRep: "John Doe",
      staffName: "Alice",
      siteAddress: "New York",
      inspectionDate: "2025-01-01",
      status: "Active", // Changed "Status" to "status"
    };
  } else if (index % 3 === 1) {
    return {
      businessPartner: "XYZ Ltd",
      customerRep: "Jane Smith",
      staffName: "Bob",
      siteAddress: "Los Angeles",
      inspectionDate: "2025-02-15",
      status: "Inactive", // Changed "Status" to "status"
    };
  } else {
    return {
      businessPartner: "DEF Inc",
      customerRep: "Michael Johnson",
      staffName: "Charlie",
      siteAddress: "Chicago",
      inspectionDate: "2025-03-10",
      status: "On Leave", // Changed "Status" to "status"
    };
  }
});


const archivedProjects = Array.from({ length: 10 }, (_, index) => {
  if (index % 2 === 0) {
    return {
      businessPartner: "LMN Group",
      customerRep: "Sarah Lee",
      staffName: "Daniel",
      siteAddress: "Houston",
      inspectionDate: "2024-12-20",
      status:"Active"
    };
  } else {
    return {
      businessPartner: "PQR Holdings",
      customerRep: "Tom Williams",
      staffName: "Emma",
      siteAddress: "San Francisco",
      inspectionDate: "2024-11-05",
      status:"Inactive"
    };
  }
});

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState("projects");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    businessPartner: "",
    siteAddress: "",
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

  const activeList = activeTab === "projects" ? sampleProjects : archivedProjects;

  const filteredList = activeList.filter((project) => {
    return (
      (!filters.businessPartner || 
        project.businessPartner?.toLowerCase().includes(filters.businessPartner.toLowerCase())) &&
      (!filters.customerRep || 
        project.customerRep?.toLowerCase().includes(filters.customerRep.toLowerCase())) &&
      (!filters.staffName || 
        project.staffName?.toLowerCase().includes(filters.staffName.toLowerCase())) &&
      (!filters.siteAddress || 
        project.siteAddress?.toLowerCase().includes(filters.siteAddress.toLowerCase())) &&
      (!filters.status || project.status === filters.status) && // Ensure status filtering works
      (!searchTerm || (
        project.businessPartner?.toLowerCase().includes(searchTerm) ||
        project.customerRep?.toLowerCase().includes(searchTerm) ||
        project.staffName?.toLowerCase().includes(searchTerm) ||
        project.siteAddress?.toLowerCase().includes(searchTerm)
      ))
    );
  });
  
  


  return (
    <MainLayout>
      <div className={styles.content_wrapper}>
        <TableHeader
          activeTab={activeTab}
          handleTabChange={handleTabChange}
          activeList={activeList}
          context="projects"
        />

        <div className={styles.content_container}>
          <ProjectList projects={sampleProjects} activeList={filteredList} />
          <SearchPanel
            onSearch={handleSearchChange}
            onFilterChange={handleFilterChange}
            filters={filters}
            context="projects"
          />

        </div>
      </div>
    </MainLayout>
  );
}
