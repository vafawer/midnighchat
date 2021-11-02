const express = require('express')
const router = express.Router()
const adsController = require('../controllers/ads.controller')
const models = require('../../db/models');

router.get('/hirer', function(req, res, next) {
    models.ad.findAll().then(function(ads) {
      models.application.findAll().then(function(apps) {
        res.render('hirer', {
          title: 'list of ads',
          ads: ads,
          apps: apps,
        });
    });
  });
});


router.get('/apps', function(req, res, next) {

});
module.exports = router