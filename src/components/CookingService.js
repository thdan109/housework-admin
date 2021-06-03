import React, { useState, forwardRef } from 'react';
import Axios from 'axios';
import {Button} from 'reactstrap'
import Swal from 'sweetalert2'

import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { useEffect } from 'react';
import MyComponent from './getDataStaffFree'
import ModalAssignment from './ModalAssignment'

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };


  const  CookingOrder = ( props ) => {

   useEffect(()=>{
      getDataOrder();
      // getDataStaff();
   },[])


   const getDataOrder = () =>{
      Axios.get('http://localhost:216/cooking/dataCooking').then(res =>{
         setData(res.data)  
      })  
   }

   const PushNotifi = async(val,val1) =>{
      // console.log(val);
      await Axios.post('http://localhost:216/user/pushNotifiCooking',{
         id: val, idWork: val1
      }).then(res =>{
         if (res.data.status === 'Oke'){
            Swal.fire({
               position: 'top',
               icon: 'success',
               title: 'Thành công!',
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
      }).catch(err =>{
      //    Swal.fire({
      //       position: 'top',
      //       icon: 'error',
      //       title: 'Lỗi!',
      //       showConfirmButton: false,
      //       timer: 1500
      //  })
      })
      
   }
   const handleChangeStatus = async(e) =>{
      const status = e.target.value
      const id = e.target[e.target.selectedIndex].id
      const data = await Axios.post('http://localhost:216/cooking/changeStatus',{
         id: id,
         status : status 
      })
      // getData()
      if (data.data.notifi === "Oke"){
         getDataOrder()
      }
   }

   const  [columns, setColumns] = useState([
      // { title: "ID đơn", field: '_id'},
      { title: 'Tên KH', field: 'fullname' },
      { title: "Số người ăn", field: 'number'},
      { title: 'Món ăn', field: 'dishList', render: rowData =>
         rowData.dishList.map((dt, index)=> <p>{dt}</p>)
      },
      { title: 'Nhân viên' , field: 'staff', render: rowData=>
         rowData.staff.map((dt)=> <p>{dt}</p>)
      },
      { title: 'Đi chợ', field: 'goMarket'},
      { title: 'Thời gian', field: 'timeStart'},
      { title: 'Ngày', field: 'date', type: 'date'},
      { title: 'Yêu cầu', field: 'reqStaff.fullnameStaff', 
         render: rowData =>(
           
               !rowData.reqStaff ?
               <>
                  Không
               </>
               :
               <>
                  {rowData.reqStaff.fullnameStaff}
               </>
         )
      },
      { title: 'Địa chỉ', field: 'address', width : '30%' },
      { title: 'Tổng tiền',  field: 'money'},
      { title: 'Trạng thái', field: 'status', render: rowData => (
         <>
             <select onChange={(e)=>handleChangeStatus(e)} style={{ borderWidth:  0, fontSize: 14}}>
               <option>{rowData.status}</option>
               <option id={rowData._id} value="0">Xác nhận</option>
               <option id={rowData._id} value="1">Đang thực hiện</option>
               {/* <option id={rowData._id} value="2">Đã thanh toán</option> */}
             </select>
         </>
       )},
      { title: 'Phân công', field: 'dataStaff.arrs',render: rowData => (
         <>
            <ModalAssignment data={[{time:rowData.timeStart}, {date:rowData.date}, {idUser: rowData.idUser}, {id: rowData._id}]} />
         </>
       )},
       { title: 'Thông báo', field: 'username',render: rowData => (
         <>
         {
            rowData.reqStaff?
               <Button color="danger" onClick={()=>PushNotifi(rowData.idUser, rowData._id)} >Báo bận</Button>
            :
            <></>
         }
         </>
       )},
     
   ]);
   const [data, setData] = useState([]);
   const [dataStaff, setDataStaff] = useState({
      arrs: []
   })
   
   return (
      <div>
         {/* <button onClick={()=>console.log(dataStaff.arrs)}>aaaaaaa</button> */}
         <MaterialTable
         title="Quản lý Dịch vụ Nấu ăn"
         icons={tableIcons}
         columns={columns}
         data={data}
         options={{
            tableLayout: "auto"
         }}
         editable={{
            // onRowAdd: newData =>
            //   new Promise((resolve, reject) => {
            //     setTimeout(() => {
            //       setData([...data, newData]);
            //       Axios.post('http://localhost:216/staff/addStaff', 
            //          newData
            //       )
            //       resolve();
            //     }, 1000)
            //   }),

            // onRowUpdate: (newData, oldData) =>
            // new Promise((resolve, reject) => {
            //    setTimeout(() => {
            //       const dataUpdate = [...data];
            //       const index = oldData.tableData.id;
            //       dataUpdate[index] = newData;
            //       setData([...dataUpdate]);
            //          Axios.post('http://localhost:216/staff/updatedataStaff',
            //             newData
            //          )
            //       resolve();
            //    }, 1000)
            // }),

            //   onRowDelete: oldData =>
            //   new Promise((resolve, reject) => {
            //       setTimeout(() => {
            //           const dataDelete = [...data];
            //           const index = oldData.tableData.id;
            //           dataDelete.splice(index, 1);
            //           setData([...dataDelete]);
            //             const idStaff = oldData._id;
            //             Axios.get('http://localhost:216/staff/delStaff/id='+idStaff).then(res =>{
            //                // getDataStaff()
            //             })
            //           resolve();
            //       }, 1000);
            //   })
            }}
         />
         
      </div>

   )
 }


 export default CookingOrder;