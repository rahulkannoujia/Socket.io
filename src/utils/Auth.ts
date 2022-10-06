import { ObjectId } from "mongoose";
import * as Bcrypt from "bcrypt";
import { NextFunction } from "express";
import * as Jwt from "jsonwebtoken";
import { env } from "../environments/Env";
import * as Multer from 'multer';
const storageOptions =
    Multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './src/uploads')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    });
    const fileFilter = (req:any, file:any, cb:any) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(null, false);
        }
    };
export class Auth {
    public MAX_TOKEN_TIME = 600000;
    public multer = Multer({storage: storageOptions, fileFilter: fileFilter});
    generateVerificationCode(size: number = 4): string {
        let digits = '0123456789';
        let otp = '';
        for (let i = 0; i < size; i++) {
            otp += digits[Math.floor(Math.random() * 10)];
        }
        return otp;
    }

    decodeJwt(token: string): Promise<any> {
        return new Promise((resolve, reject) => { 
            Jwt.verify(token,process.env.JWT_SECRET, (err: any, data: any) => {
                if (err) {
                    return reject(err);
                }
                else {
                    return resolve(data);
                }
            })
        });
    }

    /**
     * 
     * @param data 
     * @param expiresIn 
     * @param next 
     * @returns {Promise<string>}
     */
    async getToken(
        data: { [key: string]: string | number | ObjectId },
        expiresIn: string | number,
        next: NextFunction
    ): Promise<string> {
        try {
            return Jwt.sign(
                data,
                env().jwtSecret,
                {
                    expiresIn
                }
            );
        } catch (err) {
            next(err)
        }
    }


    /**
     * 
     * @param candidatePassword 
     * @param userPassword 
     * @returns {Promise<boolean>}
     */
    async comparePassword(candidatePassword: string, Password: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            Bcrypt.compare(candidatePassword, Password, ((err: any, isSame: any) => {
                if (err) {
                    reject(err);
                } else if (!isSame) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            }));
        });

    }

    async encryptPassword(password: string): Promise<string> {
        return new Promise((resolve, reject) => {
            Bcrypt.hash(password, 10, (err: any, hash: string) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(hash);
                }

            });

        });
    }


}