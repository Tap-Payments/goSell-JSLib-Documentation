## Post

### How can you verify, its posted by Tap?

You can find the "hashstring" value in the post url header. You should create the hashstring from your end and match with the hashstring (posted by Tap in the header). If its matching, you can continue the process, otherwise mark as invalid transaction.

### How to create the hashstring and validate?

Pass the below values from the transaction details (charge / authorize):

| Variable | Type  | Status  | Description	 | 
| ------------- | ------------- | ------------- | ------------- |
| x_publickey | string  | **required**  | Your goSell public key. |
| x_amount | string  | **required**  | The total amount of the order. | 
| x_currency | string  | **required**  | The ISO currency code of the total amount. | 
| x_transaction | string  | **required**  | Transaction number in your reference. | 
| x_post | string  | **required**  | After payment completed, goSell Gateway will post the charge response to the this url | 
