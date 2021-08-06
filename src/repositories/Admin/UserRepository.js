import { User } from '../../models/schema/User';
import { Repository } from '../Repository';

class UserRepository extends Repository {
    constructor() {
        super(User);
    }
}

export { UserRepository };
