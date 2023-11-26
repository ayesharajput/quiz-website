var firebaseConfig = {
    apiKey: "AIzaSyDwronP6l3fV2igcRqz0zvckz-XuTSycuo",
    authDomain: "authclass-aef15.firebaseapp.com",
    projectId: "authclass-aef15",
    storageBucket: "authclass-aef15.appspot.com",
    messagingSenderId: "998318861781",
    appId: "1:998318861781:web:751bb1b23d5253453e615c",
    measurementId: "G-MLCNSCTY13"
  };
  
  // Initialize Firebase
  
  var app = firebase.initializeApp(firebaseConfig);

  
  // console.log(app);
  
  // ***********************SignUp Auth*******************************
  
  function signUp() {
    var email = document.getElementById("email");
    var password = document.getElementById("password");
  
    firebase
      .auth()
      .createUserWithEmailAndPassword(email.value, password.value)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(user);
        firebase
          .auth()
          .currentUser.sendEmailVerification()
          .then(() => {
            alert("Email sent Successfully..");
            window.location.href = 'start.html';
          });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
      email.innerHTML= "";
      password.innerHTML= "";
  }
  
  // ***********************Login Auth*******************************
  
  function login() {
    var email = document.getElementById("Useremail");
    var password = document.getElementById("Userpassword");
  
    firebase
      .auth()
      .signInWithEmailAndPassword(email.value, password.value)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(user);
        window.location.href = '/start/index.html';
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      
      });
    
  }
  
  // ***********************Forget Password section*******************************
  
  function forgotPassword() {
    var email = document.getElementById("Useremail");
  
    firebase
      .auth()
      .sendPasswordResetEmail(email.value)
      .then(() => {
        alert("password reset email sent...");
        window.location.href = '/start/index.html';
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
  }
  
  // ***********************Google Login Auth*******************************
  
  function loginWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
  
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;
  
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(user);
        window.location.href = '/start/index.html';
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
       alert(errorMessage);
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  }
  
  // ***********************Github Login Auth*******************************
  
  function loginWithGithub() {
    var provider = new firebase.auth.GithubAuthProvider();
  
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;
  
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        var token = credential.accessToken;
  
        // The signed-in user info.
        var user = result.user;
        console.log(user);
        window.location.href = '/start/index.html';
        // IdP data available in result.additionalUserInfo.profile.
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  }
  