import express from "express";
import productRoutes from "./Routes/productos.js";
const ExpressApp= express();
import mongoose from 'mongoose';
import orderRoutes from "./Routes/order.js";
import { categoriesRoutes } from "./Routes/categories.js";

const puerto =  process.env.PORT || 3000 ;
const URL_BDD = "mongodb://localhost:27017";
ExpressApp.use(express.json());
ExpressApp.use(express.text());
ExpressApp.use("/productos",productRoutes);
ExpressApp.use("/pedidos", orderRoutes);
ExpressApp.use('/categorias', categoriesRoutes)


const bootstrap = async () =>{
    mongoose.connect(URL_BDD+"/sistema-fabrica" );

ExpressApp.listen(puerto, () => {
    console.log("Puerto ejecutandose en puerto "+ puerto);
})
}

bootstrap();
