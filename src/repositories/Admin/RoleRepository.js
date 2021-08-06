import { Role } from '../../models/schema/Role';
import { Repository } from '../Repository';

class RoleRepository extends Repository {
    constructor() {
        super(Role);
    }
}

export { RoleRepository };
