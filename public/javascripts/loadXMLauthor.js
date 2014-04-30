

$(document).on("pagecreate", '#peoplePage', function() {
  var page = $(this);
   
    	$.mobile.loading( 'show', {
			text: 'loading page',
			textVisible: true,
			theme: 'c',
			html: ""
		});
        $.get('/static/author.xml',function(data){
    	$('#list-author').empty();
        parseAuthor(data);
        $('#list-author').listview('option', 'filter', true);       
        $('#list-author').listview('refresh');
        if (AuthorInfocreated === false){
    		createAuthorInfo(data);
    		AuthorInfocreated = true;
    	}
    },'xml');
       
        
    
});

function parseAuthor(data){
	var xmlData = $(data);
	var temp = [];
	xmlData.find('author').each(function(){
		//temp.push($(this).find('name').text().toUpperCase());
		temp.push($(this).find('name').text());
	});
	temp = temp.sort();
	for(authorkey in temp){
		var tempname = temp[authorkey].replace(/\s/g,'_').split('(')[0];
		$('#list-author').append('<li><a id="'+tempname.substring(0,tempname.length-1)
												+'" href="#'+tempname.substring(0,tempname.length-1)
												+'_info">'
												+'<h1>'+temp[authorkey]+'</h1></a></li>');
	}
	
}


function createAuthorInfo(data){
	var paperlist;
	$.get('/static/paper.xml',function(data){
		paperlist = $(data);
	},'xml');

	var authorlist = $(data);

	authorlist.find('author').each(function(){
		var author = $(this);
		var authorpaperlist = author.find('paper');
		//var authorName = author.find('name').text().toUpperCase();
		var authorName = author.find('name').text();
		var regexForOrg = /\(.*\)/;
		var orgMatches = regexForOrg.exec(authorName);
		var Org;
		if(orgMatches != null){
			Org = orgMatches[0].substring(1,orgMatches[0].length-1);
		}
		else{
			Org = 'No information';
		}

		var paperIDandTitlelist = [];
		authorpaperlist.each(function(){
			paperIDandTitlelist.push($(this).find('paperID').text());
			paperIDandTitlelist.push($(this).find('paperTitle').text());
		});
		
		var tempname = authorName.replace(/\s/g,'_').split('(')[0];
		var name = tempname.substring(0,tempname.length-1);
		$('body').append('<div id="'+name+'_info" data-role="page" data-add-back-btn="true">'
                         +'<div data-role="header" ><h1>People details</h1><a href="#page-home" data-transition="fade" data-icon="home" class="ui-btn-right">Home</a>'
                         +'<a href="#" class="ui-btn-left" data-rel="back">Back</a>'
                         +'</div>'
                         +'<div data-role="content" class="ui-content" role="main" >'
                         +'<h2>'+name.replace(/_/g,' ')+'</h2>'
                         +'<hr>'
                         +'<p>'+Org+'</p><hr>'
               		 	 +'<h3>paper list</h3><hr>'
               			 +'<ul data-role="listview" id="'+name+'_paperList" class="ui-listview">'
               			 +'</ul>'
                         +'</div>'
                         +'</div>');	


		

		$(document).on("pagecreate",'#'+name+'_info', function(){

				
					var page = $(this);
				         // load data
	                       $('#'+name+'_paperList').empty();
	                       	parseAuthroPaper(paperlist, name, paperIDandTitlelist);
	                       	$('#'+name+'_paperList').listview('refresh');

	                 
			    });


		});

		$.mobile.loading( 'hide' );
		

}

// list all this author's papers
function parseAuthroPaper(paperlist, authorName, paperIDandTitlelist){
	

	
	for(paper_id = 0; paper_id < paperIDandTitlelist.length; paper_id+=2){	
		var paperID;
		var paperTitle;
		var authors;	
			paperID = paperIDandTitlelist[paper_id];
			paperTitle = paperIDandTitlelist[paper_id+1];
			$('#'+authorName+'_paperList').append('<li><a id="'+paperID+'" href="#'+paperID+'_detail"><h1>'
								+'Title: '+paperTitle
								+'</h1></a></li>');
			
						$('#'+authorName+'_paperList').on('click','a', function() {
								var authors;
								var paperID = $(this).attr('id');
								paperlist.find('paper').each(function(){
									if($(this).find('ID').text() === paperID){
										authors = $(this).find('authors').text();
									}
								});
								insertPaperAuthorsForPaperList(authors, paperID);
								$('#'+paperID+'_paper-list-authors').listview('refresh');
							
						});
					
				
	}
		$('#'+authorName+'_paperList').listview('refresh');
			
	
	
}
