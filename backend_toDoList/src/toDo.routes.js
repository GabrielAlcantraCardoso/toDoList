const express = require("express");

//const allToDo = [{nome: "Gabriel", status: false}];
const toDoRoutes = express.Router();
const {PrismaClient} = require("@prisma/client");
const { response } = require("express");

const prisma = new PrismaClient();

// C
toDoRoutes.post("/toDo", async (req, res)=> {
    const {name} = req.body;
    const todo = await prisma.todo.create({
        data: {
            name,
            
        },
    });
    return res.status(201).json(todo);
});

// R 
toDoRoutes.get("/toDo", async (req, res) => {
    const todos = await prisma.todo.findMany();
    return res.status(200).json(todos);
});

// U
toDoRoutes.put("/toDo", async (req, res) => {
    const {name, id, status} = req.body;

    if(!id){
       return res.status(400).json("Id is mandatory")
    }

    const toDoAlreadyExist = await prisma.todo.findUnique({where: {id}});

    if(!toDoAlreadyExist){
        return res.status(404).json("ToDo not exit");
    }

    const todo = await prisma.todo.update({
        where: {
            id,
        },
        data: {
            name,
            status,
        },
        
    });
    return res.status(200).json(todo);
});

// D

toDoRoutes.delete("/toDo/:id", async (req, res) => {
    const {id} = req.params;
    const intId = parseInt(id);
    if(!intId){
        return res.status(400).json("Id is mandatory")
     }
 
     const toDoAlreadyExist = await prisma.todo.findUnique({where: {id: intId}});
 
     if(!toDoAlreadyExist){
         return res.status(404).json("ToDo not exit");
     }
     await prisma.todo.delete({ where: {id: intId}});
     return res.status(200).send();
});

module.exports = toDoRoutes;