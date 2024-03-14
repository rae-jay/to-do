console.log("working test");

import { Task } from "./task";
import { Project } from "./project";
import { generateStartup } from "./interface";
import { testRun, firstSetup } from "./storage";


// i was keeping these, like. 'contained'. and it's ruining my life, so.
export const projects = [];
export const timeProjects = [];





// to make sure ids are actually unique we need to have a record of which ones exist
// using the user-input name would require like, removing spaces and making sure characters
// are all valid and things i don't super want to do
// but using just like, increasing numbers is messy
// so i'm thinking like, tk[a-z]*4. ex: tkgbvh. for tasks, and pj[a-z]*4 for projects

// this would let us: transfer 'project' through the input/value system
// not break apparently when trying to JSON-ify my tasks bc of project
// store tasks/projects with an easy to find/delete name in localStorage

// taskTags and projectTags
const tags = {
    tk: [],
    pj: [],
}

export function createUniqueTag(type){
    let success = false;

    while(success == false){
        const newTag = type + randomLetter() + randomLetter() + randomLetter() + randomLetter();
        let match = false;

        for(let i = 0; i < tags.length; i++){
            // if we match the newly generated tag to one that already exists
            if(tags[i].indexOf(newTag) >= 0){
                match = true;
                break;
            }
        }

        if(match == false){
            success = true;
            return newTag;
        }
    }
}

function randomLetter(){
    return String.fromCharCode(Math.random() * (123 - 97) + 97);
}

// i need tags to like. behave. through the EDITING of tasks...
// im honestly approaching the 'burn it all down' stage of 'well maybe everything should
// just work totally different'
// like this is really just what tasks/projects are, - the constructors, and a few functions
// so kind of why bother converting when i could just... seperate out those functions?

// i at least maybe want to put these converters INTO task/project themselves...

// i also have major concerns about how unpacking/repacking like. what tasks are in what
// projects is gonna work...

export function taskToObj(task){
    return { 
        uniqueTag : task.uniqueTag,
        title : task.title, 
        date : task.date, 
        project : projToObj(task.project),
        priority : task.priority, 
        desc : task.description, 
        subtasks : task.subtasks 
    }
}

export function objToTask(task){
    return new Task(
        task.title, 
        task.date, 
        task.project,
        task.priority, 
        task.desc, 
        task.subtasks
        );
}

export function projToObj(project){
    return {
        uniqueTag : project.uniqueTag,
        title : project.title,
    }
}

export function objToProj(project){
    return new Project(
        project.title,
    )
}









firstSetup();


projects.push(new Project("General"));
let testProject = new Project("Proj");
projects.push(testProject);

// title date category priority description
// (dates apparently need the DAY to be one number ahead, as though 1st = 0, but...months dont)
let testTask = new Task("last week", new Date("2024-03-09"), testProject, 2, "these are details", [{title:"Sub 1",completed:false}, {title:"Sub 2",completed:false}]);
let testTask2 = new Task("today", new Date("2024-03-12"), testProject, 1, "these are details");
let testTask3 = new Task("tomorrow", new Date("2024-03-13"), testProject, 2, "these are details");
let testTask4 = new Task("this week", new Date("2024-03-16"), testProject, 2, "these are details");
let testTask5 = new Task("over a week", new Date("2024-03-22"), testProject, 2, "these are details");
let testTask6 = new Task("late month", new Date("2024-03-28"), testProject, 2, "these are details");



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



export function processTaskForm(values, editSubtasks){
    // 'values' is just a big [ [name, value], [name,value] ] 
    // editSubtasks is [ [sub0, true/false], [sub1, true/false] ]
    // corresponding to a value pair of the same name

    // it seems kind of dumb to make an object out of values to pass into a constructor
    // to make an object
    // HOWEVER it would kind of help keep the order of inputs in the form from being able
    // to break the way that those values get handed off to the constructor?
    // this middle 'object' is more of an... intermediary translator

    const processed = {};
    processed.subtasks = [];

    values.forEach( (val) => {
        if(val[0].search(/sub[0-9]+/i) >= 0){
            // if not an empty subtask
            if(val[1] != ""){

                let i = 0;
                for(i = 0; i < editSubtasks.length; i++){
                    if(editSubtasks[i][0] == val[0]){
                        break;
                    }
                }

                if(i < editSubtasks.length){
                    processed.subtasks.push({ title: val[1], completed : editSubtasks[i][1] });
                    editSubtasks.splice(i,1);
                }
            }
        }
        else{
            processed[val[0]] = val[1];
        }
    })

    processed.project = projects[processed.project];

    processed.date = new Date(processed.date);
    processed.date.setHours(0,0,0,0);
    processed.date.setDate(processed.date.getDate()+1);


    // dumb? yes. less dumb than it was two minutes ago? Also yes.
    const newTask = objToTask(processed);




    addToTimeProjects(newTask);

    // these feels cheap but on making a new task, i want to jump to that task's project
    // so we're just gonna huck that back to interface > generateTaskForm() where it makes
    // the submit button
    // return extractValues[2];
    return processed.project;

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

    task.project.removeTask(task);

    // maybe add this task to a hidden 'completed' project
        // except that adds a whole bunch of complications like 'having to re-check time
        // projects' and 'making a whole new button-click script'
        // and then thinking 'well no just fold it into the old button-click script'
        // which would mean rewriting the whole button. click. script.
}






/*    


-ability to save/load data
    -(possibly a 'completed' tab where those finished tasks go, and can be un-completed)
        (this is made more complicated by the fact that right now i'm setting it up so when
        you edit a task, it 'finishes' the old version and makes a new one, so that it's
        properly sorted into time/project order with its new values. there would have to
        be a way to handle REAL finishing vs REMOVAL-finishing)
    -what do we do if a task SHOULDNT have a due date (or should that be possible)
-the form not looking like shit

-and alt text to images

*/