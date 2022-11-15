const model = require("../model/index");
const { Op } = require("sequelize");
const { NOW } = require("sequelize/lib/data-types");
const controller = {};


controller.getAll = async function (req, res) {
    try {
        console.log(req.body,"kbjhsdbbvshbb")
        const userData = await model.user.findAll();
        console.log(userData);
        if (userData.length > 0) {
             res
                .status(200)
                .json({ message: "Connection successful", data: userData });
        } else {
            res.status(200).json({ message: "Connection failed", data: [] });
        }
    } catch (error) {
        res.status(404).json({ message: error });
    }
};

controller.getname = async function (req, res) {
    try {
        var userData = await model.user.findAll({
        where: { name: { [Op.like]: `%${req.params.name}%` } },
        });
        if (userData.length > 0) {
            res
            .status(200)
            .json({ message: "Connection successful", data: userData });
        } else {
        res.status(200).json({ message: "Connection failed", data: [] });
        }
    } catch (error) {
        res.status(404).json({ message: error });
    }
};

controller.createNew = async function (req, res) {
    try {
        console.log("aacbhjhdcbjbdjdj   dcjnkdcsbk",req.body)
        //   check data has already been created
        const checkData = await model.user.findAll({
        where: {
            [Op.or]: {
                name: req.body.name
                },
            },
        });
        
        console.log( checkData,"aacbhj")
    if (checkData.length > 0) {
        res.status(500).json({ message: "user has already in use" });
    } else {
        let time= new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')  
        await model.user
            .create({
                name: req.body.name,
                emailId: req.body.emailId,
                dateparam: req.body.dateparam,
                value: req.body.value,
                phoneNumber: req.body.phoneNumber,
                created_at: time
        })
        .then((result) => {
            res.status(201).json({
            message: "user successful created",data: {
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


controller.editAt = async function (req, res) {
    try {
        await model.user
            .findAll({ where: { id: req.body.id } })
            .then(async (result) => {
                if (result.length > 0) {
                    await model.user.update(
                       {
                           name: req.body.name,
                           password: req.body.password,
                           token: req.body.name + req.body.password,
                        },
                        { where: { id: req.body.id } }
                    );
                    res.status(200).json({
                        message: "update successful",
                        data: {
                        id: req.body.id,
                        name: req.body.name,
                        password: req.body.password,
                        token: req.body.name + req.body.password,
                        },
                    });
                } else {
                    res.status(500).json({ message: "update failed" });
                }
            });
    } catch (error) {
        res.status(404).json({ message: error });
    }
};

controller.deleteUser = async function (req, res) {
    try {
        await model.user
            .findAll({ where: { id: req.body.id } })
            .then(async (result) => {
        if (result.length > 0) {
            await model.user.destroy({ where: { id: req.body.id } });
            res.status(200).json({ message: "delete user successfully" });
        } else {
            res.status(404).json({ message: "id user not found" });
            }
        });
    } catch (error) {
        res.status(404).json({ message: error });
    }
};



module.exports = controller;
