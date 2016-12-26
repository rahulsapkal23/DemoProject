// if (OS_ANDROID) {
//     var launchIntent = Ti.App.Android.launchIntent;
//     var extra;
//     if (launchIntent.hasExtra(Ti.Android.EXTRA_TEXT) && (extra = launchIntent.getStringExtra(Ti.Android.EXTRA_TEXT))) {
//         $.textArea.value = extra;
//     }
// }

// function toPigLatin() {
//     var intent = Ti.Android.createIntent({
//         action: Ti.Android.ACTION_SEND,
//         type: "*/*"
//     });
//
//     intent.putExtra(Ti.Android.EXTRA_TEXT, 'asdasd');
//     intent.addCategory(Ti.Android.CATEGORY_DEFAULT);
//     $.win1.activity.startActivity(intent);
// }








/* SAMPLE USAGE */


//
// var ScrollView = require('ScrollView'); //point to ScrollView.js
// scrollView = new ScrollView();

// scrollView must be inside a View Container
var contentView = Ti.UI.createView({
		width:'90%',
		height: 500,
		top:200
});
contentView.add(scrollView);
$.win1.add(contentView);


//Demo infinite load

scrollView.addEventListener("InfiniteScrolling", function(e){
	Ti.API.info("InfiniteScrolling event -> start loading data");
	//simulate download of remote data
	setTimeout(function(){
		//call infiniteScrollingCompleted when your update is done
		scrollView.infiniteScrollingCompleted();

		//update the scrollView
		for(var i=0; i < 3; i++){
			var view = Ti.UI.createView({
				height:100,
				top:10,
				backgroundColor:"blue"
			});
                        //i need use addView to add to the subview not add
			scrollView.addView(view);
		}
	},1500);
});


//demo data
for(var i=0; i < 10; i++){
	var view = Ti.UI.createView({
		height:100,
		top:10,
		backgroundColor:"#ccc"
	});
        //i need use addView to add to the subview not add
	scrollView.addView(view);
}

$.win1.open();
