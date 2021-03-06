import React from 'react'
import '../styles/OrderAdmin.css'
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';

import WashingSave from './WashingSaveService'
import CookingSave from './CookingSaveService'
import ClearSave from './ClearSaveService'

const useStyles = makeStyles((theme) => ({
   formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
   },
      selectEmpty: {
      marginTop: theme.spacing(2),
   },
}));




const AdminStatistical = () =>{
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
          <Nav tabs>
               <NavItem>
                  <NavLink
                     className={classnames({ active: activeTab === '1' })}
                     onClick={() => { toggle('1'); }}
                  >
                     N???u ??n
                  </NavLink>
               </NavItem>
               <NavItem>
                  <NavLink
                     className={classnames({ active: activeTab === '2' })}
                     onClick={() => { toggle('2'); }}
                  >
                     D???n nh??
                  </NavLink>
               </NavItem>
               <NavItem>
                  <NavLink
                     className={classnames({ active: activeTab === '3' })}
                     onClick={() => { toggle('3'); }}
                  >
                     Gi???t ???i
                  </NavLink>
               </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
               <TabPane tabId="1">
                  <Row>
                     <Col >
                        <Card>
                        <CookingSave />
                        </Card>
                     </Col>
                  </Row>
               </TabPane>
               <TabPane tabId="2">
                  <Card>
                       <ClearSave />
                     
                  </Card>
                     
               </TabPane>
               <TabPane tabId="3">
                  <Row>
                     <Col>
                        <Card>
                          <WashingSave/>
                        </Card>
                     </Col>
                    
                  </Row>
               </TabPane>
            </TabContent>




      </div>
   )



}

export default  AdminStatistical