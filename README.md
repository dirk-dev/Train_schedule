# Train_schedule

![Train Schedule](./assets/images/trainschedule.png)

## [Train schedule deployed app](https://dirk-kiesewetter.github.io/Train_schedule/)

---

## About Train Schedule:

`Train Schedule` demonstrates data persistence through a Firebase database. The user enters the train name, destination, the time of the first train, and the train frequency in minutes.

When the user enters data into `Train Schedule`, it is uploaded to a Firebase database. Submitting another train entry refreshes the data, and the calculated data (Next Arrival and Minutes Away) is updated. Refreshing the web browser will also update the data.

---

## Description of the problem:

`Train Schedule` needed a way to access the current time, perform calculations and formatting of the time so it was user-readable. In addition, there needed to be a way to persist the data so that it would be current each time the user refreshed the page or added an entry.

## Technical Solutions:

- Moment.js along with standard JavaScript math operations provided the necessary functionality to access, manipulate, and format time.
- Firebase provided the data persistence.
- jQuery

---

## Built with:

- [Moment.js](https://momentjs.com/)
- [Firebase](https://firebase.google.com/)
- [Twitter Bootstrap](https://getbootstrap.com/)
- [jQuery](https://jquery.com/)

## Authors:

`Train Schedule` was coded by me, and is maintained by me.
