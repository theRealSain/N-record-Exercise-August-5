/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/log', 'N/search'], function(log, search) {
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
            const mySearch = search.load({ id: 1449 });

            mySearch.run().each(function (result) {
                let details = [];
                for (let i = 0; i < 5; i++) {
                    details.push(result.getValue({ index: i }));
                }
                log.debug({
                    title: 'Loaded Search Result',
                    details: details.join(', ')
                });
                return true;
            });
        }
            
        catch (error) {
            log.error({
                title: 'Load Search Failed',
                details: error
            });
        }
    };

    return {beforeLoad}

});
