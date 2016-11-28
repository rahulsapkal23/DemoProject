$.header.__views.tital.text = "List Product";
$.header.__views.back.addEventListener('click', function(e) {
    $.win.close();
});
var args =arguments[0] || {};
Ti.API.info("Inside Listview and id is"+args);
  Ti.API.info(JSON.stringify(args));
  //  Ti.API.info(JSON.parse(args));
  Ti.API.info(args.productcategoryid);

var url = "http://staging.php-dev.in:8844/trainingapp/api/products/getList";

var client = Ti.Network.createHTTPClient({

    // function called when the response data is available
    onload : function(e) {
      var response = JSON.parse(client.getResponseText());
      Ti.API.info("json stringfy load" + JSON.stringify(e));
      Ti.API.info("client.responseText onload" + client.getResponseText());
      Ti.API.info(response.message);
      alert(response.message);
    },
    // function called when an error occurs, including a timeout
    onerror : function(e) {
        // Ti.API.debug(e.error);
        // alert('error');
        var response = JSON.parse(client.getResponseText());
        Ti.API.info(" onerror" + JSON.stringify(e));
        Ti.API.info("client.responseText onerror" + client.getResponseText());
        Ti.API.info(response.message);
        alert(response.message);
    },
  //  timeout : 5000  // in milliseconds
});
// Prepare the connection.
//client.open("GET", url,product_category_id);
client.open("GET", "http://staging.php-dev.in:8844/trainingapp/api/products/getList?product_category_id=1");
// Send the request.
client.send();

var items = [{
    "label": {
        text: "born on 14 March 1965 is an Indian film actor, director and producer. Through his career in "
    },
    "image": {
        image: "http://www.showbizbites.com/wp-content/uploads/2013/07/Aamir-Khan-Showbiz-Bites.jpg",
        url: "https://en.wikipedia.org/wiki/Aamir_Khan"
    },

    "template": "image_title"
}, {
    "label": {
        text: "born 28 September 1982 is an Indian actor and producer"
    },
    "image": {
        image: "http://customerkart.com/wp-content/uploads/2016/01/ranbir-kapoor-wallpapers-300x215.jpg",

        url: "https://en.wikipedia.org/wiki/Ranbir_Kapoor"
    },

    "template": "image_title"
}, {
    "label": {
        text: "born on 14 March 1965 is an Indian film actor, director and producer. Through his career in "
    },
    "image": {
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Salmanrampwalk.png/220px-Salmanrampwalk.png",
        url: "https://en.wikipedia.org/wiki/Salman_Khan"
    },

    "template": "image_title"

}];
$.dynamicListView.sections[0].setItems(items, {
    animated: "false"
});



//$.aamir.image = data.image[0];



function WebView(e) {

}




$.win.open();
