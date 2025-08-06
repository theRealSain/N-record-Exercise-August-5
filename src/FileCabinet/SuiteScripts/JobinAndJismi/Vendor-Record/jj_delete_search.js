/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record'], function(record) {
        /**
         * Defines the function definition that is executed before record is loaded.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @param {Form} scriptContext.form - Current form
         * @param {ServletRequest} scriptContext.request - HTTP request information sent from the browser for a client action only.
         * @since 2015.2
         */
    const beforeLoad = (scriptContext) => {
        try {
            record.delete({
                type: record.Type.SAVED_SEARCH,
                id: 1527
            });

            log.debug({
                title: 'Saved Search Deleted',
                details: 'Saved search with ID 1527 has been deleted successfully.'
            });
        }
        catch (error) {
            log.error({
                title: 'Delete Search Failed',
                details: error
            });
        }
    };

    return {beforeLoad}

});
