function getShippedSSOrders() {
  var Authorization = {
    'Authorization': 'Basic ZGU4ZjlmM2I1ODE5NDlkYWIyYTczZmZhNzY1YzA2YzQ6ZGZmODQ4ZmNlMDgwNGEzZGE4ZTYwNmZjYWE5YTBiNDQ='
  };
  var options = {
    'method': 'GET',
    'contentType': 'application/json',
    'headers': Authorization,
  };

  var URL = "https://ssapi.shipstation.com/shipments?pageSize=500&storeId=82579";

  var response = UrlFetchApp.fetch(URL, options);

  var JSONdata = JSON.parse(response.getContentText());


  return JSONdata.shipments;

}
