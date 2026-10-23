import { RichText } from '@payloadcms/richtext-lexical/react'
import styles from './BlogPost.module.css'

export function BlogBody({ content }: { content: any }) {
  if (!content) return <p style={{ color: '#7A9AB5' }}>No content yet</p>
  return (
    <article className={styles.postBody}>
      <RichText data={content} />
    </article>
  )
}
