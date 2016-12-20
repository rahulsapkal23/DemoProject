// ######################################### Setting Header #########################################
$.header.__views.back.addEventListener('click', function(e) {
    $.Mycartwin.close();
});


$.header.__views.search.addEventListener('click', function(e) {
    var window = Alloy.createController('win3').getView();
    window.open();
});

$.header.__views.tital.text = "My Cart";

$.order.addEventListener('click', function(e) {
    Ti.API.info("inside order click ");

    var AddressList = Alloy.createController('AddressList').getView();
    AddressList.open();
});


Ti.API.info("inside Add to cart" + Alloy.Globals.Maccess_token);
// $.picker.setSelectedRow(0, 2, false);
// $.picker.setSelectedRow(1, 3, false);

// ################################# making  HTTP GET request for API ###################################
var client = Ti.Network.createHTTPClient({
    onload: function(e) {
        var response = JSON.parse(client.getResponseText());
        Ti.API.info("json stringfy Mycart" + JSON.stringify(e));
        Ti.API.info("client.responseText MyCart" + client.getResponseText());
        // function called fir list view according to Product id
        ViewofMycart(client.getResponseText())
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

client.open("GET", "http://staging.php-dev.in:8844/trainingapp/api/cart");
client.setRequestHeader("access_token", Alloy.Globals.Maccess_token);
// Send the request.
client.send();

function ViewofMycart(cardData) {
    Ti.API.info("inside function ViewofMycart" + cardData);

    Ti.API.info("inside function ViewofMycart stringify" + JSON.stringify(cardData));
    var items = [];
    for (var i = 0; i < JSON.parse(cardData).data.length; i++) {
        items.push({
            "name": {
                text: JSON.parse(cardData).data[i].product.name,
            },
            "image": {
                image: JSON.parse(cardData).data[i].product.product_images,
            },
            "type": {
                text: "(" + JSON.parse(cardData).data[i].product.product_category + ")",
            },
            "price": {
                text: "Rs. " + JSON.parse(cardData).data[i].product.sub_total,
                color: "red"
            },
            "QTY": {
                text: +JSON.parse(cardData).data[i].quantity,
                color: "black",
                current_product: JSON.parse(cardData).data[i],
            },
            "Viewprice": {
                Mid: JSON.parse(cardData).data[i].id,
                access_token: Alloy.Globals.Maccess_token,
                current_product: JSON.parse(cardData).data[i],

            },
            "template": "image_title",
            "properties": {
                Mid: JSON.parse(cardData).data[i].id,
                access_token: Alloy.Globals.Maccess_token,
                current_product: JSON.parse(cardData).data[i],
            }
        });

    }
    $.dynamicListView.sections[0].setItems(items, {
        animated: "false",
    });
    Ti.API.info(JSON.parse(cardData).total);
    $.total.text = "Rs." + JSON.parse(cardData).total;
};



// var checkFlag = true;
// var pickerView = Titanium.UI.createView({
//     borderRadius: 10,
//     top: 50,
//     backgroundColor: 'white',
//     width: 250,
//     height: 400
// });


// var picker = Ti.UI.createPicker({ width:30,top:10,backgroundColor:"gray"});
// var data = [];
// // for(var j=1;j<=$.QTY.value;j++)
// data.push(Titanium.UI.createPickerRow({title:'1',value:'1'}));
// data.push(Titanium.UI.createPickerRow({title:'2',value:'2'}));
// data.push(Titanium.UI.createPickerRow({title:'3',value:'3'}));
// data.push(Titanium.UI.createPickerRow({title:'4',value:'4'}));
// picker.add(data);
// picker.selectionIndicator = true;
// pickerView.add(picker);


function picker(e) {




    $.dynamicListView.add(pickerView);



};

function itemclick(e) {
    Ti.API.info(e.bindId);
    Ti.API.info(JSON.stringify(e));
    var item = e.section.items[e.itemIndex];
    //	alert(item.properties.current_product);
    Ti.API.info(item.properties.current_product);
    if (e.bindId == "Viewprice" || e.bindId == "QTY") {
        if (Ti.Platform.osname == "android" || Ti.Platform.osname == "Android") {

            var viewBody = Titanium.UI.createView({
                backgroundColor: "#ededed",
            });
            var view = Titanium.UI.createView({
                height: "100%",
                width: "100%",
                backgroundColor: "white",
                layout: "vertical"
            });
            var Name = Ti.UI.createLabel({
                top: "30px",
                font: {
                    fontSize: "50px",
                },
                color: "#2C2B2B",
                text: item.properties.current_product.product.name,
            });
            var image = Ti.UI.createImageView({
                top: "20px",
                image: item.properties.current_product.product.product_images,

                borderColor: "black",

            });
            var textField = Ti.UI.createTextField({
                value: item.properties.current_product.quantity,
                width: "336px",
                height: "129px",
                top: "66px",
                borderColor: "gray",
                color: "black",
            });
            var Qty = Ti.UI.createLabel({
                top: "100px",
                font: {
                    fontSize: "50px",
                },
                color: "#2C2B2B",
                text: "Enter Qty",
            });
            var button = Titanium.UI.createButton({
                backgroundColor: "#db1514",
                fontSize: "75px",
                color: "#ffffff",
                top: "66px",
                title: "Submit",
                width: "595px",
                height: "142px"
            });
            button.addEventListener('click', function(e) {
                var TfRE = /^[1-8]$/;
                if (TfRE.test(textField.value) == false) {
                    textField.backgroundColor = "blue";
                } else {
                    textField.backgroundColor = "transprent";
                    Titanium.API.info("You clicked the button");
                    var data = {

                        quantity: textField.value,
                        product_id: item.properties.current_product.product_id,
                    }
                    var client = Ti.Network.createHTTPClient();
                    client.onload = function(e) {
                        var response = JSON.parse(client.getResponseText());
                        Ti.API.info("json stringfy load" + JSON.stringify(e));
                        Ti.API.info("client.responseText onload" + client.getResponseText());
                        Ti.API.info(response.message);
                        alert(response.message);
                    };
                    client.onerror = function(e) {
                        var response = JSON.parse(client.getResponseText());
                        Ti.API.info(" onerror" + JSON.stringify(e));
                        Ti.API.info("client.responseText onerror" + client.getResponseText());
                        Ti.API.info(response.message);
                        alert(response.message);

                    };
                    client.open('POST', 'http://staging.php-dev.in:8844/trainingapp/api/editCart');
                    client.setRequestHeader("access_token", Alloy.Globals.Maccess_token);
                    client.send(data);
                    $.dynamicListView.remove(viewBody);
                }
            });
            view.add(Name);
            view.add(image);
            view.add(Qty);
            view.add(textField);
            view.add(button);
            viewBody.add(view);
            $.dynamicListView.add(viewBody);

        } else {
            var viewBody = Titanium.UI.createView({
                backgroundColor: "#282727",
                backgroundColor: "#ededed",
            });
            Ti.API.info("inside open popover IOS" + JSON.stringify(e));
            //  $.dynamicListView.opacity="0.5";
            Ti.API.info();
            var view = Titanium.UI.createView({

                backgroundColor: "white",
                layout: "vertical"
            });
            var Name = Ti.UI.createLabel({
                top: "30px",
                font: {
                    fontSize: "50px",
                },
                color: "#2C2B2B",
                text: item.properties.current_product.product.name,
            });
            var image = Ti.UI.createImageView({
                image: item.properties.current_product.product.product_images,
                height: "600px",
                width: "600px",
            });
            var textField = Ti.UI.createTextField({
                value: item.properties.current_product.quantity,

                width: "336px",
                height: "129px",
                top: "66px",
                borderColor: "gray",
            });
            var Qty = Ti.UI.createLabel({
                top: "100px",

                font: {
                    fontSize: "50px",
                },
                color: "#2C2B2B",
                text: "Enter Qty",
            });
            var button = Titanium.UI.createButton({
                backgroundColor: "#db1514",
                fontSize: "75px",
                color: "#ffffff",

                top: "66px",
                title: "Submit",
                width: "595px",
                height: "142px"
            });
            button.addEventListener('click', function(m) {
                var TfRE = /^[1-8]$/;
                if (TfRE.test(textField.value) == false) {
                    textField.backgroundColor = "blue";
                } else {
                    textField.backgroundColor = "transprent";
                    Titanium.API.info("You clicked the button" + JSON.stringify(e));
                    var data = {
                        quantity: textField.value,
                        product_id: item.properties.current_product.product_id,
                    }
                    var client = Ti.Network.createHTTPClient();
                    client.onload = function(e) {
                        var response = JSON.parse(client.getResponseText());
                        Ti.API.info("json stringfy load" + JSON.stringify(e));
                        Ti.API.info("client.responseText onload" + client.getResponseText());
                        alert(response.message)
                    };
                    client.onerror = function(e) {
                        var response = JSON.parse(client.getResponseText());
                        Ti.API.info(" onerror" + JSON.stringify(e));
                        Ti.API.info("client.responseText onerror" + client.getResponseText());
                        Ti.API.info(response.message);
                        alert(response.message);

                    };
                    client.open('POST', 'http://staging.php-dev.in:8844/trainingapp/api/editCart');
                    client.setRequestHeader("access_token", Alloy.Globals.Maccess_token);
                    client.send(data);
                    $.dynamicListView.remove(viewBody);
                }
            });
            view.add(Name, image, Qty, textField, button);
            viewBody.add(view);
            $.dynamicListView.add(viewBody);
        }
        Ti.API.info("inside open popover" + e);





        //   var data = {
        //
        //       quantity: textField.value,
        //       product_id:args,
        //   }
        //   var client = Ti.Network.createHTTPClient();
        //   client.onload = function(e) {
        //       var response = JSON.parse(client.getResponseText());
        //       Ti.API.info("json stringfy load" + JSON.stringify(e));
        //       Ti.API.info("client.responseText onload" + client.getResponseText());
        //       Ti.API.info(response.message);
        //        alert(response.message);
        //   };
        //   client.onerror = function(e) {
        //       var response = JSON.parse(client.getResponseText());
        //       Ti.API.info(" onerror" + JSON.stringify(e));
        //       Ti.API.info("client.responseText onerror" + client.getResponseText());
        //       Ti.API.info(response.message);
        //        alert(response.message);
        //
        //   };
        //   client.open('POST', 'http://staging.php-dev.in:8844/trainingapp/api/editCart');
        //   client.setRequestHeader("access_token", Alloy.Globals.Maccess_token);
        //   client.send(data);
        //
        //   Ti.API.info('checkFlag = ' + checkFlag);
        //   if(checkFlag) {
        //     //  picker.hide();
        // Ti.API.info("inside if");
        //       checkFlag = false;
        //       Ti.API.info("you select"+Ti.UI.picker);
        //       $.dynamicListView.remove(pickerView);
        //   } else {
        //     Ti.API.info("inside else");
        //     checkFlag = true;
        //       Ti.API.info("you select"+JSON.stringify(picker));
        //   $.dynamicListView.add(pickerView);
        //     //  picker.show();
        //
        //   }
    } else if (e.bindId == "DeleteItem") {
        Ti.API.info("inside DeleteItem");
        var data = {

            product_id: item.properties.current_product.product_id,
        }
        var client = Ti.Network.createHTTPClient();
        client.onload = function(e) {
            var response = JSON.parse(client.getResponseText());
            Ti.API.info("json stringfy load" + JSON.stringify(e));
            Ti.API.info("client.responseText onload" + client.getResponseText());
            // Ti.API.info(e.section.getItemAt(e.itemIndex));
            // e.section.deleteItemsAt(e.itemIndex, 1);
            alert(response.message)
        };
        client.onerror = function(e) {
            var response = JSON.parse(client.getResponseText());
            Ti.API.info(" onerror" + JSON.stringify(e));
            Ti.API.info("client.responseText onerror" + client.getResponseText());
            Ti.API.info(response.message);
            alert(response.message);

        };
        client.open('POST', 'http://staging.php-dev.in:8844/trainingapp/api/deleteCart');
        client.setRequestHeader("access_token", Alloy.Globals.Maccess_token);
        client.send(data);


    }
}
