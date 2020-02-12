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
            message: "Any installation information( press enter to skip)? ",
            name: "installation"
        },   
        {
            type: "input",
            message: "Any usage information (press enter to skip)??",
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
            message: "Email Address",
            name: "Email"
        }
    ])
    .then( answer => {

        // title  - first time in use writeFile to create a file then append the rest of the way 
        var data = '# ' + answer.title + '\n';          
        fs.writeFile('README.md', data, 'utf8', function(err) { 
            if (err) throw err;
        });
        newLine();


        // description
        writeToIt('## Description '+ '\n' + answer.description + '\n'); 
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
            writeToIt('## Installation '+ '\n' + answer.installation + '\n\n');
            newLine(); 
        }  
                

        // usage
        if(answer.usage != "") { 
            writeToIt('## Usage '+ '\n' + answer.usage + '\n\n');
            newLine();
        }  
         

          // License
          if(answer.license != "") { 
            writeToIt('## License '+ '\n' + answer.iicense + '\n\n');
            newLine(); 
        }  
        

        // Contributing
        if(answer.contributing != "") { 
            writeToIt('## Contributing '+ '\n' + answer.contributing + '\n\n');
            newLine(); 
        }  
        
        

         // Tests
         if(answer.tests != "") { 
            writeToIt('## Tests '+ '\n' + answer.tests + '\n\n');
            newLine(); 
        }  
        

         // questions
         if(answer.questions != "") { 
            writeToIt('## Questions '+ '\n' + answer.questions + '\n\n');
            newLine(); 
        }  
           
        
        // email
        if(answer.email != "") { 
            writeToIt('## Email '+ '\n' + answer.email + '\n\n');
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


