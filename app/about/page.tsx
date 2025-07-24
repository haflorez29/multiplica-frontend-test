import styles from "./about.module.css"

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>About This Project</h1>
        <p className={styles.description}>
          This is a demonstration of Next.js 14 with React 19, showcasing the power of CSS Modules for component-scoped
          styling.
        </p>

        <div className={styles.techStack}>
          <h2 className={styles.sectionTitle}>Technology Stack</h2>
          <ul className={styles.techList}>
            <li className={styles.techItem}>Next.js 14 with App Router</li>
            <li className={styles.techItem}>React 19</li>
            <li className={styles.techItem}>TypeScript</li>
            <li className={styles.techItem}>CSS Modules</li>
          </ul>
        </div>

        <a href="/" className={styles.backLink}>
          ← Back to Home
        </a>
      </div>
    </div>
  )
}
