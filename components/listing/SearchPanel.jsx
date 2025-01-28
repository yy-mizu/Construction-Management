import {
  Filter,
  Users,
  Briefcase,
  CheckCircle,
  Search,
  X,
  Calendar,
} from "lucide-react";
import styles from "./SearchPanel.module.scss";

export default function SearchPanel({ onSearch, onFilterChange, filters, context }) {
  const renderSelectedFilters = () => {
    return Object.entries(filters)
      .filter(([_, value]) => value) // Only show active filters
      .map(([key, value]) => (
        <span key={key} className={styles.filter_tag}>
          {value} <X onClick={() => onFilterChange(key, "")} />
        </span>
      ));
  };

  return (
    <div className={styles.search_panel}>
      <div className={styles.search_inner}>
        <div className={styles.search_keyword}>
          <Search className={styles.magnifying_glass} />
          <input
            type="text"
            placeholder={`Search ${
              context === "employees"
                ? "Employees"
                : context === "vehicles"
                ? "Vehicles"
                : "Projects"
            }...`}
            onChange={onSearch}
          />
        </div>

        <div className={styles.search_input_container}>
          {Object.values(filters).some((value) => value) ? (
            <div className={styles.selected_filters}>{renderSelectedFilters()}</div>
          ) : (
            <p>
              <Filter /> Please set the filtering conditions
            </p>
          )}

          {/* Filters for Employees */}
          {context === "employees" && (
            <>
              <div>
                <label>Role</label>
                <div className={styles.search_input}>
                  <Briefcase />
                  <select
                    onChange={(e) => onFilterChange("role", e.target.value)}
                    value={filters.role}
                  >
                    <option value="">Select Role</option>
                    <option value="Manager">Manager</option>
                    <option value="Designer">Designer</option>
                    <option value="Developer">Developer</option>
                  </select>
                </div>
              </div>

              <div>
                <label>Status</label>
                <div className={styles.search_input}>
                  <CheckCircle />
                  <select
                    onChange={(e) => onFilterChange("status", e.target.value)}
                    value={filters.status}
                  >
                    <option value="">Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="On Leave">On Leave</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {/* Filters for Vehicles */}
          {context === "vehicles" && (
            <>
              <div>
                <label>Inspection Date</label>
                <div className={styles.search_input}>
                  <Calendar />
                  <input
                    type="date"
                    onChange={(e) => onFilterChange("inspectionDate", e.target.value)}
                    value={filters.inspectionDate}
                  />
                </div>
              </div>

              <div>
                <label>Display Name</label>
                <div className={styles.search_input}>
                  <Users />
                  <input
                    type="text"
                    placeholder="Enter Display Name..."
                    onChange={(e) => onFilterChange("displayName", e.target.value)}
                    value={filters.displayName}
                  />
                </div>
              </div>
            </>
          )}

          {/* Filters for Projects (Staff Name Search) */}
          {context === "projects" && (
            <>
              <div>
                <label>Staff Name</label>
                <div className={styles.search_input}>
                  <Users />
                  <input
                    type="text"
                    placeholder="Search by Staff Name..."
                    onChange={(e) => onFilterChange("staffName", e.target.value)}
                    value={filters.staffName}
                  />
                </div>
              </div>

              {/* <div>
                <label>Project Status</label>
                <div className={styles.search_input}>
                  <CheckCircle />
                  <select
                    onChange={(e) => onFilterChange("projectStatus", e.target.value)}
                    value={filters.projectStatus}
                  >
                    <option value="">Select Status</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                    <option value="On Hold">On Hold</option>
                  </select>
                </div>
              </div> */}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
