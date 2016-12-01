// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//


Alloy.Globals.HttpRequest123 = function(arguments, success1, fail1) {
    Ti.API.info("inside Alloy" + arguments[0] + "dddd" + arguments[1] + "dddd" + arguments[2]);
    var client = Ti.Network.createHTTPClient({
        onload: function(e) {
            var response = (this.responseText);
            Ti.API.info("json stringfy load" + JSON.stringify(this.responseText));
            Ti.API.info("json parse load" + this.responseText);
            //  Ti.API.info("client.responseTextinsudefun onload" + this.ResponseText);
            // function called fir list view according to Product id
            success1(response);
        },
        // function called when an error occurs, including a timeout
        onerror: function(e) {
            var response = JSON.parse(this.responseText);
            Ti.API.info(" onerror" + JSON.stringify(e));
            Ti.API.info("client.responseText onerror" + this.responseText);
            Ti.API.info(response.message);
            fail1(response);
            // alert(response.message);
        },
        timeout: 5000 // in milliseconds
    });
    // Prepare the connection.

    client.open(arguments[0], arguments[1]);
    // Send the request.
    client.setRequestHeader("access_token", arguments[2]);
    //xhr.setRequestHeader("cache-control", "no-cache");
    //xhr.setRequestHeader("postman-token", "1b1fe29f-2ff0-324e-aff5-547aed18e442");
    client.send();

}
