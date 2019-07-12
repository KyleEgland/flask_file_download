// js-file-dl.js
// Javascript file for downloading files from the contents of a form
//
// Wait for the document to finish loading
$(document).ready(function() {
    $('#jsformsubmit').click(function( event ) {
        // Stop the event from propagating to other instances of that class
        event.stopPropagation();
        // Stop the event from propagating to children
        event.stopImmediatePropagation();
        // Stop the form submission
        event.preventDefault();
        // The form contents we want
        if ($('#js-call-form #jsfileNameInput').val() == '') {
            console.log('[!] Filename is EMPTY');
            alertMsg('alert-danger', 'File Name is a required field');
            return false;
        } else {
            var filename = $('#js-call-form #jsfileNameInput').val();
        }
        if ($('#js-call-form #jsfileContentsTextarea').val() == '') {
            console.log('[!] Filename is EMPTY');
            alertMsg("alert-danger", 'File Contents is a required field');
            return false;
        } else {
            var filecontents = $('#js-call-form #jsfileContentsTextarea').val();
        }

        // Test output - This should only run if there is both a file name and file contents
        console.log(`[*] Filename: ${filename}`);
        console.log(`[*] File contents: ${filecontents}`);
        // Make a request with ajax
        $('#js-call-form').submit();
    });
    // ---------------
    // Message handler
    // ---------------
    // This utilizes a template tag on the base html to create an alert message
    // that is styled by Bootstrap
    function alertMsg(alertType, msg) {
        // Get the template from the DOM (located in base.html)
        var msgTemplate = $('template').html().trim();
        // Create a copy
        var cloneTemplate = $(msgTemplate);
        // Add the alert type to the class - alert type must be a valid Bootstrap
        // class
        cloneTemplate.addClass(alertType);
        // Add the message to the alert - the default stored in the template is
        // "Alert triggered"
        cloneTemplate.find('span#js-msg-content').text(msg);
        // Place the alert into the DOM
        cloneTemplate.appendTo('#js-alert-hook');
    }
});
