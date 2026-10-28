let students = JSON.parse(localStorage.getItem("students")) || [
  {
    name: "Rahul",
    age: 20,
    course: "JavaScript",
    marks: 80
  },
  {
    name: "Priya",
    age: 21,
    course: "React",
    marks: 45
  },
  {
    name: "Suman",
    age: 22,
    course: "HTML",
    marks: 67
  }
];

const studentList=document.getElementById("studentList");

const form=document.getElementById("studentForm");

const search=document.getElementById("search");

const average=document.getElementById("average");

const jsonOutput=document.getElementById("jsonOutput");


const result = marks => marks>=50 ? "Pass":"Fail";


function display(data){

studentList.innerHTML="";

data.forEach((student,index)=>{

const row=document.createElement("tr");

row.innerHTML=`
<td>${student.name}</td>
<td>${student.age}</td>
<td>${student.course}</td>
<td>${student.marks}</td>
<td class="${student.marks>=50?'pass':'fail'}">
${result(student.marks)}
</td>
<td>
<button onclick="removeStudent(${index})">
Delete
</button>
</td>
`;

studentList.appendChild(row);

});

calculateAverage();

}


function calculateAverage(){

let total=0;

students.forEach(s=> total+=s.marks);

average.innerHTML=
"Average Marks : "+(total/students.length).toFixed(2);

}


form.addEventListener("submit",function(e){

e.preventDefault();

const name=document.getElementById("name").value.trim();

const age=Number(document.getElementById("age").value);

const course=document.getElementById("course").value.trim();

const marks=Number(document.getElementById("marks").value);


if(name==""){
alert("Name Required");
return;
}

if(age<5 || age>50){
alert("Invalid Age");
return;
}

if(course==""){
alert("Course Required");
return;
}

if(marks<0 || marks>100){
alert("Marks must be 0-100");
return;
}


students.push({

name,
age,
course,
marks

});


form.reset();

display(students);

});


function removeStudent(index){

students.splice(index,1);

display(students);

}


search.addEventListener("keyup",()=>{

const value=search.value.toLowerCase();

const filtered=students.filter(student=>
student.name.toLowerCase().includes(value)
);

display(filtered);

});


function showPassed(){

const passStudents=students.filter(student=>student.marks>=50);

display(passStudents);

}


function showFailed(){

const failStudents=students.filter(student=>student.marks<50);

display(failStudents);

}


function showAll(){

display(students);

}


function showJSON(){

const jsonData=JSON.stringify(students,null,2);

jsonOutput.textContent=jsonData;


const back=JSON.parse(jsonData);

console.log(back);

}


const today=new Date();

document.getElementById("date").innerHTML=today.toDateString();

display(students);