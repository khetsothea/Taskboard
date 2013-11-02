/**
 * ProjectUser
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */
module.exports = {
    attributes: {
        // Relation to Project model
        projectId: {
            type:       'integer',
            required:   true
        },

        // Relation to User model
        userId: {
            type:       'integer',
            required:   true
        },

        /**
         * Relation type:
         *  -1 = admin, he/she has _all_ rights
         *   0 = view only user, can only view data nothing else
         *   1 = normal user, can add and edit stories and tasks objects
         */
        role: {
            type:       'integer',
            defaultsTo: 0
        },

        createdAtObject: function () {
            return (this.createdAt && this.createdAt != '0000-00-00')
                ? DateService.convertDateObjectToUtc(this.createdAt) : null;
        },
        updatedAtObject: function () {
            return (this.updatedAt && this.updatedAt != '0000-00-00')
                ? DateService.convertDateObjectToUtc(this.updatedAt) : null;
        }
    }
};
