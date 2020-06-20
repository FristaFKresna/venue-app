import { Router } from 'express';
import { PackagePayment } from '../../models/PaymentPayload';
import core from '../../config/midtrans';
import { Order } from '../../modelSQL/Venue';
const route = Router();

route.post('/charge', function(req, res) {
  console.log(`- Received charge request:`, req.body);
  core
    .charge()
    .then((apiResponse) => {
      res.send(`${JSON.stringify(apiResponse, null, 2)}`);
    })
    .catch((err) => {
      res.send(`${JSON.stringify(err.ApiResponse, null, 2)}`);
    });
});

// [4] Handle Core API check transaction status
route.post('/check', function(req, res) {
  console.log(`- Received check transaction status request:`, req.body);
  core.transaction.status(req.body.transaction_id).then((transactionStatusObject) => {
    let orderId = transactionStatusObject.order_id;
    let transactionStatus = transactionStatusObject.transaction_status;
    let fraudStatus = transactionStatusObject.fraud_status;

    let summary = `Transaction Result. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}.<br>Raw transaction status:<pre>${JSON.stringify(
      transactionStatusObject,
      null,
      2
    )}</pre>`;

    // [5.A] Handle transaction status on your backend
    // Sample transactionStatus handling logic
    if (transactionStatus == 'capture') {
      if (fraudStatus == 'challenge') {
        // TODO set transaction status on your databaase to 'challenge'
      } else if (fraudStatus == 'accept') {
        // TODO set transaction status on your databaase to 'success'
      }
    } else if (transactionStatus == 'settlement') {
      // TODO set transaction status on your databaase to 'success'
      // Note: Non card transaction will become 'settlement' on payment success
      // Credit card will also become 'settlement' D+1, which you can ignore
      // because most of the time 'capture' is enough to be considered as success
    } else if (transactionStatus == 'cancel' || transactionStatus == 'deny' || transactionStatus == 'expire') {
      // TODO set transaction status on your databaase to 'failure'
    } else if (transactionStatus == 'pending') {
      // TODO set transaction status on your databaase to 'pending' / waiting payment
    } else if (transactionStatus == 'refund') {
      // TODO set transaction status on your databaase to 'refund'
    }
    console.log(summary);
    res.send(JSON.stringify(transactionStatusObject, null, 2));
  });
});

// handle notif masuk
route.post('/receive_notif', function(req, res) {
  let receivedJson = req.body;
  core.transaction.notification(receivedJson).then((transactionStatusObject) => {
    let orderId = transactionStatusObject.order_id;
    let transactionStatus = transactionStatusObject.transaction_status;
    let fraudStatus = transactionStatusObject.fraud_status;

    let summary = `Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}.<br>Raw notification object:<pre>${JSON.stringify(
      transactionStatusObject,
      null,
      2
    )}</pre>`;
    console.log(summary);
    // [5.B] Handle transaction status on your backend via notification alternatively
    // Sample transactionStatus handling logic
    if (transactionStatus == 'capture') {
      if (fraudStatus == 'challenge') {
        // TODO set transaction status on your databaase to 'challenge'
      } else if (fraudStatus == 'accept') {
        // TODO set transaction status on your databaase to 'success'
      }
    } else if (transactionStatus == 'settlement') {
      // TODO set transaction status on your databaase to 'success'
      Order.update({ status: 'success' }, { where: { id: transactionStatusObject.order_id } })
        .then((order) => {
          res.send(order);
        })
        .catch((err) => {
          Order.update({ status: 'error' }, { where: { id: transactionStatusObject.order_id } });
          res.send(err);
        });
    } else if (transactionStatus == 'cancel' || transactionStatus == 'deny' || transactionStatus == 'expire') {
      Order.update({ status: transactionStatus }, { where: { id: transactionStatusObject.order_id } })
        .then((order) => {
          res.send(order);
        })
        .catch((err) => {
          Order.update({ status: 'error' }, { where: { id: transactionStatusObject.order_id } });
          res.send(err);
        });
    } else if (transactionStatus == 'pending') {
      // TODO set transaction status on your databaase to 'pending' / waiting payment
    } else if (transactionStatus == 'refund') {
      // TODO set transaction status on your databaase to 'refund'
      
    }
  });
});

export default route;
