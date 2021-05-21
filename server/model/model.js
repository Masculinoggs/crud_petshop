const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    nome : {
        type : String,
        required: true
    },
   
    idade : {
        type: String,
        required: true
    },
    
    raca : {
        type: String,
        required: true
    },
    
    dono : {
        type: String,
        required: true
    },

    telefone : {
        type: String,
        required: true
    },
    
    especie : String
})

const  Petdb = mongoose.model('petdb', schema);

module.exports = Petdb;