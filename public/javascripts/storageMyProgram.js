window.pageMap = {};

$(document).on("pagecreate", '#myProgramPage', function() {
   $('#deleteAll_myProgram').on("click", clearAllProgram);
   $("#myProgramPage").on("pagebeforeshow", function(){
        $('#myProgramList').empty().listview().listview("refresh");
        loadList();
   });

   $('#myProgramList').on("click", "li", function(){
        var date = $(this).attr("date");
        console.log("date="+date);
        time_gTmp = date;
   });

   
   $( "#popupBasic" ).popup("open");

});

//Example of localStorage
// function createStorage(){
//     var myName = "Mark";			//storage var for testing
//     localStorage.setItem("name", myName);
//     getStorage();
// }

// function deleteStorage(){
// 	localStorage.removeItem("name");
// 	getStorage();
// }

// function deleteAllStorage(){
// 	localStorage.clear();
// 	getStorage();
// }

// function getStorage(){
//     $('#myProgramList').empty();
//     $('#myProgramList').append('Name:'+localStorage.getItem("name") + ',  hello!!');
// }


function clearAllProgram(){ 
    var listData = localStorage.getItem("MYPROGRAM_LIST_RECORDED");

    localStorage.clear();
    $('#myProgramList').empty().listview('refresh');

    //Change remove icon to add icon of each id of session in localStorage
    if(listData != null){
        listData = listData.split(",,,");
        
        for(i=0; i<listData.length; i++){
            var datas = listData[i].split("_splitPattern_");
            $('#'+datas[0]).trigger('pagecreate');  //id = datas[0]
        }
    }
}

function removeProgram(id){
    localStorage.removeItem(id);
    $("#myProgram_"+id).remove().listview().listview('refresh');
    reBuild_MLR();
    //loadList();
}

function reBuild_MLR(){
    var listData = localStorage.getItem("MYPROGRAM_LIST_RECORDED");

    localStorage.removeItem("MYPROGRAM_LIST_RECORDED");
    if(listData != null){
        listData = listData.split(",,,");
        
        for(i=0; i<listData.length; i++){
            var datas = listData[i].split("_splitPattern_");
            var id = datas[0];

            if( localStorage.getItem(id) != null ){
                add2List(listData[i]);
            }
        }
    }
}

function add2List(id){
    var list = localStorage.getItem("MYPROGRAM_LIST_RECORDED");

    if(list == null)    list = id;
    else                list = list + ",,," + id;
    localStorage.setItem("MYPROGRAM_LIST_RECORDED", list);
}

function loadList(){ 
    var listData = localStorage.getItem("MYPROGRAM_LIST_RECORDED");
    if(listData != null){
        listData = listData.split(",,,");
        var mySessionAry = new Array();
        
        //Get localStorage data
        for(i=0; i<listData.length; i++){
            var datas = listData[i].split("_splitPattern_");
            var mySession = {};
            mySession.myId = datas[0];
            mySession.myType = datas[1];
            mySession.myDate = datas[2];
            mySession.myTime_details = datas[3];
            mySessionAry.push(mySession);
        }


        //Sort in data  (BUBBLE SORT)  order: small to big 
        var swap = true;
        while(swap == true){
            swap = false;
            for(i=1; i<mySessionAry.length; i++){
                if(mySessionAry[i-1].myDate > mySessionAry[i].myDate || mySessionAry[i-1].myDate == mySessionAry[i].myDate && mySessionAry[i-1].myTime_details > mySessionAry[i].myTime_details){
                    //SWAP
                    var tmp = mySessionAry[i-1];
                    mySessionAry[i-1] = mySessionAry[i];
                    mySessionAry[i] = tmp;
                    swap = true;
                }
            }
        }
        

        //Append to MyProgramList
        for(i=0; i<mySessionAry.length; i++){
            var session = mySessionAry[i];
            var type = session.myType;
            var id = session.myId;


            if(type == 1){
                append2MyProgram1(id);
            }
            else if(type == 2){
                append2MyProgram2(id);
            }
            else if(type == 3){
                append2MyProgram3(id);
            }
            else if(type == 4){
                append2MyProgram4(id);
            }
            else if(type == 5){
                append2MyProgram5(id);
            }
            else if(type == 6){
                append2MyProgram6(id);
            }
            else{
               console.log("[Error]in storageMyProgram.js loadList(): the var 'type' should not be out of 1~6");
               console.log("your type value is " + type);
               break;
            }

        }

        //Setting divider
        $("#myProgramList").listview({
                autodividers:true,
                autodividersSelector: function ( li ) {
                    return li.attr("date");
                }
        }).listview().listview("refresh");


        //create the programPage in order to click in MyProgram
        $('#programPage').trigger('pagecreate');          




    }
    
}

/*******************************************************************************************************************//*
Classify with 6 storage types that I defined:
TYPE 1) Panel, Chair, Venue
TYPE 2) Title, Speaker, Chair, Venue
TYPE 3) Session, Venue
TYPE 4) Name, title, Leturer, Venue
TYPE 5) Session, Chair, Venue
TYPE 6) WorkshopName, Venue


the types of each day
5/13 6
5/14 2,3,4,5
5/15 2,4,5
5/16 1,4,5
*//*-*****************************************************************************************************************/
/*-------------------------------TYPE 1---------------------------------------*/
function storageType1(time, time_details, id, panel, chair, venue){ 
    console.log("storageTime_details type1 = "+time_details)
    localStorage.setItem(id, time + "_splitPattern_" + time_details + "_splitPattern_" + panel + "_splitPattern_" + chair + "_splitPattern_" + venue);
    add2List(id+"_splitPattern_1_splitPattern_"+time+"_splitPattern_"+time_details); 
}

function append2MyProgram1(id){
    var data;
    var time, time_details, panel, chair, venue;

    data = localStorage.getItem(id);

    if(data == null) return;

    data = data.split("_splitPattern_");
    time = data[0];
    time_details = data[1];
    panel = data[2];
    chair = data[3];
    venue = data[4]; 

    if($('#myProgram_'+id).length <= 0){
        $('#myProgramList').append('<li id="myProgram_'+id+'" date="'+time+'"><a href="#'+id+'">'
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
                                   +'<br>'
                                   +'<span style="display:inline-block"><h2 style="color:#E03A3A"> Time: </h2></span>'
                                   +'&nbsp'
                                   +'<span style="display:inline-block"><h2 style="color:black">'+time_details+'</h2></span>'
                            +'</a></li>').listview().listview('refresh');
    }
}
/*-------------------------------TYPE 2---------------------------------------*/
function storageType2(time, time_details, id, title, speaker, chair, venue){
    localStorage.setItem(id, time + "_splitPattern_" + time_details + "_splitPattern_" + title + "_splitPattern_" + speaker + "_splitPattern_" + chair + "_splitPattern_" + venue);
    add2List(id+"_splitPattern_2_splitPattern_"+time+"_splitPattern_"+time_details);  
}

function append2MyProgram2(id){
    var data;
    var time, time_details, title, speaker, chair, venue;

    data = localStorage.getItem(id);

    if(data == null) return;

    data = data.split("_splitPattern_");
    time = data[0];
    time_details = data[1];
    title = data[2];
    speaker = data[3];
    chair = data[4];
    venue = data[5]; 

    if($('#myProgram_'+id).length <= 0){
        $('#myProgramList').append('<li id="myProgram_'+id+'" date="'+time+'"><a href="#'+id+'">'
                                 +'<span style="display:inline-block"><h1 style="color:#E03A3A"> Keynote: </h1></span>'
                                 +'&nbsp'
                                 +'<span style="display:inline-block"><h1 id="keynoteTitle">'+title+'</h1></span>'
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
                                 +'<br>'
                                 +'<span style="display:inline-block"><h2 style="color:#E03A3A"> Time: </h2></span>'
                                 +'&nbsp'
                                 +'<span style="display:inline-block"><h2 style="color:black" id="keynoteVenue">'+time_details+'</h2></span>'
                            +'</a></li>').listview().listview('refresh');
    }
}
/*-------------------------------TYPE 3---------------------------------------*/
function storageType3(time, time_details, id, session, venue){
    localStorage.setItem(id, time + "_splitPattern_"  + time_details + "_splitPattern_" + session + "_splitPattern_" + venue);
    add2List(id+"_splitPattern_3_splitPattern_"+time+"_splitPattern_"+time_details);  
}

function append2MyProgram3(id){
    var data;
    var time, time_details, session, venue;

    data = localStorage.getItem(id);

    if(data == null) return;

    data = data.split("_splitPattern_");
    time = data[0];
    time_details = data[1];
    session = data[2];
    venue = data[3]; 


    if($('#myProgram_'+id).length <= 0){
        $('#myProgramList').append('<li id="myProgram_'+id+'" date="'+time+'"><a href="#'+id+'">'
                                   +'<span style="display:inline-block"><h1 style="color:#E03A3A"> Session: </h1></span>'
                                   +'&nbsp'
                                   +'<span style="display:inline-block"><h1 style="color:black">'+session+'</h1></span>'
                                   +'<br>'
                                   +'<span style="display:inline-block"><h2 style="color:#E03A3A"> Venue: </h2></span>'
                                   +'&nbsp'
                                   +'<span style="display:inline-block"><h2 style="color:black">'+venue+'</h2></span>'
                                   +'<br>'
                                   +'<span style="display:inline-block"><h2 style="color:#E03A3A"> Time: </h2></span>'
                                   +'&nbsp'
                                   +'<span style="display:inline-block"><h2 style="color:black">'+time_details+'</h2></span>'
                            +'</a></li>').listview().listview('refresh');
    }
}

/*-------------------------------TYPE 4---------------------------------------*/
function storageType4(time, time_details, id, name, title, lecturer, venue){
    localStorage.setItem(id, time + "_splitPattern_" + time_details + "_splitPattern_" + name + "_splitPattern_" + title + "_splitPattern_" + lecturer + "_splitPattern_" + venue);
    add2List(id+"_splitPattern_4_splitPattern_"+time+ "_splitPattern_" + time_details);  
}

function append2MyProgram4(id){
    var data;
    var time, time_details, name, title, lecturer, venue;

    data = localStorage.getItem(id);

    if(data == null) return;

    data = data.split("_splitPattern_");
    time = data[0];
    time_details = data[1];
    name = data[2];
    title = data[3];
    lecturer = data[4];
    venue = data[5]; 

    if($('#myProgram_'+id).length <= 0){
      $('#myProgramList').append('<li id="myProgram_'+id+'" date="'+time+'"><a href="#'+id+'">'
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
                                     +'<br>'
                                     +'<span style="display:inline-block"><h2 style="color:#E03A3A"> Time: </h2></span>'
                                     +'&nbsp'
                                     +'<span style="display:inline-block"><h2 style="color:black">'+time_details+'</h2></span>'
                            +'</a></li>').listview().listview('refresh');
    }
}
/*-------------------------------TYPE 5---------------------------------------*/
function storageType5(time, time_details, id, session, chair, venue){
    localStorage.setItem(id, time + "_splitPattern_" + time_details + "_splitPattern_" + session + "_splitPattern_" + chair + "_splitPattern_" + venue);
    add2List(id+"_splitPattern_5_splitPattern_"+time+ "_splitPattern_" + time_details);   
}

function append2MyProgram5(id){
    var data;
    var time, time_details, session, chair, venue;

    data = localStorage.getItem(id);

    if(data == null) return;

    data = data.split("_splitPattern_");
    time = data[0];
    time_details = data[1];
    session = data[2];
    chair = data[3];
    venue = data[4]; 

    if($('#myProgram_'+id).length <= 0){
      $('#myProgramList').append('<li id="myProgram_'+id+'" date="'+time+'"><a href="#'+id+'">'
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
                                   +'<br>'
                                   +'<span style="display:inline-block"><h2 style="color:#E03A3A"> Time: </h2></span>'
                                   +'&nbsp'
                                   +'<span style="display:inline-block"><h2 style="color:black" id="scVenue">'+time_details+'</h2></span>'
                            +'</a></li>').listview().listview('refresh');
    }
}

/*-------------------------------TYPE 6---------------------------------------*/
function storageType6(time, id, workshopName, venue){
    localStorage.setItem(id, time + "_splitPattern_" + workshopName + "_splitPattern_" + venue);
    add2List(id+"_splitPattern_6_splitPattern_"+time);   
}

function append2MyProgram6(id){
    var data;
    var time, workshopName, venue;

    data = localStorage.getItem(id);

    if(data == null) return;

    data = data.split("_splitPattern_");
    time = data[0];
    workshopName = data[1];
    venue = data[2]; 

    if($('#myProgram_'+id).length <= 0){
      $('#myProgramList').append('<li id="myProgram_'+id+'" date="'+time+'"><a href="#'+id+'">'
                         +'<span style="display:inline-block"><h1 style="color:#E03A3A"> WorkShop Name: </h1></span>'
                         +'&nbsp'
                         +'<span ><h1 id="workshopName" style="color:black">'+workshopName+'</h1></span>'
                         +'<span style="display:inline-block"><h1 style="color:#E03A3A"> Venue: </h1></span>'
                         +'&nbsp'
                         +'<span style="display:inline-block"><h1 id="venue" style="color:black">'+venue+'</h1></span>'
                            +'</a></li>').listview().listview('refresh');
    }
}



