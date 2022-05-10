const assert = require('assert');
const mongoose = require('mongoose');
const {connection} = require("mongoose");

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/fruitDB');
}

const close = () => {
    mongoose.connection.close(function (err){
        err ? console.log(err) : console.log("Close successfully.")

    })
}

const insertLog = (err, docs) => {
        if (err){
            console.log(err)
        }else {
            mongoose.connection.close(function (err){
                if (err){
                    console.log(err)
                }
            })
            console.log(`Successfully add ${docs.length} fruits`)
            close();
        }
}

const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
})

const peopleSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favoriteFruit: fruitSchema
})

const Fruit = new mongoose.model("Fruit", fruitSchema);
const People = new mongoose.model("People", peopleSchema);

const kiwi = new Fruit({
    name:"Kiwi",
    rating:8,
    review:"Best fruit!"
})
const orange = new Fruit({
    name:"Orange",
    rating:5,
    review:"Sour"
})
const banana = new Fruit({
    name:"Banana",
    rating:3,
    review:"Yellow"
})
const pear = new Fruit({
    name:"Pear",
    rating:5,
    review:"Juicy"
})

//TODO: insert Many
/*
Fruit.insertMany([pear, banana, orange], function (err, docs){
    if (err){
        console.log(err)
    }else {
        mongoose.connection.close(function (err){
            if (err){
                console.log(err)
            }
        })
        console.log(`Successfully add ${docs.length} fruits`)
    }
})
 */



// TODO: Find
/*
Fruit.find(function (err, fruits){
    if (err){
        console.log(err)
    }else {
        fruits.forEach(function(f){
            console.log(f.name);
        })
    }
})
 */

// TODO: delete
/*
Fruit.deleteMany({name: "Orange"}, function (err){
    err ? console.log(err) : console.log("Delete success.")
    close();
})
 */

const p1 = new People({
    name: "John" ,
    age: 37,
})

const p2 = new People({
    name: "Ann",
    age: 12,
    favoriteFruit: banana
})

// People.insertMany([p1, p2], function (err, docs){
//     insertLog(err, docs);
// })

People.updateOne({name: "John"}, {favoriteFruit: pear}, function(err, doc){
    if (err){
        console.log(err)
    } else {
        console.log(doc);
        close();
    }
})

