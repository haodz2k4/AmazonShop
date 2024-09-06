import { ApiError } from './../utils/error';
import Joi,{SchemaMap} from "joi";
import pick from "./../utils/pick"
import { Request, Response, NextFunction } from "express"; 

type RequestKeys = 'params' | 'query' | 'body';

export const validate = (schema: SchemaMap) => (req: Request, res: Response, next: NextFunction): void => {
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema) as RequestKeys[]);

  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return next(new ApiError(400, errorMessage));
  }

  Object.assign(req, value);
  return next();
}; 