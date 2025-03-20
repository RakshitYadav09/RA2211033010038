// TrendingStuff.tsx
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {nanoid} from 'nanoid'
import {Post, Comments, Comment} from './types'

interface TrendingStuffProps {
  psts: Post[];
  cmts: Comments;
  setCmts: React.Dispatch<React.SetStateAction<Comments>>;
}

function TrendingStuff({psts, cmts, setCmts}: TrendingStuffProps) {
  const [trending, setTrending] = useState<Post[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchCmts = async () => {
      const tmpCmts = {...cmts}
      let maxCount = 0
      let tmpTrending: Post[] = []
      
      for (const p of psts) {
        if (!tmpCmts[p.id]) {
          try {
            const resp = await axios.get(`http://20.244.56.144/test/posts/${p.id}/comments`)
            tmpCmts[p.id] = resp.data.comments
          } catch {
            tmpCmts[p.id] = []
          }
        }
        
        const cmtCount = tmpCmts[p.id]?.length || 0
        
        if (cmtCount > maxCount) {
          maxCount = cmtCount
          tmpTrending = [p]
        } else if (cmtCount === maxCount && maxCount > 0) {
          tmpTrending.push(p)
        }
      }
      
      setCmts(tmpCmts)
      setTrending(tmpTrending)
      setLoading(false)
    }
    
    fetchCmts()
  }, [psts])

  if (loading) return <div>Finding trending posts...</div>

  return (
    <div>
      <h2>Trending Posts</h2>
      {trending.length > 0 ? (
        <div className="trending-container">
          {trending.map(post => (
            <div key={nanoid()} className="post-card" style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '15px',
              marginBottom: '15px',
              background: '#fff',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <h3>{post.content}</h3>
              <p>Post ID: {post.id}</p>
              <div className="comments-section">
                <h4>Comments ({cmts[post.id]?.length || 0})</h4>
                {cmts[post.id]?.map((cmt: Comment) => (
                  <div key={nanoid()} className="comment" style={{
                    padding: '8px',
                    margin: '5px 0',
                    background: '#f9f9f9',
                    borderRadius: '4px'
                  }}>
                    {cmt.content}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No trending posts found</p>
      )}
    </div>
  )
}

export default TrendingStuff
