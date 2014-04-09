window.PaperDetailcreated = false;
window.AuthorInfocreated = false;
(function(){
	$.get('/static/author.xml',function(data){
    	if(AuthorInfocreated === false){
    		createAuthorInfo(data);
    		AuthorInfocreated = true;
    	}
    },'xml');
})();
$(document).on("pagecreate", '#paperListPage', function() {
  var page = $(this);
  // load data
    $.get('/static/paper.xml',function(data){
    	$('#list-paperList').empty();
        parsePaperListForpaperList(data);
        $('#list-paperList').listview('refresh');
        if(PaperDetailcreated === false){
        	createPaperDetail(data);
        	PaperDetailcreated = true;
        }
    },'xml');


});

function parsePaperListForpaperList(data){
	var xmlData = $(data);
	var paperList = [];
	var paperID;
	var paperTitle;
	var authors;
	xmlData.find('paper').each(function(){
		 paperID = $(this).find('ID').text();
		 paperTitle = $(this).find('title').text();
		 authors = $(this).find('authors').text();
		
		paperList.push(paperTitle+'%'+authors+'%'+paperID);
	});
	paperList = paperList.sort();
	var paperContent;
	for( paper in paperList){
		paperContent = paperList[paper].split('%');
		$('#list-paperList').append('<li><a id = "'+paperContent[2]+'" href="#'+paperContent[2]+'_detail">'
													+'<h1>'
													+paperContent[0]
													+'</h1>'
													+'<p>'
													+paperContent[1]
													+'</p>'
													+'</a></li>');
		authors = paperContent[1];
		authors = authors.toUpperCase();
		$('#'+paperContent[2]).on('click', (function(authors) {
				return function(){
					tempID = $(this).attr('id');
					paperDetailID = tempID.split('_');
					
					insertPaperAuthorsForPaperList(authors, paperDetailID[0]);
					$('#'+paperDetailID[0]+'_paper-list-authors').listview('refresh');
				}
			})(authors));
			
	}
	
}


//Create Paper Details

function createPaperDetail(data){
	var paperlist = $(data);
	
	var paperTitle;
	var abstract;
	var paperID;
	var authors;
	var authorArray;
	paperlist.find('paper').each(function(){

		paperTitle = $(this).find('title').text();
		paperID = $(this).find('ID').text();
		abstract = $(this).find('abstract').text();
		authors = $(this).find('authors').text();
		authors = authors.toUpperCase();
		authorArray = authors.split(';');
		$('body').append('<div id="'+paperID+'_detail" data-role="page" data-add-back-btn="true">'
	                 +'<div data-role="header" ><h1>Paper details</h1><a href="/" rel="external" data-transition="fade" data-icon="home" class="ui-btn-right">Home</a>'
	                 +'<a href="#" class="ui-btn-left" data-rel="back">Back</a>'
	                 +'</div>'
	                 +'<div data-role="content" class="ui-content" role="main" >'
	                 +'<h2>'+paperTitle+'</h2>'
	                 +'<hr>'
	       		 	 +'<h3>Abstract</h3><hr>'
	       			 +'<div id="abstract">'
	       			 +'<p>'
	       			 +abstract
	       			 +'</p>'
	       			 +'<hr>'
	       			 +'</div>'
	       			 +'<p> Authors </p>'
	       			 +'<ul data-role="listview" data-inset="true" id="'+paperID+'_paper-list-authors" class="ui-listview"></ul>'
	                 +'</div>'
	                 +'</div>');

		/*
			$(document).on("pagecreate", '#'+paperID+'_detail', function() {
			  	insertPaperAuthorsForPaperList(authors,paperID);
			});
		*/		        

		
		});

}

function insertPaperAuthors(authors, paperID){
	authors = authors.toUpperCase();
	authorArray = authors.split(', ');
	$('#'+paperID+'_paper-list-authors').empty();
	for(i=0;i<authorArray.length;i++){
					var authorName = authorArray[i];
					var tempname = authorName.replace(/\s/g,'_').split('(')[0];
					var name = tempname.substring(0,tempname.length);
					$('#'+paperID+'_paper-list-authors').append('<li><a id = "'+name+'_info_paper" href="#'+name+'_info">'
																+'<h1>'
																+name.replace(/_/g,' ')
																+'</h1>'
																+'</a></li>');	
				}
}

function insertPaperAuthorsForPaperList(authors, paperID){
	authors = authors.toUpperCase();
	authorArray = authors.split('),');
	$('#'+paperID+'_paper-list-authors').listview().empty();
	for(i=0;i<authorArray.length;i++){
					var authorName = authorArray[i];
					var tempname = authorName.replace(/\s/g,'_').split('(')[0];
					var name = tempname.substring(0,tempname.length-1);
					$('#'+paperID+'_paper-list-authors').append('<li><a id = "'+name+'_info_paper" href="#'+name+'_info">'
																+'<h1>'
																+name.replace(/_/g,' ')
																+'</h1>'
																+'</a></li>');	
				}
}