$(document).on('pagecreate','#page-home',function () {
//$(document).ready(function () {
	var slideCount = $('#slider ul li').length;
	var slideWidth = $('#slider ul li').width();
	var slideHeight = $('#slider ul li').height();
	var sliderUlWidth = slideCount * slideWidth;
	
	$('#slider').css({ width: slideWidth, height: slideHeight });
	
	$('#slider ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });
	
    $('#slider ul li:last-child').prependTo('#slider ul');

    function moveLeft() {
        $('#slider ul').animate({
            left: + slideWidth
        }, 200, function () {
            $('#slider ul li:last-child').prependTo('#slider ul');
            $('#slider ul').css('left', '');
        });
    };

    function moveRight() {
        $('#slider ul').animate({
            left: - slideWidth
        }, 200, function () {
            $('#slider ul li:first-child').appendTo('#slider ul');
            $('#slider ul').css('left', '');
        });
    };

    $('a.control_prev').click(function () {
        moveLeft();
    });

    $('a.control_next').click(function () {
        moveRight();
    });

     $(document).on('mousedown','#travelInfo a', function(e) {
            e.preventDefault();
            var elem = $(this);
            var url = elem.attr('ex-href');
            if (url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1) {
                console.log("caught");
                window.open(url, '_system');
            }
    });
     $(document).on('mousedown','#exlink', function(e) {
            e.preventDefault();
            var elem = $(this);
            var url = elem.attr('ex-href');
            if (url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1) {
                console.log("caught");
                window.open(url, '_system');
            }
    });

});    
