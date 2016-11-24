$.header.__views.tital.text = "Home Screen";
// $.header.__views.back.text = " ";
$.header.__views.back.addEventListener('click', function(e) {
    $.win.close();
});

function ListProduct(e){
  var ListProduct=Alloy.createController('ListProduct').getView();
  ListProduct.open();
}
