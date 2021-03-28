import React from 'react'
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

import OrderScreen from './CookingService'


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
         <h2></h2>
         <div className='OptionOrder'>
            
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
                  <option value={3}>Chăm sóc sân vườn</option>
                  <option value={4}>Giặt ủi</option>
                  
               </NativeSelect>
               {/* <FormHelperText>Label + placeholder</FormHelperText> */}
            </FormControl>
         </div>
      
         <div className='ContainerTable'>
            {
               
               (type.cooking === true)?
                  <OrderScreen /> 
               :           
               (type.housework == true)?
                  <div>a2</div>
               :
               (type.washing === true)?
                  <div>a3</div>
               :
               (type.farm === true)?
               <div>a4</div>
               : 
               <div>kcj</div>
            }
         </div>




      </div>
   )
}

export default AdminOrder