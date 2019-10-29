const googleOrders = require('./getGMCorders').getGMCorders();
const googleOrderToSSorder = require('./googleOrderToSSorder');
var ordersToSend = [];
googleOrders.then(function(allGoogleOrders) {
console.log(allGoogleOrders);

  allGoogleOrdersLength = allGoogleOrders.length;
  for (var indexOfGoogleOrders = 0; indexOfGoogleOrders < allGoogleOrdersLength; indexOfGoogleOrders++) {

    var googleOrder = allGoogleOrders[indexOfGoogleOrders];

    var newOrder = googleOrderToSSorder.googleOrderToSSorder(googleOrder);

    ordersToSend.push(newOrder)
  }
  console.log(ordersToSend);

  //  sendOrdersToSS(ordersToSend);

  function sendOrdersToSS(ordersToSend) {
    var body = ordersToSend;
    var Authorization = {
      'Authorization': 'Basic ZGU4ZjlmM2I1ODE5NDlkYWIyYTczZmZhNzY1YzA2YzQ6ZGZmODQ4ZmNlMDgwNGEzZGE4ZTYwNmZjYWE5YTBiNDQ='
    };

    var options = {
      'method': 'POST',
      'contentType': 'application/json',
      'headers': Authorization,
      'payload': JSON.stringify(body)
    };
    var URL = "https://ssapi.shipstation.com/orders/createorders";
    var response = UrlFetchApp.fetch(URL, options);
    var JSONdata = JSON.parse(response); //.getContentText()
  }
});
