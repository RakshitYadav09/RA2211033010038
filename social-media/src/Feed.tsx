// Feed.tsx
import React, {useState, useEffect} from 'react'
import {nanoid} from 'nanoid'
import {User, Post} from './types'

interface FeedProps {
  psts: Post[];
  usrs: User;
}

function Feed({psts, usrs}: FeedProps) {
  const [feed, setFeed] = useState<Post[]>([])
  
  useEffect(() => {
    const sortedPsts = [...psts].sort((a, b) => b.id - a.id)
    setFeed(sortedPsts)
    
    const timer = setInterval(() => {
      setFeed(old => {
        if (old.length === 0) return old
        
        const randomUid = Object.keys(usrs)[Math.floor(Math.random() * Object.keys(usrs).length)]
        const newId = Math.max(...old.map(p => p.id)) + 1
        
        const newPost: Post = {
          id: newId,
          userid: randomUid,
          content: `New post ${Math.random().toString(36).substring(2, 7)}`
        }
        
        return [newPost, ...old]
      })
    }, 8000)
    
    return () => clearInterval(timer)
  }, [psts, usrs])

  return (
    <div>
      <h2>Live Feed</h2>
      <div className="feed-container">
        {feed.map(post => (
          <div key={nanoid()} className="feed-item" style={{
            display: 'flex',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '15px',
            marginBottom: '15px',
            background: '#fff'
          }}>
            <div className="user-img" style={{marginRight: '15px'}}>
              <img 
                src={`https://picsum.photos/seed/${post.userid}/50/50`} 
                alt="user" 
                style={{borderRadius: '50%', width: '50px', height: '50px'}}
              />
            </div>
            <div className="post-content">
              <h4>{usrs[post.userid]}</h4>
              <p>{post.content}</p>
              <div className="post-meta" style={{fontSize: '0.8rem', color: '#888'}}>
                Post ID: {post.id}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Feed
