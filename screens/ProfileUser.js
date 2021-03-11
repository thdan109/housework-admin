import React from 'react';
import { View, Text, StatusBar, Dimensions, Button , AsyncStorage, TouchableOpacity, Modal, StyleSheet, Pressable, TextInput, TextInputBase} from 'react-native';
import {Entypo, FontAwesome, MaterialIcons, Ionicons, FontAwesome5 } from 'react-native-vector-icons'
const {width, height} = Dimensions.get('screen');
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../action/user';
import Moment from 'moment';
import { abs } from 'react-native-reanimated';



const  ProfileUser= ({ navigation }) => {
   const user = useSelector(state => state)
   // const dispatch = useDispatch();
   //State modal
   const [modalVisible, setModalVisible] = React.useState(false);
   
   React.useEffect(()=>{
      // console.log(user);
      // getProfile()
   },[])

   const handleSignOut = async() => {
      await AsyncStorage.removeItem("Login")
      navigation.replace("Login")
   }

   // const getProfile = async () =>{
   //    console.log(user.users.data._id);
   // }
   return (
      
     <View style={{ flex: 1, backgroundColor: "rgb(230, 230, 230)"}}>
        <StatusBar />
         <View style={{ flexDirection: 'row', borderWidth: 0, alignItems: 'center', paddingHorizontal: 10, justifyContent: 'center',   backgroundColor: '#043927'  }}>
            <Text style={{ opacity: 0 }}>
               A
            </Text>
            <View style={{ flex: 1, alignItems: 'center',}}>
               <Text style={{fontSize: 22, fontWeight: 'bold', color: 'white',}}>Thông tin cá nhân</Text>
            </View>
         
            <Text style={{ opacity: 0 }}>
               A
            </Text>
           
         </View>
         <View style={{ height: height / 6, backgroundColor:"#043927"}}>

         </View>
         <View style={{flex: 1/1.2, marginHorizontal: 15, marginTop: -90, borderRadius: 10, backgroundColor: "white"}}>  
            <View 
               style={{
                     flexDirection: "row", 
                     width:width / 1.08,
                     height: height / 10, 
                     marginTop: 10 
               }}
            >
               <View style={{ justifyContent: "center",width: width / 4, height: height/10, borderWidth:0  }}>
                  <View style={{backgroundColor: "#043927",  width: 80, height: 80, borderWidth: 0, borderRadius: 40,marginLeft: 20}}>
                     
                  </View>
               </View>
               
               <View 
                  style={{ 
                     width: width/1.85 , 
                     justifyContent: "center", 
                     marginLeft: 10 ,
                     // borderWidth: 1
                  }}
               >
                     <Text style={{fontSize: 18, fontWeight: 'bold'}} >
                        {user.users.data.fullname}
                     </Text>
                     <Text style={{fontSize: 14, fontStyle: "italic"}}>{user.users.data.email}</Text>
               </View>
{/* Modal */}
               <View style={{flex:1, justifyContent: 'center' }}>
                     <View style={styles.centeredView}>
                        <Modal
                           animationType="fade"
                           transparent={true}
                           visible={modalVisible}
                           onRequestClose={() => {
                              Alert.alert("Modal has been closed.");
                              setModalVisible(!modalVisible);
                           }}
                        >
                              <View style={styles.centeredView}>
                                 <View style={styles.modalView}>
                                    <Text style={styles.modalText}>Cập nhật thông tin</Text>

                                    <View 
                                       style={{
                                          width: width / 1.12, 
                                          // marginHorizontal: 30, 
                                          // borderWidth: 1
                                          // borderWidth: 0.5, 
                                          //    borderRadius: 10
                                       }}
                                    >
                                       <View style={{flexDirection: "row" , marginHorizontal:8, marginBottom: 10 , borderBottomWidth: 0.5}}>
                                          <Text 
                                             style={{ 
                                                flex:1, 
                                                fontWeight: 'bold'
                                             }} 
                                          >
                                             Họ và tên
                                          </Text>
                                          <TextInput 
                                             placeholder={user.users.data.fullname}
                                          ></TextInput>
                                       </View>

                                       <View style={{flexDirection: "row" , marginHorizontal:8, marginBottom: 10 , borderBottomWidth: 0.5}}>
                                          <Text 
                                             style={{ 
                                                flex:1, 
                                                fontWeight: 'bold'
                                             }} 
                                          >
                                            Số điện thoại
                                          </Text>
                                          <TextInput 
                                             placeholder={user.users.data.phone}
                                          ></TextInput>
                                       </View>

                                       <View style={{flexDirection: "row" , marginHorizontal:8, marginBottom: 10 , borderBottomWidth: 0.5}}>
                                          <Text 
                                             style={{ 
                                                flex:1, 
                                                fontWeight: 'bold'
                                             }} 
                                          >
                                             Ngày sinh
                                          </Text>
                                          <TextInput 
                                             placeholder={user.users.data.birthday}
                                          ></TextInput>
                                       </View>
                                       
                                       <View style={{flexDirection: "row" , marginHorizontal:8, marginBottom: 10 , borderBottomWidth: 0.5}}>
                                          <Text 
                                             style={{ 
                                                flex:1, 
                                                fontWeight: 'bold'
                                             }} 
                                          >
                                            Email
                                          </Text>
                                          <TextInput 
                                             placeholder={user.users.data.email}
                                          ></TextInput>
                                       </View>
                                      
                                       <View style={{flexDirection: "row" , marginHorizontal:8, marginBottom: 10 , borderBottomWidth: 0.5}}>
                                          <Text 
                                             style={{
                                                flex:1, 
                                                fontWeight: 'bold'
                                             }} 
                                          >
                                             Địa chỉ
                                          </Text>
                                          <TextInput
                                             placeholder={user.users.data.address}
                                          ></TextInput>
                                       </View>
                                    </View>


                                    <Pressable
                                       style={[styles.button, styles.buttonClose]}
                                       onPress={() => setModalVisible(!modalVisible)}
                                    >
                                          <Text style={styles.textStyle}>Cập nhật</Text>
                                    </Pressable>
                                 </View>

                                 
                              </View>
                           
                          
                        </Modal>
                        {/* <Pressable
                           
                        > */}
                           <Text style={styles.textStyle}>
                              <TouchableOpacity 
                                 style={[
                                    styles.button, 
                                    styles.buttonOpen
                                 ]}
                                 onPress={() => setModalVisible(true)}
                              >
                                 <FontAwesome5 name="user-edit" size={25} color="#043927" />
                              </TouchableOpacity>
                           </Text>
                        {/* </Pressable> */}
                     </View>
               </View>
            </View>
            
            <View style={{ height: height/2, borderWidth: 0, paddingHorizontal: 0, marginVertical: 10}}>

               <View style={{flexDirection: "row", alignItems: "center" , flex: 1/10 , backgroundColor: 'white', borderWidth: 0,marginVertical:1,marginHorizontal: 3,  paddingHorizontal: 7, borderBottomWidth: 1 }}>
                  <Entypo name="cake" size={20} color="#043927" style={{marginRight: 3}} />
                  <Text style={{flex:1, marginLeft: 0,fontSize: 14, fontWeight: "bold"}} >Ngày sinh </Text>
                  <Text style={{  }}>{Moment(user.users.data.birthday).format('dddd MM yyyy')}</Text> 
               </View>
               
               <View style={{ flexDirection: "row", alignItems: "center" ,flex: 1/10 ,backgroundColor: 'white', borderWidth: 0, marginVertical:1, marginHorizontal: 3,paddingHorizontal: 7,  borderBottomWidth: 1}}>
                  <Entypo name="phone" size={20} color="#043927" style={{marginRight: 3}} />
                  <Text style={{flex:1, marginLeft: 0, fontSize: 14, fontWeight: "bold"}} >Số điện thoại</Text>
                  <Text style={{  }}> {user.users.data.phone}</Text> 
               </View>
               
               <View style={{flexDirection: "row", alignItems: "center" , flex: 1/10 , backgroundColor: 'white', borderWidth: 0,marginVertical:1, marginHorizontal: 3,paddingHorizontal: 7, borderBottomWidth: 1 }}>
                  <Entypo name="email" size={20} color="#043927" style={{marginRight: 3}} />
                  <Text style={{ flex:1, marginLeft: 0, fontSize: 14, fontWeight: "bold"}} >Email:</Text>
                  <Text style={{  }}>{user.users.data.email}</Text> 
               </View>
               
               <View style={{flexDirection: "row", alignItems: "center" , flex: 1/10 , backgroundColor: 'white', borderWidth: 0,marginVertical:1,marginHorizontal: 3,  paddingHorizontal: 7, borderBottomWidth: 1 }}>
                  <Entypo name="address" size={20} color="#043927" style={{marginRight: 3}} />
                  <Text style={{flex:1, marginLeft: 0,fontSize: 14, fontWeight: "bold"}} >Địa chỉ</Text>
                  <Text style={{  }}>{user.users.data.address}</Text> 
               </View>
               
               <View style={{flexDirection: "row", alignItems: "center" , flex: 1/10, backgroundColor: 'white', borderWidth: 0,marginVertical:1,marginHorizontal: 3, paddingHorizontal: 7, borderBottomWidth: 1 }}>
                  <Entypo name="medal" size={20} color="#043927" style={{marginRight: 2}} />
                  <Text style={{ flex:1, marginLeft: 0,fontSize: 14, fontWeight: "bold"}} >Xếp loại khách hàng</Text>
                  <Text style={{  }}>KC</Text> 
               </View>  

               <View style={{flexDirection: "row", alignItems: "center" , flex: 1/10 , backgroundColor: 'white', borderWidth: 0,marginVertical:1,marginHorizontal: 3,  paddingHorizontal: 7, borderBottomWidth: 1 }}>
                  <FontAwesome name="history" color="#043927" size={20} style={{marginRight: 3, marginLeft: 1}} />
                  <Text style={{ flex:1, marginLeft: 0,fontSize: 14, fontWeight: "bold"}} >Lịch sử</Text>
                  
               </View>

               
               <View style={{flexDirection: "row", alignItems: "center" , flexDirection: "row", alignItems: "center" , flex: 1/10 , backgroundColor: 'white', borderWidth: 0,marginVertical:1,marginHorizontal: 3, paddingHorizontal: 7, borderBottomWidth: 1 }}>
                  <Ionicons name="gift" size={20} color="#043927" style={{marginRight: 3}} />
                  <Text style={{flex:1, marginLeft: 0,fontSize: 14, fontWeight: "bold"}} >Khuyến mãi</Text>
               </View>
               
              
               
               <View style={{flexDirection: "row", alignItems: "center" , flex: 1/10 , backgroundColor: 'white', borderWidth: 0, marginVertical:1, paddingHorizontal: 7,marginHorizontal: 3, borderBottomWidth: 1 }}>
                  <Entypo name="man" size={20} color="#043927" style={{marginRight: 3}} />
                  <Text style={{ flex:1, marginLeft: 0,fontSize: 14, fontWeight: "bold"}} >Người làm yêu thích</Text>
               </View>
             
            </View>
         </View>
         {/* <View style={{ height: height/11, borderWidth: 0, marginTop: 30, justifyContent: "center", alignContent:"center", borderWidth: 0, bottom: 0, position: 'absolute' }}>
            <View>
               <TouchableOpacity
                  onPress={handleSignOut}
               >
                  <View style={{flexDirection: "row", alignItems: "center" ,borderWidth: 0, width: width / 2}}>
                     <MaterialIcons name="logout" size={30} style={{marginLeft: 25}} color="#043927" />
                     <Text style={{ marginHorizontal: 10, paddingVertical: 10, fontSize: 18, fontWeight: "800"}}>Đăng xuất</Text>
                  </View>
               </TouchableOpacity>
            </View>
         </View> */}
        
     </View>
   );
 }




 const styles = StyleSheet.create({
   centeredView: {
     flex: 1,
     justifyContent: "center",
   //   alignItems: "center",
   //   marginTop: 22
   },
   modalView: {
     margin: 20,
     backgroundColor: "rgb(245,245,245)",
     borderRadius: 20,
     borderWidth: 1,
     borderColor: '#043927',
     padding: 35,
     alignItems: "center",
     shadowColor: "#000",
     shadowOffset: {
       width: 0,
       height: 2
     },
     shadowOpacity: 0.25,
     shadowRadius: 4,
     elevation: 5
   },
  
   buttonOpen: {
     
   },
   buttonClose: {
      backgroundColor: "#FF5733",
      borderRadius: 10,
      paddingHorizontal: 20,
      paddingVertical: 10,
      elevation: 2
   },
   textStyle: {
     color: "white",
     fontWeight: "bold",
     textAlign: "center",
     fontSize: 16
   },
   modalText: {
      // borderWidth: 1,
      width: width / 1.099,
      marginBottom: 15,
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 20,
   }
 });
export default ProfileUser;
