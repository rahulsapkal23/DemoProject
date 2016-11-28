$.header.__views.tital.text = "Home Screen";
// $.header.__views.back.text = " ";
$.header.__views.back.addEventListener('click', function(e) {
    $.win.close();
});

// Label.addEventListener("click",function () {
//
// })
 function ListProduct(e){
  var ListProduct=Alloy.createController('ListProduct','1').getView();
  ListProduct.open();
 }
