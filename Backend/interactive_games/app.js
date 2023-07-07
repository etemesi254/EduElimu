import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from "url";
import cors from 'cors';
import cookieParser from "cookie-parser"
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

/*CONFIGURATION*/
dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.static("public"));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

// parse application/json
app.use(bodyParser.json());
app.use(express.json())

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, "public/assets");
    },
    filename: function(req,file,cb){
        cb(null, file.originalname);
    }
});
const upload = multer({storage});

/*ROUTES WITH FILES*/



/*ROUTES */
app.use(express.json());


app.use('/assets', express.static('public/assets'));

/*ADD DATA ONE TIME */

    // Admin.insertMany(admins);
    
/*DATABASE CONNECTION*/
mongoose.connect(`mongodb+srv://VenessaChebukwa:${process.env.DB_PASSWORD}@cluster0.kh502n0.mongodb.net/?retryWrites=true&w=majority`).then(()=> app.listen(5000)).then(()=>console.log("Connected to database and listening on port 5000"));

