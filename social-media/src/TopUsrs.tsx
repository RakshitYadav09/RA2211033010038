// TopUsrs.tsx
import React, {useMemo} from 'react'
import {nanoid} from 'nanoid'
import {User, Post} from './types'

interface TopUsrsProps {
  usrs: User;
  psts: Post[];
}

function TopUsrs({usrs, psts}: TopUsrsProps) {
  const topUsrs = useMemo(() => {
    const counts: {[key: string]: number} = {}
    
    psts.forEach(p => {
      counts[p.userid] = (counts[p.userid] || 0) + 1
    })
    
    const sorted = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      
    return sorted
  }, [psts])

  return (
    <div>
      <h2>Top 5 Users</h2>
      <div className="cards-container" style={{display: 'flex', flexWrap: 'wrap', gap: '15px'}}>
        {topUsrs.map(([uid, count]) => (
          <div key={nanoid()} className="user-card" style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '15px',
            width: '200px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <img 
              src={`https://picsum.photos/seed/${uid}/100/100`} 
              alt="user" 
              style={{borderRadius: '50%', width: '60px', height: '60px'}}
            />
            <h3>{usrs[uid]}</h3>
            <p>{count} posts</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopUsrs
