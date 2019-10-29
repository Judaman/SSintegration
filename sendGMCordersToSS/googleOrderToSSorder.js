module.exports ={googleOrderToSSorder:function(googleOrder){

var order = {};
var totalTax = 0;
var statuses = {
  "canceled": "cancelled",
  "pendingShipment": "awaiting_shipment",
  "shipped": "shipped"
}
var status = statuses[googleOrder.status];
order.billTo = {};
order.shipTo = {};
order.advancedOptions = {};
order.orderNumber = googleOrder.id;
order.orderKey = googleOrder.id;
order.orderDate = googleOrder.placedDate;
order.shipBydate = googleOrder.lineItems[0].shippingDetails.shipByDate;
order.orderStatus = status;
order.customerUsername = googleOrder.customer.fullName; //fullName
order.customerEmail = googleOrder.customer.email;
order.billTo.name = googleOrder.billingAddress.recipientName;
//    order.billTo.company = null;
//    order.billTo.street1 = null;
//    order.billTo.street2 = null;
//    order.billTo.street3 = null;
order.billTo.city = googleOrder.billingAddress.locality;
order.billTo.state = googleOrder.billingAddress.region;
order.billTo.postalCode = googleOrder.billingAddress.postalCode;
order.billTo.country = googleOrder.billingAddress.country;
//  order.billTo.phone = null;
//  order.billTo.residential = null;
order.shipTo.name = googleOrder.deliveryDetails.address.recipientName;
//    order.shipTo.company = null;
order.shipTo.street1 = googleOrder.deliveryDetails.address.streetAddress.toString();
//    order.shipTo.street2 = null;
//    order.shipTo.street3 = null;
order.shipTo.city = googleOrder.deliveryDetails.address.locality;
order.shipTo.state = googleOrder.deliveryDetails.address.region;
order.shipTo.postalCode = googleOrder.deliveryDetails.address.postalCode;
order.shipTo.country = googleOrder.deliveryDetails.address.country;
order.shipTo.phone = googleOrder.deliveryDetails.phoneNumber;
//  order.shipTo.residential = null;
order.items = [];
for (var indexOfItems = 0; indexOfItems < googleOrder.lineItems.length; indexOfItems++) {
  var googlLineItem = googleOrder.lineItems[indexOfItems];
  var lineItem = {};
  lineItem.lineItemKey = googlLineItem.id;
  try {
    var upc = googlLineItem.product.gtin;
    upc = upc.slice(2, upc.length)
  } catch (err) {
    var upc = googlLineItem.product.mpn;
    console.log(err + " using MPN instaed of SKU")
  };
  lineItem.sku = upc;
  lineItem.name = googlLineItem.product.title;
  lineItem.imageUrl = googlLineItem.product.shownImage;
  //    lineItem.weight.value = ;
  //    lineItem.weight.units = ;
  lineItem.quantity = googlLineItem.quantityOrdered;
  lineItem.unitPrice = googlLineItem.product.price.value;
  lineItem.taxAmount = googlLineItem.tax.value;
  totalTax += parseFloat(googlLineItem.tax.value);
  //  lineItem.shippingAmount = ;
  //  lineItem.productId = ;
  //  lineItem.upc =  ;
  order.items.push(lineItem)
}
//  order.amountPaid = googleOrder.netAmount.value;
order.taxAmount = totalTax;
//  order.shippingAmount = ;
order.advancedOptions.storeId = 82579;
//console.log(order);
return order;
//order.customerId = null; no such option in Google Orders
}
}
