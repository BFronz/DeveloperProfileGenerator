var inquirer = require("inquirer");
var fs       = require("fs");


function writeToIt (data) {
    fs.appendFile('README.md', data, 'utf8', function(err) { 
        if (err) throw err;
    });
}

function newLine() {
    fs.appendFile('README.md', '\n',  'utf8',  function(err) {
        if (err) {
            return console.error(err);
        }
    });
}



inquirer
    .prompt([
        {
            type: "input",
            message: "Project Title (required): ",
            name: "title",
            validate: function(text) {
                if (text === "") {
                  return 'You must enter a Project Title.';
                }
          
                return true;
              }          
        }])
        .then( answer => {
 
        // title  - first time in use writeFile to create a file then append the rest of the way 
        var data = '# ' + answer.title + '\n';          
        fs.writeFile('README.md', data, 'utf8', function(err) { 
            if (err) throw err;
        });
        newLine();

    });


    inquirer
    .prompt([       
        {
            type: "input",
            message: "Project Description (required): ",
            name: "description",
            validate: function(text) {
                if (text === "") {
                  return 'You must enter a Project Description.';
                }
          
                return true;
              },
        }])
        .then( answer => {
            
        // description
        writeToIt('## Description '+ '\n' + answer.description + '\n'); 
         newLine(); 
            
     });
        
        

// inquirer
//     .prompt([ 
//         {
//             type: "checkbox",
//             name: "toc",
//             message: "Do you want a table of contents (press enter to skip)?",
//             choices:["Installation", "Usage", "License", "Contributing", "Tests", "Questions" ]

//         }])
//         .then( answer => {

//         // Table of contents
//         if(answer.toc.length>0){

//         writeToIt('## Table of Contents'+'\n');

//         for(var i=0; i< answer.toc.length; i++ ){
//             var x = answer.toc[i];
//             var y = answer.toc[i].toLowerCase();
//             if(x !="") {               
//                 writeToIt('- [' + x + '](#' + y + ")" + '\n');
//             }     
//         }
//         newLine();
//         }

//      });

// inquirer
//     .prompt([         
//         {
//             type: "input",
//             message: "Any installation information(press enter to skip)? ",
//             name: "installation"
//         }])
//         .then( answer => {

//         // Installation
//         if(answer.installation != "") { 
//          writeToIt('## Installation '+ '\n' + answer.installation + '\n\n');
//             newLine(); 
//         }  
//      });
        
        

//  inquirer
//     .prompt([  
//         {
//             type: "input",
//             message: "Any usage information (press enter to skip)?",
//             name: "usage"
//         }])
//         .then( answer => {

//         // usage
//        if(answer.usage != "") { 
//             writeToIt('## Usage '+ '\n' + answer.usage + '\n\n');
//             newLine();
//         }  

//     });
        
        

//  inquirer
//     .prompt([  
//         {
//             type: "input",
//             message: "Any Licensing (press enter to skip)?",
//             name: "license"
//         }])
//         .then( answer => {

//          // License
//          if(answer.license != "") { 
//             writeToIt('## License '+ '\n' + answer.iicense + '\n\n');
//             newLine(); 
//         }  
//     });
        
// inquirer 
//     .prompt([        
//         {
//             type: "input",
//             message: "Contributing information (press enter to skip)?",
//             name: "contributing"
//         }])
//         .then( answer => {

//         // Contributing
//         if(answer.contributing != "") { 
//             writeToIt('## Contributing '+ '\n' + answer.contributing + '\n\n');
//             newLine(); 
//         }  

//      });

        
// inquirer 
//   .prompt([                  
//         {
//             type: "input",
//             message: "Project Testing (press enter to skip)?",
//             name: "tests"
//         }])
//         .then( answer => {

//         // Tests
//         if(answer.tests != "") { 
//             writeToIt('## Tests '+ '\n' + answer.tests + '\n\n');
//             newLine(); 
//         }  


//     });
        

// inquirer
//     .prompt([        
//         {
//             type: "input",
//             message: "Questions (press enter to skip)?",
//             name: "questions"
//         }])
//         .then( answer => {
//          // questions
//          if(answer.questions != "") { 
//             writeToIt('## Questions '+ '\n' + answer.questions + '\n\n');
//             newLine(); 
//         }  


//      });
        
        
// inquirer
//     .prompt([  
//         {
//             type: "input",
//             message: "Email Address",
//             name: "Email",
//             validate: function(value) {

//                 var pass = value.match(
//                     /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
//                 );
//                 if (pass) {
//                   return true;
//                 }
          
//                 return 'Please enter a email address.';
//             }
//         }
//     ])
//     .then( answer => {

//       // email - with valid email address
//         if(answer.email != "") { 
//             writeToIt('## Email '+ '\n' + answer.email + '\n\n');
//             newLine();
//         }  
            

// });






// Badge
// Title
// Description
// Table of Contents (Not 100% necessary)
// Installation
// Usage
// License
// Contributing
// Tests
// Questions
// User GitHub profile picture
// User GitHub email


