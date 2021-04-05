import React from 'react'
import  { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Text } from 'reactstrap';
import Axios from 'axios';
import '../../styles/ModalChangeService.css'
import { Checkbox } from '@material-ui/core';

const ModalChangeService = ( props ) =>{
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
   const [checked, setChecked] = React.useState({checked: true})

   // const ClickAdd = (e) =>{
   //    console.log(e.target.value);
   //    const id =  e.target.value;
   //    const datatime = props.data
   //    console.log(datatime);
   //    Axios.post('http://localhost:216/service/dataService',{
   //       id: id,
   //       dttime: datatime
   //    })
   //    // getDataStaff()
   //    toggle()
   //    window.location.reload(1)
   // }

   const getDataStaff = () =>{
      console.log('aaa')
      const data = props.data
      console.log(data);
      Axios.post('http://localhost:216/service/dataServiceByID', {
         dttime: data
      })
      .then(res =>{
         setState(res.data)
      })
   }

   return (
      <div>

         <Button color="primary" onClick={()=>toggle()}>Cập nhật</Button>
         <Modal isOpen={modal} toggle={toggle} className={className}>
         <ModalHeader toggle={toggle}>Cập nhật dịch vụ</ModalHeader>
         {/* <Button color="primary" onClick={()=>console.log(idStaff)}>Danh sách</Button> */}
            <ModalBody>
               <div className="Container">
                  <div>
                     <div className='divContainerInput'>
                        <div className='TitleName'>Mô tả</div>
                        <Input placeholder="Aaaaaaaaaa" className='Input' /> 
                     </div>
                     <div className='divContainerInput'>
                        <div className='TitleName'>Mô tả</div>
                        <Input placeholder="Aaaaaaaaaa"  className='Input'/> 
                     </div>
                     <div className='divContainerInput'>
                        <div className='TitleName'>Mô tả</div>
                        <Input placeholder="Aaaaaaaaaa" className='Input' /> 
                     </div>
                  </div>
               </div>
            </ModalBody>
            <ModalFooter>
               <Button color="primary" onClick={toggle}>Đồng ý</Button>
               <Button color="secondary" onClick={()=>toggle()}>Trở lại</Button>
            </ModalFooter>
         </Modal>
      </div>
   )
}
export default ModalChangeService