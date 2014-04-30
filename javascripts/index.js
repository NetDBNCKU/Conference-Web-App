// Function called when page has loaded
function init() {
  document.addEventListener("deviceready",onDeviceReady,false);
}

// Function called when phonegap is ready
function onDeviceReady() {
    //All pages at least 100% of viewport height
    var viewPortHeight = $(window).height();
    var headerHeight = $('div[data-role="header"]').height();
    var footerHeight = $('div[data-role="footer"]').height();
    var contentHeight = viewPortHeight - headerHeight - footerHeight;

    // Set all pages with class="page-content" to be at least contentHeight
    $('div[class="page-content"]').css({'min-height': contentHeight + 'px'});
 }
