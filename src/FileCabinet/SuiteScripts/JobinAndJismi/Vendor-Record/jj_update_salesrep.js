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
                const customerRecord = record.load({
                    type: record.Type.CUSTOMER,
                    id: 7277
                });

                const newSalesRepId = 7096;
    
                customerRecord.setValue({
                    fieldId: 'salesrep',
                    value: newSalesRepId
                });
    
                const customerId = customerRecord.save();

                log.debug({
                    title: 'Sales Rep Updated',
                    details: `Customer ID: ${customerId}, New Sales Rep ID: ${newSalesRepId}`
                });
            }

            catch (error) {
                log.error({
                    title: 'Failed to update Sales Rep',
                    details: error
                });
            }
        }

        return {beforeLoad}

    });
