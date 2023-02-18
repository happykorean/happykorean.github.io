import './App.css'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'

import { ConfigProvider, Input } from 'antd';

import Home from './containers/home/Home'
//import KDrama from './component/KDrama/Kdrama'
//import Vocab from './component/Vocab/Vocab.js'
//import Dictionary from './component/Dictionary/Dictionary'
import SearchContainer from './containers/search/Search'
import Toppanel from './components/toppanel/Toppanel';

const HOMEROUTE = '/'
//const KDRAMAROUTE = '/kdrama/:name/:ep'
//const VOCABROUTE = '/vocab/:name'
//const DICTIONARYROUTE = '/dict/:vocab'
const SEARCHROUTE = '/search'

const { Search } = Input;

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#5f8ec3',
        },
      }}
    >
        <div className="App">
          <Toppanel />

          <div className="body">
            <Routes>
              <Route path={HOMEROUTE} element={<Home />} />
              <Route path={SEARCHROUTE} element={<SearchContainer />} />
            </Routes>
          </div>
          <div className="footer">
            <p>get-examples.com</p>
          </div>
        </div>
    </ConfigProvider>
  )
};
export default App
