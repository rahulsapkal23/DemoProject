Ti.API.info("inside Add Add_Address js");
$.header.__views.tital.text = "Add Address";
$.header.__views.back.addEventListener('click', function(e) {
    $.Add_Addresswin.close();
});
$.header.__views.search.text = "\uf067";


$.Save_add.addEventListener('click',function (e) {
  Ti.API.info("inside click");
  var AddressList = Alloy.createController('AddressList').getView();
  AddressList.open();

});
