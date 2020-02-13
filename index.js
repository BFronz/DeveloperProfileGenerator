const inquirer = require("inquirer");
const axios    = require("axios");
const fs       = require("fs");
const util     = require("util");


function writeToItFirst (fileName ,data) {
    fs.writeFileSync(fileName, data, 'utf8', function(err) { 
        if (err) throw err;
    });
}


function writeToIt (fileName,data) {
    fs.appendFileSync(fileName, data, 'utf8', function(err) { 
        if (err) throw err;
    });
}

function newLine(fileName) {
    fs.appendFileSync(fileName, '\n',  'utf8',  function(err) {
        if (err) {
            return console.error(err);
        }
    });
}

const licenseObj = {
    "MIT": "https://img.shields.io/badge/License-MIT-brightgreen",
    "BSD": "https://img.shields.io/badge/License-BSD-brightgreen",
    "NPM": "https://img.shields.io/badge/npm-6.13.1-brightgreen"
}



inquirer
    .prompt([
        {
            type: "input",
            message: "Enter GitHub username (required): ",
            name: "username",
            validate: function(text) {
                if (text === "") {
                  return 'You must enter a GitHub username.';
                }     
                return true;
              },
        },         
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
            type: "list",
            message: "Any license Badges (press enter to skip)?",
            name: "license",
            choices:["MIT", "BSE", "GPL" ]
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
            type: 'confirm',
            name: 'filetoBeDelivered',
            message: 'Your file is complete. Look for file format README_<GitHubID>.MD in the current directory.',
            default: false
        }    
    ])
    .then( answer => {


        // unique readme file name and data var
        var gitHubName =  answer.username.trim();
        // const fileName = `README_${gitHubName}.MD`;
        const fileName = `README.MD`;
        var data = "";
        var avatar = "";
        var gravatar = "";



        // title  - first time in use writeFile to create a file then append the rest of the way 
        data = '# ' + answer.title + '\n\n';          
        writeToItFirst(fileName,data);
        newLine(fileName);


        // description
        data = '## Description'+'\n';
        writeToIt(fileName,data);
        data = answer.description+'\n';
        writeToIt(fileName, data);
        newLine(fileName); 
        

            
        // Table of contents
        if(answer.toc.length>0){

            data = '## Table of Contents'+'\n';
            writeToIt(fileName,data);
            for(var i=0; i< answer.toc.length; i++ ){
                var x = answer.toc[i];
                var y = answer.toc[i].toLowerCase();
                if(x !="") {               
                    data = '- [' + x + '](#' + y + ")" + '\n';
                    writeToIt(fileName,data);
                }     
            }
            newLine(fileName);
        }
        


         // Installation
         if(answer.installation != "") { 
            data = '## Installation '+ '\n' + answer.installation + '\n';
            writeToIt(fileName,data);
            newLine(fileName); 
        }  
                

        // usage
        if(answer.usage != "") { 
            data = '## Usage '+ '\n' + answer.usage + '\n';
            writeToIt(fileName,data);
            newLine(fileName);
        }  
         

          // License
        if(answer.license != "") { 
            data = '## License '+ '\n';
            writeToIt(fileName,data);
                var x = answer.license;
                data = "";
               
                if(x === "MIT") {               
                    data = `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`;
                }  
                else if (x === "BSE") {
                    data = `[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)`;
                }
                else if (x === "GPL"){
                    data = '[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)';
                }    
            

            writeToIt(fileName,data);
            newLine(fileName); 
        }  
        newLine(fileName); 
        

        // Contributing
        if(answer.contributing != "") { 
            data = '## Contributing '+ '\n' + answer.contributing + '\n';
            writeToIt(fileName,data);
            newLine(fileName); 
        }  
        
        

         // Tests
         if(answer.tests != "") { 
            data = '## Tests '+ '\n' + answer.tests + '\n';
            writeToIt(fileName,data);
            newLine(fileName); 
        }  
        

         // questions
         if(answer.questions != "") { 
            data = '## Questions '+ '\n' + answer.questions + '\n';
            writeToIt(fileName,data);
            newLine(fileName); 
        }  
           
        // email - with valid email address
        if(answer.email != "") { 
            var em = answer.email;
            data = '## Email '+'\n';
            writeToIt(fileName,data);
            data  = `Any issues, questions or comments please contact <a href="mailto:${em}">${gitHubName}</a> `;
            writeToIt(fileName,data);
            newLine(fileName);
        }  

        // git hub
        const queryUrl = `https://api.github.com/users/${gitHubName}`;
        axios
        .get(queryUrl)
        .then(resp => {
          
            //avatar = resp.data.avatar_url;  
            const { avatar } = resp.data.avatar_url;  
            data = `<img src="${avatar}" alt="${gitHubName}">`;
            
            writeToIt(fileName,data);
            newLine(fileName);
        });



    

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
//https://img.shields.io/badge/npm-6.13.1-brightgreen
//![badmath](https://img.shields.io/github/languages/top/nielsenjared/badmath)







