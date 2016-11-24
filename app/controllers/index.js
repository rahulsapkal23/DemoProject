$.index.open();
$.header.__views.tital.text = "Home";
$.header.__views.back.text = " ";
function check_Login(e) {
    Ti.API.info("inside check_Login");
    var HomeScreen=Alloy.createController('HomeScreen').getView();
    HomeScreen.open();
}


if (Ti.Platform.osname == "android") {
    $.bottom.top = "15%";
}
else {
  $.bottom.top = "25%";
}

function GoToForgotPwd(e) {
    Ti.API.info("inside GotoforgotPwd");
}

function GoToRegister(e) {
    Ti.API.info("inside Register");
    var w = Alloy.createController('register').getView();
    w.open();
}
