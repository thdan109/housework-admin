import React, { useEffect} from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';

import LoginAdmin from './pages/loginAdmin.Page';
import BrowserHeaderAdmin from './pages/BrowserHeaderAdmin.js'
import AdminServiceManagement from './components/AdminServiceManagement';
import CustomerHeader from './components/CustomerHeader'
import StaffManagement from './components/StaffManangent';
import CustomerManagement from './components/CustomerManagement';
import ServiceManagement from './components/AdminServiceManagement';
import OrderManagement from './components/AdminOrderManagement'
import SaveOrderManagement from './components/AdminStatisticalManagement'
import MyComponent from './components/FeedbackAdmin'
import Feedback from './components/FeedbackFromCustomer'
import Report from './components/ReportStaff'
import Salary from './components/SalaryStaff'
import LeaveStaff from './components/LeaveStaff'
import Statistical from './components/Statistical'
import VoucherManagement from './components/VoucherManagement'

import Test from './components/test';
import Cookies from 'js-cookie';
import './App.css'
const  App = () => {
   useEffect(()=>{
      // TestConnect();
   },[])
   return (
      (Cookies.get('IdAdmin'))?
      <Router>
         <div className="ContainerApp">
            <Route path='/' exact component={CustomerHeader} />
            <div className='LeftAdmin'>
               {/* <Route path='/admin' component={BrowserHeaderAdmin}/>   */}
               <Route  path='/admin' component={Test} />
               {/* <Route path='/admin/staffs' component={StaffManagement} /> 
               <Route path='/admin/customers' component={CustomerManagement} /> 
               <Route path='/admin/services' component={ServiceManagement} />   */}
            </div>
            <div className='RightAdmin'>
               {/* <Route path='/admin/services' exact  component={AdminServiceManagement} /> */}
               <Route path='/admin/staffs' component={StaffManagement} /> 
               <Route path='/admin/customers' component={CustomerManagement} /> 
               <Route path='/admin/services' component={ServiceManagement} />  
               <Route path='/admin/orders' component={OrderManagement} />
               <Route path='/admin/saveorders' component={SaveOrderManagement} /> 
               <Route path='/admin/feedbacks' component={Feedback} />
               <Route path='/admin/reports' component={Report} />
               <Route path='/admin/salary' component={Salary} />
               <Route path='/admin/leavestaff' component={LeaveStaff} />
               <Route path='/admin/statistic' component={Statistical} />
               <Route path='/admin/vouchers' component={VoucherManagement} />
            </div>    
              
         </div>
      </Router>
      :
      <Router>
         <div className="ContainerApp">   
            <Route path='/' exact component={CustomerHeader} />        
            <Route path='/admin' exact component={LoginAdmin} />
         </div>            
      </Router>                  
  );

}

export default App;
