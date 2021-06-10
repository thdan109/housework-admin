import React from 'react'
import  { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Text ,Label} from 'reactstrap';
import axios from 'axios';
import '../../styles/ModalChangeService.css'
import { Checkbox } from '@material-ui/core';
import Swal from 'sweetalert2'

const ModalChangeService = ( props ) =>{
   const {
      buttonLabel,
      className
   } = props;
   const [modal, setModal] = React.useState(false);
   const toggle = () =>{
      // console.log(props.id)
      setModal(!modal)
      // getDataStaff()
   } 

   const [ state,setState ] = React.useState([])
   
   React.useEffect(()=>{
      // getDataStaff()
   },[])

   const [idStaff, setIDStaff] = React.useState([])
   const [dataUpdate, setDataUpdate] = React.useState([  ])
   

   const getDataServiceById = async() =>{
      // console.log('aaa')
      const id = props.data.id
      console.log(id);
      await axios.get('http://localhost:216/service/dataServiceByID/id='+id)
      .then(res =>{
         setState(res.data)
      })
   }

   const handleChange = async( e ) =>{
      console.log(e.target.value)
      setDataUpdate({
         ...dataUpdate,
         [e.target.id] : e.target.value
      })
   }

   const sendDataUpdateById = async( ) =>{
      const id = props.data.id
      const dataSendUpdate = dataUpdate
      await axios.post('http://localhost:216/service/updataService',{
         id : id,
         data :dataSendUpdate
      }).then(res =>{
         if (res.data.Update === 'Oke'){
            Swal.fire({
               position: 'top',
               icon: 'success',
               title: 'Đã Cập nhật!',
               showConfirmButton: false,
               timer: 1500
          }).then(()=>window.location.reload())
          
         }
      })
      
      
   }

   return (
      <div>
         <Button color="primary" 
            onClick={()=>{toggle()
            getDataServiceById()}
         }>Cập nhật</Button>
         <Modal isOpen={modal} toggle={toggle} className={className}>
         <ModalHeader  toggle={toggle}>Cập nhật dịch vụ</ModalHeader>
         {/* <Button color="primary" onClick={()=>console.log(idStaff)}>Danh sách</Button> */}
            <ModalBody>
               <div className="Container">
                  <div>
                     {/* <div className='divContainerInput'>
                        <div className='TitleName'>ID dịch vụ</div>
                        <Input placeholder="Aaaaaaaaaa" className='Input' /> 
                     </div> */}
                     <div className='divContainerInput'>
                        <Label className='TitleName'>Tên dịch vụ</Label>
                        <Input placeholder={state.nameService } id='nameService' onChange={(val) => handleChange(val)}  className='Input'/> 
                     </div>
                     <div className='divContainerInput'>
                        <Label className='TitleName'>Mô tả</Label>
                        <Input type="textarea" id='description' onChange={(val) => handleChange(val)} placeholder={state.descriptionService} style={{ height: 100 }} /> 
                     </div>
                     {
                        (state.prince) &&
                        state.prince.map((dt,index) =>
                           <div className='divContainerInput'>
                              <Label className='TitleName'>Chỉ tiêu : giá</Label>
                              <Input placeholder={dt} id={index+1} onChange={(val) => handleChange(val)}  className='Input'/> 
                           </div>   
                        )
                     }
                  </div>
               </div>
            </ModalBody>
            <ModalFooter>
               <Button color="primary" 
                  onClick={()=>{
                     // toggle()
                     sendDataUpdateById()
               }}>Đồng ý</Button>
               <Button color="secondary" onClick={()=>toggle()}>Trở lại</Button>
               {/* <Button color="primary" onClick={()=>console.log(dataUpdate)}>Đồng ý</Button> */}
            </ModalFooter>
         </Modal>
      </div>
   )
}
export default ModalChangeService