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
                const vendorId = 7272;
    
                const vendorRecord = record.load({
                    type: record.Type.VENDOR,
                    id: vendorId
                });
    
                const vendorNumber = vendorRecord.getText('entityid');
                const vendorName = vendorRecord.getText('companyname');
                const vendorSubsidiary = vendorRecord.getText('subsidiary');

                log.debug({
                    title: 'Vendor Details',
                    details: `Doc #: ${vendorNumber}, VendorName: ${vendorName}, VendorSubsidiary: ${vendorSubsidiary}`
                });
    
            } 
            catch (error) {
                log.error({
                    title: 'Failed to load or read vendor record',
                    details: error
                });
            }
        }

        return {beforeLoad}

    });
