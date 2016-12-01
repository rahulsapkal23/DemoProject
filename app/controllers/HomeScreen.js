// ######################################### Setting Header #########################################
$.header.__views.tital.text = "Home Screen";
$.header.__views.back.addEventListener('click', function(e) {
    $.HomeScreenwin.close();
});

// $.HomeScreenwin.orientationModes = [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT]
// ################################# get argument from previous controllew ###################################
var access_token = arguments[0] || {};
Ti.API.info("Inside Listview and id is" + access_token);
Ti.API.info(JSON.stringify(access_token));

// ######################################### function of Listing Product #########################################
function ListProduct(e) {
    Ti.API.info("click on which block" + e);
    Ti.API.info("click on next block" + JSON.stringify(e));
    var ListProduct = Alloy.createController('ListProduct', e.source.productcategoryid).getView();
    ListProduct.open();
}


// ################################# making  HTTP GET request for API ###################################
var client = Ti.Network.createHTTPClient({
    onload: function(e) {
        var response = JSON.parse(client.getResponseText());
        Ti.API.info("json stringfy load" + JSON.stringify(e));
        Ti.API.info("client.responseTextinsudefun onload" + client.getResponseText());
        // function called fir list view according to Product id
        HomeScreenDetails(client.getResponseText());
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
// Send the request.
client.setRequestHeader("access_token", access_token);
//xhr.setRequestHeader("cache-control", "no-cache");
//xhr.setRequestHeader("postman-token", "1b1fe29f-2ff0-324e-aff5-547aed18e442");
client.send();

function HomeScreenDetails(LoginDetails) {


    Ti.API.info("sfdds5523" + LoginDetails);
    Ti.API.info("565545" + JSON.parse(LoginDetails).data.product_categories[0].icon_image);
    Ti.API.info(JSON.stringify($.view11.backgroundColor));
    //$.view11.setBackgroundImage(LoginDetails.data.product_categories[1].icon_image);
    $.view11.image = (JSON.parse(LoginDetails)).data.product_categories[0].icon_image;
    $.view21.image = (JSON.parse(LoginDetails)).data.product_categories[1].icon_image;
    $.view31.image = JSON.parse(LoginDetails).data.product_categories[2].icon_image;
    $.view41.image = JSON.parse(LoginDetails).data.product_categories[3].icon_image;


}
