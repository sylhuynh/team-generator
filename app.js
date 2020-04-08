const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

function init() {
    promptManager();
}

init();

const employees = [];
let holdEmployeeData = "";

function addNewMember() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "What type of team member would you like to add?",
                name: "addEmployee",
                choices: ["Engineer", "Intern", "I don't want to add any more team members"]
            }
        ])
        .then(answers => {
            if (answers.addEmployee === "Engineer") {
                promptEngineer();
            }
            else if (answers.addEmployee === "Intern") {
                promptIntern();
            }
            else if (answers.addEmployee === "I don't want to add any more team members"){
                renderHTML();
                writeToFile(holdEmployeeData);

            }
        })
        .catch(error => {
            console.log("Could not create team.html!")
            process.exit(1);
        });
}

function renderHTML(){
    holdEmployeeData = render(employees);
}

function promptManager() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is your manager's name?",
                name: "managerName"
            },
            {
                type: "input",
                message: "What is your manager's id?",
                name: "managerId"
            },
            {
                type: "input",
                message: "What is your manager's email?",
                name: "managerEmail"
            },
            {
                type: "input",
                message: "What is your manager's office number?",
                name: "managerOfficeNumber"
            }
        ])
        .then(answers => {
            const addManager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber)
            employees.push(addManager);
            addNewMember();
        })        
        .catch(error => {
            console.log("Could not add team member! Try again")
            process.exit(1);
        })
};

function promptEngineer() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is your engineer's name?",
                name: "engineerName"
            },
            {
                type: "input",
                message: "What is your engineer's id?",
                name: "engineerId"
            },
            {
                type: "input",
                message: "What is your engineer's email?",
                name: "engineerEmail"
            },
            {
                type: "input",
                message: "What is your engineer's GitHub username?",
                name: "engineerGithub"
            }
        ])
        .then(answers => {
            const addEngineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub)
            employees.push(addEngineer);
            addNewMember();
        })
        .catch(error => {
            console.log("Could not add team member! Try again")
            process.exit(1);
        })
};

function promptIntern() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is your intern's name?",
                name: "internName"
            },
            {
                type: "input",
                message: "What is your intern's id?",
                name: "internId"
            },
            {
                type: "input",
                message: "What is your intern's email?",
                name: "internEmail"
            },
            {
                type: "input",
                message: "What is your intern's school?",
                name: "internSchool"
            },
        ])
        .then(answers => {
            const addIntern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool)
            employees.push(addIntern);
            addNewMember();
        })
        .catch(error => {
            console.log("Could not add team member! Try again")
            process.exit(1);
        })
};


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)


function writeToFile(data) {
    return fs.writeFile(outputPath, data, function (error) {
        if (error) {
            console.log(error)
            return;
        }
        console.log("Successfully created team!")
    });
}; 


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.


// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
