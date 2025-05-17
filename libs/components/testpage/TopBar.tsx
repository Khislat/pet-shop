import React from 'react'
import styles from './TopBar.module.css'

const TopBar = () => {
  return (
    <div className={styles.topBarBackground}>
      <div className={styles.container}>
        <div className={styles.socialIcons} />
        <div className={styles.announcement}>
          Summer Sale Starts Now & Free Shipping Order Above $250
        </div>
        <div className={styles.contactInfo}>
          <span className={styles.contactNumber}>+07-254-4589-654</span>
          <span className={styles.separator}>|</span>
          <span className={styles.contactEmail}>Bowbow@support.com</span>
        </div>
      </div>
    </div>
  )
}

export default TopBar
