/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record', 'N/log'], function(record, log) {
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
                let newRec = record.create({
                    type: record.Type.SALES_ORDER,
                    isDynamic: true
                });

                newRec.setValue({
                    fieldId: 'entity',
                    value: 7202
                });

                newRec.selectNewLine({
                    sublistId: 'item'
                });

                newRec.setCurrentSublistValue({
                    sublistId: 'item',
                    fieldId: 'item',
                    value: 3766
                });

                newRec.setCurrentSublistValue({
                    sublistId: 'item',
                    fieldId: 'quantity',
                    value: 3
                });

                newRec.setCurrentSublistValue({
                    sublistId: 'item',
                    fieldId: 'rate',
                    value: 100
                });

                newRec.commitLine({
                    sublistId: 'item'
                });

                let salesId = newRec.save();

                log.debug({
                    title: 'Sales Order Created',
                    details: `Sales Order ID: ${salesId}`
                });
            }
            
            catch (error) {
                log.error({
                    title: 'Error Creating Sales Order',
                    details: error
                });
            }
        }

        return {beforeLoad}

    });
