import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { Input, Space } from 'antd';

import './toppanel.css'

const { Search } = Input;

function Toppanel() {

  const [mode, setMode] = useState("home")
  const navigate = useNavigate();

  useEffect(() => {
    console.log(window.location.pathname)
    if (window.location.pathname === '/') {
      setMode("home")
    } else {
      setMode("pages")
    }
  }, [window.location.pathname]);


  const onSearch = (value) => navigate(`/search?search=${value}&drama=soul`);


  if (mode === "home"){
    return (
      <div className="toppanel-component-container">
        <div className="App-header">
          <div>
            <div className='header'>Get Examples</div>
            {/* <div className=''>Learn languages through Netflix dramas today!</div> */}
            <div className=''>{`Select language > Input any keywords > Search from Netflix dramas!`}</div>
          </div>
          <div className="nav">
            <div className="nav-item">HOME</div>
            <div className="nav-item">
              <Link to="/vocab/squid_game">Vocab</Link>
            </div>
            <div className="nav-item">
              <Link to="/kdrama/squid_game/S01E01">KDrama</Link>
            </div>
            <div className="nav-item">
              <Link to="/dict/감다">Dictionary</Link>
            </div>
            <div className="nav-item">
              <Link to="/search">Search</Link>
            </div>
          </div>
        </div>

        <div className="container-search">
          <Search className="input-search" placeholder="input search text" size="large" onSearch={onSearch} enterButton />
          <Search className="input-search" placeholder="input search text" size="large" onSearch={onSearch} enterButton />
        </div>
      </div>
    )
  }

  return (
    <div className="toppanel-component-container pages">
      <div className="App-header">
        <div>
          <div className='header' onClick={() => navigate('/')}>Get Examples</div>
        </div>
        <div className="nav">
            <div className="nav-item">HOME</div>
            <div className="nav-item">
              <Link to="/vocab/squid_game">Vocab</Link>
            </div>
            <div className="nav-item">
              <Link to="/kdrama/squid_game/S01E01">KDrama</Link>
            </div>
            <div className="nav-item">
              <Link to="/dict/감다">Dictionary</Link>
            </div>
            <div className="nav-item">
              <Link to="/search">Search</Link>
            </div>
          </div>
      </div>

      <div className="container-search">
        <Search className="input-search" placeholder="input search text" onSearch={onSearch} enterButton />
        <Search className="input-search" placeholder="input search text" onSearch={onSearch} enterButton />
      </div>
    </div>
  )
}

export default Toppanel
