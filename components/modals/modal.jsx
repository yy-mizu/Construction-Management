// import styles from "./modal.module.scss";
// export default function Modal({ isOpen, onClose, context }) {
//     if (!isOpen) return null;

//     return (
//         <div className={styles.modalOverlay}>
//         <div className={styles.modalContent}>
//           <h2 className={styles.modalHeader}>Jack's Detail</h2>
//           <div className={styles.profileSection}>


//             <form className={styles.form}>

//             <div className={styles.picRow}>

//             <div className={styles.profileImage}></div>
//             <div className={styles.profileActions}>
//               <button className={styles.editProfile}>Edit Profile</button>
//               <button className={styles.deleteProfile}>Delete Profile</button>
//             </div>

//             </div>

//             <div className={styles.formRow}>
//               <div className={styles.inputGroup}>
//                 <label>[Required] Full Name</label>
//                 <input type="text" value="sithuminhtet673@gmail.com" />
//               </div>
//               <div className={styles.inputGroup}>
//                 <label>[Required] Display Name</label>
//                 <input type="text" value="sithuminhtet673@gmail.com" />
//               </div>
//             </div>
//             <div className={styles.formRow}>
//               <div className={styles.inputGroup}>
//                 <label>Organization/ Team</label>
//                 <div className={styles.inputWithButton}>
//                   <select>
//                     <option>Team 1</option>
//                     <option>Team 2</option>
//                   </select>
//                   <button className={styles.addButton}>+</button>
//                 </div>
//               </div>
//               <div className={styles.inputGroup}>
//                 <label>Enrollment Status</label>
//                 <select>
//                   <option>Current Employee</option>
//                   <option>Past Employee</option>
//                 </select>
//               </div>
//             </div>
//             <div className={styles.userType}>
//               <label>[Required] User Type</label>
//               <div className={styles.checkboxGroup}>
//                 <label>
//                   <input type="checkbox" defaultChecked /> Field Staff
//                 </label>
//                 <label>
//                   <input type="checkbox" defaultChecked /> Administrator
//                 </label>
//                 <label>
//                   <input type="checkbox" /> System Administrator
//                 </label>
//               </div>
//             </div>
//             <div className={styles.actionButtons}>
//               <button type="submit" className={styles.saveButton}>
//                 Save
//               </button>
//               <button type="button" className={styles.cancelButton} onClick={onClose}>
//                 Cancel
//               </button>
//             </div>
//           </form>
//           </div>

//         </div>
//       </div>
//     );
//   }


import styles from "./modal.module.scss";

export default function DynamicModal({ isOpen, onClose, context, data }) {
  if (!isOpen) return null;

  const renderContent = () => {
    switch (context) {
      case "employees":
        return (
          <>
            <h2 className={styles.modalHeader}>Employee Details</h2>
            <div className={styles.profileSection}>
              <div className={styles.picRow}>
                <div className={styles.profileImage}></div>
                <div className={styles.profileActions}>
                  <button className={styles.editProfile}>Edit Profile</button>
                  <button className={styles.deleteProfile}>Delete Profile</button>
                </div>
              </div>
              <form className={styles.form}>
                <div className={styles.formRow}>
                  <div className={styles.inputGroup}>
                    <label>Full Name</label>
                    <input type="text" defaultValue={data?.name || ""} />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Email</label>
                    <input type="email" defaultValue={data?.email || ""} />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.inputGroup}>
                    <label>Phone</label>
                    <input type="text" defaultValue={data?.phone || ""} />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Display Name</label>
                    <input type="text" defaultValue={data?.displayname || ""} />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.inputGroup}>
                    <label>Role</label>
                    <input type="text" defaultValue={data?.role || ""} />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Team</label>
                    <input type="text" defaultValue={data?.team || ""} />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Status</label>
                    <select defaultValue={data?.status || ""}>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Onleave">OnLeave</option>
                    </select>
                  </div>

                </div>


              </form>
            </div>
          </>
        );

      case "vehicles":
        return (
          <>
            <h2 className={styles.modalHeader}>Vehicle Details</h2>
            <div className={styles.picRow}>
              <div className={styles.profileImage}></div>
              <div className={styles.profileActions}>
                <button className={styles.editProfile}>Edit Profile</button>
                <button className={styles.deleteProfile}>Delete Profile</button>
              </div>
            </div>

            <form className={styles.form}>
              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label>Vehicle Name</label>
                  <input type="text" defaultValue={data?.vehiclename || ""} />
                </div>
                <div className={styles.inputGroup}>
                  <label>Vehicle Type</label>
                  <select defaultValue={data?.status || ""}>
                    <option value="Available">SUV</option>
                    <option value="In Use">Truck</option>
                    <option value="Under Maintenance">Pick Up</option>
                  </select>
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label>License Plate</label>
                  <input type="text" defaultValue={data?.team || ""} />
                </div>
                <div className={styles.inputGroup}>
                  <label>Status</label>
                  <select defaultValue={data?.status || ""}>
                    <option value="Available">Available</option>
                    <option value="In Use">In Use</option>
                    <option value="Under Maintenance">Under Maintenance</option>
                  </select>
                </div>
              </div>
            </form>
          </>
        );

      case "projects":
        return (
          <>
            <h2 className={styles.modalHeader}>Project Details</h2>

            <div className={styles.picRow}>
              <div className={styles.profileImage}></div>
              <div className={styles.profileActions}>
                <button className={styles.editProfile}>Edit Profile</button>
                <button className={styles.deleteProfile}>Delete Profile</button>
              </div>
            </div>

            <form className={styles.form}>
              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label>Business Partaner</label>
                  <input type="text" defaultValue={data?.partaner || ""} />
                </div>
                <div className={styles.inputGroup}>
                  <label>Customer Representative</label>
                  <input type="text" defaultValue={data?.customer || ""} />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label>Staff Name</label>
                  <input type="text" defaultValue={data?.staffname || ""} />
                </div>
                <div className={styles.inputGroup}>
                  <label>Side Address( City )</label>
                  <input type="text" defaultValue={data?.sideaddress || ""} />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label>Start Date</label>
                  <input type="date" defaultValue={data?.date || ""} />
                </div>
                <div className={styles.inputGroup}>
                  <label>End Date</label>
                  <input type="date" defaultValue={data?.date || ""} />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label>Status</label>
                  <select defaultValue={data?.status || ""}>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>
            </form>
          </>
        );

      default:
        return <p>Invalid context</p>;


      case "objective":
        return (
          <>
            <h2 className={styles.modalHeader}>Create Objective</h2>



            <form className={styles.form}>
              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label>Objective Name</label>
                  <input type="text" defaultValue={data?.objectiveName || ""} />
                </div>
                <div className={styles.inputGroup}>
                  <label>Date</label>
                  <input type="date" defaultValue={data?.date || ""} />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label>Note</label>
                  <input type="text" defaultValue={data?.note || ""} />
                </div>

              </div>


            </form>
          </>
        );


    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {renderContent()}
        <div className={styles.actionButtons}>
          <button type="submit" className={styles.saveButton}>Save</button>
          <button type="button" className={styles.cancelButton} onClick={onClose}>Cancel</button>

        </div>
      </div>
    </div>
  );
}

