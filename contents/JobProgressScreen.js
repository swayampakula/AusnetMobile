import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableHighlight,ActivityIndicator } from 'react-native';
import { List, ListItem, CheckBox,Icon } from 'react-native-elements'; // 0.16.0
import Axios from 'axios';
import restURL from '../restURL';
import JobProgressDataScreen from './JobProgressDataScreen';
import {Actions} from "react-native-router-flux";


export default class JobProgressScreen extends Component {
  constructor( ) {
  super();
  this.state = {
    jobProgressData:[],
    animating: true,
    showButtton:false
  };
}
closeActivityIndicator = () =>setTimeout(() =>this.setState({
      animating: false }), 3000);

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
      let applicationID=this.props.applicationID.substring(1);
      Axios.get(restURL+':8080/api/v1/Job/applicationID/'+applicationID)
          .then(function (data,i) {
            // onsole.log(data.data.message);

                this.setState({jobProgressData:data.data.message[0]});

          }.bind(this))
          .catch(function (error) {
            console.log(error+"error in jobDetail for status");
          });
          this.closeActivityIndicator();
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

    ProgressSubmitData=(obj)=>{
      let currentData=this.state.jobProgressData;
     let stepObj=[];
      currentData.JobProgress.forEach((data)=>{
        if(data.stepID!=obj.stepID){
          stepObj.push(data);
        }
      })

      // console.log(arr);
      let curretStepObj={
        stepID:obj.stepID,
        name:obj.name,
        status:obj.status,
        time:obj.time
      };
      // let jobObj=[  stepObj,
      //     curretStepObj
      //   ];
      // stepObj.forEach((data,i)=>{
      //   if(i>curretStepObj.stepID){
      //     let newConData=[curretStepObj].concat(stepObj);
      //   }
      // })
      let newConData=stepObj.splice(curretStepObj.stepID-1,0,curretStepObj);
      newConData=null;
      // newConData[obj.stepID-1]=newConData[9];
      let newObj={
        requestType:obj.requestType,
        applicationID:obj.applicationID,
        applicationCompletionTime:obj.time,
        JobProgress:stepObj
      }

  this.notificationFunction(obj.applicationID,obj.name,obj.time);
      Axios({
    method: 'patch',
    url: restURL+':8080/api/v1/Job/',
    data: newObj
    })
    .then(function (data) {
      // let notificationString = obj.applicationID +','+ obj.name+',' + obj.time;
      // this.context.socket.emit('InitiateJobNotification', notificationString);
      this.context.socket.emit('JobActivityMsg',obj.applicationID);
      currentData.JobProgress=newObj.JobProgress;
      this.setState({jobProgressData:currentData});
    console.log('response from server for jobProgressData');
    // console.log(data);
    // console.log(data.data.message);
    }.bind(this))
    .catch(function (error) {
    console.log(error+"error in jobDetail for status");
    });


      if(obj.stepID==10){
        this.setState({showButtton:true});
      }

    }


    submitJob=()=>{
      var today = new Date();
      var time = today.getHours() + ":" + today.getMinutes();
      // let notificationString = this.props.applicationID +','+ 'Job Completed'+',' + time;
      // this.context.socket.emit('InitiateJobNotification', notificationString);
    this.notificationFunction(this.props.applicationID,'Job Completed',time);
      // let currentData=this.state.jobProgressData;
      // currentData.status='Completed';
      let obj={
        requestType:'JobCompletion',
        applicationID:this.props.applicationID,
        status:'Completed',
        applicationCompletionTime:time
      };

      Axios({
    method: 'patch',
    url: restURL+':8080/api/v1/Job/',
    data: obj
    })
    .then(function (data) {
        this.context.socket.emit('JobCompletionMsg',this.props.applicationID);
      // alert('Congratulation!! Job Has been completed');
    //   currentData.JobProgress=newObj.JobProgress;
    //   this.setState({jobProgressData:currentData});
    // console.log('response from server for jobProgressData');
    // console.log(data);
    // console.log(data.data.message);
    Actions.FeedbackScreen();
    }.bind(this))
    .catch(function (error) {
    console.log(error+"error in jobDetail for status");
    });
    }

    PauseJob=()=>{


      var today = new Date();
      var time = today.getHours() + ":" + today.getMinutes();
      let notificationString = this.props.applicationID +','+ 'Job has been paused by Operator '+ this.props.operatorName +',' + time;
      this.context.socket.emit('InitiateJobPauseNotification', notificationString);
      alert('Job has been paused by you and notified to CEOT');
    }
  render() {
    console.log('application number reach here');
    console.log(this.props.applicationID);
    // this.props.data.forEach({data}=>{
    //   if(data.stepID==2){
    //     data={}
    //   }
    // })
    console.log(this.state.jobProgressData);
   if(this.state.animating==true){
     return(
       <View style = {styles.container}>
           <ActivityIndicator
              animating = {this.state.animating}
              color = '#bc2b78'
              size = "large"
              style = {styles.activityIndicator}/>
        </View>
     )
   }else{


    return (
      <View>

      <ScrollView>
        {this.state.jobProgressData==undefined?null:  <JobProgressDataScreen data={this.state.jobProgressData}
        ProgressSubmitData={this.ProgressSubmitData}/>
      }


      <View  style={styles.buttonStyle}>
        {this.state.showButtton?<TouchableHighlight style={{backgroundColor:'green',height:70,alignItems:'center',justifyContent:'center'}}
          onPress={this.submitJob}>
          <Text style={{color:'white',fontWeight:'500',fontSize:18,}}>Complete Job</Text>
        </TouchableHighlight>
        :<TouchableHighlight style={{backgroundColor:'red',height:70,alignItems:'center',justifyContent:'center'}}
          onPress={this.PauseJob}>
          <Text style={{color:'white',fontWeight:'500',fontSize:18,}}>Pause Job</Text>
        </TouchableHighlight>}
      </View>
        </ScrollView>
    </View>

  );
}
  }
}
const styles = StyleSheet.create({

   scrollContainer: {
    flex: 1,
  },
  buttonStyle:{
    flex:1,
    marginTop: 25
  },
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 70
   },
   activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 80
   }
});
