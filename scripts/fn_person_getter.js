function personGetter(account, callback) {
  $().SPServices({
        operation: "GetUserProfileByName",
        async: true,
        AccountName: account,
        completefunc:function(xData, Status) {
          if(Status == "success") {
            function getUPValue(x, p) {
              var thisValue = $(x).SPFilterNode("PropertyData").filter(function() {
                return $(this).find("Name").text() == p;
              }).find("Values").text();
              return thisValue;
            }

            var person = {
              account: account,
              name: getUPValue(xData.responseXML, "PreferredName"),
              email: getUPValue(xData.responseXML, "Email"),
              phone: getUPValue(xData.responseXML, "OfficePhone")
            }
          
            callback(person);

          }
        }
  });
}
