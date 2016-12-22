// if (OS_ANDROID) {
//     var launchIntent = Ti.App.Android.launchIntent;
//     var extra;
//     if (launchIntent.hasExtra(Ti.Android.EXTRA_TEXT) && (extra = launchIntent.getStringExtra(Ti.Android.EXTRA_TEXT))) {
//         $.textArea.value = extra;
//     }
// }

function toPigLatin() {
    var intent = Ti.Android.createIntent({
        action: Ti.Android.ACTION_SEND,
        type: "*/*"
    });

    intent.putExtra(Ti.Android.EXTRA_TEXT, 'asdasd');
    intent.addCategory(Ti.Android.CATEGORY_DEFAULT);
    $.win1.activity.startActivity(intent);
}
