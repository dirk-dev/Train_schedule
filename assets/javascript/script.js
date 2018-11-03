//Link to updated portfolio with this game added to the portfolio page:
// https://dirk-kiesewetter.github.io/Responsive-Portfolio/portfolio.html

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

    function trainCalculate(trainName, firstTrainTime, frequency) {

        currentTime = moment();

        console.log("The name of the train is: " + trainName + " the start time is : " + firstTrainTime + " The frequency is: " + frequency);

        firstTrainTime = moment(firstTrainTime, "HH:mm").subtract(1, "years");
        console.log("1st train time= " + firstTrainTime.format("h:mm A"));


        timeDifference = moment().diff(moment(firstTrainTime), "minutes");
        console.log("TimeDifference: " + (timeDifference));

        remainder = timeDifference % frequency;

        minutesAway = frequency - remainder;

        nextArrival = moment().add(minutesAway, "minutes").format("h:mm A");

    };

    $("#submit-button").on("click", function () {

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


    });

    database.ref().on("child_added", function (childSnapshot) {

        trainCalculate(childSnapshot.val().trainName, childSnapshot.val().firstTrainTime, childSnapshot.val().frequency);

        $("#trainData").append("<tr><td>" + childSnapshot.val().trainName + "</td><td>" +
            childSnapshot.val().destination + "</td><td>" + childSnapshot.val().frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");

    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });

    database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {


    });

});