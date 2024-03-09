console.log("working test");

import { Task } from "./task";
import { Project } from "./project";
import { generateStartup } from "./interface";


const projects = [];
const timeProjects = [];
// then probably also one with the two time-based 'project' groups, because aside from
// how they're GENERATED, they work functionally the same


projects.push(new Project("General"));
let testProject = new Project("Proj");
projects.push(testProject);

// title date category priority description
let testTask = new Task("Do something", "date", testProject, 2, "these are details", ["Sub 1", "Sub 2"]);
let testTask2 = new Task("bDo something", "date", testProject, 1, "these are details");
let testTask3 = new Task("cDo something", "date", testProject, 2, "these are details");
// testTask.testDisplay();

// console.log(testTask);
// console.log(testTask.priority);
// testProject.addTask(testTask);

// testProject.addTask(testTask);
// testProject.addTask(testTask2);
// testProject.addTask(testTask3);

// testProject.removeTask(0);



createTimeProjects();


// testGen();
generateStartup(projects, timeProjects);




function createTimeProjects(){
    // i really don't want to deal with dates rn so lets just grab the first two?
    
    // i have to MAKE two new projects, named Today and This Week, and then add tasks
    // into them
    // (i'm sure this could/should be condensed but i don't want to bother until dates)
    const todayProject = new Project("Today");
    todayProject.addTask(testTask);
    timeProjects.push(todayProject);

    const weekProject = new Project("This Week");
    weekProject.addTask(testTask);
    weekProject.addTask(testTask2);
    timeProjects.push(weekProject);
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
-date system
    -and generating today/this week by date
-ability to delete tasks and projects from UI
-ability to mark tasks as complete
    -(possibly a 'completed' tab where those finished tasks go, and can be un-completed)
-(and mark subtasks as complete)

-change cursor on clickable things
-and alt text to images
    -possibly make add buttons float seperately at bottom of screen

*/