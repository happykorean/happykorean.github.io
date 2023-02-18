import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Input, Space } from 'antd';
import reactStringReplace from 'react-string-replace';

import './singleresult.css'

const { Search } = Input;

function SingleResult(props) {

  const { 
    d,
    j,
    search,
    drama,
  } = props;

  return (
    <div className="singleresult-component-container">
      <hr/>
        {/* <p>content: {d.prev.content && d.prev.content.join(', ')} / {d.prevZh && d.prevZh.cntent.join(', ')}</p> */}
        <h3>
          {
            reactStringReplace(d.content.join(', '), search, (match, i) => (
              <span key={i} className="highlight-result">{match}</span>
            ))
          }
        </h3>
        <p>{d.zh && d.zh.content.join(', ')}</p>
        <p><small>{drama} EP{j+1} | {d.startTime}</small></p>
        {/* <p>line: {d.line} | startTime: {d.startTime} | content: {d.content && d.content.join(', ')} / {d.zh && d.zh.content.join(', ')}</p> */}
        
        {/* <p>content: {d.next.content && d.next.content.join(', ')} / {d.nextZh && d.nextZh.content.join(', ')}</p> */}
        {/*  <p>content: {d.next2 && d.next2.content && d.next2.content.join(', ')} / {d.nextZh2 && d.nextZh2.content.join(', ')}</p> */}
    </div>
  )
}

export default SingleResult
