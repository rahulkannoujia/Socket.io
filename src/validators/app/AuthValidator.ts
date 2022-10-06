import { validate } from '../../helpers/ValidateHelper';
import { ResInterface, ReqInterface } from '../../interfaces/ReqInterface';
import { NextFunction } from 'express';
import * as Joi from 'joi';

class AuthValidator {
    async signup(req: ReqInterface, res: ResInterface, next: NextFunction) {
        try {
            const schema = Joi.object().keys({
                name:Joi.string().required(),
                email: Joi.string().required(),
                password: Joi.string().required(),
              
            });

            const isValid = await validate(req.body, res, schema);

            if (isValid) {
                next();
            }
        } catch (error) {
            next(error);
        }
    }


    async login(req: ReqInterface, res: ResInterface, next: NextFunction) {
        try {
            const schema = Joi.object().keys({
                email: Joi.string().required(),
                password: Joi.string().required(),
               
            });

            const isValid = await validate(req.body, res, schema);

            if (isValid) {
                next();
            }
        } catch (error) {
            next(error);
        }
    }
    
}

export default new AuthValidator();