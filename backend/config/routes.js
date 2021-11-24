const express = require('express')


module.exports = function(server){
    // API ROUTES
    const router = express.Router()
    server.use('/api', router)

    // Rotas da API

    //billingCycles
    const billingCycleService = require('../api/billingCycle/billingCycleService')
    billingCycleService.register(router, '/billingCycles')
    
    //billingSummary
    const billingSummaryService = require('../api/billingSummary/billingSummaryService')
    router.route('/billingSummary').get(billingSummaryService.getSummary)
}