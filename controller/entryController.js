const model = require("../model/index");
const { Op } = require("sequelize");
const { NOW } = require("sequelize/lib/data-types");
const controller = {};


controller.getAll = async function (req, res) {
    try {
        console.log(req.body,"kbjhsdbbvshbb")
        const entryData = await model.entry.findAll();
        console.log(entryData);
        if (entryData.length > 0) {
             res
                .status(200)
                .json({ message: "Connection successful", data: entryData });
        } else {
            res.status(200).json({ message: "Connection failed", data: [] });
        }
    } catch (error) {
        res.status(404).json({ message: error });
    }
};

controller.getname = async function (req, res) {
    try {
        var entryData = await model.entry.findAll({
        where: { name: { [Op.like]: `%${req.params.name}%` } },
        });
        if (entryData.length > 0) {
            res
            .status(200)
            .json({ message: "Connection successful", data: entryData });
        } else {
        res.status(200).json({ message: "Connection failed", data: [] });
        }
    } catch (error) {
        res.status(404).json({ message: error });
    }
};

controller.createNew = async function (req, res) {
    try {
        console.log("aacbhjhdcbjbdjdj",req.body)
        req.body=req.body.values;
        //   check data has already been created
        const checkData = await model.entry.findAll({
        where: {
            [Op.or]: {
                name: req.body.name
                },
            },  
        });

        
        console.log( checkData,"aacbhj")
    if (checkData.length > 0) {
        res.status(500).json({ message: "entry has already in use" });
    } else {
        let time= new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')  
        await model.entry
            .create({
                name: req.body.name,
                emailId: req.body.emailId,
                activedays: req.body.activedays,
                pricesig: req.body.pricesig,
                criteria: req.body.criteria,
                value: req.body.value,
                phoneNumber: req.body.phoneNumber,
                created_at: time
        })
        .then((result) => {
            res.status(201).json({
            message: "entry successful created",data: {
                name: req.body.name,
                emailId: req.body.emailId,
                dateparam: req.body.dateparam,
                value: req.body.value,
                },
            });
        });
    }
    } catch (error) {
        res.status(404).json({ message: error });
    }
};



module.exports = controller;
