import React, { useState, forwardRef } from 'react';
import Axios from 'axios';

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
import ModalWashing from './modals/ModalWashing'

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

   const WashingOrder = () =>{
      useEffect(()=>{
         getData()
      }, [])


   const [data, setData] = useState([]);
   
   const getData = async() =>{
      const data = await Axios.get('http://localhost:216/washing/getData')
      // console.log(data.data);
      setData(data.data)
   }

   const handleChangeStatus = async(e) =>{
      const status = e.target.value
      const id = e.target[e.target.selectedIndex].id
      const data = await Axios.post('http://localhost:216/washing/changeStatus',{
         id: id,
         status : status 
      })
      // getData()
      if (data.data.notifi === "Oke"){
         getData()
      }
   }
   const  [columns, setColumns] = useState([
      { title: "ID đơn", field: '_id'},
      { title: 'Tên KH', field: 'fullname' },
      { title: "Ngày gửi", field: 'dateSend', type: 'date'},
      { title: 'Giờ gửi', field: 'timeSend'},
      { title: "Ngày nhận", field: 'dateTake', type: 'date'},
      { title: 'Giờ nhận', field: 'timeTake'},
      { title: 'Nhân viên', field: 'staff' ,
         render: rowData=>
            rowData.staff.map((dt)=> <p>{dt}</p>)
      },
      { title: 'Ghi chú', field: 'note'},
      { title: 'Trạng thái', field: 'status', render: rowData => (
         <>
             <select onChange={(e)=>handleChangeStatus(e)} style={{ borderWidth:  0, fontSize: 14}}>
               <option>{rowData.status}</option>
               {/* <option id={rowData._id} value="0">Đang chờ xác nhận</option> */}
               <option id={rowData._id} value="0">Đã Xác nhận</option>
               <option id={rowData._id} value="2">Đã đến</option>
               <option id={rowData._id} value="1">Đang thực hiện</option>
               {/* <option id={rowData._id} value="2">Đã thanh toán</option> */}
             </select>
         </>
       )},
      { title: 'Địa chỉ', field: 'address' },
      { title: 'Tổng tiền',  field: 'money'},
      { title: 'Phân công', field: 'dataStaff.arrs',render: rowData => (
         <>
            <ModalWashing 
               data={[
                  { timeSend: rowData.timeSend },
                  { timeTake: rowData.timeTake }, 
                  { dateSend: rowData.dateSend }, 
                  { dateTake: rowData.dateTake },
                  { id: rowData._id}
               ]} 
            />
         </>
       )},
   ]);


   return (
      <div>
         {/* <button onClick={()=>console.log(dataStaff.arrs)}>aaaaaaa</button> */}
         <MaterialTable
         title="Giặt ủi"
         icons={tableIcons}
         columns={columns}
         data={data}
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

            onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
               setTimeout(() => {
                  const dataUpdate = [...data];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  setData([...dataUpdate]);
                     Axios.post('http://localhost:216/staff/updatedataStaff',
                        newData
                     )
                  resolve();
               }, 1000)
            }),

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


 export default WashingOrder;