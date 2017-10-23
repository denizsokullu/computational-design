var config = {
  apiKey: "AIzaSyBgccrWZFk0uWNiys5_AIsd9msCJIaxSMg",
  authDomain: "computational-design.firebaseapp.com",
  databaseURL: "https://computational-design.firebaseio.com",
  projectId: "computational-design",
  storageBucket: "",
  messagingSenderId: "597250126920"
};
firebase.initializeApp(config);
console.log(firebase);
var database = firebase.database();
var ref = database.ref('generativeTypewriter/creations');

function saveData(){
  data = {};
  // data.currentWord = SETTINGS.currentWord;
  data.currentWordLiteral = SETTINGS.currentWordLiteral;
  data.id = window.location.search.split("=")[1];
  var image = new Image();
  canvas = document.getElementById("defaultCanvas0");
  src = canvas.toDataURL("image/png");
  data.image = src;
  data.title = "Test Title"
  tempObject = {};
  data.dataWrite = true;
  tempObject[data.id] = data;
  ref.update(tempObject);
}
