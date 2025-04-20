import React, { useState } from 'react';
import styles from '../listing/Objective.module.scss';
import { Users, Truck, Pencil, Trash2, Plus } from 'lucide-react';
import Modal from '../modals/modal'; // Update this path if needed

const ObjectivesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContext, setModalContext] = useState(null);

  const handleOpenModal = (context, string) => {
    setModalContext(context);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContext(null);
  };

  return (
    <div>
      <div className={styles.projectWrapper}>
        <div className={styles.buttonContaner}>
          <button className={styles.objectiveBtn}>
            <span>4 Objectives</span>
          </button>
          <button className={styles.importBtn} onClick={() => handleOpenModal("objective")}>
            <Plus />
            <span>Create Object</span>
          </button>
        </div>

        <div className={styles.taskList}>
          {[...Array(2)].map((_, index) => (
            <div className={styles.taskSection} key={index}>
              <div>
                <h4>Finish Paint work at XXX's building</h4>
                <div className={styles.duration}>
                  <span role="img" aria-label="calendar">📅</span> 01/07 days
                </div>
                <p className={styles.note}>
                  <strong>Note:</strong> lorem ipsum lorem ipsum lorem ipsum
                </p>
              </div>

              <div className={styles.objectiveStatus}>
                <span>status : incomplete</span>
                <span>priority : </span>
                <button className={styles.objectiveTask}>
                  <span><Truck /> :0</span>
                  <span><Users /> : 0 </span>
                </button>
              </div>

              <div className={styles.editDelete}>
                <span><Pencil /></span>
                <span><Trash2 /></span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.taskList}>
          {[...Array(2)].map((_, index) => (
            <div className={styles.taskSection} key={index}>
              <div>
                <h4>Finish Paint work at XXX's building</h4>
                <div className={styles.duration}>
                  <span role="img" aria-label="calendar">📅</span> 01/07 days
                </div>
                <p className={styles.note}>
                  <strong>Note:</strong> lorem ipsum lorem ipsum lorem ipsum
                </p>
              </div>

              <div className={styles.objectiveStatus}>
                <span>status : incomplete</span>
                <span>priority : </span>
                <button className={styles.objectiveTask}>
                  <span><Truck /> :0</span>
                  <span><Users /> : 0 </span>
                </button>
              </div>

              <div className={styles.editDelete}>
                <span><Pencil /></span>
                <span><Trash2 /></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for creating objective */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        context={modalContext}
      />
    </div>
  );
};

export default ObjectivesPage;
