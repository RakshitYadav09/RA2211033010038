// App.tsx
import React, {useState, useEffect} from 'react'
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import axios from 'axios'
import {lazy, Suspense} from 'react'
import {User, Post, Comments} from './types'

const TopUsrs = lazy(() => import('./TopUsrs'))
const TrendingStuff = lazy(() => import('./TrendingStuff'))
const Feed = lazy(() => import('./Feed'))

function App() {
  const [usrs, setUsrs] = useState<User>({})
  const [psts, setPsts] = useState<Post[]>([])
  const [cmts, setCmts] = useState<Comments>({})
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const getStuff = async () => {
      try {
        const usrResp = await axios.get('http://20.244.56.144/test/users')
        setUsrs(usrResp.data.users)
        
        let allPsts: Post[] = []
        
        for (const id in usrResp.data.users) {
          const pstResp = await axios.get(`http://20.244.56.144/test/users/${id}/posts`)
          allPsts = [...allPsts, ...pstResp.data.posts]
        }
        
        setPsts(allPsts)
        setLoading(false)
      } catch (err) {
        console.log('boom:', err)
        setLoading(false)
      }
    }
    
    getStuff()
  }, [])

  return (
    <BrowserRouter>
      <div className="app-container" style={{display: 'flex'}}>
        <div className="sidebar" style={{width: '200px', background: '#f0f0f0', padding: '20px', height: '100vh'}}>
          <h2>Social Analytics</h2>
          <ul style={{listStyleType: 'none', padding: 0}}>
            <li style={{margin: '10px 0'}}><Link to="/top-users">Top Users</Link></li>
            <li style={{margin: '10px 0'}}><Link to="/trending">Trending Posts</Link></li>
            <li style={{margin: '10px 0'}}><Link to="/feed">Feed</Link></li>
          </ul>
        </div>
        
        <div className="content" style={{flex: 1, padding: '20px'}}>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <Suspense fallback={<div>Loading page...</div>}>
              <Routes>
                <Route path="/top-users" element={<TopUsrs usrs={usrs} psts={psts} />} />
                <Route path="/trending" element={<TrendingStuff psts={psts} cmts={cmts} setCmts={setCmts} />} />
                <Route path="/feed" element={<Feed psts={psts} usrs={usrs} />} />
                <Route path="/" element={<div>Welcome! Select an option from the sidebar.</div>} />
              </Routes>
            </Suspense>
          )}
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
