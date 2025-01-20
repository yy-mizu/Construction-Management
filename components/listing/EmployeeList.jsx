import { ImageIcon, MoreHorizontal, ArrowUpDown } from "lucide-react";
import { useState } from "react";
import styles from "./EmployeeList.module.scss";

export default function EmployeeList({
  employees = [],
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
          Name
          <button onClick={handleSort} className={styles.sort_button}>
            <ArrowUpDown />
          </button>
        </span>
        <span>
          Email
          <button onClick={handleSort} className={styles.sort_button}>
            <ArrowUpDown />
          </button>
        </span>
        <span>
          Team
          <button onClick={handleSort} className={styles.sort_button}>
            <ArrowUpDown />
          </button>
        </span>
        <span>
          Role
          <button onClick={handleSort} className={styles.sort_button}>
            <ArrowUpDown />
          </button>
        </span>
        <span>
          Status
          <button onClick={handleSort} className={styles.sort_button}>
            <ArrowUpDown />
          </button>
        </span>
        <span>Info</span>
      </div>

      <div className={styles.listing_body}>
        {sortedList.map((person, index) => (
          <div key={index} className={styles.row}>
            {console.log(person)}
            <span>
              {/* <ImageIcon /> */}
              <img
                src={person.image || "/logos/image_20250103_14.png"}
                alt={person.name}
              />
            </span>
            <span>{person.name}</span>
            <span>{person.email}</span>
            <span>{person.team}</span>
            <span>{person.role}</span>
            <span>{person.status}</span>
            <span>
              <MoreHorizontal />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
