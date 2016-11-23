$.index.open();

function check_Login(e) {
    Ti.API.info("inside check_Login");
}


if (Ti.Platform.osname == "android") {
    $.bottom.top = "20%";
}

function GoToForgotPwd(e) {
    Ti.API.info("inside GotoforgotPwd");
}

function GoToRegister(e) {
    Ti.API.info("inside Register");
    var w = Alloy.createController('register').getView();
    w.open();
}
