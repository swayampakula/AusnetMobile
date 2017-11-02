import React from 'react';
import ContextComponent from './context';
import { StyleSheet, Text, ScrollView,View,Button,TouchableOpacity,TouchableHighlight} from 'react-native';
import { StackNavigator } from 'react-navigation';
import HomeScreen from './contents/homescreen';
import ApplicationDetails from './contents/applicationDetails';
import ResponsePage from './contents/ResponsePage';
import JobProgressScreen from './contents/JobProgressScreen';
import PermitScreen from './contents/PermitScreen';
import FeedbackScreen from './contents/FeedbackScreen';
import login from './contents/login';
import { Icon, } from 'react-native-elements';
import moment from 'moment';
import {Router,Stack,Scene} from "react-native-router-flux";

const App = () => (

      <ContextComponent>
  <Router>
    <Stack key="root">
      <Scene key="login" component={login} type='push'/>
      	<Scene key="home" component={HomeScreen} title='Upcoming Jobs'/>
		<Scene key="ApplicationDetails" component={ApplicationDetails} title='' type='push'/>

		<Scene key="ResponsePage" component={ResponsePage} title='' type='push'/>
    <Scene key="JobProgressScreen" component={JobProgressScreen} title='Job Progress' type='push'/>
    <Scene key="PermitScreen" component={PermitScreen} title='Permit Screen' type='push'/>
      <Scene key="JobProgressScreen" component={JobProgressScreen} title='Job Progress' type='push'/>
      <Scene key="FeedbackScreen" component={FeedbackScreen} title='Feedback Form' type='push'/>

        {/* <Scene key="FeedbackScreen" component={FeedbackScreen} title='Feedback Form' type='push'/> */}
    </Stack>
  </Router>
</ContextComponent>
);
export default App;
