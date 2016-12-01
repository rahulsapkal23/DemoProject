

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
                      image: "http://staging.php-dev.in:8844/trainingapp/uploads/prod_img/thumb/medium/da6f8d00dd9f009a543e06312.jpeg",
                  },
                  "image1": {
                      image: "http://staging.php-dev.in:8844/trainingapp/uploads/prod_img/thumb/medium/da6f8d00dd9f009a543e06312.jpeg",
                  },
                  "image2": {
                      image: "http://staging.php-dev.in:8844/trainingapp/uploads/prod_img/thumb/medium/da6f8d00dd9f009a543e06312.jpeg",
                  },
                  "image3": {
                      image: "http://staging.php-dev.in:8844/trainingapp/uploads/prod_img/thumb/medium/da6f8d00dd9f009a543e06312.jpeg",
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

                  "template": "image_title",
                  "properties": {

                      Mid:JSON.parse(product).data.id,



                }
              });




      $.dynamicListView.sections[0].setItems(items, {
          animated: "false",

      });
    }

    function openPopover() {
    if (Ti.Platform.osname === 'ipad') {
      Ti.API.info("inside open popover");
        var popover = Alloy.createController('popover').getView();
        popover.show({view:$.button1});

    } else {
        alert('Popover only supported on iPad');
    }
}
