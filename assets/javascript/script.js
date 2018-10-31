$(document).ready(function () {

    var config = {
        apiKey: "AIzaSyCyk2md1GGa3kVqlBN4_e0NDdsxP5JE7x8",
        authDomain: "train-schedule-54341.firebaseapp.com",
        databaseURL: "https://train-schedule-54341.firebaseio.com",
        projectId: "train-schedule-54341",
        storageBucket: "train-schedule-54341.appspot.com",
        messagingSenderId: "1057644969419"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    var trainName;
    var destination;
    var firstTrainTime;
    var frequency;
    var nextArrival;
    var minutesAway;

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

        console.log("User entered data - train name: " + trainName + " destination: " + destination + " 1st train time: " + firstTrainTime + " frequency: " + frequency);

        firstTrainTime = moment(firstTrainTime, "h:mm A");
        console.log("1st train time= " + firstTrainTime);

        timeDifference = (currentTime - firstTrainTime);
        console.log("TimeDifference: " + (timeDifference));

        // .06 is needed because the times are in milliseconds, and the frequency is in minutes. (divide by 1000 to get seconds, multiply by 60 to get minutes)
        minutesAway = (Math.round(((currentTime - firstTrainTime) * .06) % frequency));
        console.log("the next train is: " + minutesAway + " minutes away");

        nextArrival = currentTime + minutesAway;
        //formats to human-readable time for table
        nextArrival = (moment(nextArrival).format("h:mm A"));
        console.log("next arrival is: " + nextArrival);

    });

    var currentTime = moment();

    console.log("var currentTime format = ", currentTime);
    console.log("current time: " + currentTime.format("h:mm A"));

    database.ref().on("child_added", function (childSnapshot) {


        $("#trainData").append("<tr><td>" + childSnapshot.val().trainName + "</td><td>" +
            childSnapshot.val().destination + "</td><td>" + childSnapshot.val().frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");

    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });

    database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {

        var sv = snapshot.val();

        $("#train-name").text(sv.trainName);
        $("#destination").text(sv.destination);
        $("#first-train-time").text(sv.firstTrainTime);
        $("#frequency").text(sv.frequency);

        console.log("sv.trainName: " + sv.trainName + " sv.destination: " + sv.destination +
            " sv.frequency " + sv.frequency + " sv.dateAdded: " + sv.dateAdded);

    });

});