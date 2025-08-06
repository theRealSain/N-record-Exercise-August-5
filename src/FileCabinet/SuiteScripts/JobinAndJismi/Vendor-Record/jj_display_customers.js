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
            const customerSearch = search.create({
                type: search.Type.CUSTOMER,
                filters: [
                    ['datecreated', 'within', 'lastMonth']
                ],
                columns: [
                    'entityid',
                    'email',
                    'datecreated',
                    'subsidiary',
                    'salesrep'
                ]
            });

            customerSearch.run().each(function (result) {
                const name = result.getValue('entityid');
                const email = result.getValue('email');
                const dateCreated = result.getValue('datecreated');
                const subsidiary = result.getText('subsidiary');
                const salesRep = result.getText('salesrep');

                log.debug({
                    title: 'Customer Created Last Month',
                    details: `Name: ${name}, Email: ${email}, Date Created: ${dateCreated}, Subsidiary: ${subsidiary}, Sales Rep: ${salesRep}`
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
    };

    return {beforeLoad}

});
