_ = require("alloy/underscore")._;
moment = require("moment.min");
require('mCache');

var fa = require('fa');

Ti.API.info('Titanium.App.version: ' + Titanium.App.version);

Alloy.Globals.blue_text_color = "#1b2679";

Alloy.Globals.isIos7Plus = (OS_IOS && parseInt(Ti.Platform.version.split(".")[0]) >= 7);
Alloy.Globals.cartCount = 0;

Alloy.Globals.pageWidth = Titanium.Platform.displayCaps.platformWidth;
Alloy.Globals.is414Device = (OS_IOS && Ti.Platform.osname == "iphone" && Ti.Platform.displayCaps.platformWidth == 414);

//Alloy.Globals.mainUrl = "http://scm.blayneyfoods.com.au:82/webservices/";

//http://122.102.101.2:45654/webservices/login.php?username=ECHFF&password=panda4263

Alloy.Globals.mainUrl = "http://122.102.101.2:45654/webservices/";

Alloy.Globals.SCM_RECNUM = '';
Alloy.Globals.EmailId = '';
Alloy.Globals.EmailId1 = Titanium.App.Properties.getString('emailaddress');
//Alloy.Globals.Bcc = Titanium.App.Properties.getString('bcc');
Alloy.Globals.Username = '';
Alloy.Globals.members = '';
Alloy.Globals.warehouse = '';
Alloy.Globals.Code = '';
Alloy.Globals.DebtorName = '';
Alloy.Globals.userdetails = {};

Alloy.Globals.productSequence = [];

var db = Titanium.Database.open('AFS');
db.execute("CREATE TABLE IF NOT EXISTS profileProducts (productJSON TEXT, code TEXT UNIQUE);");
db.close();

var getProductSeq = function() {
    var db = Titanium.Database.open('AFS');
    var rows = db.execute("SELECT productJSON as productJSON FROM profileProducts where code = ? LIMIT 1", Alloy.Globals.Code);
    if (rows.rowCount > 0) {
        var text = rows.fieldByName('productJSON');
        // Ti.API.info("in function text" + text);
        Alloy.Globals.productSequence = JSON.parse(text);
    }
    db.close();
    // Ti.API.info("Product Sequence in functiuon : " + JSON.stringify(Alloy.Globals.productSequence));
};

Alloy.Globals.post_per_page = 20;

Alloy.Globals.windowList = [];

if (!Alloy.isTablet) {
    Alloy.Globals.pageHeight = (Alloy.Globals.isIos7Plus) ? ((Alloy.isTablet) ? Titanium.Platform.displayCaps.platformHeight - 94 : Titanium.Platform.displayCaps.platformHeight - 82) : ((Alloy.isTablet) ? Titanium.Platform.displayCaps.platformHeight - 74 : Titanium.Platform.displayCaps.platformHeight - 62);
} else {
    if (Titanium.Gesture.orientation == 1 || Titanium.Gesture.orientation == 2) {
        Alloy.Globals.pageHeight = (Alloy.Globals.isIos7Plus) ? ((Alloy.isTablet) ? Titanium.Platform.displayCaps.platformHeight - 94 : Titanium.Platform.displayCaps.platformHeight - 82) : ((Alloy.isTablet) ? Titanium.Platform.displayCaps.platformHeight - 74 : Titanium.Platform.displayCaps.platformHeight - 62);
    } else {
        Alloy.Globals.pageHeight = (Alloy.Globals.isIos7Plus) ? ((Alloy.isTablet) ? Titanium.Platform.displayCaps.platformHeight - 94 : Titanium.Platform.displayCaps.platformHeight - 82) : ((Alloy.isTablet) ? Titanium.Platform.displayCaps.platformHeight - 74 : Titanium.Platform.displayCaps.platformHeight - 62);
    }
}

if (Alloy.isTablet) {
    Titanium.Gesture.addEventListener("orientationchange", function(evt) {
        if (evt.orientation == 1 || evt.orientation == 2) {
            Alloy.Globals.pageHeight = (Alloy.Globals.isIos7Plus) ? ((Alloy.isTablet) ? Titanium.Platform.displayCaps.platformHeight - 94 : Titanium.Platform.displayCaps.platformHeight - 82) : ((Alloy.isTablet) ? Titanium.Platform.displayCaps.platformHeight - 74 : Titanium.Platform.displayCaps.platformHeight - 62);
        } else {
            Alloy.Globals.pageHeight = (Alloy.Globals.isIos7Plus) ? ((Alloy.isTablet) ? Titanium.Platform.displayCaps.platformHeight - 94 : Titanium.Platform.displayCaps.platformHeight - 82) : ((Alloy.isTablet) ? Titanium.Platform.displayCaps.platformHeight - 74 : Titanium.Platform.displayCaps.platformHeight - 62);
        }
    });
}

Alloy.Globals.pageHeightAnd = ((parseInt(Titanium.Platform.displayCaps.platformHeight) / (Titanium.Platform.displayCaps.dpi / 160)));

if (Alloy.isTablet) {
    Titanium.Gesture.addEventListener("orientationchange", function(evt) {
        if (evt.orientation == 1 || evt.orientation == 2) {
            Alloy.Globals.pageHeightAnd = ((parseInt(Titanium.Platform.displayCaps.platformHeight) / (Titanium.Platform.displayCaps.dpi / 160)));
        } else {
            Alloy.Globals.pageHeightAnd = ((parseInt(Titanium.Platform.displayCaps.platformHeight) / (Titanium.Platform.displayCaps.dpi / 160)));
        }
    });
}

/**
 * @name getData
 * @param string url
 * @param {Object} data
 * @param {Object} success
 * @param {Object} error
 * @description : HTTP get request is sent from this function.
 */
Alloy.Globals.getData = function(url, success, error) {
    var getDataUrl = Alloy.Globals.mainUrl + url;
    var client = Titanium.Network.createHTTPClient({
        onload: function(e) {
            try {
                Ti.API.info("URL hit success :" + Alloy.Globals.mainUrl + url + " Received text : " + this.responseText);
                success(JSON.parse(this.responseText));
            } catch (exception) {
                var e = {};
                e.error = "Parse Error";
                Ti.API.info("URL hit " + Alloy.Globals.mainUrl + url + 'Exception ' + JSON.stringify(exception));
                error(e);
            }
        },
        // function called when an error occurs, including a timeout
        onerror: function(e) {
            Ti.API.info("URL hit error " + Alloy.Globals.mainUrl + url);
            Ti.API.debug(e.error);
            error(e);
        },
        timeout: 1000 * 30 // in milliseconds
    });
    // Prepare the connection.
    client.open("GET", getDataUrl);
    // Send the request.
    client.send();
};

/**
 * @name getDataWithCache
 * @param string url
 * @param {Object} data
 * @param {Object} success
 * @param {Object} error
 * @description : HTTP get request is sent from this function.
 */
Alloy.Globals.getDataWithCache = function(url, success, error) {
    var getDataUrl = Alloy.Globals.mainUrl + url;
    var data = Ti.App.mCache.get(getDataUrl);
    Ti.API.info(JSON.stringify(data));
    if (data == null) {
        var client = Titanium.Network.createHTTPClient({
            onload: function(e) {
                try {
                    getProductSeq();
                    Ti.API.info("URL hit success :" + Alloy.Globals.mainUrl + url + " Received text : " + this.responseText);
                    if (Alloy.Globals.productSequence.length > 0) {
                        //Ti.API.info("Product Sequence : " + JSON.stringify(Alloy.Globals.productSequence));
                        var temp = JSON.parse(this.responseText);
                        var temp2 = [];
                        _.each(Alloy.Globals.productSequence, function(val, key) {
                            var product = _.filter(temp.profile, function(value) {
                                var newCode = value.Details.CODE;
                                //Ti.API.info('new Code before '+newCode);
                                newCode = (newCode.indexOf(' ') != -1) ? newCode.substring(0, newCode.indexOf(' ')) : newCode;
                                //Ti.API.info('new Code after '+newCode);
                                var newVal = val;
                                newVal = (newVal.indexOf(' ') != -1) ? newVal.substring(0, newVal.indexOf(' ')) : newVal;
                                if (newCode == newVal) {
                                    //Ti.API.info('new code is' +newCode+', val '+val);
                                    return value;
                                }
                            });
                            //Ti.API.info('product '+JSON.stringify(product[0]));
                            if (typeof product[0] != 'undefined') {
                                temp2.push(product[0]);
                            } else {
                                Alloy.Globals.productSequence.splice(key, 1);
                            }
                        });
                        if (Alloy.Globals.productSequence.length != temp.profile.length) {
                            if (temp.profile.length > Alloy.Globals.productSequence.length) {
                                var x = _.difference(temp.profile, temp2);
                                _.each(x, function(l, m) {
                                    temp2.push(l);
                                });
                                //temp2.push(x);
                            }
                        }
                        temp.profile = {};
                        temp.profile = temp2;
                        Ti.App.mCache.put(getDataUrl, JSON.stringify(temp), 3600);
                        success(temp);
                    } else {
                        //Ti.API.info("Product Sequence else : " + Alloy.Globals.productSequence.length);
                        Ti.App.mCache.put(getDataUrl, this.responseText, 3600);
                        success(JSON.parse(this.responseText));
                    }
                } catch (exception) {
                    var e = {};
                    e.error = "Parse Error";
                    Ti.API.info("URL hit Error :" + Alloy.Globals.mainUrl + url + 'Exception ' + JSON.stringify(exception));
                    error(e);
                }
            },
            // function called when an error occurs, including a timeout
            onerror: function(e) {
                Ti.API.info("URL hit error " + Alloy.Globals.mainUrl + url);
                Ti.API.debug(e.error);
                error(e);
            },
            timeout: 1000 * 30 // in milliseconds
        });
        // Prepare the connection.
        client.open("GET", getDataUrl);
        // Send the request.
        client.send();
    } else {
        Ti.API.info('in the cache');
        success(JSON.parse(data));
    }
};

/**
 * @name sendData
 * @param string url
 * @param {Object} data
 * @param {Object} success
 * @param {Object} error
 * @description : HTTP POST request is sent from this function.
 */
Alloy.Globals.sendData = function(url, data, success, error) {
    var client = Titanium.Network.createHTTPClient({
        timeout: 1000 * 30 // in seconds
    });

    if (url === "myscmapp/insert_modules.php") {
        Ti.API.info('into new method');
        client = Titanium.Network.createHTTPClient({
            // timeout : 1000 * 30  // in seconds
        });
    }


    // Set Header
    //client.setRequestHeader("Content-Type","application/json");
    client.setRequestHeader("Accept", "application/json");

    // Prepare the connection.
    client.open("POST", Alloy.Globals.mainUrl + url);
    Ti.API.info('sendData Url ' + Alloy.Globals.mainUrl + url);

    // Send the request.
    Ti.API.info(data);
    client.send(data);
    client.onload = function(e) {
        Ti.API.info("Received text: " + this.responseText);
        var data;
        try {
            data = this.responseText;
        } catch (Exp) {
            data = {};
            data['result'] = "false";
        }
        success(data);
    };
    // function called when an error occurs, including a timeout
    client.onerror = function(e) {
        Ti.API.info(e);
        error(e, this.responseText);
    };
};

var db = Titanium.Database.open('AFS');
db.execute("CREATE TABLE IF NOT EXISTS cart (id INTEGER PRIMARY KEY, stock_code TEXT, data TEXT, Quantity INTEGER);");
db.execute("CREATE TABLE IF NOT EXISTS currentOrder (id INTEGER PRIMARY KEY, userid INTEGER, transactionid TEXT, date TEXT, totalamount INTEGER, balanceamount INTEGER);");
db.execute("CREATE TABLE IF NOT EXISTS currentOrderDetails (id INTEGER PRIMARY KEY, stock_code TEXT, data TEXT, Quantity INTEGER, currentOrder_id INTEGER);");
db.close();

Alloy.Globals.updateCartCount = function() {
    var db = Titanium.Database.open('AFS');
    var rows = db.execute("SELECT count(*) as products_count FROM cart");
    if (rows.isValidRow()) {
        Alloy.Globals.cartCount = rows.fieldByName('products_count');
    }
    rows.close();
    db.close();
};
