const environments = ['LCL'];
import { s as RoleSchema } from '../models/schema/Role';
import { s as UserSchema } from '../models/schema/User';

//Redis, Elasticsearch, AWS
const services = {};

// Add schema
const schemas = {
    RoleSchema,
    UserSchema
};

export { environments, schemas, services };
