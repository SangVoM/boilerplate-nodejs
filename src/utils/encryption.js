import bcrypt from 'bcrypt';

const hashPassword = async password => {
    try {
        const salt = await bcrypt.genSalt(Number(getEnv('SALT_ROUND')));
        return bcrypt.hash(password, salt);
    } catch (e) {
        throw e;
    }
};

const comparePassword = (password, passwordHash) => {
    try {
        return bcrypt.compare(password, passwordHash);
    } catch (e) {
        throw e;
    }
};

export { hashPassword, comparePassword };
