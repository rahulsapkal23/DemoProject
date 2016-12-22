// ######################################### Setting Header #########################################
$.header.__views.back.addEventListener('click', function(e) {
    $.ProductDetailwin.close();
});

$.header.__views.search.addEventListener('click', function(e) {
    if (Alloy.Globals.cartFlag == true) {
        var MyCart = Alloy.createController('MyCart').getView();
        MyCart.open();

    } else {
        alert("My Cart is Empty");
    }
});

// ################################# get argument from previous controllew ###################################
var args = arguments[0] || {};
var access_token = arguments[1] || {};
Ti.API.info("Inside ProductDetail and id is" + args + JSON.stringify(access_token));
Ti.API.info(JSON.stringify(args));

Ti.API.info("Global variable access_token" + Alloy.Globals.Maccess_token);

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




function ViewofProductDetails(product) {
    $.header.__views.tital.text = JSON.parse(product).data.name;
    Ti.API.info("in side ViewofProductDetails");
    Ti.API.info(product);
    Ti.API.info("hero" + JSON.parse(product).data.length);



    var rating = JSON.parse(product).data.rating;
    var imagelength = JSON.parse(product).data.product_images.length;
    Ti.API.info("rating for" + rating + imagelength);

    $.name.text = JSON.parse(product).data.name;
    switch (JSON.parse(product).data.product_category_id) {
        case 1:
            $.catagory.text = "Catagory - Table";
            break;
        case 2:
            $.catagory.text = "Catagory - Chair";
            break;
        case 3:
            $.catagory.text = "Catagory - Sofa";
            break;
        case 4:
            $.catagory.text = "Catagory - Bed";
            break;

        default:

    }




    $.Description.text = JSON.parse(product).data.description;
    $.imagemain.image = JSON.parse(product).data.product_images[0].image;
    $.image1.visible = imagelength >= 1 ? true : false,
        $.image1.image = imagelength >= 1 ? JSON.parse(product).data.product_images[0].image : JSON.parse(product).data.product_images[0].image;
    $.image2.visible = imagelength >= 2 ? true : false;
    $.image2.image = imagelength >= 2 ? JSON.parse(product).data.product_images[1].image : JSON.parse(product).data.product_images[0].image;
    $.image3.visible = imagelength >= 3 ? true : false,
        $.image3.image = imagelength >= 3 ? JSON.parse(product).data.product_images[2].image : JSON.parse(product).data.product_images[0].image;
    $.producer.text = JSON.parse(product).data.producer;
    $.price.text = "Rs. " + JSON.parse(product).data.cost;
    $.price.color = "red";
    $.rate1.color = rating >= 1 ? "#ffba00" : "#7f7f7f";
    $.rate2.color = rating >= 2 ? "#ffba00" : "#7f7f7f";
    $.rate3.color = rating >= 3 ? "#ffba00" : "#7f7f7f";
    $.rate4.color = rating >= 4 ? "#ffba00" : "#7f7f7f";
    $.rate5.color = rating >= 5 ? "#ffba00" : "#7f7f7f";
    $.buy.properties = JSON.parse(product);
    $.rate.properties = JSON.parse(product);

}

// $.dynamicListView.addEventListener('itemclick',function(e){
//   Ti.API.info("in item click"+JSON.stringify(e));
//   if(e.bindId=="buy")
//   {
//     openBuy();
//   }
//   else if (e.bindId=="rate") {
//     openRate();
//   }
// });

// $.button1.addEventListener('click',function (e) {

function openBuy(e) {
    if (Ti.Platform.osname == "android" || Ti.Platform.osname == "Android") {

        var viewBody = Titanium.UI.createView({
            backgroundColor: "#ededed",
        });
        var view = Titanium.UI.createView({
            top: "10%",
            right: "5%",
            bottom: "10%",
            left: "5%",
            backgroundColor: "white",
            layout: "vertical"
        });
        var Name = Ti.UI.createLabel({
            top: "100px",
            font: {
                fontSize: "50px",
            },
            color: "#2C2B2B",
            text: e.source.properties.data.name,
        });
        var image = Ti.UI.createImageView({
            image: e.source.properties.data.product_images[0].image,

            borderColor: "black",

        });
        var textField = Ti.UI.createTextField({
            id: "Tf1",
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
                Titanium.API.info("You clicked the button");
                textField.backgroundColor = "transprent";
                var data = {

                    quantity: textField.value,
                    product_id: args,
                }
                var client = Ti.Network.createHTTPClient();
                client.onload = function(e) {
                    var response = JSON.parse(client.getResponseText());
                    Ti.API.info("json stringfy load" + JSON.stringify(e));
                    Ti.API.info("client.responseText onload" + client.getResponseText());
                    Ti.API.info(response.message);
                    Alloy.Globals.cartFlag = true;
                    Alloy.Globals.mycartItem++;
                    Ti.API.info("  Alloy.Globals.mycartItem" + Alloy.Globals.mycartItem);
                    alert(response.message);
                };
                client.onerror = function(e) {
                    var response = JSON.parse(client.getResponseText());
                    Ti.API.info(" onerror" + JSON.stringify(e));
                    Ti.API.info("client.responseText onerror" + client.getResponseText());
                    Ti.API.info(response.message);
                    alert(response.message);

                };
                client.open('POST', 'http://staging.php-dev.in:8844/trainingapp/api/addToCart');
                client.setRequestHeader("access_token", Alloy.Globals.Maccess_token);
                client.send(data);
                $.ProductDetailwin.remove(viewBody);

            }

        });
        view.add(Name);
        view.add(image);
        view.add(Qty);
        view.add(textField);
        view.add(button);
        viewBody.add(view);
        $.ProductDetailwin.add(viewBody);

    } else {
        var viewBody = Titanium.UI.createView({
            backgroundColor: "#282727",
            backgroundColor: "#ededed",
        });
        Ti.API.info("inside open popover IOS" + JSON.stringify(e));
        //  $.dynamicListView.opacity="0.5";
        Ti.API.info();
        var view = Titanium.UI.createView({
            top: "10%",
            right: "5%",
            bottom: "10%",
            left: "5%",
            backgroundColor: "white",
            layout: "vertical"
        });
        var Name = Ti.UI.createLabel({
            top: "100px",
            font: {
                fontSize: "50px",
            },
            color: "#2C2B2B",
            text: e.source.properties.data.name,
        });
        var image = Ti.UI.createImageView({
            image: e.source.properties.data.product_images[0].image,
        });
        var textField = Ti.UI.createTextField({
            id: "Tf1",
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
                    product_id: args,
                }
                var client = Ti.Network.createHTTPClient();
                client.onload = function(e) {
                    var response = JSON.parse(client.getResponseText());
                    Ti.API.info("json stringfy load" + JSON.stringify(e));
                    Ti.API.info("client.responseText onload" + client.getResponseText());
                    alert(response.message);
                    Alloy.Globals.cartFlag = true;

                };
                client.onerror = function(e) {
                    var response = JSON.parse(client.getResponseText());
                    Ti.API.info(" onerror" + JSON.stringify(e));
                    Ti.API.info("client.responseText onerror" + client.getResponseText());
                    Ti.API.info(response.message);
                    alert(response.message);

                };
                client.open('POST', 'http://staging.php-dev.in:8844/trainingapp/api/addToCart');
                client.setRequestHeader("access_token", Alloy.Globals.Maccess_token);
                client.send(data);
                $.ProductDetailwin.remove(viewBody);
            }
        });
        view.add(Name, image, Qty, textField, button);
        viewBody.add(view);
        $.ProductDetailwin.add(viewBody);
    }
    Ti.API.info("inside open popover" + args);
};

// $.rate.addEventListener('click',function(e)

$.share.addEventListener('click', Share);

function Share() {
    var intent = Ti.Android.createIntent({
        action: Ti.Android.ACTION_SEND,
        type: "*/*"
    });

    intent.putExtra(Ti.Android.EXTRA_TEXT, 'asdasd');
    intent.addCategory(Ti.Android.CATEGORY_DEFAULT);
    $.ProductDetailwin.activity.startActivity(intent);
}

function openRate(e) {
    Ti.API.info("njkvdxhkjvndxk" + JSON.stringify(e));

    if (Ti.Platform.osname == "android" || Ti.Platform.osname == "Android") {

        var viewBody = Titanium.UI.createView({
            backgroundColor: "#ededed",
        });
        var view = Titanium.UI.createView({
            top: "10%",
            right: "5%",
            bottom: "10%",
            left: "5%",
            backgroundColor: "white",
            layout: "vertical"
        });
        var Name = Ti.UI.createLabel({
            top: "100px",
            font: {
                fontSize: "50px",
            },
            color: "#2C2B2B",
            text: e.source.properties.data.name,
        });
        var image = Ti.UI.createImageView({
            image: e.source.properties.data.product_images[0].image,
            top: "100px",
            borderColor: "black",

        });
        var viewstar = Titanium.UI.createView({
            layout: "horizontal",
            height: "250px",
            left: "200px",
            top: "100px",

        });
        for (var i = 0; i < 5; i++) {
            var star = Ti.UI.createLabel({
                font: {
                    fontFamily: 'FontAwesome',
                    fontSize: "132px",


                },
                text: "\uf005",
                color: "#7f7f7f",


            });
            viewstar.add(star);


        }
        viewstar.addEventListener('click', function(e) {
            Ti.API.info("inside star listener" + JSON.stringify(e));
            if (e.source.color == "#7f7f7f") {
                Ti.API.info("inside if");
                e.source.color = "#ffba00";
            } else if (e.source.color == "#ffba00") {
                Ti.API.info("inside else");
                e.source.color = "#7f7f7f";
            }

        })
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
            Titanium.API.info("You clicked the button");
            var data = {
                product_id: args,
            }
            var client = Ti.Network.createHTTPClient();
            client.onload = function(e) {
                var response = JSON.parse(client.getResponseText());
                Ti.API.info("json stringfy load" + JSON.stringify(e));
                Ti.API.info("client.responseText onload" + client.getResponseText());
                alert(response.message);
            };
            client.onerror = function(e) {
                var response = JSON.parse(client.getResponseText());
                Ti.API.info(" onerror" + JSON.stringify(e));
                Ti.API.info("client.responseText onerror" + client.getResponseText());
                Ti.API.info(response.message);
                alert(response.message);

            };
            client.open('POST', 'http://staging.php-dev.in:8844/trainingapp/api/products/setRating');
            client.send(data);
            $.ProductDetailwin.remove(viewBody);
        });
        view.add(Name);
        view.add(image);
        view.add(viewstar);

        view.add(button);
        viewBody.add(view);
        $.ProductDetailwin.add(viewBody);

    } else {
        var viewBody = Titanium.UI.createView({
            backgroundColor: "#282727",
            backgroundColor: "#ededed",
        });
        Ti.API.info("inside open Ratting IOS" + JSON.stringify(e));
        //  $.dynamicListView.opacity="0.5";
        Ti.API.info();
        var view = Titanium.UI.createView({
            top: "10%",
            right: "5%",
            bottom: "10%",
            left: "5%",
            backgroundColor: "white",
            layout: "vertical"
        });
        var Name = Ti.UI.createLabel({
            top: "100px",
            font: {
                fontSize: "50px",
            },
            color: "#2C2B2B",
            text: e.source.properties.data.name,
        });
        var image = Ti.UI.createImageView({
            top: "100px",
            image: e.source.properties.data.product_images[0].image,
        });


        var viewstar = Titanium.UI.createView({
            layout: "horizontal",
            height: "250px",
            left: "200px",
            top: "100px",
        });
        for (var i = 0; i < 5; i++) {
            var star = Ti.UI.createLabel({
                font: {
                    fontFamily: 'FontAwesome',
                    fontSize: "132px",


                },
                text: "\uf005",
                color: "#7f7f7f",


            });
            viewstar.add(star);


        }
        viewstar.addEventListener('click', function(e) {
            Ti.API.info("inside star listener" + JSON.stringify(e));
            if (e.source.color == "#7f7f7f") {
                Ti.API.info("inside if");
                e.source.color = "#ffba00";
            } else if (e.source.color == "#ffba00") {
                Ti.API.info("inside else");
                e.source.color = "#7f7f7f";
            }

        })
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
            Titanium.API.info("You clicked the button" + JSON.stringify(e));
            var data = {

                product_id: args,
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

            client.open('POST', 'http://staging.php-dev.in:8844/trainingapp/api/products/setRating');
            client.send(data);
            $.ProductDetailwin.remove(viewBody);
        });

        view.add(Name, image, viewstar);
        view.add(button);
        viewBody.add(view);
        $.ProductDetailwin.add(viewBody);
    }
    Ti.API.info("inside open popover" + args);
};

function goToMyCart() {
    Ti.API.info("inside Go to my cart");



};
