var Petdb = require('../model/model');

// criar e salvar novo animal de estimação
exports.create = (req,res)=>{
    // validar pedido
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    //novo animal de estimação
    const pet = new Petdb({
        nome : req.body.nome,
        idade : req.body.idade,
        raca : req.body.raca,
        especie: req.body.especie,
        dono : req.body.dono,
        telefone : req.body.telefone
    })

    //salvar animal de estimação no banco de dados
    pet
    .save(pet)
    .then(data => {
        res.redirect('/add-pet');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });
}

// recuperar e devolver todos os animais de estimação / recuperar e devolver um único animal de estimação
exports.find = (req, res)=>{
    if(req.query.id){
        const id = req.query.id;

        Petdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found pet with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving pet with id " + id})
            })
        }else{
            Petdb.find()
            .then(pet => {
                res.send(pet)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving pet information" })
            })
    }
}

//Atualizar um novo animal de estimação idetificado por id de animal de estimação
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Petdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update pet with ${id}. Maybe pet not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update pet information"})
        })
}

// Exclua um animal de estimação com a identificação de animal de estimação especificada na solicitação
exports.delete = (req, res)=>{
    const id = req.params.id;

    Petdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "pet was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete pet with id=" + id
            });
        });
}