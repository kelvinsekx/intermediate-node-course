const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = 8001;
const app = express();

const User = require("./models/User");
mongoose.connect("mongodb://localhost/userData");

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`server is listening on port:${port}`);
});

// CREATE
app.post("/users", (req, res) => {
  // User.create()
  User.create(
    {
      name: req.body.newData.name,
      email: req.body.newData.email,
      password: req.body.newData.password,
    },
    (err, data) => {
      if (err) {
        res.json({ success: false, message: err });
      } else if (!data) {
        res.json({ success: false, message: "Not Found" });
      } else {
        res.json({ success: true, data: data });
      }
    }
  );
});

app
  .route("/users/:id")
  // READ
  .get((req, res) => {
    // User.findById()
    User.findById(req.params.id, (err, data) => {
      if (err) {
        res.json({
          success: false,
          message: err,
        });
      } else if (!data) {
        res.json({
          success: false,
          message: "Not Found",
        });
      } else {
        res.json({
          success: true,
          data: data,
          message: "Good job",
        });
      }
    });
  })
  // UPDATE
  .put((req, res) => {
    // User.findByIdAndUpdate()
    User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.newData.name,
        email: req.body.newData.email,
        password: req.body.newData.password,
      },
      { new: true },
      (err, data) => {
        if (err) {
          res.json({
            success: false,
            message: err,
          });
        } else if (!data) {
          res.json({
            success: false,
            message: "No data Found",
          });
        }else{
          res.json({
            success:true,
            data:data
          })
        }
      }
    );
  })
  // DELETE
  .delete((req, res) => {
     User.findByIdAndDelete(
      req.params.id,
      (err,data)=>{
        if (err){
          res.json({
            success: false,
            message: err
          })
        } else if (!data){
          res.json({
            success: false,
            message: "Not Found"
          })
        } else {
          res.json({
            success: true,
            data: data
          })
        }
      }
     )
  });
