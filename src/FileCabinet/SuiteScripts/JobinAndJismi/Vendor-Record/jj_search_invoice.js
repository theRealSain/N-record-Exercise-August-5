/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/log', 'N/record', 'N/search'], function(log, record, search) {
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
                const invoiceSearch = search.create({
                    type: search.Type.INVOICE,
                    filters: [
                        ['status', 'anyof', 'CustInvc:A']
                    ],
                    columns: [
                        'tranid',
                        'trandate',
                        'entity',
                        'email',
                        'amount'
                    ]
                });

                invoiceSearch.run().each(result => {
                    const docNumber = result.getValue('tranid');
                    const date = result.getValue('trandate');
                    const customerName = result.getText('entity');
                    const customerEmail = result.getValue('email');
                    const amount = result.getValue('amount');

                    log.debug({
                        title: 'Open Invoice',
                        details: `Doc#: ${docNumber}, Date: ${date}, Customer: ${customerName}, Email: ${customerEmail}, Amount: ${amount}`
                    });

                    return true;
                });
            }
            catch (error) {
                log.error({
                    title: 'Customer Search Failed',
                    details: error
                });
            }
        }

        return {beforeLoad}

    });
