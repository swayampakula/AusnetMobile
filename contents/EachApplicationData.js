import React from 'react';
import { StyleSheet, Text, ScrollView,ListView,View,Button,TouchableOpacity,TouchableHighlight} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import Panel from '../panel';
const styles = StyleSheet.create({
  textStyle: {
    fontSize:30,
    color:'black',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
    padding:15,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#D3D3D3',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    marginTop: 1,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '500',
  },
  headerContentText: {
    fontSize: 16,
    fontWeight: '500',
    paddingTop:10,
  },
  contentText:{
    fontSize: 18,
  },
  content: {
    paddingLeft: 10,
    backgroundColor: '#fff',
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: '#D3D3D3',
  },
  initiateButton: {
    backgroundColor: "#08A4D6",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 210,
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    marginLeft:60,
    marginBottom:30
  },
  initiateText: {
    color: 'white',
    fontSize: 20,
    fontWeight:'500',
},
submitButton: {
  backgroundColor: "#08A4D6",
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 20,
  marginTop: 20,
},
submitText: {
    color: 'white',
    fontSize: 20,
    fontWeight:'500',
},
ContentTextLocation: {
    fontSize: 18,
    paddingLeft:15,
    textDecorationLine:'underline',
}

});
import {Actions} from "react-native-router-flux";
import moment from 'moment';
export default class EachApplicationData extends React.Component{

  // static get contextTypes() {
  //       return {
  //         socket:React.PropTypes.object.isRequired
  //       }
  //     }
  //
  // InitiateJobBtn=()=>{
  //   this.context.socket.emit('InitiateJobRequest','Job has been initiated');
  // }

  render(){
  // let dates=  moment().format('DD-MMM-YYYY')
  //    dates=dates.replace(/-/g,' ');
var dateobj= new Date() ;
var month = dateobj.getMonth() + 1;
var day = dateobj.getDate() ;
var year = dateobj.getFullYear();
  let MonthArr=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var dates=day+ ' '+ MonthArr[month-1]+' '+ year;
  let header=[<Text> Application Number  </Text>];
    return(
      <ScrollView>
             {/* <View style={styles.container}>
               <List>
               <ListItem
                 title="Application Number"
                 subtitle={this.props.applicationID}
                 onPress={() => Actions.ApplicationDetails({data: this.props.data,title: dates})
         }
               />
           </List>
          </View> */}
          <Panel title={header} subtitle={this.props.data.applicationID}>
            <Text style={styles.headerContentText}>Application Number</Text>
  	        <Text style={styles.ContentText}>{this.props.data.applicationID}</Text>
  	        <Text style={styles.headerContentText}>Schedule</Text>
  	        <Text style={styles.ContentText}>Start:{this.props.data.startTime}</Text>
  	        <Text style={styles.ContentText}>End:{this.props.data.endTime}</Text>
  	        <Text style={styles.headerContentText}>Location</Text>
             <Text style={styles.ContentTextLocation}>{this.props.data.location}</Text>
            <TouchableHighlight style={styles.initiateButton}
              onPress={() => Actions.ApplicationDetails({data: this.props.data,title: dates})
      }>

          		<Text style={styles.submitText}>Initiate Job</Text>
      		</TouchableHighlight>
          {/* <Text onPress={this.click}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text> */}
        </Panel>

           </ScrollView>
      )
  }
}
