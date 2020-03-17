const neffos = require('neffos.js');

const wsURL = "ws://127.0.0.1:8086/echo";

async function runExample() {
  try {
    console.log("start runExample.");
    const conn = await neffos.dial(wsURL, {
      default: { // "default" namespace.
        _OnNamespaceConnected: function (nsConn, msg) {
          console.log("connected to namespace: " + msg.Namespace);
        },
        _OnNamespaceDisconnect: function (nsConn, msg) {
          console.log("disconnected from namespace: " + msg.Namespace);
    
        },
        chat: function (nsConn, msg) {
          console.log('====msg=======',msg.Body);
        }
      }
    },{
        reconnect: 2000,
    });
    const nsConn = await conn.connect("default");

    /*setInterval(function(){
        
    }, 1000);*/
    nsConn.emit("chat",JSON.stringify({Name:"test",ID:"10bf0d11"}))
  } catch (err) {
    console.error(err);
  }
}

runExample()
