Ti.API.info("inside Add Add_Address js");
$.header.__views.tital.text = "Add Address";
$.header.__views.back.addEventListener('click', function(e) {
    $.Add_Addresswin.close();
});



$.Save_add.addEventListener('click',function (e) {


  var ADDRESS =$.ADDRESS.value;
  var LANDMARK =$.LANDMARK.value;
  var CITY =$.CITY.value;
  var STATE =$.STATE.value;
  var ZIP =$.ZIP.value;
  var COUNTRY =$.COUNTRY.value;
db.execute('INSERT INTO address VALUES (?,?,?,?,?,?)',ADDRESS,LANDMARK,CITY,STATE,ZIP, COUNTRY);
  Ti.API.info("inside click");

  var rows = db.execute('SELECT * FROM address');
  Ti.API.info('Row1 count: ' + rows.rowCount);

Ti.API.info(rows.field(0)+","+rows.field(1)+","+rows.field(2)+","+rows.field(3)+","+rows.field(4)+","+rows.field(5)+".");




  // var personArray = ['Paul','020 7000 0000', 'London'];
  // db.execute('INSERT INTO people (name, phone_number, city) VALUES (?, ?, ?)', personArray);
  //
  // var rows = db.execute('SELECT rowid,name,phone_number,city FROM people');
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
  // var personArray = ['London'];
  // db.execute('INSERT INTO address (id,address1) VALUES (12,"badalpur")');
  //
  // var rows = db.execute('SELECT * FROM address');
  // Ti.API.info('Row count: ' + rows.rowCount);
  //
  // var fieldCount = rows.fieldCount;
  // Ti.API.info('Field count: ' + fieldCount);
  //
  //
  // rows.close();
  // db.close();

  // // db.execute('INSERT INTO Address (ADDRESS,LANDMARK ,CITY ,STATE ,ZIP,COUNTRY) VALUES (?, ?, ?, ?, ?, ?)',$.ADDRESS.value,$.LANDMARK.value,$.CITY.value,$.STATE.value,$.ZIP.value,$.COUNTRY.value );
  //  db.execute('INSERT INTO Address (ADDRESS,LANDMARK ,CITY ,STATE ,ZIP,COUNTRY) VALUES ("11", "12", "asa", "asa", "asa", "asa")');
  //
  //
  //
  // var rows = db.execute('SELECT * FROM Address');
  // // Ti.API.info('Row count: ' + rows.rowCount);
  // Ti.API.info('Row count: ' + rows.rowCount);
  // Ti.API.info(rows.rowid);
  //
  // var fieldCount = rows.fieldCount;
  // Ti.API.info('Field count: ' + fieldCount);
  //
  // while (rows.isValidRow()){
  //   Ti.API.info('address ---> ROWID: ' + rows.field(0) + ', ADDRESS:' + rows.field(1) + ', LANDMARK: ' + rows.field(2) + ', city: ' + rows.field(3)+ ', city: ' + rows.field(4)+ ', city: ' + rows.field(5));
  //   rows.next();
  // }
  // rows.close();
  // db.close();
  var AddressList = Alloy.createController('AddressList').getView();
  AddressList.open();
  // var rows1 = db1.execute('SELECT rowid,name FROM addressData');
  // Ti.API.info('Row count: ' + rows1.rowCount);
});



/*var db = Ti.Database.open('mydb1Installed');
db.execute('CREATE TABLE IF NOT EXISTS people (name TEXT, phone_number TEXT, city TEXT)');
db.execute('DELETE FROM people');

var thisName = 'Arthur';
var thisPhoneNo = '1-617-000-0000';
var thisCity = 'Mountain View';
db.execute('INSERT INTO people (name, phone_number, city) VALUES (?, ?, ?)', thisName, thisPhoneNo, thisCity);

var personArray = ['Paul','020 7000 0000', 'London'];
db.execute('INSERT INTO people (name, phone_number, city) VALUES (?, ?, ?)', personArray);

var rows = db.execute('SELECT rowid,name,phone_number,city FROM people');
Ti.API.info('Row count: ' + rows.rowCount);

var fieldCount = rows.fieldCount;
Ti.API.info('Field count: ' + fieldCount);

while (rows.isValidRow()){
  Ti.API.info('Person ---> ROWID: ' + rows.fieldByName('rowid') + ', name:' + rows.field(1) + ', phone_number: ' + rows.fieldByName('phone_number') + ', city: ' + rows.field(3));
  rows.next();
}
rows.close();
db.close();
*/
