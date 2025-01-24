import React from "react";
import styles from "./TableHeader.module.scss";
import { ArchiveIcon, ImageIcon, MoreHorizontal } from "lucide-react";
import { Plus } from "lucide-react";
export default function TableHeader({
  activeTab,
  handleTabChange,
  activeList,
  context,
}) {
  return (
    <div className={styles.list_btn}>
      <div>
        <button
          className={
            activeTab === "employees" || activeTab === "vehicles"
              ? styles.active
              : ""
          }
          onClick={() =>
            handleTabChange(context === "employees" ? "employees" : "vehicles")
          }
        >
          {context === "employees" ? "Employee List" : "Vehicle List"}
        </button>
        <button
          className={
            activeTab === "retirees" || activeTab === "scrapped"
              ? styles.active
              : ""
          }
          onClick={() =>
            handleTabChange(context === "employees" ? "retirees" : "scrapped")
          }
        >
          {context === "employees" ? "Onleave List" : "Scrapped List"}
        </button>
      </div>

      <div className={styles.list_total}>
        <p>
          Total{" "}
          {activeTab === "employees" || activeTab === "vehicles"
            ? context === "employees"
              ? "Employees"
              : "Vehicles"
            : context === "employees"
            ? "Retirees"
            : "Scrapped"}
          : {activeList.length}
        </p>
      </div>

      <div className={styles.add_employee_btn}>
        <button>
          <Plus /> Add New {context === "employees" ? "Employee" : "Vehicle"}
        </button>
      </div>
    </div>
  );
}
