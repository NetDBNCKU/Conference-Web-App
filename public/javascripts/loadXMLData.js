(function(){
	/*
		
	*/

})();

$(document).on("pagecreate", '#programPage', function() {
  var page = $(this);

  // load data
    $.get('/static/program.xml',function(data){
    	$('#list-browse-sessions').empty();
        parseDay(data);
        $("#list-browse-sessions").listview('refresh');
        createProgramList(data);
    },'xml');

  

});

function parseDay(data){
	var xmlData = $(data);
	xmlData.find('day').each(function(){
		var day = $(this);
		var date = day.find('date').text();
		var dateID = date.split(',');
				$('#list-browse-sessions').append('<li><a id="'+date+'" href="#'+dateID[0]+'_program">'
													+'<h1>'
													+date
													+'</h1>'+
													'</a></li>');
	});
	
}

function parseSession(data,date){
	var xmlData = $(data);
	xmlData.find('day').each(function(){
		var day = $(this);
		
		var dateID = date.split(',');
		if( day.find('date').text() == date){
			day.find('session').each(function(){
				var ID = $(this).find('ID').text();
				var name = $(this).find('name').text();
				var time = $(this).find('time').text();
				$('#list-browse-sessions-'+dateID[0]).append('<li><a id="'+ID+'" href="#'+ID+'_list"><h1>'
													+'Session: '+ID
													+'</h1>'
													+'<h1>'
													+'Session Topic: '+name
													+'</h1>'
													+'<h1>'
													+'Time: '+time
													+'</h1>'+
													'</a></li>');
			});
		}

	});
	
}

function parsePaperList(data,date,sessionID,listviewID){
	var xmlData = $(data);
		xmlData.find('day').each(function(){
			$day = $(this);
			if( $day.find('date').text() == date){
				$day.find('session').each(function(){
					if($(this).find('ID').text() == sessionID){
						$(listviewID).empty();
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

function createProgramList(data){
	var xmlData = $(data);
	xmlData.find('day').each(function(){
		var day = $(this);
		var date = day.find('date').text();
		var dateID = date.split(',');
		$('body').append('<div id="'+dateID[0]+'_program" data-role="page" >'
                         +'<div data-role="header" data-position="fixed"><h1>'+date+'</h1><a href="/" rel="external" data-transition="fade" data-icon="home" class="ui-btn-right">Home</a>'
                         +'<a href="#" class="ui-btn-left" data-rel="back">Back</a>'
                         +'</div>'
                         +'<div data-role="content" class="ui-content" ><ul data-role="listview" id="list-browse-sessions-'+dateID[0]+'" class="ui-listview"></ul>'
                         +'</div>'
                         +'</div>');
        
		day.find('session').each(function(){
				var ID = $(this).find('ID').text();
				var sessionName = $(this).find('name').text();
				$('body').append('<div id="'+ID+'_list" data-role="page" >'
                                 +'<div data-role="header" data-position="fixed" ><h1>'+ID+' - '+sessionName+'</h1><a href="#" class="ui-btn-left" data-rel="back">Back</a>'
                                 +'<a href="/" rel="external" data-transition="fade" data-icon="home" class="ui-btn-right">Home</a>'
                                 +'</div>'
                                 +'<div data-role="content" class="ui-content" ><ul data-role="listview" data-inset="true" class="ui-listview" id="'+dateID[0]+'_session_'+ID+'" ></ul>'
                                 +'</div>'
                                 +'</div>');
		});

		$(document).on("pagecreate", '#'+dateID[0]+'_program', function() {
                    var page = $(this);
                    // load data
                       $('#list-browse-sessions-'+dateID[0]).empty();
                       	parseSession(data,date);
                       	$('#list-browse-sessions-'+dateID[0]).listview('refresh');
                       	$('#list-browse-sessions-'+dateID[0]).on('click','a',function(){
				    		var id = $(this).attr('id');	
					    	parsePaperList(data,date,id,'#'+dateID[0]+'_session_'+id);
					    	$('#'+dateID[0]+'_session_'+id).listview('refresh');
						});

                   });

		});

}

