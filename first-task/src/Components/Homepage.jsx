/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import '../Stylesheets/Homepage.css';
import Select from "react-select";

function Homepage() {
    const [names,setNames]= useState({name:"",status:true});
    const [nameList,setNameList] = useState([]);
    const [showList,setShowList] = useState([])
    const [fetch, setFetch] = useState({
        statusKey:[],
        sortKey: "",
      });

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
        { value: "true", label: "Active" },
        { value: "false", label: "Deactive" }
      ];

    // useEffect(()=>{
    //     let catList = [];
    //     fetch.statusKey.forEach((cat) => {
    //         catList.push(cat.value.toLowerCase());
    //     });
    //     // const catSet = catList;
    //     // let res = [];
    //     // if (fetch.statusKey.length == 0) {
    //     //     res = nameList;
    //     // } else {
    //     //     nameList.forEach((usr) => {
    //     //         const d = usr.status.some((usrcat) =>
    //     //             catSet.includes(usrcat.toLowerCase())
    //     //         );
    //     //         if (d) {
    //     //             res.push(usr);
    //     //         }
    //     //     });
    //     // }
    //     // setShowList(res)
    //     let res=nameList;
    //     let finalres = [];
    //     if (options[0].value == fetch.sortKey) {
    //         finalres = res.sort((a, b) => a.name.localeCompare(b.name));
    //     } else if (options[1].value == fetch.sortKey){
    //         finalres = res.sort((a, b) => b.name.localeCompare(a.name));
    //     }else{
    //         finalres = res;
    //     }
    //     setShowList(finalres);
    // },[fetch]);

    // console.log("fetch",fetch);

    console.log(fetch.statusKey);
    const updateSortMethod = (e) => {
        setFetch({ ...fetch, sortKey: e });
        if (options[0].value == e.value) {
          let res = nameList.sort((a, b) => a.name.localeCompare(b.name));
          setShowList(res);
        } else if (options[1].value == e.value){
          let res = nameList.sort((a, b) => b.name.localeCompare(a.name));
          setShowList(res);
        }
      };
    
    

  return (
    <div className='HPContainer'>
        <form>
            <input className='HPInput'  type='text' placeholder='Enter the name' onChange={handleChange}></input>
            <button className='HPSubmit' onClick={handleSubmit}>Submit</button>
        </form>
        <div>
        <Select
            className="MISelect"
            options={statusList}
            placeholder="Filter by status"
            value={fetch.statusKey}
            onChange={(e) => {
              setFetch({ ...fetch, statusKey: e});
            }}
          />
        <Select
            options={options}
            placeholder="Sort by name"
            value={fetch.sortKey}
            onChange={(e) => {
              updateSortMethod(e)
            }}
          />
            
        </div>
        {
            showList.length != 0 ? 
            <>
            <table>
                <tr>
                    <th>Name</th>
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
                <div>No names submitted yet!</div>
            </>
        }
    </div>
  )
}

export default Homepage