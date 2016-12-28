// ######################################### Setting Header #########################################
$.header.__views.tital.text = "Register";
$.header.__views.back.addEventListener('click', function(e) {
    $.Registerwin.close();
});
$.header.__views.search1.text = " ";

function clickMale() {
    $.male.text = "\uf111";
    $.female.text = "\uf1db";

}

function clickFemale() {
    $.female.text = "\uf111";
    $.male.text = "\uf1db";
}
/* ######################### Validatoin Of CheckBox ######################### */
function clickCheck() {
    if ($.check.text == "\uf0c8") {
        $.check.text = "\uf14a";
    } else {
        $.check.text = "\uf0c8";
    }
}


/* *********************************************checking Register Validation of each Field ************************************** */
function check_Register(e) {
    var emailRE = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/;
    var mobRE = /^\d{10}$/;
    var zipRE = /^\d{6}$/;
    var passwordRE = /^\w{6,16}$/;
    if ($.first_name.value == "") {
        $.viewfirst_name.backgroundColor = "blue";
        alert("please fill first name");
    } else if ($.last_name.value == "") {
        $.viewfirst_name.backgroundColor = "transprent";
        $.viewlast_name.backgroundColor = "blue";
        alert("please fill last name");
    } else if (emailRE.test($.email_id.value) == false) {
        $.viewfirst_name.backgroundColor = "transprent";
        $.viewlast_name.backgroundColor = "transprent";
        $.viewemail_id.backgroundColor = "blue";
        alert("Invalid email_id");
    } else if (passwordRE.test($.password.value) == false) {
        $.viewfirst_name.backgroundColor = "transprent";
        $.viewlast_name.backgroundColor = "transprent";
        $.viewemail_id.backgroundColor = "transprent";
        $.viewpassword.backgroundColor = "blue";
        alert("Password must 6 letters");
    } else if ($.password.value != $.conform_password.value) {
        $.viewfirst_name.backgroundColor = "transprent";
        $.viewlast_name.backgroundColor = "transprent";
        $.viewemail_id.backgroundColor = "transprent";
        $.viewpassword.backgroundColor = "transprent";
        $.viewconform_password.backgroundColor = "blue";
        alert("Password is not matched");


    } else if ($.male.text == "\uf1db" && $.female.text == "\uf1db") {
        $.viewfirst_name.backgroundColor = "transprent";
        $.viewlast_name.backgroundColor = "transprent";
        $.viewemail_id.backgroundColor = "transprent";
        $.viewpassword.backgroundColor = "transprent";
        $.viewconform_password.backgroundColor = "transprent";
        $.viewphone_no.backgroundColor = "transprent";
        $.viewGender.backgroundColor = "blue";
        alert("please Select Gender");
    } else if (mobRE.test($.phone_no.value) == false) {
        $.viewfirst_name.backgroundColor = "transprent";
        $.viewlast_name.backgroundColor = "transprent";
        $.viewemail_id.backgroundColor = "transprent";
        $.viewpassword.backgroundColor = "transprent";
        $.viewconform_password.backgroundColor = "transprent";
        $.viewphone_no.backgroundColor = "blue";
        alert("Phone No must be 10 digits");

    } else if ($.check.text == "\uf0c8") {
        $.viewfirst_name.backgroundColor = "transprent";
        $.viewlast_name.backgroundColor = "transprent";
        $.viewemail_id.backgroundColor = "transprent";
        $.viewpassword.backgroundColor = "transprent";
        $.viewconform_password.backgroundColor = "transprent";
        $.viewphone_no.backgroundColor = "transprent";
        $.viewGender.backgroundColor = "transprent";

        alert("please check out Terms and conditions");
    } else {
        $.viewfirst_name.backgroundColor = "transprent";
        $.viewlast_name.backgroundColor = "transprent";
        $.viewemail_id.backgroundColor = "transprent";
        $.viewpassword.backgroundColor = "transprent";
        $.viewconform_password.backgroundColor = "transprent";
        $.viewphone_no.backgroundColor = "transprent";
        $.viewGender.backgroundColor = "transprent";

        GoToRegisterAPI();

    }
}

// ######################################### making  HTTP POST request for API #########################################
function GoToRegisterAPI() {
  require('loder').addloder($.Registerwin);
    var genderval;
    if ($.male.text == "\uf1db") {
        genderval = "male";
    } else {
        genderval = "female";
    }
    var data = {
        first_name: $.first_name.value,
        last_name: $.last_name.value,
        email: $.email_id.value,
        password: $.password.value,
        confirm_password: $.conform_password.value,
        gender: genderval,
        phone_no: $.phone_no.value
    }
    Ti.API.info("data" + JSON.stringify(data));
    var xhr = Ti.Network.createHTTPClient();
    xhr.onload = function(e) {
      require('loder').removeloder();
        var response = JSON.parse(xhr.getResponseText());
        Ti.API.info("json stringfy load" + JSON.stringify(e));
        Ti.API.info("xhr.responseText onload" + xhr.getResponseText());
        Ti.API.info(response.message);
        alert(response.message);
        // var HomeScreen = Alloy.createController('HomeScreen', response.data.access_token).getView();
        // HomeScreen.open();
          Alloy.Globals.Maccess_token = response.data.access_token;
          Ti.API.info("global acees tokan"+ JSON.stringify(Alloy.Globals.Maccess_token));
          var HomeScreen = Alloy.createController('HomeScreen',   Alloy.Globals.Maccess_token).getView();
          HomeScreen.open();

    };
    xhr.onerror = function(e) {
      require('loder').removeloder();
        var response = JSON.parse(xhr.getResponseText());
        Ti.API.info(" onerror" + JSON.stringify(e));
        Ti.API.info("xhr.responseText onerror" + xhr.getResponseText());
        Ti.API.info(response.message);
        alert(response.message);

    };
    xhr.open('POST', 'http://staging.php-dev.in:8844/trainingapp/api/users/register');
    xhr.send(data);

}
