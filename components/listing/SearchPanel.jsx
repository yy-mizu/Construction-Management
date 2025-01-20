import { Filter, Users, Briefcase, CheckCircle, Search } from 'lucide-react';
import styles from './SearchPanel.module.scss';

export default function SearchPanel({ onSearch }) {
  return (
    <div className={styles.search_panel}>
      <div className={styles.search_inner}>
        <div className={styles.search_keyword}>
          <Search className={styles.magnifying_glass} />
          <input type="text" placeholder="Keyword Search..." />
        </div>

        <div className={styles.search_input_container}>
          <p><Filter /> Please set the filtering conditions</p>

          <div>
            <label>Team</label>
            <div className={styles.search_input}>
              <Users />
              <select>
                <option value="">Select Team</option>
                <option value="teamA">Team A</option>
                <option value="teamB">Team B</option>
                <option value="teamC">Team C</option>
              </select>
            </div>
          </div>

          <div>
            <label>Role</label>
            <div className={styles.search_input}>
              <Briefcase />
              <select>
                <option value="">Select Role</option>
                <option value="manager">Manager</option>
                <option value="developer">Developer</option>
                <option value="designer">Designer</option>
              </select>
            </div>
          </div>

          <div>
            <label>Status</label>
            <div className={styles.search_input}>
              <CheckCircle />
              <select>
                <option value="">Select Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="on_leave">On Leave</option>
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
          </div>

          <div>
            <label>Status</label>
            <div className={styles.search_input}>
              <CheckCircle />
              <select>
                <option value="">Select Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="on_leave">On Leave</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
