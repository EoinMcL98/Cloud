//The URIs of the REST endpoint
Upload_Image = "https://prod-208.westeurope.logic.azure.com:443/workflows/15188eec45fe40d6bfefa43f08a8a8df/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=9-3_hXKCBZNrVSQyqVl4avqR9XIruUq32cSAbbgyqbk";
All_Posts = "https://prod-65.westeurope.logic.azure.com:443/workflows/80f29d869bff42ca9ef86d89a315f4d9/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=D6201RvlbZuna7tAlwM07DtV9xdPiS6opX_KnFFHfxY";
Delete_Part1 = "https://prod-06.westeurope.logic.azure.com/workflows/576d6b6fc1e141bdb59b5915b3165ab0/triggers/manual/paths/invoke/api/v1/post/"
Delete_Part2 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=EEOrPz4mRa-TyuCs-uvZLP56fJSKMRx_IB5ojfgCn-U"

BLOB_ACCOUNT = "https://blobstoragecom682emcl.blob.core.windows.net"

//Handlers for button clicks
$(document).ready(function() {

 
  $("#getImages").click(function(){

      //Run the get asset list function
      getImages();

  }); 

   //Handler for the new asset submission button
  $("#submitpost").click(function(){

    //Execute the submit new asset function
    submitPost();
    
  }); 

    //Handler for the new asset submission button
  $("#imagedelete").click(function(){

    //Execute the submit new asset function
    deletePost();

  });
});
//A function to submit a new asset to the REST endpoint 
function submitPost(){

    //Create a form data object
    postData = new FormData();

    //Get form variables and append them to the form data object
    postData.append('FileName', $('#FileName').val());
    postData.append('caption', $('#Caption').val());
    postData.append('userID', $('#userID').val());
    postData.append('userName', $('#userName').val());
    postData.append('File', $("#UpFile")[0].files[0]);
  
   //Post the form data to the endpoint, note the need to set the content type header
    $.ajax({
      url: Upload_Image,
      data: postData,
      cache: false,
      enctype: 'multipart/form-data',
      contentType: false,
      processData: false,
      type: 'POST',
      success: function(data){
        $("form")[0].reset();
      }
   });
}

//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getImages(){
  $('#ImageList').html('<div class=""spinner-border" role="status"> <span class="sr-only"> &nbsp; </span>')

  $.getJSON(All_Posts, function(data){

    var items = []

      $.each( data, function( key, val ){
        items.push("<hr/>");
        items.push("<>")

        // items.push("<audio controls>")
        // items.push("<source src='" + BLOB_ACCOUNT + val["filePath"] +"' width='600'/> <br />")
        // items.push("</audio>")

        items.push("<img src='"+ BLOB_ACCOUNT + val["filePath"] +"' width='600'/> <br />")
        items.push( "Caption : " + val["Caption"] + "<br />");
        items.push( "File : " + val["FileName"] + "<br />");
        items.push( "Uploaded by: " + val["UserName"] + " (userID: "+val["UserID"]+")<br />");
        items.push( "<hr />");
        items.push('<button class="btn btn-primary" type="button" onclick="deletePost(' + "'" + val["id"] + "'"+  ')"' + "> Delete Post </button>")

        items.push('<div class="form-comment"')
        items.push('<form id="comment">')
        items.push('<label for="commentPost"> Comments: </label>')
        items.push('<input type="text" class="form-control" id="commentPost">')
        items.push('<br>')
        items.push('<button class="btn btn-primary type="button id="postComment"> Post Comment </button')
        items.push('<button class="btn btn-primary type="button id="deleteComment"> Delete Comment </button')
        items.push('</form>')
        items.push('</div>')

        items.push("<br>")
      });

      $('#PostList').empty();
      $('#PostList').append(items);
  });
}

// Delete function
function deletePost(id){
  $.ajax({
    type: "DELETE",
    url: Delete_Part1 + id + Delete_Part2,
  }).done(function( msg ) {
    getImages();
  });
}