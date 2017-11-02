import React from 'react';
import { StyleSheet, Text, ScrollView,View,Button,TouchableOpacity,TouchableHighlight,TextInput,Linking,Modal, Image} from 'react-native';
import {Actions} from "react-native-router-flux";
import moment from 'moment';
import { Icon, } from 'react-native-elements';
import StickyHeaderFooterScrollView from 'react-native-sticky-header-footer-scroll-view';
export default class WaitingforApprovalPage extends React.Component{
	// constructor(props) {
  //   super(props);
  //
  //   this.state = {status:false};
  // }
	state={
		status:false,
		modalVisible: false
	}

	static get contextTypes() {
        return {
          socket:React.PropTypes.object.isRequired
        }
      }
	componentDidMount=()=>{
		this.context.socket.on('approvalConfirmation', (msg) => {
			this.setState({status:true,modalVisible:true});
				// alert(msg.message);

			});
	}
	navigateJobProgress=()=>{
		this.setState({modalVisible:false});
		Actions.JobProgressScreen({applicationID: this.props.data.applicationID});
	}

  render(){
    return(
    	<ScrollView >
	      <View>
	      	<Text style={styles.headerContentText}>Application Number</Text>
	        <Text style={styles.ContentText}>{this.props.data.applicationID}</Text>

	        	<Text style={styles.headerContentText}>
	        		Application Authority Number
	        	</Text>


        	<View style={{justifyContent:'flex-start',flexDirection:'row'}}>
	        <Text style={styles.Content}>{this.props.data.operatingAuthNo}</Text>
	        <Icon
	        		name="check-circle"
	        		size={30}
          			color={'#0499F9'}
          			style={styles.tick}
        		/>
	        </View>
	        <Text style={styles.headerContentText}>Schedule</Text>
	        <Text style={styles.ContentText}>Start:{this.props.data.startTime}</Text>
	        <Text style={styles.ContentText}>End:{this.props.data.endTime}</Text>
	        <Text style={styles.headerContentText}>Location</Text>
	        <Text style={styles.ContentTextLocation} onPress={() => Linking.openURL('http://googlemaps.com')}>{this.props.data.location}</Text>
	        <Text style={styles.headerContentText}>Operator Name</Text>
	        <Text style={styles.ContentText}>{this.props.data.operatorName}</Text>
	        <Text style={styles.headerContentText}>Approval Status</Text>
	        <Text style={styles.ContentText}>{ this.state.status ?  <Text style={{color:'green'}}> CEOT Approved</Text> :
	        					   <Text style={{color:'red'}}>Waiting CEOT Approval </Text> } </Text>
											 {this.state.status? <TouchableHighlight style={styles.submitButtonApproved} >
							        		<Text style={styles.submitText}>Start Job</Text>
							    		</TouchableHighlight>
												 : <TouchableHighlight style={styles.submitButton} disabled={true}>
							        		<Text style={styles.submitText}>Start Job</Text>
							    		</TouchableHighlight>}

	        <Modal
	          animationType="fade"
	          transparent={false}
	          visible={this.state.modalVisible}
	          onRequestClose={() => {alert("Modal has been closed.")}}
	          >
	         <View style={styles.modal}>
	          <View style={styles.dialogBox}>
	            <Text style={styles.header}>Approval Granted</Text>
	            <Image
	              style={styles.imageStyle}
	              source={{ uri: 'https://canadian-passport-support.com/wp-content/uploads/2014/09/businessman.png' }}
	            />
	            <Text style={styles.infotext}>The job has been approved by the Jacob Rasmus from CEOT.</Text>
	            <Text style={styles.seperator}></Text>
	            <TouchableHighlight onPress={this.navigateJobProgress}>
	              <Text style={styles.footer}>Start Job</Text>
	            </TouchableHighlight>
	          </View>
	         </View>
	        </Modal>
					</View>
       </ScrollView>
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
	modal : {
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:"rgba(0,0,0,0.7)",
  },
  header:{
    fontWeight:'500',
    fontSize:18,
  },
    footer:{
    fontWeight:'500',
    fontSize:18,
    color:'#58D0FD',
  },
  infotext:{
    textAlign:'center',
    fontSize:18,
  },
  imageStyle:{
    width: 100,
    borderRadius:60,
    height: 100,
    marginTop:5,
    marginBottom:5,
    borderWidth: 0.5,
    borderColor:'black',
  },
  seperator:{
    marginBottom: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  dialogBox:{
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#EBE9E8',
    width:270,
    paddingTop:10,
    paddingBottom:20,
    paddingLeft:20,
    paddingRight:20,
    borderRadius:15
},
	// headerContent: {
	//     fontSize: 18,
	//     fontWeight: '500',
	//     paddingTop:15,
	//     paddingLeft:15,
	//     flexDirection:'column',
	// 	justifyContent:'space-around',
	// },
	Content: {
	    fontSize: 18,
	    paddingLeft:15,
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
  		marginTop:15,
  	},
  	version: {
		paddingTop:15,
	    height:40,
  		width:40,
  	},
  	submitButton: {
	    backgroundColor: "#D0D0D0",
	    flexDirection: 'row',
	    alignItems: 'center',
	    justifyContent: 'center',
	    padding: 20,
	    marginTop:60,
	 },
	 submitButtonApproved: {
		 backgroundColor: "#0499F9",
		 flexDirection: 'row',
		 alignItems: 'center',
		 justifyContent: 'center',
		 padding: 20,
		 marginTop:60,
	},
	submitText: {
	    color: 'white',
	    fontSize: 20,
	    fontWeight:'500',
	},
	tick: {
		flexDirection:'column',
		justifyContent:'space-around',
		marginLeft:50,
	}
});
