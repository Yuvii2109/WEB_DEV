// books.js code 

const mongoose = require("mongoose");

main()
.then(()=>{
    console.log("connected to db");
})
.catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/amazon');
}

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
    },
    price: {
        type: Number,
        min: [100, "Please enter a valid number"] //Custom Error
    },
    discount: {
        type: Number,
        default: 100,
    },
    genre: [String],
    category: {
        type: String,
        enum: ["Fiction","Non-Fiction"]
    }
});

const Book = mongoose.model("Book", bookSchema);

let book3 = new Book({
    title: "Ramayana",
    author: "Valmiki",
    price: 100,
    discount: 0,
    genre: ["Religious","Mythology"],
    category: "Non-Fiction"
});
Book.findByIdAndUpdate(
    '669762a91abf0447be558222', 
    {
        price: 1100,
        discount: 100,
    },
    {new: true}, 
    {runValidators: true}
).then((res)=>{
    console.log(res);
}).catch((err)=>{
    console.log(err);
});