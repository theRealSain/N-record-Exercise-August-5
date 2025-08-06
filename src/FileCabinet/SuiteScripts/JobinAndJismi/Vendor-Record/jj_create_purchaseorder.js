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
                let poRec = record.create({
                    type: record.Type.PURCHASE_ORDER,
                    isDynamic: true
                });

                poRec.setValue({
                    fieldId: 'entity',
                    value: 7197
                });

                poRec.selectNewLine({
                    sublistId: 'item'
                });

                poRec.setCurrentSublistValue({
                    sublistId: 'item',
                    fieldId: 'item',
                    value: 3766
                });

                poRec.setCurrentSublistValue({
                    sublistId: 'item',
                    fieldId: 'quantity',
                    value: 5
                });

                poRec.setValue({
                    fieldId: 'location',
                    value: 72
                });

                poRec.commitLine({
                    sublistId: 'item'
                });

                let poId = poRec.save();

                log.debug({
                    title: 'Purchase Order Created',
                    details: `Purchase Order ID: ${poId}`
                });
            }

            catch (error) {
                log.error({
                    title: 'Error Creating Purchase Order',
                    details: error
                });
            }
        }

        return {beforeLoad}

    });
