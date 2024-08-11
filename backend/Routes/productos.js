import  express  from "express";
import { PROD_ITEM } from "../Bdd/bbdd.js";

const ExpressApp = express();

ExpressApp.use(express.json());
ExpressApp.use(express.text());

const productRoutes = express.Router();
//trae Todos los productos
productRoutes.get("/", (req, res) =>{
    res.send(PROD_ITEM);
})
//Trae el prodcuto correspondiente al ID
productRoutes.get("/:guid", (req, res) =>{
    
    const prod = PROD_ITEM.find((data) => data.guid === req.params.guid );

    if (!prod) return res.status(404).send("Producto No encontrado");

    res.send(prod);
});
//Crea nuevo producto. IMPORTANTE = Faltan validaciones
productRoutes.post("/",(req, res) =>{
    const {guid,name,quantiti} = req.body;
    if(!guid || !name || !quantiti){
        return res.status(404).send("Completa todos los campos")
    }
    PROD_ITEM.push({
        name,
        guid,
        quantiti
    })

    res.send(PROD_ITEM)
})




export default productRoutes;