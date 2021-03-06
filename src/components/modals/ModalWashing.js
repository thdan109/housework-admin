import React from 'react'
import  { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Axios from 'axios';
import '../../styles/ModalAssignment.css'
import { Checkbox } from '@material-ui/core';

const ModalWashing = ( props ) =>{
   const {
      buttonLabel,
      className
   } = props;
   const [modal, setModal] = React.useState(false);
   const toggle = () =>{
      // console.log(props.id)
      setModal(!modal)
      getDataStaff()
   } 

   const [ state,setState ] = React.useState([])
   
   React.useEffect(()=>{
      // getDataStaff()
   },[])

   const [idStaff, setIDStaff] = React.useState([])
   const [checked, setChecked] = React.useState()

   // const ClickAdd = (e) =>{
   //    console.log(e.target.value);
   //    const id =  e.target.value;
   //    const datatime = props.data
   //    console.log(datatime);
   //    Axios.post('http://localhost:216/washing/addStaff',{
   //       id: id,
   //       dttime: datatime
   //    })
   //    // getDataStaff()
   //    toggle()
   //    window.location.reload(1)
   // }

   const getDataStaff = () =>{
      // console.log('aaa')b
      const data = props.data
      console.log(data);
      Axios.post('http://localhost:216/staff/statusStaffWash', {
         dttime: data
      })
      .then(res =>{
         setState(res.data)
      })
   }
   const handleChange = ( e ) =>{
      if (e.target.id){
         setChecked({...checked, [e.target.id]: e.target.checked})
      }
   }

   const Send =  (e) =>{
      Axios.post('http://localhost:216/washing/addStaff',{
         dataStaff: checked,
         data: props.data
      })
      toggle()
      window.location.reload(1)
   }


   return (
      <div>

         <Button color="primary" onClick={()=>toggle()}>Danh sách</Button>
         <Modal isOpen={modal} toggle={toggle} className={className} size="lg">
         <ModalHeader toggle={toggle}>Phân công nhân viên</ModalHeader>
         {/* <Button color="primary" onClick={()=>console.log(idStaff)}>Danh sách</Button> */}
            <ModalBody>
               <div className="ContainerTable">
                  <table border='1' className='table'>
                     <tr>
                        <th>Action</th>
                        <th style={{textAlign: 'center'}}>ID NV</th>
                        <th style={{textAlign: 'center'}}>Tên nhân viên</th>
                        <th style={{textAlign: 'center'}}>Việc đã làm</th>
                     </tr>
                     {
                        state.map(dt=>(
                           <tr>
                              <td style={{textAlign: 'center'}}>
                                 {/* <button style={{border: 0}} onClick={(e)=>ClickAdd(e)} value={dt._id}>Chọn</button> */}
                                 <input type='checkbox' id={dt._id}  value={dt._id} onChange={(e) => handleChange(e)} 
                                 />
                              </td>
                              <td style={{textAlign: 'center'}}>{dt._id}</td>
                              <td style={{textAlign: 'center'}}>{dt.fullnameStaff}</td>
                              <td style={{textAlign: 'center'}}>{dt.numberWorkMonth}</td>
                           </tr>
                        ))
                     }
                     
                  </table>
               </div>
            </ModalBody>
            <ModalFooter>
               <Button color="primary" onClick={(e)=>Send(e)}>Chọn</Button>
               <Button color="secondary" onClick={()=>toggle()}>Trở lại</Button>
            </ModalFooter>
         </Modal>
      </div>
   )
}
export default ModalWashing