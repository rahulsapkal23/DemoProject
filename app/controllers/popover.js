var args = arguments[0] || {};
Ti.API.info("Inside popover js and data is" + args.source.properties);
Ti.API.info(JSON.stringify(args));

 $.Name.text=args.source.properties.data.name;
 $.Image.image=args.source.properties.data.product_images[0].image;

function Submit(e){
    $.popoverwin.opacity="1";
  $.popoverwin.close();
}
// $.popoverwin.opacity="0.5";

function closeWindow(e){
  $.popoverwin.close();
}
