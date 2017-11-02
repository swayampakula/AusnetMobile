import React from 'react';
import { StyleSheet, Text, ScrollView,ListView,View,Button,TouchableOpacity,TouchableHighlight,ActivityIndicator} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { List, ListItem } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import { users } from './data';
import { Icon } from 'react-native-elements';
import ApplicationView from './ApplicationView';
import Axios from 'axios';
import restURL from '../restURL';
import call from 'react-native-phone-call'
export default class HomeScreen extends React.Component{
state={
  jobData:[],
  animating:true
}
closeActivityIndicator = () =>setTimeout(() =>this.setState({
      animating: false }), 1500);


  componentDidMount=()=>{
    this.closeActivityIndicator();
    console.log('componentDidMount called');
    Axios.get(restURL+':8080/api/v1/Job/status/'+'NotStarted')
        .then(function (data) {
          // console.log(data.data.message);
          this.setState({jobData:data.data.message});
          // console.log(this.state.jobData);
          // this.setState({jobDetailArr:this.state.jobData[0]});
        }.bind(this))
        .catch(function (error) {
          console.log(error+"error in jobDetail for status");
        });
  }
  static navigationOptions = {
    // title: 'Upcoming Jobs',
    headerStyle: { backgroundColor: 'black',paddingTop:22,height:75},
    headerTitleStyle: { color: 'white', textAlign: 'center', alignSelf: 'center' },
    headerLeft:
    <TouchableHighlight style={{height:50, width:60, }} >
       <View style={{marginTop:10,}}>
         <Icon name="menu" size={30} color={'white'}/>
       </View>
     </TouchableHighlight>,
     headerRight:
     <TouchableHighlight style={{backgroundColor:'#88DA6C',height:50, width:60, }}>
       <View style={{marginTop:10,}}>
         <Icon name="phone" size={30} color={'white'} onPress={this.callToCEOT}/>
       </View>
     </TouchableHighlight>,
  };
  callToCEOT=()=>{
    console.log('calling function called');
    const args = {
  number: '9865503834', // String value with the number to call
  prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call
}

call(args).catch(console.error)
  }
  render(){
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


    return(
    <View>
      <ApplicationView data={this.state.jobData} />
    </View>

  )
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
// class HomeScreen extends React.Component {
//
//     state = {
//     activeSection: false,
//     collapsed: true,
//   };
//
//   _toggleExpanded = () => {
//     this.setState({ collapsed: !this.state.collapsed });
//   }
//
//   _setSection(section) {
//     this.setState({ activeSection: section });
//   }
//    _handleInitiateJob = () => {
//     alert('hello');
//     }
//
//   _renderHeader(section, i, isActive) {
//     return (
//       <Animatable.View duration={200} style={[styles.header, isActive ? styles.active : styles.inactive]} transition="backgroundColor">
//         <Text style={styles.headerText}>Application Number</Text>
//         <Text style={styles.contentText}>{section.applicationNumber}</Text>
//       </Animatable.View>
//     );
//   }
//
//   _renderContent(section, i, isActive) {
//     //  const { navigate } = this.props.navigation;
//     return (
//       <Animatable.View duration={200} style={[styles.content, isActive ? styles.active : styles.inactive]} transition="backgroundColor">
//         <Text style={styles.headerContentText}>Schedule </Text>
//         <Text style={styles.contentText}>Start:{section.Schedule.start}</Text>
//         <Text style={styles.contentText}>End:{section.Schedule.End}</Text>
//         <Text style={styles.headerContentText}>Location</Text>
//         <Text style={styles.contentText}>{section.location}</Text>
//         {/* <TouchableHighlight underlayColor="white"> */}
//           <View style={styles.initiateButton}>
//             {/* <Text style={styles.initiateText} onPress={this._handleInitiateJob}>Initiate Job</Text> */}
//           </View>
//         {/* </TouchableHighlight> */}
//       </Animatable.View>
//     );
//   }
//
//   static navigationOptions = {
//     title: 'Upcoming Jobs',
//     headerStyle: { backgroundColor: 'black' ,marginTop: 20},
//     headerTitleStyle: { color: 'white', textAlign: 'center', alignSelf: 'center' },
//     headerRight:
//     <TouchableHighlight style={{backgroundColor:'#5CFC7C',height:50, width:60, }}>
//         <Text style={{textAlign:'center',marginTop:15}}>Call</Text>
//     </TouchableHighlight>,
//     };
//
//   render() {
//     const { navigate } = this.props.navigation;
//     return (
//       <ScrollView>
//         <View  style={{borderBottomColor: 'grey',borderBottomWidth: 0.2,}}>
//             <Text style={styles.textStyle}>20 Jul 2017</Text>
//         </View>
//         <View style={styles.container}>
//           <List><ApplicationDetails data={users} >
//             {users.map((user) => (
//           <ListItem
//             key={user.id}
//             title="Application Number"
//             subtitle={user.applicationNumber}
//             onPress={() => this.toggle()}
//           />
//         ))}
//       </List>        </View>
//       </ScrollView>
//     );
//   }
// }
//
// export default HomeScreen;
// const styles = StyleSheet.create({
//   textStyle: {
//     fontSize:30,
//     color:'black',
//     justifyContent: 'center',
//     alignItems: 'center',
//     alignSelf:'center',
//     padding:15,
//     borderBottomColor: 'grey',
//     borderBottomWidth: 1,
//   },
//   container: {
//     flex: 1,
//   },
//   header: {
//     backgroundColor: '#D3D3D3',
//     paddingTop: 10,
//     paddingBottom: 10,
//     paddingLeft: 10,
//     marginTop: 1,
//   },
//   headerText: {
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   headerContentText: {
//     fontSize: 16,
//     fontWeight: '500',
//     paddingTop:10,
//   },
//   contentText:{
//     fontSize: 18,
//   },
//   content: {
//     paddingLeft: 10,
//     backgroundColor: '#fff',
//   },
//   active: {
//     backgroundColor: 'rgba(255,255,255,1)',
//   },
//   inactive: {
//     backgroundColor: '#D3D3D3',
//   },
//   initiateButton: {
//     backgroundColor: "#08A4D6",
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: 210,
//     padding: 15,
//     borderRadius: 10,
//     marginTop: 20,
//     marginLeft:60,
//     marginBottom:30
//   },
//   initiateText: {
//     color: 'white',
//     fontSize: 20,
//     fontWeight:'500',
// },
//
// });
