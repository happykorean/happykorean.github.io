import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Input, Space, Col, Row } from 'antd';
import { CheckOutlined, StarOutlined, SearchOutlined, RiseOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next';

import '../homeContent.css'

function HomeContentZhHant() {
  const { i18n } = useTranslation();

  return (
    <div className="home-content-component">
      
      <div className="section">
        <Row align="middle">
          <Col span={12}><h1>Netflix 韓劇字幕搜尋功能<br/>率先開放！</h1></Col>
          <Col span={12}><img width="200" src={`${window.location.origin}/images/img-method.png`} /></Col>
        </Row>
      </div>

      <div className="section">

        <Row align="middle">
          <Col span={12}><img width="200" src={`${window.location.origin}/images/img-pros.png`} /></Col>
          <Col span={12}>
            <div>
              <h1>Get-Subtitles 劇集例句搜尋器的三大好處：</h1>
              <ul>
                <li><CheckOutlined /> 一次過獲得大量有趣真實的例句，比字典中的生硬例句更易懂</li>
                <li><CheckOutlined /> 了解單詞/詞組在日常用語中的頻繁程度</li>
                <li><CheckOutlined /> 搜尋曾經看過的劇集，腦海馬上浮現各種恰當的使用場景！</li>
              </ul>
            </div>
          </Col>
        </Row>
      </div>

      <div className="section">
        <h1>使用方法</h1>
        <ol>
          <li>輸入關鍵字</li>
          <li>選擇劇集</li>
          <li>選擇翻譯語言</li>
          <li>按「搜尋」<SearchOutlined /></li>
        </ol>
      </div>

      <div className="section">
        <Row align="middle">
          <Col span={12}>
            <div>
              <h1><StarOutlined /> 搜尋貼士</h1>
              <ul>
                <li><CheckOutlined /> 韓語詞形變化很多，搜索時可以嘗試使用各種詞形、省略「다」，便可獲得更多搜尋結果！</li>
                  <li><CheckOutlined /> 例如 <Link to={`/search?search=좋아하다&drama=lawyer&oriLang=kr&translateLang=${i18n.language}`}>「좋아하다」</Link>可以搜尋<Link to={`/search?search=좋아하&drama=lawyer&oriLang=kr&translateLang=${i18n.language}`}>「좋아하」</Link>、<Link to={`/search?search=좋아했&drama=lawyer&oriLang=kr&translateLang=${i18n.language}`}>「좋아했」</Link>、<Link to={`/search?search=좋아한&drama=lawyer&oriLang=kr&translateLang=${i18n.language}`}>「좋아한」</Link>等</li>
                <li><CheckOutlined /> 詞形變化可以從Naver字典、網上工具如：http://dongsa.net/ 等找到</li>
              </ul>
            </div>
          </Col>
          <Col span={12}><img width="200" src={`${window.location.origin}/images/img-tips.png`} /></Col>
        </Row>
      </div>

      <div className="section">
        <h1><RiseOutlined /> 現在開始邊追劇、邊學語言吧！</h1>
      </div>
    </div>
  )
}

export default HomeContentZhHant
