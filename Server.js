
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var redis = require('redis');

var app = express();
const router = require('express').Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use('/api/v1/',require('./router'));

var server = http.createServer(app);




//socket Part started

// const socket = new WebSocket('ws://192.168.0.102:3000');
//
// // Connection opened
// socket.addEventListener('open', function (event) {
//     socket.send('Hello Server!');
// });
//
// // Listen for messages
// socket.addEventListener('message', function (event) {
//     console.log('Message from server ', event.data);
// });
//
var io = require('socket.io').listen(server);
io.on('connection',function(socket){
  console.log('SOCKET CONNECTED');
// const redis = require('redis');
  var redisClient = redis.createClient({host:'127.0.0.1',port:6379});
  var publishClient = redis.createClient({host:'127.0.0.1',port:6379});
redisClient.subscribe('ApprovalChanelV1');
redisClient.subscribe('InitiateJobPauseNotificationCEOTRedis');
redisClient.on('message', (channel, message) => {
console.log('-----------subscribe get data----------');
if(channel=='ApprovalChanelV1'){
io.emit('approvalConfirmation', {message});
console.log(message);}
else if(channel=='InitiateJobPauseNotificationCEOTRedis'){
  io.emit('InitiateJobPauseNotificationCEOTMobile', message);
}
});

socket.on('notification', function(msg){
  // var publishClient = redis.createClient();
  // publishClient.publish('ApprovalChanel', 'Data publish');

console.log(msg);

});

socket.on('InitiateJobRequest',function(msg){

  console.log('redis publish job request here---------------');
  // console.log(msg.data);
  // let data=msg.data;
  // console.log(data);
  // var data = msg.data;

  // console.log(JSON.stringify(data));
  publishClient.publish('InitiateJobRequestRedisV1',msg);

});

socket.on('JobActivityMsg',function(msg){
  publishClient.publish('JobActivityMsgRedis',msg);
});

socket.on('JobCompletionMsg',function(msg){
  publishClient.publish('JobCompletionMsgRedis',msg);
});

socket.on('InitiateJobNotification',function(msg){
    // var publishClient = redis.createClient({host:'127.0.0.1',port:6379});
    // var data = msg.data;
    // console.log(JSON.stringify(data));
    console.log('notification data reach here');
    console.log(msg);

     publishClient.publish('InitiateJobNotificationRedis',msg);
});

socket.on('InitiateJobPauseNotification',function(msg){
  console.log('notification for pause reach here');
  console.log(msg);

   publishClient.publish('InitiateJobPauseNotificationRedis',msg);
})

 });

//Listening to port 8081

server.listen(3000, '0.0.0.0', function(err, result) {
    if (err) {
        console.error("Error ", err);
    }
    console.log("Server started at 3000");
});



// var express = require('express');
// var path = require('path');
// var app = express();
// var server = require('http').createServer(app);
// var io = require('socket.io').listen(server);
// console.log('io is here');
// // console.log(io);
// // var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
//
// app.use('/api/v1/',require('./router'));
//
// io.on('connection',function(socket){
//   console.log('SOCKET CONNECTED');
// // const redis = require('redis');
//   //   var redisClient = redis.createClient();
//    //
//   //   redisClient.subscribe('ApprovalChanel');
//   //   redisClient.on('message', (channel, message) => {
//   //  console.log('-----------subscribe get data----------');
//   //  console.log(message);
//   socket.on('notification', function(msg){
//     // var publishClient = redis.createClient();
//     // publishClient.publish('ApprovalChanel', 'Data publish');
//
//     console.log('message: ' + msg);
//     //  io.emit('publish', {data:msg.data});
//     // socket.emit('publish',{data:'Confirmation from server'});
//   });
//  });
// //var io = require('socket.io').listen(server);
//
//
//
//
//
// server.listen(3000, '0.0.0.0', function(err, result) {
//     if (err) {
//         console.error("Error ", err);
//     }
//     console.log("Server started at 3000");
// });
