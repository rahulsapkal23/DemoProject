// ######################################### Setting Header #########################################

$.header.__views.back.addEventListener('click', function(e) {
    clearMemory();
    $.ListProductwin.close();
    var Homescreen = Alloy.createController('HomeScreen',Ti.App.Properties.getString('ACCESS_TOKEN')).getView();
    Homescreen.open();
});
$.header.__views.search1.text = "\uf07a";
$.header.__views.search.addEventListener('click', function(e) {
    if (Alloy.Globals.cartFlag == true) {
        var MyCart = Alloy.createController('MyCart').getView();
        MyCart.open();

    } else {
        alert("My Cart is Empty");
    }
});
// ################################# function for clear Memory ###################################
function clearMemory() {
    Ti.API.info("Inside Clear Memory");


}


// ################################# get argument from previous controllew ###################################
var args = arguments[0] || {};
var access_token = arguments[1] || {};
switch (args) {
    case 1:
        $.header.__views.tital.text = "Table";
        break;
    case 2:
        $.header.__views.tital.text = "Chairs";
        break;
    case 3:
        $.header.__views.tital.text = "Sofas";
        break;
    case 4:
        $.header.__views.tital.text = "Cupbords";
        break;
    default:

}
access_token = Ti.App.Properties.getString('ACCESS_TOKEN');
Ti.API.info("Inside Listview and id is" + args);
Ti.API.info(JSON.stringify(args));
Ti.API.info("rahhhhhuuulll" + access_token);
Ti.API.info("rahhhhhuuulll" + JSON.stringify(access_token));


// ################################# making  HTTP GET request for API ###################################
var p = 0;
GetProdList();

function GetProdList() {
    p++;
    Ti.API.info("inside get list");
    var data = {
        product_category_id: args,
        limit: 8,
        page: p,
    }
    Ti.API.info("inside get list");
    // require('loder').addloder($.ListProductwin);

    var client = Ti.Network.createHTTPClient({
        onload: function(e) {
            // require('loder').removeloder();
            // Ti.API.info("client.getResponseText()" + JSON.stringfy(e));
            var response = JSON.parse(client.getResponseText());
            // Ti.API.info("json stringfy load" + JSON.stringify(e));
            Ti.API.info("client.responseText onload" + client.getResponseText());
            // function called fir list view according to Product id
            ListViewofProduct(client.getResponseText());
            Ti.API.info("p is" + p);
            $.dynamicListView.addEventListener('scrollend', function(e) {
                GetProdList();
            });


        },
        // function called when an error occurs, including a timeout
        onerror: function(e) {
            // require('loder').removeloder();
            var response = JSON.parse(client.getResponseText());
            Ti.API.info(" onerror" + JSON.stringify(e));
            // Ti.API.info("client.responseText onerror" + client.getResponseText());
            // Ti.API.info(response.message);
            // alert(response.message);
        },
        //  timeout : 5000  // in milliseconds
    });
    // Prepare the connection.

    client.open("GET", "http://staging.php-dev.in:8844/trainingapp/api/products/getList?product_category_id=" + args + "&limit=8&page=" + p);
    // Send the request.
    client.send();

}

// ################################# function of setting data from API ###################################


// function GetProdList() {
//   alert("hiii");
//   Ti.API.info("inside scrollend");
// }
function ListViewofProduct(Productdata) {
    Ti.API.info(Productdata);
    Ti.API.info("imageraj" + JSON.parse(Productdata).data.length);

    var items = [];
    for (var i = 0; i < JSON.parse(Productdata).data.length; i++) {

        var rating = JSON.parse(Productdata).data[i].rating;
        Ti.API.info("rating for" + rating);
        switch (rating) {

            case 1:
                items.push({
                    "name": {
                        text: JSON.parse(Productdata).data[i].name
                    },
                    "image": {
                        image: JSON.parse(Productdata).data[i].product_images,
                    },
                    "producer": {
                        text: JSON.parse(Productdata).data[i].producer
                    },
                    "price": {
                        text: "Rs. " + JSON.parse(Productdata).data[i].cost,
                        color: "red"
                    },
                    "rate1": {
                        color: "#ffba00",

                    },

                    "rate2": {
                        color: "#7f7f7f",

                    },
                    "rate3": {
                        color: "#7f7f7f",

                    },
                    "rate4": {
                        color: "#7f7f7f",

                    },
                    "rate5": {
                        color: "#7f7f7f",

                    },

                    "template": "image_title",
                    "properties": {
                        Mid: JSON.parse(Productdata).data[i].id,
                        access_token: JSON.stringify(access_token),


                    }
                });

                break;
            case 2:
                items.push({
                    "name": {
                        text: JSON.parse(Productdata).data[i].name
                    },
                    "image": {
                        image: JSON.parse(Productdata).data[i].product_images,

                    },
                    "producer": {
                        text: JSON.parse(Productdata).data[i].producer,

                    },
                    "price": {
                        text: "Rs. " + JSON.parse(Productdata).data[i].cost,
                        color: "red"
                    },
                    "rate1": {

                        color: "#ffba00",

                    },
                    "rate2": {

                        color: "#ffba00",

                    },
                    "rate3": {
                        color: "#7f7f7f",

                    },
                    "rate4": {
                        color: "#7f7f7f",

                    },
                    "rate5": {
                        color: "#7f7f7f",

                    },

                    "template": "image_title",
                    "properties": {
                        Mid: JSON.parse(Productdata).data[i].id,
                        access_token: JSON.stringify(access_token),

                    }
                });

                break;
            case 3:
                items.push({
                    "name": {
                        text: JSON.parse(Productdata).data[i].name
                    },
                    "image": {
                        image: JSON.parse(Productdata).data[i].product_images,
                    },
                    "producer": {
                        text: JSON.parse(Productdata).data[i].producer
                    },
                    "price": {
                        text: "Rs. " + JSON.parse(Productdata).data[i].cost,
                        color: "red"
                    },
                    "rate1": {

                        color: "#ffba00",

                    },
                    "rate2": {

                        color: "#ffba00",

                    },
                    "rate3": {

                        color: "#ffba00",

                    },
                    "rate4": {
                        color: "#7f7f7f",

                    },
                    "rate5": {
                        color: "#7f7f7f",

                    },

                    "template": "image_title",
                    "properties": {
                        Mid: JSON.parse(Productdata).data[i].id,
                        access_token: JSON.stringify(access_token),

                    }
                });

                break;
            case 4:
                items.push({
                    "name": {
                        text: JSON.parse(Productdata).data[i].name
                    },
                    "image": {
                        image: JSON.parse(Productdata).data[i].product_images,
                    },
                    "producer": {
                        text: JSON.parse(Productdata).data[i].producer
                    },
                    "price": {
                        text: "Rs. " + JSON.parse(Productdata).data[i].cost,
                        color: "red"
                    },
                    "rate1": {

                        color: "#ffba00"
                    },
                    "rate2": {

                        color: "#ffba00"
                    },
                    "rate3": {

                        color: "#ffba00"
                    },
                    "rate4": {

                        color: "#ffba00"
                    },
                    "rate5": {
                        color: "#7f7f7f"
                    },

                    "template": "image_title",
                    "properties": {
                        Mid: JSON.parse(Productdata).data[i].id,
                        access_token: JSON.stringify(access_token),
                    }
                });

                break;
            case 5:
                items.push({
                    "name": {
                        text: JSON.parse(Productdata).data[i].name
                    },
                    "image": {
                        image: JSON.parse(Productdata).data[i].product_images,
                    },
                    "producer": {
                        text: JSON.parse(Productdata).data[i].producer
                    },
                    "price": {
                        text: "Rs. " + JSON.parse(Productdata).data[i].cost,
                        color: "red"
                    },
                    "rate1": {

                        color: "#ffba00"
                    },
                    "rate2": {

                        color: "#ffba00"
                    },
                    "rate3": {

                        color: "#ffba00"
                    },
                    "rate4": {

                        color: "#ffba00"
                    },
                    "rate5": {

                        color: "#ffba00",

                    },

                    "template": "image_title",
                    "properties": {
                        Mid: JSON.parse(Productdata).data[i].id,
                        access_token: JSON.stringify(access_token),

                    }
                });

                break;
            default:

        }
        if (p == 1) {
            $.dynamicListView.sections[0].setItems(items, {
                animated: "false",

            });
        } else {
            $.dynamicListView.sections[0].appendItems(items, {
                animated: "false",

            });
        }

    }
}


// ################################# function call on click of list ###################################
function GoToProductDetail(e) {
    Ti.API.info("inside GoToProductDetails");
    Ti.API.info("on click" + e);
    Ti.API.info("on click stringify" + JSON.stringify(e));
    Ti.API.info(e.section.getItemAt(e.itemIndex));
    Ti.API.info(e.section.getItemAt(e.itemIndex).properties.Mid);
    var ProductDetail = Alloy.createController('ProductDetail', e.section.getItemAt(e.itemIndex).properties.Mid, access_token).getView();
    ProductDetail.open();

}


$.ListProductwin.open();
