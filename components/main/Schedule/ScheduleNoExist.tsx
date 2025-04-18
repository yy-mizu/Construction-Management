import React, { useState } from "react";
import dayjs from "dayjs";
import styles from "./ScheduleNoExist.module.scss";
import { Search, Home, List, Clock, MoreVertical, Bell, Calendar, Users, Truck, Folder } from 'lucide-react'


import { Plus } from "lucide-react";



const ScheduleNoExist = () => {


    return (
        <div>
            <div className={styles.input_projects}>
                <span>There are no ongoing projects for now</span>
            </div>
        </div>

    );
};

export default ScheduleNoExist;