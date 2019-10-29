module.exports = {getShippedSSorders:
async function getShippedSSorders() {
  const fetch = require('node-fetch');

  var url = "https://ssapi.shipstation.com/shipments?pageSize=500&storeId=82579";//up to 500 per request

  var Authorization = {
    'Authorization': 'Basic ZGU4ZjlmM2I1ODE5NDlkYWIyYTczZmZhNzY1YzA2YzQ6ZGZmODQ4ZmNlMDgwNGEzZGE4ZTYwNmZjYWE5YTBiNDQ='
  };

    var shippedSSorders = await fetch(url, {
    method: 'GET',
    headers: Authorization,
    contentType: 'application/json',
    //body: '{}'
  }).then(response => {
    return response.json();
  }).catch(err => {
    console.log(err);
  });
  return shippedSSorders.shipments

}
}
