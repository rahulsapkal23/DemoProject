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
// var db = Ti.Database.open('address');
// db.execute('CREATE TABLE IF NOT EXISTS address ( address1 TEXT');
 // db.execute('DELETE FROM address');

// var thisName = 'Arthur';
// var thisPhoneNo = '1-617-000-0000';
// var thisCity = 'Mountain View';
//  db.execute('INSERT INTO address (address1) VALUES ("kulgaon")');
//
//
// var rows = db.execute('SELECT * FROM address');
// Ti.API.info('Row count: ' + rows.rowCount);
//
// var fieldCount = rows.fieldCount;
// Ti.API.info('Field count: ' + fieldCount);
//
// while (rows.isValidRow()){
//   Ti.API.info('Person ---> ROWID: ' + rows.fieldByName('rowid') + ', name:' + rows.field(1) + ', phone_number: ' + rows.fieldByName('phone_number') + ', city: ' + rows.field(3));
//   rows.next();
// }
// rows.close();
// db.close();
 // var db = Ti.Database.open('AddressDb');
 // db.execute('CREATE TABLE IF NOT EXISTS Address (id NUMBER)');





 //

 // db.execute('DELETE FROM people');
var db = Ti.Database.open('demo_DB');
db.execute('CREATE TABLE IF NOT EXISTS address (ADDRESS TEXT,LANDMARK TEXT,CITY TEXT,STATE TEXT,ZIP TEXT,COUNTRY TEXT)');

 // db1.execute('INSERT INTO address VALUES (1,"raja")' );
// db1.execute('INSERT INTO address VALUES (2,"rani")' );
//
// var rows1 = db1.execute('SELECT * FROM address');
// Ti.API.info('Row count: ' + rows1.rowCount);
//
// var fieldCount = rows1.fieldCount;
// Ti.API.info('Field count: ' + fieldCount);
//
//
// while (rows1.isValidRow()){
//   Ti.API.info('Person ---> ROWID: '  + ', name:' + rows1.field(0) + ', phone_number: ' );
//   rows1.next();
// }
 // var thisName = 'Arthur';
 // // var thisPhoneNo = '1-617-000-0000';
 // // var thisCity = 'Mountain View';
 // db.execute('INSERT INTO addressData (name) VALUES (thisName)' );
 //
 //
 //
 // var rows = db.execute('SELECT rowid,name FROM addressData');
 // Ti.API.info('Row count: ' + rows.rowCount);
 //
 // var fieldCount = rows.fieldCount;
 // Ti.API.info('Field count: ' + fieldCount);
 //
 // while (rows.isValidRow()){
 //   Ti.API.info('Person ---> ROWID: ' + rows.fieldByName('rowid') + ', name:' + rows.field(1) + ', phone_number: ' );
 //   rows.next();
 // }
 // rows.close();
 // db.close();
