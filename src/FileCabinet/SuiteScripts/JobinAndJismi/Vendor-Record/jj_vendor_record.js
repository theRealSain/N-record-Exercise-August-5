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
            var vendorRecord = record.create({
                type: record.Type.VENDOR,
                isDynamic: true
            });

            vendorRecord.setValue({
                fieldId: 'companyname',
                value: 'Sain Suite',
            });

            vendorRecord.setValue({
                fieldId: 'email',
                value: "suitevendor@example.com"
            });

            vendorRecord.setValue({
                fieldId: 'phone',
                value: '(123) 456-7890'
            });

            vendorRecord.setValue({
                fieldId: 'subsidiary',
                value: 1
            });

            var vendorId = vendorRecord.save({
                enableSourcing: true,
                ignoreMandatoryFields: false
            });

            log.debug({
                title: 'Vendor Created',
                details: 'Vendor ID: ' + vendorId
            });
        }
        catch(error) {
            log.error({
                title: 'Error creating vendor',
                details: error
            });
        }
    };
 
    return {
        beforeLoad
    };

    /**
     * Defines the function definition that is executed before record is submitted.
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {Record} scriptContext.oldRecord - Old record
     * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
     * @since 2015.2
     */
    
    const beforeSubmit = (scriptContext) => {

    }

    /**
     * Defines the function definition that is executed after record is submitted.
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {Record} scriptContext.oldRecord - Old record
     * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
     * @since 2015.2
     */

    const afterSubmit = (scriptContext) => {

    }

    return {beforeLoad, beforeSubmit, afterSubmit}

});
