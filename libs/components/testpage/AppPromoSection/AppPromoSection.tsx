import React from 'react'
import Image from 'next/image'
import styles from './AppPromoSection.module.css'

const AppPromoSection = () => {
  return (
    <section className={styles.appPromoSection}>
      <div className={styles.container}>
        <div className={styles.leftContent}>
          <div className={styles.circleOuter}>
            <div className={styles.circleMiddle}>
              <div className={styles.circleInner} />
            </div>
          </div>
        </div>
        
        <div className={styles.rightContent}>
          <h2 className={styles.sectionTitle}>
            Our Petshop at your hand
          </h2>
          
          <h3 className={styles.appTitle}>
            Download Our Petshop App
          </h3>
          
          <p className={styles.appDescription}>
            Sed sit amet neque faucibus arcu porta commodo. Proin egestas enim
            ac sapien luctus tincidunt. Aliquam diam ligula finibus eget
            faucibus dignissim rhoncus id risus. Cras feugiat elit urna Ut
            sodales massa aliquet.
          </p>
          
          <div className={styles.appStoreButtons} />
        </div>
      </div>
    </section>
  )
}

export default AppPromoSection
