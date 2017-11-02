import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, TextInput,TouchableHighlight, KeyboardAvoidingView, ScrollView } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Icon, } from 'react-native-elements';
// import Actions from
import {Actions} from "react-native-router-flux";
import restURL from '../restURL';
import Axios from 'axios';
export default class PermitScreen extends Component {
  state={
    permitNo:'',
    jobProgressData:[]
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

componentDidMount=()=>{
  console.log('permit screen data called to server');
  let applicationID=this.props.applicationID.substring(1);
  Axios.get(restURL+':8080/api/v1/Job/applicationID/'+applicationID)
      .then(function (data,i) {
            this.setState({jobProgressData:data.data.message[0]});
      }.bind(this))
      .catch(function (error) {
        console.log(error+"error in jobDetail for status");
      });
}

notificationFunction=(applicationID,message,time)=>{
  console.log('notificationFunction called');
  let _id=Date.now();
  let today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
  let timeStamp=dd+'-'+mm+'-'+yyyy;

  let notificationObj={
    _id:Date.now(),
    timeStamp:timeStamp,
    applicationID:applicationID,
    message:message,
    time:time
  }
  let notificationString =notificationObj._id+','+notificationObj.timeStamp+','+ notificationObj.applicationID +','+ notificationObj.message+',' + time;
  this.context.socket.emit('InitiateJobNotification', notificationString);
  Axios({
  method: 'post',
  url: restURL+':8080/api/v1/Notification/',
  data: notificationObj
  })
  .then(function (data) {
  console.log('response from server');

  }.bind(this))
  .catch(function (error) {
  console.log(error+"error in jobDetail for status");
  });
}

  submitPermit=()=>{
    var today = new Date();
		var time = today.getHours() + ":" + today.getMinutes();

    let stepObj=[];
     this.state.jobProgressData.JobProgress.forEach((data)=>{
       if(data.stepID!=5){
         stepObj.push(data);
       }
     });

     let curretStepObj={
       stepID:5,
       name:'Permit Issue',
       status:true,
       time:time
     };
     let newConData=stepObj.splice(curretStepObj.stepID-1,0,curretStepObj);
     newConData=null;
     let newObj={
       requestType:'PermitIssued',
       applicationID:this.props.applicationID,
       permitNumber:this.state.permitNo,
       JobProgress:stepObj
     }
    //  console.log('new object in permit screen');
    //  console.log(newObj);
     this.notificationFunction(newObj.applicationID,curretStepObj.name,curretStepObj.time);
 Axios({
   method: 'patch',
   url: restURL+':8080/api/v1/Job/',
   data: newObj
   })
   .then(function (data) {
    console.log(data);
   console.log('response from server for jobProgressData');
   Actions.JobProgressScreen({applicationID: this.props.applicationID});
  //  let notificationString = newObj.applicationID +','+ curretStepObj.name+',' + curretStepObj.time;
  //  this.context.socket.emit('InitiateJobNotification', notificationString);
   this.context.socket.emit('JobActivityMsg',newObj.applicationID);
   }.bind(this))
   .catch(function (error) {
   console.log(error+"error in jobDetail for status");
 });
  }
  render() {
    return (
      <KeyboardAvoidingView
      style={styles.containerStyle}
      behavior="padding"
      >
      <ScrollView>
        <View style={styles.imageStyle}>
          <Image
            source={{ uri: 'http://www.teach-ict.com/gcse_new/software/word_processor/miniweb/images/invoice1.jpg' }}
            style={{ height: 350, width: 340, marginLeft: 10, paddingTop:0, marginRight: 10 }}>
            <View style={{paddingTop: 0, marginLeft:5}}>
             <TouchableHighlight style={{backgroundColor:'grey',height:50,width:100,alignItems:'center',justifyContent:'center',overflow:'hidden'}}>
               <View style={{marginTop:10}}><Icon
                  name="Arrow-left"
                  size={30}
                  color={'white'}
                />
                <Text style={{color:'white',fontWeight:'500',fontSize:18,}}>Go Back</Text>
                </View>
             </TouchableHighlight>
            </View>
          </Image>
        </View>



        <View style={styles.textBoxStyle}>
          <Text style={styles.textInputStyle}> Permit No: </Text>
          <TextInput underlineColorAndroid="transparent"
          placeholder="  Enter the Permit No" style={styles.textInput}
          onChangeText={(permitNo) => this.setState({permitNo})}
        />
        </View>

        <View  style={styles.buttonStyle}>
          <TouchableHighlight style={{backgroundColor:'#05AADA',height:70,alignItems:'center',justifyContent:'center'}}
            onPress={this.submitPermit}>
            <Text style={{color:'white',fontWeight:'500',fontSize:18,}}>Submit Permit</Text>
          </TouchableHighlight>
        </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({

  containerStyle: {
    flex: 1,
  },
  imageStyle: {
    flex: 7,
  },

  textInputStyle: {
    marginTop:20,
    marginLeft: 20,
    marginRight:10,
    fontSize: 20,
    paddingTop: 0,
    fontWeight: 'bold',
  },
  textInput: {
    borderColor:'black',
    marginLeft: 20,
    height: 50,
    width:330,
    borderWidth: 1,
    borderStyle: 'solid',
    fontSize:15,
    alignItems: 'center',
  },
  textBoxStyle:{
    flex:2,
  },
  buttonStyle:{
    flex:1,
    marginTop:50,
  },
});
