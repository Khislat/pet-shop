import React from 'react'
import styles from './TestimonialsSection.module.css'

const TestimonialsSection = () => {
  return (
    <section className={styles.testimonialsSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Our Customer Says</h2>
          <div className={styles.decorationIcon} />
        </div>
        
        <div className={styles.testimonialLayout}>
          <div className={styles.leftImage}>
            <div className={styles.quoteIcon} />
          </div>
          
          <div className={styles.testimonialContent}>
            <p className={styles.testimonialText}>
              Nunc in mollis lorem, eget gravida ex. Nulla id leo nibh. Duis
              volutpat magna nunc, vel dapibus metus luctus Nulla in nisl sit amet
              ex dictum mollis. Curabitur ultricies odio turpis, a ullamcorper
              mauris posuere Integer vestibulum sem in nulla fermentum vulputate.
              Morbi ipsum nunc.
            </p>
            
            <div className={styles.testimonialAuthor}>
              <span className={styles.authorName}>Jhon Wick</span>
              <span className={styles.authorRole}> - Manager</span>
            </div>
          </div>
          
          <div className={styles.rightImages}>
            <div className={styles.singleImage} />
            <div className={styles.moreImages}>
              <span className={styles.moreCount}>+5</span>
            </div>
          </div>
        </div>
        
        <div className={styles.pagination} />
      </div>
    </section>
  )
}

export default TestimonialsSection
