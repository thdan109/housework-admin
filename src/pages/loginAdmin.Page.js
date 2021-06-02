import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import { Button , TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {Media} from 'reactstrap'
import Axios from 'axios';
import image from '../assist/professional-cleaning-service-woman-cleaner-make-some-housework-professional-cleaning-service-woman-cleaner-make-some-housework-101114642.jpg'
import Cookies from 'js-cookie';
import  '../styles/LoginAdmin.css';


const LoginAdmin = (props) =>{
   const history = useHistory()
   useEffect(()=>{
      if (Cookies.get('IdAdmin')){
         props.history.push('/admin')
      }
   },[])
   const LoginAdmin = (e) =>{
      e.preventDefault();
      const {usernameEntered, passwordEntered } = e.target;
      Axios.post('http://localhost:216/admin', {
         username: usernameEntered.value,
         password: passwordEntered.value
      }).then(res =>{
         if (res.data.id){
            Cookies.set('IdAdmin',res.data.id,{expires: 7})
            Cookies.set('Position',res.data.position,{expires: 7})
            Cookies.set('NameAdmin',res.data.name, {expires: 7})
            window.location.reload(1)
         }else{
            window.location.reload(1) 
         }
      })
   }

   return(

      <div className='ContainerLoginAdmin'>
         <div className='containerr'>
         {/* <div> */}
         <div className='container-image'>
            {/* <Media object data-src={"../../../express-server/public/images/professional-cleaning-service-woman-cleaner-make-some-housework-professional-cleaning-service-woman-cleaner-make-some-housework-101114642.jpg"} alt="Generic placeholder image" /> */}
            <img src ={image} className="image" />
         </div>
         <div className='LoginAdmin'>

            <div className='TitleLoginAdmin'>
               LOGIN
            </div>
               <form onSubmit={(e)=>LoginAdmin(e)} noValidate  autoComplete="off" >
                  <div className='TextfieldUsername'>
                     <TextField id="outlined-basic" label="Username" variant="outlined" name='usernameEntered' />
                  </div>
                  <div className='TextfieldPassword'>
                     <TextField id="outlined-basic" type='password' label="Password" variant="outlined" name='passwordEntered'/>
                  </div>
                  {/* <div className='ButtonLogIn'> */}
                     <Button className='btnlogin' type='sunmit'>LOGIN</Button>
                  {/* </div> */}
               </form>
         </div>
         </div>
         
      </div>

   )
   

}

export default LoginAdmin;