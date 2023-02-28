import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Input, Space } from 'antd';
import { useTranslation, Trans } from 'react-i18next';

import HomeContentZhHant from '../../components/home/zh-Hant/HomeContentZhHant';
import HomeContentEn from '../../components/home/en/HomeContentEn';

import './home.css'

const { Search } = Input;

function Home() {

  const { t, i18n } = useTranslation();

  const contructHomeContent = () => {
    switch(i18n.language) {
      case "zh-Hant":
        return <HomeContentZhHant />;
      case "en":
        return <HomeContentEn />;
      default:
        return null;
    }
  }

  return (
    <div className="home-container">
      {
        contructHomeContent()
      }
      
    </div>
  )
}

export default Home
