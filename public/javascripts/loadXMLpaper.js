$(document).on("pagecreate", '#paperListPage', function() {
  var page = $(this);

  // load data
    $.get('/static/paper.xml',function(data){
    	$('#list-paperList').empty();
        parsePaperListForpaperList(data);
        $('#list-paperList').listview('refresh');
        createPaperDetail(data);
        $('#list-paperList').on('click','a',function(){

        });
    },'xml');

  

});

function parsePaperListForpaperList(data){
	var xmlData = $(data);
	var paperList = [];
	var paperID;
	var paperTitle;
	var author;
	xmlData.find('paper').each(function(){
		 paperID = $(this).find('ID').text();
		 paperTitle = $(this).find('title').text();
		 author = $(this).find('authors').text();
		
		paperList.push(paperTitle+'%'+author+'%'+paperID);
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
		authorArray = authors.split(';');
		$('body').append('<div id="'+paperID+'_detail" data-role="page" data-add-back-btn="true">'
	                 +'<div data-role="header" ><h1>Paper details</h1><a href="/" rel="external" data-transition="fade" data-icon="home" class="ui-btn-right">Home</a>'
	                 +'<a href="#" class="ui-btn-left" data-rel="back">Back</a>'
	                 +'</div>'
	                 +'<div data-role="content" class="ui-content" role="main" >'
	                 +'<h2>'+paperTitle+'</h2>'
	                 +'<hr>'
	                 +'<p>'+authors+'</p><hr>'
	       		 	 +'<h3>Abstract</h3><hr>'
	       			 +'<div id="abstract">'
	       			 +'<p>'
	       			 +abstract
	       			 +'</p>'
	       			 +'</div>'
	                 +'</div>'
	                 +'</div>');	

	});

	

}

