$.header.__views.tital.text ="My Account";

$.header.__views.back.addEventListener('click', function(e) {
    $.MyAccountwin.close();
});

$.header.__views.search.text = "\uf07a";
$.header.__views.search.addEventListener('click', function(e) {
    var MyCart = Alloy.createController('MyCart').getView();
    MyCart.open();
});
