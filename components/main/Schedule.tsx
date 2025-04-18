import React, { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import styles from "./Schedule.module.scss";
import { Folder, Truck, Users, Plus } from "lucide-react";
import ScheduleExist from "./Schedule/ScheduleExist";
import ScheduleNoExist from "./Schedule/ScheduleNoExist";

type ScheduleItem = {
  date: string;
  title: string;
};

const dummySchedules: ScheduleItem[] = [
  { date: "2025-04-18", title: "Paint at XXX" },
  { date: "2025-04-19", title: "Site Check" },
];

const MonthView: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs());
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [hasSchedule, setHasSchedule] = useState<boolean>(false);

  useEffect(() => {
    const today = dayjs().format("YYYY-MM-DD");
    const hasTodayData = dummySchedules.some(sch =>
      dayjs(sch.date).isSame(today, "day")
    );
    setHasSchedule(hasTodayData);
  }, []);

  const getMonthDays = (): Dayjs[] => {
    const start = currentMonth.startOf("month");
    const daysInMonth = currentMonth.daysInMonth();
    return Array.from({ length: daysInMonth }, (_, i) =>
      start.add(i, "day")
    );
  };

  const handleDayClick = (day: Dayjs) => {
    setSelectedDate(day);
    const clickedHasSchedule = dummySchedules.some(sch =>
      dayjs(sch.date).isSame(day, "day")
    );
    setHasSchedule(clickedHasSchedule);
  };

  const handlePrevMonth = () => setCurrentMonth(prev => prev.subtract(1, "month"));
  const handleNextMonth = () => setCurrentMonth(prev => prev.add(1, "month"));

  return (
    <div>
      <div className={styles.monthContainer}>
        <div className={styles.header}>
          <button onClick={handlePrevMonth}>‹ Prev</button>
          <h3>{currentMonth.format("MMMM YYYY")}</h3>
          <button onClick={handleNextMonth}>Next ›</button>
        </div>

        <div className={styles.grid}>
          {getMonthDays().map((day, idx) => {
            const isToday = day.isSame(dayjs(), "day");
            const isScheduled = dummySchedules.some(sch =>
              dayjs(sch.date).isSame(day, "day")
            );
            const isSelected = selectedDate?.isSame(day, "day");

            return (
              <div
                key={idx}
                className={`${styles.day} 
                  ${isToday ? styles.today : ""} 
                  ${isScheduled ? styles.hasData : ""} 
                  ${isSelected ? styles.selected : ""}`}
                onClick={() => handleDayClick(day)}
              >
                <div className={styles["day-name"]}>{day.format("ddd")}</div>
                <div className={styles["day-number"]}>{day.format("D")}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.main}>
        <div className={styles.schedule_flex}>
          <div className={styles.nav_head}>
            <Folder />
            <span>Total Projects : 0</span>
          </div>
          <div className={styles.nav_head}>
            <Truck />
            <span>Vehicles Assigned : 0</span>
          </div>
          <div className={styles.nav_head}>
            <Users />
            <span>Staff Assigned : 0</span>
          </div>
        </div>
        <div className={styles.import_btn}>
          <Plus />
          <span>Add new project</span>
        </div>
      </div>

      <div>
        {hasSchedule ? <ScheduleExist /> : <ScheduleNoExist />}
      </div>
    </div>
  );
};

export default MonthView;
