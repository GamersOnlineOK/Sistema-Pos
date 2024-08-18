import  express  from "express";
import orderModel from "../schemas.js/order-schema.js";

const ExpressApp = express();

ExpressApp.use(express.json());
ExpressApp.use(express.text());

const orderRoutes = express.Router();
//trae Todos los pedidos recibidos
orderRoutes.get("/recibidos", async (req, res) =>{
    
    const order = await orderModel.find({state:'recibido'},'orderNumber date client note state').exec();
    res.send(order)
});
//trae Todos los pedidos en proceso
orderRoutes.get("/en-proceso", async (req, res) =>{
    
    const order = await orderModel.find({state:'en proceso'},'orderNumber date client note state').exec();
    res.send(order)
});
//trae Todos los pedidos finalizados
orderRoutes.get("/finalizados", async (req, res) =>{
    
    const order = await orderModel.find({state:'finalizado'},'orderNumber date client note state').exec();
    res.send(order)
});
//imprime pedidos
orderRoutes.get("/print", async (req, res)=>{

    const pedidos = await orderModel.find()
    .populate('cart.category')
    .exec();

    const comandaPorCategoria = {};

    pedidos.forEach(data => {
        if (data.state === 'en proceso') {
            data.cart.forEach( item => {
            const keyValue =`${item.name}`;
            if (!comandaPorCategoria[keyValue]) {
                comandaPorCategoria[keyValue] ={
                    name:item.name,
                    total:0,
                    category:item.category.name
                    
                };
            } 
            comandaPorCategoria[keyValue].total += item.quantiti;
        })
        }
        
    });
    res.send(comandaPorCategoria)
})
//Crea nuevo producto. IMPORTANTE = Faltan validaciones
orderRoutes.post("/",async (req, res) =>{
    const newOrder = new orderModel(req.body);
    await newOrder.save()
    res.send(req.body)
})


export default orderRoutes;