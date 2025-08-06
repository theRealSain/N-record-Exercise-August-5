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
            const salesOrderId = 137141;

            const soRecord = record.load({
                type: record.Type.SALES_ORDER,
                id: salesOrderId
            });
            log.debug(soRecord);

            const docNumber = soRecord.getValue('tranid');
            const customerName = soRecord.getText('entity');
            
            log.debug({
                title: 'Sales Order Details',
                details: `Doc #: ${docNumber}, Customer: ${customerName}`
            });
        } 
        catch (error) {
            log.error({
                title: 'Error Displayind Sales Order',
                details: error
            });
        }
    };

    return {
        beforeLoad
    };

});
