const dotenv = require('dotenv');
dotenv.config({ path: 'src/.env' });
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as path from 'path';
import * as cors from 'cors';
import { env } from './environments/Env';
import Routes from './routes/Routes';
import ErrorHandler from './helpers/ErrorHandler';
import { I18n } from 'i18n';
//import { ReqInterface, ResInterface } from './interfaces/';
import { logRoutes } from './logs/Routes';
import * as http from "http";
import * as socketio from "socket.io";
import { handleSocketIo } from './socket';




export class Server {
  public app: express.Application = express();

  constructor() {
    console.log('environment', process.env.NODE_ENV);
    this.setConfigurations();
    this.setRoutes();
    this.error404Handler();
    this.handleErrors();
     this.socketServer();
     this.chatConnection();
     this.chatEvents();
   
    
  }

  setConfigurations() {
    this.setMongodb();
    this.enableCors();
    this.configBodyParser();
    this.setLanguage();
  }



  setLanguage() {
    const localePath = path.resolve(process.cwd() + '/assets/locales');
    const i18n = new I18n();
     i18n.configure({
       locales: ['en', 'fr'],
       directory: localePath
     })
   this.app.use(i18n.init);
  }



  setMongodb() {
    mongoose.connect(env().dbUrl, {
    }).then(() => {
      console.log("Database connected");
    
    }).catch((e) => {
      console.log(e);
      console.log('failed');
    })
  }

  

  enableCors() {
    this.app.use(
      cors({
        origin: true,
        credentials: true
      })
    );
  }

  configBodyParser() {
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));
    this.app.use(express.json({ limit: '10mb' }));
  }

  setRoutes() {
    this.app.use('/api-doc', express.static(path.resolve(process.cwd() + '/assets/apidoc')))
    // this.app.use(express.static(path.join(__dirname, 'public')));
    this.app.use((req: any, res: any, next: express.NextFunction) => {
      res.startTime = new Date().getTime();
      req.startTime = new Date().getTime();
      res.api = req.url;
      res.method = req.method;
      req.deviceType = req.headers.devicetype as string;

      console.log(`Api ==> ${req.url}  ${req.method}`);
      console.log('request-body', req.body);
      next();
    });


    this.app.use('/api/v1', Routes);
    this.app.use('/logs', logRoutes);
  }

  error404Handler() {
    this.app.use((req: any, res: any) => {
      res.status(404).json({
        message: 'Route not found',
        status: 404
      });
    })
  }

  handleErrors() {
    this.app.use((error: any, req: any, res: any, next: express.NextFunction) => {
      ErrorHandler.globalErrorHandler(error, req, res, next);
    });
  }
  
server
  io
  socketServer(){
    const options = {
      cors: {
          // origins: ["http://localhost:3000"],
          methods: ["GET", "POST"],
          credentials: false
      }
  };
    this.server = http.createServer(this.app);
    this.io = new socketio.Server(this.server,options);
  }
  chatConnection(){
    this.server.listen(3008, function (socket) {
      console.log('chat server running on port no: 3008')
  })
}
  chatEvents(){
    this.io.on('connection', function (socket) {
      console.log(' user connected', socket.id)
      socket.on('message', async (data) => {
          console.log('=========>>>>data', data)
          socket.broadcast.emit({ response_code: 200, message: 'You are successfully', data:data })
    
      })
      socket.on("disconnect", () => {
          //console.log(socket.id); 
      });
  })
  handleSocketIo.SetIo(this.io);
}





 
}



