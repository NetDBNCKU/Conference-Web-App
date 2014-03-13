/*$(document).on('pagecreate','#program_tuesday',function () {

    $('#list-browse-sessions-tuesday').empty();

    $.get('/static/test.xml',function(data){
    	parseXMLdata(data)
    },'xml');

	$('#list-browse-sessions-tuesday').listview('refresh');

});
*/
function parseXMLdata(data){
	var xmlData = $(data);
	xmlData.find("forpakdd").each(function(){
		$('#list-browse-sessions-tuesday').append('<li><a href="javasrcipt:void(0)"><h1>'
													+$(this).text()
													+'</h1></a></li>');
	});
	
}

$(document).on("pageshow", '#program_tuesday', function() {
  var page = $(this);

  // load data
  $('#list-browse-sessions-tuesday').empty();

    $.get('/static/test.xml',function(data){
    	parseXMLdata(data)
    	$("#list-browse-sessions-tuesday").listview('refresh');
    },'xml');

  page.trigger('pagecreate');
  

});