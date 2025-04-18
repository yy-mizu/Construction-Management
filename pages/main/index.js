import React from 'react'
import MainLayout from "@/components/layouts/MainLayout.jsx";
import Calendar from "../../components/main/Calender";
import Schedule from "../../components/main/Schedule"
import styles from "@/components/layouts/ListingLayout.module.scss";
export default function Main() {
  return (
    <>
        <MainLayout>

        <div className={styles.content_wrapper}>
              {/* <Calendar/> */}

              <Schedule/>
          </div>

        </MainLayout>
    </>

  )
}
