const Pirata = require("../models/pirata.model");

module.exports.get_all = (req, res) => {
    Pirata.find().sort({name: 1})
    .then(piratas => res.json(piratas))
    .catch(err => {res.status(400).json(err)});
}

module.exports.create_pirata = (req,res) =>{
    Pirata.findOne({position: "Captain"})
    .then(pirata=>{
        if(pirata != null){
            if(req.body.position=="Captain"){
                let err = {"errors": {"position":{"message": "There's only one Captain!"}}};
                res.status(400).json(err);
            }
            else{
                Pirata.create(req.body)
                .then(pirata => res.json(pirata))
                .catch(err => {res.status(400).json(err)});
            }
        }
        else{
            Pirata.create(req.body)
            .then(pirata => res.json(pirata))
            .catch(err => {res.status(400).json(err)});
        }
    })
}

module.exports.get_pirata = (req,res) => {
    Pirata.findOne({_id: req.params.id})
    .then(pirata => res.json(pirata))
    .catch(err => {res.status(400).json(err)});
}

module.exports.update_pirata = (req,res) =>{
    Pirata.findByIdAndUpdate({_id: req.params.id}, req.body, {new:true}, {runValidators:true})
    .then(pirata => res.json(pirata))
    .catch(err => {res.status(400).json(err)});
}

module.exports.delete_pirata = (req, res) =>{
    Pirata.deleteOne({_id: req.params.id})
    .then(result => res.json(result))
    .catch(err => {res.status(400).json(err)});
}