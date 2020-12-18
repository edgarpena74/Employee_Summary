const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

let teamArr = []
let teamId = []

const employeeTitle = [
    {
        type: "list",
        name: "title",
        message: "What is the employees title? ",
        choices: ["Engineer", "Intern", "Manager"]
    }
]

const askNew = [
    {
        type: "list",
        name: "newEmployee",
        message: "Would you like to add a new employee? ",
        choices: ["Yes", "No"]
    }
]

const engineer = [
    {
        type: "input",
        name: "name",
        message: "What is the employees name? ",
        validate: name => {
            if (name){
                return true
            }
            return "Please add at least one character"
        }
    },
    {
        type: "input",
        name: "id",
        message: "What is the employees ID? ",
        validate: id => {
            //you could write +id instead of parseInt(id)
            const num = parseInt(id)
            //isNaN cover if it is not a number or if it is empty(user typed in nothing)
            if(isNaN(num)) {
                return "Please insert only numbers"
            }
            if(num <= 0){
                return "Please insert positive numbers"
            }
            if(teamId.includes(id)) {
                return "ID already taken"
            }
            return true
        }
    },
    {
        type: "input",
        name: "email",
        message: "What is the employees email? ",
        validate: email => {
            const valid = email.match(/^\S+@\S+\.\S+$/)
            if(valid){
                return true
            }
            return "Please enter a valid email"
        }
    },
    {
        type: "input",
        name: "github",
        message: "What is the employees GitHub username? ",
        validate: github => {
            if (github){
                return true
            }
            return "Please add at least one character"
        }
    }
]

const intern = [
    {
        type: "input",
        name: "name",
        message: "What is the employees name? ",
        validate: name => {
            if (name){
                return true
            }
            return "Please add at least one character"
        }
    },
    {
        type: "input",
        name: "id",
        message: "What is the employees ID? ",
        validate: id => {
            //you could write +id instead of parseInt(id)
            const num = parseInt(id)
            //isNaN cover if it is not a number or if it is empty(user typed in nothing)
            if(isNaN(num)) {
                return "Please insert only numbers"
            }
            if(num <= 0){
                return "Please insert positive numbers"
            }
            if(teamId.includes(id)) {
                return "ID already taken"
            }
            return true
        }
    },
    {
        type: "input",
        name: "email",
        message: "What is the employees email? ",
        validate: email => {
            const valid = email.match(/^\S+@\S+\.\S+$/)
            if(valid){
                return true
            }
            return "Please enter a valid email"
        }
    },
    {
        type: "input",
        name: "school",
        message: "What school is the intern attending? ",
        validate: school => {
            if(school){
                return true
            }
            return "Please enter a school"
        }
    }
]

const manager = [
    {
        type: "input",
        name: "name",
        message: "What is the employees name? ",
        validate: name => {
            if (name){
                return true
            }
            return "Please add at least one character"
        }
    },
    {
        type: "input",
        name: "id",
        message: "What is the employees ID? ",
        validate: id => {
            //you could write +id instead of parseInt(id)
            const num = parseInt(id)
            //isNaN cover if it is not a number or if it is empty(user typed in nothing)
            if(isNaN(num)) {
                return "Please insert only numbers"
            }
            if(num <= 0){
                return "Please insert positive numbers"
            }
            if(teamId.includes(id)) {
                return "ID already taken"
            }
            return true
        }
    },
    {
        type: "input",
        name: "email",
        message: "What is the employees email? ",
        validate: email => {
            const valid = email.match(/^\S+@\S+\.\S+$/)
            if(valid){
                return true
            }
            return "Please enter a valid email"
        }
    },
    {
        type: "input",
        name: "officeNumber",
        message: "what is the managers office number?  ",
        validate: officeNumber => {
            const num = parseInt(officeNumber)
            //isNaN cover if it is not a number or if it is empty(user typed in nothing)
            if(isNaN(officeNumber)) {
                return "Please insert only numbers"
            }
            if(num <= 0){
                return "Please insert positive numbers"
            }
            return true
        }
    }

]

function start() {
    inquirer.prompt(employeeTitle)
    .then(res =>{
        if (res.title === "Engineer"){
            inquirer.prompt(engineer)
            .then(emp => {
                const eng = new Engineer(emp.name, emp.id, emp.email, emp.github)
                teamArr.push(eng)
                teamId.push(emp.id)
                startNew()
            })
            
        } else if (res.title === "Intern"){
            inquirer.prompt(intern)
            .then(emp => {
                const int = new Intern(emp.name, emp.id, emp.email, emp.school)
                teamArr.push(int)
                teamId.push(emp.id)
                startNew()
            })
            
        } else if (res.title === "Manager"){
            inquirer.prompt(manager)
            .then(emp => {
                const man = new Manager(emp.name, emp.id, emp.email, emp.officeNumber)
                teamArr.push(man)
                teamId.push(emp.id)
                startNew()
            })
        }
    })
}

function startNew() {
    inquirer.prompt(askNew)
    .then(res =>{
        if (res.newEmployee === "Yes"){
            start()
        } else if (res.newEmployee === "No"){
           renderTeam()
        }
    })
}

function renderTeam() {
    if(!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }

    fs.writeFileSync(outputPath, render(teamArr), "utf-8")
}

start()

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
