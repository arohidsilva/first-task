/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import "../Stylesheets/Name.css";

function Name({infoName,infoStatus}) {
    
  return (
    <div className='NContainer '>
        <div className='NChars'>{infoName}</div>
        <button className='NButton' > Activate </button>
        <button className='NButton' > Deactivate </button>
        <button className='NButton' > Delete </button>
    </div>
  )
}

export default Name