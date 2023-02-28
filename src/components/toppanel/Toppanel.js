import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { useParams, useSearchParams } from 'react-router-dom'
import { Input, Dropdown, Space, Button } from 'antd';
import { SearchOutlined, PlaySquareOutlined, CaretDownOutlined, PlayCircleOutlined, DesktopOutlined, DownOutlined } from '@ant-design/icons';
import ReactFlagsSelect, { Us, Kr, Fr, Hk, Tw, Id, Th } from "react-flags-select";
import { useTranslation, Trans } from 'react-i18next';
import moment from 'moment';

import * as DramaList from '../../config/dramaList.json';
import { getDramaName } from '../../utils/common';

import './toppanel.css'

const { Search } = Input;

function Toppanel() {

  const [mode, setMode] = useState("home")
  const [drama, setDrama] = useState('lawyer')
  const [search, setSearch] = useState('')
  const [oriLang, setOriLang] = useState('kr')
  const [translateLang, setTranslateLang] = useState('en')

  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const queryParameters = new URLSearchParams(window.location.search)
  const dramaQuery = queryParameters.get("drama")
  const searchQuery = queryParameters.get("search")
  const oriLangQuery = queryParameters.get("oriLang")
  const translateLangQuery = queryParameters.get("translateLang")

  const menuItemsChangePageLang = [
    { label: "English", key: 'en' },
    { label: "繁體中文", key: 'zh-Hant' },
    { label: `${t("other")} (Coming soon)`, key: 'other', disabled: true },
  ]

  const menuItemsOriLang = [
    /* { label: (<div className="ori-lang-choice"><Us/ > <div className="text">English</div></div>), key: 'en' }, */
    { label: (<div className="ori-lang-choice"><Kr/ > <div className="text">{t("korean")}</div></div>), key: 'kr' },
    /* { label: (<div className="ori-lang-choice"><Fr/ > <div className="text">French</div></div>), key: 'fr' }, */
    { label: `${t("other")} (Coming soon)`, key: 'other', disabled: true },
  ];
  
  const menuItemsTransLang = [
    { label: (<div className="ori-lang-choice"><Us/ > <div className="text">{t("en")}</div></div>), key: 'en' },
    { label: (<div className="ori-lang-choice"><Hk/ > <div className="text">{t("zh-Hant")}</div></div>), key: 'zh-Hant' },
    /* { label: (<div className="ori-lang-choice"><Tw/ > <div className="text">繁體中文 (台灣)</div></div>), key: 'zh-Hant' }, */
    { label: (<div className="ori-lang-choice"><Id/ > <div className="text">{t("id")}</div></div>), key: 'id' },
    { label: (<div className="ori-lang-choice"><Th/ > <div className="text">{t("th")}</div></div>), key: 'th' },
    { label: `${t("other")} (Coming soon)`, key: 'other', disabled: true },
  ];

  useEffect(() => {
    if (window.location.pathname === '/') {
      setMode("home")
    } else {
      setMode("pages")
    }
  }, [window.location.pathname]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    if (dramaQuery) setDrama(dramaQuery)
  }, [dramaQuery]);

  useEffect(() => {
    if (searchQuery) setSearch(searchQuery)
  }, [searchQuery]);

  useEffect(() => {
    if (oriLangQuery) setOriLang(oriLangQuery)
  }, [oriLangQuery]);

  useEffect(() => {
    if (translateLangQuery) setTranslateLang(translateLangQuery)
  }, [translateLangQuery]);

  const onSearch = () => {
    if (search && search.replace(' ', '') !== ''){
      navigate(`/search?search=${search}&drama=${drama}&oriLang=${oriLang}&translateLang=${translateLang}`);
      //window.open(`/search?search=${search}&drama=${drama}&oriLang=${oriLang}&translateLang=${translateLang}`, '_self');
    }
  }

  const onChangePageLangClick = ({key}) => {
    changeLanguage(key);
    localStorage.setItem('pageLang', key);
  };

  const onClick = ({ key }) => setDrama(key);
  
  const onOriLangClick = ({key}) => setOriLang(key);

  const onTranslateLangClick = ({ key }) => setTranslateLang(key);

  const showFlagByKey = (key) => {
    switch(key) {
      case "en":
        return <Us />;
      case "kr":
        return <Kr />;
      case "zh-Hant":
        return <Hk />;
      case "id":
        return <Id />;
      case "th":
        return <Th />;
      
      case "fr":
        return <Fr />;
      case "tw":
        return <Tw />;
      default:
        return key;
    }
  }

  return (
    <div className={`toppanel-component-container ${mode}`}>
      <div className="App-header">
        <div>
          <div className='header' onClick={()=>navigate('/')}>{/* <img width="40" src={`${window.location.origin}/logo_white.png`} /> */} Get-Subtitles <span className="beta">beta</span></div>
          <div className='sub-header'>{t("header-subheader")}</div>
        </div>
        <div className="nav">
          {/* <div className="nav-item">
            <Link to="/">{t('home')}</Link>
          </div> */}
          <div className="nav-item">
            <Dropdown menu={{items: menuItemsChangePageLang, onClick: onChangePageLangClick}}>
              <Button>
                <Space>
                  <Trans i18nKey={i18n.language} />
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </div>
        </div>
      </div>

      <div className="container-search">
        <div className="container-search-inner">
          <div className="search-area">
            <Space wrap align="center" style={{justifyContent:"center"}}>
              <Space wrap>
                <Dropdown menu={{ items: menuItemsOriLang, onClick: onOriLangClick }}>
                  <a><div className="input-flag">{showFlagByKey(oriLang)} <CaretDownOutlined /></div></a>
                </Dropdown>
                <Input className="input-search" value={search} placeholder={t("input-search-text")} bordered={false} onChange={(e) => setSearch(e.target.value)} />
              </Space>
              <Space wrap>
                <DesktopOutlined />
                <div className="dropdown">
                  <Dropdown menu={{ items: [ ...DramaList.default.dramaList,
                      { label: `${t("other")} (Coming soon)`, key: 'other', disabled: true, releaseDate: "2000-01-01" },
                    ]
                    .filter(d => !d.hidden)
                    .sort((a,b) => moment(a.releaseDate) > moment(b.releaseDate) ? -1 : 1)
                    .map(d => {
                      return (
                        {
                          key: d.key,
                          label: d.label[i18n.language] || `${t("other")} (Coming soon)`,
                          disabled: d.disabled,
                        }
                      )
                    }), onClick, }}
                  >
                    <a>{getDramaName(DramaList.default.dramaList, drama, i18n.language)} <CaretDownOutlined /></a>
                  </Dropdown>
                </div>
              </Space>
              <Button type="primary" icon={<SearchOutlined />} onClick={onSearch}>
                {t('search')}
              </Button>
            </Space>
          </div>

          <div className="dropdown-translate-lang">
            <Dropdown menu={{ items: menuItemsTransLang, onClick: onTranslateLangClick }}>
              <a className="text">{t('translate-to')} <div className="input-flag">{showFlagByKey(translateLang)}</div> <Trans i18nKey={translateLang} /><CaretDownOutlined /></a>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Toppanel
