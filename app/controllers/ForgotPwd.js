
function Send_Pwd(e){
  Ti.API.info("inside send mail");

      var data = {
          email: $.email_id.value,


      }
      Ti.API.info(data);
      var xhr = Ti.Network.createHTTPClient();
      xhr.onload = function(e) {
          var response = JSON.parse(xhr.getResponseText());
          Ti.API.info("json stringfy load" + JSON.stringify(e));
          Ti.API.info("xhr.responseText onload" + xhr.getResponseText());
          Ti.API.info(response.message);
          // alert(response.message);
          // var HomeScreen = Alloy.createController('HomeScreen').getView();
          $.ForgotPwdWin.close();

      };
      xhr.onerror = function(e) {
          var response = JSON.parse(xhr.getResponseText());
          Ti.API.info(" onerror" + JSON.stringify(e));
          Ti.API.info("xhr.responseText onerror" + xhr.getResponseText());
          Ti.API.info(response.message);
          // alert(response.message);

      };
      xhr.open('POST', 'http://staging.php-dev.in:8844/trainingapp/api/users/forgot');
      xhr.send(data);

  }

  function GoToRegister(e) {
      Ti.API.info("inside Register");
      var register = Alloy.createController('register').getView();
      register.open();
}
