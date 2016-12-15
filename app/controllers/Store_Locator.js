Ti.API.info("inside Store_Locator");

$.header.__views.tital.text ="Store Locator";

$.header.__views.back.addEventListener('click', function(e) {
    $.Store_Locatorwin.close();
});

$.header.__views.search.text = "\uf07a";
$.header.__views.search.addEventListener('click', function(e) {
    var MyCart = Alloy.createController('MyCart').getView();
    MyCart.open();
});


function report(evt) {
    Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid);
}
