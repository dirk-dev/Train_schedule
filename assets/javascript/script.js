console.log("train schedule javascript loaded");

$(document).ready(function () {


    /* pseudocode

    * user inputs train name, destination, first train time, frequency in minutes
    use UTC???



    ! need control to limit input to military time, frequency to minutes

    * formulas to calculate next arrival time & minutes away

    * on click auto populates on-screen table
    * data goes to Firebase DB
    */

    $("#submit-button").on("click", function () {

        event.preventDefault();

        var trainName = $("#train-name").val().trim();
        var destination = $("#destination").val().trim();
        var firstTrainTime = $("#first-train-time").val().trim();
        var frequency = $("#frequency").val().trim();

        console.log(trainName, destination, firstTrainTime, frequency);


        var currentTime = (moment().format("HH:mm"));
        console.log("the current time is: " + currentTime);

        var minutesAway = ((currentTime - firstTrainTime) - frequency);
        console.log("the next train is: " + minutesAway + " minutes away");

        var nextArrival;

        $("#trainData").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");


    });


















});