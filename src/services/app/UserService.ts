import { NextFunction } from "express";
import ResponseHelper from "../../helpers/ResponseHelper";
import { ReqInterface, ResInterface } from "../../interfaces/ReqInterface";
import { User } from "../../interfaces/UserInterface";
import UserModel from "../../models/UserModel";
import { Auth } from "../../utils/Auth";



/**
     * 
     * @param queryString 
     * @returns 
     */
class UserService {
    /**
  * @param email {string} email of user
  * @param password {string} Encrypted password
  * @param next {NextFunction} next function
  * @return {Promise<UserInterface>} new created user
  */
    async SignUp(
        name: string,
        email: string,
        password: string,
      
        req: ReqInterface,
        next: NextFunction
    ): Promise<{ user:User  } | void> {
        try {
            const user = await UserModel.create({
                name,
                email,
                password,
               
                req,
                next
            });

            user.password = undefined;

            return { user };
        } catch (error) {
            next(error);
        }
    }
    async login(
        email: string,
        password: string,
        res: ResInterface,
        next: NextFunction
    ): Promise<{ user: User, token: string } | void> {
        try {
            const user = await UserModel.findOne({ email })

            if (!user) {
                return ResponseHelper.badRequest(res, res.__('invalid_email_password'));
            }

            const isPasswordCorrect = await new Auth().comparePassword(password, user.password);

            if (!isPasswordCorrect) {
                return ResponseHelper.badRequest(res, res.__('invalid_email_password'));
            }


            const payload = {
                id: user._id,
                email: user.email,
            }

            const token = await new Auth().getToken(
                payload,
                '1d',
                next
            );

            user.password = undefined;

            return {
                user,
                token
            }

        } catch (error) {
            next(error);
        }
    }

  



}
export default new UserService();