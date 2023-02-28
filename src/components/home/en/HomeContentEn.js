import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Input, Space, Col, Row } from 'antd';
import { CheckOutlined, StarOutlined, SearchOutlined, RiseOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next';

import '../homeContent.css'

function HomeContentEn() {
  const { i18n } = useTranslation();

  return (
    <div className="home-content-component">
      
      <div className="section">
        <Row align="middle">
          <Col span={12}><div className="center"><h1>Subtitles Searching is now open for KDramas!</h1><br/><i>More Dramas in other languages are Coming Soon!</i></div></Col>
          <Col span={12}><img width="200" src={`${window.location.origin}/images/img-method.png`} /></Col>
        </Row>
      </div>

      <div className="section">

        <Row align="middle">
          <Col span={12}><img width="200" src={`${window.location.origin}/images/img-pros.png`} /></Col>
          <Col span={12}>
            <div>
              <h1>3 Major Advantages of Get-Subtitles:</h1>
              <ul>
                <li><CheckOutlined /> Get plentiful examples in one click.</li>
                <li><CheckOutlined /> Understand how to use different phrases naturally.</li>
                <li><CheckOutlined /> Find out the phrases' frequency of usage in daily conversation.</li>
              </ul>
            </div>
          </Col>
        </Row>
      </div>

      <div className="section">
        <h1>How to Use</h1>
        <ol>
          <li>Input search keywords.</li>
          <li>Select the Drama you would like to search on.</li>
          <li>Select the translation language.</li>
          <li>Click "Search" <SearchOutlined /></li>
        </ol>
      </div>

      <div className="section">
        <Row align="middle">
          <Col span={12}>
            <div>
              <h1><StarOutlined /> Search Tips</h1>
              <ul>
                <li><CheckOutlined /> There are various verb conjugations in Korean, try to search with common conjugations, drop the "다" etc. to obtain more results!</li>
                <li><CheckOutlined /> E.g. <Link to={`/search?search=좋아하다&drama=lawyer&oriLang=kr&translateLang=${i18n.language}`}>"좋아하다"</Link>, you may search <Link to={`/search?search=좋아하&drama=lawyer&oriLang=kr&translateLang=${i18n.language}`}>"좋아하"</Link>, <Link to={`/search?search=좋아했&drama=lawyer&oriLang=kr&translateLang=${i18n.language}`}>"좋아했"</Link>, <Link to={`/search?search=좋아한&drama=lawyer&oriLang=kr&translateLang=${i18n.language}`}>"좋아한"</Link> etc.</li>
                <li><CheckOutlined /> You may make use of Naver Dictionary, or the online tool e.g. http://dongsa.net/ to get the verb conjugations.</li>
              </ul>
            </div>
          </Col>
          <Col span={12}><img width="200" src={`${window.location.origin}/images/img-tips.png`} /></Col>
        </Row>
      </div>

      <div className="section">
        <h1 className="center"><RiseOutlined /> Start to learn languages with Subtitles now!</h1>
      </div>
    </div>
  )
}

export default HomeContentEn
