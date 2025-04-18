import React, { useState } from "react";
import dayjs from "dayjs";
import styles from "./ScheduleExist.module.scss";
import { Search, Home, List, Clock, MoreVertical, Bell, Calendar, Users, Truck, Folder } from 'lucide-react'


import { Plus } from "lucide-react";



const ScheduleExist = () => {


    return (
        <div>
            <div className={styles.projectWrapper}>
                <div className={styles.projectContainer}>
                    <div className={styles.projectInfo}>
                        <h3>XXX Dummy Project</h3>
                        <div className={styles.location}>
                            <Truck /> 145th Street, Tamwe Township, Yangon
                        </div>
                        <div className={styles.person}>
                            <Users /> Jack Hammer
                        </div>
                        <div className={styles.objectives}>
                            <Folder /> Objectives: 2
                        </div>
                    </div>

                    <div className={styles.taskList}>
                        {[...Array(2)].map((_, index) => (
                            <div className={styles.taskSection} key={index}>
                                <h4>Finish Paint work at XXX's building</h4>
                                <div className={styles.duration}>
                                    <span role="img" aria-label="calendar">📅</span> 01/07 days
                                </div>
                                <p className={styles.note}>
                                    <strong>Note:</strong> lorem ipsum lorem ipsum lorem ipsum
                                </p>
                                <div className={styles.taskIcons}>
                                    <div className={styles.circleList}>
                                        {[...Array(10)].map((_, i) => (
                                            <span className={styles.circle} key={i}></span>
                                        ))}
                                        <Plus className={`${styles.icon} ${styles.add}`} />
                                    </div>
                                    <div className={styles.circleList}>
                                        {[...Array(10)].map((_, i) => (
                                            <span className={styles.circle} key={i}></span>
                                        ))}
                                        <Folder className={`${styles.icon} ${styles.duplicate}`} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.taskList}>
                        {[...Array(2)].map((_, index) => (
                            <div className={styles.taskSection} key={index}>
                                <h4>Finish Paint work at XXX's building</h4>
                                <div className={styles.duration}>
                                    <span role="img" aria-label="calendar">📅</span> 01/07 days
                                </div>
                                <p className={styles.note}>
                                    <strong>Note:</strong> lorem ipsum lorem ipsum lorem ipsum
                                </p>
                                <div className={styles.taskIcons}>
                                    <div className={styles.circleList}>
                                        {[...Array(10)].map((_, i) => (
                                            <span className={styles.circle} key={i}></span>
                                        ))}
                                        <Plus className={`${styles.icon} ${styles.add}`} />
                                    </div>
                                    <div className={styles.circleList}>
                                        {[...Array(10)].map((_, i) => (
                                            <span className={styles.circle} key={i}></span>
                                        ))}
                                        <Folder className={`${styles.icon} ${styles.duplicate}`} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            <div className={styles.projectWrapper}>
                <div className={styles.projectContainer}>
                    <div className={styles.projectInfo}>
                        <h3>XXX Dummy Project</h3>
                        <div className={styles.location}>
                            <Truck /> 145th Street, Tamwe Township, Yangon
                        </div>
                        <div className={styles.person}>
                            <Users /> Jack Hammer
                        </div>
                        <div className={styles.objectives}>
                            <Folder /> Objectives: 2
                        </div>
                    </div>

                    <div className={styles.taskList}>
                        {[...Array(2)].map((_, index) => (
                            <div className={styles.taskSection} key={index}>
                                <h4>Finish Paint work at XXX's building</h4>
                                <div className={styles.duration}>
                                    <span role="img" aria-label="calendar">📅</span> 01/07 days
                                </div>
                                <p className={styles.note}>
                                    <strong>Note:</strong> lorem ipsum lorem ipsum lorem ipsum
                                </p>
                                <div className={styles.taskIcons}>
                                    <div className={styles.circleList}>
                                        {[...Array(10)].map((_, i) => (
                                            <span className={styles.circle} key={i}></span>
                                        ))}
                                        <Plus className={`${styles.icon} ${styles.add}`} />
                                    </div>
                                    <div className={styles.circleList}>
                                        {[...Array(10)].map((_, i) => (
                                            <span className={styles.circle} key={i}></span>
                                        ))}
                                        <Folder className={`${styles.icon} ${styles.duplicate}`} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.taskList}>
                        {[...Array(2)].map((_, index) => (
                            <div className={styles.taskSection} key={index}>
                                <h4>Finish Paint work at XXX's building</h4>
                                <div className={styles.duration}>
                                    <span role="img" aria-label="calendar">📅</span> 01/07 days
                                </div>
                                <p className={styles.note}>
                                    <strong>Note:</strong> lorem ipsum lorem ipsum lorem ipsum
                                </p>
                                <div className={styles.taskIcons}>
                                    <div className={styles.circleList}>
                                        {[...Array(10)].map((_, i) => (
                                            <span className={styles.circle} key={i}></span>
                                        ))}
                                        <Plus className={`${styles.icon} ${styles.add}`} />
                                    </div>
                                    <div className={styles.circleList}>
                                        {[...Array(10)].map((_, i) => (
                                            <span className={styles.circle} key={i}></span>
                                        ))}
                                        <Folder className={`${styles.icon} ${styles.duplicate}`} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>

    );
};

export default ScheduleExist;
