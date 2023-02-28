import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { ConfigProvider, Input } from 'antd';
import { useTranslation, Trans } from 'react-i18next';

import Home from './containers/home/Home'
//import KDrama from './component/KDrama/Kdrama'
//import Vocab from './component/Vocab/Vocab.js'
//import Dictionary from './component/Dictionary/Dictionary'
import SearchContainer from './containers/search/Search'
import Toppanel from './components/toppanel/Toppanel';

import './App.css'

const HOMEROUTE = '/'
//const KDRAMAROUTE = '/kdrama/:name/:ep'
//const VOCABROUTE = '/vocab/:name'
//const DICTIONARYROUTE = '/dict/:vocab'
const SEARCHROUTE = '/search'

function App() {

  const { t, i18n } = useTranslation();

  useEffect(() => {
    // on enter page
    const savedPageLang = localStorage.getItem("pageLang");
    if (savedPageLang) {
      i18n.changeLanguage(savedPageLang);
    }
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#3f51b5', //'#5f8ec3',
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
            <div><small>Last updated on: 28th February 2023</small></div>
            <div><small>getsubtitles.contact@gmail.com</small></div>
          </div>
        </div>
    </ConfigProvider>
  )
};
export default App
