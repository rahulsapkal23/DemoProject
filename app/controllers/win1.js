// App UI

var recordButton = Titanium.UI.createButton({
    title: 'Record Video',
    top: '10dp'
});
$.win.add(recordButton);


// $.win.open();
// Holds a reference to the media URI

recordButton.addEventListener('click', function() {
    // Start an activity with an intent to capture video
    // http://developer.android.com/reference/android/provider/MediaStore.html#ACTION_VIDEO_CAPTURE

    Titanium.Media.openPhotoGallery({
        mediaTypes: Titanium.Media.MEDIA_TYPE_PHOTO
    })
});
