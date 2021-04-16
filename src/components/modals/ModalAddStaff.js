import React from 'react'
import  { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Text, Label, Row, Col } from 'reactstrap';
import axios from 'axios';
import '../../styles/ModalAddService.css';
import { Checkbox } from '@material-ui/core';
import AddBox from '@material-ui/icons/AddBox';
import Close from '@material-ui/icons/Close'
import Swal from 'sweetalert2'

const ModalAddStaff = ( props ) =>{
   
   const [text, setText] = React.useState("");
   const [modal, setModal] = React.useState(false);
   
   const toggle = () =>{
      setModal(!modal)
   } 
   const [selectedFile, setSelectedFile] = React.useState();
   const [ state, setState ] = React.useState([])
   
   React.useEffect(()=>{
      // getDataStaff()
   },[])

   const handleChangeText = async(e)  =>{
      setState({
         ...state,
         [e.target.id]: e.target.value
      })
   }

   const handleChangeFile = (e) => {
      setSelectedFile(e.target.files[0])
	};

   const AddStaff = async() =>{
      // console.log(state);
      const config = {     
         headers: { 'content-type': 'multipart/form-data' }
      }
      const formData = new FormData();
		formData.append('files', selectedFile);
		// formData.forEach(state);
      for ( var key in state ) {
         formData.append(key, state[key]);
      }
      await axios.post('http://localhost:216/staff/addStaff',formData,config).then(res =>{
         if (res.data.status === 'Oke'){
            Swal.fire({
               position: 'top',
               icon: 'success',
               title: 'Đã Thêm!',
               showConfirmButton: false,
               timer: 1500
          }).then(()=>window.location.reload())
         }else{
            Swal.fire({
               position: 'top',
               icon: 'error',
               title: 'Lỗi!',
               showConfirmButton: false,
               timer: 1500
          })
         }
      })

   } 

   return (
      <div>
         <Row style={{marginBottom: 25}}>
            <AddBox style={{marginLeft: 18, color: 'blue',fontSize: 28 }} onClick={()=>toggle()} /><span style={{fontWeight: 'bold', marginLeft: 5}} > Thêm nhân viên</span>
         </Row>
         {/* <Button color="primary" >Cập nhật</Button> */}
         <Modal isOpen={modal} toggle={toggle} >
         <ModalHeader toggle={toggle}>Thêm nhân viên</ModalHeader>
         {/* <Button color="primary" onClick={()=>console.log(idStaff)}>Danh sách</Button> */}
            <ModalBody>
               <div className="Container">
                  <div>
                     <div className='divContainerInput'>
                        <div className='TitleName'>Tên nhân viên</div>
                        <Input placeholder="" className='Input' id='fullnameStaff' onChange={(e)=>handleChangeText(e)} /> 
                     </div>
                     <div className='divContainerInput'>
                        <div className='TitleName'>Ảnh nhân viên</div>
                        <Input placeholder="" type='file' className='Input' id='avatarStaff' onChange={(e)=>handleChangeFile(e)} /> 
                     </div>
                     {/* <div className='divContainerInput'>
                        <Label className='TitleName'>Mô tả</Label>
                        <Input type="textarea" placeholder="" style={{ height: 100 }} id='discription' onChange={(e)=>handleChangeText(e)} /> 
                     </div> */}
                     <div className='divContainerInput'>
                        <div className='TitleName'>Tên đăng nhập</div>
                        <Input placeholder="" className='Input' id='usernameStaff' onChange={(e)=>handleChangeText(e)} /> 
                     </div>
                     <div className='divContainerInput'>
                        <div className='TitleName'>Mật khẩu</div>
                        <Input placeholder="" className='Input' id='passwordStaff' onChange={(e)=>handleChangeText(e)} /> 
                     </div>
                     <div className='divContainerInput'>
                        <div className='TitleName'>Giới tính</div>
                        <Input placeholder="" type='select' className='Input' id='genderStaff' onChange={(e)=>handleChangeText(e)}>
                           <option>Chọn giới tính</option>   
                           <option>Nam</option>   
                           <option>Nữ</option>   
                           <option>Khác</option>   
                        </Input> 
                     </div>
                     <div className='divContainerInput'>
                        <div className='TitleName'>Ngày Sinh</div>
                        <Input placeholder="" className='Input' id='birthdayStaff' onChange={(e)=>handleChangeText(e)} /> 
                     </div>
                     <div className='divContainerInput'>
                        <div className='TitleName'>Nơi Sinh</div>
                        <Input placeholder="" className='Input' id='birthPlace' onChange={(e)=>handleChangeText(e)} /> 
                     </div>
                     <div className='divContainerInput'>
                        <div className='TitleName'>Số điện thoại</div>
                        <Input placeholder="" className='Input' id='numberPhone' onChange={(e)=>handleChangeText(e)} /> 
                     </div>
                     <div className='divContainerInput'>
                        <div className='TitleName'>Địa chỉ</div>
                        <Input placeholder="" className='Input' id='addressStaff' onChange={(e)=>handleChangeText(e)} /> 
                     </div>
                     <div className='divContainerInput'>
                        <div className='TitleName'>Số chứng minh nhân dân</div>
                        <Input placeholder="" className='Input' id='IDCardStaff' onChange={(e)=>handleChangeText(e)} /> 
                     </div>
                     <div className='divContainerInput'>
                        <div className='TitleName'>Phân công bộ phận</div>
                        <Input type='select' className='Input' id='department' onChange={(e)=>handleChangeText(e)} >
                           <option value='Bộ phận Vệ sinh nhà' >Chọn bộ phận</option>
                           <option value='Bộ phận Vệ sinh nhà' >Bộ phận Vệ sinh nhà</option>
                           <option value='Bộ phận Nấu ăn'>Bộ phận Nấu ăn</option>
                           <option value='Bộ phận Giặt ủi'>Bộ phận Giặt ủi</option>
                        </Input>
                     </div>
                        {/* <AddBox style={{marginTop: 18, color: 'blue',fontSize: 27 }} onClick={() => setArrayInput((preState) => [...preState, {}])} /> */}
                        {/* <button onClick={() => console.log(text)}>Show</button> */}
                  </div>
               </div>
            </ModalBody>
            <ModalFooter>
               <Button color="primary" 
                  onClick={
                     ()=>{ 
                     toggle()
                     AddStaff()
                     // console.log(state)
                  }
                  }>Đồng ý</Button>
               <Button color="secondary" onClick={()=>toggle()}>Trở lại</Button>
            </ModalFooter>
         </Modal>
      </div>
   )
}
export default ModalAddStaff