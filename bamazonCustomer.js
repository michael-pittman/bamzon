var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table2');
var color = require('colors');


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: " ",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
console.log('Connected');
stock();

});


function stock() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    else {
        var table = new Table ({
            head: ['ID', 'Item', 'Department', 'Price', 'Quantity'],
            colWidths: [4, 20, 15, 8, 8]
        });
    }
      
    for (var i=0; i < res.length; i++) {
        table.push([res[i].id,
                    res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
    }
    console.log("\n")
    console.log(table.toString());
    console.log("\n")
    promptUserPurchase()            
                 });
}
  
  function promptUserPurchase() {
	// console.log('___ENTER promptUserPurchase___');

	// Prompt the user to select an item
	inquirer.prompt([
		{
			type: 'input',
			name: 'item_id',
			message: 'Please enter the Item ID which you would like to purchase.',
			
			filter: Number
		},
		{
			type: 'input',
			name: 'quantity',
			message: 'How many do you need?',
			
			filter: Number
		}
	]).then(function(input) {
		// console.log('Customer has selected: \n    item_id = '  + input.item_id + '\n    quantity = ' + input.quantity);

		var item = input.item_id;
		var quantity = input.quantity;

		// Query db to confirm that the given item ID exists in the desired quantity
		var queryStr = 'SELECT * FROM products WHERE ?';

		connection.query(queryStr, {id: item}, function(err, data) {
			if (err) throw err;

			// If the user has selected an invalid item ID, data attay will be empty
			// console.log('data = ' + JSON.stringify(data));

			if (data.length === 0) {
				console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
				stock();

			} else {
				var productData = data[0];

				// console.log('productData = ' + JSON.stringify(productData));
				// console.log('productData.stock_quantity = ' + productData.stock_quantity);

				// If the quantity requested by the user is in stock
				if (quantity <= productData.stock_quantity) {
					console.log('Congratulations, the product you requested is in stock! Placing order!');

					// Construct the updating query string
					var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE id = ' + item;
					// console.log('updateQueryStr = ' + updateQueryStr);

					// Update the inventory
					connection.query(updateQueryStr, function(err, data) {
						if (err) throw err;

						console.log('Your oder has been placed! Your total is $' + productData.price * quantity);
						console.log('Thank you for shopping with us!');
						console.log("\n---------------------------------------------------------------------\n");

						// End the database connection
						connection.end();
					})
				} else {
					console.log('Sorry, there is not enough product in stock, your order can not be placed as is.');
					console.log('Please modify your order.');
					console.log("\n---------------------------------------------------------------------\n");

					stock();
				}
			}
		})
	})
}
