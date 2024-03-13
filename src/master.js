console.log("working test");

import { Task } from "./task";
import { Project } from "./project";
import { generateStartup } from "./interface";


// i was keeping these, like. 'contained'. and it's ruining my life, so.
export const projects = [];
export const timeProjects = [];




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

const compareDates = [
    new Date(todayDate.getFullYear(),todayDate.getMonth(),todayDate.getDate()+1),
    new Date(todayDate.getFullYear(),todayDate.getMonth(),todayDate.getDate()+7),
];
compareDates.forEach( (date) => { date.setHours(0,0,0,0)});


createTimeProjects();


// testGen();
generateStartup(todayDate, projects, timeProjects);



function createTimeProjects(){

    timeProjects.push(new Project("Today"));
    timeProjects.push(new Project("This Week"));

    

    projects.forEach( (proj) => {
        proj.tasks.forEach (  (task) => {
            addToTimeProjects(task);
        })
    })
}


function addToTimeProjects(task){
    const dateResults = task.compareDates(compareDates);

    // console.log("task: " + task.title)
    // console.log(dateResults);
    for(let i = 0; i < timeProjects.length; i++){
        if(dateResults[i] == true){
            timeProjects[i].addTask(task);
        }
    }
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

    const newTask = new Task(...extractValues);

    addToTimeProjects(newTask);


    // these feels cheap but on making a new task, i want to jump to that task's project
    // so we're just gonna huck that back to interface > generateTaskForm() where it makes
    // the submit button
    return extractValues[2];

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


export function finishTask(task){
    timeProjects.forEach( (proj) =>{
        proj.removeTask(task);
    })

    task.category.removeTask(task);

    // maybe add this task to a hidden 'completed' project
        // except that adds a whole bunch of complications like 'having to re-check time
        // projects' and 'making a whole new button-click script'
        // and then thinking 'well no just fold it into the old button-click script'
        // which would mean rewriting the whole button. click. script.
}

/*
    so subtasks need some way to have their switch flicked ON generation

    and what i WAS going to do, is right before the task is finished/deleted, grab all
    its subtask switches, and just hand those through at the end of [date.entries()]
    in 'processForm'

    BUT. i have NO IDEA HOW TO HANDLE keeping that lined up if you, say, DELETED a task,
    therefore not maintaining the same order
    
    so, i think, maybe just check titles. go in order, if title lines up, check it off.
    has the potential to break if multiple share a name, for one.
    AND, what if you EDIT THE NAME?
    so that's wrong on two fronts.

    which makes me think... we need something lined up WITH the subtask grid itself
*/


/*    
-editing SUBTASKS
    (i think i'm fairly close on that BUT i'm not sure how i want to pass 'is the subtask
    finished' through my form system)

-ability to save/load data
    -(possibly a 'completed' tab where those finished tasks go, and can be un-completed)
        (this is made more complicated by the fact that right now i'm setting it up so when
        you edit a task, it 'finishes' the old version and makes a new one, so that it's
        properly sorted into time/project order with its new values. there would have to
        be a way to handle REAL finishing vs REMOVAL-finishing)
    -what do we do if a task SHOULDNT have a due date (or should that be possible)
-the form not looking like shit

-and alt text to images

-sometimes i'm still getting a time bug (like rn it's 10:18pm and if i make a task for
3/11/2024, which it IS NOW, it gets set as a 3/10 task)
-date funk is also very demonstratable when editing a task, they always regress back

*/