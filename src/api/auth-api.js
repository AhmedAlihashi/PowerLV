import firebase from "firebase";
import "firebase/auth";

export const logoutUser = () => {
  firebase.auth().signOut();
};

const friendCodeCheck = () => {
  let db = firebase.firestore();
  const query = db
    .collection("friendCodes")
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        doc.id;
      });
    });

  let randomNum = Math.floor(Math.random() * 1000000 + 1);
  console.log(` Generated FriendCode => ${randomNum}`);

  addFriendCode = strValue =>
    db
      .collection("friendCodes")
      .doc(strValue)
      .set({});

  if (randomNum === Number(query)) {
    console.log(
      ` FriendCode is taken | Random number => ${randomNum} | recalculating ... `
    );
    // upon production use a more realistic number 1+ million
    randomNum = Math.floor(Math.random() * 1000000 + 1);
    friendCodeCheck();
  } else {
    console.log(` FriendCode is available | Random number => ${randomNum}`);
    strValue = randomNum.toString();
    console.log(`strValue => ${strValue}`);
    addFriendCode(strValue);
    return randomNum;
  }
};

export const signInUser = async ({ name, email, password }) => {
  try {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(cred => {
        return firebase
          .firestore()
          .collection("users")
          .doc(cred.user.uid)
          .set({
            name: name,
            email: email,
            friendNum: friendCodeCheck(),
            currPowerLV: 0,
            rivals: [],
            prevPowerLV: []
          });
      });
    firebase.auth().currentUser.updateProfile({
      displayName: name
    });

    return {};
  } catch (error) {
    switch (error.code) {
      case "auth/email-already-in-use":
        return {
          error: "E-mail already in use."
        };
      case "auth/invalid-email":
        return {
          error: "Invalid e-mail address format."
        };
      case "auth/weak-password":
        return {
          error: "Password is too weak."
        };
      case "auth/too-many-requests":
        return {
          error: "Too many request. Try again in a minute."
        };
      default:
        return {
          error: "Check your internet connection."
        };
    }
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    return {};
  } catch (error) {
    switch (error.code) {
      case "auth/invalid-email":
        return {
          error: "Invalid email address format."
        };
      case "auth/user-not-found":
      case "auth/wrong-password":
        return {
          error: "Invalid email address or password."
        };
      case "auth/too-many-requests":
        return {
          error: "Too many request. Try again in a minute."
        };
      default:
        return {
          error: "Check your internet connection."
        };
    }
  }
};

export const sendEmailWithPassword = async email => {
  try {
    await firebase.auth().sendPasswordResetEmail(email);
    return {};
  } catch (error) {
    switch (error.code) {
      case "auth/invalid-email":
        return {
          error: "Invalid email address format."
        };
      case "auth/user-not-found":
        return {
          error: "User with this email does not exist."
        };
      case "auth/too-many-requests":
        return {
          error: "Too many request. Try again in a minute."
        };
      default:
        return {
          error: "Check your internet connection."
        };
    }
  }
};
