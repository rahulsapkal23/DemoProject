// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

//
// function HttpRequest(Request_Type,Url,Header_Argument) {
// Ti.API.info("inside Alloy");
//   var client = Ti.Network.createHTTPClient({
//       onload: function(e) {
//           var response = JSON.parse(client.getResponseText());
//           Ti.API.info("json stringfy load" + JSON.stringify(e));
//           Ti.API.info("client.responseTextinsudefun onload" + client.getResponseText());
//           // function called fir list view according to Product id
//           return client.getResponseText();
//       },
//       // function called when an error occurs, including a timeout
//       onerror: function(e) {
//           var response = JSON.parse(client.getResponseText());
//           Ti.API.info(" onerror" + JSON.stringify(e));
//           Ti.API.info("client.responseText onerror" + client.getResponseText());
//           Ti.API.info(response.message);
//           alert(response.message);
//       },
//       //  timeout : 5000  // in milliseconds
//   });
//   // Prepare the connection.
//
//   client.open(Request_Type, );
//   // Send the request.
//   client.setRequestHeader("access_token", Header_Argument);
//   //xhr.setRequestHeader("cache-control", "no-cache");
//   //xhr.setRequestHeader("postman-token", "1b1fe29f-2ff0-324e-aff5-547aed18e442");
//   client.send();
//
// }

Alloy.Globals.Map = require('ti.map');

/* ######################### Create DATABASE ######################### */
var db = Ti.Database.open('Demo_DB');
db.execute('CREATE TABLE IF NOT EXISTS address (ADDRESS TEXT,LANDMARK TEXT,CITY TEXT,STATE TEXT,ZIP TEXT,COUNTRY TEXT)');
// db.execute('DROP TABLE  address ');
