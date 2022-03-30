import express, {Application} from 'express';
import userRoutes from '../routes/usuario-routes';
import cors from 'cors';
import db from '../db/connection';
import 'colors';

export default class Server {
    private app: Application;
    private port: string;
    private apiPaths = { usuarios: '/api/usuarios' };

    constructor(){
        this.app = express();
        //this.port = process.env.PORT || '8000';
        this.port = '8000';
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    async dbConnection(){
        try {
            await db.authenticate();
            console.log(' --- Database online --- '.bgBlue);
        } catch (error:any) {
            throw new Error(error);
        }
    }
    
    middlewares() {        
        this.app.use(cors()); // CORS
        this.app.use(express.json());// Lectura del body

        // Carpeta publica para servir contenido estatico como archivos html
        this.app.use(express.static('public')); // public -> carpeta de los archivos estaticos

    }

    routes(){
        this.app.use(this.apiPaths.usuarios, userRoutes );
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log(`Servidor corriendo en http://localhost:${this.port}/api/usuarios`.green);
        });
    }
}
