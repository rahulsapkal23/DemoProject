Ti.API.info("inside Add Add_Address js");
$.header.__views.tital.text = "Add Address";
$.header.__views.back.addEventListener('click', function(e) {
    $.AddressListwin.close();
});
// $.header.__views.search.text = "\uf067";
var items = [];


var rows = db.execute('SELECT * FROM address');
Ti.API.info('Row123 count: ' + rows.getRowCount( ));

var fieldCount = rows.fieldCount;
Ti.API.info('Field123 count: ' + fieldCount);

while (rows.isValidRow()){
  Ti.API.info('address ---> ROWID: ' + rows.field(0) + ', ADDRESS:' + rows.field(1) + ', LANDMARK: ' + rows.field(2) + ', city: ' + rows.field(3)+ ', city: ' + rows.field(4)+ ', city: ' + rows.field(5));
  items.push({
      "name": {
          // text: JSON.parse(Productdata).data[i].name
          text:rows.field(2),
      },

      "Add": {
          // text: JSON.parse(Productdata).data[i].producer
          text:rows.field(0)+","+rows.field(1)+","+rows.field(2)+","+rows.field(3)+","+rows.field(4)+","+rows.field(5)+".",
      },


      "template": "image_title",
    //   "properties": {
    //       Mid:JSON.parse(Productdata).data[i].id,
    //       access_token:JSON.stringify(access_token),
    // }
  });

  rows.next();
}




//
// var rows = db.execute('SELECT * FROM Address ');
// Ti.API.info('Row count: ' + rows.rowCount);
//
// var fieldCount = rows.fieldCount;
// Ti.API.info('Field count: ' + fieldCount);
//
// while (rows.isValidRow()){
//   Ti.API.info('address ---> ROWID: ' + rows.field(0) + ', ADDRESS:' + rows.field(1) + ', LANDMARK: ' + rows.field(2) + ', city: ' + rows.field(3)+ ', city: ' + rows.field(4)+ ', city: ' + rows.field(5));
//   items.push({
//       "name": {
//           // text: JSON.parse(Productdata).data[i].name
//           text:rows.field(2),
//       },
//
//       "Add": {
//           // text: JSON.parse(Productdata).data[i].producer
//           text:rows.field(1),
//       },
//
//
//       "template": "image_title",
//     //   "properties": {
//     //       Mid:JSON.parse(Productdata).data[i].id,
//     //       access_token:JSON.stringify(access_token),
//     // }
//   });
//
//   rows.next();
// }


//
// for (var i = 0; i < 3; i++) {
//
//     // Ti.API.info("rating for" + rating);
//
//
//             items.push({
//                 "name": {
//                     // text: JSON.parse(Productdata).data[i].name
//                     text:"hsjdhdjs",
//                 },
//
//                 "Add": {
//                     // text: JSON.parse(Productdata).data[i].producer
//                     text:"hfjhdjhhfdsjfhsdhfjs hdfusahfjhjkshf fjsdhfj",
//                 },
//
//
//                 "template": "image_title",
//               //   "properties": {
//               //       Mid:JSON.parse(Productdata).data[i].id,
//               //       access_token:JSON.stringify(access_token),
//               // }
//             });
// }

$.dynamicListView.sections[0].setItems(items, {
    animated: "false",

});

function GoToProductDetail(e){
  Ti.API.info("inside go to products");
};

function clickMale() {
    $.male.text = "\uf111";
    $.female.text = "\uf1db";

}
