define(['jquery', 'underscore', 'bootstrap', 'selectize'], function($, _) {
    $(document).ready(function() {
        $('body').tooltip({
        	selector: '[data-toggle="tooltip"]'
        });

        $(".fancy-select").selectize();
    });
});