// ######################################### Setting Header #########################################
$.header.__views.tital.text = "Address List";
$.header.__views.search.text = "\uf067";
$.header.__views.back.addEventListener('click', function(e) {
    $.AddressListwin.close();
});

var items = [];
var rows = db.execute('SELECT * FROM address');
Ti.API.info('Row123 count: ' + rows.getRowCount( ));
var fieldCount = rows.fieldCount;
Ti.API.info('Field123 count: ' + fieldCount);

// #########################################  data fetch from database and put into view #########################################

while (rows.isValidRow()){
  Ti.API.info('address ---> ROWID: ' + rows.field(0) + ', ADDRESS:' + rows.field(1) + ', LANDMARK: ' + rows.field(2) + ', city: ' + rows.field(3)+ ', city: ' + rows.field(4)+ ', city: ' + rows.field(5));
  items.push({
      "name": {
          text:rows.field(2),
      },

      "Add": {
          text:rows.field(0)+","+rows.field(1)+","+rows.field(2)+","+rows.field(3)+","+rows.field(4)+","+rows.field(5)+".",
      },


      "template": "image_title",
      "radio":{
        text:"\uf10c",
        color:"#BFBFBF",
      }

  });
  rows.next();
}


$.dynamicListView.sections[0].setItems(items, {
    animated: "false",

});

function GoToAddressList(e){
  Ti.API.info(e.section.getItemAt(e.itemIndex));
  Ti.API.info(e.section.getItemAt(e.itemIndex).radio.text);
e.section.getItemAt(e.itemIndex).radio.text="raaa";
  Ti.API.info("inside go to products"+JSON.stringify(e));
  if (e.bindId=="radio") {
    var radio_elem= e.section.getItemAt(e.itemIndex)
    if (radio_elem.radio.color == "#BFBFBF") {
      Ti.API.info("inside if");
      radio_elem.radio.text = "\uf111";
      radio_elem.radio.color = "#8E8E8E";

    } else {
      Ti.API.info("inside else");
      radio_elem.radio.text = "\uf10c";
      radio_elem.radio.color = "#BFBFBF";
    }
     e.section.updateItemAt(e.itemIndex, radio_elem);
     radio_elem=null;
  }
  if (e.bindId=="close") {
    Ti.API.info(e.section.getItemAt(e.itemIndex));
  e.section.deleteItemsAt( e.itemIndex, 1 );
  }
};
