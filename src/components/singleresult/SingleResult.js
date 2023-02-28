import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Input, Tooltip, Button } from 'antd';
import reactStringReplace from 'react-string-replace';
import { FileSearchOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next';

import * as DramaList from '../../config/dramaList.json';
import { getDramaName } from '../../utils/common';

import './singleresult.css'

function SingleResult(props) {

  const { 
    d,
    search,
    drama,
    onSelectItem,
  } = props;

  const { t, i18n } = useTranslation();

  const regex = /<[/]?.+?>/g

  return (
    <div className="singleresult-component-container">
      <hr/>
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
      <p>{d.zh && d.zh.content.join(', ').replace(regex, "")}</p>
      <p><small>《{getDramaName(DramaList.default.dramaList, drama, i18n.language)}》 EP{d.ep}  |  {d.startTime}</small></p>
    </div>
  )
}

export default SingleResult
