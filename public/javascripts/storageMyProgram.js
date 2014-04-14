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
    // console.log("info of added program in line 321. time=" + time 
    //   + '  workshopName='+ data[0]
    //   + '  venue='+ data[1]
    //   + '  workshopID_id='+ id);    

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
