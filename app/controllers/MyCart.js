// ######################################### Setting Header #########################################
$.header.__views.back.addEventListener('click', function(e) {
    $.Mycartwin.close();
});





Ti.API.info("inside Add to cart"+Alloy.Globals.Maccess_token);
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
  Ti.API.info("inside function ViewofMycart"+cardData);
  Ti.API.info("inside function ViewofMycart stringify"+JSON.stringify(cardData));


  var items = [];

for (var i = 0; i < JSON.parse(cardData).data.length; i++)
{




              items.push({
                  "name": {
                      text: JSON.parse(cardData).data[i].product.name,
                  },
                  "image": {
                      image: JSON.parse(cardData).data[i].product.product_images,
                  },
                  "type": {
                      text: "("+JSON.parse(cardData).data[i].product.product_category+")",
                  },
                  "price": {
                      text: "Rs. "+JSON.parse(cardData).data[i].product.sub_total,
                      color: "red"
                  },
                  "QTY": {
                      text: +JSON.parse(cardData).data[i].quantity,
                      color: "black",
                  },



                  "template": "image_title",
                  "properties": {
                      // Mid:JSON.parse(Productdata).data[i].id,
                      // access_token:JSON.stringify(access_token),


                }
              });

              $.dynamicListView.sections[0].setItems(items, {
                  animated: "false",

              });


}

};
var checkFlag = true;
var pickerView = Titanium.UI.createView({
    borderRadius: 10,
    top: 50,
    backgroundColor: 'white',
    width: 250,
    height: 400
});
var picker = Ti.UI.createPicker({ width:30,top:10,height:50,color:"pink",backgroundColor:"gray"});
var data = [];
// for(var j=1;j<=$.QTY.value;j++)
data.push(Titanium.UI.createPickerRow({title:'1',value:'1'}));
data.push(Titanium.UI.createPickerRow({title:'2',value:'2'}));
data.push(Titanium.UI.createPickerRow({title:'3',value:'3'}));
data.push(Titanium.UI.createPickerRow({title:'4',value:'4'}));
picker.add(data);
picker.selectionIndicator = true;
pickerView.add(picker);


function picker(e){




  $.dynamicListView.add(pickerView);



};

function itemclick(e){
  Ti.API.info(e.bindId);
  if (e.bindId=="Viewprice") {

    Ti.API.info('checkFlag = ' + checkFlag);
    if(checkFlag) {
      //  picker.hide();
  Ti.API.info("inside if");
        checkFlag = false;
        Ti.API.info("you select"+Ti.UI.picker);
        $.dynamicListView.remove(pickerView);
    } else {
      Ti.API.info("inside else");
      checkFlag = true;
        Ti.API.info("you select"+JSON.stringify(picker));
    $.dynamicListView.add(pickerView);
      //  picker.show();

    }
  }

}
