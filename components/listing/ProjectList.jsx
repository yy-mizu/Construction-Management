import { ImageIcon, MoreHorizontal, ArrowUpDown } from "lucide-react";
import { useState } from "react";
import styles from "./ProjectList.module.scss";

export default function ProjectList({ projects = [], activeList }) {
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const sortedList = [...activeList].sort((a, b) => {
    const aPartner = a.business_partner ?? '';
    const bPartner = b.business_partner ?? '';
    
    if (sortOrder === "asc") {
      return aPartner.localeCompare(bPartner);
    } else {
      return bPartner.localeCompare(aPartner);
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
          Site Address (City)
          <button onClick={handleSort} className={styles.sort_button}>
            <ArrowUpDown />
          </button>
        </span>
        <span>
          Start Date
          <button onClick={handleSort} className={styles.sort_button}>
            <ArrowUpDown />
          </button>
        </span>
        <span>
          End Date
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


        <span>Status
        <button onClick={handleSort} className={styles.sort_button}>
            <ArrowUpDown />
          </button>
        </span>
        
        <span>Info
        <button onClick={handleSort} className={styles.sort_button}>
            <ArrowUpDown />
          </button>
        </span>
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
            <span>{project.business_partner}</span>
            <span>{project.customer_representative}</span>
            
            <span>{project.site_address}</span>
            <span>{project.startDate}</span>
            <span>{project.endDate}</span>
            <span>{project.staff_name}</span>
            <span>{project.status}</span>
            <span>
              <MoreHorizontal />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
