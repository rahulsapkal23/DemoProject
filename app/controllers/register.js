function clickMale() {
    $.male.text = "\uf111";
    $.female.text = "\uf1db";

}

function clickFemale() {
    $.female.text = "\uf111";
    $.male.text = "\uf1db";


}

function clickCheck() {
    if ($.check.text == "\uf0c8") {
        $.check.text = "\uf14a";
    } else {
        $.check.text = "\uf0c8";
    }


}



function check_Register(e) {
    var emailRE = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/;
    var mobRE = /^\d{10}$/;
    var zipRE = /^\d{6}$/;
    var passwordRE = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]){6,16}/;
    if ($.first_name.value == "") {
        $.viewfirst_name.backgroundColor = "blue";
        alert("please fill first name");
    } else if ($.last_name.value == "") {
        $.viewfirst_name.backgroundColor = "transprent";
        $.viewlast_name.backgroundColor = "blue";
        alert("please fill last name");
    } else if (emailRE.test($.email_id.value) == false) {
        $.viewfirst_name.backgroundColor = "transprent";
        $.viewlast_name.backgroundColor = "transprent";
        $.viewemail_id.backgroundColor = "blue";
        alert("Invalid email_id");
    } else if (passwordRE.test($.password.value) == false) {
        $.viewfirst_name.backgroundColor = "transprent";
        $.viewlast_name.backgroundColor = "transprent";
        $.viewemail_id.backgroundColor = "transprent";
        $.viewpassword.backgroundColor = "blue";
        alert("Password must be 1 lower 1 upper and 1 digit");
    } else if ($.password.value != $.conform_password.value) {
        $.viewfirst_name.backgroundColor = "transprent";
        $.viewlast_name.backgroundColor = "transprent";
        $.viewemail_id.backgroundColor = "transprent";
        $.viewpassword.backgroundColor = "transprent";
        $.viewconform_password.backgroundColor = "blue";
        alert("Password is not matched");
    } else if (mobRE.test($.phone_no.value) == false) {
        $.viewfirst_name.backgroundColor = "transprent";
        $.viewlast_name.backgroundColor = "transprent";
        $.viewemail_id.backgroundColor = "transprent";
        $.viewpassword.backgroundColor = "transprent";
        $.viewconform_password.backgroundColor = "transprent";
        $.viewphone_no.backgroundColor = "blue";
        alert("Phone No must be 10 digits");

    } else if ($.male.text == "\uf1db" && $.female.text == "\uf1db") {
        $.viewfirst_name.backgroundColor = "transprent";
        $.viewlast_name.backgroundColor = "transprent";
        $.viewemail_id.backgroundColor = "transprent";
        $.viewpassword.backgroundColor = "transprent";
        $.viewconform_password.backgroundColor = "transprent";
        $.viewphone_no.backgroundColor = "transprent";
        $.viewGender.backgroundColor = "blue";
        alert("please Select Gender");

    } else if ($.check.text == "\uf0c8") {
        $.viewfirst_name.backgroundColor = "transprent";
        $.viewlast_name.backgroundColor = "transprent";
        $.viewemail_id.backgroundColor = "transprent";
        $.viewpassword.backgroundColor = "transprent";
        $.viewconform_password.backgroundColor = "transprent";
        $.viewphone_no.backgroundColor = "transprent";
        $.viewGender.backgroundColor = "transprent";
        $.viewcheck.backgroundColor = "blue";
        alert("please check out Terms and conditions");
    } else {
        $.viewfirst_name.backgroundColor = "transprent";
        $.viewlast_name.backgroundColor = "transprent";
        $.viewemail_id.backgroundColor = "transprent";
        $.viewpassword.backgroundColor = "transprent";
        $.viewconform_password.backgroundColor = "transprent";
        $.viewphone_no.backgroundColor = "transprent";
        $.viewGender.backgroundColor = "transprent";
        $.viewcheck.backgroundColor = "transprent";
        alert("Congradulations Your Registration is Successful !");
    }

}
