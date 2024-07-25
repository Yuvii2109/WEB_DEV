// customer.js code 
// One to Many - Approach 2

const mongoose = require("mongoose");
const {Schema} = require("mongoose");
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
    console.log("connected to db")
};

const orderSchema = new Schema({
    item: String,
    price: Number
});
const customerSchema = new Schema({
    name: String,
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: "Order"
        }
    ]
});

customerSchema.post("findOneAndDelete", async(customer) => {
    if(customer.orders.length){
        let result = await Order.deleteMany({_id: {$in: customer.orders}});
        console.log(result);
    };
});

const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);

const deleteCust = async() => {
    let data = await Customer.findByIdAndDelete('669f79e6f0b92050162f541a');
    console.log(data);
}
deleteCust();