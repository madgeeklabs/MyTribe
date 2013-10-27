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
        "return_url": "http:\/\/54.247.168.152:80\/#\/?success=true",
        "cancel_url": "http:\/\/54.247.168.152:80\/#\/?success=true"
    },
    "transactions": [{
        "amount": {
            "total": "0",
            "currency": "USD"
        },
        "description": "This is the payment transaction description."
    }]
};

app.configure(function() {
    app.use(allowCrossDomain);
});

app.use(express.bodyParser());

app.post("/", function(request, response){
    var currency = request.body.amount.currency,
        total = request.body.amount.total,
        description = request.body.description;

    create_payment_json.transactions[0].amount.total = total;
    create_payment_json.transactions[0].amount.currency = currency;
    create_payment_json.transactions[0].description = description;

    paypal_api.payment.create(create_payment_json, config_opts, function (error, res) {
        if(error){
            throw error;
        } else {
            response.json({ 'redirect': res.links[1].href + '&useraction=commit' });
        }
    });
});

app.listen(3000, function(){
    console.log('listening to 3000...');
});