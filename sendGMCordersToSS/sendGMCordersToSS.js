const googleOrders = require('./getGMCorders').getGMCorders();
const googleOrderToSSorder = require('./googleOrderToSSorder');
const fetch = require('node-fetch');

var ordersToSend = [];
googleOrders.then(function(allGoogleOrders) {
  //console.log(allGoogleOrders[0].lineItems);

  allGoogleOrdersLength = allGoogleOrders.length;
  for (var indexOfGoogleOrders = 0; indexOfGoogleOrders < allGoogleOrdersLength; indexOfGoogleOrders++) {

    var googleOrder = allGoogleOrders[indexOfGoogleOrders];

    var newOrder = googleOrderToSSorder.googleOrderToSSorder(googleOrder);

    ordersToSend.push(newOrder)
  }
  sendOrdersToSS(ordersToSend)
})

//console.log(ordersToSend[0].items);

async function sendOrdersToSS(ordersToSend) {

  var body = ordersToSend

  console.log(body);

  var url = "https://ssapi.shipstation.com/orders/createorders"; //up to 500 per request
  var Authorization = {
    'Authorization': 'Basic OTEwMzc3NzAyMDhlNGY2ODk1M2M4ZTc4N2JiOWE1Y2M6YTBlMGE3Njk0NzFkNDIxZDg3YzFjZjdjMDEwYmRkMDA='

  };
  var sentShippedSSorders = await fetch(url, {
    method: 'POST',
    headers: {'content-type': 'application/json','Authorization': 'Basic OTEwMzc3NzAyMDhlNGY2ODk1M2M4ZTc4N2JiOWE1Y2M6YTBlMGE3Njk0NzFkNDIxZDg3YzFjZjdjMDEwYmRkMDA='},
    body: JSON.stringify(body),
    accept: 'application/json',

    //  payload:
  }).then(response => {
    return response;
  }).catch(err => {
    console.log(err);
  });
  console.log(sentShippedSSorders);
};
