const crypto = require("crypto");

var publickKey = "pk_test_Vlk842B1EA7tDN5QbrfGjYzh";
var amount = "10.000";
var currency = "KWD";
var transaction = "1111";
var post = "";

var baseString = `x_publickey${publickKey}x_amount${amount}x_currency${currency}x_transaction${transaction}x_post${post}`;
var privateKey = "sk_*****";

let hash = crypto
  .createHmac("sha256", privateKey)
  .update(baseString) // updating datas
  .digest("hex"); // Encoding to be used

console.log(baseString);
// Displays output
console.log(hash);
