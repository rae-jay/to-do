console.log("working test");

import { Task } from "./task";
import { Project } from "./project";
import { generateStartup } from "./interface";


const projects = [];
const timeProjects = [];




projects.push(new Project("General"));
let testProject = new Project("Proj");
projects.push(testProject);

// title date category priority description
// (dates apparently need the DAY to be one number ahead, as though 1st = 0, but...months dont)
let testTask = new Task("last week", "2024-03-09", testProject, 2, "these are details", ["Sub 1", "Sub 2"]);
let testTask2 = new Task("today", "2024-03-12", testProject, 1, "these are details");
let testTask3 = new Task("tomorrow", "2024-03-13", testProject, 2, "these are details");
let testTask4 = new Task("this week", "2024-03-16", testProject, 2, "these are details");
let testTask5 = new Task("over a week", "2024-03-22", testProject, 2, "these are details");
let testTask6 = new Task("late month", "2024-03-28", testProject, 2, "these are details");



let todayDate = new Date();
todayDate.setHours(0,0,0,0);



createTimeProjects();


// testGen();
generateStartup(todayDate, projects, timeProjects);




function createTimeProjects(){

    timeProjects.push(new Project("Today"));
    timeProjects.push(new Project("This Week"));

    const compareDates = [
        new Date(todayDate.getFullYear(),todayDate.getMonth(),todayDate.getDate()+1),
        new Date(todayDate.getFullYear(),todayDate.getMonth(),todayDate.getDate()+7),
    ];
    compareDates.forEach( (date) => { date.setHours(0,0,0,0)});

    projects.forEach( (proj) => {
        proj.tasks.forEach (  (task) => {
            const dateResults = task.compareDates(compareDates);

            // console.log("task: " + task.title)
            // console.log(dateResults);

            for(let i = 0; i < timeProjects.length; i++){
                if(dateResults[i] == true){
                    timeProjects[i].addTask(task);
                }
            }
        })
    })
}




export function processTaskForm(values){

    const extractValues = [];
    // 0-4 are everything but subtasks
    for(let i = 0; i < 5; i++){
        extractValues.push(values[i][1]);
    }
    // this is messy as hell but passing a project object as a select value WAS NOT WORKING
    extractValues[2] = projects[extractValues[2]];

    const subtasks = [];
    if(values.length > 5){
        for(let i = 5; i < values.length; i++){
            if(values[i][1] != ""){
                subtasks.push(values[i][1]);
            }
        }
    }
    extractValues.push(subtasks);

    const testTaskGen = new Task(...extractValues);

    // console.log("processTaskForm: ");
    // console.log(testTaskGen);
    {/*
    this gives us:
    [
    0    [title, ""]
    1    [date, "xxxx-xx-xx"] (y/m/d)
    2    [category, ""] (so how do i actually want to value this one eh)
    3    [priority, '0/1/2']
    4    [desc, ""] (can be blank)
        
        then some number of 
    5+  [sub0, 'task name']
        the last of which could be blank
        but there may be none of them at all
    ]
    */}
}


export function processProjectForm(values){
    const newProj = new Project(values[1]);
    projects.push(newProj);
    return newProj;
}


/*
    -what do we do if a task SHOULDNT have a due date
-ability to edit or delete tasks and projects from UI
-ability to mark tasks as complete
    -(possibly a 'completed' tab where those finished tasks go, and can be un-completed)
-(and mark subtasks as complete)

-change cursor on clickable things
-and alt text to images
    -possibly make add buttons float seperately at bottom of screen

*/