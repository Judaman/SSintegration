function updateShipmentStatuses() {

  var SSshippedOrders = getShippedSSOrders();

  var shippedOrdersLength = SSshippedOrders.length;

  for (var indexOfSSorders = 1; indexOfSSorders < shippedOrdersLength; indexOfSSorders++) {

    var order = SSshippedOrders[indexOfSSorders];

    var orderID = order.orderKey;
    var carrier = order.serviceCode;
    var trackingNumber = order.trackingNumber;



try{var googleOrder = ShoppingContent.Orders.get(121694571, orderID)
   // Logger.log(googleOrder.status);
   // Logger.log(googleOrder.id);
    if (googleOrder.status == "pendingShipment") {

      var lineItems = [];
      for (var indexOfLineItems = 0; indexOfLineItems < googleOrder.lineItems.length; indexOfLineItems++) {

        var lineItem = googleOrder.lineItems[indexOfLineItems];
        var lineItemID = lineItem.id;
        var lineItemQty = lineItem.quantityOrdered;
        lineItems.push({
          "lineItemId": lineItemID,
          "quantity": lineItemQty
        })
      }
      try {
        ShoppingContent.Orders.shiplineitems({
          "operationId": "ship-" + orderID,
          "lineItems": lineItems,
          "shipmentInfos": [{
            "shipmentId": "ship-" + orderID,
            "carrier": carrier,
            "trackingId": trackingNumber
          }]

        }, 121694571, orderID)

      } catch (err) {
        Logger.log(err)
      }
    }
  }catch(err){Logger.log(err)}

}
}
