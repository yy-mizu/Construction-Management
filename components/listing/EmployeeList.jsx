import { ImageIcon, MoreHorizontal, ArrowUpDown } from "lucide-react";
import { useState, useMemo } from "react";
import styles from "./EmployeeList.module.scss";

export default function EmployeeList({ activeList = [] }) {
  const [sortConfig, setSortConfig] = useState({ key: "name", order: "asc" });

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      order: prev.key === key && prev.order === "asc" ? "desc" : "asc",
    }));
  };

  const sortedList = useMemo(() => {
    return [...activeList].sort((a, b) => {
      if (!a[sortConfig.key] || !b[sortConfig.key]) return 0; // Prevent sorting errors if field is missing
      return sortConfig.order === "asc"
        ? a[sortConfig.key].toString().localeCompare(b[sortConfig.key].toString())
        : b[sortConfig.key].toString().localeCompare(a[sortConfig.key].toString());
    });
  }, [activeList, sortConfig]);

  const SortableHeader = ({ label, sortKey }) => (
    <span>
      {label}
      <button onClick={() => handleSort(sortKey)} className={styles.sort_button}>
        <ArrowUpDown />
      </button>
    </span>
  );

  return (
    <div className={styles.listing}>
      <div className={styles.listing_header}>
        <span><ImageIcon /></span>
        <SortableHeader label="Name" sortKey="name" />
        <SortableHeader label="Email" sortKey="email" />
        <SortableHeader label="Phone" sortKey="phone" />
        <SortableHeader label="Assigned Task" sortKey="assignedTask" />
        <SortableHeader label="Team" sortKey="team" />
        <SortableHeader label="Role" sortKey="role" />
        <SortableHeader label="Status" sortKey="status" />
        <span>Info</span>
      </div>

      <div className={styles.listing_body}>
        {sortedList.map((person, index) => (
          <div key={index} className={styles.row}>
            <span>
              <img src={person.image || "/logos/image_20250103_14.png"} alt={person.name} />
            </span>
            <span>{person.name}</span>
            <span>{person.email}</span>
            <span>{person.phone}</span>
            <span>{person.assignedTask}</span>
            <span>{person.team}</span>
            <span>{person.role}</span>
            <span>{person.status}</span>
            <span><MoreHorizontal /></span>
          </div>
        ))}
      </div>
    </div>
  );
}
