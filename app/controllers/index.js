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
function ForgotPwd(e) {
    Ti.API.info("inside GoToRegister");
    var ForgotPwd = Alloy.createController('ForgotPwd').getView();
    ForgotPwd.open();
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
    var client = Ti.Network.createHTTPClient();
    client.onload = function(e) {
        var response = JSON.parse(client.getResponseText());
        Ti.API.info("json stringfy load" + JSON.stringify(e));
        Ti.API.info("client.responseText onload" + client.getResponseText());

        alert(response.message);
        GoToHomescreen(client.getResponseText());


    };
    client.onerror = function(e) {
        var response = JSON.parse(client.getResponseText());
        Ti.API.info(" onerror" + JSON.stringify(e));
        Ti.API.info("client.responseText onerror" + client.getResponseText());
        Ti.API.info(response.message);
        alert(response.message);

    };
    client.open('POST', 'http://staging.php-dev.in:8844/trainingapp/api/users/login');
    client.send(data);

}


function GoToHomescreen(e) {
    Ti.API.info("inside GoToHomescreen" + e);
    Ti.API.info("21212" + JSON.stringify(e));
    Ti.API.info("inside GoToHomescreen1111" + JSON.parse(e).data.access_token);
    var HomeScreen = Alloy.createController('HomeScreen', (JSON.parse(e)).data.access_token).getView();
    HomeScreen.open();
}

  $.index.open();
// var window = Alloy.createController('HomeScreen').getView();
// window.open();
