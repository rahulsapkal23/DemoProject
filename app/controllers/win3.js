var recordButton = Titanium.UI.createButton({
    title: 'Record Video',
    top: '10dp'
});
$.win.add(recordButton);


// $.win.open();
// Holds a reference to the media URI

recordButton.addEventListener('click', function() {
    if (Ti.Media.hasCameraPermissions()) {
        logicToShowCamera(); //Write showCamera related logic here....
    } else {
        Ti.Media.requestCameraPermissions(function(obj) {
            if (obj.success) {
                logicToShowCamera();
            } else {
                alert('Please Provide permission first');
            }
        });
    }

    function logicToShowCamera() {

        Titanium.Media.showCamera({
            success: function(event) {
                if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
                  var imageView = Ti.UI.createImageView({
                            width: 100,
                            height: 100,
                            image: event.media
                          });
                          $.win.add(imageView);
                }
            },

            error: function(error) {
                var a = Titanium.UI.createAlertDialog({
                    title: 'Camera'
                });
                if (error.code == Titanium.Media.NO_CAMERA) {
                    a.setMessage('Device does not have camera');
                } else {
                    a.setMessage('Unexpected error: ' + error.code);
                }
                a.show();
                a = null;
            },
            saveToPhotoGallery: true,
            allowEditing: true,
            mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO],
        });

    }

    // Ti.Media.openPhotoGallery({
    //     mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO],
    //     success: function(event) {
    //         if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
    //             Ti.API.info('Success');
    //         }
    //     },
    //     error: function(error) {
    //         var a = Titanium.UI.createAlertDialog({
    //             title: 'Gallery'
    //         });
    //         a.setMessage('Unexpected error: ' + error.code);
    //         a.show();
    //         a = null;
    //     },
    //     allowEditing: true
    // });


    //
    // Titanium.Media.showCamera({
    //     success: function(event) {
    //         // called when media returned from the camera
    //         Ti.API.debug('Our type was: ' + event.mediaType);
    //         if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
    //             var imageView = Ti.UI.createImageView({
    //                 width: 100,
    //                 height: 100,
    //                 image: event.media
    //             });
    //             $.win.add(imageView);
    //         } else {
    //             alert("got the wrong type back =" + event.mediaType);
    //         }
    //     },
    //     cancel: function() {
    //         // called when user cancels taking a picture
    //     },
    //     error: function(error) {
    //         // called when there's an error
    //         var a = Titanium.UI.createAlertDialog({
    //             title: 'Camera'
    //         });
    //         if (error.code == Titanium.Media.NO_CAMERA) {
    //             a.setMessage('Please run this test on device');
    //         } else {
    //             a.setMessage('Unexpected error: ' + error.code);
    //         }
    //         a.show();
    //     },
    //     saveToPhotoGallery: true,
    //
    //
    //     // mediaTypes: [Ti.Media.MEDIA_TYPE_VIDEO, Ti.Media.MEDIA_TYPE_PHOTO]
    // });


});
