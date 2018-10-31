console.log("train schedule javascript loaded");

$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCdDR8d6onMkdtLN-BtK59AAtEVojNAft0",
        authDomain: "recentuser-44024.firebaseapp.com",
        databaseURL: "https://recentuser-44024.firebaseio.com",
        projectId: "recentuser-44024",
        storageBucket: "recentuser-44024.appspot.com",
        messagingSenderId: "303535582852"
      };
    firebase.initializeApp(config);

    // Create a variable to reference the database.
    var database = firebase.database();

    // var trainName = "";
    // var destination = "";
    // var firstTrainTime = 0;
    // var frequency = 0

    /* pseudocode

     * user inputs train name, destination, first train time, frequency in minutes
     use UTC???

     possible code for calculating minutes away:

     convert all times to 'time from epoch'

     current time - first train time = result

     current time => var now = moment();
     result % frequency  = minutes away (may need to convert back to human-readable time)

   
     !!!! need control to limit input to military time, frequency to positive minutes

     * formulas to calculate next arrival time & minutes away

     * on click auto populates on-screen table
     */

    // data not persisting in browser
    // time is not taking time zone into account
    // time displayed in next arrival not in hh:mm
    // formula for minutes away not correct


    $("#submit-button").on("click", function (event) {

        event.preventDefault();

        var trainName = $("#train-name").val().trim();
        var destination = $("#destination").val().trim();
        var firstTrainTime = $("#first-train-time").val().trim();
        var frequency = $("#frequency").val().trim();

        database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrainTime: firstTrainTime,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });

        console.log(trainName, destination, firstTrainTime, frequency);

        //converts user input into moment data format, specifies format of data input
        firstTrainTime = moment(firstTrainTime, "HH:mma");
        firstTrainTime = firstTrainTime / 1000;
        console.log("1st train time: " + firstTrainTime);

        var timeDifference = (currentTime - firstTrainTime);
        console.log("TimeDifference = " + timeDifference);

        var minutesAway = Math.abs(((currentTime - firstTrainTime) % frequency));
        console.log("the next train is: " + minutesAway + " minutes away");

        var nextArrival = currentTime + minutesAway;
        console.log("next arrival is: " + nextArrival);

        $("#trainData").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");

    });

    //gets the current time via moment.js
    var currentTime = moment().unix();
    console.log("var currentTime format = ", currentTime);



    // Firebase watcher .on("child_added"
    database.ref().on("child_added", function (childSnapshot) {
        // storing the snapshot.val() in a variable for convenience
        // var sv = snapshot.val();

        // Console.loging the last user's data
        console.log(childSnapshot.val().trainName);
        console.log(childSnapshot.val().destination);
        console.log(childSnapshot.val().firstTrainTime);
        console.log(childSnapshot.val().frequency);

        // Change the HTML to reflect



        // Handle the errors
    }, 
    
    function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });

    $("#train-name").text(childSnapshot.val().trainName);
    $("#destination").text(childSnapshot.val().destination);
    $("first-train-time").text(childSnapshot.val().firstTrainTime);
    $("#frequency").text(childSnapshot.val().frequency);


});