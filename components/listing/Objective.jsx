// pages/objectives.tsx

import React from 'react';
// import ScheduleExist from '../main/Schedule/ScheduleExist';
import styles from '../listing/Objective.module.scss'
import { Search, Home, List, Clock, MoreVertical, Bell, Calendar, Users, Truck, Folder, Plus } from 'lucide-react'


const ObjectivesPage = () => {
    return (
        <div>
            <div className={styles.projectWrapper}>
                <div className={styles.projectContainer}>


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
                                        <span><Truck/> :0</span>
                                        <span><Users/> : 0 </span>
                                    </button>
                                </div>

                                <div>
                                    <h4>hello</h4>
                                </div>

                            </div>
                        ))}


                    </div>
                </div>
            </div>
        </div>
    );
};

export default ObjectivesPage; 
