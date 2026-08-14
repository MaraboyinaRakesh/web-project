// alert("hello from javasrcipt")
const users = [
 {
   "name" : "Jonn Doe",
   "gender" : "Male",
   "image" : "john.png"
 },
   {
   "name" : "Jane Doe",
   "gender" : "Female",
   "image" : "jane.png"
 }
]


var curIndex = 0;


function toggle(){
 if(curIndex == 0)
   curIndex = 1;
 else
   curIndex = 0;


 document.getElementById("card-image").src = users[curIndex].image
 document.getElementById("card-name").innerText =users[curIndex].name
 document.getElementById("card-gender").innerText=users[curIndex].gender
}

function random(){
  fetch('https://randomuser.me/api')
  .then(function(response){
    return response.json();
  })
  .then(function(data){
    // console.log(data)
    var details=data.results[0];
    document.getElementById("card-image").src=details.picture.large
    document.getElementById("card-gender").innerText=details.gender
    var fullname=details.name.first +" "+ details.name.last
    document.getElementById("card-name").innerText=fullname
  })
}
