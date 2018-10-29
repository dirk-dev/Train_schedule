console.log("train schedule javascript loaded");

$(document).ready(function () {


    /* pseudocode

    * user inputs train name, destination, first train time, frequency in minutes
    use UTC???



    possible code for calculating minutes away:

    convert all times to 'time from epoch'

    current time - first train time = result

    current time > var now = moment();
    result % frequency  = minutes away (may need to convert back to human-readable time)


    

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

        //gets the current time in 
        var now = moment();
        console.log("now from Moment: " + now);

        console.log(trainName, destination, firstTrainTime, frequency);


        var currentTime = (moment().format("HH:mm"));
        console.log("the current time is: " + currentTime);
        

        var minutesAway = ((currentTime - firstTrainTime) - frequency);
        console.log("the next train is: " + minutesAway + " minutes away");

        var nextArrival;

        $("#trainData").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");


    });


















});