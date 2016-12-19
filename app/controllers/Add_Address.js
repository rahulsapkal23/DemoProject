// ######################################### Setting Header #########################################
$.header.__views.tital.text = "Add Address";
$.header.__views.back.addEventListener('click', function(e) {
    $.Add_Addresswin.close();
});


$.header.__views.search.text = "\uf07a";
$.header.__views.search.addEventListener('click', function(e) {
  if (Alloy.Globals.MycartFlag=="true") {
    var MyCart = Alloy.createController('MyCart').getView();
    MyCart.open();

  } else {
    alert("My Cart is Empty");
  }
});
// ######################################### SAVE Address in DB#########################################

$.Save_add.addEventListener('click', function(e) {
    var ADDRESS = $.ADDRESS.value;
    var LANDMARK = $.LANDMARK.value;
    var CITY = $.CITY.value;
    var STATE = $.STATE.value;
    var ZIP = $.ZIP.value;
    var COUNTRY = $.COUNTRY.value;

    if (ADDRESS == "") {
        $.ADDRESS.backgroundColor = "blue";
        alert("please fill ADDRESS");
    } else if (LANDMARK == "") {
        $.ADDRESS.backgroundColor = "transprent";
        $.LANDMARK.backgroundColor = "blue";
        alert("please fill LANDMARK");
    } else if (CITY == "") {
        $.ADDRESS.backgroundColor = "transprent";
        $.LANDMARK.backgroundColor = "transprent";
        $.CITY.backgroundColor = "blue";
        alert("please fill CITY");
    } else if (STATE == "") {
        $.ADDRESS.backgroundColor = "transprent";
        $.LANDMARK.backgroundColor = "transprent";
        $.CITY.backgroundColor = "transprent";
        $.STATE.backgroundColor = "blue";
        alert("please fill STATE");
    } else if (ZIP == "") {
        $.ADDRESS.backgroundColor = "transprent";
        $.LANDMARK.backgroundColor = "transprent";
        $.CITY.backgroundColor = "transprent";
        $.STATE.backgroundColor = "transprent";
        $.ZIP.backgroundColor = "blue";
        alert("please fill ZIP");
    } else if (COUNTRY == "") {
        $.ADDRESS.backgroundColor = "transprent";
        $.LANDMARK.backgroundColor = "transprent";
        $.CITY.backgroundColor = "transprent";
        $.STATE.backgroundColor = "transprent";
        $.ZIP.backgroundColor = "transprent";
        $.COUNTRY.backgroundColor = "blue";
        alert("please fill COUNTRY");
    } else {


        // ######################################### Insert data from text Area into database #########################################
        db.execute('INSERT INTO address VALUES (?,?,?,?,?,?)', ADDRESS, LANDMARK, CITY, STATE, ZIP, COUNTRY);
        Ti.API.info("inside click");
        // ######################################### Show data from text Area into database #########################################
        var rows = db.execute('SELECT * FROM address');
        Ti.API.info('Row1 count: ' + rows.rowCount);
        Ti.API.info(rows.field(0) + "," + rows.field(1) + "," + rows.field(2) + "," + rows.field(3) + "," + rows.field(4) + "," + rows.field(5) + ".");
        var AddressList = Alloy.createController('AddressList').getView();
        AddressList.open();
    }
    // ######################################### New Controller for address list  #########################################



});
