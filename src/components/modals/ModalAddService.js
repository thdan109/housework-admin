import React from 'react'
import  { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Text, Label, Row, Col } from 'reactstrap';
import axios from 'axios';
import '../../styles/ModalAddService.css';
import { Checkbox } from '@material-ui/core';
import AddBox from '@material-ui/icons/AddBox';
import Close from '@material-ui/icons/Close'
import Swal from 'sweetalert2'

const ModalChangeService = ( props ) =>{
   const {
      buttonLabel,
      className
   } = props;
   
   const [arrayInput, setArrayInput] = React.useState([]);
   const [text, setText] = React.useState("");
   const [modal, setModal] = React.useState(false);
   const toggle = () =>{
      setModal(!modal)
      // AddService()
   } 

   const [ state, setState ] = React.useState([])
   
   React.useEffect(()=>{
      // getDataStaff()
   },[])

  
   const handleChange = (value, index) => {
      var a = [...arrayInput];
      a[Number(index)].value = value.target.value;
      setArrayInput(a);
      console.log(arrayInput);
      setText(index + " with value: " + value.target.value);
   }

   const handleChangeDel = (index) => {
      var a = [...arrayInput];
      a.splice(index, 1);
      setArrayInput(a);
      // console.log(arrayInput);
   }

   const handleChangeText = async(e)  =>{
      // console.log(e.target.value);
      setState({
         ...state,
         [e.target.id]: e.target.value
      })
   }

   const AddService = async() =>{
      await axios.post('http://localhost:216/service/addService',{
         dataSend: state,
         price: arrayInput
      }).then(res =>{
         if (res.data.st === 'Oke'){
            Swal.fire({
               position: 'top',
               icon: 'success',
               title: 'Đã Thêm!',
               showConfirmButton: false,
               timer: 1500
          }).then(()=>window.location.reload())
          
         }
      })
   } 

   return (
      <div>
         <Row style={{marginBottom: 25}}>
            <AddBox style={{marginLeft: 18, color: 'blue',fontSize: 28 }} onClick={()=>toggle()} /><span > Thêm dịch vụ</span>
         </Row>
         {/* <Button color="primary" >Cập nhật</Button> */}
         <Modal isOpen={modal} toggle={toggle} className={className}>
         <ModalHeader toggle={toggle}>Thêm dịch vụ</ModalHeader>
         {/* <Button color="primary" onClick={()=>console.log(idStaff)}>Danh sách</Button> */}
            <ModalBody>
               <div className="Container">
                  <div>
                     <div className='divContainerInput'>
                        <div className='TitleName'>Tên dịch vụ</div>
                        <Input placeholder="" className='Input' id='nameService' onChange={(e)=>handleChangeText(e)} /> 
                     </div>
                     <div className='divContainerInput'>
                        <Label className='TitleName'>Mô tả</Label>
                        <Input type="textarea" placeholder="" style={{ height: 100 }} id='discription' onChange={(e)=>handleChangeText(e)} /> 
                     </div>
                     <div className='divContainerInput'>
                        <div className='divInputPrice' >
                           <Row>
                              <Col md={11}>
                                 <div>
                                    <Label className='TitleName'>Giá (Chỉ tiêu : Giá)</Label>
                                    <Input onChange={(e)=>handleChangeText(e)} id='value'  />
                                 </div>
                                 
                              </Col>
                           </Row>
                        </div>
                     </div>
                  
                     {arrayInput?.map((value, index) => (
                        <div key={index} className='divInputPrice'>
                           <Row>
                              <Col md={11}>
                                 <div>
                                    <Label className='TitleName'>Giá (Chỉ tiêu : Giá)</Label>
                                    <Input 
                                       // onChange={(e)=>handleChangeText(e)} 
                                       id={index}
                                       value={arrayInput[index]?.value}
                                       onChange={(value) => handleChange(value, index)}
                                    />
                                 </div>                                 
                              </Col>
                              <Col md={0.5} >
                                 <div style={{ marginTop: 35}}>
                                    <Close style={{ color: 'red',fontSize: 27 }} onClick={()=> handleChangeDel(index)} />
                                 </div>
                              </Col>
                           </Row>
                           <br></br>
                        </div>
                        ))}
                        <AddBox style={{marginTop: 18, color: 'blue',fontSize: 27 }} onClick={() => setArrayInput((preState) => [...preState, {}])} />
                        {/* <button onClick={() => console.log(text)}>Show</button> */}
                  </div>
               </div>
            </ModalBody>
            <ModalFooter>
               <Button color="primary" 
                  onClick={
                     ()=>{ toggle()
                     AddService()}
                  }>Đồng ý</Button>
               <Button color="secondary" onClick={()=>toggle()}>Trở lại</Button>
            </ModalFooter>
         </Modal>
      </div>
   )
}
export default ModalChangeService