// ######################################### Setting Header #########################################
$.header.__views.tital.text = "Home";
$.header.__views.back.text = " ";

// ######################################### checking login with API #########################################
function check_Login(e) {
    Ti.API.info("inside check_Login");
  // ############# function call of HTTP post req for API #################
    GoToLoginAPI();
}

// ######################################### platform spacific code #########################################
if (Ti.Platform.osname == "android") {
    $.bottom.top = "15%";
} else {
    $.bottom.top = "40%";
}

// ######################################### forgot Password function call #########################################
function ram(e) {
    Ti.API.info("inside GoToRegister");
    var ram = Alloy.createController('ForgotPwd').getView();
    ram.open();
}



function GoToRegister(e) {
    Ti.API.info("inside Register");
    var register = Alloy.createController('register').getView();
    register.open();
}

// ######################################### making  HTTP POST request for API #########################################
function GoToLoginAPI() {
    var data = {
        email: $.email_id.value,
        password: $.password.value,

    }
    Ti.API.info(data);
    var xhr = Ti.Network.createHTTPClient();
    xhr.onload = function(e) {
        var response = JSON.parse(xhr.getResponseText());
        Ti.API.info("json stringfy load" + JSON.stringify(e));
        Ti.API.info("xhr.responseText onload" + xhr.getResponseText());
        Ti.API.info(response.message);
        alert(response.message);
        var HomeScreen = Alloy.createController('HomeScreen').getView();
        HomeScreen.open();

    };
    xhr.onerror = function(e) {
        var response = JSON.parse(xhr.getResponseText());
        Ti.API.info(" onerror" + JSON.stringify(e));
        Ti.API.info("xhr.responseText onerror" + xhr.getResponseText());
        Ti.API.info(response.message);
        alert(response.message);

    };
    xhr.open('POST', 'http://staging.php-dev.in:8844/trainingapp/api/users/login');
    xhr.send(data);

}

$.index.open();
// var window = Alloy.createController('MyProfile').getView();
// window.open();
