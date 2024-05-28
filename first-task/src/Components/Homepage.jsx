/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import '../Stylesheets/Homepage.css';
import Select from "react-select";
import { CgMenuGridR } from "react-icons/cg";


function Homepage() {
    const [names,setNames]= useState({name:"",status:true});
    const [nameList,setNameList] = useState([]);
    const [showList,setShowList] = useState([]);
    const [fetch, setFetch] = useState({
        statusKey:[],
        sortKey: "",
      });
    const [menu,setMenu] = useState(false);
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        
    },[])

    const handleChange = (event) => {
        setNames({...names, name :event.target.value});
    };

    const nameExists = (usr) => {
        return nameList.some((nameItr) => nameItr.name.toLowerCase() === usr.toLowerCase());
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if(nameExists(names.name)){
            alert("Name already exists!");
        }else{
            setNameList([...nameList,names]);
            setShowList([...nameList,names]);
            alert("Name added successfully!");
        }
    }

    const handleStatus = (usr) => {
        let res = nameList.map(nameItr => {
          return usr === nameItr.name ? 
          {...nameItr , status : !nameItr.status} 
          : 
          nameItr;
        });
        setNameList(res);
        setShowList(res);
    }

    const deleteName = (usr) => {
        let res = nameList.filter((user) => user.name !== usr);
        // console.log(res);
        setNameList(res);
        setShowList(res);
    }

    const options = [
        { value: 'name (a-z)', label: 'Name (A-Z)' },
        { value: 'name (z-a)', label: 'Name (Z-A)'}
    ]

    const statusList = [
        { value: true, label: "Active" },
        { value: false, label: "Deactive" }
      ];

    useEffect(()=>{
        let statusList = [];
        fetch.statusKey.forEach((cat) => {
            statusList.push(cat.value);
        });
        const statSet = statusList;
        console.log(statSet);
        let res = [];
        if (fetch.statusKey.length == 0) {
            res = nameList;
        } else {
            nameList.forEach((usr) => {
                const d = statSet.includes(usr.status);
                if (d) {
                    res.push(usr);
                }
            });
        }
        setShowList(res);
        let finalres = [];
        if (options[0].value == fetch.sortKey) {
          finalres = res.slice().sort((a, b) => a.name.localeCompare(b.name));
          setShowList(finalres);
        } else if (options[1].value == fetch.sortKey){
          finalres = res.slice().sort((a, b) => b.name.localeCompare(a.name));
          setShowList(finalres);
        }
    },[fetch])
    
    

  return (
    <div className='HPContainer'>
        <div className='HPSubmitConatiner'>
            <CgMenuGridR className='HPMenu' onClick={()=>{setMenu(!menu)}}/>
            <input className='HPInput'  type='text' placeholder='Enter the name' onChange={handleChange}></input>
            <button className='HPSubmit' onClick={handleSubmit}>Submit</button>
        </div>
        {
            menu ?
            <>
                <div className='HPFilter'>
                    {/* <IoCloseCircleSharp onClick={()=>{setMenu(!menu)}}/> */}
                    <Select
                        isMulti
                        className="MISelect"
                        options={statusList}
                        placeholder="Filter by status"
                        value={fetch.statusKey}
                        onChange={(e) => {
                            setFetch({...fetch,statusKey: e})
                        }}
                        styles={{
                            control: (baseStyles) => ({
                            ...baseStyles,
                            borderWidth: 2,
                            borderRadius: 17,
                            borderColor: "black",
                            margin: 10,
                            width: 260
                            })
                        }}
                    />
                    <Select
                        options={options}
                        placeholder="Sort by name"
                        onChange={(e) => {
                        setFetch({...fetch,sortKey: e.value})
                        }}
                        styles={{
                            control: (baseStyles) => ({
                            ...baseStyles,
                            borderWidth: 2,
                            borderRadius: 17,
                            borderColor: "black",
                            margin: 10,
                            width: 260
                            })
                        }}
                    />  
                </div>
            </>:
            <></>
        }
        
        <div className='HPTable'>
            <div className='d-flex justify-content-center'>
            {
                showList.length != 0 ? 
                <>
                <table>
                    <tr>
                        <th style={{ width: '300px' }}>Name</th>
                        <th>Status</th>
                        <th>Delete</th>
                    </tr>
                    {
                        showList.map((name, index) => {
                            return (
                                <tr key={index} className={name.status? 'HPActive':'HPDeactive'}>
                                    <td>{name.name}</td>
                                    <td>
                                        {name.status == true?
                                        <>
                                            <button className='HPButton' onClick={()=>{handleStatus(name.name)}}> Deactivate </button>
                                        </>:
                                        <>
                                            <button className='HPButton' onClick={()=>{handleStatus(name.name)}}> Activate </button>
                                        </>}
                                    </td>
                                    <td>
                                        <button className='HPButton' onClick={()=>{deleteName(name.name)}}> Delete </button>
                                    </td>
                                </tr>
                            );
                        })
                    }

                </table>
                </> 
                : 
                <>
                    <div className='text-danger fs-4 fw-bold'>No names submitted yet!</div>
                </>
            }
            </div>
        </div>
    </div>
  )
}

export default Homepage