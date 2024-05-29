const nameExists = (usr, nameList) => {
    return nameList.some((nameItr) => nameItr.name.toLowerCase() === usr.toLowerCase());
};

function capitalizeFirstLetter(inputString) {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1).toLowerCase();
}

// const deleteName = (usr,nameList) => {
//     let res = nameList.filter((user) => user.name !== usr);
//     // console.log(res);
//     return res;
// }

// function filterNamesByStatus(status,nameList){
//     let statusList = [];
//     status.forEach((cat) => {
//         statusList.push(cat.value);
//     });
//     const statSet = statusList;
//     console.log(statSet);
//     let res = [];
//     if (status.length == 0) {
//         res = nameList;
//     } else {
//         nameList.forEach((usr) => {
//             const d = statSet.includes(usr.status);
//             if (d) {
//                 res.push(usr);
//             }
//         });
//     }
//     return res;
// }

// function sortNames(options,nameList){
//     let res = [];
//     if (options[0] == fetch.sortKey) {
//         res = nameList.slice().sort((a, b) => a.name.localeCompare(b.name));
//         return res;
//     } else if (options[1] == fetch.sortKey){
//         res = nameList.slice().sort((a, b) => b.name.localeCompare(a.name));
//         return res;
//     }
// }

export {
    nameExists, 
    capitalizeFirstLetter,
    // deleteName, 
    // filterNamesByStatus,
    // sortNames
}

