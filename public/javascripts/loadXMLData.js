$(document).on("pagecreate", '#programPage', function() {
  var page = $(this);

  // load data
    $.get('/static/ProgramFinal.xml',function(data){
    	$('#list-browse-sessions').empty();
        parseDay(data);
        $("#list-browse-sessions").listview('refresh');

        createProgramList(data);    //bug (content occupys header space) here !  3/15 found by MaoSH
    },'xml');

    if(PaperDetailcreated === false){
        	 $.get('/static/paper.xml',function(data){
    	
		        createPaperDetail(data);
		        
		    },'xml');
        	 PaperDetailcreated = true;
        }
});

function parseDay(data){
	var xmlData = $(data);
	xmlData.find('day').each(function(){
		var day = $(this);
		var date = day.find('date').text();
		var dateID = date.split(',');
		dateID = dateID[0].replace(/\s/g,'_');
				$('#list-browse-sessions').append('<li><a id="'+date+'" href="#'+dateID+'_program">'
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
		dateID = dateID[0].replace(/\s/g,'_');
		var time;
		if( day.find('date').text() == date){
			day.find('time_interval').each(function(){
					time = $(this).find('time').text();
					$('#list-browse-sessions-'+dateID).append('<li data-role="list-divider"><h3>'+time+'</h3></li>');
					
					session = $(this).find('session');

					if(session.children().length == 1){
						//???
						var name = session.find('name').text();
						$('#list-browse-sessions-'+dateID).append('<li><h1 style="color:#E03A3A">'
														+name
														+'</h1>'
														+'</li>');

						
					}
					else if(session.children().length  == 2){
						//coffe break, etc
						var name = session.find('name').text();
						var venue = session.find('venue').text();
						$('#list-browse-sessions-'+dateID).append('<li><h1 style="color:#E03A3A">'
														+name
														+'</h1>'
														+'<h2 >'
														+'venue: '+venue
														+'</h2>'+
														'</li>');
					}
					else if(session.children().length == 3){
						// panel
						var name = session.find('name').text();
						var venue = session.find('venue').text();
						var panelID = name.replace(/\s/g,'_');
						var chair = session.find('chair').text();

						$('#list-browse-sessions-'+dateID).append('<li><a id="'+panelID+'" href="#'+panelID+'_info"><h1>'
														+name
														+'</h1>'
														+'</a></li>');
						$('body').append('<div id="'+panelID+'_info" data-role="page" >'
                                 +'<div data-role="header"  ><h1>Panel</h1><a href="#" class="ui-btn-left" data-rel="back">Back</a>'
                                 +'<a href="/" rel="external" data-transition="fade" data-icon="home" class="ui-btn-right">Home</a>'
                                 +'</div>'
                                 +'<div data-role="content" class="ui-content">'
                                 +'<h1>'+name+'</h1>'
                                 +'<hr>'
                                 +'<h2> Chair: '+chair+'</h1>'
                                 +'<hr>'
                                 +'<h2> Venue: '+venue+'</h1>'
                                 +'</div>'
                                 +'</div>');

					}
					else if(session.children().length == 5){
						//keynote
						var name = session.find('name').text();
						var title = session.find('title').text();
						var speaker = session.find('speaker').text();
						var chair = session.find('chair').text();
						var venue = session.find('venue').text();
						var keynoteID = name.replace(/\s/g,'_');
						$('#list-browse-sessions-'+dateID).append('<li><a id="'+keynoteID+'" href="#'+keynoteID+'_info"><h1 style="color:#E03A3A">'
														+name
														+'</h1>'
														+'<h2>'
														+title
														+'</h2>'+
														'</a></li>');
						$('body').append('<div id="'+keynoteID+'_info" data-role="page" >'
                                 +'<div data-role="header"  ><h1>'+name+'</h1><a href="#" class="ui-btn-left" data-rel="back">Back</a>'
                                 +'<a href="/" rel="external" data-transition="fade" data-icon="home" class="ui-btn-right">Home</a>'
                                 +'</div>'
                                 +'<div data-role="content" class="ui-content">'
                                 +'<h1>'+title+'</h1>'
                                 +'<hr>'
                               	 +'<span style="display:inline-block"><h2 style="color:#E03A3A"> Speaker: </h2></span>'
                                 +'&nbsp'
                                 +'<span style="display:inline-block"><h2 style="color:black">'+speaker+'</h2></span>'
                                 +'<hr>'
                                 +'<span style="display:inline-block"><h2 style="color:#E03A3A"> Chair: </h2></span>'
                                 +'&nbsp'
                                 +'<span style="display:inline-block"><h2 style="color:black">'+chair+'</h2></span>'
                                 +'<hr>'
                                 +'<span style="display:inline-block"><h2 style="color:#E03A3A"> Venue: </h2></span>'
                                 +'&nbsp'
                                 +'<span style="display:inline-block"><h2 style="color:black">'+venue+'</h2></span>'
                                 +'</div>'
                                 +'</div>'
                                 +'</div>');
					}
					else{
						//session
						var ID,name,chair,venue;						
						session.each(function(){
							name = $(this).find('name').text();
							chair = $(this).find('chair').text();
							venue = $(this).find('venue').text();
							ID = $(this).find('ID').text();
							$('#list-browse-sessions-'+dateID).append('<li><a id="'+ID+'" href="#'+ID+'_list"><div><span style="display:inline-block"><h1 style="color:#E03A3A">'
															+'Session: </h1></span>&nbsp<span  style="display:inline-block"> <h1 style="color:black">'+ID+'</h1>'
															+'</span></div>'
															+'<div><span style="display:inline-block"><h1 style="color:#E03A3A">'
															+'Session Topic:</h1></span>&nbsp<span style="display:inline-block"> <h1 style="color:black">'+name+'</h1>'
															+'</span></div>'
															+'</a></li>');
							$('body').append('<div id="'+ID+'_list" data-role="page" >'
                                 +'<div data-role="header"  ><h1>Session '+ID+'</h1><a href="#" class="ui-btn-left" data-rel="back">Back</a>'
                                 +'<a href="/" rel="external" data-transition="fade" data-icon="home" class="ui-btn-right">Home</a>'
                                 +'</div>'
                                 +'<div data-role="content" class="ui-content">'
                                 +'<div id="sessionInfo">'
                                 +'<span style="display:inline-block"><h1 style="color:#E03A3A"> Session: </h1></span>'
                                 +'&nbsp'
                                 +'<span style="display:inline-block"><h1 style="color:black">'+name+'</h1></span>'
                                 +'<hr>'
                                 +'<span style="display:inline-block"><h2 style="color:#E03A3A"> Chair: </h2></span>'
                                 +'&nbsp'
                                 +'<span style="display:inline-block"><h2 style="color:black">'+chair+'</h2></span>'
                                 +'<hr>'
                                 +'<span style="display:inline-block"><h2 style="color:#E03A3A"> Venue: </h2></span>'
                                 +'&nbsp'
                                 +'<span style="display:inline-block"><h2 style="color:black">'+venue+'</h2></span>'
                                 +'</div>'
                                 +'<ul data-role="listview" data-inset="true" class="ui-listview" id="'+dateID+'_session_'+ID+'" ></ul>'
                                 +'</div>'
                                 +'</div>');
						});
						
						
					}

			});
		}

	});
	
}

function parsePaperList(data,date,sessionID,listviewID){
	var xmlData = $(data);
		xmlData.find('day').each(function(){
			day = $(this);
			if( day.find('date').text() == date){
				day.find('time_interval').each(function(){
					session = $(this).find('session');
					if(session.children().length > 5){
						session.each(function(){
							if($(this).find('ID').text() == sessionID){
								$(listviewID).empty();
								$(this).find('paper').each(function(){
									$(listviewID).append('<li><a id="'+$(this).find('paperID').text()+'_id" href="#'+$(this).find('paperID').text()+'_detail"><h1>'
																+'Title: '+$(this).find('title').text()
																+'</h1>'
																+'<h1>'
																+'Type: '+$(this).find('type').text()
																+'</h1>'
																+'<h1>'
																+'Author: '+$(this).find('author').text()
																+'</h1>'+
																'</a></li>');
									var authors = $(this).find('author').text().toLowerCase();;
									var paperDetailID;
									var tempId;
									$('#'+$(this).find('paperID').text()+'_id').on('click', (function(authors) {
										return function(){
											tempID = $(this).attr('id');
											paperDetailID = tempID.split('_');
											
											insertPaperAuthors(authors, paperDetailID[0]);
											$('#'+paperDetailID[0]+'_paper-list-authors').listview('refresh');
										}
									})(authors));

								});

							}		
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
		dateID = dateID[0].replace(/\s/g,'_');
		
		
		$('body').append('<div id="'+dateID+'_program" data-role="page" data-add-back-btn="true">'
                         +'<div data-role="header" ><h1>'+date+'</h1><a href="/" rel="external" data-transition="fade" data-icon="home" class="ui-btn-right">Home</a>'
                         +'<a href="#" class="ui-btn-left" data-rel="back">Back</a>'
                         +'</div>'
                         +'<div data-role="content" class="ui-content" role="main" ><ul data-role="listview" id="list-browse-sessions-'+dateID+'" class="ui-listview"></ul>'
                         +'</div>'
                         +'</div>');




		          $(document).on("pagecreate", '#'+dateID+'_program', function() {
                    var page = $(this);
                    // load data
                       $('#list-browse-sessions-'+dateID).empty();
                       	parseSession(data,date);
                       	$('#list-browse-sessions-'+dateID).listview('refresh');
                       	$('#list-browse-sessions-'+dateID).on('click','a',function(){
				    		var id = $(this).attr('id');	
					    	parsePaperList(data,date,id,'#'+dateID+'_session_'+id);
					    	$('#'+dateID+'_session_'+id).listview('refresh');
						});

                   });

		});

}

