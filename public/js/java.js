$(document).on("click", ".articles", function() {

  let thisid= $(this).attr("id")  
  console.log(thisid) 
    $.ajax({
    method: "GET",
    url: "/articles/" + thisid
  })
    .then(function(data) {  
      console.log(data)
      $("#notes").append("<h2>" + data.title + "</h2>");
      $("#notes").append("<input id='titleinpu' name='title' >");
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      $("#notes").append("<button type='button' data-id='" + data._id + "' id='savenote'>Save Note</button>");
      $("#savenote").append(`<a href=/articles/${data._id}></a>`)
      if (data.note) {
        $("#titleinput").val(data.note.title);
        $("#bodyinput").val(data.note.body);
        }
      });
  });
 
 $(document).on("click", "#savenote", function() {
    var thisId = $(this).attr("id");    
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        title: $("#titleinput").val(),
        body: $("#bodyinput").val()
      }
    })
      .then(function(data) {
        // Log the response
        console.log(data);
        $("#notes").empty();
      });
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });