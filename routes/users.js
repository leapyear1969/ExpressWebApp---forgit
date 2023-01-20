/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

var express = require('express');
var router = express.Router();

var fetch = require('../fetch');
var cancel = require('../cancel');

var { GRAPH_ME_ENDPOINT, FLOW_CANCEL_ENDPOINT } = require('../authConfig');

// custom middleware to check auth state
function isAuthenticated(req, res, next) {
    if (!req.session.isAuthenticated) {
        return res.redirect('/auth/signin'); // redirect to sign-in route
    }

    next();
};

router.get('/id',
    isAuthenticated, // check if user is authenticated
    async function (req, res, next) {
        res.render('id', { idTokenClaims: req.session.account.idTokenClaims });
    }
);

router.get('/profile',
    isAuthenticated, // check if user is authenticated
    async function (req, res, next) {
        try {
             //const graphResponse = await fetch(GRAPH_ME_ENDPOINT, req.session.accessToken);
            //res.render('profile', { profile: graphResponse });
            const graphResponse =await fetch("https://api.powerautomate.cn/providers/Microsoft.ProcessSimple/environments/64b53608-f2f3-41da-9093-67e246d0d078/flows/754ac2b9-23ff-444b-88b4-3e4d110d0a06/runs?api-version=2016-11-01&$filter=Status%20eq%20%27running%27",req.session.accessToken);
            // Handlebars.registerHelper('json',function(graphResponse){
            //     return JSON.stringify(graphResponse);
            // })
            graphResponse.stringify = JSON.stringify(graphResponse);
            //var json = JSON.parse(graphResponse);
            console.log(graphResponse.stringify);

            res.render('profile', { profile: graphResponse.stringify });
        } catch (error) {
            next(error);
        }
    }
);

router.post('/cancelflow',
    isAuthenticated,
    async function (req, res ,next){
        try{
            const graphResponse = await cancel(FLOW_CANCEL_ENDPOINT,req.session.accessToken);
            res.render('')
        }catch(error) {
            next(error);
        }
    }
);




module.exports = router;