import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const config = {
  apiKey: "AIzaSyDJo4EcXasK0CRbA1TPVmcXexBU__ACgEw",
  authDomain: "grad-project-46b43.firebaseapp.com",
  databaseURL: "https://grad-project-46b43.firebaseio.com",
  projectId: "grad-project-46b43",
  storageBucket: "grad-project-46b43.appspot.com",
  messagingSenderId: "666293043553",
  appId: "1:666293043553:web:501283d9dcb8375eb8c520",
  measurementId: "G-1Q3MC2BEDC",
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
  }
  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }
  logout() {
    return this.auth.signOut();
  }

  async register(name, email, password) {
    try {
      await this.auth.createUserWithEmailAndPassword(email, password);
      return this.auth.currentUser.updateProfile({ displayName: name });
    } catch (signUpError) {
      alert(signUpError);
      return -1;
    }
  }

  async setUserDataBase(userId, name, isAdmin, ip, port) {
    console.log("id", userId);
    return this.db.collection("user").doc(`${userId}`).set({
      admin: isAdmin,
      ip: ip,
      name: name,
      port: port,
    });
  }
  isInitialized() {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged(resolve);
    });
  }
  getCurrentUsername() {
    return this.auth.currentUser && this.auth.currentUser.displayName;
  }
  getCurrentUserId() {
    return this.auth.currentUser && this.auth.currentUser.uid;
  }
  database() {
    return this.db;
  }

  writeUserData(userId, name) {
    console.log("idd", userId);
    this.db.settings({
      timestampsInSnapshots: true,
    });
    return this.db
      .collection("user")
      .doc(`${userId}`)
      .update({
        tasks: { name: "task#1" },
      })
      .then(() => {
        // Document updated successfully.
        console.log("Doc updated successfully");
      });
  }

  getNumberofUsers() {
    const promise1 = new Promise((resolve, reject) => {
      this.db
        .collection("user")
        .get()
        .then((snap) => {
          var size = snap.size; // will return the collection size
          // return size;
          resolve(size);
        });
    });
    return promise1;
  }

  async getNumberofCameras() {
    const markers = [];
    await this.db
      .collection("user")
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          markers.push(doc.data());
        });
      });
    return markers;
  }
  saveCamera(to, user, userId) {
    if (to === "roads") {
      return this.db
        .collection("user")
        .doc(`${userId}`)
        .update({
          roadsIP: user.roadsIP,
        })
        .then(() => {
          // Document updated successfully.
          console.log("Doc updated successfully");
        });
    } else {
      return this.db
        .collection("user")
        .doc(`${userId}`)
        .update({
          pipesIP: user.pipesIP,
        })
        .then(() => {
          // Document updated successfully.
          console.log("Doc updated successfully");
          toast.success("Updated successfully", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
        });
    }
  }

  // deleteCamera(to,user,userId) {
  //   if(to==="roads"){
  //   return this.db
  //     .collection("user")
  //     .doc(`${userId}`)
  //     .update({
  //     roadsIP:user.roadsIP
  //     })
  //     .then(() => {
  //       // Document updated successfully.
  //       console.log("Doc updated successfully");
  //     });}
  //     else
  //     {
  //       return this.db
  //       .collection("user")
  //       .doc(`${userId}`)
  //       .update({
  //       pipesIP:user.pipesIP
  //       })
  //       .then(() => {
  //         // Document updated successfully.
  //         console.log("Doc updated successfully");
  //       });

  //     }
  // }

  saveIp(ip, port) {
    // this.db.settings({
    //   timestampsInSnapshots: true,
    // });
    return this.db
      .collection("ip")
      .doc("SlfW909pz3s1NcK0hJIg")
      .update({
        ip: ip,
        port: port,
      })
      .then(() => {
        // Document updated successfully.
        console.log("Doc updated successfully");
      });
  }
}
export default new Firebase();
