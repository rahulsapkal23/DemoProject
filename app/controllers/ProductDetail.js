

$.header.__views.back.addEventListener('click', function(e) {
    $.ProductDetailwin.close();
});


// ################################# get argument from previous controllew ###################################
var args = arguments[0] || {};
var access_token = arguments[1] || {};
Ti.API.info("Inside ProductDetail and id is" + args+JSON.stringify(access_token));
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
      var imagelength = JSON.parse(product).data.product_images.length;
      Ti.API.info("rating for" + rating+imagelength);


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
                  visible: imagelength>=1? true: false,
                  image:imagelength>=1? JSON.parse(product).data.product_images[0].image: JSON.parse(product).data.product_images[0].image,


                  },
                  "image2": {
                       visible: imagelength>=2? true: false,
                      image:imagelength>=2? JSON.parse(product).data.product_images[1].image: JSON.parse(product).data.product_images[0].image,
                  },
                  "image3": {
                       visible: imagelength>=3? true: false,
                      image:imagelength>=3? JSON.parse(product).data.product_images[2].image: JSON.parse(product).data.product_images[0].image,
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

    $.button1.addEventListener('click',function (e) {

if(Ti.Platform.osname=="android" || Ti.Platform.osname=="Android")
{

var viewBody = Titanium.UI.createView({
backgroundColor: "#ededed",
});
var view = Titanium.UI.createView({
top: "10%",
right: "5%",
bottom: "10%",
left: "5%",
backgroundColor: "white",
  layout:"vertical"
});
var Name = Ti.UI.createLabel({
top: "100px",
font: {
fontSize: "50px",
},
color:"#2C2B2B",
 text:e.section.items[0].rate.properties.data.name,
});
var image = Ti.UI.createImageView({
 image:e.section.items[0].rate.properties.data.product_images[0].image,

 borderColor:"black",

});
var textField = Ti.UI.createTextField({
  id:"Tf1",
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
var data = {
    Quentity: $.Tf1.value,
    product_id:e.section.items[0].rate.properties.data.id,
}
var client = Ti.Network.createHTTPClient();
client.onload = function(e) {
    var response = JSON.parse(client.getResponseText());
    Ti.API.info("json stringfy load" + JSON.stringify(e));
    Ti.API.info("client.responseText onload" + client.getResponseText());

};
client.onerror = function(e) {
    var response = JSON.parse(client.getResponseText());
    Ti.API.info(" onerror" + JSON.stringify(e));
    Ti.API.info("client.responseText onerror" + client.getResponseText());
    Ti.API.info(response.message);
    // alert(response.message);

};
client.open('POST', 'http://staging.php-dev.in:8844/trainingapp/api/addToCart');
client.setRequestHeader("access_token", access_token);
client.send(data);
 $.ProductDetailwin.remove(viewBody);
});
view.add(Name);
view.add(image);
view.add(Qty);
view.add(textField);
view.add(button);
viewBody.add(view);
$.ProductDetailwin.add(viewBody);

}
else {
  var viewBody = Titanium.UI.createView({
  backgroundColor: "#282727",
  backgroundColor: "#ededed",
  });
  Ti.API.info("inside open popover IOS"+JSON.stringify(e));
  //  $.dynamicListView.opacity="0.5";
  Ti.API.info();
  var view = Titanium.UI.createView({
  top: "10%",
  right: "5%",
  bottom: "10%",
  left: "5%",
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
    id:"Tf1",
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
  button.addEventListener('click',function(m)
  {
  Titanium.API.info("You clicked the button"+JSON.stringify(e));
  var data = {
      quantity: textField.value,
      product_id:args,
  }
  var client = Ti.Network.createHTTPClient();
  client.onload = function(e) {
      var response = JSON.parse(client.getResponseText());
      Ti.API.info("json stringfy load" + JSON.stringify(e));
      Ti.API.info("client.responseText onload" + client.getResponseText());
      // alert(response.message)
  };
  client.onerror = function(e) {
      var response = JSON.parse(client.getResponseText());
      Ti.API.info(" onerror" + JSON.stringify(e));
      Ti.API.info("client.responseText onerror" + client.getResponseText());
      Ti.API.info(response.message);
      // alert(response.message);

  };
  client.open('POST', 'http://staging.php-dev.in:8844/trainingapp/api/addToCart');
  client.setRequestHeader("access_token", access_token);
  client.send(data);
  $.ProductDetailwin.remove(viewBody);
  });
  view.add(Name,image,Qty,textField,button);
  viewBody.add(view);
  $.ProductDetailwin.add(viewBody);
}
      Ti.API.info("inside open popover"+args);
  });

$.rate.addEventListener('click',function(e)
{


  if(Ti.Platform.osname=="android" || Ti.Platform.osname=="Android")
  {

  var viewBody = Titanium.UI.createView({
  backgroundColor: "#ededed",
  });
  var view = Titanium.UI.createView({
  top: "10%",
  right: "5%",
  bottom: "10%",
  left: "5%",
  backgroundColor: "white",
    layout:"vertical"
  });
  var Name = Ti.UI.createLabel({
  top: "100px",
  font: {
  fontSize: "50px",
  },
  color:"#2C2B2B",
   text:e.section.items[0].rate.properties.data.name,
  });
  var image = Ti.UI.createImageView({
   image:e.section.items[0].rate.properties.data.product_images[0].image,

   borderColor:"black",

  });
for(var i=0;i<5;i++)
{}
  var button = Titanium.UI.createButton({
  top: "66px",
  title: "Rate Now",
  width: "595px",
  height: "142px"
  });
  button.addEventListener('click',function(e)
  {
  Titanium.API.info("You clicked the button");
  var data = {
      product_id:e.section.items[0].rate.properties.data.id,
  }
  var client = Ti.Network.createHTTPClient();
  client.onload = function(e) {
      var response = JSON.parse(client.getResponseText());
      Ti.API.info("json stringfy load" + JSON.stringify(e));
      Ti.API.info("client.responseText onload" + client.getResponseText());

  };
  client.onerror = function(e) {
      var response = JSON.parse(client.getResponseText());
      Ti.API.info(" onerror" + JSON.stringify(e));
      Ti.API.info("client.responseText onerror" + client.getResponseText());
      Ti.API.info(response.message);
      // alert(response.message);

  };
  client.open('POST', 'http://staging.php-dev.in:8844/trainingapp/api/products/setRating');
  client.send(data);
   $.ProductDetailwin.remove(viewBody);
  });
  view.add(Name);
  view.add(image);
  view.add(Qty);
  view.add(textField);
  view.add(button);
  viewBody.add(view);
  $.ProductDetailwin.add(viewBody);

  }
  else {
    var viewBody = Titanium.UI.createView({
    backgroundColor: "#282727",
    backgroundColor: "#ededed",
    });
    Ti.API.info("inside open popover IOS"+JSON.stringify(e));
    //  $.dynamicListView.opacity="0.5";
    Ti.API.info();
    var view = Titanium.UI.createView({
    top: "10%",
    right: "5%",
    bottom: "10%",
    left: "5%",
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
      id:"Tf1",
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
    button.addEventListener('click',function(m)
    {
    Titanium.API.info("You clicked the button"+JSON.stringify(e));
    var data = {
        quantity: textField.value,
        product_id:args,
    }
    var client = Ti.Network.createHTTPClient();
    client.onload = function(e) {
        var response = JSON.parse(client.getResponseText());
        Ti.API.info("json stringfy load" + JSON.stringify(e));
        Ti.API.info("client.responseText onload" + client.getResponseText());
        // alert(response.message)
    };
    client.onerror = function(e) {
        var response = JSON.parse(client.getResponseText());
        Ti.API.info(" onerror" + JSON.stringify(e));
        Ti.API.info("client.responseText onerror" + client.getResponseText());
        Ti.API.info(response.message);
        // alert(response.message);

    };
    client.open('POST', 'http://staging.php-dev.in:8844/trainingapp/api/addToCart');
    client.setRequestHeader("access_token", access_token);
    client.send(data);
    $.ProductDetailwin.remove(viewBody);
    });
    view.add(Name,image,Qty,textField,button);
    viewBody.add(view);
    $.ProductDetailwin.add(viewBody);
  }
        Ti.API.info("inside open popover"+args);
    });
