import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { useHistory } from "react-router-dom";
import '../styles/test.css';
import MenuIcon from '@material-ui/icons/Apps';
import {Link} from 'react-router-dom'
import {HomeWorkSharp, PersonPinSharp, AccessibilitySharp, WorkSharp, FeedbackSharp, ChatSharp,EqualizerSharp, Info } from '@material-ui/icons'
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
      >
     

      <List>    
               {  [['Quản lý dịch vụ',"/admin/services",<HomeWorkSharp style={{ color: '#043927' }}/>], 
                  ['Quản lý Nhân viên',"/admin/staffs", <PersonPinSharp style={{ color: '#043927' }}/>], 
                  ['Quản lý Khách hàng',"/admin/customers",<AccessibilitySharp style={{ color: '#043927' }}/>], 
                  ['Quản lý Công việc',"/admin/orders", <WorkSharp style={{ color: '#043927' }}/>],
                  ['Quản lý Phản hồi',"/admin/feedbacks", <FeedbackSharp style={{ color: '#043927' }}/>],
                  ['Trò chuyện trực tiếp',"/admin/chat",<ChatSharp style={{ color: '#043927' }}/>],
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
         <div style={{ paddingLeft: 20}}>
            <ListItemText style={{paddingBottom: 20}}><b>Thông tin</b></ListItemText>
            <ListItemText style={{paddingBottom: 5, borderBottom: "1px solid black"}}>Tên: {Cookies.get('NameAdmin')}</ListItemText>
            <ListItemText style={{paddingBottom: 5, borderBottom: "1px solid black"}}>Chức vụ: {Cookies.get('Position')}</ListItemText>
            <ListItemText onClick={()=>LogOut()} style={{paddingBottom: 5, borderBottom: "1px solid black"}}><Link className='logout-link'>Đăng xuất</Link></ListItemText>
         </div>
         

      </List>
    </div>
  );

  return (
    <div>
      {['Menu'].map((anchor) => (
        <React.Fragment key={anchor}>
            < button
              
               className='btnMenu'
               onClick={toggleDrawer(anchor, true)}
               // startIcon={<MenuIcon className='icon' />}
            > 
                  {anchor}
            </button>



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
  );
}
