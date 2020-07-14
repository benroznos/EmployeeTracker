const axios = require('axios')
const {writeFile} = require('fs')
const{prompt}=require('inquirer')
const { promisify } = require('util')
const router = require('express').Router()
const mysql = require('mysql2')
const { allowedNodeEnvironmentFlags } = require('process')
const db = mysql.createConnection({
  host: 'localhost',
  database: 'employee_db',
  port: 3306,
  user: 'root',
  password: 'blahblah'
})

function homePage(){
  prompt([
    {
      type:'list',
      name:'action',
      message:'What Would you like to do?',
      choices:['View employees', 'View roles','View departments','Add employee','Add role', 'Add department', 'Exit']
    }
  ])
.then(({action})=>{
  switch(action){
    case 'View employees':
      viewEmployee()
    break
    case 'View roles':
      viewRole()
      break
    case 'View departments':
      viewDepartment()
      break
    case 'Add employee':
      addEmployee()
      break
    case 'Add role':
      addRole()
      break
    case 'Add department':
      addDepartment()
      break
    case 'Exit':
      console.log('GoodBye :)')
      break
  }
})
.catch(err=>console.log(err))
}
function viewEmployee(){
  console.log('View Employees')
  db.query('SELECT * FROM employee',(err,employees)=>{
    if(err){console.log(err)}
    console.log(employees)
  })
  prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Return to main menu?',
      choices: ['yes','exit']
    }
  ])
  .then(({action})=>{
    switch(action){
      case('yes'):
      homePage()
      break
      case('exit'):
      console.log('GoodBye')
      break
    }
  })
    .catch(err => console.log(err))
}
function viewRole() {
  console.log('View Roles')
  db.query('SELECT * FROM role', (err, role) => {
    if (err) { console.log(err) }
    console.log(role)
  })
  prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Return to main menu?',
      choices: ['yes', 'exit']
    }
  ])
    .then(({ action}) => {
      switch (action){
      case ('yes'):
    homePage()
    break
      case ('exit'):
    console.log('GoodBye')
    break
  }
})
    .catch(err => console.log(err))
}
function viewDepartment() {
  console.log('View Departments')
  db.query('SELECT * FROM department', (err, deparments) => {
    if (err) { console.log(err) }
    console.log(deparments)
  })
  prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Return to main menu?',
      choices: ['yes', 'exit']
    }
  ])
    .then(({ action}) => {
      switch (action){
      case ('yes'):
    homePage()
    break
      case ('exit'):
    console.log('GoodBye')
    break
  }
})
    .catch(err => console.log(err))
}

function addEmployee(){
  let nameOne
  let nameTwo
  let rolesArr
  let empRole
  console.log('Add Emplyee')
  db.query('SELECT * FORM role'),(err, roles)=>{
    if(err){console.log(err)}
    rolesArr = roles
    console.log(roles)
  }
  prompt([
    {
      type:'input',
      name:'firstName',
      message:"What is the employee's first name?"
    }
  ])
  .then(({firstName})=>{
    let nameOne = firstName
    prompt([
      {
        type: 'input',
        name: 'lastName',
        message: "What is the employee's last name?"
      }
    ])
      .then(({ lastName }) => {
        let nameTwo = lastName
        prompt([
          {
            type: 'list',
            name: 'action',
            message: 'What role does the employee have?',
            choices: rolesArr
          }
        ])
          .then(({ action }) => {
            db.query(`SELECT id FROM role WHERE?`, { title: action }), (err, acquired) => {
              let empRole = acquired
            }
            db.query(`INSET INTO employees SET?`, {
              firstName: nameOne,
              lastName: nameTwo,
              roleId: empRole
            }, (err, info) => {
              if (err) { console.log(err) }
              console.log(info)
              homePage()
            })
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  })
    .catch(err => console.log(err))

}

function addRole() { 
  let depArr
  let newRole
  let salary
  console.log('Add Emplyee')
  db.query('SELECT * FORM department'), (err, departments) => {
    if (err) { console.log(err) }
    depArr = departments
  }
  prompt([
    {
      type:'input',
      name:'title',
      message:'What is the new role name?'
    }
  ])
  .then(({title})=>{
    let newRole = title
    prompt([
      {
        type: 'input',
        name: 'roleSalary',
        message: 'What is the Salary of this new role?'
      }
    ])
      .then(({ roleSalary }) => {
        let salary = roleSalary
        prompt([
          {
            type: 'list',
            name: 'action',
            message: 'What department does this role belong to?',
            choices: depArr
          }
        ])
          .then(({ action }) => {
            db.query(`SELECT id FROM department WHERE?`, { name: action }), (err, acquired) => {
              let roleDep = acquired
            }
            db.query('INSERT INTO role SET ?', {
              title: newRole,
              salary: salary,
              departmentId: roleDep
            }, (err, info) => {
              if (err) { console.log(err) }
              console.log(info)
            })
            homePage()
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  })
  .catch(err=>console.log(err))
}

function addDepartment() {
  prompt([
    {
      type:'input',
      name:'newDep',
      message:'What is the new department name?'
    }
  ])
  .then(({newDep})=>{
    db.query('INSERT INTO deparments SET ?', {
      name: newDep
    },(err,info)=>{
      if(err){console.log(err)}
      console.log(info)
    })
    homePage()
  })
  .catch(err=> console.log(err))
 }

homePage()

