import { Router } from "express";
import ChatController from "../controllers/app/ChatController";


class ChatRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.postRoutes();
    this.getRoutes();
 
  }

  postRoutes() {
    this.router.post(
      '/new-room',
     ChatController.createNewRoom
    
    )
   
   }
   getRoutes(){
    this.router.get(
        '/message',
        ChatController.getMessages
    )
   }
}
export default new ChatRouter().router;
