import React from 'react'
import  { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Text ,Label} from 'reactstrap';
import axios from 'axios';
import '../../styles/ModalChangeService.css'
import { Checkbox } from '@material-ui/core';
import Swal from 'sweetalert2'

const ModalUpdateSalary = ( props ) =>{
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
      // getDataSalary()
      // getDataStaff()
   },[])

   const [idStaff, setIDStaff] = React.useState([])
   const [dataUpdate, setDataUpdate] = React.useState([  ])
   const [dataSalary, setDataSalary] = React.useState([])
   

   // const getDataServiceById = async() =>{
   //    // console.log('aaa')
   //    const id = props.data.id
   //    console.log(id);
   //    await axios.get('http://localhost:216/service/dataServiceByID/id='+id)
   //    .then(res =>{
   //       setState(res.data)
   //    })
   // }

   const getDataSalary = async() =>{
      await axios.get('http://localhost:216/salary/getDataSalary').then(res =>{
         setDataSalary(res.data)
         // console.log(res.data);
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
      const id = props.id
      const dataSendUpdate = dataUpdate
      // console.log(dataSendUpdate);
      await axios.post('http://localhost:216/salary/updateSalary',{
         id : id,
         data :dataSendUpdate
      }).then(res =>{
         if (res.data.Update === 'Update salary successfully!'){
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
            getDataSalary()}
         }>Cập nhật</Button>
         <Modal isOpen={modal} toggle={toggle} className={className}>
         <ModalHeader  toggle={toggle}>Cập nhật dịch vụ</ModalHeader>
         {/* <Button color="primary" onClick={()=>console.log(idStaff)}>Danh sách</Button> */}
            <ModalBody>
               <div className="Container">
                  {
                     dataSalary.map(dataSalary =>(
                     <div>
                        <div className='divContainerInput'>
                           <Label className='TitleName'>Chỉ tiêu việc/tháng</Label>
                           <Input placeholder={dataSalary.target} id='target' onChange={(val) => handleChange(val)}  className='Input'/> 
                        </div>
                        <div className='divContainerInput'>
                           <Label className='TitleName'>Lương trên việc</Label>
                           <Input placeholder={dataSalary.work} id='work' onChange={(val) => handleChange(val)}   /> 
                        </div>
                        <div className='divContainerInput'>
                           <Label className='TitleName'>Việc vượt chỉ tiêu</Label>
                           <Input placeholder={dataSalary.bonus} id='bonus' onChange={(val) => handleChange(val)}  /> 
                        </div>
                        <div className='divContainerInput'>
                           <Label className='TitleName'>Nghỉ</Label>
                           <Input placeholder={dataSalary.absent} id='absent' onChange={(val) => handleChange(val)} /> 
                        </div>
                        <div className='divContainerInput'>
                           <Label className='TitleName'>Lương cứng </Label>
                           <Input placeholder={dataSalary.salary} id='absent' onChange={(val) => handleChange(val)} /> 
                        </div>
                     </div>
                     ))
                  }
                  
               </div>
            </ModalBody>
            <ModalFooter>
               <Button color="primary" 
                  onClick={()=>{
                     toggle()
                     sendDataUpdateById()
               }}>Đồng ý</Button>
               <Button color="secondary" onClick={()=>toggle()}>Trở lại</Button>
               {/* <Button color="primary" onClick={()=>console.log(dataUpdate)}>Đồng ý</Button> */}
            </ModalFooter>
         </Modal>
      </div>
   )
}
export default ModalUpdateSalary