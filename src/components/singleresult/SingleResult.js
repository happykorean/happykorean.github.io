import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Input, Tooltip, Button } from 'antd';
import reactStringReplace from 'react-string-replace';
import { SearchOutlined, FileSearchOutlined, CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next';

import * as DramaList from '../../config/dramaList.json';
import { getDramaName } from '../../utils/common';

import './singleresult.css'

const { Search } = Input;

function SingleResult(props) {

  const { 
    d,
    j,
    search,
    drama,
    onSelectItem,
  } = props;

  const { t, i18n } = useTranslation();

  return (
    <div className="singleresult-component-container">
      {<hr/>}
      {/* <p>content: {d.prev.content && d.prev.content.join(', ')} / {d.prevZh && d.prevZh.cntent.join(', ')}</p> */}
      <h3>
        {
          d.content &&
          reactStringReplace(d.content.join(', '), search, (match, i) => (
            <span key={i} className="highlight-result">{match}</span>
          ))
        }
        <Tooltip title={t('show-full-subs')}>
          <Button size="small" type="primary" shape="circle" onClick={onSelectItem} style={{ marginLeft: '8px' }} icon={<FileSearchOutlined style={{ fontSize: '11px' }} />} />
        </Tooltip>
      </h3>
      <p>{d.zh && d.zh.content.join(', ')}</p>
      <p><small>《{getDramaName(DramaList.default.dramaList, drama, i18n.language)}》 EP{d.ep}  |  {d.startTime}</small></p>
      {/* <p>line: {d.line} | startTime: {d.startTime} | content: {d.content && d.content.join(', ')} / {d.zh && d.zh.content.join(', ')}</p> */}
      
      {/* <p>content: {d.next.content && d.next.content.join(', ')} / {d.nextZh && d.nextZh.content.join(', ')}</p> */}
      {/*  <p>content: {d.next2 && d.next2.content && d.next2.content.join(', ')} / {d.nextZh2 && d.nextZh2.content.join(', ')}</p> */}
    </div>
  )
}

export default SingleResult
