/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/log', 'N/record'], function(log, record) {
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
                const contactRecord = record.delete({
                    type: record.Type.CONTACT,
                    id: 7279,
                });
                
                log.debug('Deleted contact record');
            } 
            
            catch (error) {
                log.error({
                    title: 'Failed to delete contact',
                    details: error
                });
            }
        }

        return {beforeLoad}

    });
