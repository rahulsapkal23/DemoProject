// ######################################### Setting Header #########################################
$.header.__views.tital.text = "Home Screen";
$.header.__views.back.text="\uf0c9";
$.header.__views.back.addEventListener('click', function(e) {
    // $.HomeScreenwin.close();

    SlideToMyProfile(e);
});

function SlideToMyProfile(e)
{
        Ti.API.info("inside slider");
         // If the slidding menu isn't opened
        if(e.source.toggle == true)
        {
            Ti.API.info("inside if ");
            $.view1.animate
            ({
                    left:0,
                      height:"100%",
                    duration:400,
                    curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
            });
            $.view2.animate
            ({
                    left:"-75%",

                    duration:400,
                    curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
            });
            e.source.toggle = false ;
      }

   // If the slidding menu is already opened then close the slidding view

      else
      {
            $.view1.animate
            ({
                    left:"75%",
                    width:"100%",
                    height:"90%",
                    duration:400,
                    curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
            });
            $.view2.animate
            ({
                    left:"0",
                    duration:400,
                    curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
            });
            e.source.toggle  = true;

      }
}
$.view1.addEventListener('swipe',function(e){

  // $.HomeScreenwin.animate({
  //     left:"500",
  //     duration:400,
  //     curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
  // });
  // $.view2.animate({
  //     left:"-200",
  //     duration:400,
  //     curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
  // });
});
// $.HomeScreenwin.orientationModes = [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT]
// ################################# get argument from previous controllew ###################################
var access_token = arguments[0] || {};
Ti.API.info("Inside Listview and id is" + access_token);
Ti.API.info(JSON.stringify(access_token));

// ######################################### function of Listing Product #########################################
function ListProduct(e) {
    Ti.API.info("click on which block" + e);
    Ti.API.info("click on next block" + JSON.stringify(e));
    var ListProduct = Alloy.createController('ListProduct', e.source.productcategoryid).getView();
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
        alert(response.message);
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

function HomeScreenDetails(LoginDetails) {


    Ti.API.info("sfdds5523" + LoginDetails);
    Ti.API.info("565545" + JSON.parse(LoginDetails).data.product_categories[0].icon_image);
    Ti.API.info(JSON.stringify($.view11.backgroundColor));
    //$.view11.setBackgroundImage(LoginDetails.data.product_categories[1].icon_image);
    $.view11.image = (JSON.parse(LoginDetails)).data.product_categories[0].icon_image;
    $.view21.image = (JSON.parse(LoginDetails)).data.product_categories[1].icon_image;
    $.view31.image = JSON.parse(LoginDetails).data.product_categories[2].icon_image;
    $.view41.image = JSON.parse(LoginDetails).data.product_categories[3].icon_image;


}



//
//  $.HomeScreenwin.addEventListener('touchstart', function(e){
//     // Get starting horizontal position
//     e.source.axis = parseInt(e.x);
// });
//
//
// $.HomeScreenwin.addEventListener('touchmove', function(e){
//     // Subtracting current position to starting horizontal position
//     var coordinates = parseInt(e.globalPoint.x) - e.source.axis;
//     // Detecting movement after a 20px shift
//     if(coordinates > 20 || coordinates < -20){
//         e.source.moving = true;
//     }
//     // Locks the window so it doesn't move further than allowed
//     if(e.source.moving == true && coordinates <= 550 && coordinates >= 0){
//         // This will smooth the animation and make it less jumpy
//         $.HomeScreenwin.animate({
//             left:coordinates,
//             duration:20
//         });
//         // Defining coordinates as the final left position
//         $.HomeScreenwin.left = coordinates;
//     }
// });



// $.HomeScreenwin.addEventListener('touchend', function(e){
//     // No longer moving the window
//     e.source.moving = false;
//     if($.HomeScreenwin.left >= 75 && $.HomeScreenwin.left < 550){
//         // Repositioning the window to the right
//         $.HomeScreenwin.animate({
//             left:550,
//             duration:300
//         });
//         $.header.__views.back.toggle = true;
//     }else{
//         // Repositioning the window to the left
//         $.HomeScreenwin.animate({
//             left:0,
//             duration:300
//         });
//         $.header.__views.back.toggle = false;
//     }
// });


var items = [];
items.push({
  "MyCart":{text:"MyCart"},
"Tables":{text:"Tables"},
"Sofas":{text:"Sofas"},
"Chairs":{text:"Chairs"},
"Cupbords":{text:"Cupbords"},
"MyAccount":{text:"MyAccount"},
"Store":{text:"Store"},
"MyOrders":{text:"MyOrders"},
"Logout":{text:"Logout"},
  "template": "Label",








});


        $.MyprofileListView.sections[0].setItems(items, {
            animated: "false",

        });
