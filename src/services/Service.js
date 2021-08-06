'use strict';

import { errors, jsonError, jsonSuccess } from '../utils/system';

class Service {
    constructor(BaseRepository) {
        this.baseRepository = new BaseRepository();
    }

    /**
     * Get list
     * @param {Number} page
     * @param {Number} limit
     *
     */
    async getAll({ page, limit }) {
        try {
            const result = await this.baseRepository.getAll({ page, limit });

            return jsonSuccess(result);
        } catch (e) {
            throw e;
        }
    }

    /**
     * Get by id
     * @param {Number} id
     */
    async getById(id) {
        try {
            const result = await this.baseRepository.getById(id);

            // Check result found
            if (result) {
                return jsonSuccess(result);
            }

            return jsonError(errors.NOT_FOUND_ERROR);
        } catch (e) {
            throw e;
        }
    }

    /**
     * Create
     * @param {Object} model
     */
    async create(model) {
        try {
            let result = await this.baseRepository.create(model);

            return jsonSuccess(result);
        } catch (e) {
            throw e;
        }
    }

    /**
     * Update by id
     * @param {Number} id
     * @param {Object} model
     */
    async updateById(id, model) {
        try {
            let result = await this.baseRepository.updateById(id, model);

            // Check device type exist
            if (!result) {
                return jsonError(errors.NOT_FOUND_ERROR);
            }

            return jsonSuccess(result);
        } catch (e) {
            throw e;
        }
    }

    /**
     * Delete by id
     * @param {Number} id
     */
    async deleteById(id) {
        try {
            let deletedRows = await this.baseRepository.deleteById(id);

            if (!deletedRows) {
                return jsonError(errors.NOT_FOUND_ERROR);
            }

            return jsonSuccess();
        } catch (e) {
            throw e;
        }
    }

    /**
     * Delete using condition
     * @param {Object} condition
     */
    async delete(condition) {
        try {
            const deletedRows = await this.baseRepository.delete(condition);

            if (!deletedRows) {
                return jsonError(errors.NOT_FOUND_ERROR);
            }

            return jsonSuccess();
        } catch (e) {
            throw e;
        }
    }
}

export { Service };
