export class PackagePayment {
  constructor(gross_amount, order_id, options, pkg) {
    this.payment_type = 'bank_transfer';
    this.transaction_details = {
      gross_amount: gross_amount,
      order_id: order_id
    };
    this.customer_details = {
      email: options.email || 'noreply@mail.co',
      first_name: options.first_name || options.email || 'anon',
      last_name: options.last_name || 'doe',
      phone: options.phone || '+6281 1234 1234'
    };

    this.item_details = [
      {
        id: pkg.id,
        price: gross_amount,
        name: pkg.name,
        quantity: 1
      }
    ];

    this.bank_transfer = {
      bank: options.bank || 'bni'
    };

    this.custom_expiry = {
      expiry_duration: options.expireMin || 2,
      unit: 'minute'
    };
  }
}
