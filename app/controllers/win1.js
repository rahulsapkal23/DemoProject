if (OS_ANDROID) {
    var launchIntent = Ti.App.Android.launchIntent;
    var extra;
    if (launchIntent.hasExtra(Ti.Android.EXTRA_TEXT) && (extra = launchIntent.getStringExtra(Ti.Android.EXTRA_TEXT))) {
        $.textArea.value = extra;
    }
}

function toPigLatin() {
    var intent = Ti.Android.currentActivity.getIntent();
    var iname = Ti.Android.EXTRA_STREAM;
    if (intent && intent.hasExtra(iname)) {
        // Create ImageView from TiBlob
        var blob = intent.getBlobExtra(iname);
        win.add(Ti.UI.createImageView({
            image: blob,
            height: 300,
            width: 300,
            left: 0,
            top: 0
        }));
    } else {
        Ti.API.info('No extra named "' + iname + '" found in Intent');
    }
}
