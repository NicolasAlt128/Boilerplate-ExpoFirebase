const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// exports.addAdminRole = functions.https.onCall((data, context) => {
//
//   // get user and add custom claim (admin)
//   return admin.auth().getUserByEmail("nicolas.alarcon14@gmail.com").then(user => {
//     // console.log("DATA", data)
//     return admin.auth().setCustomUserClaims(user.uid, {
//       admin: true
//     });
//   }).then(() => {
//     return {
//       message: `Success! ${data.email} has been made an admin`
//     }
//   }).catch(err => {
//     return err;
//   });
//
// });

exports.helloWorld = functions.https.onRequest((req, res) => {
  res.status(200).send('Hello, World! motherfuckerz');
});

// exports.fetchUser = functions.https.onCall((data, context) => {
//   return admin
//   .auth()
//   .getUserByEmail(email)
//   .then((userRecord) => {
//     // See the UserRecord reference doc for the contents of userRecord.
//     console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
//   })
//   .catch((error) => {
//     console.log('Error fetching user data:', error);
//   });
// });
