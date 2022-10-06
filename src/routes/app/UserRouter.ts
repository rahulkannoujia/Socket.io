import { Router } from "express";
import UserController from "../../controllers/app/UserController";

import AuthValidator from "../../validators/app/AuthValidator";


class UserRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.postRoutes();
    
    
  }

  postRoutes() {
    this.router.post(
      '/signUp',
      AuthValidator.signup,
      UserController.signUp
     
    
    )
    this.router.post(
      '/login',
      AuthValidator.login,
      UserController.login
      
    

    )
   
   }
 
 
}
export default new UserRouter().router;
