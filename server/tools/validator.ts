import { Request, Response, NextFunction } from 'express';
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";

export const validatorMW = (toClass: any) => {
    return function (req: Request, res: Response, next: NextFunction) {
        var data = plainToClass(toClass, req.body);
        if (Array.isArray(req.body)) {
            res.status(400).json({
                success: false,
                errMsg: "Invalid request body"
            });

            return;
        }
        validate(data, { skipMissingProperties: true }).then(errors => {
            // errors is an array of validation errors
            if (errors.length > 0) {
                let errorTexts: Array<any> = [];
                for (const errorItem of errors) {
                    for (let prop in errorItem.constraints) {
                        errorTexts.push(errorItem.constraints[prop]);
                    }
                }

                res.status(400).json({
                    success: false,
                    errMsg: errorTexts
                });
                return;
            }
            next();
        });
    }
}