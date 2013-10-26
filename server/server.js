var express = require('express'),
    app = express(),
    paypal_api = require('paypal-rest-sdk'),
    config_opts = {
        'host': 'api.sandbox.paypal.com',
        'port': '',
        'client_id': 'AZbP6BAPPjqPn4rSDqDu5AZFw3SSJ9-hmGfHy9V3GUYH9yCMjH5W79oXDgVK',
        'client_secret': 'EHbEExBti4TmoHjQUun2o4na5gb987zGO0Yi8dpXPw4uN_jNPE8hzyj8AoJc'
    };

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
};

var create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http:\/\/localhost\/test\/rest\/rest-api-sdk-php\/sample\/payments\/ExecutePayment.php?success=true",
        "cancel_url": "http:\/\/localhost\/test\/rest\/rest-api-sdk-php\/sample\/payments\/ExecutePayment.php?success=false"
    }
};

app.configure(function() {
    app.use(allowCrossDomain);
});

app.use(express.bodyParser());

app.post("/", function(request, response){
    // console.dir(request.body);
    var currency = request.body.amount.currency,
        total = request.body.amount.total;

    create_payment_json.transactions = [{
        "amount": {
            "currency": currency,
            "total": total
        },
        "description": request.body.description
    }];

    paypal_api.payment.create(create_payment_json, config_opts, function (err, res) {
        if (err) {
            throw err;
        }

        if (res) {
            console.log("Create Payment Response");
            console.log(res);
        }
    });

    response.send(create_payment_json);
});

app.listen(3000, function(){
    console.log('listening to 3000...');
});