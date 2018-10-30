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


    

    !!!! need control to limit input to military time, frequency to minutes

    * formulas to calculate next arrival time & minutes away

    * on click auto populates on-screen table
    * !!! data goes to Firebase DB
    */



    $("#submit-button").on("click", function () {

        event.preventDefault();

        var trainName = $("#train-name").val().trim();
        var destination = $("#destination").val().trim();
        var firstTrainTime = $("#first-train-time").val().trim();
        var frequency = parseInt($("#frequency").val().trim());


        // firstTrainTime = moment(firstTrainTime);
        // console.log("The first train moment = " + firstTrainTime);

        console.log(trainName, destination, firstTrainTime, frequency);

        // var currentTime = (moment().format("HH:mm"));
        // console.log("the current time is: " + currentTime);


        // firstTrainTime =  firstTrainTime.format() (moment(firstTrainTime));
        // console.log("First Train time is: " + firstTrainTime);



        firstTrainTime = moment(firstTrainTime, "HH:mma")
        console.log("1st train time= " + firstTrainTime);

        //gets the current time via moment.js
        var currentTime = moment().valueOf();
        console.log("var currentTime format = ", currentTime);

        // (currentTime, "HH:mma");

        //parse time values to display human-readable format




        var timeDifference = (currentTime - firstTrainTime);
        console.log("TimeDifference = " + timeDifference);

        var minutesAway = Math.abs(((currentTime - firstTrainTime) % frequency));
        console.log("the next train is: " + minutesAway + " minutes away");

        var nextArrival;

        $("#trainData").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");


    });


















});