
// import React from 'react'
// import Axios from 'axios'

// const getData = () =>{
  
//    const [ state,setState ] = React.useState([])
   
//    React.useEffect(()=>{
//       getDataStaff()
//    },[])

//    const getDataStaff = () =>{
//       console.log('aa');
//       Axios.get('http://localhost:216/staff/statusStaff').then(res =>{
//          setState(res.data)
//       })
//    }


//    return(
//       <div>
//          <select>
//             {
//                state.map(dt =>(
//                   <option>{dt._id}</option>
//                ))
//             }
            
//          </select>
//       </div>
//    )
// }
// export default getData;

import React from 'react'
import Axios from 'axios'

const MyComponent = () =>{
   const [ state,setState ] = React.useState([])
   
   React.useEffect(()=>{
      getDataStaff()
   },[])

   const getDataStaff = () =>{
      console.log('aa');
      Axios.get('http://localhost:216/staff/statusStaff').then(res =>{
         setState(res.data)
      })
   }


   return(
      <div>
         <select>
            <option></option>
            {
               state.map(dt =>(
                  <option>{dt.fullnameStaff}</option>
               ))
            }
            
         </select>
      </div>
   )
}
export default MyComponent;