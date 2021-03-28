
// import React, { Component } from 'react';
// import Axios from 'axios'
// class MyComponent extends Component {
//    constructor(props){
//       super(props)
//       this.state={
//          arr: []
//       }
//       this.getData = this.getData.bind(this)   
//    }
//    componentDidMount(){
//       this.getData()
//    }
//    getData(){
//       console.log('aa');
//       Axios.get('http://localhost:216/staff/statusStaff').then(res =>{
//          this.setState({arr:res.data})
//       })
//    }
//    render() {
//     return (
//       <div > <button onClick={()=>console.log(this.state.arr)}>aaaaaaa</button></div>
     
//     );
//   }
// }

// export default MyComponent;

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
            {
               state.map(dt =>(
                  <option>{dt._id}</option>
                  
               ))
            }
            
         </select>
      </div>
   )
}
export default MyComponent;