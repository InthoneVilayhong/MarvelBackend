const express = require("express");
const router = express.Router();
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

const User = require("../models/User");
//************************ ROUTE /user/signup Pour signup un nouvel user ******************/

//TODO Gestion des erreurs
//TODO meme mdp
//TODO pas de mail
//TODO pas de mdp
//TODO mail deja utilisé
//TODO champs name vide

router.post("/user/signup", async (req, res) => {
    const { email, username, password, confirm } = req.fields;
    // console.log("route /user/signup");
    try {
        if (password !== confirm) {
            res.status(400).json({
                message: "Tes mots de passe ne sont pas similaires !",
            });
        } else if (!email) {
            res.status(400).json({
                message: "Indique ton mail !",
            });
        } else if (!password) {
            res.status(400).json({
                message: "Indique ton mot de passe !",
            });
        } else {
            const passwordUser = password;
            const saltUser = uid2(16);
            const hashUser = SHA256(passwordUser + saltUser).toString(
                encBase64
            );
            const tokenUser = uid2(16);

            //! Deux conditions on verifie d'abord si l'username est bien renseigné et ensuite si l'email existe
            const emailExist = await User.findOne({ email: email });

            if (req.fields.username) {
                if (emailExist === null) {
                    const newUser = new User({
                        email: email,
                        username,
                        token: tokenUser,
                        hash: hashUser,
                        salt: saltUser,
                    });

                    await newUser.save();
                    res.status(200).json({
                        _id: newUser.id,
                        token: tokenUser,
                        username,
                        email,
                    });
                } else {
                    res.status(400).json({
                        message: "Le mail de ce super héro est déjà utilisé",
                    });
                }
            } else {
                res.status(400).json({
                    message: "Indique ton nom de super héro",
                });
            }
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// ********************** ROUTE /user/login Pour login un user **************** /

router.post("/user/login", async (req, res) => {
    console.log("email===>", req.fields.email);
    console.log("password==>", req.fields.password);
    try {
        const userToLog = await User.findOne({ email: req.fields.email });

        if (userToLog) {
            const passwordUser = req.fields.password;
            const hashUser = SHA256(passwordUser + userToLog.salt).toString(
                encBase64
            );

            console.log("newhash", hashUser);
            console.log("hashdelutilisateur", userToLog.hash);

            if (hashUser === userToLog.hash) {
                res.json({
                    id: userToLog._id,
                    email: userToLog.email,
                    token: userToLog.token,
                    name: userToLog.username,
                });
            } else {
                res.status(400).json({
                    message: "Mail ou mot de passe incorrect",
                });
            }
        } else {
            res.status(400).json({ message: "Mail ou mot de passe incorrect" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
