// ######################################### Setting Header #########################################
$.header.__views.tital.text = "Login";
$.header.__views.back1.text = " ";
$.header.__views.search1.text = " ";
$.button.addEventListener('click',check_Login);
// ######################################### checking login with API #########################################
function check_Login(e) {
    Ti.API.info("inside check_Login");
    // ############# function call of HTTP post req for API #################
    // require('loader').loading($.indexwin);
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


Alloy.Globals.mycartItem = 0;

function GoToRegister(e) {
    Ti.API.info("inside Register");
    var register = Alloy.createController('register').getView();
    register.open();
}

// ######################################### making  HTTP POST request for API #########################################
function GoToLoginAPI() {

    var data = {
        // email: $.email_id.value,
        // password: $.password.value,
        // email: "rahul.sapkal@neosoft.com",
        // password: "rahuls123",
        email: "r@g.com",
        password: "rahuls123",

    }
    Ti.API.info(data);
    var client = Ti.Network.createHTTPClient();
    client.onload = function(e) {
        var response = JSON.parse(client.getResponseText());
        Ti.API.info("json stringfy load" + JSON.stringify(e));
        Ti.API.info("client.responseText onload" + client.getResponseText());
        Alloy.Globals.Mpassword = data.password;
        // alert(response.message);
        GoToHomescreen(client.getResponseText());


    };
    client.onerror = function(e) {
        var response = JSON.parse(client.getResponseText());
        Ti.API.info(" onerror" + JSON.stringify(e));
        Ti.API.info("client.responseText onerror" + client.getResponseText());
        Ti.API.info(response.message);
        alert(response.message);
        response=null;
    };
    client.open('POST', 'http://staging.php-dev.in:8844/trainingapp/api/users/login');
    client.send(data);

}


function GoToHomescreen(e) {
    Ti.API.info("inside GoToHomescreen" + e);
    Ti.API.info("21212" + JSON.stringify(e));
    Ti.API.info("inside GoToHomescreen1111" + JSON.parse(e).data.access_token);
    Alloy.Globals.Maccess_token = JSON.parse(e).data.access_token;
    // db1.execute('INSERT INTO Persistance_log VALUES (?)', Alloy.Globals.Maccess_token);
    // Ti.API.info("inside click");
    //   var rows = db1.execute('SELECT * FROM Persistance_log');
    //     Ti.API.info(rows.field(0));
  Ti.App.Properties.setString('ACCESS_TOKEN',Alloy.Globals.Maccess_token);
    var HomeScreen = Alloy.createController('HomeScreen', (JSON.parse(e)).data.access_token).getView();
    HomeScreen.open();
}

if (Ti.App.Properties.getString('ACCESS_TOKEN')==null ||Ti.App.Properties.getString('ACCESS_TOKEN')==undefined ) {

  Ti.API.info("eeeeeeee"+Ti.App.Properties.getString('ACCESS_TOKEN'));
    $.indexwin.open();
} else {
  Ti.API.info("eeeeeeeerrrrrrr"+Ti.App.Properties.getString('ACCESS_TOKEN'));

  var HomeScreen = Alloy.createController('HomeScreen',Ti.App.Properties.getString('ACCESS_TOKEN')).getView();
  HomeScreen.open();

}


// var window = Alloy.createController('win1').getView();
// window.open();


function clearMemory() {
  Ti.API.info("inside clear memory");
  $.button.removeEventListener('click',check_Login);
  $.destroy();
}
