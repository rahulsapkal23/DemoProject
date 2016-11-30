  $.header.__views.tital.text = "Table";

$.header.__views.back.addEventListener('click', function(e) {
    $.ProductDetailwin.close();
});


// ################################# get argument from previous controllew ###################################
var args = arguments[0] || {};
Ti.API.info("Inside ProductDetail and id is" + args);
Ti.API.info(JSON.stringify(args));



// ################################# making  HTTP GET request for API ###################################
var client = Ti.Network.createHTTPClient({
    onload: function(e) {
        var response = JSON.parse(client.getResponseText());
        Ti.API.info("json stringfy ViewofProductDetails" + JSON.stringify(e));
        Ti.API.info("client.responseText ViewofProductDetails" + client.getResponseText());
        // function called fir list view according to Product id
        ViewofProductDetails(client.getResponseText())
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

client.open("GET", "http://staging.php-dev.in:8844/trainingapp/api/products/getDetail?product_id=" + args);
// Send the request.
client.send();




function ViewofProductDetails(e) {
  Ti.API.info("in side ViewofProductDetails");
  Ti.API.info(e);
  Ti.API.info("hero" + JSON.parse(e).data.length);

}
