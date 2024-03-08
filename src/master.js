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
let testTask = new Task("Do something", "date", "Temp", 2, "these are details", ["Sub 1", "Sub 2"]);
let testTask2 = new Task("bDo something", "date", "Temp", 1, "these are details");
let testTask3 = new Task("cDo something", "date", "Temp", 2, "these are details");
// testTask.testDisplay();

// console.log(testTask);
// console.log(testTask.priority);
// testProject.addTask(testTask);

testProject.addTask(testTask);
testProject.addTask(testTask2);
testProject.addTask(testTask3);

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



// rn task() is title, desc, prior, cat, subtasks, no date
export function processTaskForm(values){
    console.log("this worked")

    const subtasks = [];
    if(values.length > 5){
        for(let i = 5; i < values.length; i++){
            if(values[i][1] != ""){
                subtasks.push(values[i][1]);
            }
        }
    }

    /* 
    honestly this is the part where i consider
    tasks are always going to be made this way, UNLESS they are being fetched from storage

    there's gotta be a way to interface the two together that DOESNT require me typing in
    values[x][1] every single gd time

    reorder the constructor to match
    loop through and take the second value, put that in an [], then ...spread
    */



    const testTaskGen = new Task(values[0][1], values[4][1], values[3][1], values[2][1], subtasks);
    console.log(testTaskGen);
    /*
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




    */
}


/*
-date system
    -and generating today/this week by date
-ability to input/delete tasks and projects from UI
    -making things go to 'general' when not defined as in a project
-ability to mark tasks as complete
    -(possibly a 'completed' tab where those finished tasks go, and can be un-completed)
-(and mark subtasks as complete)
-priority colors
-change cursor on clickable things
-and alt text to images
    -possibly make add buttons float seperately at bottom of screen
*/