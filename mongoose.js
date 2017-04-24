/**
 * Created by exaveb on 24.04.2017.
 */
var mongoose = require('mongoose');
var config = require('./config');

mongoose.connect(config.get('mongoose:uri'), config.get('mongoose:options'));

module.exports = mongoose;

