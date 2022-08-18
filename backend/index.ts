import functions = require("firebase-functions");
import express = require("express");
//  import cors = require("cors");
import admin = require("firebase-admin");

const app = express();
admin.initializeApp();

app.get("/pid", async (req, res) =>{
  const choices = req.query.choices;
  if (choices) {
    const snapshot = await admin.firestore().collection("peersarray")
        .where("choices", "==", choices).orderBy("date").limit(1).get();
    let key = "";
    snapshot.forEach((doc) =>{
      key = doc.data().key;
      if (key) {
        admin.firestore().collection("peersarray").doc(doc.id).delete();
      }
    });
    res.status(200).send({key});
  } else {
    res.status(400).send();
  }
});


app.post("/pid", async (req, res) =>{
  const id = (req.body.id);
  if (id && id.split("-")[3]) {
    const data = {key: id, choices: id.split("-")[3], date: new Date()};
    await admin.firestore()
        .collection("peersarray")
        .add(data);
    res.status(201).send();
  } else {
    res.status(400).send();
  }
});

exports.user = functions.https.onRequest(app);
