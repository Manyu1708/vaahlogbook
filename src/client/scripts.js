
const { event } = require("jquery");

  
    
function myNotifications() {
  var myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
keyboard: false
})
myModal.toggle();

}
  function display(iFrameBox) {
  var x = document.getElementById(iFrameBox);
  var y = document.getElementById("data-form");
  
  if (x.style.display === "none") {
      x.style.display = "block";
      y.style.display = "none";
    
    } 
    else {
    
  if(!iframeBox.contains('if-')){
      x.style.display = "none";
      y.style.display = "none";
  }
    
    }
  }
    async function iframex(iframeId)
    {
     var iFrameBox = 'includehtmltest';
     document.getElementById(iFrameBox).style.display = "none";
     var delayInMilliseconds = 100; //1 second
 
 
     var iframediv = document.getElementById(iFrameBox);
     var innerDoc = iframediv.contentWindow.document;//.querySelector("form-group");
 switch (iframeId) {
     case 'add-lb':
     document.getElementById(iFrameBox).src='/logbook';
     display(iFrameBox);
     break;
 case 'view-lb':
   document.getElementById(iFrameBox).src='/ViewLogbook';
 //   await fetch('/viewlogbook').then(function(response) {
 //     // When the page is loaded convert it to text
 //     return response.text();
 // }).then((html) => {
 // console.log(html);
 // document.getElementById('MyDiv').innerHTML = html;
 // }
 
 // );
     display(iFrameBox);
     // viewLogBookOnLoad();
     break;
   case 'chgpwd':
     console.log('123');
     document.getElementById(iFrameBox).src='/changepassword';
     display(iFrameBox);
     break;
   case 'add-aelp':
     document.getElementById(iFrameBox).src='/AELP';
     display(iFrameBox);
   break;
   case 'add-rating':
     document.getElementById(iFrameBox).src='/Endorsement';
     display(iFrameBox);
   break;
   case 'view-rating':
   iFrameBox = 'if-ratings-details';
     document.getElementById(iFrameBox).src='/ViewEndorsement';
     display(iFrameBox);
   break;
   case 'view-stress':
     document.getElementById(iFrameBox).src='/ViewStress';
     display(iFrameBox);
   break;
   
     case 'add-prof':
     document.getElementById(iFrameBox).src='/Proficiency';
     display(iFrameBox);
   break;
   case 'add-art':
     document.getElementById(iFrameBox).src='/Training';
     display(iFrameBox);
   break;
   case 'view-art':
   iFrameBox = 'if-training-details';
     document.getElementById(iFrameBox).src='/ViewTraining';
     display(iFrameBox);
   break;
     case 'view-ojtlb':
   document.getElementById(iFrameBox).src='/ViewLogbook';
     display(iFrameBox);
    
 setTimeout(function() {
   //your code to be executed after 1 second
  var iframediv = document.getElementById(iFrameBox);
 var innerDoc = iframediv.contentWindow.document;//.document.querySelector("DIV");
 innerDoc.getElementsByClassName("trainee")[0].style.display = "block";
 }, delayInMilliseconds);
     break;
     
     case 'view-trlb':
       document.getElementById(iFrameBox).src='/ViewLogbook';
       display(iFrameBox);    
 setTimeout(function() {
   //your code to be executed after 1 second
  var iframediv = document.getElementById(iFrameBox);
 var innerDoc = iframediv.contentWindow.document;//.document.querySelector("DIV");
 
 innerDoc.getElementsByClassName("instructor")[0].style.display = "block";
 }, delayInMilliseconds);
   //innerDoc.getElementsByClassName("instructor")[0].style.visibility='hidden'
       break;
 case 'add-ojtlb':
   document.getElementById(iFrameBox).src='/logbook';
   display(iFrameBox);
   setTimeout(function() {
     //your code to be executed after 1 second
    var iframediv = document.getElementById(iFrameBox);
   var innerDoc = iframediv.contentWindow.document;//.document.querySelector("DIV");
   innerDoc.getElementsByClassName("trainee")[0].style.display = "block";
   innerDoc.getElementsByClassName("purpose")[0].style.display = "block";
   }, delayInMilliseconds);
 break;
 case 'add-trlb':
   document.getElementById(iFrameBox).src='/logbook';
   display(iFrameBox);
   setTimeout(function() {
     //your code to be executed after 1 second
    var iframediv = document.getElementById(iFrameBox);
   var innerDoc = iframediv.contentWindow.document;//.document.querySelector("DIV");
   innerDoc.getElementsByClassName("instructor_list")[0].style.display = "block";
   innerDoc.getElementsByClassName("Emp_Purpose")[0].style.display = "block";
   }, delayInMilliseconds);
 break;
       case 'add-med':
         document.getElementById(iFrameBox).src='/Medical';
     display(iFrameBox);
   break;
   case 'view-med':
     iFrameBox = 'if-medical-details';
         document.getElementById(iFrameBox).src='/ViewMedical';
     display(iFrameBox);
   break;
   case 'view-prof':
     document.getElementById(iFrameBox).src='/ViewProficiency';
 display(iFrameBox);
 break;
   case 'add-otd':
     document.getElementById(iFrameBox).src='/OTD';
     display(iFrameBox);
   break;
   case 'view-otd':
   iFrameBox = 'if-other-training-details';
     document.getElementById(iFrameBox).src='/ViewOtd';
     display(iFrameBox);
   break;
   case 'view-aelp':
   iFrameBox = 'if-aelp-details';
     document.getElementById(iFrameBox).src='/ViewAelp';
     display(iFrameBox);
   break;
     case 'view-profile':
     document.getElementById(iFrameBox).src='/ViewProfile2';
     display(iFrameBox);
   break;
 
 
     default:
     break;
 }
 
    }
 
 
  

function myFunction() {
// Get the checkbox
var checkBox = document.getElementById("datecheck");
// Get the output text
var datefrom = document.getElementById("Date_From").value;
var dateto = document.getElementById("Date_To");
// If the checkbox is checked, display the output text
if (checkBox.checked == true){
  console.log(datefrom);
document.getElementById("Date_To").value = datefrom;
} 
}

