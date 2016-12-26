function ScrollView(args){
	var args = args || {};
	var nearBottom = false;
	var loadingView = Ti.UI.createView({
		height:60,
		width: Ti.UI.SIZE,
		backgroundColor:"transparent",
		visible:false
	});
	var activityIndicator = Ti.UI.createActivityIndicator({
		color: '#000',
		font: {fontFamily:'Helvetica Neue', fontSize:16, fontWeight:'bold'},
		message: ' Loading...',
		style:Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
		height:Ti.UI.SIZE,
		width:Ti.UI.SIZE
	});
	activityIndicator.show();
	loadingView.add(activityIndicator);

	var ScrollView = Ti.UI.createScrollView({
		width: Ti.UI.SIZE,
		height: Ti.UI.FILL,
		contentWidth: Ti.UI.SIZE,
		contentHeight: Ti.UI.SIZE,
  		showVerticalScrollIndicator: true,
  		showHorizontalScrollIndicator: false,
		backgroundColor:"transparent",
		layout:"vertical"
	});
	var contentView = Ti.UI.createView({
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
		layout: 'vertical',
		top:0,
		left:0,
		backgroundColor:'transparent'
	});

	ScrollView.add(contentView);
	ScrollView.add(loadingView);

	ScrollView.addEventListener('scroll',function(e){
		var tolerance = 60;
    	nearBottom = (contentView.getRect().height - e.y) <= (ScrollView.getRect().height + tolerance);
	});

	ScrollView.addEventListener('scrollend',function(e){
		if(nearBottom){
			//this.scrollTo(0,bottomLine);
			loadingView.setVisible(true);
			nearBottom = false;
			ScrollView.fireEvent('InfiniteScrolling');
		}
	});

	ScrollView.infiniteScrollingCompleted = function(e){
		loadingView.setVisible(false);
	};

	ScrollView.addView = function(view){
		contentView.add(view);
	}

	return ScrollView;
}
// module.exports = ScrollView;
