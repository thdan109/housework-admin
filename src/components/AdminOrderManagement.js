import React from 'react'
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';


import OrderScreen from './CookingService'
import ClearScreen from './ClearService'
import WashingComponent from './WashingService'

import '../styles/OrderAdmin.css'



const useStyles = makeStyles((theme) => ({
   formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
   },
      selectEmpty: {
      marginTop: theme.spacing(2),
   },
}));

const AdminOrder = () =>{

   const [activeTab, setActiveTab] = React.useState('1');

   const toggle = tab => {
      if(activeTab !== tab) setActiveTab(tab);
   }
   
   const [state, setState] = React.useState({
      order: '',
      name: 'hai',
    });
   const [type, setType] = React.useState({
      cooking: true,
      housework: null,
      washing: null,
      farm: null
   })
   const classes = useStyles();
   const handleChange = (event) => {
      const name = event.target.name;
      setState({
        ...state,
        [name]: event.target.value,
      });
      const option_val = event.target.value
      if (option_val == 1){
         setType({
            cooking:true,
            housework: null,
            washing: null,
            farm: null
         })
      }else if (option_val == 2 ){
         setType({
            cooking:null,
            housework: true,
            washing: null,
            farm: null
         })
      }else if (option_val==3){
         setType({
            cooking:null,
            housework: null,
            washing: true,
            farm: null
         })
      }else if (option_val == 4)
         setType({
            cooking:null,
            housework: null,
            washing: null,
            farm: true
         })
   }


   return(
      <div className="ContainerAdminOrder">
         
         {/* <div className='OptionOrder'>
            
            <FormControl className={classes.formControl}>
               <InputLabel shrink htmlFor="age-native-label-placeholder" >
                 Chọn dịch vụ
               </InputLabel>
               <NativeSelect
                  style={{fontSize: 18}}
                  className='options'
                  value={state.order}
                  onChange={handleChange}
                  inputProps={{
                     name: 'order',
                     id: 'age-native-label-placeholder',
                  }}
               >
                  <option value={1}>Nấu ăn</option>
                  <option value={2}>Dọn dẹp nhà</option>
                  <option value={3}>Giặt ủi</option>
               
                  
               </NativeSelect>
               
            </FormControl>
         </div> */}
      
         <div className='ContainerTable'>
            <Nav tabs>
               <NavItem>
                  <NavLink
                     className={classnames({ active: activeTab === '1' })}
                     onClick={() => { toggle('1'); }}
                  >
                     Nấu ăn
                  </NavLink>
               </NavItem>
               <NavItem>
                  <NavLink
                     className={classnames({ active: activeTab === '2' })}
                     onClick={() => { toggle('2'); }}
                  >
                     Dọn nhà
                  </NavLink>
               </NavItem>
               <NavItem>
                  <NavLink
                     className={classnames({ active: activeTab === '3' })}
                     onClick={() => { toggle('3'); }}
                  >
                     Giặt ủi
                  </NavLink>
               </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
               <TabPane tabId="1">
                  <Row>
                     <Col >
                        <Card>
                           <OrderScreen /> 
                        </Card>
                     </Col>
                  </Row>
               </TabPane>
               <TabPane tabId="2">
                  <Card>
                     <ClearScreen /> 
                  </Card>
                     
               </TabPane>
               <TabPane tabId="3">
                  <Row>
                     <Col>
                        <Card>
                           <WashingComponent /> 
                        </Card>
                     </Col>
                    
                  </Row>
               </TabPane>
            </TabContent>
            {/* {
               
               (type.cooking === true)?
                  <OrderScreen /> 
               :           
               (type.housework == true)?
                  // <div>a2</div>
                  <ClearScreen />
               :
               (type.washing === true)?
                  <WashingComponent/>
               :
               // (type.farm === true)?
               // <div>a4</div>
               // : 
               <div>kcj</div>
            } */}
         </div>
         
         



      </div>
   )
}

export default AdminOrder