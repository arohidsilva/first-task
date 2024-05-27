/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import '../Stylesheets/Homepage.css'
import { Form } from 'react-router-dom';
import Name from '../Components/Name'

function Homepage() {
    const [names,setNames]= useState({name:"",status:""});
    const [nameList,setNameList] = useState([]);

    const handleChange = (event) => {
        setNames({...names, name :event.target.value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let t = nameList;
        t.push(names);
        setNameList(t);
        console.log("nameList",nameList);
    }

    useEffect(()=>{
        console.log(nameList);
    },[nameList])

    
  return (
    <div className='HPContainer'>
        <form>
            <input className='HPInput'  type='text' placeholder='Enter the name' onChange={handleChange}></input>
            <button className='HPSubmit' onClick={handleSubmit}>Submit</button>
        </form>
        <div className='HPNameContainer'>
          {nameList.length != 0 ? (
            nameList.map((name, index) => {
              return (
                <Name
                  key={index}
                  infoName={name.name}
                  infoStatus={name.status}
                />
              );
            })
          ) : (
            <>
              <div className="MIEmpty">No names yet!</div>
            </>
          )}
        </div>

    </div>
  )
}

export default Homepage