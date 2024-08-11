import express from "express";
import productRoutes from "./Routes/productos.js";
const ExpressApp= express();
const puerto =  process.env.PORT || 3000 ;

ExpressApp.use(express.json());
ExpressApp.use(express.text());
ExpressApp.use("/productos",productRoutes);

ExpressApp.listen(puerto, () => {
    console.log("Puerto ejecutandose en puerto "+ puerto);
})
