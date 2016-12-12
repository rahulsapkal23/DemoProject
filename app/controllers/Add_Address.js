// ######################################### Setting Header #########################################
$.header.__views.tital.text = "Add Address";
$.header.__views.back.addEventListener('click', function(e) {
    $.Add_Addresswin.close();
});


// ######################################### SAVE Address in DB#########################################

$.Save_add.addEventListener('click',function (e) {
  var ADDRESS =$.ADDRESS.value;
  var LANDMARK =$.LANDMARK.value;
  var CITY =$.CITY.value;
  var STATE =$.STATE.value;
  var ZIP =$.ZIP.value;
  var COUNTRY =$.COUNTRY.value;
  // ######################################### Insert data from text Area into database #########################################
      db.execute('INSERT INTO address VALUES (?,?,?,?,?,?)',ADDRESS,LANDMARK,CITY,STATE,ZIP, COUNTRY);
      Ti.API.info("inside click");
      // ######################################### Show data from text Area into database #########################################
      var rows = db.execute('SELECT * FROM address');
      Ti.API.info('Row1 count: ' + rows.rowCount);
      Ti.API.info(rows.field(0)+","+rows.field(1)+","+rows.field(2)+","+rows.field(3)+","+rows.field(4)+","+rows.field(5)+".");

      // ######################################### New Controller for address list  #########################################
  var AddressList = Alloy.createController('AddressList').getView();
  AddressList.open();

});
