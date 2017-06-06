var express = require('express');
var Bear  = require('../models/bears');
var Duck  = require('../models/ducks');
var router = express.Router();


// define the home page route
router.get('/', function(req, res) {
  res.send('Sberbank home page');
});

router.get('/decline/:bear_id', function(req, res, next) {

  Bear.findById(req.params.bear_id, function(err, bear) {
    if (err)
    {
        return next(err);

    }
              if (bear==undefined) return next("Not value in database")
              bear.status = 2;  // update the bears info
              bear.date2 = new Date();
              // save the bear
              bear.save(function(err) {
                if (err)
                {
                    return next(err);

                }

                  res.json({ message: 'Transfer decline!' });
              });
  });
});

router.get('/accept/:bear_id', function(req, res, next) {

  Bear.findById(req.params.bear_id, function(err, bear) {
              if (err)
              {
                  return next(err);

              }

              if (bear==undefined) return next("Not value in database")
              bear.status = 1;  // update the bears info
              bear.date2 = new Date();
              // save the bear
              bear.save(function() {
                if (err)
                {
                    return next(err);

                }

                  res.json({ message: 'Transfer accept!' });
              });
  });
});

//bears===============================================================================
//============================================================================================
router.get('/transfers', function(req, res,next) {
  res.setHeader('Content-Type', 'application/JSON');
  var query = Bear.find({});
  query.where('nick').exists();
  query.where('transfer_amount').exists();
  if ((req.body.nick!==undefined) && (req.body.nick.length>0)){
    query.where('nick',req.body.nick);
  };
  if ((req.body.id!==undefined) && (req.body.id.length>0)){
    query.where('_id',req.body.id);
  };
  var status= parseInt(req.body.status);

  if( !isNaN(status) && (status>=0 && status<=2)) {
    query.where('status',status);
  }

  query.exec(function(err,bears){
    if (err)
    {
        return next(err);

    }
          var tr=[];
          for (var key in bears) {
            tr.push({id:bears[key]._id,  status:bears[key].status,  nick: bears[key].nick,transfer_amount :bears[key].transfer_amount, date_of_request:bears[key].date1, date_of_confirm:bears[key].date2});
            console.log(tr[key]);

          }
          res.end(JSON.stringify(tr, null, 2));
          //res.json(bears);
      });
  });



  /*router.delete('/bears',function(req, res) {

  if ((req.body.id!==undefined) && (req.body.id.length>0)){
    Bear.remove({ _id: req.body.id},
      function(err, bear) {
        if (err)
          res.send(err);
          if(bear.result.n==0){
            res.status(400);
          res.json('unsuccess')
        }
          else {res.json('success')}
        }
      );
      };

  if ((req.body.nick!==undefined) && (req.body.nick.length>0)){
      Bear.remove({
           nick: req.body.nick
      }, function(err, bear) {
          if (err)
            res.send(err);
            if(bear.result.n==0){
              res.status(400);
            res.json('unsus=ccess')
          }
            else {res.json('success')}
          });
      }

  });
*/
router.post('/transfers',function(req, res, next) {

  var bear = new Bear();
  // use our bear model to find the bear we want

  // update the bears info
    bear.nick = req.body.nick;
    bear.transfer_amount = req.body.transfer_amount;
var p= parseInt(req.body.transfer_amount);

if( !isNaN(p) &&  (req.body.nick.length>0)) {
  bear.save(function(err) {
    if (err)
    {
        return next(err);

    }

      res.status(200);
      res.json({ message: 'Transfer post!' });
    })
  }
else {
  res.status(400);
  res.json({ message: "Transfer not post! "+String(p)+"++"+req.body.nick});
  }
});



//ducks=======================================================================================
//============================================================================================
router.get('/accept/:bear_id', function(req, res, next) {

  Bear.findById(req.params.bear_id, function(err, bear) {
              if (err)
              {
                  return next(err);

              }

              if (bear==undefined) return next("Not value in database")
              bear.status = 1;  // update the bears info
              bear.date2 = new Date();
              // save the bear
              bear.save(function() {
                if (err)
                {
                    return next(err);

                }

                  res.json({ message: 'Transfer accept!' });
              });
  });
});


router.get('/username/:user_name', function(req, res, next) {
  res.setHeader('Content-Type', 'application/JSON');
  var query = Duck.find({});
  query.where('nick').exists();
  query.where('tel_number').exists();
  if ((req.params.user_name!==undefined) && (req.params.user_name.length>0)){
    query.where('name',req.params.user_name);
  };
  query.exec(function( err,ducks){
    if (err)
    {
        return next(err);

    }
          var tr=[];
          for (var key in ducks) {
            tr.push({name:ducks[key].name,  nick: ducks[key].nick,tel_number :ducks[key].tel_number});
            console.log(tr[key]);

          }
          if (tr.length==0) return next("error");
          res.end(JSON.stringify(tr, null, 2));
          //res.json(bears);
      });

  });

router.get('/users/:user_nick', function(req, res, next) {
  res.setHeader('Content-Type', 'application/JSON');
  var query = Duck.find({});
  query.where('nick').exists();
  query.where('tel_number').exists();
  if ((req.params.user_nick!==undefined) && (req.params.user_nick.length>0)){
    query.where('nick',req.params.user_nick);
  };
  query.exec(function( err,ducks){
    if (err)
    {
        return next(err);

    }
          var tr=[];
          for (var key in ducks) {
            tr.push({name:ducks[key].name,  nick: ducks[key].nick,tel_number :ducks[key].tel_number});
            console.log(tr[key]);

          }
          if (tr.length==0) return next("error");
          res.end(JSON.stringify(tr, null, 2));
          //res.json(bears);
      });

  });

router.get('/users', function(req, res, next) {
  res.setHeader('Content-Type', 'application/JSON');
  var query = Duck.find({});
  query.where('nick').exists();
  query.where('tel_number').exists();
  if ((req.body.nick!==undefined) && (req.body.nick.length>0)){
    query.where('nick',req.body.nick);
  };
  if ((req.body.name!==undefined) && (req.body.name.length>0)){
    query.where('name',req.body.name);
  };
  var p= parseInt(req.body.tel_number);
  if (!isNaN(p)){
    query.where('tel_number',p);
  };
  query.exec(function( err,ducks){
    if (err)
    {
        return next(err);

    }
          var tr=[];
          for (var key in ducks) {
            tr.push({name:ducks[key].name,  nick: ducks[key].nick,tel_number :ducks[key].tel_number});
            console.log(tr[key]);

          }
          res.end(JSON.stringify(tr, null, 2));
          //res.json(bears);
      });

  });

  router.post('/users',function(req, res, next) {

    var duck = new Duck();
    // use our bear model to find the bear we want

      duck.name = req.body.name;  // update the bears info
      duck.tel_number = req.body.tel_number;
      duck.nick = req.body.nick;

      var p= parseInt(req.body.tel_number);

      if( !isNaN(p) && (req.body.name.length>0)&& (req.body.nick.length>0)) {
        duck.name =duck.name.toLowerCase();
        duck.nick=duck.nick.toLowerCase();
        duck.save(function(err) {
          if (err)
          {
            res.status(400);

              return next(err);

          }
              res.status(200);
              res.json({ message: 'User post!' });
        });
      }

      else {
        res.status(400);
        res.json({ message: 'User not post!' });
      }
  });





  router.delete('/users/nick/:nick', function(req, res, next) {
                Duck.remove({ nick: req.params.nick},
                  function(err, user) {
                    if (err)
                      return next(err);
                      numbers = JSON.parse(user);

                      if(numbers["n"]==0){
                        return next("unsuccess");
                        res.json('unsuccess')
                    }
                      else {res.json("success")}
                    }
                  );

  });


  router.delete('/users',function(req, res, next) {
  if ((req.body.nick!==undefined) && (req.body.nick.length>0)){
    Duck.remove({ nick: req.body.nick},
      function(err, user) {
        if (err)
          return next(err);
          numbers = JSON.parse(user);

          if(numbers["n"]==0){
            return next("unsuccess");
            res.json('unsuccess')
        }
          else {res.json("success")}
        }
      );
      };

      var p= parseInt(req.body.tel_number);

      if( !isNaN(p)){
        Duck.remove({ tel_number: req.body.tel_number},
          function(err, user) {
            if (err)
              return next(err);
              numbers = JSON.parse(user);
              if (numbers["n"]==0) {return next("Not value in database")}
              else {res.json("success")}
            }
          );
          };

  });


module.exports = router;
