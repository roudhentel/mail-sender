import { Request, Response, NextFunction } from 'express';
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";

export const validatorMW = (toClass: any) => {
    return function (req: Request, res: Response, next: NextFunction) {
        var data = plainToClass(toClass, req.body);
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

export const checkIfValidJson = () => {
    return function (req: Request, res: Response, next: NextFunction) {
        try {
            console.log("here");
            JSON.parse(req.body);
            next();
        } catch {
            res.status(400).json({
                success: false,
                errMsg: "Invalid JSON body"
            });

            return;
        }
    }
}