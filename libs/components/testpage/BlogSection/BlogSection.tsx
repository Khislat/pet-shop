import React from 'react'
import styles from './BlogSection.module.css'

const BlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'The perfect range for pet products',
      date: 'Jan 12. 2023',
      excerpt: 'Proin venenatis fermentum sem porttitor dictum. Maecenas',
      image: 'https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-05-17/fBJasjrvUM.png'
    },
    {
      id: 2,
      title: 'Domesticated pets are complex creatures',
      date: 'Jan 18. 2023',
      excerpt: 'Duis arcu ligula, volutpat id leo vitae, tempor cursus dolor.',
      image: 'https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-05-17/BLkwtdQ8aJ.png'
    },
    {
      id: 3,
      title: 'A cat can jump as much as seven times',
      date: 'Feb 08. 2023',
      excerpt: 'Aliquam aliquet lorem a ligula porta, eu egestas massa',
      image: 'https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-05-17/YDvcuP4jDA.png'
    }
  ];

  return (
    <section className={styles.blogSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Latest News & Blog</h2>
          <div className={styles.decorationIcon} />
        </div>
        
        <p className={styles.sectionDescription}>
          Finibus arcu condimentum non. Nullam non iaculis quam. Aliquam ac 
          ultricies tellus, ac dapibus neque. Vivamus tellus magna.
        </p>
        
        <div className={styles.blogGrid}>
          {blogPosts.map(post => (
            <div key={post.id} className={styles.blogCard}>
              <div className={styles.blogImage} style={{ backgroundImage: `url(${post.image})` }}>
                <div className={styles.dateTag}>
                  <span>{post.date}</span>
                </div>
              </div>
              
              <div className={styles.blogContent}>
                <h3 className={styles.blogTitle}>{post.title}</h3>
                <p className={styles.blogExcerpt}>{post.excerpt}</p>
                
                <div className={styles.blogFooter}>
                  <div className={styles.readMore}>
                    <span className={post.id === 1 ? styles.readMoreActive : styles.readMoreText}>READ MORE</span>
                    <div className={post.id === 1 ? styles.readMoreLineActive : styles.readMoreLine} />
                  </div>
                  
                  <div className={styles.reviewsContainer}>
                    <div className={styles.reviewAvatars}>
                      <div className={styles.reviewAvatar1} />
                      <div className={styles.reviewAvatar2} />
                      <div className={styles.reviewAvatar3} />
                    </div>
                    <span className={styles.reviewCount}>+4 Review</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BlogSection
