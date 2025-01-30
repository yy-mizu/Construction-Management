// pages/calendar.js
import { useState } from 'react';
import styles from './Calendar.module.scss';

const Calendar = () => {
  const [currentDate] = useState(new Date(2025, 0, 1)); // January 2025
  const [selectedProject, setSelectedProject] = useState(null);
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Dummy project data
  const projects = [{
    id: 1,
    name: 'Site Foundation Work',
    start: new Date(2025, 0, 25),
    end: new Date(2025, 0, 30),
    manager: 'John Doe',
    status: 'In Progress'
  }];

  const generateCalendarDates = (date) => {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const startDay = startOfMonth.getDay();
    const startDate = new Date(startOfMonth);
    startDate.setDate(startDate.getDate() - startDay);

    const dates = [];
    for (let i = 0; i < 42; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      dates.push(currentDate);
    }
    return dates;
  };

  const isProjectDate = (date) => {
    return projects.some(project => 
      date >= project.start && date <= project.end
    );
  };

  const handleDateClick = (date) => {
    if (isProjectDate(date)) {
      setSelectedProject(projects[0]);
    }
  };

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.header}>
        <h2 className={styles.monthTitle}>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
      </div>

      <div className={styles.dayHeaders}>
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
          <div key={index} className={styles.dayHeader}>{day}</div>
        ))}
      </div>

      <div className={styles.grid}>
        {generateCalendarDates(currentDate).map((date, index) => {
          const isCurrentMonth = date.getMonth() === currentDate.getMonth();
          const isProjectDay = isProjectDate(date);
          
          return (
            <div
              key={index}
              onClick={() => handleDateClick(date)}
              className={`${styles.cell} 
                ${isCurrentMonth ? styles.currentMonth : ''}
                ${isProjectDay ? styles.projectDay : ''}`}
            >
              <div className={styles.date}>{date.getDate()}</div>
              {isProjectDay && <div className={styles.projectDot} />}
            </div>
          );
        })}
      </div>

      {selectedProject && (
        <div className={styles.projectModal}>
          <div className={styles.modalContent}>
            <button 
              className={styles.closeButton}
              onClick={() => setSelectedProject(null)}
            >
              ×
            </button>
            <h3>{selectedProject.name}</h3>
            <div className={styles.details}>
              <p>Status: {selectedProject.status}</p>
              <p>Project Manager: {selectedProject.manager}</p>
              <p>Duration: {selectedProject.start.toDateString()} - {selectedProject.end.toDateString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;