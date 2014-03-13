function parseXMLdata(data){
	var xmlData = $(data);
	xmlData.find('day').each(function(){
		$day = $(this);
		if( $day.find('date').text() == "Tuesday, May 14, 2014"){
			$day.find('session').each(function(){
				$('#list-browse-sessions-tuesday').append('<li><a id="'+$(this).find('ID').text()+'" href="#'+$(this).find('ID').text()+'_list"><h1>'
													+'Session: '+$(this).find('ID').text()
													+'</h1>'
													+'<h1>'
													+'Session Topic: '+$(this).find('name').text()
													+'</h1>'
													+'<h1>'
													+'Time: '+$(this).find('time').text()
													+'</h1>'+
													'</a></li>');
			});
		}

	});
	
}
function parseXMLdataToSession(data, sessionID, listviewID){
	var xmlData = $(data);
	xmlData.find('day').each(function(){
		$day = $(this);
		if( $day.find('date').text() == "Tuesday, May 14, 2014"){
			$day.find('session').each(function(){
				if($(this).find('ID').text() == sessionID){
					$(this).find('paper').each(function(){
						$(listviewID).append('<li><h1>'
													+'Title: '+$(this).find('title').text()
													+'</h1>'
													+'<h1>'
													+'Type: '+$(this).find('type').text()
													+'</h1>'
													+'<h1>'
													+'Author: '+$(this).find('author').text()
													+'</h1>'+
													'</li>');
					});
				}
			});
		}

	});
	
}

$(document).on("pageshow", '#program_tuesday', function() {
  var page = $(this);

  // load data
  $('#list-browse-sessions-tuesday').empty();

    $.get('/static/program.xml',function(data){
    	parseXMLdata(data)
    	$("#list-browse-sessions-tuesday").listview('refresh');
    	$('#list-browse-sessions-tuesday').on('click','a',function(){
    		var id = $(this).attr('id');	

	    	parseXMLdataToSession(data,id,'#tuesday_session_'+id);
	    	$('#tuesday_session_'+id).listview('refresh');
			});
    },'xml');

  page.trigger('pagecreate');
  

});
