// ######################################### Setting Header #########################################
$.header.__views.tital.text = "List Product";
$.header.__views.back.addEventListener('click', function(e) {
    $.ListProductwin.close();
});

// ################################# get argument from previous controllew ###################################
var args =arguments[0] || {};
Ti.API.info("Inside Listview and id is"+args);
  Ti.API.info(JSON.stringify(args));

// ################################# making  HTTP GET request for API ###################################
var client = Ti.Network.createHTTPClient({
      onload : function(e) {
      var response = JSON.parse(client.getResponseText());
      Ti.API.info("json stringfy load" + JSON.stringify(e));
      Ti.API.info("client.responseText onload" + client.getResponseText());
      // function called fir list view according to Product id
      ListViewofProduct(client.getResponseText())
    },
    // function called when an error occurs, including a timeout
    onerror : function(e) {
        var response = JSON.parse(client.getResponseText());
        Ti.API.info(" onerror" + JSON.stringify(e));
        Ti.API.info("client.responseText onerror" + client.getResponseText());
        Ti.API.info(response.message);
        alert(response.message);
    },
  //  timeout : 5000  // in milliseconds
  });
// Prepare the connection.

client.open("GET", "http://staging.php-dev.in:8844/trainingapp/api/products/getList?product_category_id="+args);
// Send the request.
client.send();

function ListViewofProduct(Productdata) {
  Ti.API.info(Productdata);
  Ti.API.info("imageraj"+JSON.parse(Productdata).data.length);

  var items=[];
      for(var i=0;i<JSON.parse(Productdata).data.length;i++)
      {
          items.push({"label":
                        {
                              text: JSON.parse(Productdata).data[i].name
                        },
                    "image":
                    {
                      image: JSON.parse(Productdata).data[i].product_images,
                    },
                    "template": "image_title"}) ;
      }
 $.dynamicListView.sections[0].setItems(items, {
     animated: "false"
 });
 }

function WebView(e) {

}

$.ListProductwin.open();
