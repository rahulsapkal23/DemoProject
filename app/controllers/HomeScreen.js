$.header.__views.tital.text = "Home Screen";
// $.header.__views.back.text = " ";
$.header.__views.back.addEventListener('click', function(e) {
    $.win.close();
});

// Label.addEventListener("click",function () {
//
// })
 function ListProduct(e){
   Ti.API.info("click on which block"+e);
   Ti.API.info("click on next block"+JSON.stringify(e));
  var ListProduct=Alloy.createController('ListProduct',e.source.productcategoryid).getView();
  ListProduct.open();
 }
