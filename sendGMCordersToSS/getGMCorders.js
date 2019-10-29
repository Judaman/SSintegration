module.exports = {
  getGMCorders: async function() {


    const {
      google
    } = require('googleapis');

    const auth = require("./authorizeGMC").authorize();

    var googleOrders;

    await auth.then(async function getGMCorders(auth) {

      const orders = await google.content({
        version: 'v2.1',
        auth
      }).orders.list({
        merchantId: '121694571',
        maxResults: 3
      });
      //  console.log(orders.data.resources);

      googleOrders = orders.data.resources;
    })
    return googleOrders;
  } //getGMCorders();
}
