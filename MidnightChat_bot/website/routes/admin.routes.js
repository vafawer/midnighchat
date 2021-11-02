const express = require('express')
const router = express.Router()
const adsController = require('../controllers/ads.controller')
const models = require('../../db/models');

router.get('/ads', function(req, res, next) {
  models.ad.findAll().then(function(ads) {
    res.render('ads', {
      title: 'list of ads',
      ads: ads
    });
  });
});

  router.get('/users', function(req, res, next) {
    models.user.findAll().then(function(users) {
      res.render('users', {
        users: users,
      }); 
    }); 
  });

router.get('/apps', function(req, res, next) {
  models.application.findAll().then(function(apps) {
    res.render('apps', {
      apps: apps,
    }); 
  }); 
});



    

    /* models.user.findAll().then(function(users) {
        res.render('admin', {
          title: 'list of people',
          users: users
        });
      });
    models.application.findAll().then(function(application) {
        res.render('admin', {
            title: 'list of application',
            application: application
        });
    });
    models.company.findAll().then(function(company) {
        res.render('admin', {
          title: 'list of company',
          company: company
        });
      });   
  });*/




  module.exports = router