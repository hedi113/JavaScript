//course functions

function GetCourse() {  
    fetch(`https://vvri.pythonanywhere.com/api/courses`)
    .then(response => response.json())
    .then(json => {
        const courseDetails = json.map(course => {
            const studentNames = course.students.map(student => student.name).join(", ");
            return `<li>${course.name} (${course.id}): ${studentNames}</li>`;
        }).join("");
        document.getElementById("cshere").innerHTML = `<ul>${courseDetails}</ul>`;
    });
}

async function setMaxCourseId(setMaxValueTo) {
    try {
      // Fetch course data from the API
      const response = await fetch('https://vvri.pythonanywhere.com/api/courses');
      if (!response.ok) throw new Error('Failed to fetch courses');
      
      const courses = await response.json();
      
      // Find the largest course id
      const maxCourseId = courses.reduce((max, course) => 
        course.id > max ? course.id : max, 0);
      
      // Set the max attribute of the input field
      const courseInput = document.getElementById(setMaxValueTo);
      courseInput.max = maxCourseId;
    } catch (error) {
      console.error('Error fetching course data:', error);
    }
}

async function setMaxStudentId(setMaxValueTo) {
    try {
      // Fetch student data from the API
      const response = await fetch('https://vvri.pythonanywhere.com/api/students'); // Replace with the correct endpoint
      if (!response.ok) throw new Error('Failed to fetch students');
      
      const students = await response.json();
      
      // Find the largest student id
      const maxStudentId = students.reduce((max, student) => 
        student.id > max ? student.id : max, 0);
      
      // Set the max attribute of the input field
      const studentInput = document.getElementById(setMaxValueTo);
      studentInput.max = maxStudentId;
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  }

const studentIds = [];
const students = [];

function GetStudent() {
    fetch(`https://vvri.pythonanywhere.com/api/students`)
    .then(response => response.json())
    .then(json => {
        const studentDetails = json.map(student => {
            return `<li>${student.id}: ${student.name}</li>`;
        }).join("");
        document.getElementById("sthere").innerHTML = `<ul>${studentDetails}</ul>`;
    }
    );
}
//GetStudent();

let courseId = Math.max(studentIds);

function GetMaxStdId() {
    return Math.max(studentIds);
}

function AddCourse() {
    const courseName = document.getElementById('courseName').value;
    fetch("https://vvri.pythonanywhere.com/api/courses", {
        method: "POST",
        body: JSON.stringify({
            name: courseName
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
        }).then(response => response.json());
}

// function AddStudentToCourse(courseId, studentId) {

//     const std = {};
    
//     for (let i of Object.keys(students)) {
//         if(i = studentId) {
//             std += students[i];
//         }
//     }

//     fetch(`https://vvri.pythonanywhere.com/api/courses/${courseId}`, {
//         method: "PATCH",
//         body: JSON.stringify({
//             students: [
//                 {
//                   "op": "add",
//                   "path": "/students/-",
//                   "value": {
//                     "id": std.id,
//                     "name": std.name
//                   }
//                 }
//               ]
//         }),
//         headers: {
//             "Content-type": "application/json; charset=UTF-8"
//         }
//         }).then(response => response.json());
// }

function AddStudent() {

    let name = document.getElementById("studentName").value;
    let courseId = document.getElementById("studentCourse").value;

    fetch("https://vvri.pythonanywhere.com/api/students", {
    method: "POST",
    body: JSON.stringify({
        "name": name,
        "course_id": courseId
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(response => response.json());
}

function EditStudent() {
    let studentId = document.getElementById("stdToEdit").value;
    let newName = document.getElementById("editStdName").value;
    let newCourseId = document.getElementById("editStdCourse").value;

    fetch(`https://vvri.pythonanywhere.com/api/students/${studentId}`, {
      method: "PUT",
      body: JSON.stringify({ 
        name: newName,
        course_id: newCourseId
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => response.json());
}

function EditCourse() {
    let courseId = document.getElementById("courseToEdit").value;
    let newName = document.getElementById("newCourseName").value;

    fetch(`https://vvri.pythonanywhere.com/api/courses/${courseId}`, {
      method: "PATCH",
      body: JSON.stringify({
        name: newName
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => response.json());
}

function DeleteCourse() {

    let courseToDelete = document.getElementById("courseToDelete").value;

    fetch(`https://vvri.pythonanywhere.com/api/courses/${courseToDelete}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(json => console.log(json))
}

function DeleteStd() {

    let stdToDelete = document.getElementById("stdToDelete").value;

    fetch(`https://vvri.pythonanywhere.com/api/students/${stdToDelete}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(json => console.log(json))
}

function openTab(evt, name) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(name).style.display = "block";
  evt.currentTarget.className += " active";
}