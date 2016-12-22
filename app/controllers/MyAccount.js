$.header.__views.tital.text = "My Account";

$.header.__views.back.addEventListener('click', function(e) {
    $.MyAccountwin.close();
});

$.header.__views.search1.text = "\uf07a";
$.header.__views.search.addEventListener('click', function(e) {
    if (Alloy.Globals.MycartFlag == "true") {
        var MyCart = Alloy.createController('MyCart').getView();
        MyCart.open();

    } else {
        alert("My Cart is Empty");
    }
});




var access_token123 = Alloy.Globals.Maccess_token;

// ################################# making  HTTP GET request for API ###################################

var client = Ti.Network.createHTTPClient({
    onload: function(e) {
        var response = JSON.parse(client.getResponseText());
        Ti.API.info("json stringfy Mycart" + JSON.stringify(e));
        Ti.API.info("client.responseText MyCart" + client.getResponseText());
        // function called fir list view according to Product id
        ViewofMyAccountDetails(client.getResponseText())
    },
    // function called when an error occurs, including a timeout
    onerror: function(e) {
        var response = JSON.parse(client.getResponseText());
        Ti.API.info(" onerror" + JSON.stringify(e));
        Ti.API.info("client.responseText onerror" + client.getResponseText());
        Ti.API.info(response.message);
        alert(response.message);
    },
    //  timeout : 5000  // in milliseconds
});
// Prepare the connection.

client.open("GET", "http://staging.php-dev.in:8844/trainingapp/api/users/getUserData");
client.setRequestHeader("access_token", Alloy.Globals.Maccess_token);
// Send the request.
client.send();



function ViewofMyAccountDetails(Account) {
    Ti.API.info(Account);

    Ti.API.info("inside function ViewofMycart" + Account);
    Ti.API.info("inside function ViewofMycart stringify" + JSON.stringify(Account));
    $.first_name.value = JSON.parse(Account).data.user_data.first_name;
    $.last_name.value = JSON.parse(Account).data.user_data.last_name;
    $.email_id.value = JSON.parse(Account).data.user_data.email;
    $.phone_no.value = JSON.parse(Account).data.user_data.phone_no;
    $.Dob.text = JSON.parse(Account).data.user_data.dob;


};

function edit_Account(e) {
    Ti.API.info("wwwwwwww" + JSON.stringify(e));
    if ($.Edit.title == "EDIT PROFILE") {
        Ti.API.info("inside edit acc");
        $.first_name.editable = "true";
        $.last_name.editable = "true";
        $.email_id.editable = "true";
        $.phone_no.editable = "true";
        $.Dob.editable = "true";
        $.Dob.addEventListener('click', function() {
            Ti.API.info("inside click");
            if (Ti.Platform.osname == "android") {
                Ti.API.info("inside click android");
                var picker = Ti.UI.createPicker({
                    type: Ti.UI.PICKER_TYPE_DATE,
                    minDate: new Date(1971, 0, 1),
                    maxDate: new Date(2016, 11, 30),
                    value: new Date(2016, 11, 30),
                });

                picker.showDatePickerDialog({
                    value: new Date(2010, 8, 1),
                    callback: function(e) {
                        if (e.cancel) {
                            Ti.API.info('User canceled dialog');
                        } else {
                            Ti.API.info('User selected date: ' + e.value);
                            Titanium.API.info("You clicked the button");
                            var date = e.value;
                            var bMon = date.getMonth() + 1;
                            var bdate = date.getDate();
                            var byear = date.getFullYear();
                            $.Dob.text = bdate + "-" + bMon + "-" + byear;
                        }
                    }
                });

            } else {

                Ti.API.info("inside click ios");

                Ti.UI.backgroundColor = 'white';
                var MyAccountwin = Ti.UI.createWindow({
                    exitOnClose: true,
                    layout: 'vertical'
                });
                var view = Titanium.UI.createView({
                    borderRadius: 10,
                    top: 150,
                    backgroundColor: 'white',
                    width: 400,
                    height: 400
                });
                MyAccountwin.add(view);
                var picker = Ti.UI.createPicker({
                    type: Ti.UI.PICKER_TYPE_DATE,
                    minDate: new Date(1971, 0, 1),
                    maxDate: new Date(2016, 11, 16),
                    value: new Date(2016, 11, 16),
                    top: 50
                });
                var button = Titanium.UI.createButton({
                    title: 'Set',
                    top: 300,
                    width: 100,
                    height: 50,
                    backgroundColor: "red"
                });
                button.addEventListener('click', function(e) {
                    Titanium.API.info("You clicked the button");
                    var date = picker.value;
                    var bMon = date.getMonth() + 1;
                    var bdate = date.getDate();
                    var byear = date.getFullYear();
                    $.Dob.text = bdate + "-" + bMon + "-" + byear;
                    MyAccountwin.close();
                });
                view.add(picker);
                view.add(button);

                MyAccountwin.open();

            }

        });

        $.MyDP.addEventListener('click', option);
        $.Edit.title = "Submit";

    } else {

        Ti.API.info("inside submit acc" + $.MyDP.image);
        var image = $.MyDP.image
        var imgStr = Ti.Utils.base64encode(image).toString();

        Ti.API.info("inside submit stringfy" + JSON.stringify($.MyDP.image) + "sfhnd" + imgStr);
        // Ti.API.info("inside submit parse"+JSON.parse($.MyDP.image));
        // ######################################### making  HTTP POST request for API #########################################
        Ti.API.info("hfuhhsduf" + imgStr + $.Dob.value);
        var data = {
            first_name: $.first_name.value,
            last_name: $.last_name.value,
            dob: $.Dob.text,
            email: $.email_id.value,
            phone_no: $.phone_no.value,
            profile_pic: Ti.Utils.base64encode(image).toString(),
        }
        Ti.API.info("data" + JSON.stringify(data));
        var xhr = Ti.Network.createHTTPClient();
        xhr.onload = function(e) {
            // var response = JSON.stringify(xhr.getResponseText());
            Ti.API.info("json stringfy load" + JSON.stringify(e));
            Ti.API.info("xhr.responseText onload" + xhr.getResponseText());

            alert("Account has been updated Sucessfully");
            var HomeScreen = Alloy.createController('HomeScreen', Alloy.Globals.Maccess_token).getView();
            HomeScreen.open();

        };
        xhr.onerror = function(e) {
            var response = JSON.stringify(xhr.getResponseText());
            Ti.API.info(" onerror" + JSON.stringify(e));
            Ti.API.info("xhr.responseText onerror" + xhr.getResponseText());
            Ti.API.info("sayhdgas" + response);
            Ti.API.info(response.message);
            alert("Account not updated");

        };
        xhr.open('POST', 'http://staging.php-dev.in:8844/trainingapp/api/users/update');
        Ti.API.info("=======Maccess_token=======");
        Ti.API.info(Alloy.Globals.Maccess_token);
        Ti.API.info("=======Maccess_token=======");
        xhr.setRequestHeader("access_token", Alloy.Globals.Maccess_token);

        xhr.send(data);

    }

}




function reset_Account(e) {
    Ti.API.info("inside Reset Account");
    var ResetAccount = Alloy.createController('ResetAccount').getView();
    ResetAccount.open();
}

function option() {
    Ti.API.info("inside option");
    $.Cameradialog.setOptions([
        "Camera", "Gallary", "Cancel"
    ]);
    $.Cameradialog.show();
    $.Cameradialog.addEventListener('click', function(e) {
        if (e.index == 0) {
            Camera_Open();
        } else if (e.index == 1) {
            Gallary_Open();
        } else {
            alert("plese Select image");
        }
    });
}



function Camera_Open(e) {
    Ti.API.info("inside camera open");

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
}


function Gallary_Open() {

    Titanium.Media.openPhotoGallery({
        success: function(event) {
            if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {

                var image = event.media;

                var imgStr = Ti.Utils.base64encode(image);
                $.MyDP.image = image;
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



function logicToShowCamera() {


    // var opts = {
    //   cancel: 2,
    //   options: ['Gallary', 'Camera', 'Cancel'],
    //   selectedIndex: 2,
    //   destructive: 0,
    //   title: 'Upload Photo'
    // };
    //
    // $.MyDP.addEventListener('click', function(e){
    //   var dialog = Ti.UI.createOptionDialog(opts).show();
    // });


    Titanium.Media.showCamera({
        success: function(event) {
            if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {

                var image = event.media;

                var imgStr = Ti.Utils.base64encode(image);
                $.MyDP.image = image;
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
