import express from "express";
import router from "./router.js";
import { dirname, join} from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.set('view engine','ejs');

app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(router);
app.use(express.static(join(__dirname, "public")));

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
});