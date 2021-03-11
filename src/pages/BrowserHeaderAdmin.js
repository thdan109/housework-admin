import '../styles/BrowserHeaderAdmin.css';
import React, {useState } from "react";
import { BrowserRouter as Route, Router , Link } from "react-router-dom";
import AdminServiceManagement from '../components/AdminServiceManagement.js'
import '../components/bootstrap';
import Cookies from 'js-cookie'
import {
   NavLink
 } from 'reactstrap';
 


const BrowserHeaderAdmin = (props) => {

   const [isOpen, setIsOpen] = useState(false);
  
   const LogOut = () =>{
      Cookies.remove('IdAdmin');
      window.location.reload(1)
   }
   return (
      <div className='ContainerBrowserHeader'> 
         <div className='ContainerMenuAdmin'>  
            <div className='parentMenuAdmin'>
               <div className='MenuAdmin'>
                  <NavLink className='NavLinkMenuAdmin'>
                     <Link to="/admin/services" className="LinkMenu">Quản lý dịch vụ</Link>
                  </NavLink>
                  <NavLink className='NavLinkMenuAdmin'>
                     <Link to="/admin/staffs" className="LinkMenu">Quản lý Nhân viên</Link>
                  </NavLink>
                  <NavLink className='NavLinkMenuAdmin'>
                     <Link to="/admin/customers" className="LinkMenu">Quản lý Khách hàng</Link>
                  </NavLink>
                  <NavLink className='NavLinkMenuAdmin'>
                     <Link to="/admin/orders" className="LinkMenu">Quản lý Công việc</Link>
                  </NavLink>
                  <NavLink className='NavLinkMenuAdmin'>
                     <Link to="/admin/feedbacks" className="LinkMenu">Quản lý Phản hồi</Link>
                  </NavLink>
                  <NavLink className='NavLinkMenuAdmin'>
                     <Link to="/admin/chat" className="LinkMenu">Trò chuyện trực tiếp</Link>
                  </NavLink>
                  <NavLink className='NavLinkMenuAdmin'>
                     <Link to="/admin/statistic" className="LinkMenu">Thống kê</Link>
                  </NavLink>
                  <div className='ContainerInfor' >
                     <div>
                        <NavLink className='inforAd'>
                           Tên: {Cookies.get('NameAdmin')} <br/>
                        </NavLink>
                        <NavLink className='inforAd'>
                           Chức vụ: {Cookies.get('Position')}
                        </NavLink>
                     </div>
                     <div onClick={()=>LogOut()}>  
                        <NavLink className='inforAd'>
                           <Link className='logout-link'>Đăng xuất</Link>
                        </NavLink> 
                     </div>
                  </div>
               </div>
            </div>                   
            <div className='TableMaterial'>
               
            </div>      

         </div>
         
              
         
      </div>

   )

}
export default BrowserHeaderAdmin;