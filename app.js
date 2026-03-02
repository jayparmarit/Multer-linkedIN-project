    import express from "express";
    import HttpError from "./middleware/HttpError.js";
    import profileRoutes from "./routes/ProfileRoutes.js"

    const app = express();

    app.use(express.json());

    app.use("/profile", profileRoutes)

    app.get("/",(req,res)=>{
        res.status(200).json("hellow from server");
    });

    app.use((req,res,next)=>{
        next (new HttpError("requested route not found",404))
    });
    
    app.use((error,req,res,next)=>{
        if(res.headersSent){
            next(error);
        }
        res.status(error.statusCode || 500).json({message:error.message || "internal server error"})
    })

const port = 5000

app.listen(port,()=>{
    console.log("server running port",port);
})
