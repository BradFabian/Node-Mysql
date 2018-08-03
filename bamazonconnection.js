var mysql = require("mysql");
var inquirer = require("inquirer");
const Tablefy = require("tablefy");
var figlet = require('figlet');


var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Flyingslow88!",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  
});


let table = new Tablefy()

connection.query("SELECT * FROM products", (err,res)=>{
  table.draw(res);
  start()
});

figlet("BAMAZON", function (err, data) {
  if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
  }
  console.log(data)
});


function start() {
  inquirer
      .prompt([
          {
              name: "item_id",
              type: "input",
              message: "What Item ID would you like to purchase?",
              validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                } else {
                return false;
              }
            }
          },
          
          {
              name: "quantity",
              type: "input",
              message: "How many would you like to purchase?",
              validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                } else {
                return false;
              }
          },
        }            
      ]).then(function (input){
        //console.log("input: ", input)
        var item = input.item_id;
        var quantity = input.quantity;
        var querySQL = "SELECT * FROM products WHERE item_id = " + item;
       
        connection.query(querySQL, function(err, data) {
          //console.log(data)
         // console.log("error: ", err)
          
          
          var charArray = data.length;

        for(var i = 0; i < charArray; i++ ) {
        if(parseInt(item) === data[i].item_id && parseInt(quantity) > data[i].stock_quantity ){
          
          console.log("Insufficient quantity! Your order can not be placed. \nPlease Modify Order.")
          console.log("--------------------------------------------")
          start()
        }
           else {
              
              // place order: calculate total cost of order
              var cost = parseFloat(data[i].price) * parseInt(quantity);
              console.log("-----------------------------------");
              console.log("Your order has been placed! \nThe total cost is $" + cost.toFixed(2) + "\nThank you!")
              // update StockQuantity amount
                var newQty = parseInt(data[i].stock_quantity) - parseInt(quantity);
                var dataName = data[i].product_name
              console.log("----------------------------------");
              console.log(dataName + " has " + newQty + " left in stock...");
              //updateProduct()

            /*  function updateProduct() {
                console.log("Updating all " + dataName + " quantities...\n");
                var query = connection.query(
                  "UPDATE products SET ? WHERE item_id= " + item,
                  [
                    {
                      quantity: newQty,
                    
                    },
                    
                  ],)
                  console.log(query.sql);
                  
                 // connection.query("SELECT * FROM products", (err,res)=>{
                  //  Tablefy(res);
                   // start()
                 // });*/
              //  }//
              
            } 
          }
          })
        
      })

     
  }

  