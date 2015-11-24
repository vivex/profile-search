/**
 * Created by vivex on 24/11/15.
 *
 * Profile Search
 *
 * JavaScript App To Search & Create Profile
 */

/**
 * It all begin here
 */
window.onload = function(){
    init();
    //every 500ms check if value changed
    setInterval('checkIfValueChanged()', 500);
}
var init= function(){
    document.getElementById('searchBox').value = ""
    oldValue = "";
    printProfiles(profileList);
}




/**
 * This function will give profile html for profile object
 * @param profile
 * @returns {*}
 */
var profileTemplate = function(profile){
    var template = ' <div class="col-lg-3 col-sm-6 mar-10">\
        <div class="profile-card">\
        <div class="img-container">\
        <a href="#"><img src="'+profile.avatar+'"></a>\
        </div>\
        <div class="pc-key">\
        <p>'+profile.name+'</p>\
    <ul>\
    <li><i class="fa fa-star"></i></li>\
    <li><a href="#"><i class="fa fa-certificate"></i></a></li>\
    </ul>\
    </div>\
    <ul class="follow-list">\
    <li><a href="#"><i class="fa fa-building-o"></i> '+profile.designation+'</a></li>\
    </ul>\
    <div class="clear"></div>\
        </div>\
        </div>';
    if(typeof profile.name !=="undefined")
        return template;
    else
    return "";
};

/**
 * This function will print  Form for new profile entry
 */
var printNewEntryForm = function(){
    var html =  '<div class="row">\
        <div class="col-lg-6 col-lg-offset-3">\
        <div class="well bs-component">\
        <form class="form-horizontal" onsubmit=" return false;">\
        <fieldset>\
        <legend>Create New Profile</legend>\
    <div class="form-group">\
        <label for="inputName" class="col-lg-2 control-label">Name</label>\
        <div class="col-lg-10">\
        <input class="form-control" name="name" id="inputName" placeholder="Name" type="text">\
        </div>\
        </div>\
        <div class="form-group">\
        <label for="inputDesignation" class="col-lg-2 control-label">Designation</label>\
        <div class="col-lg-10">\
        <input class="form-control" name="designation" id="inputDesignation" placeholder="Designation" type="text">\
        </div>\
        </div>\
        <div class="form-group">\
        <label for="inputAvatar" class="col-lg-2 control-label">Avatar</label>\
        <div class="col-lg-10">\
        <input class="form-control" name="designation" id="inputAvatar" placeholder="Avatar" type="text">\
        </div>\
        </div> <div class="form-group"> \
        <div class="col-lg-10 col-lg-offset-2"> \
        <button type="reset" class="btn btn-default" onclick="init()">Cancel</button> \
        <button  class="btn btn-primary" onclick="createNewProfile()">Submit</button> </div>\
         </div> </fieldset> </form> </div> </div> </div>';
    var container = document.getElementById('profiles');
    container.innerHTML = html;

};

/**
 * FORM Handler
 */
var createNewProfile = function(){
    var name  = document.getElementById('inputName').value;
    var designation  =document.getElementById('inputDesignation').value;
    var avatar  = document.getElementById('inputAvatar').value;

    if(name==="" || designation==="" || avatar===""){
        alert("Name, Designation, Avatar fields are required");
    } else{
        var profile ={
            name:name,
            avatar:avatar,
            designation:designation
        }
        profileList.push(profile);
        alert("Profile Created Successfully");
        searchProfiles();
    }

}

/**
 * Prints the profileList array to page
 * @param profileList
 */
var printProfiles = function(profileList){
    var container = document.getElementById('profiles');
    container.innerHTML = "";

    // sort the array by name
    profileList.sort(profileCompareFunction);

    for(var i=0;i<profileList.length;i++){
        container.innerHTML = container.innerHTML+profileTemplate(profileList[i]);
    }

}
/**
 * Sort By name compare function
 * @param a
 * @param b
 * @returns {number}
 */
var profileCompareFunction =  function(a,b){

    if(a.name< b.name){
        return -1;
    } else{
        return +1;
    }
}
/**
 * Search Profiles initiated by search box
 */
var searchProfiles = function(){
    var inputValue = document.getElementById('searchBox').value;
    console.log("Searching for "+inputValue);
    var tempProfileList = [];
    for(var i=0;i<profileList.length;i++){
        if((typeof profileList[i].name!=="undefined" && profileList[i].name.match(inputValue)) ||
            typeof profileList[i].designation!=="undefined" && profileList[i].designation.match(inputValue)){
            tempProfileList.push(profileList[i]);
        }
    }
    if(tempProfileList.length>0){
        //display the results
        printProfiles(tempProfileList);
    } else{
        //display the option to create new profile
        printNewEntryForm();
    }
};

/**
 * Checks the search field in each 500ms for changes
 * @type {string|string|Number}
 */
var oldValue = document.getElementById('searchBox').value;
function checkIfValueChanged() {
    var myTextControl = document.getElementById('searchBox');
    if(myTextControl.value != oldValue) {
        searchProfiles();
        oldValue = myTextControl.value;
    }
}

/*
Not using observer
Object.observe(profileList, function(changes) {
    console.log(changes[0]);

    printProfiles(changes[0].object);

    // list modified lets change
});

profileList.push("ONE MORE");*/
