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

export default function SearchPanel({
  onSearch,
  onFilterChange,
  filters,
  context,
}) {
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
              context === "employees" ? "Employees" : "Vehicles"
            }...`}
            onChange={onSearch}
          />
        </div>

        <div className={styles.search_input_container}>
          {Object.values(filters).some((value) => value) ? (
            <div className={styles.selected_filters}>
              {renderSelectedFilters()}
            </div>
          ) : (
            <p>
              <Filter /> Please set the filtering conditions
            </p>
          )}

          <div>
            <label>Team</label>
            <div className={styles.search_input}>
              <Users />
              <select
                onChange={(e) => onFilterChange("team", e.target.value)}
                value={filters.team}
              >
                <option value="">Select Team</option>
                <option value="Team-One">Team-One</option>
                <option value="Team-Two">Team-Two</option>
              </select>
            </div>
          </div>

          {/* <div>
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

          <div>
            <label>Assigned Tasks</label>
            <div className={styles.search_input}>
              <CheckCircle />
              <select>
                <option value="">Select Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="on_leave">On Leave</option>
              </select>
            </div>
          </div> */}
          {/* Dynamic Filters */}
          {context === "employees" && (
            <>
              <div>
                <label>Role</label>
                <div className={styles.search_input}>
                  <Users />
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
                  <Users />
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

          {context === "vehicles" && (
            <>
              <div>
                <label>Inspection Date</label>
                <div className={styles.search_input}>
                  <Calendar />
                  <input
                    type="date"
                    onChange={(e) =>
                      onFilterChange("inspectionDate", e.target.value)
                    }
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
                    onChange={(e) =>
                      onFilterChange("displayName", e.target.value)
                    }
                    value={filters.displayName}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
