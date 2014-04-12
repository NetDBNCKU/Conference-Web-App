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
   getStorage();
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