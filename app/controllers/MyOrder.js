$.header.__views.tital.text = "My Order";

$.header.__views.back.addEventListener('click', function(e) {
    $.MyOrderwin.close();
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
        ViewofOrderList(client.getResponseText())
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

client.open("GET", "http://staging.php-dev.in:8844/trainingapp/api/orderList");
client.setRequestHeader("access_token", Alloy.Globals.Maccess_token);
// Send the request.
client.send();



function ViewofOrderList(OrderList) {
    Ti.API.info(OrderList);
    Ti.API.info("OrderList" + JSON.stringify(OrderList));
    Ti.API.info("OrderList7777" + JSON.parse(OrderList));

    for (var i = 0; i < JSON.parse(OrderList).data.length; i++) {
        var items = []; {
            items.push({
                "orderId": {
                    text: "Order ID : " + JSON.parse(OrderList).data[i].id,
                },
                "Price": {
                    text: "Rs . " + JSON.parse(OrderList).data[i].cost,
                },
                "orderDate": {
                    text: "Ordered Date : " + JSON.parse(OrderList).data[i].created,
                },

                "template": "image_title",

            });
            $.dynamicListView.sections[0].setItems(items, {
                animated: "false",
            });
        }

    }
}
