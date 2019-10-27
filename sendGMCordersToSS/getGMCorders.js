const {google
} = require('googleapis');

const auth = require("./authorizeGMC").authorize();

auth.then(async function getGMCorders(auth) {
      console.log(auth);
        const  orders = await google.content({
          version: 'v2.1',
          auth
        }).orders.list({
          merchantId: '121694571'
        });
        console.log(orders.data.resources);
      }
    );
    //getGMCorders();
