import React, { useState, useEffect } from 'react'
import { useParams, useLocation, useSearchParams } from 'react-router-dom'
import { Input, Space, Layout } from 'antd';
import { Col, Row, Dropdown } from 'antd';
import fs from 'fs'

import './search.css'
import SingleResult from '../../components/singleresult/SingleResult';

const { Search } = Input;
const { Header, Footer, Sider, Content } = Layout;

function SearchPage() {
  const [result, setResult] = useState([])
  // const [drama, setDrama] = useState('soul')
  const [searchParams] = useSearchParams();

  const queryParameters = new URLSearchParams(window.location.search)
  const drama = queryParameters.get("drama")
  const search = queryParameters.get("search")

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
          var endTime = d.slice(0,12);
          vtt[currLine].startTime = startTime;
          vtt[currLine].endTime = endTime;

          var time = startTime.split('.');
          var actualTime = time[0].split(':');
          var totalSeconds = (+actualTime[0]) * 60 * 60 + (+actualTime[1]) * 60 + (+actualTime[2]);
          vtt[currLine].startTimeMili = totalSeconds * 1000 + (+time[1]);
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
    //console.log(vtt)
    return vtt;
  }

  const onSearch = async (value) => {
    setResult([]);
    console.log(value)

    var resultAll = null;
    await Promise.all(
       [...Array(24).keys()].map(async(i) => {
        var ep = ('0' + (i+1).toString()).slice(-2);

        await getVocabTxtFile(`${window.location.origin}/res/drama/${drama}/kr/S01E${ep}.vtt`).then(async(text) => {
        //getVocabTxtFile(url).then((text) => {
          await getVocabTxtFile(`${window.location.origin}/res/drama/${drama}/zh/S01E${ep}.vtt`).then((textZh) => {
            const vtt = handleVttFile(text);
            const vttZh = handleVttFile(textZh);
            var resultTmp = [];
            vtt.map((d,i) => {
              if (d.content.find(line => line.includes(value))) {
                d.prev = vtt[i-1];
                d.next = vtt[i+1];
                d.next2 = vtt[i+2];

                var zhIdx = vttZh.findIndex(zh => zh.startTimeMili >= d.startTimeMili);
                d.zh = vttZh[zhIdx];
                d.prevZh = vttZh[zhIdx-1];
                d.nextZh = vttZh[zhIdx+1];
                d.nextZh2 = vttZh[zhIdx+2];

                resultTmp.push(d);
                ////console.log('d', d)
              }
              return d;
            });
            var tmp = result;
            tmp[i] = resultTmp;
            resultAll = tmp;
          })
        })
        return i;
      })
    )
    if (resultAll){
      setResult(resultAll);
    }
  }

  return (
    <div className="search-container">
      {/* <div className="iframe">
        <iframe id="iframe" title="a" src={`https://koreanverb.app/?search=${vocab}`}></iframe>
      </div> */}
      {/* <Row>
        <Col span={24}>
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            style={{
              width: 400,
              margin: 30,
            }}
          />
          <Dropdown menu={{ items, onClick, }}>
            <a>Select Drama: {drama}</a>
          </Dropdown>
        </Col>
      </Row> */}
      <Row style={{ margin: 30 }}>
        <Col span={24}>
          <p>Result</p>
          <div className="result">
            {/*
              result.map((ep,j) => {
                return <div>
                  {<p>EP{j+1}</p>}
                  {
                    ep.map((d,i) => {
                      return d ?
                      <div key={j + i}>
                        <hr/>
                        <p>content: {d.prev.content && d.prev.content.join(', ')} / {d.prevZh && d.prevZh.content.join(', ')}</p>
                        <p>line: {d.line} | startTime: {d.startTime} | content: {d.content && d.content.join(', ')} / {d.zh && d.zh.content.join(', ')}</p>
                        <p>content: {d.next.content && d.next.content.join(', ')} / {d.nextZh && d.nextZh.content.join(', ')}</p>
                        <p>content: {d.next2 && d.next2.content && d.next2.content.join(', ')} / {d.nextZh2 && d.nextZh2.content.join(', ')}</p>
                      </div>
                      : null
                    })
                  }
                </div>
              })
            */}
            {
              result.map((ep,j) => {
                return <div key={j}>
                  {
                    ep.map((d,i) => {
                      return d ?
                      <div key={j + i}>
                        <SingleResult d={d} j={j} search={search} drama={drama} />
                      </div>
                      : null
                    })
                  }
                </div>
              })
            }
          </div>
        </Col>
      </Row>
      <div>
      </div>
      {/* <Layout>
        <Header>
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            style={{
              width: 200,
            }}
          />
        </Header>
        <Content>
          <div>
            <p>Result</p>
            <div className="result"></div>
          </div>
        </Content>
        <Footer>Footer</Footer>
      </Layout> */}
    </div>
  )
}

export default SearchPage
