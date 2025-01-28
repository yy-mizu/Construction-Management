import { ImageIcon, MoreHorizontal, ArrowUpDown } from "lucide-react";
import { useState } from "react";
import styles from "./ProjectList.module.scss";

export default function ProjectList({ projects = [], activeList }) {
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const sortedList = [...activeList].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.businessPartner.localeCompare(b.businessPartner);
    } else {
      return b.businessPartner.localeCompare(a.businessPartner);
    }
  });

  return (
    <div className={styles.listing}>
      <div className={styles.listing_header}>
        <span>
          <ImageIcon />
        </span>
        <span>
          Business Partner
          <button onClick={handleSort} className={styles.sort_button}>
            <ArrowUpDown />
          </button>
        </span>
        <span>
          Customer Representative
          <button onClick={handleSort} className={styles.sort_button}>
            <ArrowUpDown />
          </button>
        </span>
        <span>
          Staff Name
          <button onClick={handleSort} className={styles.sort_button}>
            <ArrowUpDown />
          </button>
        </span>
        <span>
          Site Address (City)
          <button onClick={handleSort} className={styles.sort_button}>
            <ArrowUpDown />
          </button>
        </span>
        <span>
          Date
          <button onClick={handleSort} className={styles.sort_button}>
            <ArrowUpDown />
          </button>
        </span>
        <span>Info</span>
      </div>

      <div className={styles.listing_body}>
        {sortedList.map((project, index) => (
          <div key={index} className={styles.row}>
            <span>
              <img
                src={project.image || "/logos/image_20250103_14.png"}
                alt={project.businessPartner}
              />
            </span>
            <span>{project.businessPartner}</span>
            <span>{project.customerRep}</span>
            <span>{project.staffName}</span>
            <span>{project.siteAddress}</span>
            <span>{project.inspectionDate}</span>
            <span>
              <MoreHorizontal />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
