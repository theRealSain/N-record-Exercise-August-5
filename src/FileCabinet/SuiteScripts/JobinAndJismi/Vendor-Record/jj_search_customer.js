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
                const customerSearch = search.create({
                    type: search.Type.CUSTOMER,
                    filters: [
                        ['subsidiary', 'anyof', '14'],
                        'AND',
                        ['datecreated', 'within', 'thisMonth']
                    ],
                    columns: [
                        'entityid', 
                        'subsidiary', 
                        'salesrep', 
                        'email', 
                        'datecreated' 
                    ]
                });
 
                customerSearch.run().each(result => {
                    const name = result.getValue('entityid');
                    const subsidiary = result.getText('subsidiary');
                    const salesRep = result.getText('salesrep');
                    const email = result.getValue('email');
                    const createdDate = result.getValue('datecreated');
                    
                    log.debug({
                        title: 'Customer',
                        details: `Name: ${name}, Subsidiary: ${subsidiary}, Sales Rep: ${salesRep}, Email: ${email}, Created: ${createdDate}`
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
