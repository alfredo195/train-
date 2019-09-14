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

    //TODO //find example of calculation from class
    // calculation for next train
    var tFrequency = frequency;

    // Time is 3:30 AM
    var firstTime = time;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


    // creat td element 
    var nameTd = $("<td>" + snapshot.val().name + "</td>");
    var destinationTd = $("<td>" + snapshot.val().destination + "</td>");
    var timeTd = $("<td>" + snapshot.val().time + "</td>");
    var frequencyTd = $("<td>" + snapshot.val().frequency + "</td>");
    var nextTd = $("<td>" +  + "</td>");
    var minAwayTd = $("<td>" +  + "</td>");

    // append td to tr
    newRow.append(nameTd,destinationTd,timeTd,frequencyTd,nextTd,minAwayTd);

    //append tr to tbody
    $("tbody").append(newRow);
})
