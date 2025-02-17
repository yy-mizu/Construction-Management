import React, { useState } from "react";
import styles from "./TableHeader.module.scss";
import { Plus } from "lucide-react";
import Modal from "../modals/modal";

export default function TableHeader({
  activeTab,
  handleTabChange,
  activeList,
  context,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  return (
    <div className={styles.list_btn}>
      <div>
        <button
          className={
            activeTab === "employees" || activeTab === "vehicles" || activeTab === "projects"
              ? styles.active
              : ""
          }
          onClick={() =>
            handleTabChange(
              context === "employees"
                ? "employees"
                : context === "vehicles"
                ? "vehicles"
                : "projects"
            )
          }
        >
          {context === "employees"
            ? "Employee List"
            : context === "vehicles"
            ? "Vehicle List"
            : "Project List"}
        </button>
        <button
          className={
            activeTab === "retirees" || activeTab === "scrapped" || activeTab === "archived"
              ? styles.active
              : ""
          }
          onClick={() =>
            handleTabChange(
              context === "employees"
                ? "retirees"
                : context === "vehicles"
                ? "scrapped"
                : "archived"
            )
          }
        >
          {context === "employees"
            ? "Onleave List"
            : context === "vehicles"
            ? "Scrapped List"
            : "Archived Projects"}
        </button>
      </div>

      <div className={styles.list_total}>
        <p>
          Total{" "}
          {activeTab === "employees" || activeTab === "vehicles" || activeTab === "projects"
            ? context === "employees"
              ? "Employees"
              : context === "vehicles"
              ? "Vehicles"
              : "Projects"
            : context === "employees"
            ? "Retirees"
            : context === "vehicles"
            ? "Scrapped"
            : "Archived Projects"}
          : {activeList.length}
        </p>
      </div>

      <div className={styles.add_employee_btn}>
        <button onClick={handleModalToggle}>
          <Plus /> Add New{" "}
          {context === "employees"
            ? "Employee"
            : context === "vehicles"
            ? "Vehicle"
            : "Project"}
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleModalToggle} context={context} />
    </div>
  );
}
