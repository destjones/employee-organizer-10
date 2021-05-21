const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");

const empArray = [];
let newEmp;

// begins to get employee
function getEmployee() {
    // asks users if they would like to enter a new employee
    inquirer.prompt([
        {
            type: 'confirm',
            message: 'Are you adding a new employee?',
            name: 'continue'
        }
    ])
        // if user confirms, the questions start
        .then(answer => {
            if (answer.continue) {
                inquirer
                    .prompt([
                        {
                            type: 'list',
                            message: "Choose a role.",
                            name: 'type',
                            choices: ["Engineer", "Intern", "Manager"]
                        },
                        {
                            type: 'input',
                            message: "Enter the name of the employee.",
                            name: 'name',
                        },
                        {
                            type: 'input',
                            message: "Enter the employee ID number.",
                            name: 'id',
                        },
                        {
                            type: 'input',
                            message: "Enter the employee email.",
                            name: 'email',
                        },
                    ])
                    // questions for each role
                    .then(answer => { 
                        switch (answer.type) {
                            case "Engineer":
                                inquirer
                                    .prompt([
                                        {
                                            type: 'input',
                                            message: "Enter the engineer's github username",
                                            name: 'github',
                                        }
                                    ])
                                    .then(response => {
                                        newEmp = new Engineer(answer.name, answer.id, answer.email, response.github);
                                        empArray.push(newEmp);

                                        return getEmployee();
                                    })
                                break;
                            case "Intern":
                                inquirer
                                    .prompt([
                                        {
                                            type: 'input',
                                            message: "Enter the intern's school name.",
                                            name: 'school',
                                        }
                                    ])
                                    .then(response => {
                                        newEmp = new Intern(answer.name, answer.id, answer.email, response.school);
                                        empArray.push(newEmp);

                                        return getEmployee();
                                    })
                                break;
                            case "Manager":
                                inquirer
                                    .prompt([
                                        {
                                            type: 'input',
                                            message: "Enter the manager's office number",
                                            name: 'officeNumber',
                                        }
                                    ])
                                    .then(response => {
                                        newEmp = new Manager(answer.name, answer.id, answer.email, response.officeNumber);
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

                    console.log("Organization completed.");

                });

            }

        })

}
getEmployee();