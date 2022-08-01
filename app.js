const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/", function(req,res){
    const firstName= req.body.fname;
    const lastName= req.body.lname;
    const email= req.body.email;
    
    const data= {
        members: [
        {   email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME:  lastName
            }
        }
        ]
    }
    const jsonData= JSON.stringify(data);
    const url= "https://us13.api.mailchimp.com/3.0/lists/ffd6d3f7f6";
    const options= {
        method: "POST",
        auth: "shahzadfq:36631c12cca1cd0f19b8f766ea88014f-us13"
    }

    const request= https.request(url, options, function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        } else {
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data", function(data){

        });
    });
    request.write(jsonData);
    request.end();

});

app.post("/success", function(req,res){
    res.redirect("/");
});

app.post("/failure", function (req, res){
    res.redirect("/");
  });

app.listen(process.env.PORT||3000, function(){
    console.log("Server is running at port 3000");
});


//API Key-36631c12cca1cd0f19b8f766ea88014f-us13
//List Id-ffd6d3f7f6