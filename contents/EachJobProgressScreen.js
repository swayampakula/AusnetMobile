import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableHighlight } from 'react-native';
import { List, ListItem, CheckBox,Icon } from 'react-native-elements';
import {Actions} from "react-native-router-flux";

export default class EachJobProgressScreen extends React.Component{
  state={
    status:this.props.status
  }
  static get contextTypes() {
	      return {
	        socket:React.PropTypes.object.isRequired
	      }
	    }

  checkFunction=()=>{

    if(this.props.stepID==5){
    Actions.PermitScreen({applicationID:this.props.applicationID,
      stepID:this.props.stepID,
      name:this.props.name
    });
  }else{
    // alert('i am going to permit page');
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes();
    // let arr=[];
    // this.props.progressData.forEach((data)=>{
    //   if(data.stepID!=this.props.stepID){
    //     arr.push(data);
    //   }
    // })
    let obj={
      requestType:'JobActivity',
      applicationID:this.props.applicationID,
        stepID:this.props.stepID,
        name:this.props.name,
         time:time,
         status:true

  };


    this.props.ProgressSubmitData(obj);
    console.log('created object is');
    // console.log(obj);

      this.setState({status:true});

}
  }
  render(){
// console.log('reach to EachJobProgressScreen');
// console.log(this.props.stepID);
// console.log(this.props.time);
// console.log(this.props.name);
// console.log('each job Progress screen loaded');

  if(this.state.status==true){
    return(
    <ScrollView style={{flex:1}}>
      <View style={{
           borderBottomColor: 'black',
           borderBottomWidth: 1,
           flexDirection: 'row'
         }}>
         <List style={{flexDirection:'row'}}>
           <Text style={{flexDirection:'column',justifyContent:'space-around', marginTop:30}}> {this.props.time} </Text>
           <ListItem
              style={{width : 300, height: 80,flexDirection:'column',justifyContent:'space-around'}}
             hideChevron={true}
             key={this.props.stepID}
             title={this.props.name}
           >
              </ListItem>
              <CheckBox
                  style={{flexDirection:'column',justifyContent:'space-around'}}
                  checked={this.state.status}
              />

           </List>
         </View>
         </ScrollView>
)
  }else{
    return(
    <ScrollView style={{flex:1}}>
      <View style={{
           borderBottomColor: 'black',
           borderBottomWidth: 1,
           flexDirection: 'row'
         }}>
         <List style={{flexDirection:'row'}}>
           <Text style={{flexDirection:'column',justifyContent:'space-around'}}> --:-- </Text>
           <ListItem
              style={{width : 300, height: 80,flexDirection:'column',justifyContent:'space-around'}}
             hideChevron={true}
             key={this.props.stepID}
             title={this.props.name}
           >
              </ListItem>
            <CheckBox
                      style={{flexDirection:'column',justifyContent:'space-around'}}
                      checked={this.state.status}
                      onPress={this.checkFunction}
                  />
           </List>
         </View>
       </ScrollView>
     )
  }

  }
}
