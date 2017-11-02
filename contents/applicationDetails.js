import React from 'react';
import { StyleSheet, Text, ScrollView,View,Button,TouchableOpacity,TouchableHighlight} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { users } from './data';
import { Icon, } from 'react-native-elements';
import {Actions} from "react-native-router-flux";
import moment from 'moment';
import ApplicationFullDetail from './ApplicationFullDetail';
import Axios from 'axios';
import restURL from '../restURL';
class ApplicationDetails extends React.Component {

  state={
    appData:[],
  }
  static navigationOptions = {
    headerStyle: { backgroundColor: 'black',paddingTop:22,height:75},
    headerTitleStyle: { color: 'white', textAlign: 'center', alignSelf: 'center' },
    headerLeft: <TouchableHighlight style={{height:50, width:60, }} >
       <View style={{marginTop:10,}}><Icon
          name="menu"
          size={30}
          color={'white'}
        /></View>
     </TouchableHighlight>,
     headerRight: <TouchableHighlight style={{backgroundColor:'#88DA6C',height:50, width:60, }}>
       <View style={{marginTop:10}}><Icon
          name="phone"
          size={30}
          color={'white'}
        /></View>
     </TouchableHighlight>,
  };

  static get contextTypes() {
	      return {
	        socket:React.PropTypes.object.isRequired
	      }
	    }

  // componentDidMount=()=>{
  //   console.log('componentDidMount called for applicationDetails');
  //   console.log(this.props.applicationNumber);
  //   Axios.get('http://192.168.43.208:8080/api/v1/Job/'+'NotStarted')
  //       .then(function (data) {
  //         // console.log(data.data.message);
  //         data.data.message.forEach((data)=>{
  //           if(data.applicationID==this.props.applicationNumber){
  //             this.setState({appData:data})
  //           }
  //         })
  //       }.bind(this))
  //       .catch(function (error) {
  //         console.log(error+"error in jobDetail for status");
  //       });
  // }

  operatorData=(obj,time)=>{
    console.log(obj);
    let _id=Date.now();
    let today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    let timeStamp=dd+'-'+mm+'-'+yyyy;
    Axios({
  method: 'patch',
  url: restURL+':8080/api/v1/Job/',
  data: obj
})
.then(function (data) {
  console.log('response from server');
  this.context.socket.emit('InitiateJobRequest',obj.applicationID);
}.bind(this))
.catch(function (error) {
  console.log(error+"error in jobDetail for status");
});

let notificationObj={
  _id:Date.now(),
  timeStamp:timeStamp,
  applicationID:obj.applicationID,
  message:'Job Initiated',
  time:time
}
Axios({
method: 'post',
url: restURL+':8080/api/v1/Notification/',
data: notificationObj
})
.then(function (data) {
console.log('response from server');
let notificationString =notificationObj._id+','+notificationObj.timeStamp+','+ obj.applicationID +','+ 'Job Initiated'+',' + time;
this.context.socket.emit('InitiateJobNotification', notificationString);
}.bind(this))
.catch(function (error) {
console.log(error+"error in jobDetail for status");
});

  }

  render() {
    return (
      <View>
        <ApplicationFullDetail data={this.props.data} operatorData={this.operatorData}/>
      </View>
    );
  }
}

export default ApplicationDetails;

const styles = StyleSheet.create({
  textStyle: {
    fontSize:30,
    color:'black',
    // fontFamily:'Sans-Serif',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',

  },
  headingStyle: {
    fontSize: 25,
    color:'black',
    // fontFamily:'Sans-Serif',
    marginTop:1
  },
  contentStyle: {
    fontSize:15,
    color:'blue',
    // fontFamily:'Sans-Serif',
    marginTop:7,
    marginBottom: 10
  },

});




// if(data.applicationNumber==this.props.applicationNumber)
