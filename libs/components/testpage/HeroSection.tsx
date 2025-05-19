import React from 'react'
import Image from 'next/image'
import styles from './HeroSection.module.css'

const HeroSection = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroBackground}>
        <div className={styles.container}>
          <div className={styles.qualityBadge}>
            <div className={styles.badgeIcon} />
            <span className={styles.badgeText}>Best Quality</span>
          </div>
          
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              <span className={styles.discountPercent}>40% Off</span>
              <span className={styles.discountDescription}>Dogs healthy foods</span>
            </h1>
            
            <p className={styles.heroDescription}>
              Quisque nec nisi ut velit bibendum interdum non in nulla. Integerquis
              aliquet mi. Curabitur sit amet dui quis ante tincidunt Quisque nec
              nisi ut velit.
            </p>
            
            <div className={styles.heroActions}>
              <button className={styles.shopButton}>
                SHOP NOW
                <span className={styles.buttonIcon} />
              </button>
              
              <div className={styles.reviewsContainer}>
                <div className={styles.reviewAvatars}>
                  <div className={styles.avatar1} />
                  <div className={styles.avatar2} />
                  <div className={styles.avatar3} />
                  <div className={styles.avatar4} />
                </div>
                <div className={styles.reviewsInfo}>
                  <span className={styles.reviewsCount}>1k+</span>
                  <span className={styles.reviewsText}>Client Reviews</span>
                </div>
              </div>
            </div>
            
            <div className={styles.pagination}>
              <div className={styles.paginationPrev} />
              <span className={styles.paginationText}>1/4</span>
              <div className={styles.paginationNext} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
