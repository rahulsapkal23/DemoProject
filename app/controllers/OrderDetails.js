// ######################################### Setting Header #########################################
var order_id1 = arguments[0] || {};
$.header.__views.tital.text = order_id1;

$.header.__views.back.addEventListener('click', function(e) {
    $.OrderDetailswin.close();
});


$.header.__views.search.addEventListener('click', function(e) {
    if (Alloy.Globals.cartFlag == true) {
        var MyCart = Alloy.createController('MyCart').getView();
        MyCart.open();

    } else {
        alert("My Cart is Empty");
    }
});



function itemclick(e) {
    Ti.API.info("inside itemclick");
}


Ti.API.info("order id" + typeof order_id1);
Ti.API.info("order id" + JSON.parse(order_id1));
Ti.API.info("order id" + JSON.stringify(order_id1));

require('loder').addloder($.OrderDetailswin);
// ################################# making  HTTP GET request for API ###################################

var client = Ti.Network.createHTTPClient({
    onload: function(e) {
      require('loder').removeloder();
        var response = JSON.parse(client.getResponseText());
        Ti.API.info("json stringfy Mycart" + JSON.stringify(e));
        Ti.API.info("client.responseText MyCart" + client.getResponseText());
        // function called fir list view according to Product id
        ViewofOrderDetails(client.getResponseText())
    },
    // function called when an error occurs, including a timeout
    onerror: function(e) {
      require('loder').removeloder();
        var response = JSON.parse(client.getResponseText());
        Ti.API.info(" onerror" + JSON.stringify(e));
        Ti.API.info("client.responseText onerror" + client.getResponseText());
        Ti.API.info(response.message);
        alert(response.message);
    },
    //  timeout : 5000  // in milliseconds
});
// Prepare the connection.

client.open("GET", "http://staging.php-dev.in:8844/trainingapp/api/orderDetail?order_id=" + order_id1);
client.setRequestHeader("access_token", Alloy.Globals.Maccess_token);
// Send the request.
client.send();



function ViewofOrderDetails(OrderList) {
    Ti.API.info(OrderList);

    Ti.API.info("inside function ViewofMycart" + OrderList);
    Ti.API.info("inside function ViewofMycart stringify" + JSON.stringify(OrderList));
    var items = [];
    for (var i = 0; i < JSON.parse(OrderList).data.order_details.length; i++) {
        items.push({
            "name": {
                text: JSON.parse(OrderList).data.order_details[i].prod_name,
            },
            "image": {
                image: JSON.parse(OrderList).data.order_details[i].prod_image,
            },
            "type": {
                text: "(" + JSON.parse(OrderList).data.order_details[i].prod_cat_name + ")",
            },
            "price": {
                text: "Rs. " + JSON.parse(OrderList).data.order_details[i].total,
                color: "red"
            },
            "QTY": {
                text: +JSON.parse(OrderList).data.order_details[i].quantity,
                color: "black",

            },

            "template": "image_title",

        });
        $.dynamicListView.sections[0].setItems(items, {
            animated: "false",
        });
    }
    Ti.API.info(JSON.parse(OrderList).data.cost);
    $.total.text = "Rs." + JSON.parse(OrderList).data.cost;
};
