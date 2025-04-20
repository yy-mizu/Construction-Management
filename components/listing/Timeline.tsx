import React, { useState } from 'react'
import styles from './Timeline.module.scss'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import dayjs, { Dayjs } from 'dayjs'
import Navbar from '../utils/Navbar'

const Timeline = () => {
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'today'>('month')
  const [viewBy, setViewBy] = useState<'projects' | 'staff' | 'vehicles'>('projects')
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs())

  const handlePrev = () => {
    setCurrentDate(prev =>
      viewMode === 'month'
        ? prev.subtract(1, 'month')
        : viewMode === 'week'
        ? prev.subtract(1, 'week')
        : prev.subtract(1, 'day')
    )
  }

  const handleNext = () => {
    setCurrentDate(prev =>
      viewMode === 'month'
        ? prev.add(1, 'month')
        : viewMode === 'week'
        ? prev.add(1, 'week')
        : prev.add(1, 'day')
    )
  }

  const days = viewMode === 'month'
    ? Array.from({ length: currentDate.daysInMonth() }, (_, i) =>
        currentDate.startOf('month').add(i, 'day')
      )
    : viewMode === 'week'
    ? Array.from({ length: 7 }, (_, i) =>
        currentDate.startOf('week').add(i, 'day')
      )
    : [currentDate]

  const dummyData = {
    projects: ['Foundation Setup', 'Concrete Work'],
    staff: ['Jack Hammer', 'Emily Stone'],
    vehicles: ['Crane A', 'Truck B']
  }

  const list = dummyData[viewBy]

  return (
    <div className={styles.mainTimelineContainer}>
      <Navbar />
      <div className={styles.timelineContainer}>
        {/* Top Bar */}
        <div className={styles.topBar}>
          <div className={styles.viewBy}>
            <span>View By:</span>
            {['projects', 'staff', 'vehicles'].map(type => (
              <button
                key={type}
                className={viewBy === type ? styles.active : ''}
                onClick={() => setViewBy(type as any)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          <div className={styles.monthNav}>
            <ChevronLeft onClick={handlePrev} />
            <span>{currentDate.format('MMMM, YYYY')}</span>
            <ChevronRight onClick={handleNext} />
          </div>

          <div className={styles.modeSwitch}>
            {['today', 'week', 'month'].map(mode => (
              <button
                key={mode}
                className={viewMode === mode ? styles.active : ''}
                onClick={() => setViewMode(mode as any)}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Grid */}
        <div className={styles.timelineGrid}>
          {/* Sidebar */}
          <div className={styles.sidebar}>
            <div className={styles.staffHeader}>
              <span>{viewBy.charAt(0).toUpperCase() + viewBy.slice(1)} List</span>
              <span>{list.length}</span>
            </div>
            {list.map((item, index) => (
              <div key={index} className={styles.staffRow}>
                <div className={styles.avatar}></div>
                <span className={styles.staffName}>{item}</span>
              </div>
            ))}
          </div>

          {/* Grid with Days */}
          <div className={styles.days}>
            {/* Blue Today Line */}
            {viewMode !== 'today' && (
              <div
                className={styles.todayLine}
                style={{
                  left: `${(dayjs().diff(currentDate.startOf(viewMode), 'day')) * 40}px`
                }}
              />
            )}

            {/* Days Header */}
            <div className={styles.daysRow}>
              {days.map((day, index) => (
                <div key={index} className={styles.dayBox}>
                  <div className={styles.dayLetter}>
                    {day.format('dd')[0]}
                  </div>
                  <div className={styles.dayNumber}>{day.format('D')}</div>
                </div>
              ))}
            </div>

            {/* Schedule Blocks */}
            {list.map((_, rowIdx) => (
              <div key={rowIdx} className={styles.scheduleRow}>
                {days.map((day, dayIdx) => {
                  const isActive = viewMode === 'month' && day.date() <= 8
                  return (
                    <div
                      key={dayIdx}
                      className={`${styles.scheduleBlock} ${isActive ? styles.activeBlock : ''}`}
                    />
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Timeline
