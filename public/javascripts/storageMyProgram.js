$(document).on("pagecreate", '#myProgramPage', function() {
	//Session info.
	var sessionID;
	var sessionName;
	var sessionTime;


   //bind click 
   $('#new_myProgram').on("click", createStorage);
   $('#delete_myProgram').on("click", deleteStorage);
   $('#deleteAll_myProgram').on("click", deleteAllStorage);
   $('#refresh_myProgram').on("click", getStorage);

   //load datas from storage
   //getStorage();
});


function createStorage(){
    var myName = "Mark";			//storage var for testing
    localStorage.setItem("name", myName);
    getStorage();
}

function deleteStorage(){
	localStorage.removeItem("name");
	getStorage();
}

function deleteAllStorage(){
	localStorage.clear();
	getStorage();
}

function getStorage(){
    $('#myProgramList').empty();
    $('#myProgramList').append('Name:'+localStorage.getItem("name") + ',  hello!!');
}






/*-------------------------------May 13---------------------------------------*/
/* At laodXMLData.js createWorkshopPage().  At about line489                  */
function createStorage_May13(time, name, venue, id){
    localStorage.setItem(id, name + "***" + venue);


    var data = localStorage.getItem(id).split("***");

    //debug
    // console.log("info of added program in line 321. time=" + time 
    //   + '  workshopName='+ data[0]
    //   + '  venue='+ data[1]
    //   + '  workshopID_id='+ id);    

    append2List_May13(time, name, venue, id);    
}

function append2List_May13(time, name, venue, id){
    $('#myProgramList').append('<li><a id="'+id+'" href="#'+id+'">'
                            +'<h1 style="color:#E03A3A">WorkShop Name: </h1>'
                            +'<h1>'
                            + name
                            +'</h1>'
                            +'<h1 style="color:#E03A3A">Venue: </h1>'
                            +'<h1>'
                            + venue
                            +'</h1>'
                            +'</a></li>');
}

/*-------------------------------May 14---------------------------------------*/
/*                                                                            */
function createStorage_May14(time, id, title, speaker, chair, venue){
    localStorage.setItem(id, title + "***" + speaker + "***" + chair + "***" + venue);


    var data = localStorage.getItem(id).split("***");

    //debug
    console.log("info of added program in line 321. time=" + time 
      + '  title='+ data[0]
      + '  speaker='+ data[1]
      + '  chair='+ data[2]
      + '  venue='+ data[3]
      + '  workshopID_id='+ id);    

    append2List_May14(time, id, title, speaker, chair, venue);    
}

function append2List_May14(time, id, title, speaker, chair, venue){
    $('#myProgramList').append('<li><a id="'+id+'" href="#'+id+'">'
                            +'<h1 style="color:#E03A3A">Title: </h1>'
                            +'<h1>'
                            + title
                            +'</h1>'
                            +'<h1 style="color:#E03A3A">Speaker: </h1>'
                            +'<h1>'
                            + speaker
                            +'</h1>'
                            +'<h1 style="color:#E03A3A">Chair: </h1>'
                            +'<h1>'
                            + chair
                            +'</h1>'
                            +'<h1 style="color:#E03A3A">Venue: </h1>'
                            +'<h1>'
                            + venue
                            +'</h1>'
                            +'</a></li>');
}




/*******************************************************************************************************************//*
Classify with 6 storage types that I defined:
1) Panel, Chair, Venue
2) Title, Speaker, Chair, Venue
3) Session, Venue
4) Name, title, Leturer, Venue
5) Session, Chair, Venue
6) WorkshopName, Venue


the types of each day
5/13 6
5/14 2,3,4,5
5/15 2,4,5
5/16 1,4,5
*//*-*****************************************************************************************************************/
/*-------------------------------TYPE 1---------------------------------------*/
function storageType1(time, id, panel, chair, venue){ 
    var data;
    localStorage.setItem(id, panel + "***" + chair + "***" + venue);
    data = localStorage.getItem(id).split("***");
    append2MyProgram1(time, id, panel, chair, venue);    
}

function append2MyProgram1(time, id, panel, chair, venue){
    if($('#myProgram_'+id).length <= 0){
        $('#myProgramList').append('<li><a id="myProgram_'+id+'" href="#'+id+'">'
                                   +'<span style="display:inline-block"><h2 style="color:#E03A3A"> Panel: </h2></span>'
                                   +'&nbsp'
                                   +'<span style="display:inline-block"><h2 style="color:black">'+panel+'</h2></span>'
                                   +'<br>'
                                   +'<span style="display:inline-block"><h2 style="color:#E03A3A"> Chair: </h2></span>'
                                   +'&nbsp'
                                   +'<span style="display:inline-block"><h2 style="color:black">'+chair+'</h2></span>'
                                   +'<br>'
                                   +'<span style="display:inline-block"><h2 style="color:#E03A3A"> Venue: </h2></span>'
                                   +'&nbsp'
                                   +'<span style="display:inline-block"><h2 style="color:black">'+venue+'</h2></span>'
                            +'</a></li>').listview('refresh');
    }
}
/*-------------------------------TYPE 2---------------------------------------*/
function storageType2(time, id, title, speaker, chair, venue){
    var data;
    localStorage.setItem(id, title + "***" + speaker + "***" + chair + "***" + venue);
    data = localStorage.getItem(id).split("***");

 //debug
    console.log("info of added program in line 321. time=" + time 
      + '  title='+ data[0]
      + '  speaker='+ data[1]
      + '  chair='+ data[2]
      + '  venue='+ data[3]
      + '  workshopID_id='+ id);   


    append2MyProgram2(time, id, title, speaker, chair, venue);    
}

function append2MyProgram2(time, id, title, speaker, chair, venue){
    if($('#myProgram_'+id).length <= 0){
        $('#myProgramList').append('<li><a id="myProgram__'+id+'" href="#'+id+'">'
                                 +'<h1 id="keynoteTitle">'+title+'</h1>'
                                 +'<br>'
                                 +'<span style="display:inline-block"><h2 style="color:#E03A3A"> Speaker: </h2></span>'
                                 +'&nbsp'
                                 +'<span style="display:inline-block"><h2 style="color:black" id="keynoteSpeaker">'+speaker+'</h2></span>'
                                 +'<br>'
                                 +'<span style="display:inline-block"><h2 style="color:#E03A3A"> Chair: </h2></span>'
                                 +'&nbsp'
                                 +'<span style="display:inline-block"><h2 style="color:black" id="keynoteChair">'+chair+'</h2></span>'
                                 +'<br>'
                                 +'<span style="display:inline-block"><h2 style="color:#E03A3A"> Venue: </h2></span>'
                                 +'&nbsp'
                                 +'<span style="display:inline-block"><h2 style="color:black" id="keynoteVenue">'+venue+'</h2></span>'
                            +'</a></li>').listview('refresh');
    }
}
/*-------------------------------TYPE 3---------------------------------------*/
function storageType3(time, id, session, venue){
    var data;
    localStorage.setItem(id, session + "***" + venue);
    data = localStorage.getItem(id).split("***");

console.log('  session='+ data[0]
      + '  venue='+ data[1]);    

    append2MyProgram3(time, id, session, venue);    
}

function append2MyProgram3(time, id, session, venue){
    if($('#myProgram_'+id).length <= 0){
        $('#myProgramList').append('<li><a id="myProgram_'+id+'" href="#'+id+'">'
                                   +'<span style="display:inline-block"><h1 style="color:#E03A3A"> Session: </h1></span>'
                                   +'&nbsp'
                                   +'<span style="display:inline-block"><h1 style="color:black">'+session+'</h1></span>'
                                   +'<br>'
                                   +'<span style="display:inline-block"><h2 style="color:#E03A3A"> Venue: </h2></span>'
                                   +'&nbsp'
                                   +'<span style="display:inline-block"><h2 style="color:black">'+venue+'</h2></span>'
                            +'</a></li>').listview('refresh');
    }
}

/*-------------------------------TYPE 4---------------------------------------*/
function storageType4(time, id, name, title, lecturer, venue){
    var data;
    localStorage.setItem(id, name + "***" + title + "***" + lecturer + "***" + venue);
    data = localStorage.getItem(id).split("***");
    append2MyProgram4(time, id, name, title, lecturer, venue);    
}

function append2MyProgram4(time, id, name, title, lecturer, venue){
    if($('#myProgram_'+id).length <= 0){
      $('#myProgramList').append('<li><a id="myProgram_'+id+'" href="#'+id+'">'
                                     +'<span style="display:inline-block"><h2 style="color:#E03A3A">'+name+'</h2></span>'
                                     +'&nbsp'
                                     +'<span style="display:inline-block"><h2 style="color:black">'+title+'</h2></span>'
                                     +'<br>'
                                     +'<span style="display:inline-block"><h2 style="color:#E03A3A"> Lecturer: </h2></span>'
                                     +'&nbsp'
                                     +'<span style="display:inline-block"><h2 style="color:black">'+lecturer+'</h2></span>'
                                     +'<br>'
                                     +'<span style="display:inline-block"><h2 style="color:#E03A3A"> Venue: </h2></span>'
                                     +'&nbsp'
                                     +'<span style="display:inline-block"><h2 style="color:black">'+venue+'</h2></span>'
                            +'</a></li>').listview('refresh');
    }
}
/*-------------------------------TYPE 5---------------------------------------*/
function storageType5(time, id, session, chair, venue){
    var data;
    localStorage.setItem(id, session + "***" + chair + "***" + venue);
    data = localStorage.getItem(id).split("***");
    append2MyProgram5(time, id, session, chair, venue);    
}

function append2MyProgram5(time, id, session, chair, venue){
    if($('#myProgram_'+id).length <= 0){
      $('#myProgramList').append('<li><a id="myProgram_'+id+'" href="#'+id+'">'
                                   +'<span style="display:inline-block"><h1 style="color:#E03A3A"> Session: </h1></span>'
                                   +'&nbsp'
                                   +'<span style="display:inline-block"><h1 style="color:black" id="scName">'+session+'</h1></span>'
                                   +'<br>'
                                   +'<span style="display:inline-block"><h2 style="color:#E03A3A"> Chair: </h2></span>'
                                   +'&nbsp'
                                   +'<span style="display:inline-block"><h2 style="color:black" id="scChair">'+chair+'</h2></span>'
                                   +'<br>'
                                   +'<span style="display:inline-block"><h2 style="color:#E03A3A"> Venue: </h2></span>'
                                   +'&nbsp'
                                   +'<span style="display:inline-block"><h2 style="color:black" id="scVenue">'+venue+'</h2></span>'
                            +'</a></li>').listview('refresh');
    }
}

/*-------------------------------TYPE 6---------------------------------------*/
function storageType6(time, id, workshopName, venue){
    var data;
    localStorage.setItem(id, workshopName + "***" + venue);
    data = localStorage.getItem(id).split("***");
    append2MyProgram6(time, id, workshopName, venue);    
}

function append2MyProgram6(time, id, workshopName, venue){
    if($('#myProgram_'+id).length <= 0){
      $('#myProgramList').append('<li><a id="myProgram_'+id+'" href="#'+id+'">'
                         +'<span style="display:inline-block"><h1 style="color:#E03A3A"> WorkShop Name: </h1></span>'
                         +'&nbsp'
                         +'<span><h1 id="workshopName" style="color:black">'+workshopName+'</h1></span>'
                         +'<br>'
                         +'<span style="display:inline-block"><h1 style="color:#E03A3A"> Venue: </h1></span>'
                         +'&nbsp'
                         +'<span style="display:inline-block"><h1 id="venue" style="color:black">'+venue+'</h1></span>'
                            +'</a></li>').listview('refresh');
    }
}



