$(function() {
    $(".change-devoure").on("click", function(event) {
      var id = $(this).data("id");
      var newDevoure = $(this).data("newdevoure");
      console.log(newDevoure);
  
      var newDevoureState = {
        devoured: 1
      };
      // Send the PUT request.
      $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: newDevoureState
      }).then(
        function() {
          console.log("changed devoure to", newDevoure);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
});