$(document).on("click", ".addnote", function() {

  let thisid= $(this).attr("id")  
  // console.log(thisid) 
    $.ajax({
    method: "GET",
    url: "/articles/" + thisid
  })
    .then(function(data) {  
      // console.log(data)
      // $(`#${thisid}`).append("<h2>" + data.title + "</h2>");
      // $(`#uniqueid${thisid}`).append("<input id='titleinput' name='title' >");
      $(`#uniqueid${thisid}`).append("<textarea id='bodyinput' name='body'></textarea>");
      $(`#uniqueid${thisid}`).append("<button type='button' data-id='" + data._id + "' id='savenote'>Save Note</button>");
      $(`#uniqueid${thisid}`).append(`<a href=/articles/${data._id}></a>`)
      if (data.note) {
        $("#titleinput").val(data.note.title);
        $("#bodyinput").val(data.note.body);
        }
      });
  });

$(document).on("click", "#savenote", function() {

    let thisId = $(this).attr("id");    
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // title: $("#titleinput").val(),
        body: $("#bodyinput").val()
      }
    })
      .then(function(data) {
        // Log the response
        // console.log(data);
        $("#notes").empty();
      });
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });

  $(document).on("click", "#previousnote", function() {
    $.ajax({
      method: "GET",
      url: "/articles/" + thisid
    })
    .then(function(data) {
      $(`#${thisid}`).append(data.note);
    });
  });
