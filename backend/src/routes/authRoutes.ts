import  express , {Request, Response} from "express";

const router = express.Router();

router.get("/test", (req: Request, res: Response) => {

    res.json({message: "Hello"})

});

router.post("/test", (req: Request, res: Response) => {

    res.json({httpMethod: "post"})

});

router.put("/test", (req: Request, res: Response) => {

    res.json({httpMethod: "put"})

});

router.delete("/test", (req: Request, res: Response) => {

    res.json({httpMethod: "delete"})

});

export default router;