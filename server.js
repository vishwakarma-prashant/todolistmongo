const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var path = require("path");
const dateModule = require(__dirname + "/dateModule.js")
const { error } = require("console");


// app.use(express.static(path.join(__dirname + "public")))

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// //making a array of items
//const listItems = ["task 1"];
// //for work list
// const workList = ["Work task 1", "work Task "];

// const dateToday = new Date();
// //here we give type to our Date ,Month and year
// const Option = {
//     weekday: "long",
//     month: "long",
//     day: "numeric",
//     year: "numeric",
// };

const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://Prashant:Prashant8959@cluster0.fzng2v3.mongodb.net/?retryWrites=true&w=majority/todolistDB");

//mongoose.connect("mongodb://localhost:27017/todolistDB")

const itemsSchema = {

    name: String

}

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
    name: "item one from database"
})

const item2 = new Item({
    name: "item two from database"
})

const item3 = new Item({
    name: "item three from database"
})

//const defalutItem = [item1, item2, item3];
//Item.insertMany(defalutItem, (err) => {

//     if (err) {
//         console.log(err)
//     } else {
//         console.log("items save in database")
//     }
// })



// Item.deleteMany({ "name": "item three from database" }, (err) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log("delete all done")

//     }

// })

// const listItems = [{ name: "this is first item" }];

// console.log(listItems)

// console.log("here is list Fill")



app.get("/", (req, res) => {
    //useing defalut way genrating Date

    //with hi-In we use hindi insted of en-Us



    console.log("here is list blank")
    Item.find({}, (err, item) => {
        if (err) {
            console.log(err)
        } else {
            console.log("copying all in item")
                //listItems.push(...item);
                //console.log(item)
            res.render("list", {
                todayDate: dateModule,
                title: "Todo",
                newItems: item,
                postAction: "/",
            });


        }
    })





    // res.render("list", {
    //     todayDate: dateModule,
    //     title: "Todo",
    //     newItems: listItems,
    //     postAction: "/",
    // });
});


app.post("/", (req, res) => {


    const itemNew = req.body.name;
    //console.log(req.body)

    // listItems.push(item)
    // res.redirect("/");

    if (itemNew == "") {
        res.addListener(error(404), (e) => {
            console.log(e);
        });
    } else {

        const itemAdded = new Item({
            name: itemNew
        })

        itemAdded.save();
        console.log("item added")
            //listItems.push(itemNew);
        res.redirect("/");
    }
});



app.post("/delete", (req, res) => {

    console.log(req.body.delCheckbox)
    const deleteItemId = req.body.delCheckbox;

    Item.findByIdAndRemove(deleteItemId, (err) => {
        console.log(err);
    })

    res.redirect("/")
})

//creating custom Schema

// const listSchema = {
//     name: String,
//     listNewItems: []
// }

// const List = mongoose.model("list", listSchema )

// //createing vustom routes
// app.get("/:customList", (req, res) => {
//     console.log(req.params.customList);
// })






// app.get("/work", (req, res) => {
//     res.render("list", {
//         title: "Work",
//         todayDate: dateModule,
//         newItems: workList,
//         postAction: "/work",
//     });
// });








// app.post("/work", (req, res) => {
//     const item = req.body.task;
//     console.log(req.body);
//     console.log(workList);

//     // workList.push(item)
//     // res.redirect("/work");

//     if (item == "") {
//         res.addListener(error(404), (e) => {
//             console.log(e);
//         });
//     } else {
//         workList.push(item);
//         res.redirect("/work");
//     }
// });

app.listen(3000, () => {
    console.log("Server is running");
});










//this is simple code for sing varibale in ejs
// app.get("/", (req, res) => {

//     const date = new Date();
//     const todayDate = date.getDate()
//     const todayMonth = date.getMonth() + 1

//     const todayYear = date.getFullYear()
//     const days = ["SunDay", "MonDay", "TuesDay", "WednesDay", "ThursDay", "FriDay", "SaturDay"]
//     const colors = ["Blue ", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow ", "pink"];
//     res.render("index", {
//         toDate: todayDate + "-" + todayMonth + "-" + todayYear,
//         dayIs: days[Number(date.getDay())],
//         time: date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + ":" + date.getMilliseconds(),
//         color: colors[Math.floor(Math.random() * 8)]
//     })

//     //res.sendFile(__dirname + "/Public/index.html")

// })