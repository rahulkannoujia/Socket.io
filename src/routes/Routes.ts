import { Router } from "express";
import UserRouter from "./app/UserRouter";
import ChatRouter from "./ChatRouter";

class Routes {
  public router: Router;
  constructor() {
    this.router = Router();
    this.app();
 
  }

  app() {
   this.router.use('/app/auth',UserRouter)
   this.router.use('/app/chat',ChatRouter)
  }

}
export default new Routes().router;