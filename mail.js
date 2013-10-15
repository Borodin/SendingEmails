var nodemailer = require("nodemailer");
var config = require('./config.json');


function sendMail(){
  var student = config.students.pop();

  var smtpTransport = nodemailer.createTransport("SMTP",{
     service: "Gmail",
     auth: student
  });

  smtpTransport.sendMail({
     from: ""+student.name+" ("+student.group+") <"+student.user+">", 
     to: config.teacher.name+" <"+config.teacher.mail+">", 
     subject: config.teacher.sbj, 
     text: config.teacher.msg 
  }, function(error, response){
     if(error){
         console.log(error);
     }else{
         console.log("Message sent: "+student.name+" "+ response.message);
     }
     config.students.length?sendMail():process.exit();
  });
}

sendMail();
