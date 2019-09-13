var firebaseConfig = {
  apiKey: "AIzaSyC3WWemya4NO9bZ4Pno3yUFDR0AGT1RNPM",
  authDomain: "cbc-activites.firebaseapp.com",
  databaseURL: "https://cbc-activites.firebaseio.com",
  projectId: "cbc-activites",
  storageBucket: "",
  messagingSenderId: "835412191735",
  appId: "1:835412191735:web:12a1d6ef4d897e8b98a6f2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// create a var for database
var database = firebase.database();

// listen to click from adding employee
$("#add").click(function(event) {
  // prevent page reloading
  event.preventDefault();

  // get each input and store in variable
  var name = $("#name")
    .val()
    .trim();
  var destination = $("#destination")
    .val()
    .trim();
  var time = $("#time")
    .val()
    .trim();
  var frequency = $("#frequency")
    .val()
    .trim();

  // update to database
  database.ref("/train").push({
    name: name,
    destination: destination,
    time: time,
    frequency: frequency
  });
});

// listen to child added from database and in table
database.ref("/train").on("child_added",function(snapshot){

    // creat new row
    var newRow = $("<tr>");

    // calculation for next train
    
})
