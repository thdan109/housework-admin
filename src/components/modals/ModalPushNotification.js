import React from 'react'
import  { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Axios from 'axios';
import '../../styles/ModalAssignment.css'
import { Checkbox } from '@material-ui/core';

const ModalPushNoti = ( props ) =>{
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
   //    Axios.post('http://localhost:216/clear/addStaff',{
   //       id: id,
   //       dttime: datatime
   //    })
   //    // getDataStaff()
   //    toggle()
   //    window.location.reload(1)
   // }

   const getDataStaff = () =>{
      // console.log('aaa')
      const data = props.data
      Axios.post('http://localhost:216/staff/statusStaff', {
         dttime: data
      }).then(res =>{
         setState(res.data)
      })
   }

   const handleChange = ( e ) =>{
      if (e.target.id){
         setChecked({...checked, [e.target.id]: e.target.checked})
      }
   }

   const Send =  (e) =>{
      Axios.post('http://localhost:216/clear/addStaff',{
         dataStaff: checked,
         data: props.data
      })
      toggle()
      window.location.reload(1)
   }

   return (
      <div>

         <Button color="primary" onClick={()=>toggle()}>Thông báo</Button>
         <Modal isOpen={modal} toggle={toggle} className={className} >
         <ModalHeader toggle={toggle}>Thông báo</ModalHeader>
         {/* <Button color="primary" onClick={()=>console.log(idStaff)}>Danh sách</Button> */}
            <ModalBody>
               <div className="ContainerTable">
                  {/* <table border='1' className='table'>
                     <tr>
                        <th>Action</th>
                        <th>ID NV</th>
                        <th  >Tên nhân viên</th>
                        <th>Số việc</th>
                     </tr>
                     {
                        state.map(dt=>(
                           <tr>
                              <td style={{textAlign: 'center'}}>
                                
                                 <input type='checkbox' id={dt._id}  value={dt._id} onChange={(e) => handleChange(e)} 
                                 />
                              </td>
                              <td>{dt._id}</td>
                              <td >{dt.fullnameStaff}</td>
                              <td>{dt.numberWorkMonth}</td>
                           </tr>
                        ))
                     }
                     
                  </table> */}
                  <div>
                     Đồng ý
                     <Button color="success" onClick={()=>toggle()}>Gửi</Button>
                  </div>
                  <div>
                     Đồng ý
                     <Button color="danger">Không duyệt</Button>{' '}
                  </div>

               </div>
            </ModalBody>
            <ModalFooter>
               {/* <Button color="primary" onClick={(e) => Send(e)}>Chọn</Button> */}
               <Button color="primary" onClick={()=>toggle()}>Đóng</Button>
            </ModalFooter>
         </Modal>
      </div>
   )
}
export default ModalPushNoti