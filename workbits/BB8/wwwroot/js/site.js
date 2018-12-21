// Create a client instance
//require('./mqttws31.js');


// called when the client connects

function opp(){
    kjor("robot/connected", '{"command":"backward","key":"abc1236"}');
}

function ned() {

    kjor("robot/connected", '{"command":"forward","key":"abc1236"}');
}

function venstre() {

    kjor("robot/connected", '{"command":"right","key":"abc1236"}');
}

function hoyre(){
    kjor("robot/connected", '{"command":"left","key":"abc1236"}');
}
function stopp(){
    kjor("robot/connected", '{"command":"stop","key":"abc1236"}');
}

function test(){
    kjor("$SYS/broker/version", '');
}

function kjor(dest, msg)
{

    console.log("kjører: ",dest, msg)
    message = new Paho.MQTT.Message(msg);
    message.destinationName = dest;
    client.send(message);
    console.log("msg sent...")
}

   var wsbroker = "broker.hivemq.com";  //mqtt websocket enabled broker
    var wsport = Number(8000); // port for above
    var client = new Paho.MQTT.Client(wsbroker, wsport, "myclientid_" + parseInt(Math.random() * 100, 10));
    client.onConnectionLost = function (responseObject) {
      console.log("connection lost: " + responseObject.errorMessage);
    };
    client.onMessageArrived = function (message) {
      console.log(message.destinationName, ' -- ', message.payloadString);
    };
    var options = {
      timeout: 3,
      onSuccess: function () {
        console.log("mqtt connected");
        // Connection succeeded; subscribe to our topic, you can add multile lines of these
   //     client.subscribe('/World', {qos: 1});
    
        //use the below if you want to publish to a topic on connect
   
  
      },
      onFailure: function (message) {
        console.log("Connection failed: " + message.errorMessage);
      }
    };
  function init() {
      client.connect(options);
  }
/*
function kjor(cmd, melding)
{
  console.log("connecting....");
  client = new Paho.MQTT.Client("192.168.1.105", Number(1883), "");
  
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;

  client.connect({onSuccess:onConnect});

function onConnect() {
  console.log("onConnect");
  message = new Paho.MQTT.Message(melding);
  message.destinationName = cmd;
  client.send(message);
  console.log("sent melding");
}

function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(message) {
  console.log("onMessageArrived:"+message.payloadString);
}

}*/

$(document).ready(function(){
    $("#up").mousedown(function(){
        opp();
    });
    $("#up").mouseup(function(){
        stopp();
    });
    $("#down").mousedown(function(){
        ned();
    });
    $("#down").mouseup(function(){
        stopp();
    });
    $("#left").mousedown(function(){
        venstre();
    });
    $("#left").mouseup(function(){
        stopp();
    });
    $("#right").mousedown(function(){
        hoyre();
    });
    $("#right").mouseup(function(){
        stopp();
    });
    var isRunning = false;
    $(document).keydown(function(e){
        if(isRunning)
            return;

            isRunning = true;
        console.log("key down: ",e.keyCode);
        switch(e.keyCode)
        {
            case Number(38):
            opp();
            break;
            case Number(40):
            ned();
            break;
            case Number(39): 
            hoyre();
            break;
            case Number(37):
            venstre();
            break;
        }
    });
    $(document).keyup(function(key){
        isRunning = false;
        stopp();
    });
        $("#test").mousedown(function(){
        test();
    });

    init();
    /*Up: 38
Down: 40
Right: 39
Left: 37 */
});