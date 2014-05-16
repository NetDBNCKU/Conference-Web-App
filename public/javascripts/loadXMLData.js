var time_gTmp;
window.flag = 0; 	//for avoiding createProgramList  two times

$(document).on("pagecreate", '#programPage', function() {
	var page = $(this);

	// load data
	if(window.flag == 0){
		window.flag = 1;
	    $.get('/static/ProgramFinal.xml',function(data){
	    	$('#list-browse-sessions').empty();
	        parseDay(data);
	        $("#list-browse-sessions").listview().listview('refresh');

	        createProgramList(data);
	    },'xml');
	}


	if(PaperDetailcreated === false){
	    $.get('/static/paper.xml',function(data){
		        createPaperDetail(data);
	    },'xml');
    	PaperDetailcreated = true;
	}
});

function parseDay(data){
	var xmlData = $(data);
	$('#list-browse-sessions').append('<li><a id="May_13_2014" href="#May_13_program"><h1>May 13, 2014</h1></a></li>');
	$('#May_13_2014').on('click', function(){ time_gTmp = 'May 13, 2014'; });  //Save to global var. myProgram need it while constructed
	// $('#May_13_program').on('pagebeforeshow', function(){ time_gTmp = 'May 13, 2014'; });

	xmlData.find('day').each(function(){
		var day = $(this);
		var date = day.find('date').text();
		var dateID = date.split(',');
		dateID = dateID[0].replace(/\s/g,'_');
				$('#list-browse-sessions').append('<li><a id="'+dateID+'" href="#'+dateID+'_program">'
													+'<h1>'
													+date
													+'</h1>'+
													'</a></li>');

		$('#'+dateID).on('click', function(){ time_gTmp = date; });  //Record the date u r in and save to global var. myProgram needs it while constructed
		// $('#'+dateID+'_program').on('pagebeforeshow', function(){ time_gTmp = date; });
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

						var ID = session.find('ID');
						if(!ID.length){
							var names = session.find('name').text();
							var name = names.split(': ');
							var venue = session.find('venue').text();
							var panelID = names.replace(/\s|,/g,'_');
							var panelID_myprogram = panelID.split(':');   panelID = panelID_myprogram[1];
							var chair = session.find('chair').text();
							var imgID = 'addProgram_panel_'+panelID_myprogram[0];

							if(pageMap[panelID+'_info'] == 1)
									return;
							else
									pageMap[panelID+"_info"] = 1;

							$('#list-browse-sessions-'+dateID).append('<li><a id="'+panelID+'" href="#'+panelID+'_info" >'
														+'<h1 style="color:#E03A3A">Panel: </h1>'
														+'<h1>'
														+name[1]
														+'</h1>'
														+'</a></li>');

							$('body').append('<div id="'+panelID+'_info" data-role="page" timeDetails="'+time+'">'
	                                 +'<div data-role="header"  ><h1>Panel</h1><a href="#" class="ui-btn-left" data-rel="back">Back</a>'
	                                 +'<a href="#page-home" data-transition="fade" data-icon="home" class="ui-btn-right">Home</a>'
	                                 +'</div>'
	                                 +'<div data-role="content" class="ui-content title">'
	                                 +'<span style="display:inline-block"><h2 style="color:#E03A3A"> Panel: </h2></span>'
	                                 +'&nbsp'
	                                 +'<span style="display:inline-block"><h2 style="color:black" id="pcName">'+name+'</h2></span>'
	                                 +'<hr>'
	                                 +'<span style="display:inline-block"><h2 style="color:#E03A3A"> Chair: </h2></span>'
	                                 +'&nbsp'
	                                 +'<span style="display:inline-block"><h2 style="color:black" id="pcChair">'+chair+'</h2></span>'
	                                 +'<hr>'
	                                 +'<span style="display:inline-block"><h2 style="color:#E03A3A"> Venue: </h2></span>'
	                                 +'&nbsp'
	                                 +'<span style="display:inline-block"><h2 style="color:black" id="pcVenue">'+venue+'</h2></span>'
	                                 +'<hr>'
                                 	 +'<a href="#" id="'+imgID+'" data-rel="popup" data-position-to="window" ><img src="/images/addProgram.png" style="width:40px;height:40px;padding:5px;" class="myProgramIcon" ></a>'
	                                 +'<div data-role="popup" class="addProgramDialog" id="myPopupDialog_ADD_'+panelID+'" ><a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-left">Close</a><div data-role="header"><h1>Info</h1></div><div data-role="main" class="ui-content"><h2>Your Program is added!</h2></div></div>'
                        			 +'<div data-role="popup" class="addProgramDialog" id="myPopupDialog_REMOVE_'+panelID+'" ><a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-left">Close</a><div data-role="header"><h1>Info</h1></div><div data-role="main" class="ui-content"><h2>Your Program is removed!</h2></div></div>'
	                                 +'</div>'
	                                 +'</div>');




								// here to change img if the program was added to myProgram
								$(document).on("pagecreate", '#'+panelID+'_info', function(){

									var idList = localStorage.getItem("MYPROGRAM_LIST_RECORDED");
									if(idList != null && idList.search(panelID+"_info"+"_splitPattern_") != "-1"){
										$(this).find('#'+imgID).find('img').attr('src', "/images/removeProgram.png");
										$('#'+imgID).attr('href', '#myPopupDialog_REMOVE_'+panelID);
									}
									else{
										$(this).find('#'+imgID).find('img').attr('src', "/images/addProgram.png");
										$('#'+imgID).attr('href', '#myPopupDialog_ADD_'+panelID);
									}
								});


								/// here to add session to myProgramList
								$('#addProgram_panel_'+panelID_myprogram[0]).off('click').on('click',function(){

										//Store info of workshop to localStorage, used in myProgram
										var storageTime = time_gTmp;
										var storageTime_details = $('#'+panelID+'_info').attr('timeDetails');
										var storageId = panelID+"_info";
										var storagePanel = $("#pcName").html();   // Strange!! here cannot not use... $(panelID+"_info" + " #pcName").html();
										var storageChair = $("#pcChair").html();
										var storageVenue = $("#pcVenue").html();

										if($(this).find('img').attr('src') == '/images/addProgram.png'){
											storageType1(storageTime, storageTime_details, storageId, storagePanel, storageChair, storageVenue);
											$(this).find('img').attr('src','/images/removeProgram.png');
											$('#'+imgID).attr('href', '#myPopupDialog_ADD_'+panelID);
										}
										else{
											removeProgram(storageId);
											$(this).find('img').attr('src','/images/addProgram.png');
											$('#'+imgID).attr('href', '#myPopupDialog_REMOVE_'+panelID);
										}


								});

						}
					}
					else if(session.children().length == 5){
						//keynote
						var name = session.find('name').text();
						var title = session.find('title').text();
						var speaker = session.find('speaker').text();
						var chair = session.find('chair').text();
						var venue = session.find('venue').text();
						var keynoteID = name.replace(/\s/g,'_');
						var imgID = 'addProgram_keynote_'+keynoteID;

						if(pageMap[keynoteID+'_info'] == 1)
							return;
						else
							pageMap[keynoteID+"_info"] = 1;

						$('#list-browse-sessions-'+dateID).append('<li><a id="'+keynoteID+'" href="#'+keynoteID+'_info"><h1 style="color:#E03A3A">'
														+name
														+'</h1>'
														+'<h2>'
														+title
														+'</h2>'+
														'</a></li>');

						$('body').append('<div id="'+keynoteID+'_info" data-role="page" timeDetails="'+time+'">'
                                 +'<div data-role="header"  ><h1>'+name+'</h1><a href="#" class="ui-btn-left" data-rel="back">Back</a>'
                                 +'<a href="#page-home" data-transition="fade" data-icon="home" class="ui-btn-right">Home</a>'
                                 +'</div>'
                                 +'<div data-role="content" class="ui-content title">'
                                 +'<h1 id="keynoteTitle">'+title+'</h1>'
                                 +'<hr>'
                               	 +'<span style="display:inline-block"><h2 style="color:#E03A3A"> Speaker: </h2></span>'
                                 +'&nbsp'
                                 +'<span style="display:inline-block"><h2 style="color:black" id="keynoteSpeaker">'+speaker+'</h2></span>'
                                 +'<hr>'
                                 +'<span style="display:inline-block"><h2 style="color:#E03A3A"> Chair: </h2></span>'
                                 +'&nbsp'
                                 +'<span style="display:inline-block"><h2 style="color:black" id="keynoteChair">'+chair+'</h2></span>'
                                 +'<hr>'
                                 +'<span style="display:inline-block"><h2 style="color:#E03A3A"> Venue: </h2></span>'
                                 +'&nbsp'
                                 +'<span style="display:inline-block"><h2 style="color:black" id="keynoteVenue">'+venue+'</h2></span>'
                                 +'</div>'
                                 +'<hr>'
                                 +'<a href="#" id="'+imgID+'" data-rel="popup" data-position-to="window" ><img src="/images/addProgram.png" style="width:40px;height:40px;padding:5px;" class="myProgramIcon" ></a>'
                                 +'<div data-role="popup" class="addProgramDialog" id="myPopupDialog_ADD_'+keynoteID+'" ><a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-left">Close</a><div data-role="header"><h1>Info</h1></div><div data-role="main" class="ui-content"><h2>Your Program is added!</h2></div></div>'
                        		 +'<div data-role="popup" class="addProgramDialog" id="myPopupDialog_REMOVE_'+keynoteID+'" ><a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-left">Close</a><div data-role="header"><h1>Info</h1></div><div data-role="main" class="ui-content"><h2>Your Program is removed!</h2></div></div>'
                                 +'</div>'
                                 +'</div>');

						// here to change img if the program was added to myProgram
						$(document).on("pagecreate", '#'+keynoteID+'_info', function(){
							var idList = localStorage.getItem("MYPROGRAM_LIST_RECORDED");
							if(idList != null && idList.search(keynoteID+'_info'+"_splitPattern_") != "-1"){
								$(this).find('#'+imgID).find('img').attr('src', "/images/removeProgram.png");
								$('#'+imgID).attr('href', '#myPopupDialog_REMOVE_'+keynoteID);
							}
							else{
								$(this).find('#'+imgID).find('img').attr('src', "/images/addProgram.png");
								$('#'+imgID).attr('href', '#myPopupDialog_ADD_'+keynoteID);
							}
						});



						/// here to add session to myProgramList
						$('#addProgram_keynote_'+keynoteID).off('click').on('click',function(){
								//Store/Remove info of workshop to localStorage, used in myProgram
								var storageTime = time_gTmp;
								var storageTime_details = $('#'+keynoteID+'_info').attr("timeDetails");
								var storageId = keynoteID+'_info';
								var storageSpeaker = $("#"+storageId + " #keynoteSpeaker").html();
								var storageChair = $("#"+storageId + " #keynoteChair").html();
								var storageVenue = $("#"+storageId + " #keynoteVenue").html();
								var storageTitle = $("#"+storageId + " #keynoteTitle").html();

								if($(this).find('img').attr('src') == '/images/addProgram.png'){
									storageType2(storageTime, storageTime_details, storageId, storageTitle, storageSpeaker, storageChair, storageVenue);
									$(this).find('img').attr('src','/images/removeProgram.png');
									$('#'+imgID).attr('href', '#myPopupDialog_ADD_'+keynoteID);
								}
								else{
									removeProgram(storageId);
									$(this).find('img').attr('src','/images/addProgram.png');
									$('#'+imgID).attr('href', '#myPopupDialog_REMOVE_'+keynoteID);
								}
						});


					}
					else{
						//session
						var ID,name,chair,venue;
						session.each(function(){
							if($(this).children().length == 4){
								var ID = $(this).find('ID');
								if(ID.length){
									ID = $(this).find('ID').text();
									var name = $(this).find('name').text();
									var contestID = name.replace(/\s/g,'_');
									var chair = $(this).find('chair').text();
									var venue = $(this).find('venue').text();
									var imgID = 'addProgram_session_'+contestID;

									if(pageMap[contestID+'_info'] == 1)
										return;
									else
										pageMap[contestID+"_info"] = 1;

									$('#list-browse-sessions-'+dateID).append('<li><a id="'+contestID+'" href="#'+contestID+'_info"><div><span style="display:inline-block"><h1 style="color:#E03A3A">'
																	+'Session: </h1></span>&nbsp<span  style="display:inline-block"> <h1 style="color:black">'+ID+'</h1>'
																	+'</span></div>'
																	+'<div><span style="display:inline-block"><h1 style="color:#E03A3A">'
																	+'Session Topic:</h1></span>&nbsp<span style="display:inline-block"> <h1 style="color:black">'+name+'</h1>'
																	+'</span></div>'
																	+'</a></li>');

									$('body').append('<div id="'+contestID+'_info" data-role="page" timeDetails="'+time+'">'
																		+'<div data-role="header"  ><h1>Session '+ID+'</h1><a href="#" class="ui-btn-left" data-rel="back">Back</a>'
																		+'<a href="#page-home" data-transition="fade" data-icon="home" class="ui-btn-right">Home</a>'
																		+'</div>'
																		+'<div data-role="content" class="ui-content title">'
																		+'<div id="sessionInfo">'
																		+'<span style="display:inline-block"><h1 style="color:#E03A3A"> Session: </h1></span>'
																		+'&nbsp'
																		+'<span style="display:inline-block"><h1 style="color:black" id="svName">'+name+'</h1></span>'
																		+'<hr>'
																		+'<span style="display:inline-block"><h2 style="color:#E03A3A"> Chair: </h2></span>'
																		+'&nbsp'
																		+'<span style="display:inline-block"><h2 style="color:black" id="scChair">'+chair+'</h2></span>'
																		+'<hr>'
																		+'<span style="display:inline-block"><h2 style="color:#E03A3A"> Venue: </h2></span>'
																		+'&nbsp'
																		+'<span style="display:inline-block"><h2 style="color:black" id="svVenue">'+venue+'</h2></span>'
																		+'<hr>'
																		+'<a href="#" id="'+imgID+'" data-rel="popup" data-position-to="window" ><img src="/images/addProgram.png" style="width:40px;height:40px;padding:5px;" class="myProgramIcon" ></a>'
																		+'</div>'
																		+'<div data-role="popup" class="addProgramDialog" id="myPopupDialog_ADD_'+contestID+'" ><a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-left">Close</a><div data-role="header"><h1>Info</h1></div><div data-role="main" class="ui-content"><h2>Your Program is added!</h2></div></div>'
																+'<div data-role="popup" class="addProgramDialog" id="myPopupDialog_REMOVE_'+contestID+'" ><a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-left">Close</a><div data-role="header"><h1>Info</h1></div><div data-role="main" class="ui-content"><h2>Your Program is removed!</h2></div></div>'
																		+'</div>'
																		+'</div>');

									// here to change img if the program was added to myProgram
									$(document).on("pagecreate", '#'+contestID+'_info', function(){
										var idList = localStorage.getItem("MYPROGRAM_LIST_RECORDED");
										if(idList != null && idList.search(contestID+'_info'+"_splitPattern_") != "-1"){
											$(this).find('#'+imgID).find('img').attr('src', "/images/removeProgram.png");
											$('#'+imgID).attr('href', '#myPopupDialog_REMOVE_'+contestID);
										}
										else{
											$(this).find('#'+imgID).find('img').attr('src', "/images/addProgram.png");
											$('#'+imgID).attr('href', '#myPopupDialog_ADD_'+contestID);
										}
									});


									$('#addProgram_session_'+contestID).off('click').on('click',function(){
											//Store info of workshop to localStorage, used in myProgram
											var storageTime = time_gTmp;
											var storageTime_details = $('#'+contestID+'_info').attr('timeDetails');
											var storageId = contestID+'_info';
											var storageName = $("#"+storageId + " #svName").html();
											var storageVenue = $("#"+storageId + " #svVenue").html();

											if($(this).find('img').attr('src') == '/images/addProgram.png'){
												storageType3(storageTime, storageTime_details, storageId, storageName, storageVenue);
												$(this).find('img').attr('src','/images/removeProgram.png');
												$('#'+imgID).attr('href', '#myPopupDialog_ADD_'+contestID);
											}
											else{
												removeProgram(storageId);
												$(this).find('img').attr('src','/images/addProgram.png');
												$('#'+imgID).attr('href', '#myPopupDialog_REMOVE_'+contestID);
											}
									});
								}
								else if(!ID.length){
									// tutorial
									var name = $(this).find('name').text();
									var tutorialID = name.replace(/\s/g,'_');
									var venue = $(this).find('venue').text();
									var lecturer = $(this).find('lecturer').text();
									var title = $(this).find('title').text();
									var imgID = 'addProgram_tutorial_'+tutorialID;

									if(pageMap[tutorialID+'_info'] == 1)
										return;
									else
										pageMap[tutorialID+"_info"] = 1;

									$('#list-browse-sessions-'+dateID).append('<li><a id="'+tutorialID+'" href="#'+tutorialID+'_info"><div><span style="display:inline-block"><h1 style="color:#E03A3A">'
																	+name+': </h1></span>&nbsp<span  style="display:inline-block"> <h1 style="color:black">'+title+'</h1>'
																	+'</span></div>'
																	+'</a></li>');
									$('body').append('<div id="'+tutorialID+'_info" data-role="page" timeDetails="'+time+'">'
																			+'<div data-role="header"  ><h1>Panel</h1><a href="#" class="ui-btn-left" data-rel="back">Back</a>'
																			+'<a href="#page-home" data-transition="fade" data-icon="home" class="ui-btn-right">Home</a>'
																			+'</div>'
																			+'<div data-role="content" class="ui-content title">'
																			+'<span style="display:inline-block"><h2 style="color:#E03A3A" id="lecName">'+name+'</h2></span>'
																			+'&nbsp'
																			+'<span style="display:inline-block"><h2 style="color:black" id="lecTitle">'+title+'</h2></span>'
																			+'<hr>'
																			+'<span style="display:inline-block"><h2 style="color:#E03A3A"> Lecturer: </h2></span>'
																			+'&nbsp'
																			+'<span style="display:inline-block"><h2 style="color:black" id="lecLecturer">'+lecturer+'</h2></span>'
																			+'<hr>'
																			+'<span style="display:inline-block"><h2 style="color:#E03A3A"> Venue: </h2></span>'
																			+'&nbsp'
																			+'<span style="display:inline-block"><h2 style="color:black" id="lecVenue">'+venue+'</h2></span>'
																			+'<hr>'
																			+'<a href="#" id="'+imgID+'" data-rel="popup" data-position-to="window" ><img src="/images/addProgram.png" style="width:40px;height:40px;padding:5px;" class="myProgramIcon" ></a>'
																			+'<div data-role="popup" class="addProgramDialog" id="myPopupDialog_ADD_'+tutorialID+'" ><a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-left">Close</a><div data-role="header"><h1>Info</h1></div><div data-role="main" class="ui-content"><h2>Your Program is added!</h2></div></div>'
																		+'<div data-role="popup" class="addProgramDialog" id="myPopupDialog_REMOVE_'+tutorialID+'" ><a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-left">Close</a><div data-role="header"><h1>Info</h1></div><div data-role="main" class="ui-content"><h2>Your Program is removed!</h2></div></div>'
																			+'</div>'
																			+'</div>');

									// here to change img if the program was added to myProgram
									$(document).on("pagecreate", '#'+tutorialID+'_info', function(){
										var idList = localStorage.getItem("MYPROGRAM_LIST_RECORDED");
										if(idList != null && idList.search(tutorialID+'_info'+"_splitPattern_") != "-1"){
											$(this).find('#'+imgID).find('img').attr('src', "/images/removeProgram.png");
											$('#'+imgID).attr('href', '#myPopupDialog_REMOVE_'+tutorialID);
										}
										else{
											$(this).find('#'+imgID).find('img').attr('src', "/images/addProgram.png");
											$('#'+imgID).attr('href', '#myPopupDialog_ADD_'+tutorialID);
										}
									});


									/// here to add session to myProgramList
									$('#addProgram_tutorial_'+tutorialID).off('click').on('click',function(){
											//Store info of workshop to localStorage, used in myProgram
											var storageTime = time_gTmp;
											var storageTime_details = $('#'+tutorialID+'_info').attr('timeDetails');
											var storageId = tutorialID+'_info';
											var storageName = $("#"+storageId + " #lecName").html();
											var storageTitle = $("#"+storageId + " #lecTitle").html();
											var storageLecturer = $("#"+storageId + " #lecLecturer").html();
											var storageVenue = $("#"+storageId + " #lecVenue").html();

											if($(this).find('img').attr('src') == '/images/addProgram.png'){
												storageType4(storageTime, storageTime_details, storageId, storageName, storageTitle, storageLecturer, storageVenue);
												$(this).find('img').attr('src','/images/removeProgram.png');
												$('#'+imgID).attr('href', '#myPopupDialog_ADD_'+tutorialID);
											}
											else{
												removeProgram(storageId);
												$(this).find('img').attr('src','/images/addProgram.png');
												$('#'+imgID).attr('href', '#myPopupDialog_REMOVE_'+tutorialID);
											}
									});
								}

							}

							else{
								///Type 5
								var name = $(this).find('name').text();
								var chair = $(this).find('chair').text();
								var venue = $(this).find('venue').text();
								var ID = $(this).find('ID').text();
								var imgID = 'addProgram_'+ID;

								if(pageMap[ID+"_list"] == 1)
									return;
								else
									pageMap[ID+"_list"] = 1;


								$('#list-browse-sessions-'+dateID).append('<li><a id="'+ID+'" href="#'+ID+'_list"><div><span style="display:inline-block"><h1 style="color:#E03A3A">'
																+'Session: </h1></span>&nbsp<span  style="display:inline-block"> <h1 style="color:black">'+ID+'</h1>'
																+'</span></div>'
																+'<div><span style="display:inline-block"><h1 style="color:#E03A3A">'
																+'Session Topic:</h1></span>&nbsp<span style="display:inline-block"> <h1 style="color:black">'+name+'</h1>'
																+'</span></div>'
																+'</a></li>');


								$('body').append('<div id="'+ID+'_list" data-role="page" timeDetails="'+time+'">'
	                                 +'<div data-role="header"  ><h1>Session '+ID+'</h1><a href="#" class="ui-btn-left" data-rel="back">Back</a>'
	                                 +'<a href="#page-home" data-transition="fade" data-icon="home" class="ui-btn-right">Home</a>'
	                                 +'</div>'
	                                 +'<div data-role="content" class="ui-content title">'
	                                 +'<div id="sessionInfo">'
	                                 +'<span style="display:inline-block"><h1 style="color:#E03A3A"> Session: </h1></span>'
	                                 +'&nbsp'
	                                 +'<span style="display:inline-block"><h1 style="color:black" id="scName">'+name+'</h1></span>'
	                                 +'<hr>'
	                                 +'<span style="display:inline-block"><h2 style="color:#E03A3A"> Chair: </h2></span>'
	                                 +'&nbsp'
	                                 +'<span style="display:inline-block"><h2 style="color:black" id="scChair">'+chair+'</h2></span>'
	                                 +'<hr>'
	                                 +'<span style="display:inline-block"><h2 style="color:#E03A3A"> Venue: </h2></span>'
	                                 +'&nbsp'
	                                 +'<span style="display:inline-block"><h2 style="color:black" id="scVenue">'+venue+'</h2></span>'
	                                 +'<hr>'
                           		     +'<a href="#" id="'+imgID+'" data-rel="popup" data-position-to="window"><img src="/images/addProgram.png" style="width:40px;height:40px;padding:5px;" class="myProgramIcon" ></a>'
	                                 +'</div>'
	                                 +'<ul data-role="listview" data-inset="true" class="ui-listview" id="'+dateID+'_session_'+ID+'" ></ul>'
	                                 +'<div data-role="popup" class="addProgramDialog" id="myPopupDialog_ADD_'+ID+'" ><a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-left">Close</a><div data-role="header"><h1>Info</h1></div><div data-role="main" class="ui-content"><h2>Your Program is added!</h2></div></div>'
                        			 +'<div data-role="popup" class="addProgramDialog" id="myPopupDialog_REMOVE_'+ID+'" ><a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-left">Close</a><div data-role="header"><h1>Info</h1></div><div data-role="main" class="ui-content"><h2>Your Program is removed!</h2></div></div>'
	                                 +'</div>'
	                                 +'</div>');



								// here to change img if the program was added to myProgram
								$(document).on("pagecreate", '#'+ID+"_list", function(){
									var idList = localStorage.getItem("MYPROGRAM_LIST_RECORDED");
									if(idList != null && idList.search(ID+"_list"+"_splitPattern_") != "-1"){
	//									console.log("add of type5");
										$(this).find('#'+imgID).find('img').attr('src', "/images/removeProgram.png");
										$('#'+imgID).attr('href', '#myPopupDialog_REMOVE_'+ID);
									}
									else{
										$(this).find('#'+imgID).find('img').attr('src', "/images/addProgram.png");
										$('#'+imgID).attr('href', '#myPopupDialog_ADD_'+ID);
									}
								});

								/// here to add session to myProgramList
								$('#addProgram_'+ID).off('click').on('click',function(){

										//Store info of workshop to localStorage, used in myProgram
										var storageTime = time_gTmp;
										var storageTime_details = $('#'+ID+'_list').attr('timeDetails');
										var storageId = ID+"_list";
										var storageName = $("#"+storageId + " #scName").html();
										var storageChair = $("#"+storageId + " #scChair").html();
										var storageVenue = $("#"+storageId + " #scVenue").html();

										if($(this).find('img').attr('src') == '/images/addProgram.png'){
											storageType5(storageTime, storageTime_details, storageId, storageName, storageChair, storageVenue);
											$(this).find('img').attr('src','/images/removeProgram.png');
											$('#'+imgID).attr('href', '#myPopupDialog_ADD_'+ID);
										}
										else{
											removeProgram(storageId);
											$(this).find('img').attr('src','/images/addProgram.png');
											$('#'+imgID).attr('href', '#myPopupDialog_REMOVE_'+ID);
										}
								});
							}

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
									//var authors = $(this).find('author').text().toUpperCase();;
									var authors = $(this).find('author').text();
									var paperDetailID;
									var tempId;
									$('#'+$(this).find('paperID').text()+'_id').on('click', (function(authors) {
										return function(){
											tempID = $(this).attr('id');
											paperDetailID = tempID.split('_');

											insertPaperAuthors(authors, paperDetailID[0]);
											$('#'+paperDetailID[0]+'_paper-list-authors').listview().listview('refresh');
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



function createProgramList_workshop(){
	$('body').append('<div id="May_13_program" data-role="page" data-add-back-btn="true">'
                         +'<div data-role="header" ><h1 style="white-space:normal;">May 13, 2014 - WorkShop</h1><a href="#page-home" data-transition="fade" data-icon="home" class="ui-btn-right">Home</a>'
                         +'<a href="#" class="ui-btn-left" data-rel="back">Back</a>'
                         +'</div>'
                         +'<div data-role="content" class="ui-content" role="main" ><ul data-role="listview" id="list-browse-sessions-May_13" class="ui-listview"></ul>'
                         +'</div>'
                         +'</div>');


	// load data for workshop
    $.get('/static/workshop.xml',function(data){
    	$('#list-browse-sessions-May_13').empty();
    		parseWorkshopList(data);
    	$('#list-browse-sessions-May_13').listview().listview('refresh');
    		createWorkshopPage(data);
    },'xml');
}

function parseWorkshopList(data){
	var xmlData = $(data);
	var workshopID;
	var workshopID_forpage;
	var workshopName;
	xmlData.find('workshop').each(function(){
	workshopID = $(this).find('workshopID').text();
	workshopID_forpage = workshopID.replace(/\&/g,'_');
	workshopName = $(this).find('workshopName').text();
	var workshopNameList;
	if(workshopName.split('/').length > 1){
		workshopNameList = workshopName.split('/');
		workshopName = workshopNameList[0]+'<br>'+workshopNameList[1];
	}
		$('#list-browse-sessions-May_13').append('<li>'
												+'<a id="'+workshopID_forpage+'_workshop" href="#'+workshopID_forpage+'_workshopdetail">'
												+'<h3 style="white-space:normal;">'+workshopName+'</h3></a></li>');

	});

}



function createWorkshopPage(data){
	var xmlData = $(data);
	var workshopName;
	var workshopID;

	xmlData.find('workshop').each(function(){
		workshopName = $(this).find('workshopName').text();
		var workshopNameList;
		if(workshopName.split('/').length > 1){
			workshopNameList = workshopName.split('/');
			workshopName = workshopNameList[0]+'<br>'+workshopNameList[1];
		}
		workshopID = $(this).find('workshopID').text();
		var workshopID_forpage = workshopID.replace(/\&/g,'_');
		var imgID = 'addProgram_workshop_'+workshopID_forpage;
		venue = $(this).find('venue').text();

		if(pageMap[workshopID_forpage+'_workshopdetail'] == 1)
			return;
		else
			pageMap[workshopID_forpage+'_workshopdetail'] = 1;


		$('body').append('<div id="'+workshopID_forpage+'_workshopdetail" data-role="page" data-add-back-btn="true">'
                         +'<div data-role="header" ><h1>WorkShop '+workshopID+'</h1><a href="#page-home" data-transition="fade" data-icon="home" class="ui-btn-right">Home</a>'
                         +'<a href="#" class="ui-btn-left" data-rel="back">Back</a>'
                         +'</div>'
                         +'<div data-role="content" class="ui-content title" role="main" >'
                         +'<span style="display:inline-block"><h1 style="color:#E03A3A"> WorkShop Name: </h1></span>'
                         +'&nbsp'
                         +'<span style="display:inline-block"><h1 id="workshopName" style="color:black">'+workshopName+'</h1></span>'
                         +'<hr>'
                         +'<span style="display:inline-block"><h1 style="color:#E03A3A"> Venue: </h1></span>'
                         +'&nbsp'
                         +'<span style="display:inline-block"><h1 id="venue" style="color:black">'+venue+'</h1></span>'
                         +'<hr>'
                         +'<a id="'+imgID+'" href="#myPopupDialog_ADD_'+workshopID_forpage+'" data-rel="popup" data-position-to="window"  workshopName="'+workshopName+'"><img src="/images/addProgram.png" style="width:40px;height:40px;padding:5px;" class="myProgramIcon" ></a>'
                         +'<ul data-role="listview" data-inset="true" id="list-browse-workshop-'+workshopID_forpage+'" class="ui-listview"></ul>'
                         +'<div data-role="popup" class="addProgramDialog" id="myPopupDialog_ADD_'+workshopID_forpage+'" ><a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-left">Close</a><div data-role="header"><h1>Info</h1></div><div data-role="main" class="ui-content"><h2>Your Program is added!</h2></div></div>'
                         +'<div data-role="popup" class="addProgramDialog" id="myPopupDialog_REMOVE_'+workshopID_forpage+'" ><a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-left">Close</a><div data-role="header"><h1>Info</h1></div><div data-role="main" class="ui-content"><h2>Your Program is removed!</h2></div></div>'
                         +'</div>'
                         +'</div>');

		// here to change img if the program was added to myProgram
		$(document).on("pagecreate", '#'+workshopID_forpage+'_workshopdetail', function(){
				console.log("workshop pagecreate");
				var idList = localStorage.getItem("MYPROGRAM_LIST_RECORDED");
				if(idList != null && idList.search(workshopID_forpage+'_workshopdetail'+"_splitPattern_") != "-1"){
					$(this).find('#'+imgID).find('img').attr('src', "/images/removeProgram.png");
					$('#'+imgID).attr('href', '#myPopupDialog_REMOVE_'+workshopID_forpage);

					console.log("remove");
				}
				else{
					$(this).find('#'+imgID).find('img').attr('src', "/images/addProgram.png");
					$('#'+imgID).attr('href', '#myPopupDialog_ADD_'+workshopID_forpage);
					console.log("add");
				}
		});

		// var idList = localStorage.getItem("MYPROGRAM_LIST_RECORDED");
		// if(idList != null){
		// 	if(idList.search(workshopID_forpage+'_workshopdetail'+"_splitPattern_") != "-1"){
		// 		$(this).find('#'+imgID).find('img').attr('src', "/images/removeProgram.png");
		// 		console.log("remove");
		// 	}
		// 	else{
		// 		$(this).find('#'+imgID).find('img').attr('src', "/images/addProgram.png");
		// 		console.log("add");
		// 	}
		// }

		/// here to add session to myProgramList
		$('#addProgram_workshop_'+workshopID_forpage).off('click').on('click',function(){
				//Store info of workshop to localStorage, used in myProgram
				var storageTime = time_gTmp;
				var storageId = workshopID_forpage+'_workshopdetail';
				var storageName = $("#"+storageId + " #workshopName").html();
				var storageVenue = $("#"+storageId + " #venue").html();

				if($(this).find('img').attr('src') == '/images/addProgram.png'){
					storageType6(storageTime, storageId, storageName, storageVenue);
					$(this).find('img').attr('src','/images/removeProgram.png');
					$('#'+imgID).attr('href', '#myPopupDialog_ADD_'+workshopID_forpage);
				}
				else{
					removeProgram(storageId);
					$(this).find('img').attr('src','/images/addProgram.png');
					$('#'+imgID).attr('href', '#myPopupDialog_REMOVE_'+workshopID_forpage);
				}
		});

		$(document).on("pagecreate", '#'+workshopID_forpage+'_workshopdetail', function() {

				$('#list-browse-workshop-'+workshopID_forpage).empty();
				$('#list-browse-workshop-'+workshopID_forpage).listview();
		    	parseWorkshopDetail(data,workshopID_forpage);

		    	$('#list-browse-workshop-'+workshopID_forpage).listview().listview('refresh');

		});
	});
}

function parseWorkshopDetail(data,id){
	var xmlData = $(data);
	var workshopName;
	var workshopID;
	var workshopID_forpage;
	var venue;
	var activity;
	var time;
	var content;
	var sessionName;
	var title;
	var author;
	xmlData.find('workshop').each(function(){
		workshopName = $(this).find('workshopName').text();
		workshopID = $(this).find('workshopID').text();
		workshopID_forpage = workshopID.replace(/\&/g,'_');
		if(workshopID_forpage == id){
			venue = $(this).find('venue').text();
			activity = $(this).find('activity');
			activity.each(function(){
				if($(this).children().length == 2){ //not session
					time = $(this).find('time').text();
					content = $(this).find('detail').text();
					$('#list-browse-workshop-'+workshopID_forpage).append('<li data-role="list-divider"><h3>'+time+'</h3></li>');
					$('#list-browse-workshop-'+workshopID_forpage).append('<li><h1 style="white-space:normal;">'+content+'</h1></li>');
				}
				else{ // session
					sessionName = $(this).find('name').text();
					content = $(this).find('detail').text();
					$('list-browse-workshop-'+workshopID_forpage).append('<li data-role="list-divider"><h1>'+sessionName+'</h1></li>');
					$(this).find('paper').each(function(){
						time = $(this).find('time').text();
						title = $(this).find('title').text();
						author = $(this).find('author').text();
						$('#list-browse-workshop-'+workshopID_forpage).append('<li data-role="list-divider"><h3>'+time+'</h3></li>');
						$('#list-browse-workshop-'+workshopID_forpage).append('<li><h1 style="white-space:normal;">'+title+'</h1><br><h3 style="white-space:normal;">'+author+'</h3></li>');
					});
				}
			});
		}
	});
}

function createProgramList(data){
	var xmlData = $(data);

	createProgramList_workshop();
	xmlData.find('day').each(function(){
		var day = $(this);
		var date = day.find('date').text();
		var dateID = date.split(',');
		dateID = dateID[0].replace(/\s/g,'_');

		$('body').append('<div id="'+dateID+'_program" data-role="page" data-add-back-btn="true">'
                         +'<div data-role="header" ><h1>'+date+'</h1><a href="#page-home" data-transition="fade" data-icon="home" class="ui-btn-right">Home</a>'
                         +'<a href="#" class="ui-btn-left" data-rel="back">Back</a>'
                         +'</div>'
                         +'<div data-role="content" class="ui-content" role="main" ><ul data-role="listview" id="list-browse-sessions-'+dateID+'" class="ui-listview"></ul>'
                         +'</div>'
                         +'</div>');


					$('#list-browse-sessions-'+dateID).empty();
	               	parseSession(data, date);
	               	$('#list-browse-sessions-'+dateID).listview().listview('refresh');

	               	var currentPageID;
	               	$('#list-browse-sessions-'+dateID+' a').each(function(){
	               		currentPageID = $(this).attr("href");
	               		$(currentPageID).on('pagecreate',function(){
			    		var id = $(this).attr('id');
			    		var sessionID = id.split('_');
				    	parsePaperList(data,date,sessionID[0],'#'+dateID+'_session_'+sessionID[0]);
				    	$('#'+dateID+'_session_'+sessionID[0]).listview().listview('refresh');
					});
	               	});

	});
}
