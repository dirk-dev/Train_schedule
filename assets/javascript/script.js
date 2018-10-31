console.log("train schedule javascript loaded");

$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCyk2md1GGa3kVqlBN4_e0NDdsxP5JE7x8",
        authDomain: "train-schedule-54341.firebaseapp.com",
        databaseURL: "https://train-schedule-54341.firebaseio.com",
        projectId: "train-schedule-54341",
        storageBucket: "train-schedule-54341.appspot.com",
        messagingSenderId: "1057644969419"
    };
    firebase.initializeApp(config);

    // Create a variable to reference the database.
    var database = firebase.database();

    var trainName = "";
    var destination = "";
    var firstTrainTime;
    var frequency = "";
    var nextArrival = "";
    var minutesAway = "";

    /* pseudocode
     * user inputs train name, destination, first train time, frequency in minutes
     use UTC???
     possible code for calculating minutes away:
     convert all times to 'time from epoch'
     current time - first train time = result
     current time > var now = moment();
     result % frequency  = minutes away (may need to convert back to human-readable time)
   
     !!!! need control to limit input to military time, frequency to minutes
     * formulas to calculate next arrival time & minutes away
     * on click auto populates on-screen table
     */


    $("#submit-button").on("click", function () {

        event.preventDefault();

        trainName = $("#train-name").val().trim();
        destination = $("#destination").val().trim();
        firstTrainTime = $("#first-train-time").val().trim();
        frequency = $("#frequency").val().trim();

        database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrainTime: firstTrainTime,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });


        console.log("User entered data - train name: " + trainName + " destination: " + destination + "1st train time: " + firstTrainTime + " frequency: " + frequency);

        //converts user input into moment data format, specifies format of data input
        firstTrainTime = moment(firstTrainTime, "HH:mm");
        console.log("1st train time= " + firstTrainTime);


        //TODO:
        //parse time values to display human-readable format
        //take into account time zones


        timeDifference = (currentTime - firstTrainTime);
        console.log("TimeDifference: " + timeDifference);

        minutesAway = Math.abs(((currentTime - firstTrainTime) % frequency));
        console.log("the next train is: " + minutesAway + " minutes away");

        nextArrival = currentTime + minutesAway;
        //formats in 
        nextArrival = (moment(nextArrival).format("HH:mm A"));
        console.log("next arrival is: " + nextArrival);

        //converts unix timestamp to human readable time
        // var hoursConvert = 
        // var minutesConvert = 

        $("#trainData").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");


    });

    //gets the current time via moment.js
    //.valueOf returns Unix time in seconds since the Unix Epoch (1/1/1970 00:00:00)
    var currentTime = moment();
    console.log("var currentTime format = ", currentTime);
    console.log(currentTime.format("HH/mm/ss"));


    // Firebase watcher .on("child_added"
    database.ref().on("child_added", function (snapshot) {
        // storing the snapshot.val() in a variable for convenience
        var sv = snapshot.val();

        // Console.loging the last user's data
        console.log(sv.trainName);
        console.log(sv.destination);
        console.log(sv.firstTrainTime);
        console.log(sv.frequency);
        console.log(sv.dateAdded);


        // Change the HTML to reflect
        $("#name-display").text(sv.trainName);
        $("#email-display").text(sv.destination);
        $("#age-display").text(sv.firstTrainTime);
        $("#comment-display").text(sv.frequency);

        // Handle the errors
    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });

    $("#trainData").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");


});