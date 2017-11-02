import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableHighlight } from 'react-native';
import EachJobProgressScreen from './EachJobProgressScreen';
import { List, ListItem, CheckBox,Icon } from 'react-native-elements';
export default class JobProgressDataScreen extends React.Component{

  ProgressSubmitData=(obj)=>{
    this.props.ProgressSubmitData(obj);
  }
  render(){
    let applicationID=this.props.data.applicationID;
    // console.log(this.props.data.JobProgress);
    console.log('applicationID'+ applicationID);
    if(this.props.data.JobProgress!=undefined){
    var newData=this.props.data.JobProgress.map((res)=>{
        return(
            <View key={res.stepID}>
              <EachJobProgressScreen
            stepID={res.stepID}
            name={res.name}
            status={res.status}
            time={res.time}
            progressData={res}
            applicationID={applicationID}
            ProgressSubmitData={this.ProgressSubmitData}
            >
            </EachJobProgressScreen>
          </View>
        )
      })
    }


    return(
      <View>
        {newData}

    </View>
    )
  }
}
