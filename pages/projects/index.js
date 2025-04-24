import { useEffect, useState } from "react";
import ProjectList from "@/components/listing/ProjectList";
import SearchPanel from "@/components/listing/SearchPanel.jsx";
import TableHeader from "@/components/listing/TableHeader.jsx";
import MainLayout from "@/components/layouts/MainLayout.jsx";
import styles from "@/components/layouts/ListingLayout.module.scss";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [archivedProjects, setArchivedProjects] = useState([]);
  const [activeTab, setActiveTab] = useState("projects");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    businessPartner: "",
    siteAddress: "",
  });

  useEffect(() => {
    fetch("http://localhost:2244/projects/list")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error loading projects:", err));
  }, []);

  const activeList = activeTab === "projects" ? projects : archivedProjects;

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
      (!filters.status || project.status === filters.status) &&
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
          handleTabChange={setActiveTab}
          activeList={activeList}
          context="projects"
        />
        <div className={styles.content_container}>
          <ProjectList projects={projects} activeList={filteredList} />
          <SearchPanel
            onSearch={(e) => setSearchTerm(e.target.value.toLowerCase())}
            onFilterChange={(field, value) =>
              setFilters((prev) => ({ ...prev, [field]: value }))
            }
            filters={filters}
            context="projects"
          />
        </div>
      </div>
    </MainLayout>
  );
}
