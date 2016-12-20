// ################################# get argument from previous controllew ###################################
var access_token = arguments[0] || {};
Ti.API.info("Inside Homescreen and access_token is" + access_token);
Ti.API.info(JSON.stringify(access_token));





$.mycart.addEventListener('click', function(e) {
    Ti.API.info("inside mycart function");
    if (Alloy.Globals.MycartFlag == "true") {
        var MyCart = Alloy.createController('MyCart').getView();
        MyCart.open();

    } else {
        alert("My Cart is Empty");
    }
});


// ######################################### Setting Header #########################################
$.header.__views.tital.text = "Home Screen";
$.header.__views.back.text = "\uf0c9";
$.header.__views.back.addEventListener('click', function(e) {
    // $.HomeScreenwin.close();

    SlideToMyProfile(e);
});
$.header.__views.search.text = "\uf07a";
$.header.__views.search.addEventListener('click', function(e) {

    if (Alloy.Globals.MycartFlag == "true") {
        var MyCart = Alloy.createController('MyCart').getView();
        MyCart.open();

    } else {
        alert("My Cart is Empty");
    }

});

// $.mycartItem.text = Alloy.Globals.mycartItem;
//
// if (Alloy.Globals.MycartFlag == "true") {
//     $.mycartItem.text = Alloy.Globals.mycartItem;
//
// }


// ######################################### addEventListener #########################################

$.list_view1_table.addEventListener('click', ListProduct);
$.list_view1_sofa.addEventListener('click', ListProduct);
$.list_view1_chair.addEventListener('click', ListProduct);
$.list_view1_cupbord.addEventListener('click', ListProduct);




// ######################################### My Profile Get Details #########################################



function SlideToMyProfile(e) {

    Ti.API.info("inside slider");
    // If the slidding menu isn't opened



    if (e.source.toggle == true) {
        Ti.API.info("inside if ");
        $.list_view1_table.addEventListener('click', ListProduct);
        $.list_view1_chair.addEventListener('click', ListProduct);
        $.view1.animate({
            left: 0,
            height: "100%",
            duration: 400,
            curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
        $.view2.animate({
            left: "-75%",

            duration: 400,
            curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
        e.source.toggle = false;
    }

    // If the slidding menu is already opened then close the slidding view
    else {
        $.list_view1_table.removeEventListener('click', ListProduct);
        $.list_view1_chair.removeEventListener('click', ListProduct);
        $.view1.animate({
            left: "75%",
            width: "100%",
            height: "90%",
            duration: 400,
            curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
        $.view2.animate({
            left: "0",
            duration: 400,
            curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
        e.source.toggle = true;

    }
}



// ######################################### function of Listing Product #########################################
function ListProduct(e) {
    Ti.API.info("click on which block" + e);
    Ti.API.info("click on next block" + JSON.stringify(e));
    var ListProduct = Alloy.createController('ListProduct', e.source.productcategoryid, JSON.stringify(access_token)).getView();
    ListProduct.open();
}


// ################################# making  HTTP GET request for API ###################################
var client = Ti.Network.createHTTPClient({
    onload: function(e) {
        var response = JSON.parse(client.getResponseText());
        Ti.API.info("json stringfy load" + JSON.stringify(e));
        Ti.API.info("client.responseTextinsudefun onload" + client.getResponseText());
        // function called fir list view according to Product id
        HomeScreenDetails(client.getResponseText());
    },
    // function called when an error occurs, including a timeout
    onerror: function(e) {
        var response = JSON.parse(client.getResponseText());
        Ti.API.info(" onerror" + JSON.stringify(e));
        Ti.API.info("client.responseText onerror" + client.getResponseText());
        Ti.API.info(response.message);
        // alert(response.message);
    },
    //  timeout : 5000  // in milliseconds
});
// Prepare the connection.

client.open("GET", "http://staging.php-dev.in:8844/trainingapp/api/users/getUserData");
// Send the request.
client.setRequestHeader("access_token", access_token);
//xhr.setRequestHeader("cache-control", "no-cache");
//xhr.setRequestHeader("postman-token", "1b1fe29f-2ff0-324e-aff5-547aed18e442");
client.send();



// ################################# making  HTTP GET request for API ###################################
var client1 = Ti.Network.createHTTPClient({
    onload: function(e) {
        var response1 = JSON.parse(client1.getResponseText());
        Ti.API.info("json stringfy Mycart" + JSON.stringify(e));
        Ti.API.info("client1.responseText MyCart" + client1.getResponseText());
        // function called fir list view according to Product id
        ViewofMycart(client1.getResponseText())
    },
    // function called when an error occurs, including a timeout
    onerror: function(e) {
        var response1 = JSON.parse(client1.getResponseText());
        Ti.API.info(" onerror" + JSON.stringify(e));
        Ti.API.info("client.responseText onerror" + client1.getResponseText());
        Ti.API.info(response1.message);
        alert(response1.message);
    },
    //  timeout : 5000  // in milliseconds
});
// Prepare the connection.

client1.open("GET", "http://staging.php-dev.in:8844/trainingapp/api/cart");
client1.setRequestHeader("access_token", access_token);

// Send the request.
client1.send();

function ViewofMycart(cardData) {
    Ti.API.info("inside function ViewofMycart" + cardData);
    if (JSON.parse(cardData).data == null) {
        $.mycartItem.text = "0";
        Alloy.Globals.MycartFlag = "false";
    } else {
        $.mycartItem.text = JSON.parse(cardData).data.length;
        Alloy.Globals.MycartFlag = "true";

    }

}



function HomeScreenDetails(LoginDetails) {


    Ti.API.info("sfdds5523" + LoginDetails);
    Ti.API.info("565545" + JSON.parse(LoginDetails).data.product_categories[0].icon_image);
    Ti.API.info(JSON.stringify($.view11.backgroundColor));
    //$.view11.setBackgroundImage(LoginDetails.data.product_categories[1].icon_image);
    $.view11.image = (JSON.parse(LoginDetails)).data.product_categories[0].icon_image;
    $.view21.image = (JSON.parse(LoginDetails)).data.product_categories[1].icon_image;
    $.view31.image = JSON.parse(LoginDetails).data.product_categories[2].icon_image;
    $.view41.image = JSON.parse(LoginDetails).data.product_categories[3].icon_image;
    $.name.text = JSON.parse(LoginDetails).data.user_data.username;
    $.email_id.text = JSON.parse(LoginDetails).data.user_data.email;

}

function GoToMyAccount(e) {
    Ti.API.info("Inside My Account");
    var MyAccount = Alloy.createController('MyAccount').getView();
    MyAccount.open();
}

function GoToMyOrder(e) {
    var MyOrder = Alloy.createController('MyOrder').getView();
    MyOrder.open();
}

function Store_Locator(e) {
    var Store_Locator = Alloy.createController('Store_Locator').getView();
    Store_Locator.open();
}
// export.SlideToMyProfile = SlideToMyProfile;
