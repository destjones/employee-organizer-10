const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const teamArray = [];
let newEmp;

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function getEmp() {
    inquirer.prompt([
        {
            type: 'confirm',
            message: 'Click "yes" to input a new employee. Click "no" to exit',
            name: 'continue'
        }

    ]).then(answer => {
        if (answer.continue) {
            inquirer
                .prompt([
                    {
                        type: 'list',
                        message: "Let's get started. What role would you like to enter?",
                        name: 'type',
                        choices: ["Engineer", "Intern", "Manager"]
                    },
                    {
                        type: 'input',
                        message: "What is the employee's name?",
                        name: 'name',
                    },
                    {
                        type: 'input',
                        message: "What is the employee's ID?",
                        name: 'id',
                    },
                    {
                        type: 'input',
                        message: "What is the employee's email address?",
                        name: 'email',
                    },
                ])
//takes generic answers and proceeds to more specific questions
    .then(answers => {
                    //switch statement that proceeds depending on the type of employee being built. asks teh specific question and then recursively starts the process again. 
                    switch (answers.type) {
                        case "Engineer":
                            inquirer
                                .prompt([
                                    {
                                        type: 'input',
                                        message: "Enter the employee's github username.",
                                        name: 'github',
                                    }
                                ])
                                .then(response => {
                                    newEmp = new Engineer(answers.name, answers.id, answers.email, response.github);
                                    empArray.push(newEmp);
                                    
                                    return getEmployee();
                                })
                            break;
                        case "Intern":
                            inquirer
                                .prompt([
                                    {
                                        type: 'input',
                                        message: "Enter the school name of the employee.",
                                        name: 'school',
                                    }
                                ])
                                .then(response => {
                                    newEmp = new Intern(answers.name, answers.id, answers.email, response.school);
                                    empArray.push(newEmp);
                                    
                                    return getEmployee();
                                })
                            break;
                        case "Manager":
                            inquirer
                                .prompt([
                                    {
                                        type: 'input',
                                        message: "Enter the manager's office number.",
                                        name: 'officeNumber',
                                    }
                                ])
                                .then(response => {
                                    newEmp = new Manager(answers.name, answers.id, answers.email, response.officeNumber);
                                    empArray.push(newEmp);
                                    
                                    return getEmployee();
                                })
                            break;
                    }

                })
        }
        //when the user finally answers that they do not want to add another employee, it writes the data collected so far. 
        else {
            fs.mkdir(OUTPUT_DIR,
                { recursive: true }, (err) => {
                    if (err) {
                        return console.error(err);
                    }

                });
            fs.writeFile(outputPath, render(empArray), function (err) {

                if (err) {
                    return console.log(err);
                }

                console.log("Your Employees have successfully been organized");

            });

        }

    })

}
;

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
