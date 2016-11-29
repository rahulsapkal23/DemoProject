// ######################################### Setting Header #########################################
$.header.__views.tital.text = "List Product";
$.header.__views.back.addEventListener('click', function(e) {
    $.ListProductwin.close();
});

// ################################# get argument from previous controllew ###################################
var args = arguments[0] || {};
Ti.API.info("Inside Listview and id is" + args);
Ti.API.info(JSON.stringify(args));

// ################################# making  HTTP GET request for API ###################################
var client = Ti.Network.createHTTPClient({
    onload: function(e) {
        var response = JSON.parse(client.getResponseText());
        Ti.API.info("json stringfy load" + JSON.stringify(e));
        Ti.API.info("client.responseText onload" + client.getResponseText());
        // function called fir list view according to Product id
        ListViewofProduct(client.getResponseText())
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

client.open("GET", "http://staging.php-dev.in:8844/trainingapp/api/products/getList?product_category_id=" + args);
// Send the request.
client.send();

function ListViewofProduct(Productdata) {
    Ti.API.info(Productdata);
    Ti.API.info("imageraj" + JSON.parse(Productdata).data.length);

    var items = [];
    for (var i = 0; i < JSON.parse(Productdata).data.length; i++) {

        var rating = JSON.parse(Productdata).data[i].rating;
        Ti.API.info("rating for" + rating);
        //  Ti.API.info($.rating1.color);
        // items.push({
        //     "name": {
        //         text: JSON.parse(Productdata).data[i].name
        //     },
        //     "image": {
        //         image: JSON.parse(Productdata).data[i].product_images,
        //     },
        //     "producer": {
        //         text: JSON.parse(Productdata).data[i].producer
        //     },
        //     "price": {
        //         text: JSON.parse(Productdata).data[i].cost,
        //         color: "green"
        //     },
        // "rate1": {
        //     //text: JSON.parse(Productdata).data[i].cost,
        //     color: "green"
        // },
        // "rate2": {
        //     //text: JSON.parse(Productdata).data[i].cost,
        //     color: "green"
        // },
        // "rate3": {
        //     //  text: JSON.parse(Productdata).data[i].cost,
        //     color: "green"
        // },
        // "rate4": {
        //     //  text: JSON.parse(Productdata).data[i].cost,
        //     color: "green"
        // },
        // "rate5": {
        //     //  text: JSON.parse(Productdata).data[i].cost,
        //     color: "green"
        // },
        //
        //         "template": "image_title"
        //     });
        // }

        switch (rating) {
            //
            //     case 1:
            //         Ti.API.info("inside case 1");
            //         $.rating1.setColor('#efefef');
            //         break;
            //     case 2:
            //         Ti.API.info("inside case 2");
            //         $.rating1.setColor("lime");
            //         $.rating2.setColor("lime");
            //         break;
            //     case 3:
            //         Ti.API.info("inside case 3");
            //         $.rating1.setColor("lime");
            //         $.rating2.setColor("lime");
            //         $.rating3.setColor("lime");
            //
            //         break;
            //     case 4:
            //         Ti.API.info("inside case 4");
            //         $.rating1.setColor("lime");
            //         $.rating2.setColor("lime");
            //         $.rating3.setColor("lime");
            //         $.rating4.setColor("lime");
            //         break;
            //     case 5:
            //         Ti.API.info("inside case 5");
            //         $.rating1.setColor("lime");
            //         $.rating2.setColor("lime");
            //         $.rating3.setColor("lime");
            //         $.rating4.setColor("lime");
            //         $.rating5.setColor("lime");
            //         break;
            //
            // }




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
                        text: JSON.parse(Productdata).data[i].cost,
                        color: "green"
                    },
                    "rate1": {

                        color: "yellow"
                    },
                    "rate2": {
                        color: "blue"
                    },
                    "rate3": {
                        color: "blue"
                    },
                    "rate4": {
                        color: "blue"
                    },
                    "rate5": {
                        color: "blue"
                    },
                    "template": "image_title"
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
                        text: JSON.parse(Productdata).data[i].producer
                    },
                    "price": {
                        text: JSON.parse(Productdata).data[i].cost,
                        color: "green"
                    },
                    "rate1": {

                        color: "yellow"
                    },
                    "rate2": {

                        color: "yellow"
                    },
                    "rate3": {
                        color: "blue"
                    },
                    "rate4": {
                        color: "blue"
                    },
                    "rate5": {
                        color: "blue"
                    },
                    "template": "image_title"
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
                        text: JSON.parse(Productdata).data[i].cost,
                        color: "green"
                    },
                    "rate1": {

                        color: "yellow"
                    },
                    "rate2": {

                        color: "yellow"
                    },
                    "rate3": {

                        color: "yellow"
                    },
                    "rate4": {
                        color: "blue"
                    },
                    "rate1": {
                        color: "blue"
                    },
                    "template": "image_title"
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
                        text: JSON.parse(Productdata).data[i].cost,
                        color: "green"
                    },
                    "rate1": {

                        color: "yellow"
                    },
                    "rate2": {

                        color: "yellow"
                    },
                    "rate3": {
                        text: "\uf005",
                        color: "yellow"
                    },
                    "rate4": {

                        color: "yellow"
                    },
                    "rate5": {
                        color: "blue"
                    },
                    "template": "image_title"
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
                        text: JSON.parse(Productdata).data[i].cost,
                        color: "green"
                    },
                    "rate1": {

                        color: "yellow"
                    },
                    "rate2": {

                        color: "yellow"
                    },
                    "rate3": {

                        color: "yellow"
                    },
                    "rate4": {

                        color: "yellow"
                    },
                    "rate1": {

                        color: "yellow"
                    },
                    "template": "image_title"
                });

                break;
            default:

        }

        $.dynamicListView.sections[0].setItems(items, {
            animated: "false"
        });
    }
}

function WebView(e) {

}

$.ListProductwin.open();
