import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem,NavLink,Navbar, Nav, NavItem,  UncontrolledDropdown } from 'reactstrap';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Menu from '@material-ui/icons/Menu'
import { useHistory } from "react-router-dom";
import '../styles/test.css';
import MenuIcon from '@material-ui/icons/Apps';
import {Link} from 'react-router-dom'
import {HomeWorkSharp, PersonPinSharp, AccessibilitySharp, WorkSharp, FeedbackSharp, AssignmentTurnedInSharp,EqualizerSharp, ReportProblem , MonetizationOn} from '@material-ui/icons'
import Cookies from 'js-cookie';

const useStyles = makeStyles({
   list: {
      width: 250,
   },
   fullList: {
      width: 'auto',
   },
});

export default function SwipeableTemporaryDrawer(props) {
   const classes = useStyles();
   const history = useHistory()
   const [dropdownOpen, setDropdownOpen] = React.useState(false);
   const toggle = () => setDropdownOpen(prevState => !prevState);
   const [state, setState] = React.useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
   });
   const toggleDrawer = (anchor, open) => (event) => {
      if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
         return;
      }

      setState({ ...state, [anchor]: open });
   };
   const LogOut = () =>{
      Cookies.remove('IdAdmin');
      history.push("/admin"); 
      window.location.reload(1);
     
      
   }

   const list = (anchor) => (
      <div
         className={clsx(classes.list, {
         [classes.fullList]: anchor === 'top' || anchor === 'bottom',
         })}
         role="presentation"
         onClick={toggleDrawer(anchor, false)}
         onKeyDown={toggleDrawer(anchor, false)}
         style={{backgroundColor: '#DCDCDC', height: '100%'}}
      >
     

      <List style={{}}>    
               {  [['Quản lý dịch vụ',"/admin/services",<HomeWorkSharp style={{ color: '#043927' }}/>], 
                  ['Quản lý Nhân viên',"/admin/staffs", <PersonPinSharp style={{ color: '#043927' }}/>], 
                  ['Quản lý Khách hàng',"/admin/customers",<AccessibilitySharp style={{ color: '#043927' }}/>], 
                  ['Quản lý Công việc',"/admin/orders", <WorkSharp style={{ color: '#043927' }}/>],
                  ['Việc đã hoàn thành',"/admin/saveorders", <AssignmentTurnedInSharp style={{ color: '#043927' }}/>],
                  ['Quản lý Phản hồi',"/admin/feedbacks", <FeedbackSharp style={{ color: '#043927' }}/>],
                  ['Quản lý Báo cáo',"/admin/reports", <ReportProblem style={{ color: '#043927' }}/>],
                  ['Lương nhân viên',"/admin/salary",<MonetizationOn style={{ color: '#043927' }}/>],
                  ['Thống kê',"/admin/statistic", <EqualizerSharp style={{ color: '#043927' }}/>]].map(([text,link,icon], index) => (
                   <Link className='Link' to={link}>
                     <ListItem button key={text}>
                        {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                        <ListItemIcon >{icon}</ListItemIcon>
                        <ListItemText primary={text} />
                     </ListItem>
                  </Link>
               ))}   
      </List>
      <Divider />
      <List>
         {/* <ListItemText style={{textAlign: "center"}}><b>Thông tin</b></ListItemText>
         {[['Tên',Cookies.get('NameAdmin')], ['Chức vụ: ',Cookies.get('Position')]].map(([title,text], index) => (
            <ListItem button key={text}>
               <ListItemIcon>{icon}</ListItemIcon>
               <ListItemText primary={title}/>
               <ListItemText primary={text} />
            </ListItem>
         ))} */}
         {/* <div style={{ paddingLeft: 20}}>
            <ListItemText style={{paddingBottom: 20}}><b>Thông tin</b></ListItemText>
            <ListItemText style={{paddingBottom: 5, borderBottom: "1px solid black"}}>Tên: {Cookies.get('NameAdmin')}</ListItemText>
            <ListItemText style={{paddingBottom: 5, borderBottom: "1px solid black"}}>Chức vụ: {Cookies.get('Position')}</ListItemText>
            <ListItemText onClick={()=>LogOut()} style={{paddingBottom: 5, borderBottom: "1px solid black"}}><Link className='logout-link'>Đăng xuất</Link></ListItemText>
         </div> */}
         

      </List>
    </div>
  );

  return (
    <div>
       <div className='header'>
         {['Menu'].map((anchor) => (
         <React.Fragment key={anchor}>
               {
               /* < button
               
                  className='btnMenu'
                  onClick={toggleDrawer(anchor, true)}
                  // startIcon={<MenuIcon className='icon' />}
               > 
                     {anchor}
               </button> */}
               <div className='divMenu'>
                  <div className="divContainer"  >
                     <Menu style={{ fontSize: 45, color: 'white'}} onClick={toggleDrawer(anchor, true)}/> 
                     <div className="divInfor">
                     
                        {/* <Dropdown  isOpen={dropdownOpen} toggle={toggle}>
                           <DropdownToggle caret>
                              <span style={{fontWeight: 'bold'}}>ADMIN</span> 
                           </DropdownToggle>
                           <DropdownMenu>
                              <DropdownItem header>Header</DropdownItem>
                              <DropdownItem style={{backgroundColor: '#DCDCDC'}} ><span style={{fontWeight: 'bold', }}>Tên</span><span style={{float: 'right'}}>{Cookies.get('NameAdmin')}</span></DropdownItem>
                              <DropdownItem style={{backgroundColor: '#D3D3D3'}}><span style={{fontWeight: 'bold'}}>Chức vụ</span><span style={{float: 'right'}}>{Cookies.get('Position')}</span></DropdownItem>
                              <DropdownItem style={{backgroundColor: '#DCDCDC'}}>Đăng xuất</DropdownItem>   
                              
                           </DropdownMenu>
                        </Dropdown> */}
                        <UncontrolledDropdown setActiveFromChild>
                           <DropdownToggle tag="a" className="nav-link" caret>
                                 <span style={{fontWeight: 'bold',color: "white"}}>ADMIN</span> 
                           </DropdownToggle>
                           <DropdownMenu>
                              <DropdownItem style={{backgroundColor: '#DCDCDC'}}><Link className='Link'> <span style={{fontWeight: 'bold', }}>Tên</span><span style={{float: 'right'}}>{Cookies.get('NameAdmin')}</span> </Link></DropdownItem>
                              <DropdownItem style={{backgroundColor: '#D3D3D3'}}><Link className='Link'> <span style={{fontWeight: 'bold', }}>Chức vụ</span><span style={{float: 'right'}}>{Cookies.get('Position')}</span> </Link></DropdownItem>
                              <DropdownItem onClick={()=>LogOut()} style={{backgroundColor: '#DCDCDC'}}><Link className='Link'>Đăng xuất</Link></DropdownItem>
                           </DropdownMenu>
                        </UncontrolledDropdown>
                     </div>

                  </div>
                 
                     
               
               </div>
               


            <SwipeableDrawer
                  anchor={anchor}
                  open={state[anchor]}
                  onClose={toggleDrawer(anchor, false)}
                  onOpen={toggleDrawer(anchor, true)}
               >
                  {list(anchor)}
               </SwipeableDrawer>
         </React.Fragment>
         ))}
       </div>
      
    </div>
  );
}

