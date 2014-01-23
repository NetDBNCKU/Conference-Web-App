$(document).ready(function() {
    //All pages at least 100% of viewport height
    var viewPortHeight = $(window).height();
    var headerHeight = $('div[data-role="header"]').height();
    var contentHeight = viewPortHeight - headerHeight - 35;

    $('div[class="ui-content"]').css({'height': contentHeight + 'px'});
 });
