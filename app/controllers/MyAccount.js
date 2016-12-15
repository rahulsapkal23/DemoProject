$.header.__views.tital.text ="My Account";

$.header.__views.back.addEventListener('click', function(e) {
    $.MyAccountwin.close();
});

$.header.__views.search.text = "\uf07a";
$.header.__views.search.addEventListener('click', function(e) {
    var MyCart = Alloy.createController('MyCart').getView();
    MyCart.open();
});



// ################################# making  HTTP GET request for API ###################################

var client = Ti.Network.createHTTPClient({
    onload: function(e) {
        var response = JSON.parse(client.getResponseText());
        Ti.API.info("json stringfy Mycart" + JSON.stringify(e));
        Ti.API.info("client.responseText MyCart" + client.getResponseText());
        // function called fir list view according to Product id
        ViewofMyAccountDetails(client.getResponseText())
    },
    // function called when an error occurs, including a timeout
    onerror: function(e) {
        var response = JSON.parse(client.getResponseText());
        Ti.API.info(" onerror" + JSON.stringify(e));
        Ti.API.info("client.responseText onerror" + client.getResponseText());
        Ti.API.info(response.message);
        alert(response.message);
    },
    //  timeout : 5000  // in milliseconds
});
// Prepare the connection.

client.open("GET", "http://staging.php-dev.in:8844/trainingapp/api/users/getUserData");
client.setRequestHeader("access_token", Alloy.Globals.Maccess_token);
// Send the request.
client.send();



function ViewofMyAccountDetails(Account) {
    Ti.API.info(Account);

    Ti.API.info("inside function ViewofMycart"+Account);
    Ti.API.info("inside function ViewofMycart stringify"+JSON.stringify(Account));
    $.first_name.value=JSON.parse(Account).data.user_data.first_name;
    $.last_name.value=JSON.parse(Account).data.user_data.last_name;
    $.email_id.value=JSON.parse(Account).data.user_data.email;
    $.phone_no.value=JSON.parse(Account).data.user_data.phone_no;

    };

function edit_Account(e){
  Ti.API.info("inside edit acc");
}
