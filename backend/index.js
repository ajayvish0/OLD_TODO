const express = require("express");
const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db");
const cors = require("cors");


const app = express();
app.use(express.json());
app.use(cors());


app.post("/todo",async (req,res)=>{
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);
    if(!parsedPayload.success){
        return res.status(400).json({
            msg : "you sent the wrong input"
        });
    }
    await todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed : false
    });
    res.json({
        msg: "todo created"
    })

})

app.get("/todos",async (req,res)=>{
    const todos = await todo.find({});
    res.json({
        todos
    });

})

app.put("/completed",async (req,res)=>{
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);
    if(!parsedPayload.success){
        return res.status(400).json({
            msg : "you sent the wrong input"
        });
    }
    await update({_id : req.body.id},{
        completed:true
    });
    res.json({
        msg : "todo marked  as completed"
    })

})













app.listen(3000);