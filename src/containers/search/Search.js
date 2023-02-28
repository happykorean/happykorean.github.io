import React, { useState, useEffect, useRef } from 'react'
import { useParams, useLocation, useSearchParams } from 'react-router-dom'
import { Input, Space, Layout, Table, Col, Row, Button, Drawer, Tooltip } from 'antd';
import reactStringReplace from 'react-string-replace';
import { CaretDownOutlined, ExpandAltOutlined, ShrinkOutlined, CloseOutlined, LoadingOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next';
import { Helmet } from "react-helmet";

import * as DramaList from '../../config/dramaList.json';
import { getDramaName, getDramaSeason, getDramaNoOfEp } from '../../utils/common';

import SingleResult from '../../components/singleresult/SingleResult';

import './search.css'

const regex = /<[/]?.+?>/g

function SearchPage() {
  const [result, setResult] = useState(null)
  const [pageLimit, setPageLimit] = useState(15)
  const [oriVtt, setOriVtt] = useState([])
  const [translateVtt, setTranslateVtt] = useState([])
  const [openDrawer, setOpenDrawer] = useState(false)
  const [selectedItemIdx, setSelectedItemIdx] = useState(null)
  const [rowSpacing, setRowSpacing] = useState(80)

  const oriSubsRef = useRef(null);
  const transSubsRef = useRef(null);

  const { t, i18n } = useTranslation();

  const [searchParams] = useSearchParams();

  const queryParameters = new URLSearchParams(window.location.search)
  const drama = queryParameters.get("drama")
  const search = queryParameters.get("search")
  const oriLang = queryParameters.get("oriLang")
  const translateLang = queryParameters.get("translateLang")

  const items = [
    { label: 'cha', key: 'cha' },
    { label: 'dead', key: 'dead' },
    { label: 'just', key: 'just' },
    { label: 'lawyer', key: 'lawyer' },
    { label: 'nervertheless', key: 'nervertheless' },
    { label: 'soul', key: 'soul' }, 
    { label: 'squid_game', key: 'squid_game' },
    { label: 'vincenzo', key: 'vincenzo' }, 
    { label: 'hospital', key: 'hospital' }, 
  ];

  const vocab = [
    {key: "001", vocab: "경우"},
    {key: "002", vocab: "대상"},
    {key: "003", vocab: "분야"},
    {key: "004", vocab: "도전하다"},
    {key: "005", vocab: "가입"},
    {key: "006", vocab: "모집"},
    {key: "007", vocab: "변화"},
  ];

  useEffect(() => {
    onSearch(search)
    setResult(null)
  }, [searchParams]);

  const getVocabTxtFile = (url) => {
    return fetch(url).then(function (response) {
      return response.text()
    })
  }

  const handleVttFile = (text) => {
    var arr = text.split('\n')
    var currLine = 0;
    var vtt = [];
    vtt.push({
      line: currLine,
      content: [],
    });

    arr.map((d, idx) => {
      //console.log(idx, d);
      if (d === '') return;
      if (d !== (currLine+1).toString()) {
        if (d[2] === ':') {
          var startTime = d.slice(0,12);
          var endTime = d.slice(17,29);

          var time = startTime.split('.');
          var actualTime = time[0].split(':');
          var totalSeconds = (+actualTime[0]) * 60 * 60 + (+actualTime[1]) * 60 + (+actualTime[2]);
          vtt[currLine].startTimeMili = totalSeconds * 1000 + (+time[1]);

          var time2 = endTime.split('.');
          var actualTime2 = time2[0].split(':');
          var totalSeconds2 = (+actualTime2[0]) * 60 * 60 + (+actualTime2[1]) * 60 + (+actualTime2[2]);
          vtt[currLine].endTimeMili = totalSeconds2 * 1000 + (+time2[1]);

          vtt[currLine].startTime = time[0];
          vtt[currLine].endTime = time2[0];
        } else {
          var subtitle = d
            .replace('<c.korean>', '')
            .replace('</c.korean>', '')
            .replace('<c.traditionalchinese>', '')
            .replace('</c.traditionalchinese>', '')
            .replace('<c.bg_transparent>', '')
            .replace('</c.bg_transparent>', '')
            .replace('&lrm;', '')
            vtt[currLine].content.push(subtitle);
        }
      } else {
        currLine += 1;
        vtt.push({
          line: currLine,
          content: [],
        });
      }
      return d;
    })
    return vtt;
  }

  const onSearch = async (value) => {
    setResult([]);
    if (!(value && value.replace(' ', '') !== '')){
      return;
    }

    var resultData = [];
    var noOfEp = getDramaNoOfEp(DramaList.default.dramaList, drama);
    var season = getDramaSeason(DramaList.default.dramaList, drama);

    await Promise.all(
       [...Array(noOfEp).keys()].map(async(i) => {
        var ep = ('0' + (i+1).toString()).slice(-2);

        await getVocabTxtFile(`${window.location.origin}/res/drama/${drama}/${oriLang}/S0${season}E${ep}.vtt`).then(async(text) => {
          await getVocabTxtFile(`${window.location.origin}/res/drama/${drama}/${translateLang}/S0${season}E${ep}.vtt`).then((textZh) => {
            const vtt = handleVttFile(text);
            const vttZh = handleVttFile(textZh);
            oriVtt[ep] = vtt
            translateVtt[ep] = vttZh
            setOriVtt(oriVtt);
            setTranslateVtt(translateVtt);
            
            var resultTmp = [];
            vtt.map((d,i) => {
              if (d.content.find(line => line.includes(value))) {
                var zhIdx = vttZh.findIndex(zh => zh.startTimeMili <= d.endTimeMili &&  d.startTimeMili <= zh.endTimeMili);
                d.zh = zhIdx > -1 ? vttZh[zhIdx] : null;
                d.ep = ep;
                resultTmp.push(d);
                resultData.push(d)
              }
              return d;
            });
            var tmp = result || [];
            tmp[i] = resultTmp;
          })
        })
        return i;
      })
    )
    if (resultData){
      setResult(resultData);
    }
  }

  const onClickShowMore = () => {
    setPageLimit(pageLimit + 15);
  }

  const onSelectItem = (idx) => {
    setOpenDrawer(true);
    setSelectedItemIdx(idx);
    setTimeout(() => {
      oriSubsRef.current.scrollTo({top: result[idx].startTimeMili / rowSpacing - 20});
      //transSubsRef.current.scrollTo({top: result[idx].startTimeMili / rowSpacing, behavior: 'smooth'});
    }, 1000)
  }

  const scrollToTarget = (rowSpacing) => {
    if (result[selectedItemIdx]) {
      oriSubsRef.current.scrollTo({top: result[selectedItemIdx].startTimeMili / rowSpacing - 20});
    }
  }

  return (
    <div className="search-container">
      <Helmet>
        <title>{search} | Get-Subtitles</title>
      </Helmet>
      <Row style={{ margin: 30 }}>
        {
          result ?
            <Col span={24}>
              <div>{t('result')} ({result && result.length})</div>
              <div className="result">
                {
                  result.slice(0, pageLimit).map((d,j) => {
                    return <div key={j}>
                      <SingleResult d={d} search={search} drama={drama} onSelectItem={() => onSelectItem(j)} />
                    </div>
                  })
              }
              </div>
              { 
                pageLimit < result.length && 
                <Button className="btn-show-more" onClick={onClickShowMore}>
                  {t("show-more")} {pageLimit} / {result.length} <CaretDownOutlined />
                </Button>
              }
            </Col>
          :
          <LoadingOutlined style={{ fontSize: 24 }} spin />
        }
        
      </Row>

      <Drawer
        title={`${getDramaName(DramaList.default.dramaList, drama, i18n.language)} EP${result && result[selectedItemIdx] ? result[selectedItemIdx].ep : ''} ${t('full-subtitles')}`}
        placement="bottom"
        closable={true}
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
        height={window.innerHeight * 0.85}
      >
        {
          selectedItemIdx > -1 && result && result[selectedItemIdx] &&
          <div className="drawer-inspector">
            <div><Button style={{marginBottom: '3px'}} size="small" onClick={() => scrollToTarget(rowSpacing)}>{t("jump-to")}</Button> {result[selectedItemIdx] && result[selectedItemIdx].content}</div>
            <Space wrap>
              <Space direction="vertical">
                <Button disabled={rowSpacing<10} type="primary" icon={<ExpandAltOutlined rotate="-45" style={{fontSize: '16px'}} />} onClick={()=>{setRowSpacing(rowSpacing - 5); scrollToTarget(rowSpacing - 5)}} />
                <Button disabled={rowSpacing>150} type="primary" icon={<ShrinkOutlined rotate="-45" style={{fontSize: '16px'}} />} onClick={()=>{setRowSpacing(rowSpacing + 5); scrollToTarget(rowSpacing + 5)}}/>
              </Space>
              <div className="full-subtitle-container" style={{height:`${window.innerHeight * 0.85 - 185}px`}} ref={oriSubsRef} onScroll={() => transSubsRef.current.scrollTo({top: oriSubsRef.current.scrollTop})}>
                {
                  oriVtt[result[selectedItemIdx].ep].map((d,i) => {
                    if (i === 0 ) return null;
                    return (
                      <div key={i} className="line" style={{top: d.startTimeMili ? `${d.startTimeMili / rowSpacing}px` : 0}}>
                      {/* <Tooltip title={d.startTime} placement="bottomRight" color={"#3f51b5"}> */}
                        {
                          reactStringReplace(d.content.join(', '), search, (match, i) => (
                            <span key={i} className="highlight-result">{match}</span>
                          ))
                        }
                        <span className="start-time">{d.startTime}</span>
                      </div>
                    )
                  })
                }
              </div>

              <div className="full-subtitle-container" style={{height:`${window.innerHeight * 0.85 - 185}px`}} ref={transSubsRef} onScroll={() => oriSubsRef.current.scrollTo({top: transSubsRef.current.scrollTop})}>
                {
                  translateVtt[result[selectedItemIdx].ep].map((d,i) => {
                    if (i === 0 ) return null;
                    return (
                      <div key={i} className="line" style={{top: d.startTimeMili ? `${d.startTimeMili / rowSpacing}px` : 0}}>
                        {d.content.join(', ').replace(regex, "")}
                        <span className="start-time">{d.startTime}</span>
                      </div>
                    )
                  })
                }
              </div>
            </Space>
          </div>
        }
        <Button className="btn-close-drawer" onClick={()=>setOpenDrawer(false)}><CloseOutlined /> {t('close')}</Button>
      </Drawer>
    </div>
  )
}

export default SearchPage
