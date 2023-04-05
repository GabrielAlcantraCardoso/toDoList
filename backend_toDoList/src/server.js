const express = require("express");
const cors = require("cors");
const toDoRoutes = require("./toDo.routes");
const app = express();


app.use(express.json());
app.use(cors());
app.use(toDoRoutes);

app.get("/health", (req,res) => {
    return res.json("up");
});

app.listen(5000, ()=> console.log("Server up in 5000"));