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



function ViewofMycart(e) {
  Ti.API.info("inside function ViewofMycart"+e);
  Ti.API.info("inside function ViewofMycart stringify"+JSON.stringify(e));


  var items = [];

for (var i = 0; i < JSON.parse(e).data.length; i++)
{




              items.push({
                  "name": {
                      text: "rrr",
                  },
                  "image": {
                      image: "sss",
                  },
                  "type": {
                      text: "table",
                  },
                  "price": {
                      text: "Rs. ",
                      color: "red"
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
}

function picker(e){


    var checkFlag = true;
    var picker = Ti.UI.createPicker({ width:10});
    var data = [];

    data.push(Titanium.UI.createPickerRow({title:'1'}));
    data.push(Titanium.UI.createPickerRow({title:'2'}));
    data.push(Titanium.UI.createPickerRow({title:'3'}));
    data.push(Titanium.UI.createPickerRow({title:'4'}));
    picker.add(data);
    $.dynamicListView.add(picker);

    var resetbtn = Ti.UI.createButton({
    top : '100',
    width : '50',
    height : '35',
    title  : 'Reset'
    });
      $.dynamicListView.add(resetbtn);
    resetbtn.addEventListener('click', function(){
    Ti.API.info('checkFlag = ' + checkFlag);
    if(checkFlag) {
       picker.hide();

        checkFlag = false;
    } else {

       picker.show();
    checkFlag = true;
    }
    });

};
