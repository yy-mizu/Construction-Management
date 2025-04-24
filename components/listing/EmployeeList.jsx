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
      if (!a[sortConfig.key] || !b[sortConfig.key]) return 0;
      return sortConfig.order === "asc"
        ? a[sortConfig.key].toString().localeCompare(b[sortConfig.key].toString())
        : b[sortConfig.key].toString().localeCompare(a[sortConfig.key].toString());
    });
  }, [activeList, sortConfig]);

  const SortableHeader = ({ label, sortKey }) => (
    <span>
      {label}
      <button onClick={() => handleSort(sortKey)} className={styles.sort_button}>
        <ArrowUpDown size={14} />
      </button>
    </span>
  );

  return (
    <div className={styles.listing}>
      <div className={styles.listing_header}>
        <span><ImageIcon size={16} /></span>
        <SortableHeader label="Name" sortKey="name" />
        <SortableHeader label="Email" sortKey="email" />
        <SortableHeader label="Phone" sortKey="phoneNumber" />
        <SortableHeader label="Display" sortKey="displayName" />
        <SortableHeader label="Team" sortKey="teamid" />
        <SortableHeader label="Role" sortKey="role" />
        <SortableHeader label="Status" sortKey="status" />
        <span>More</span>
      </div>

      <div className={styles.listing_body}>
        {sortedList.map((emp) => (
          <div key={emp.id} className={styles.row}>
            <span><img src="/logos/image_20250103_14.png" alt={emp.name} /></span>
            <span>{emp.name}</span>
            <span>{emp.email}</span>
            <span>{emp.phoneNumber}</span>
            <span>{emp.displayName}</span>
            <span>{emp.teamid}</span>
            <span>{emp.role}</span>
            <span>{emp.status}</span>
            <span><MoreHorizontal size={16} /></span>
          </div>
        ))}
      </div>
    </div>
  );
}
