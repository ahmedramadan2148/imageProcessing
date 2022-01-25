import express from "express"
import routes from "./routes/index";
import cors from "cors";


const app = express();

app.use(cors())
const port = 3001;

app.use("/api",routes);

app.listen(port,()=>{
    console.log(`server start at http://localhost:${port}`);
})

export default app;