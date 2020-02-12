var inquirer = require("inquirer");
var fs       = require("fs");


function writeToItFirst (data) {
    fs.writeFileSync('README.md', data, 'utf8', function(err) { 
        if (err) throw err;
    });
}

function writeToIt (data) {
    fs.appendFileSync('README.md', data, 'utf8', function(err) { 
        if (err) throw err;
    });
}

function newLine() {
    fs.appendFileSync('README.md', '\n',  'utf8',  function(err) {
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
        },
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
        },     
        {
            type: "checkbox",
            name: "toc",
            message: "Do you want a table of contents (press enter to skip)?",
            choices:["Installation", "Usage", "License", "Contributing", "Tests", "Questions" ]

        },
        {
            type: "input",
            message: "Any installation information(press enter to skip)? ",
            name: "installation"
        },   
        {
            type: "input",
            message: "Any usage information (press enter to skip)?",
            name: "usage"
        },  
        {
            type: "input",
            message: "Any Licensing (press enter to skip)?",
            name: "license"
        },          
        {
            type: "input",
            message: "Contributing information (press enter to skip)?",
            name: "contributing"
        },                
        
        {
            type: "input",
            message: "Project Testing (press enter to skip)?",
            name: "tests"
        },          
        {
            type: "input",
            message: "Questions (press enter to skip)?",
            name: "questions"
        },     
        {
            type: "input",
            message: "Email Address (required):",
            name: "email",
            validate: function(value) {

                var pass = value.match(
                    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                );
                if (pass) {
                  return true;
                }
          
                return 'Please enter a email address.';
            }
        },
        {
            type: "checkbox",
            name: "badges",
            message: "Add a badge?",
            choices:["Bootcamp", "Node", "NPM" ]

        }
    ])
    .then( answer => {

        // title  - first time in use writeFile to create a file then append the rest of the way 
        var data = '# ' + answer.title + '\n\n';          
        writeToItFirst(data);
        newLine();


   // Badges
//    if(answer.badges.length>0){

    

//     for(var i=0; i< answer.badges.length; i++ ){
 
//         var x = answer.badges[i];
       
//         if(x !="") {               
//             writeToIt('- [' + x + '](#' + y + ")" + '\n');
//         }     
//     }
//     newLine();
// }


        // description
        writeToIt('## Description'+'\n');
        writeToIt(answer.description+'\n');
        newLine(); 
        

            
        // Table of contents
        if(answer.toc.length>0){

            writeToIt('## Table of Contents'+'\n');

            for(var i=0; i< answer.toc.length; i++ ){
                var x = answer.toc[i];
                var y = answer.toc[i].toLowerCase();
                if(x !="") {               
                    writeToIt('- [' + x + '](#' + y + ")" + '\n');
                }     
            }
            newLine();
        }
        


         // Installation
         if(answer.installation != "") { 
            writeToIt('## Installation '+ '\n' + answer.installation + '\n');
            newLine(); 
        }  
                

        // usage
        if(answer.usage != "") { 
            writeToIt('## Usage '+ '\n' + answer.usage + '\n');
            newLine();
        }  
         

          // License
          if(answer.license != "") { 
            writeToIt('## License '+ '\n' + answer.license + '\n');
            newLine(); 
        }  
        

        // Contributing
        if(answer.contributing != "") { 
            writeToIt('## Contributing '+ '\n' + answer.contributing + '\n');
            newLine(); 
        }  
        
        

         // Tests
         if(answer.tests != "") { 
            writeToIt('## Tests '+ '\n' + answer.tests + '\n');
            newLine(); 
        }  
        

         // questions
         if(answer.questions != "") { 
            writeToIt('## Questions '+ '\n' + answer.questions + '\n');
            newLine(); 
        }  
           
        
        
        // email - with valid email address
        if(answer.email != "") { 
            writeToIt('## Email '+ '\n' + answer.email + '\n');
            newLine();
        }  
            

});






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




//https://img.shields.io/badge/Bootcamp-Project-brightgreen
//https://img.shields.io/badge/Node-v13.2.0-brightgreen
//![badmath](https://img.shields.io/github/languages/top/nielsenjared/badmath)


var badgeArr = [





]