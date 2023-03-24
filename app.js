const express  = require ("express")
const https = require("https");

var app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname+"/public/signup.html")
});

app.post("/", function(req, res){
    const Email = req.body.email;
    const fName = req.body.fname;
    const lName = req.body.lname;
    
    const data = {
        members: [
            {
                email_address: Email,
                status: "subscribed",
                merge_fields:{
                    FNAME: fName,
                    LNAME: lName,
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data); 

    const url = "https://us13.api.mailchimp.com/3.0/lists/3b5181477b";

    const options = {
        method: "POST",
        auth:"ahmad1:0c6c627e40163848aae6d6fe95c52882-us13"
    }

    const request = https.request(url, options, function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname+"/public/success.html");
        }
        else{
            res.sendFile(__dirname+"/public/failure.html")
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
        console.log(response.statusCode);
    })

    request.write(jsonData);
    request.end();
});

app.post("/failure", function(req, res){
    res.redirect("/");
});

app.post("/success", function(req, res){
    res.redirect("/");
})


app.listen(3000, function(){
    console.log("The server was started on port 3000");

    //0c6c627e40163848aae6d6fe95c52882-us13

    //3b5181477b
});