define(['jquery', 'underscore', 'bootstrap'], function($, _) {
    $(document).ready(function() {
        $('body').tooltip({
        	selector: '[data-toggle="tooltip"]'
        });
    });
});