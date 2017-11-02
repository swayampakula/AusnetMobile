import React, { Component } from 'react';
import { View, StyleSheet, Alert, Image } from 'react-native';
import {FormLabel,FormInput, Button} from 'react-native-elements'; // 0.17.0
// import {Actions} from
// import "@expo/vector-icons"; // 5.2.0
import {Actions} from "react-native-router-flux";

export default class App extends Component {
constructor() {
     super();
     this.state = {

     user:'',
     password:''
   }
 }
getUserText(e)
{
  this.setState({user:e.value});
}
passwordText(e)
{
 this.setState({password:e.value});
}

_handleButtonPress = () => {
  // Alert.alert(
  //   'Logged in successfully!',
  //
  // );
  Actions.home();
};

render() {

  return (
    <View style={styles.container}>
    <View style={{width:200,height:150}}>

      <Image
        source={{ uri: 'http://www.keypacific.com/wp-content/uploads/2014/07/ausnet-services.png'}}
        style={{height:150}}

      />


    </View>
      <View style={{marginTop:30}}>
       <FormLabel >Username</FormLabel>
       <FormInput onChange={this.getUserText.bind(this)} value={this.state.user}/>
       <FormLabel>Password</FormLabel>
       <FormInput onChange={this.passwordText.bind(this)} value={this.state.password}/>




    </View>
    <View style={{marginTop:30}}>
     <Button raised
         title="Login"
         onPress={this._handleButtonPress}
         backgroundColor='skyblue'
         buttonStyle={{width:200}}
       />
  </View>
    </View>
  );
}
}

const styles = StyleSheet.create({
container: {
  flex:1,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'white',
},
});


// import React, { Component } from 'react';
// import {Alert, View, StyleSheet, Alert, Image } from 'react-native';
// import {FormLabel,FormInput, Button} from 'react-native-elements'; // 0.17.0
// // import {Actions} from
// // import "@expo/vector-icons"; // 5.2.0
// import {Actions} from "react-native-router-flux";
//
// export default class App extends Component {
// constructor() {
//      super();
//      this.state = {
//
//      username:'',
//      password:''
//    }
//  }
//  // async saveItem(item, selectedValue) {
//  //    try {
//  //      await AsyncStorage.setItem(item, selectedValue);
//  //    } catch (error) {
//  //      console.error('AsyncStorage error: ' + error.message);
//  //    }
//  //  }
//
// getUserText(e)
// {
//   this.setState({username:e.value});
// }
// passwordText(e)
// {
//  this.setState({password:e.value});
// }
//
// _userLogin=()=> {
// //   if (!this.state.username || !this.state.password) return;
// //   fetch(restURL+':8080/api/v1/Employee/', {
// //   method: 'POST',
// //   headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
// //   body: JSON.stringify({
// //     username: this.state.username,
// //     password: this.state.password,
// //   })
// // })
// // .then((response) => response.json())
// // .then((responseData) => {
// //   this.saveItem('id_token', responseData.id),
// //   Alert.alert('Login Success!', 'Click the button to get a Chuck Norris quote!'),
//   Actions.home();
// };
//
// render() {
//
//   return (
//     <View style={styles.container}>
//     <View style={{width:200,height:150}}>
//
//       <Image
//         source={{ uri: 'http://www.keypacific.com/wp-content/uploads/2014/07/ausnet-services.png'}}
//         style={{height:150}}
//
//       />
//
//
//     </View>
//       <View style={{marginTop:30}}>
//        <FormLabel >Username</FormLabel>
//        <FormInput onChange={this.getUserText.bind(this)} value={this.state.username}/>
//        <FormLabel>Password</FormLabel>
//        <FormInput onChange={this.passwordText.bind(this)} value={this.state.password}/>
//
//
//
//
//     </View>
//     <View style={{marginTop:30}}>
//      <Button raised
//          title="Login"
//          onPress={this._userLogin.bind(this)}
//          backgroundColor='#05AADA'
//          buttonStyle={{width:200}}
//        />
//   </View>
//     </View>
//   );
// }
// }
//
// const styles = StyleSheet.create({
// container: {
//   flex:1,
//   alignItems: 'center',
//   justifyContent: 'center',
//   backgroundColor: 'white',
// },
// });
