import * as firebase from 'firebase';

export default firebase.initializeApp({
  apiKey: "AIzaSyB2-vLuG-sCW2DPAcls04ltwBxNv8sUc_k",
  authDomain: "pascal-37098.firebaseapp.com",
  databaseURL: "https://pascal-37098.firebaseio.com",
  projectId: "pascal-37098",
  storageBucket: "pascal-37098.appspot.com",
  messagingSenderId: "22142406102"
});

firebase.auth()
  .setPersistence('local')
  .then(() => {
    // console.log('firebase.auth().setPersistence');
  });

firebase.auth().onAuthStateChanged(user => {
  // console.log('firebaseUser', user);
});

export const FirebaseApp = firebase;

export const uploadImage = (path, data, type, progressCallback = null) => {
  return new Promise((resolve, reject) => {
    const storageRef = firebase.storage().ref();
    const ref = storageRef.child(path);
    let uploadTask = (typeof data === 'string') ? ref.putString(data, 'base64')
      : ref.put(data, {contentType: ('image/' + type)});

    uploadTask.on('state_changed', snapshot => {
      if (progressCallback) {
        progressCallback(snapshot.bytesTransferred / snapshot.totalBytes);
      }
    }, error => {
      reject(error);
    }, () => {
      resolve(uploadTask.snapshot.downloadURL);
    });
  });
};

export const deleteImage = (path) => {
  return new Promise((resolve, reject) => {
    const storageRef = firebase.storage().ref();
    const ref = storageRef.child(path);

    // Delete the file
    ref.delete().then(function() {
      return true;
    }).catch(function(error) {
      console.log(error);
      return false;
    });
  });
};




