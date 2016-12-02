

$.header.__views.back.addEventListener('click', function(e) {
    $.ProductDetailwin.close();
});


// ################################# get argument from previous controllew ###################################
var args = arguments[0] || {};
Ti.API.info("Inside ProductDetail and id is" + args);
Ti.API.info(JSON.stringify(args));



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
  var items = [];


      var rating = JSON.parse(product).data.rating;
      Ti.API.info("rating for" + rating);


              items.push({
                  "name": {
                      text: JSON.parse(product).data.name
                  },
                  "catagory": {
                      text: "Catagory - Table",
                  },
                  "Description": {
                      text: JSON.parse(product).data.description,
                  },
                  "imagemain": {
                      image: JSON.parse(product).data.product_images[0].image,
                  },
                  "image1": {
                      image: JSON.parse(product).data.product_images[1].image,
                  },
                  "image2": {
                      image: JSON.parse(product).data.product_images[1].image,
                  },
                  "image3": {
                      image: JSON.parse(product).data.product_images[1].image,
                  },
                  "producer": {
                      text: JSON.parse(product).data.producer
                  },
                  "price": {
                      text: "Rs. "+JSON.parse(product).data.cost,
                      color: "red"
                  },

                  "rate1": {
                    color: rating>=1? "#ffba00": "#7f7f7f"


                  },
                  "rate2": {
                      color: rating>=2? "#ffba00": "#7f7f7f"

                  },
                  "rate3": {
                      color: rating>=3? "#ffba00": "#7f7f7f"

                  },
                  "rate4": {
                    color: rating>=4? "#ffba00": "#7f7f7f"

                  },
                  "rate5": {
                      color: rating>=5? "#ffba00": "#7f7f7f"

                  },
                  "buy": {
                      properties:JSON.parse(product)

                  },
                  "rate": {
                        properties:JSON.parse(product)

                  },

                  "template": "image_title",

                  "properties": {

                      Mid:JSON.parse(product).data.id,



                }
              });




      $.dynamicListView.sections[0].setItems(items, {
          animated: "false",

      });
    }

    function openBuy(e) {

      Ti.API.info("inside open popover"+args);
            Ti.API.info("inside open popover"+JSON.stringify(e));
      //  $.dynamicListView.opacity="0.5";
       var view = Titanium.UI.createView({
         top: "50",
       right: "100",
       bottom: "50",
       left: "100",
       backgroundColor: "white",
       layout:"vertical"
});
var Name = Ti.UI.createLabel({
  top: "100px",

  font: {
    fontSize: "50px",
  },
  color:"#2C2B2B",
  text:e.source.properties.data.name,
});
var image = Ti.UI.createImageView({
  image:e.source.properties.data.product_images[0].image,
});
var textField = Ti.UI.createTextField({
  width:"336px",
   height:"129px",
    top:"66px",
  borderColor: "gray",
});
var Qty = Ti.UI.createLabel({
  top: "100px",

  font: {
    fontSize: "50px",
  },
  color:"#2C2B2B",
  text:"Enter Qty",
});
var button = Titanium.UI.createButton({
  top: "66px",
  title: "Submit",
  width: "595px",
  height: "142px"
});
button.addEventListener('click',function(e)
{
   Titanium.API.info("You clicked the button");
   $.dynamicListView.remove(view);
});
 $.dynamicListView.add(view);
 view.add(Name,image,Qty,textField,button);
        // var popover = Alloy.createController('popover',e).getView();
        // popover.open();
        // $.dynamicListView.opacity="1";


}
