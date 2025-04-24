import { ImageIcon, MoreHorizontal, ArrowUpDown } from "lucide-react";
import { useState } from "react";
import styles from "./VehicleList.module.scss";

export default function VehicleList({
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
          Status
          <button onClick={handleSort} className={styles.sort_button}>
            <ArrowUpDown />
          </button>
        </span>
        <span>
          Vehicle Type
          <button onClick={handleSort} className={styles.sort_button}>
            <ArrowUpDown />
          </button>
        </span>
        <span>
          License Plate
          <button onClick={handleSort} className={styles.sort_button}>
            <ArrowUpDown />
          </button>
        </span>
        <span>Info</span>
      </div>

      <div className={styles.listing_body}>
      {sortedList.map((vehicle, index) => (
  <div key={index} className={styles.row}>
    <span>
      <img
        src={vehicle.image || "/logos/image_20250103_14.png"}
        alt={vehicle.name}
      />
    </span>
    <span>{vehicle.name}</span>
    <span>{vehicle.status|| "N/A"}</span>
    <span>{vehicle.type || "N/A"}</span>
    <span>{vehicle.license_plate || "N/A"}</span>
    <span>
      <MoreHorizontal />
    </span>
  </div>
))}
      </div>
    </div>
  );
}
