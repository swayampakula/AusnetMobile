import React from 'react';
import { StyleSheet, Text, ScrollView,View,Button,TouchableOpacity,TouchableHighlight,TextInput,Linking,KeyboardAvoidingView} from 'react-native';
import {Actions} from "react-native-router-flux";
import moment from 'moment';
import { Icon, } from 'react-native-elements';
import call from 'react-native-phone-call'

export default class ApplicationFullDetail extends React.Component{
	constructor(props) {
    super(props);
     this.state = {opName: ''};
    this.state = {rcName: ''};
    this.state = {version: ''};
  }
	static get contextTypes() {
	      return {
	        socket:React.PropTypes.object.isRequired
	      }
	    }

	submitApplicationDetail=()=>{
		// const args = {
		//   number: '9093900003', // String value with the number to call
		//   prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call
		// }
		//
		// call(args).catch(console.error)
		var today = new Date();
		var time = today.getHours() + ":" + today.getMinutes();
		console.log('time is'+ time);



		let obj={
			requestType:'InitiateJobRequest',
			applicationID:this.props.data.applicationID,
			operatorName:this.state.opName,
			operatorContactNumber:'8722455007',
			recepientName:this.state.rcName,
			recepientContactNumber:'9865503834',
			operatingAuthNo:this.props.data.operatingAuthNo+this.state.version,
			applicationActiveStatus:true,
			JobProgress:[
				{  stepID:1, name:'Job Initiated',   time:time,      status:true  	 },
				{   stepID:2,   name:'CEOT Approval',      time:'N/A',      status:false    	 },
				{   stepID:3, name:'Interuption Time Started',      time:'N/A',      status:false    	 },
				{ stepID:4,     name:'Isolation and Earthing Done',     time:'N/A',      status:false 	 },
				{   stepID:5,   name:'Issue Permit',      time:'N/A',      status:false   	 },
				{     stepID:6, name:'Work Started',     time:'N/A',      status:false  	 },
				{  stepID:7,  name:'Work Completed',    time:'N/A',      status:false    	 },
				{ stepID:8,     name:'Cancel Permit',     time:'N/A',      status:false  	 },
				{ stepID:9,     name:'Isolation and Earthing Removed',     time:'N/A',      status:false  	 },
				{ stepID:10,  name:'Interruption Time Ended',     time:'N/A',      status:false }]
		}
		this.props.operatorData(obj,time);
		this.setState({opName:'',rcName:'',version:''});
		var dateobj= new Date() ;
		var month = dateobj.getMonth() + 1;
		var day = dateobj.getDate() ;
		var year = dateobj.getFullYear();
	  let MonthArr=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		var dates=day+ ' '+ MonthArr[month-1]+' '+ year;
			 obj.startTime=this.props.data.startTime;
			 obj.endTime=this.props.data.endTime;
			 obj.location=this.props.data.location;

		Actions.ResponsePage({applicationData:obj,title: dates})
		// console.log(obj);
		// alert('button clicked');
	}
  render(){
		// let dates=  moment().format('DD-MMM-YYYY')
		// 	 dates=dates.replace(/-/g,' ');
    return(
			<KeyboardAvoidingView
      behavior="padding"
			// style={{flex:1}}
      >
    	<ScrollView>
	      <View>
	      	<Text style={styles.headerContentText}>Application Number</Text>
	        <Text style={styles.ContentText}>{this.props.data.applicationID}</Text>
	        <Text style={styles.headerContentText}>Schedule</Text>
	        <Text style={styles.ContentText}>Start:{this.props.data.startTime}</Text>
	        <Text style={styles.ContentText}>End:{this.props.data.endTime}</Text>
	        <Text style={styles.headerContentText}>Location</Text>
	        <Text style={styles.ContentTextLocation} onPress={() => Linking.openURL('http://googlemaps.com')}>{this.props.data.location}</Text>
	        <Text style={styles.separator}></Text>
	        <Text style={styles.headerContentText}>Operator Name</Text>
	        <TextInput underlineColorAndroid="transparent" style={styles.textInput}
          		onChangeText={(opName) => this.setState({opName})} />
	        <Text style={styles.headerContentText}>Recipient Name</Text>
	        <TextInput underlineColorAndroid="transparent" style={styles.textInput}
          		onChangeText={(rcName) => this.setState({rcName})}/>
	        <Text style={styles.headerContentText}>Operating Authority Number</Text>
	        <View style={{justifyContent:'flex-start',flexDirection:'row'}}>
	        	<Text style={styles.Content}>{this.props.data.operatingAuthNo} -</Text>
		        <TextInput underlineColorAndroid="transparent" style={styles.textInputVersion}
	          		onChangeText={(version) => this.setState({version})}/>
	    		<Icon
	        		name="check-circle"
	        		size={30}
	      			color={'#0499F9'}
	      			style={styles.tick}
	    		/>
        	</View>
        	<TouchableHighlight style={styles.submitButton}
        		onPress={this.submitApplicationDetail}>

        		<Text style={styles.submitText}>Submit</Text>
    		</TouchableHighlight>
	      </View>
       </ScrollView>
		 </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
	headerContentText: {
	    fontSize: 18,
	    fontWeight: '500',
	    paddingTop:15,
	    paddingLeft:15,
	},
	Content: {
	    fontSize: 18,
	    paddingLeft:15,
	    paddingTop:10,
	    marginTop:10,
	    flexDirection:'column',
		justifyContent:'space-around',
	},
	ContentText: {
	    fontSize: 18,
	    paddingLeft:15,
	},
	ContentTextLocation: {
	    fontSize: 18,
	    paddingLeft:15,
	    textDecorationLine:'underline',
	},
	separator: {
		paddingTop:15,
	    borderBottomColor: 'grey',
	    borderBottomWidth: 1,
  	},
  	textInput: {
  		borderColor: 'gray',
  		borderWidth: 1,
  		height:40,
  		width:270,
  		marginLeft:15,
  		marginTop:10,
  	},
  	textInputVersion: {
  		borderColor: 'gray',
  		borderWidth: 1,
  		height:40,
  		width:60,
  		marginLeft:15,
  		marginTop:15,
  	},
  // 	version: {
		// paddingTop:15,
	 //    height:40,
  // 		width:40,
  // 		flexDirection:'column',
		// justifyContent:'space-around',
  // 	},
  	tick: {
		flexDirection:'column',
		justifyContent:'space-around',
		marginLeft:20,
		marginTop:10,
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
});
