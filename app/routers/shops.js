
var express = require('express');
var Bear  = require('../models/bears');
var Account  = require('../models/my_account');
var Order  = require('../models/shop_order');
var Product  = require('../models/shop_poduct');
var router = express.Router();


// define the home page route
router.get('/product', function(req, res) {
  res.send('Sberbank prod');
});

router.post('/product',function(req, res, next) {

  var product = new Product();
  product.product_name = req.body.product_name;
  product.prod_attributes = req.body.prod_attributes;
  var p= parseInt(req.body.price);
  product.price = p;
  if( !isNaN(p) &&  (req.body.product_name.length>0)) {
    product.save(function(err) {
        if (err)
        {
          return next(err);
        }
        res.status(200);
        res.json({ message: 'Product post!' });
      })
    }
    else {
      res.status(400);
      res.json({ message: "Product not post! "});
    }
});


router.get('/products', function(req, res,next) {
    res.setHeader('Content-Type', 'application/JSON');
    var query = Product.find({});
    query.where('product_name').exists();
    query.where('price').exists();
    if ((req.body.product_name!==undefined) && (req.body.product_name.length>0)){
      query.where('product_name',req.body.product_name);
    };
    if ((req.body.id!==undefined) && (req.body.id.length>0)){
      query.where('_id',req.body.id);
    };
    var price= parseInt(req.body.price);

    if( !isNaN(price) && (price>=0)) {
      query.where('price',price);
    }

    query.exec(function(err, products){
      if (err)
      {
          return next(err);

      }
            var tr=[];
            for (var key in products) {
              tr.push({id:products[key]._id,  price:products[key].price,  product_name: products[key].product_name});
              console.log(tr[key]);

            }
            res.end(JSON.stringify(tr, null, 2));
            //res.json(bears);
        });
});



router.get('/products/:product_name', function(req, res, next) {
      res.setHeader('Content-Type', 'application/JSON');
      var query = Product.find({});
      query.where('product_name').exists();
      query.where('price').exists();
      if ((req.params.product_name!==undefined) && (req.params.product_name.length>0)){
        query.where('product_name',req.params.product_name);
      };
      query.exec(function( err, products){
        if (err)
        {
            return next(err);

        }
              var tr=[];
              for (var key in products) {
                tr.push({id:products[key]._id, product_name:products[key].product_name,  price: products[key].price});
                console.log(tr[key]);

              }
              if (tr.length==0) return next("error");
              res.end(JSON.stringify(tr, null, 2));
              //res.json(bears);
          });

});
//============================================================================================================

router.post('/order',function(req, res, next) {

  var order = new Order();
  order.product_id = req.body.product_id;
  //order.amount = req.body.amount;
  var p= parseInt(req.body.amount);

  if( !isNaN(p) &&  (req.body.product_id.length>0)) {
    order.amount = req.body.amount;
    order.save(function(err) {
        if (err)
        {
          return next(err);
        }
        res.status(200);
        res.json({ message: 'Order post!' });
      })
    }
    else if((req.body.product_id>0)){
      order.save(function(err) {
          if (err)
          {
            return next(err);
          }
          res.status(200);
          res.json({ message: 'Order post!' });
        })
    }
    else {
      res.status(400);
      res.json({ message: "Order not post! "});
    }
});


router.get('/orders', function(req, res,next) {
    res.setHeader('Content-Type', 'application/JSON');
    var query = Order.find({});
    query.where('product_id').exists();
    query.where('amount').exists();
    if ((req.body.product_id!==undefined) && (req.body.product_id.length>0)){
      query.where('product_id',req.body.product_id);
    };

    query.exec(function(err, orders){
      if (err)
      {
          return next(err);

      }
            var tr=[];
            for (var key in orders) {
              tr.push({product_id:orders[key].product_id,  amount:orders[key].amount, date:orders[key].date});
              console.log(tr[key]);

            }
            res.end(JSON.stringify(tr, null, 2));
            //res.json(bears);
        });
});



router.get('/orders/:product_id', function(req, res, next) {
      res.setHeader('Content-Type', 'application/JSON');
      var query = Order.find({});
      query.where('product_id').exists();
      query.where('amount').exists();
      if ((req.params.product_id!==undefined) && (req.params.product_id.length>0)){
        query.where('product_id',req.params.product_id);
      }
      else{return next("error")};

      query.exec(function( err, orders){
        if (err)
        {
            return next(err);

        }
              var tr=[];
              for (var key in orders) {
                tr.push({product_id:orders[key].product_id,  amount:orders[key].amount});
                console.log(tr[key]);

              }
              if (tr.length==0) return next("error");
              res.end(JSON.stringify(tr, null, 2));
              //res.json(bears);
          });
});
//==========================================================================================================

router.post('/balance/:balance',function(req, res, next) {
  //account.login = "ivan";
  //order.amount = req.body.amount;
  var p= parseInt(req.params.balance);
  function callback (err, numAffected) {
    if (err)
    {
      return next(err);
    }
    res.status(200);
    res.json({ message: 'Account post!' });
  };
  var query = { login: "ivan" };
  options = { multi: true };
  Account.update(query, {  balance: p }, options, callback)

});


router.get('/balance', function(req, res,next) {
    res.setHeader('Content-Type', 'application/JSON');
    var query = Account.find({});
    query.where('login',"ivan");
    query.exec(function(err, account){
      if (err)
      {
          return next(err);

      }
            var tr=[];
            for (var key in account) {
              tr.push({balance:account[key].balance, login:account[key].login});
              console.log(tr[key]);

            }
            res.end(JSON.stringify(tr, null, 2));
            //res.json(bears);
        });
});
//====================================================================================================





router.get('/between', function(req, res,next) {
    res.setHeader('Content-Type', 'application/JSON');
    var tr=[];
    var from = new Date(req.body.from);
  //  var to = new Date(req.body.to);


    var query = Order.find({"date": {"$gte": from, "$lt": new Date()}})
    var query2 = Bear.find({"date1": {"$gte": from, "$lt": new Date()}})

    Promise.all([
      query.exec(),
      query2.exec(),
    ]).then(results => {
      console.log(results);
              for (var key in order=results[0]) {
                tr.push({product_id:order[key].product_id,  amount:order[key].amount, date:order[key].date });
              }
              for (var key in bears=results[1]) {
                tr.push({ status:bears[key].status,  nick: bears[key].nick,transfer_amount :bears[key].transfer_amount, date_of_request:bears[key].date1, date_of_confirm:bears[key].date2});
              }
              res.end(JSON.stringify(tr, null, 2));
    });



  });


function getDateAgo(date, days) {
  var dateCopy = new Date(date);

  dateCopy.setDate(date.getDate() - days);
  return dateCopy.getDate();
}
module.exports = router;
