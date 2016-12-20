// App UI

var recordButton = Titanium.UI.createButton({
    title: 'Record photo Drive',
    top: '10dp'
});
var recordButton1 = Titanium.UI.createButton({
    title: 'Record photo cam ',
    top: '10dp'
});
$.win.add(recordButton);
$.win.add(recordButton1);

// $.win.open();
// Holds a reference to the media URI

recordButton.addEventListener('click', function() {
    // Start an activity with an intent to capture video
    // http://developer.android.com/reference/android/provider/MediaStore.html#ACTION_VIDEO_CAPTURE

    Titanium.Media.openPhotoGallery({
        mediaTypes: Titanium.Media.MEDIA_TYPE_PHOTO
    })
});

recordButton1.addEventListener('click', function() {
    // Start an activity with an intent to capture video
    // http://developer.android.com/reference/android/provider/MediaStore.html#ACTION_VIDEO_CAPTURE

    Titanium.Media.showCamera({
        mediaTypes: Titanium.Media.MEDIA_TYPE_PHOTO,
        success: function(event) {
            // called when media returned from the camera
            Ti.API.debug('Our type was: ' + event.mediaType);
            if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
                var imageView = Ti.UI.createImageView({
                    width: win.width,
                    height: win.height,
                    image: event.media
                });
                $.win.add(imageView);
            } else {
                alert("got the wrong type back =" + event.mediaType);
            }
        },
        cancel: function() {
            // called when user cancels taking a picture
        },
        error: function(error) {
            // called when there's an error
            var a = Titanium.UI.createAlertDialog({
                title: 'Camera'
            });
            if (error.code == Titanium.Media.NO_CAMERA) {
                a.setMessage('Please run this test on device');
            } else {
                a.setMessage('Unexpected error: ' + error.code);
            }
            a.show();
        },
        saveToPhotoGallery: true,
        // allowEditing and mediaTypes are iOS-only settings
        allowEditing: true,
        mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO]
    })
});
