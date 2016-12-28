// ######################################### Setting Header #########################################

$.header.__views.tital.text = "My Order";

$.header.__views.back.addEventListener('click', function(e) {
    $.MyOrderwin.close();
});


$.header.__views.search.addEventListener('click', function(e) {
    if (Alloy.Globals.cartFlag == true) {
        var MyCart = Alloy.createController('MyCart').getView();
        MyCart.open();

    } else {
        alert("My Cart is Empty");
    }
});

require('loder').addloder($.MyOrderwin);
// ################################# making  HTTP GET request for API ###################################
var client = Ti.Network.createHTTPClient({
    onload: function(e) {
      require('loder').removeloder();
        var response = JSON.parse(client.getResponseText());
        Ti.API.info("json stringfy Mycart" + JSON.stringify(e));
        Ti.API.info("client.responseText MyCart" + client.getResponseText());
        // function called fir list view according to Product id
        ViewofOrderList(client.getResponseText())
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

client.open("GET", "http://staging.php-dev.in:8844/trainingapp/api/orderList");
client.setRequestHeader("access_token", Alloy.Globals.Maccess_token);
// Send the request.
client.send();



function ViewofOrderList(OrderList) {
    Ti.API.info(OrderList);
    Ti.API.info("OrderList" + JSON.stringify(OrderList));
    Ti.API.info("OrderList7777" + JSON.parse(OrderList));
    var items = [];
    for (var i = 0; i < JSON.parse(OrderList).data.length; i++) {

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

            "properties": {
                obj: JSON.parse(OrderList).data[i],
            },
            "template": "image_title",


        });
        $.dynamicListView.sections[0].setItems(items, {
            animated: "false",
        });


    }
}

function itemclick(e) {
    Ti.API.info("inside itemclick" + JSON.stringify(e));
    var item = e.section.items[e.itemIndex];
    Ti.API.info("orderid" + item.properties.obj.id);
    Ti.API.info("orderid JSON.stringify" + JSON.stringify(item.properties));

    var OrderDetails = Alloy.createController('OrderDetails', item.properties.obj.id).getView();
    OrderDetails.open();

}
