const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cron = require("node-cron");
const { expenseEmail } = require("./EmailService/Expense");

dotenv.config();

mongoose.connect(process.env. DB_CONNECTION).then(() => {
    console.log("DB Connection is successful");
}).catch((err) => {
    console.log(err);

})

const run = () => {
    cron.schedule("* * * * * *", () => {
        expenseEmail();
    });
};


run();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Bacground service is running on port ${PORT}`);

});