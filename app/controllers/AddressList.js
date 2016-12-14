// ######################################### Setting Header #########################################
$.header.__views.tital.text = "Address List";
$.header.__views.search.text = "\uf067";
$.header.__views.back.addEventListener('click', function(e) {
    $.AddressListwin.close();
});


$.header.__views.search.addEventListener('click', function(e) {
    var window = Alloy.createController('Add_Address').getView();
    window.open();
});

var flag_select = "false";
var flag_Add = null;


var items = [];
var rows = db.execute('SELECT * FROM address');
Ti.API.info('Row123 count: ' + rows.getRowCount());

var fieldCount = rows.fieldCount;
Ti.API.info('Field123 count: ' + fieldCount);

// #########################################  data fetch from database and put into view #########################################


while (rows.isValidRow()) {
    Ti.API.info('address ---> ROWID: ' + rows.field(0) + ', ADDRESS:' + rows.field(1) + ', LANDMARK: ' + rows.field(2) + ', city: ' + rows.field(3) + ', city: ' + rows.field(4) + ', city: ' + rows.field(5));
    items.push({
        "name": {
            text: rows.field(2),
        },


        "Add": {
            text: rows.field(0) + "," + rows.field(1) + "," + rows.field(2) + "," + rows.field(3) + "," + rows.field(4) + "," + rows.field(5) + ".",
        },


        "template": "image_title",
        "radio": {
            text: "\uf10c",
            color: "#BFBFBF",
        }

    });
    rows.next();
}



$.dynamicListView.sections[0].setItems(items, {
    animated: "false",

});


var selected = null;

function GoToAddressList(e) {
    Ti.API.info(e.section.getItemAt(e.itemIndex));
    Ti.API.info(e.section.getItemAt(e.itemIndex).radio.text);
    e.section.getItemAt(e.itemIndex).radio.text = "raaa";
    Ti.API.info("inside go to products" + JSON.stringify(e));
    if (e.bindId == "radio") {
        Ti.API.info("inside radio");
        var radio_elem = e.section.getItemAt(e.itemIndex);
        Ti.API.info("radio_elem= " + e.itemIndex);
        /*######################## not selected #########################*/
        if (radio_elem.radio.color == "#BFBFBF") {
            Ti.API.info("inside if" + JSON.stringify(e.section.getItems()));
            for (var i = 0; i < e.section.getItems().length; i++) {
                if (i == e.itemIndex) {
                    Ti.API.info("inside if for before" + i + JSON.stringify(e.section.getItemAt(i)));
                    flag_select = "true";
                    flag_Add = e.section.getItemAt(i).Add.text;
                    Ti.API.info(e.section.getItemAt(i).radio.color);
                    // e.section.getItemAt(i).radio.text = "\uf111";
                    var r1 = e.section.getItemAt(i);
                    r1.radio.color = "#8E8E8E";
                    r1.radio.text = "\uf111";
                    e.section.updateItemAt(i, r1);
                    r1 = null;
                    //  e.section.updateItemAt(e.itemIndex, radio_elem);
                    Ti.API.info(e.section.getItemAt(i).radio.color);

                    Ti.API.info("inside if for after" + i + JSON.stringify(e.section.getItemAt(i)));

                } else {
                    flag_select = "true";
                    Ti.API.info("inside else for" + i + JSON.stringify(e.section.getItemAt(i)));
                    var r1 = e.section.getItemAt(i);
                    r1.radio.color = "#BFBFBF";
                    r1.radio.text = "\uf10c";
                    e.section.updateItemAt(i, r1);
                    r1 = null;
                }
            }



        } else {
            Ti.API.info("inside else" + JSON.stringify(e.section.getItems()));

            flag_select = "false";
            radio_elem.radio.text = "\uf10c";
            radio_elem.radio.color = "#BFBFBF";
            e.section.updateItemAt(e.itemIndex, radio_elem);
        }

        radio_elem = null;
    }
    if (e.bindId == "close") {
        Ti.API.info(e.section.getItemAt(e.itemIndex));
        e.section.deleteItemsAt(e.itemIndex, 1);
    }
};


$.place_add.addEventListener('click', function(e) {
    if (flag_select == "false") {
        Ti.API.info("inside else add is" + JSON.stringify(e));

        alert("Please Select 1 of the Address");

    } else {
        Ti.API.info("inside else add is" + JSON.stringify(e));
        Ti.API.info("add is" + flag_Add);

        var data = {
            address: flag_Add,


        }
        Ti.API.info(data);
        var client = Ti.Network.createHTTPClient();
        client.onload = function(e) {
            var response = JSON.parse(client.getResponseText());
            Ti.API.info("json stringfy load" + JSON.stringify(e));
            Ti.API.info("client.responseText onload" + client.getResponseText());

            // alert(response.message);
            alert(client.getResponseText());


        };
        client.onerror = function(e) {
            var response = JSON.parse(client.getResponseText());
            Ti.API.info(" onerror" + JSON.stringify(e));
            Ti.API.info("client.responseText onerror" + client.getResponseText());
            Ti.API.info(response.message);
            // alert(response.message);

        };
        client.open('POST', 'http://staging.php-dev.in:8844/trainingapp/api/order');
        client.setRequestHeader("access_token", Alloy.Globals.Maccess_token);
        client.send(data);





        // http://staging.php-dev.in:8844/trainingapp/api/order
        var window = Alloy.createController('MyOrder').getView();
        window.open();
    }

});
