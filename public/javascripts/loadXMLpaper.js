$(document).on("pagecreate", '#paperListPage', function() {
  var page = $(this);

  // load data
    $.get('/static/paper.xml',function(data){
    	$('#list-paperList').empty();
        parsePaperList(data);
        $("#list-paperList").listview('refresh');
    },'xml');

  

});

function parsePaperList(data){
	var xmlData = $(data);
	xmlData.find('author').each(function(){
		var author = $(this);
				$('#list-author').append('<li><a href="#">'
													+'<h1>'
													+author.text()
													+'</h1>'+
													'</a></li>');
	});
	
}


function createProgramList(data){
	var xmlData = $(data);
	xmlData.find('day').each(function(){
		var day = $(this);
		var date = day.find('date').text();
		var dateID = date.split(',');

		
		
		$('body').append('<div id="'+dateID[0]+'_program" data-role="page" data-add-back-btn="true">'
                         +'<div data-role="header" ><h1>'+date+'</h1><a href="/" rel="external" data-transition="fade" data-icon="home" class="ui-btn-right">Home</a>'
                         +'<a href="#" class="ui-btn-left" data-rel="back">Back</a>'
                         +'</div>'
                         +'<div data-role="content" class="ui-content" role="main" ><ul data-role="listview" id="list-browse-sessions-'+dateID[0]+'" class="ui-listview"></ul>'
                         +'</div>'
                         +'</div>');
        
		day.find('session').each(function(){
				var ID = $(this).find('ID').text();
				var sessionName = $(this).find('name').text();
				$('body').append('<div id="'+ID+'_list" data-role="page" >'
                                 +'<div data-role="header"  ><h1>'+ID+' - '+sessionName+'</h1><a href="#" class="ui-btn-left" data-rel="back">Back</a>'
                                 +'<a href="/" rel="external" data-transition="fade" data-icon="home" class="ui-btn-right">Home</a>'
                                 +'</div>'
                                 +'<div data-role="content" class="ui-content"><ul data-role="listview" data-inset="true" class="ui-listview" id="'+dateID[0]+'_session_'+ID+'" ></ul>'
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

