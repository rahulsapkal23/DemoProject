Ti.API.info("inside Store_Locator");

$.header.__views.tital.text = "Store Locator";

$.header.__views.back.addEventListener('click', function(e) {
    $.Store_Locatorwin.close();
});


$.header.__views.search.addEventListener('click', function(e) {
    if (Alloy.Globals.cartFlag == true) {
        var MyCart = Alloy.createController('MyCart').getView();
        MyCart.open();

    } else {
        alert("My Cart is Empty");
    }
});


var Map = require('ti.map');
// var mapview = Map.createView({mapType:Map.NORMAL_TYPE});



var mountainView = Titanium.Map.createAnnotation({
    latitude: 19.2183307,
    longitude: 72.9780897,
    title: "Appcelerator Headquarters",
    subtitle: 'Mountain View, CA',
    pincolor: Titanium.Map.ANNOTATION_RED,
    animate: true,
    leftButton: '../images/appcelerator_small.png',
    myid: 1 // Custom property to uniquely identify this annotation.
});

var mountainView1 = Titanium.Map.createAnnotation({
    latitude: 19.025482,
    longitude: 72.845358,
    title: "Neosoft Headquarters",
    subtitle: 'Ruby Tower',
    pincolor: Titanium.Map.ANNOTATION_RED,
    animate: true,
    leftButton: '../images/appcelerator_small.png',
    myid: 2 // Custom property to uniquely identify this annotation.
});
var mountainView2 = Titanium.Map.createAnnotation({
    latitude: 19.018109,
    longitude: 72.82833,
    title: "Neosoft Prabhadevi",
    subtitle: '124 Unique Industrial Estate',
    pincolor: Titanium.Map.ANNOTATION_RED,
    animate: true,
    leftButton: '../images/appcelerator_small.png',
    myid: 2 // Custom property to uniquely identify this annotation.
});


var mapview = Titanium.Map.createView({
    mapType: Titanium.Map.STANDARD_TYPE,
    region: {
        latitude: 19.018109,
        longitude: 72.82833,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03
    },
    animate: true,
    regionFit: true,
    userLocation: true,
    top: "10",
    height: "167",
    annotations: [mountainView, mountainView1,
        mountainView2
    ]
});

$.mapadd.add(mapview);
Ti.API.info("mapview" + mapview);
// Handle click events on any annotations on this map.
mapview.addEventListener('click', function(evt) {

    Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid);

    // Check for all of the possible names that clicksouce
    // can report for the left button/view.
    if (evt.clicksource == 'leftButton' || evt.clicksource == 'leftPane' ||
        evt.clicksource == 'leftView') {
        Ti.API.info("Annotation " + evt.title + ", left button clicked.");
    }
});


//
//
// var plainTemplate = {
//     childTemplates: [
//         {
//             type: 'Ti.UI.Label', // Use a label
//             bindId: 'rowtitle',  // Bind ID for this label
//             properties: {        // Sets the Label.left property
//                 left: '10dp'
//             }
//         },
//         {
//             type: 'Ti.UI.Label', // Use a label
//             bindId: 'rowtitle',  // Bind ID for this label
//             properties: {        // Sets the Label.left property
//                 left: '10dp'
//             }
//         },
//         {
//             type: 'Ti.UI.Label', // Use a label
//             bindId: 'rowtitle',  // Bind ID for this label
//             properties: {        // Sets the Label.left property
//                 left: '10dp'
//             }
//         },
//             events: { click : report }  // Binds a callback to the button's click event
//         }
//     ]
// };
// function report(e) {
// 	Ti.API.info(e.type);
// }
// var listView = Ti.UI.createListView({
//     // Maps the plainTemplate object to the 'plain' style name
//     templates: { 'plain': plainTemplate },
//     // Use the plain template, that is, the plainTemplate object defined earlier
//     // for all data list items in this list view
//     defaultItemTemplate: 'plain'
// });
// var data = [];
// for (var i = 0; i < 10; i++) {
//     data.push({
//         // Maps to the rowtitle component in the template
//         // Sets the text property of the Label component
//         rowtitle : { text: 'Row ' + (i + 1) },
//         // Sets the regular list data properties
//         properties : {
//             itemId: 'row' + (i + 1),
//             accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_NONE
//         }
//     });
// }
// var section = Ti.UI.createListSection({items: data});
// listView.sections = [section];
// listView.addEventListener('itemclick', function(e){
//     // Only respond to clicks on the label (rowtitle) or image (pic)
//     if (e.bindId == 'rowtitle' || e.bindId == 'pic') {
//         var item = e.section.getItemAt(e.itemIndex);
//         if (item.properties.accessoryType == Ti.UI.LIST_ACCESSORY_TYPE_NONE) {
//             item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK;
//         }
//         else {
//             item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_NONE;
//         }
//         e.section.updateItemAt(e.itemIndex, item);
//     }
// });

// var items = [];
// for(var i=0;i<3;i++)
// {
// items.push({
//     "name": {
//         text: "raja",
//     },
//
//
//     "Add": {
//         text: "aere",
//     },
//
//
//     "template": "image_title",
//
//
// });
//
// }
//
//
//
// $.dynamicListView.sections[0].setItems(items, {
// animated: "false",
//
// });

function zoom(e) {
    Ti.API.info("inside zoom" + JSON.stringify(e));
    Ti.API.info("before" + mapview.region.latitude);
    Ti.API.info("before" + mapview.region.longitude);
    Ti.API.info("before" + mapview.region.latitudeDelta);
    Ti.API.info("before" + mapview.region.longitudeDelta);
    mapview.region.latitude = 19.018109;
    mapview.region.longitude = 72.82833;
    mapview.region.latitudeDelta = 0.01;
    mapview.region.longitudeDelta = 0.01;
    Ti.API.info("after" + mapview.region.latitude);
    Ti.API.info("after" + mapview.region.longitude);
    Ti.API.info("after" + mapview.region.latitudeDelta);
    Ti.API.info("after" + mapview.region.longitudeDelta);
    // $.mapadd.add(mapview);
}
