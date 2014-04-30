

$(document).on('pagebeforeshow',function() {
    //All pages at least 100% of viewport height
    var viewPortHeight = $(window).height();
    var headerHeight = $('div[data-role="header"]').height();
    var footerHeight = $('div[data-role="footer"]').height();
    var contentHeight = viewPortHeight - headerHeight - footerHeight - 35;

    $('div[class="ui-content"]').css({'height': contentHeight + 'px'});
 });
