import React, { useState, forwardRef } from 'react';
import Axios from 'axios';
import { Table , List, Button, Card, Col} from 'reactstrap';
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
import ModalUpdate from './modals/ModalUpdateSalary'
import '../styles/SalaryStaff.css'
import Swal from 'sweetalert2'

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

  const  SalaryStaff = ( props ) => {

   useEffect(()=>{
      getDataSalary()
      getDataSalaryStaff()
      // getDataStaff();
   },[])

   const getDataSalary = async() =>{
      await Axios.get('http://localhost:216/salary/getDataSalary').then(res =>{
         setDataSalary(res.data)
      })     
   }

   const getDataSalaryStaff = async() =>{
      await Axios.get('http://localhost:216/salary/getData').then(res =>{
         setData(res.data)
      })
   }

   const count = async() =>{
      await Axios.post('http://localhost:216/salary/countSalary',{
         request: 'Oke'
      }).then(result =>{
         if (result.data.status==='Create Salary Successfully!'){
            Swal.fire({
               position: 'top',
               icon: 'success',
               title: '???? t??nh!',
               showConfirmButton: false,
               timer: 1500
          }).then(()=>window.location.reload())
         }else{
            Swal.fire({
               icon: 'error',
               title: 'Fail...',
               text: 'L????ng ch??a ???????c t??nh!',
               // footer: '<a href>Why do I have this issue?</a>'
             }).then(()=>window.location.reload())
         }
      }).catch(err=>{

      })
   }

   const  [columns, setColumns] = useState([
      { title: "ID Nh??n vi??n", field: 'idStaff'},
      { title: 'T??n Nh??n vi??n', field: 'nameStaff' },
      { title: 'B??? ph???n', field: 'department' },
      { title: 'Ngh???', field: 'absent' },
      { title: 'Vi???c', field: 'work' },
      { title: 'T???ng nh???n',  field: 'salary',type:'currency', currencySetting:{ locale: 'vi',currencyCode:'VND', minimumFractionDigits:0, maximumFractionDigits:2}},
   ]);
   const [data, setData] = useState([]);
   const [dataSalary, setDataSalary] = useState([]);
   
   
   return (
      <div>
         <div className='dicription'>
         {
            dataSalary.map(dt =>(
            <>
               <div  >
                  <Col sm="3">
                     <Card className="tab">
                     <List type="unstyled">
                        <li>Qui ?????c t??nh l????ng 
                        
                              <ul>
                                 <li>Ch??? ti??u tr??n th??ng: {dt.target} vi???c</li>
                                 <li>1 vi???c b???ng: {dt.work} VN??</li>
                                 <li>L????ng: {dt.salary} VN??</li>
                                 <li>1 vi???c v?????t ch??? ti??u: {dt.bonus} * {dt.work}</li>
                                 <li>Ngh???: {dt.absent} * {dt.work}</li>
                                 <li>T???ng: vi???c + vi???c v?????t ch??? ti??u - ngh??? - ph???t </li>
                              </ul>
                        </li>
                     </List>
                        <div style={{ margin: "auto", marginBottom: '10px'}}>
                           <ModalUpdate id = { dt._id } /> 
                        </div>
                     </Card>
                  </Col>
               </div>
            </>
            ))
         }
         </div>
         <div style={{marginBottom: '10px'}}>
            <Button onClick={()=>count() } color="danger" >T??nh l????ng</Button>
         </div>
           
         <MaterialTable
         title="L????ng nh??n vi??n"
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


 export default SalaryStaff;