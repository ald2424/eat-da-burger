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

    $(".create-form").on("submit", function(event){
      event.preventDefault();

      var newBurger = {
        burger_name: $("#ca").val().trim()
      }

      $.ajax("/api/burgers",{
        type: "POST",
        data: newBurger
      }).then(
        function(){
          console.log("created new burger " + newBurger);

          location.reload();
        }
      )
    })
});