Ti.API.info("inside Reset account");






// ######################################### Setting Header #########################################
$.header.__views.tital.text = "Reset Password";

$.header.__views.back.addEventListener('click', function(e) {
    $.ResetAccountwin.close();
});
// ######################################### checking login with API #########################################
function check_Reset(e) {
    Ti.API.info("inside check_Login");
if ($.newPWD.value==$.conformPWD.value) {
  $.newPWDview.backgroundColor = "transprent";
  $.conformPWDview.backgroundColor = "transprent";
    GoToResetAPI();
} else {
  $.newPWDview.backgroundColor = "blue";
  $.conformPWDview.backgroundColor = "blue";
}



}








// ######################################### making  HTTP POST request for API #########################################
function GoToResetAPI() {
    var data = {
      old_password:$.currentPWD.value,
        password:$.newPWD.value ,
        confirm_password:$.conformPWD.value,

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
    client.open('POST', 'http://staging.php-dev.in:8844/trainingapp/api/users/change');
    client.setRequestHeader("access_token", Alloy.Globals.Maccess_token);

    client.send(data);

}


function GoToHomescreen(e) {
    Ti.API.info("inside GoToHomescreen" + e);
    Ti.API.info("21212" + JSON.stringify(e));

    var HomeScreen = Alloy.createController('HomeScreen', Alloy.Globals.Maccess_token).getView();
    HomeScreen.open();
}
