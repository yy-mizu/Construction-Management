import { ImageIcon, MoreHorizontal, ArrowUpDown } from "lucide-react";
import { useState } from "react";
import styles from "./ProjectList.module.scss";

export default function ProjectList({
  projects = [],
  retirees = [],
  activeList,
}) {
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const sortedList = [...activeList].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  return (
    <div className={styles.listing}>
      <div className={styles.listing_header}>
        <span>
          <ImageIcon />
        </span>
        <span>
          Business <br />Pertaner
          
          <button onClick={handleSort} className={styles.sort_button}>
            <ArrowUpDown />
          </button>
        </span>
        <span>
        Customer <br />
        Representative
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
        Site Address <br />
        (City)
          <button onClick={handleSort} className={styles.sort_button}>
            <ArrowUpDown />
          </button>
        </span>

        <span>
        Date <br />
        (City)
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
              {/* <ImageIcon /> */}
              <img
                src={project.image || "/logos/image_20250103_14.png"}
                alt={project.name}
              />
            </span>
            <span>{project.businespertaner}</span>
            <span>{project.customer}</span>
            <span>{project.staff}</span>
            <span>{project.site}</span>
            <span>{project.date}</span>
            <span>
              <MoreHorizontal />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
