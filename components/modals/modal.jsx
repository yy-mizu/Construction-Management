import styles from "./modal.module.scss";
export default function Modal({ isOpen, onClose, context }) {
    if (!isOpen) return null;
  
    return (
        <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <h2 className={styles.modalHeader}>Jack's Detail</h2>
          <div className={styles.profileSection}>
           

            <form className={styles.form}>

            <div className={styles.picRow}>

            <div className={styles.profileImage}></div>
            <div className={styles.profileActions}>
              <button className={styles.editProfile}>Edit Profile</button>
              <button className={styles.deleteProfile}>Delete Profile</button>
            </div>

            </div>

            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label>[Required] Full Name</label>
                <input type="text" value="sithuminhtet673@gmail.com" />
              </div>
              <div className={styles.inputGroup}>
                <label>[Required] Display Name</label>
                <input type="text" value="sithuminhtet673@gmail.com" />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label>Organization/ Team</label>
                <div className={styles.inputWithButton}>
                  <select>
                    <option>Team 1</option>
                    <option>Team 2</option>
                  </select>
                  <button className={styles.addButton}>+</button>
                </div>
              </div>
              <div className={styles.inputGroup}>
                <label>Enrollment Status</label>
                <select>
                  <option>Current Employee</option>
                  <option>Past Employee</option>
                </select>
              </div>
            </div>
            <div className={styles.userType}>
              <label>[Required] User Type</label>
              <div className={styles.checkboxGroup}>
                <label>
                  <input type="checkbox" defaultChecked /> Field Staff
                </label>
                <label>
                  <input type="checkbox" defaultChecked /> Administrator
                </label>
                <label>
                  <input type="checkbox" /> System Administrator
                </label>
              </div>
            </div>
            <div className={styles.actionButtons}>
              <button type="submit" className={styles.saveButton}>
                Save
              </button>
              <button type="button" className={styles.cancelButton} onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
          </div>
         
        </div>
      </div>
    );
  }
  