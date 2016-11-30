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


// ################################# function of setting data from API ###################################

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
                        text: JSON.parse(Productdata).data[i].cost,
                        color: "green"
                    },
                    "rate1": {
                        color: "yellow",

                    },

                    "rate2": {
                        color: "grey",

                    },
                    "rate3": {
                        color: "grey",

                    },
                    "rate4": {
                        color: "grey",

                    },
                    "rate5": {
                        color: "grey",

                    },

                    "template": "image_title",
                    "properties": {
                        Mid:JSON.parse(Productdata).data[i].id,


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
                        text: JSON.parse(Productdata).data[i].cost,
                        color: "green"
                    },
                    "rate1": {

                        color: "yellow",

                    },
                    "rate2": {

                        color: "yellow",

                    },
                    "rate3": {
                        color: "grey",

                    },
                    "rate4": {
                        color: "grey",

                    },
                    "rate5": {
                        color: "grey",

                    },

                    "template": "image_title",
                    "properties": {
                        Mid:JSON.parse(Productdata).data[i].id,


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
                        text: JSON.parse(Productdata).data[i].cost,
                        color: "green"
                    },
                    "rate1": {

                        color: "yellow",

                    },
                    "rate2": {

                        color: "yellow",

                    },
                    "rate3": {

                        color: "yellow",

                    },
                    "rate4": {
                        color: "grey",

                    },
                    "rate5": {
                        color: "grey",

                    },

                    "template": "image_title",
                    "properties": {
                        Mid:JSON.parse(Productdata).data[i].id,


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
                    "rate5": {
                        color: "grey"
                    },

                    "template": "image_title",
                    "properties": {
                        Mid:JSON.parse(Productdata).data[i].id,

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
                    "rate5": {

                        color: "yellow",

                    },

                    "template": "image_title",
                    "properties": {
                        Mid:JSON.parse(Productdata).data[i].id,


                    }
                });

                break;
            default:

        }

        $.dynamicListView.sections[0].setItems(items, {
            animated: "false",

        });
    }
}


// ################################# function call on click of list ###################################
function GoToProductDetail(e){
  Ti.API.info("inside GoToProductDetails");
  Ti.API.info("on click"+e);
  Ti.API.info("on click stringify"+JSON.stringify(e));
  Ti.API.info(e.section.getItemAt(e.Mid));
  // var item = e.section.getItemAt(e.itemIndex);
  //   if (item.properties.accessoryType == Ti.UI.LIST_ACCESSORY_TYPE_NONE) {
  //       item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK;
  //   }
  //   else {
  //       item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_NONE;
  //   }
  //   e.section.updateItemAt(e.itemIndex, item);
  //   alert(
  //       "ItemId: " + e.itemId + "\n" +
  //       "BindId: " + e.bindId + "\n" +
  //       "Section Index: " + e.sectionIndex + ", Item Index: " + e.itemIndex
  //   );
  // var GoToProductDetail=
}


// listView.addEventListener('itemclick', function(e){
//   Ti.API.info("inside click event");
//     // var item = e.section.getItemAt(e.itemIndex);
//     // if (item.properties.accessoryType == Ti.UI.LIST_ACCESSORY_TYPE_NONE) {
//     //     item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK;
//     // }
//     // else {
//     //     item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_NONE;
//     // }
//     // e.section.updateItemAt(e.itemIndex, item);
//     // alert(
//     //     "ItemId: " + e.itemId + "\n" +
//     //     "BindId: " + e.bindId + "\n" +
//     //     "Section Index: " + e.sectionIndex + ", Item Index: " + e.itemIndex
//     // );
// });

$.ListProductwin.open();
