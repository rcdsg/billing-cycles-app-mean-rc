const _ = require('lodash');
const BillingCycle = require('../billingCycle/billingCycle')


// One more middleware
function getSummary(req, res){
BillingCycle.aggregate({
    $project: { credit: {$sum: "$credits.value"}, debt: {$sum: "$debts.value"} }
}, {
    $group:{_id: null, credit: {$sum: "$credit"}, debt: {$sum: "$debt"}}   
}, {
    $project: {_id: 0,credit: 1, debt:1} // 1 = true
},
    function(error, result){
        if(error){
            res.status(500).json({errors: [error]})
        }else{
                res.json(_.defaults( result[0], {credit: 0, debt: 0}))
        }
    })
}

BillingCycle.methods(['get','post','put','delete'])
BillingCycle.updateOptions({new: true, runValidators: true})

BillingCycle.route('count', function(req,res, next){
    BillingCycle.count(function(error, value){
        if(error){
            res.status(500).json({errors: [error]})
        }else{
            res.json({value})
        }
    })
})

module.exports = { getSummary }