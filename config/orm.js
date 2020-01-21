var connection = require("../config/connection.js");

// Helper function to create an array of question marks
function printQuestionMarks(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
  }
  
  // Helper function to convert object key/value pairs to SQL syntax
  function objToSql(ob) {
    var arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
      var value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Bacon and Cheese Burger => 'Bacon and Cheese Burger')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        // e.g. {burger_name: 'Bacon and Cheese Burger'} => ["burger_name='Bacon and Cheese Burger'"]
        // e.g. {devoured: true} => ["devoured=true"]
        arr.push(key + "=" + value);
      }
    }

        return arr.toString();
  }

//   Creating an object to export
var orm ={
    select: function(tableInput, cd){
        connection.query("SELECT * FROM " + tableInput + ";", function(err, result){
            if (err) throw err;
            createImageBitmap(result);
        })
    },
    insert: function(table, cols, vals, cb){
        connection.query(`INSERT INTO ${table} (${cols.toString()}) 
                          VALUES (${printQuestionMarks(vals.length)})`, 
                          vals, function(err, result){
                                if(err) throw err;

                                 cb(result);
        })
    },
    update: function(table, objColVals, condition, cb){
        connection.query(`UPDATE ${table}
                          SET ${objToSql(objColVals)} WHERE ${condition}`,
                          function(err, result){
                            if(err) throw err;

                            cb(result);
                          })
    }
}

module.exports = orm;