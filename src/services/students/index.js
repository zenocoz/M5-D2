const express = require("express")
const fs = require("fs") //core nodejs module (file system)
const path = require("path") //core module, i will be sure to be safely creating paths
const uniqid = require("uniqid") //third party module

const router = express.Router() //lets me create a collection of endpoints(router.get(), router.post() ecc)

//route 1 GET
router.get("/", (req, res) => {
  const studentsPathFile = path.join(__dirname, "students.json")

  const fileAsBuffer = fs.readFileSync(studentsPathFile) //returns a buffer, machine readable code, so must be converted
  const file = fileAsBuffer.toString() //we want to send a JSON, not a string
  const fileJSON = JSON.parse(file)
  console.log(fileJSON)

  res.send(fileJSON)
})

//GET single student

router.get("/:id", (req, res) => {
  const studentsPathFile = path.join(__dirname, "students.json")
  const fileAsBuffer = fs.readFileSync(studentsPathFile)
  const file = fileAsBuffer.toString()
  const studentsArray = JSON.parse(file)
  const idComingFromRequest = req.params.id
  console.log("----------------------->", idComingFromRequest)

  const student = studentsArray.filter(
    (student) => student.ID === idComingFromRequest
  )
  console.log("USER ", student)

  res.send(student)
})

//POST
router.post("/", (req, res) => {
  const studentsPathFile = path.join(__dirname, "students.json")
  const fileAsBuffer = fs.readFileSync(studentsPathFile)
  const file = fileAsBuffer.toString()
  const studentsArray = JSON.parse(file)

  const newStudent = req.body
  console.log(newStudent)
  newStudent.ID = uniqid()

  studentsArray.push(newStudent)

  fs.writeFileSync(studentsPathFile, JSON.stringify(studentsArray))
  res.status(201).send({ id: newStudent.ID })
})

//PUT
router.put("/:id", (req, res) => {
  const studentsFilePath = path.join(__dirname, "students.json")
  const fileAsABuffer = fs.readFileSync(studentsFilePath)
  const fileAsAString = fileAsABuffer.toString()
  const studentsArray = JSON.parse(fileAsAString)

  const newStudentsArray = studentsArray.filter(
    (student) => student.ID !== req.params.id
  )

  const modifiedStudent = req.body
  modifiedStudent.ID = req.params.id

  newStudentsArray.push(modifiedStudent)

  fs.writeFileSync(studentsFilePath, JSON.stringify(newStudentsArray))
  res.send("Modify user route")
})

//Add Project to Student
router.put("/:id/:projectId", (req, res) => {
  const idStudent = req.params.id
  const idProject = req.params.projectId
  console.log("ID STUDENT>", idStudent)
  console.log("ID PROJECT", idProject)

  const studentsFilePath = path.join(__dirname, "students.json")
  const fileAsABuffer = fs.readFileSync(studentsFilePath)
  const fileAsAString = fileAsABuffer.toString()
  const studentsArray = JSON.parse(fileAsAString)

  // path.join(__dirname, "..", "/otherfolder etc
  const projectsFilePath = path.join(__dirname, "../projects", "projects.json")
  const projectBuffer = fs.readFileSync(projectsFilePath)
  const projBuffString = projectBuffer.toString()
  const projectsArray = JSON.parse(projBuffString)

  const newStudentsArray = studentsArray.filter(
    //array without the student
    (student) => student.ID !== req.params.id
  )

  const singleStudent = studentsArray.filter(
    (student) => student.ID === idStudent
  )
  console.log(singleStudent)
  const project = projectsArray.filter((project) => project.ID === idProject)
  console.log(project)
  singleStudentProjects = singleStudent.projects
  console.log(singleStudentProjects)

  // const modifiedStudent = req.body
  // modifiedStudent.projects.push(project)

  // newStudentsArray.push(modifiedStudent)

  // fs.writeFileSync(studentsFilePath, JSON.stringify(newStudentsArray))
  // res.send("Modify user route")
})

//DELETE

router.delete("/:id", (req, res) => {
  const studentsFilePath = path.join(__dirname, "students.json")
  const fileAsABuffer = fs.readFileSync(studentsFilePath)
  const fileAsAString = fileAsABuffer.toString()
  const studentsArray = JSON.parse(fileAsAString)

  const newStudentsArray = studentsArray.filter(
    (student) => student.ID !== req.params.id
  )

  fs.writeFileSync(studentsFilePath, JSON.stringify(newStudentsArray))

  res.status(204).send()
})

module.exports = router
