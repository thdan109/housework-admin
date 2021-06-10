import React from 'react'
// import {BarChart, Bar ,ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import { Bar, Pie } from "react-chartjs-2"; 
import '../styles/Statistical.css'
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Input, Label } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import axios from 'axios';
import NumberFormat from 'react-number-format'
import { ListItemText } from '@material-ui/core';





const useStyles = makeStyles((theme) => ({
   formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
   },
      selectEmpty: {
      marginTop: theme.spacing(2),
   },
}));


const Statistical = () =>{
  





   React.useEffect(()=>{
      getData();
   },[])

   
   const nowdate = new Date(Date.now()).getFullYear()
   const [dataClear, setDataClear] = React.useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ])
   const [dataCooking, setDataCooking] = React.useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ])
   const [dataWashing, setDataWashing] = React.useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ])

   const [dataClearMonth, setDataClearMonth] = React.useState()
   const [dataCookingMonth, setDataCookingMonth] = React.useState()
   const [dataWashingMonth, setDataWashingMonth] = React.useState()

   const [monthClear, setMonthClear] = React.useState()
   const [monthCooking, setMonthCooking] = React.useState()
   const [monthWashing, setMonthWashing] = React.useState()

   const [ dataTotalClear, setDataTotalClear ] = React.useState([0,0,0,0,0,0,0,0,0,0,0,0])
   const [dataTotalCooking, setDataTotalCooking] = React.useState([0,0,0,0,0,0,0,0,0,0,0,0])
   const [ dataTotalWashing,setDataTotalWashing] = React.useState([0,0,0,0,0,0,0,0,0,0,0,0])

   const [ dataTotalClearVal, setDataTotalClearVal ] = React.useState([0,0,0,0,0,0,0,0,0,0,0,0])
   const [dataTotalCookingVal, setDataTotalCookingVal] = React.useState([0,0,0,0,0,0,0,0,0,0,0,0])
   const [ dataTotalWashingVal,setDataTotalWashingVal ] = React.useState([0,0,0,0,0,0,0,0,0,0,0,0])
 
   const classes = useStyles();
   const [activeTab, setActiveTab] = React.useState('1');

   const toggle = tab => {
      if(activeTab !== tab) setActiveTab(tab);
   }



   const getData = async () =>{
      
      const dataClear = await axios.post('http://localhost:216/clearsave/data')
      setDataClear(dataClear.data)

      const dataWashing = await axios.post('http://localhost:216/washingsave/data')
      setDataWashing(dataWashing.data)

      const dataCooking =  await axios.post('http://localhost:216/cookingsave/data')
      setDataCooking(dataCooking.data)
   }



   const [day, setDay] = React.useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31])
   const getDay = (nowdate,val) =>{
      var year = Number(nowdate)
      var month = Number(val.target.value)
      var date = new Date(year,month, 0);
      var days = []; 
      var datee = date.getDate()
      for (var i=1;i<=datee;i++ ){
         days.push(i)
      }
      // console.log(days);
      setDay(days)
   }
   const [day1, setDay1] = React.useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31])
   const getDay1 = (nowdate,val) =>{
      var year = Number(nowdate)
      var month = Number(val.target.value)
      var date = new Date(year,month, 0);
      var days = []; 
      var datee = date.getDate()
      for (var i=1;i<=datee;i++ ){
         days.push(i)
      }
      // console.log(days);
      setDay1(days)
   }



   const handleChangeClear = async(val)=>{
     
      const dataClearr = await axios.post('http://localhost:216/clearsave/dataClearByMonth',{
         month: Number(val.target.value)
      })
      const arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
      let data = dataClear;
      dataClearr.data.map(item =>{
         const index = Number((new Date(item.time).getDate() - 1))
         arr[index] += item.sum;
      })
      // console.log(data);
      setDataClear(arr);
    



   }

   const handleChangeCooking = async(val) =>{
      // setMonthCooking(val.tartget.value)
      const dataCookingg = await axios.post('http://localhost:216/cookingsave/dataCookingByMonth',{
         month: val.target.value
      })
      // setDataCooking(dataCooking.data)
      const arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
      let data = dataCooking;
      dataCookingg.data.map(item =>{
         const index = Number((new Date(item.time).getDate() - 1))
         arr[index] += item.sum;
      })
      // console.log(data);
      setDataCooking(arr);



   }
   const handleChangeWashing = async(val) =>{
      // setMonthWashing(val.target.value)
      const dataWashingg = await axios.post('http://localhost:216/washingsave/dataWashingByMonth',{
         month:val.target.value
      })
      // setDataWashing(dataWashing.data)
      const arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
      let data = dataClear;
      dataWashingg.data.map(item =>{
         const index = Number((new Date(item.time).getDate() - 1))
         arr[index] += item.sum;
      })
      // console.log(data);
      setDataWashing(arr);
   }


   const handleChangeTotal = async(val) =>{
      setMonthWashing(val.target.value)

      const dataClearTotal = await axios.post('http://localhost:216/clearsave/totalClear',{
         month:val.target.value 
      })
      const arrClear = [0,0,0,0,0,0,0,0,0,0,0,0]
      dataClearTotal.data.map(item =>{
         const index = Number(item._id)
         arrClear[index] += Number(item.sum);
      })
      // console.log(data);
      setDataTotalClear(arrClear);

      const dataCookingTotal = await axios.post('http://localhost:216/cookingsave/totalCooking',{
         month: val.target.value 
      })
      const arrCooking = [0,0,0,0,0,0,0,0,0,0,0,0]
      dataCookingTotal.data.map(item =>{
         const index = Number(item._id)
         arrCooking[index] += Number(item.sum);
      })
      // console.log(data);
      setDataTotalCooking(arrCooking);

     
      const dataWashingTotal = await axios.post('http://localhost:216/washingsave/totalWashing',{
         month:val.target.value 
      })
      const arrWashing = [0,0,0,0,0,0,0,0,0,0,0,0]
      dataWashingTotal.data.map(item =>{
         const index = Number(item._id)
         arrWashing[index] += Number(item.sum);
      })
      // console.log(data);
      setDataTotalWashing(arrWashing);
      
   }

   const handleChangeTotalWorkVal = async(val) =>{
      setMonthClear(val.target.value)

      const dataClearTotalVal = await axios.post('http://localhost:216/clearsave/totalClearWorkVal',{
         month:val.target.value 
      })
      const arrClearVal = [0,0,0,0,0,0,0,0,0,0,0,0]
      dataClearTotalVal.data.map((item )=>{
         const index = Number(Object.keys(item))
         arrClearVal[index] += Number(Object.values(item));
      })
      // console.log(data);
      setDataTotalClearVal(arrClearVal);

      const dataCookingTotalVal = await axios.post('http://localhost:216/cookingsave/totalCookingWorkVal',{
         month: val.target.value 
      })
      const arrCookingVal = [0,0,0,0,0,0,0,0,0,0,0,0]
      dataCookingTotalVal.data.map(item =>{
         const index = Number(Object.keys(item))
         arrCookingVal[index] += Number(Object.values(item));
      })
      // console.log(data);
      setDataTotalCookingVal(arrCookingVal);

     
      const dataWashingTotalVal = await axios.post('http://localhost:216/washingsave/totalWashingWorkVal',{
         month:val.target.value 
      })
      const arrWashingVal = [0,0,0,0,0,0,0,0,0,0,0,0]
      dataWashingTotalVal.data.map(item =>{
         const index = Number(Object.keys(item))
         arrWashingVal[index] += Number(Object.values(item));
      })
      // console.log(data);
      setDataTotalWashingVal(arrWashingVal);
      
   }

   const [ data, setDate] = React.useState([
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
   ])

   return (
      <div className="wrapper">
         <h2 className="tiltle">THỐNG KÊ</h2>

        

         <div className="pieChart" >
            <div className="totalMoney">
            <h4 className="tiltle">Cơ cấu doanh thu</h4>
               <div className="input-select">
                  <Label style={{fontWeight: 'bold'}}  for="SelectedMonthClear">Tháng</Label>
                  <Input onChange={(val)=>{
                        handleChangeTotal(val)
                        getDay(nowdate,val)
                     }} 
                     style={{width: 300}} type="select" id="SelectedMonthClear" 
                  >
                     <option>1</option>
                     <option>2</option>
                     <option>3</option>
                     <option>4</option>
                     <option>5</option>
                     <option>6</option>
                     <option>7</option>
                     <option>8</option>
                     <option>9</option>
                     <option>10</option>
                     <option>11</option>
                     <option>12</option>
                  </Input>
               </div>
               <div className='wrapPie'>
                  <div style={{fontWeight: 'bold', display: 'flex', justifyContent: 'center'}}>
                     Tổng tháng:  
                     <NumberFormat 
                        style={{marginLeft: 15,marginRight: 5}} 
                        value={Number(dataTotalClear[monthWashing]) + Number(dataTotalCooking[monthWashing]) + Number(dataTotalWashing[monthWashing])} 
                        displayType={'text'} 
                        thousandSeparator={true} 
                        prefix={''} 
                     /> VNĐ
                  </div>
                  <Pie
                     data = {{
                        labels: [
                        'Dọn nhà',
                        'Nấu ăn',
                        'Giặt ủi'
                        ],
                        datasets: [{
                        label: 'VNĐ (Việt Nam đồng)',
                        data: [dataTotalClear[monthWashing], dataTotalCooking[monthWashing], dataTotalWashing[monthWashing]],
                        backgroundColor: [
                           'rgb(255, 99, 132)',
                           'rgb(54, 162, 235)',
                           'rgb(255, 205, 86)'
                        ],
                        hoverOffset: 4
                        }]
                     }}
                     height={10}
                     width={50}   
                     />
               </div>
            </div>
            <div className="totalWork">
            <h4 className="tiltle">Cơ cấu việc</h4>
            {/* <div onClick={()=>console.log(dataTotalClearVal)}>aaaaaaaaa</div> */}
               <div className="input-select">
                  <Label style={{fontWeight: 'bold'}}  for="SelectedMonthClear">Tháng</Label>
                  <Input onChange={(val)=>{
                        handleChangeTotalWorkVal(val)
                        getDay1(nowdate,val)
                     }} 
                     style={{width: 300}} type="select" id="SelectedMonthClear" 
                  >
                     <option>1</option>
                     <option>2</option>
                     <option>3</option>
                     <option>4</option>
                     <option>5</option>
                     <option>6</option>
                     <option>7</option>
                     <option>8</option>
                     <option>9</option>
                     <option>10</option>
                     <option>11</option>
                     <option>12</option>
                  </Input>
               </div>
               <div className='wrapPie'>
                  <div style={{fontWeight: 'bold', display: 'flex', justifyContent: 'center'}}>
                     Tổng tháng:  {Number(dataTotalClearVal[monthClear]) + Number(dataTotalCookingVal[monthClear]) + Number(dataTotalWashingVal[monthClear])} việc
                     {/* <NumberFormat 
                        style={{marginLeft: 15,marginRight: 5}} 
                        value={Number(dataTotalClear[monthWashing]) + Number(dataTotalCooking[monthWashing]) + Number(dataTotalWashing[monthWashing])} 
                        displayType={'text'} 
                        thousandSeparator={true} 
                        prefix={''} 
                     /> VNĐ */}
                  </div>
                  <Pie
                     data = {{
                        labels: [
                        'Dọn nhà',
                        'Nấu ăn',
                        'Giặt ủi'
                        ],
                        datasets: [{
                        label: 'VNĐ (Việt Nam đồng)',
                        data: [dataTotalClearVal[monthClear], dataTotalCookingVal[monthClear], dataTotalWashingVal[monthClear]],
                        backgroundColor: [
                           'rgb(255, 99, 132)',
                           'rgb(54, 162, 235)',
                           'rgb(255, 205, 86)'
                        ],
                        hoverOffset: 4
                        }]
                     }}
                     height={10}
                     width={50}   
                     />
               </div>
            </div>
         </div>

         <Nav tabs>
            
            <NavItem className="navtab">
               <NavLink
                  style={{
                     // background: '#FF6347'
                     borderTop: '2px solid red',
                     borderLeft: '2px solid red',
                     borderRight: '2px solid red',
                     fontWeight: 'bold',
                     fontSize: 18
                  }}
                   className={classnames({ active: activeTab === '1' })}
                   onClick={() => { toggle('1'); }}
               >Dọn dẹp</NavLink>
            </NavItem>
            <NavItem className="navtab">
               <NavLink
                  style={{
                     // background: '#FF6347'
                     borderTop: '2px solid orange',
                     borderLeft: '2px solid orange',
                     borderRight: '2px solid orange',
                     fontWeight: 'bold',
                     fontSize: 18
                  }}
                  className={classnames({ active: activeTab === '2' })}
                  onClick={() => { toggle('2'); }}
               >Nấu ăn</NavLink>
            </NavItem>
            <NavItem
              className="navtab"
            >
               <NavLink 
                   style={{
                     // background: '#FF6347'
                     borderTop: '2px solid green',
                     borderLeft: '2px solid green',
                     borderRight: '2px solid green',
                     fontWeight: 'bold',
                     fontSize: 18
                  }}
                  className={classnames({ active: activeTab === '3' })}
                  onClick={() => { toggle('3'); }}
               >Giặt ủi</NavLink>
            </NavItem>

         </Nav>
      <TabContent activeTab={activeTab}>
         <TabPane tabId="1"  style={{borderLeft: '2px solid red'}}  >
            <Row>
               <Col>
                  <Card>
                     <div className="grid-div1">
                        <div className="input-select">
                           <Label style={{fontWeight: 'bold'}}  for="SelectedMonthClear">Tháng</Label>
                           <Input onChange={(val)=>{
                                 handleChangeClear(val)
                                 getDay(nowdate,val)
                              }} 
                              style={{width: 300}} type="select" id="SelectedMonthClear" 
                           >
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                              <option>6</option>
                              <option>7</option>
                              <option>8</option>
                              <option>9</option>
                              <option>10</option>
                              <option>11</option>
                              <option>12</option>
                           </Input>
                        </div>
                        <Bar
                        
                           data={{
                              labels: day
                              ,
                              datasets: [
                              {
                                 label: "VNĐ (Việt Nam đồng)",
                                 backgroundColor: [
                                    "#3e95cd",
                                    "#8e5ea2",
                                    "#3cba9f",
                                    "#e8c3b9",
                                    "#c45850",
                                 ],
                                 data: dataClear
                                 // data: data.uv
                              }
                              ]
                           }}
                           options={{
                              legend: { display: false },
                              title: {
                              display: true,
                              text: "Predicted world population (millions) in 2050"
                              }
                           }}
                           height={10}
                           width={50}                           
                        />

                     </div>
                  </Card>
               </Col>

            </Row>
         </TabPane>

         <TabPane tabId="2"  style={{borderLeft: '2px solid red'}}  >
            <Row>
               <Col>
                  <Card>
                     <div className="grid-div1">
                        <div className="input-select">
                           <Label style={{fontWeight: 'bold'}}  for="SelectedMonthCooking">Tháng</Label>
                           <Input onChange={(val)=>{
                                 handleChangeCooking(val)
                                 getDay(nowdate,val)
                              }} 
                              style={{width: 300}} type="select" id="SelectedMonthCooking"
                           >
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                              <option>6</option>
                              <option>7</option>
                              <option>8</option>
                              <option>9</option>
                              <option>10</option>
                              <option>11</option>
                              <option>12</option>
                           </Input>
                        </div>
                        <Bar
                        
                           data={{
                              labels: day
                              ,
                              datasets: [
                              {
                                 label: "VNĐ (Việt Nam đồng)",
                                 backgroundColor: [
                                    "#3e95cd",
                                    "#8e5ea2",
                                    "#3cba9f",
                                    "#e8c3b9",
                                    "#c45850",
                                 ],
                                 data: dataCooking
                                 // data: dataClear
                              }
                              ]
                           }}
                           options={{
                              legend: { display: false },
                              title: {
                              display: true,
                              text: "Predicted world population (millions) in 2050"
                              }
                           }}
                           height={10}
                           width={50}                           
                        />

                     </div>
                  </Card>
               </Col>

            </Row>
         </TabPane>

         <TabPane tabId="3" style={{borderLeft: '2px solid green'}} >
            <Row>
               <Col>
                  <Card>
                     <div className="grid-div2">
                        <div className="input-select">
                           <Label style={{fontWeight: 'bold'}}  for="SelecltedMonthWashing">Tháng</Label>
                           <Input 
                              onChange={(val)=>{
                                 handleChangeWashing(val)
                                 getDay(nowdate,val)
                              }} 
                              style={{width: 300}} type="select" id="SelectedMonthWashing" >
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                              <option>6</option>
                              <option>7</option>
                              <option>8</option>
                              <option>9</option>
                              <option>10</option>
                              <option>11</option>
                              <option>12</option>
                           </Input>
                        </div>
                        <Bar
                        
                        data={{
                           labels: day
                           ,
                           datasets: [
                           {
                              label: "VNĐ (Việt Nam đồng)",
                              backgroundColor: [
                                 "#3e95cd",
                                 "#8e5ea2",
                                 "#3cba9f",
                                 "#e8c3b9",
                                 "#c45850",
                              ],
                              data: dataWashing
                           }
                           ]
                        }}
                        options={{
                           legend: { display: false },
                           title: {
                           display: true,
                           text: "Predicted world population (millions) in 2050"
                           }
                        }}
                        height={10}
                        width={50}                           
                     />
                     </div>
                  </Card>
               </Col>
            </Row>
         </TabPane>
      </TabContent>






         {/* <ResponsiveContainer className="chart" height={300}>
            <LineChart 
               width={600} 
               height={300} 
               data={data}
               margin={{top: 5, right: 30, left: 20, bottom: 5}}
            >
            <XAxis dataKey="name"/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
         </ResponsiveContainer> */}
     

      {/* <div className="pieChart" >



         <Pie
            data = {{
               labels: [
                 'Red',
                 'Blue',
                 'Yellow'
               ],
               datasets: [{
                 label: 'My First Dataset',
                 data: [300, 50, 100],
                 backgroundColor: [
                   'rgb(255, 99, 132)',
                   'rgb(54, 162, 235)',
                   'rgb(255, 205, 86)'
                 ],
                 hoverOffset: 4
               }]
             }}
             height={10}
               width={50}   
         />

        
      </div> */}

         

         
      





      </div>
         
   );
  
}

export default Statistical;