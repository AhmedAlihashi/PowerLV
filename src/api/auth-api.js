import firebase from "firebase";
import "firebase/auth";

// ----------- Friend Code Check --------------

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
  // upon production use a more realistic number 1+ million
  // also test having the FriendCode being Taken

  if (randomNum === Number(query)) {
    console.log(
      ` FriendCode is taken | Random number => ${randomNum} | recalculating ... `
    );

    randomNum = Math.floor(Math.random() * 1000000 + 1);
    friendCodeCheck();
  } else {
    console.log(` FriendCode is available | Random number => ${randomNum}`);
    strValue = randomNum.toString();
    addFriendCode(strValue);
    return randomNum;
  }
};

// ----------- logoutUser --------------

export const logoutUser = () => {
  firebase.auth().signOut();
};

// ----------- signInUser --------------

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
            friendCode: friendCodeCheck(),
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

// ----------- loginUser --------------

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

// ----------- sendEmailWithPassword --------------

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
