console.log("working test");

import { Task } from "./task";
import { Project } from "./project";
import { generateStartup } from "./interface";
import { testRun, firstSetup, storeSomething, removeSomething,
fetchProjects, fetchTasks, changeSomething } from "./storage";


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
    const simpSubtask = [];
    task.subtasks.forEach((task) => {
        simpSubtask.push({title: task.title, complete: task.complete});
    })
    return { 
        uniqueTag : task.uniqueTag,
        title : task.title, 
        date : task.date, 
        project : projToObj(task.project),
        priority : task.priority, 
        description : task.description, 
        subtasks : simpSubtask
    }
}

export function objToTask(task){
    return new Task(
        task.uniqueTag,
        task.title, 
        new Date(task.date), 
        // task.project,
        fetchProjectByTag(task.project.uniqueTag),
        task.priority, 
        task.description, 
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
        project.uniqueTag,
        project.title,
    )
}


// honestly not sure what these are doing rn
// takes in a Task(), converts to 
function taskStorage(task){
    tags.tk.push(task.uniqueTag);
    storeSomething(taskToObj(task), "task");
}

function projectStorage(project){
    tags.pj.push(project.uniqueTag);
    storeSomething(projToObj(project), "proj");
}


function fetchProjectByTag(tag){
    let project;
    for(let i = 0; i < projects.length; i++){
        if(projects[i].uniqueTag == tag){
            project = projects[i];
            break;
        }
    }
    return project;
}



// this needs to be saved for later, because 'general' can't be made until AFTER loading
const first =  firstSetup();


// let testProject = new Project(createUniqueTag("pj"), "Proj");
// projects.push(testProject);

// title date category priority description
// (dates apparently need the DAY to be one number ahead, as though 1st = 0, but...months dont)
// let testTask = new Task(createUniqueTag("tk"), "last week", new Date("2024-03-09"), testProject, 2, "these are details", [{title:"Sub 1",completed:false}, {title:"Sub 2",completed:false}]);
// let testTask2 = new Task(createUniqueTag("tk"), "today", new Date("2024-03-12"), testProject, 1, "these are details");
// let testTask3 = new Task(createUniqueTag("tk"), "tomorrow", new Date("2024-03-13"), testProject, 2, "these are details");
// let testTask4 = new Task(createUniqueTag("tk"), "this week", new Date("2024-03-16"), testProject, 2, "these are details");
// let testTask5 = new Task(createUniqueTag("tk"), "over a week", new Date("2024-03-22"), testProject, 2, "these are details");
// let testTask6 = new Task(createUniqueTag("tk"), "late month", new Date("2024-03-28"), testProject, 2, "these are details");




// projects.forEach((proj) => {
//     storeProj(projToObj(proj));
// })

// removeProj(testProject);

// storeTask(testTask);
// storeTask(testTask2);

// // removeTask(testTask2);

// console.log(fetchProjects());
// console.log(fetchTasks());


function loadStorage(){
    const loadProjects = fetchProjects();

    // put tags in the 'tag' box, create objects

    // console.log("load START");
    loadProjects.forEach( (proj) => {
        tags.pj.push(proj.uniqueTag);

        let testing = objToProj(proj);
        // console.log(testing);
        // console.log("proj: ");
        // testing.testDisplay();

        projects.push(testing);
    })

    // console.log("load 1");
    const loadTasks = fetchTasks();

    // console.log("load 2");
    loadTasks.forEach( (task) => {
        tags.tk.push(task.uniqueTag);

        let testing = objToTask(task);
        // console.log(testing);
        // console.log("task: ");
        // testing.testDisplay();
    })

    // console.log("load 3");

    if(first == true){
        const gen = new Project(createUniqueTag("pj"), "General");
        projects.push(gen);
        projectStorage(gen);
    }
}

loadStorage();








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

    // these don't really need a tag but uh
    timeProjects.push(new Project(createUniqueTag("pj"), "Today"));
    timeProjects.push(new Project(createUniqueTag("pj"), "This Week"));

    

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
                    processed.subtasks.push({ title: val[1], complete : editSubtasks[i][1] });
                    editSubtasks.splice(i,1);
                }
            }
        }
        else{
            processed[val[0]] = val[1];
        }
    })

    processed.project = fetchProjectByTag(processed.project);

    processed.date = new Date(processed.date);
    processed.date.setHours(0,0,0,0);
    processed.date.setDate(processed.date.getDate()+1);


    processed.uniqueTag = createUniqueTag("tk");

    // dumb? yes. less dumb than it was two minutes ago? Also yes.
    const newTask = objToTask(processed);


    taskStorage(newTask);


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
    const newProj = new Project(createUniqueTag("pj"), values[1]);
    projects.push(newProj);

    projectStorage(newProj);

    return newProj;
}


export function finishTask(task){
    timeProjects.forEach( (proj) =>{
        proj.removeTask(task);
    })

    task.project.removeTask(task);

    removeSomething(task, "task"); 

    // maybe add this task to a hidden 'completed' project
        // except that adds a whole bunch of complications like 'having to re-check time
        // projects' and 'making a whole new button-click script'
        // and then thinking 'well no just fold it into the old button-click script'
        // which would mean rewriting the whole button. click. script.
}

// editing seems VERY CLOSE to working, i really just need subtasks to keep completion...




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