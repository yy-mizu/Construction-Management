import { ImageIcon, MoreHorizontal } from 'lucide-react';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import styles from './EmployeeList.module.scss';

export default function EmployeeList({ employees = [], retirees = []  , activeList}) {

  return (
    <div className={styles.listing}>
 

      <div className={styles.listing_header}>
        <span><ImageIcon /></span>
        <span>Name</span>
        <span>Email</span>
        <span>Team</span>
        
        <span>Info</span>
      </div>

      <div className={styles.listing_body}>
        {activeList.map((person, index) => (
          <div key={index} className={styles.row}>
            <span>
              {/* <ImageIcon /> */}
              <img src={person.image || '/logos/image_20250103_14.png'} alt={person.name} />
            </span>
            <span>{person.name}</span>
            <span>{person.email}</span>
            <span>{person.team}</span>
          
            <span><MoreHorizontal /></span>
          </div>
        ))}
      </div>
    </div>
  );
}
