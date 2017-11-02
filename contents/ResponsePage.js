import React from 'react';
import { StyleSheet, Text, ScrollView,View,Button,TouchableOpacity,TouchableHighlight,TextInput,Linking} from 'react-native';
import { StackNavigator } from 'react-navigation';
import {Actions} from "react-native-router-flux";
import moment from 'moment';
import { Icon, } from 'react-native-elements';
import { users } from './data';
import WaitingforApprovalPage from './WaitingforApprovalPage';
export default class ResponsePage extends React.Component{
	state={
    	appData:[],
    	opName:'',
    	version:'',
  	}
	static navigationOptions = {
	    headerStyle: { backgroundColor: 'black',paddingTop:22,height:75},
	    headerTitleStyle: { color: 'white', textAlign: 'center', alignSelf: 'center' },
	    headerLeft: <TouchableHighlight style={{height:50, width:60, }}>
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
	// componentDidMount=()=>{
	//     users.forEach((data)=>{
	//       if(data.applicationNumber==this.props.applicationData.applicationID){
	//         this.setState({appData:data});
	//         this.setState({opName:this.props.OperatorName});
	//         this.setState({version:this.props.Version});
	//       }
	//     })
	//
	//   }
	render() {
		return(
			<View>
				<WaitingforApprovalPage data={this.props.applicationData} />
			</View>
			)
	}
}

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
