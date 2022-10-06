import { NextFunction } from "express";
import ResponseHelper from "../../helpers/ResponseHelper";
import { ReqInterface, ResInterface } from "../../interfaces/ReqInterface";
import UserModel from "../../models/UserModel";
import UserService from "../../services/app/UserService";
import { Auth } from "../../utils/Auth";


class UserController {
    async signUp(req: ReqInterface, res: ResInterface, next: NextFunction) {
        try {
            const name =req.body.name;
            const email = req.body.email;
            const password = req.body.password;
            const encryptedPassword = await new Auth().encryptPassword(password);  
            const isExists = await UserModel.findOne({ email: req.body.email });
            if (isExists) {
              ResponseHelper.badRequest(res, "user already signUp");
            }else{
            const data = await UserService.SignUp(
                name,
                email,
                encryptedPassword,
              
                req,
                next
            );
            
            if (data) {
                res.logMsg = `user *${data.user._id}*  user signUp successfully`;
                return ResponseHelper.created(res, ('User signUp successfully'), data)

            }
          }
        } catch (error) {
            next(error);
        }
    }
    
    async login(req: ReqInterface, res: ResInterface, next: NextFunction) {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const data = await UserService.login(
                email,
                password,
                res,
                next
            );

            if (data)
                return ResponseHelper.ok(res, ('Login successfully'), data);


        } catch (error) {
            next(error);
        }
    }

   
   
    
}
export default new UserController();