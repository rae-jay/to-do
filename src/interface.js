import { processTaskForm } from './master';
import './style.css';

export function testGen(){

    let testOb = document.createElement("div");
    document.body.appendChild(testOb);
}


// this is just set to display current date
const dateNowDisplay = document.getElementById("dateNow");

// where projectGroup lists are generated into
// (the time sensitive ones and then created lists)
// (okay to fit buttons in i had to divide sidebar more so now its also projectList)
const sidebar = document.querySelector(".projectList");

const addTaskButton = document.getElementById("addTaskButton");
const addProjectButton = document.getElementById("addProjectButton");

// so i was generating these here. BUT, i think these are pretty stationary categories
// and it'll make it easier to add new projects to just HAVE a 'main' tagged group, so
const projectsTime = createDocElement("div", "projectGroup", "", sidebar);
const projectsMain = createDocElement("div", "projectGroup", "", sidebar);

// this is where project title/task objects are displayed once a project is selected
const mainContent = document.querySelector(".mainContent");



export function generateStartup(mainProjects, timeProjects){
    dateNowDisplay.textContent = "it's a day";

    // generateSidebar();


    // create heading, and then create project links (time-generated projects)
    createDocElement("h2", "", "Upcoming", projectsTime);
    for(let i = 0; i < timeProjects.length; i++) {
        generateProjectLink(timeProjects[i], projectsTime, [0,i] );
    }

    // create heading, and then create project links (created projects)
    createDocElement("h2", "", "Projects", projectsMain);
    for(let i = 0; i < mainProjects.length; i++) {
        generateProjectLink(mainProjects[i], projectsMain, [1,i]);
    }    


    // generateMainContent();
    generateForm();
}



function generateSidebar(){
    createDocElement("h2", "", "Upcoming", projectsTime);

    createDocElement("div", "", "Today", projectsTime);
    createDocElement("div", "", "This Week", projectsTime);


    createDocElement("h2", "", "Projects", projectsMain);

    generateProjectLink("General");
    generateProjectLink("Personal");
}

// eventually these would have to actually be tied to a project and DO things, but
function generateProjectLink(project, parent){
    // createDocElement("div", "", title, projectsMain);
    const newLink = createDocElement("div", "", project.title, parent);
    newLink.addEventListener("click", () => {
        clearMainContent();

        generateMainContent(project);
    })
}




function generateMainContent(project){
    // console.log(project);

    createDocElement("h1", "", project.title, mainContent);

    project.tasks.forEach( (task) =>{
        generateTaskObject(task);
    })
}

function generateTaskObject(task){
    const newTask = createDocElement("div", "taskObject", "", mainContent);

    const taskMain = createDocElement("div", "taskMain", "", newTask);
    createDocElement("img", "", "../src/graphics/checkbox-blank-circle-outline.svg", taskMain);
    createDocElement("div", "taskTitle", task.title, taskMain);
    createDocElement("div", "", "date", taskMain);

    const taskExtra = createDocElement("div", "taskExtra", "", newTask);
    createDocElement("div", "", task.description, taskExtra);

    task.subTasks.forEach( (task) =>{
        generateSubtask(task, taskExtra);
    })
}

function generateSubtask(task, parent){
    const newTask = createDocElement("div", "subTask", "", parent);
    let checkImg;
    if(task.complete == false){ checkImg = "../src/graphics/checkbox-blank-outline.svg" }
    else { checkImg = "../src/graphics/checkbox-outline.svg"}
    createDocElement("img", "", checkImg, newTask);
    createDocElement("div", "", task.title, newTask);
}


function clearMainContent(){
    while(mainContent.children.length > 0){
        mainContent.removeChild(mainContent.lastChild);
    }
}



function createDocElement(eType, eClass, eContent, eParent){
    const newEl = document.createElement(eType);
    if(eClass) { newEl.className = eClass };
    if(eParent) { eParent.appendChild(newEl) };

    if(eContent) { 
        if(eType == "img"){
            newEl.src = eContent;
        }
        else{
            newEl.textContent = eContent 
        }
    };
    return newEl;
}

function createDocInput(type, id, name, required, parent){
    const newEl = document.createElement("input");
    newEl.type = type;
    newEl.id = id;
    newEl.name = name;
    newEl.required = required;
    parent.appendChild(newEl);
    return newEl;
}

// options should be an array of arrays, ex: [ ["DisplayText", value], ["DT", val], etc ]
function createSelectInput(id, name, parent, options ){
    const newEl = document.createElement("select");
    newEl.id = id;
    newEl.name = name;
    parent.appendChild(newEl);

    options.forEach( (option) => {
        const newOpt = document.createElement("option");
        newOpt.textContent = option[0];
        newOpt.value = option[1];
        newEl.appendChild(newOpt);
    })
}

function createTextAreaInput(id, name, placeholder, cols, rows, parent){
    const newEl = createDocElement("textarea");
    newEl.id = id;
    newEl.name = name;
    newEl.placeholder = placeholder;
    newEl.cols = cols;
    newEl.rows = rows;
    parent.appendChild(newEl);
}


/* okay so subtasks.
i feel like you should be able to remove one, after making it? if you don't want it?
    (if you retroactively make one blank that's fine but should be caught on submit)
which means the buttons should actually be nested, with a delete button made at the same
time, which sit next to each other

*/



function generateForm(){
    const newForm = createDocElement("form", "", "", mainContent);
    newForm.action = "javascript:;";
    newForm.method = "post";
    // newForm.onSubmit = processTaskForm;
    // console.log(newForm.onSubmit);
    newForm.addEventListener("submit", (event)=> {
        const data = new FormData(event.target);
        processTaskForm([...data.entries()]);
    })

    createDocInput("text", "taskTitle", "title", true, newForm);
    createDocInput("date", "taskDate", "date", true, newForm);

    createSelectInput("taskCategory", "category", newForm, [
        ["Example Projecttttttt", "x"],
        ["Example Project", "y"],
    ])
    createSelectInput("taskPriority", "priority", newForm, [
        ["Low", 0],
        ["Medium", 1],
        ["High", 2],
    ])

    createTextAreaInput("taskDesc", "desc", "Description...", 30, 4, newForm);


    // im now messing with dark magics i do not fully comprehend
    // (aka closures i think)
    // basically, subTask inputs id/name are named subX, X being count
    // BUT it can't take that count from formSubtasks, because that can become shorter
    // if one is removed. so i need an overall count somewhere (or a more complex workaround)
    let totalSubtaskCount = 0;

    // (this used to exist on the outside but i think it's fine here?
    // and this way maybe i don't have to worry as hard about reseting it later...
    // i think this makes it more, like. tied to THIS instance of the form?)
    const formSubtasks = [];


    const newSubBtn = createDocElement("button", "", "+", newForm);
    newSubBtn.type = "button";

    newSubBtn.addEventListener("click", () => {
        // this is just to de-clutter/shorten
        let length = formSubtasks.length;
        // this is to stop generating a new task if the last one is still blank
        if(length == 0 || 
          (length > 0 && formSubtasks[length-1].value != "")){
            // the visual container
            const subParent = createDocElement("div", "formSubTask", "", newForm);
            // the text input
            const newSubtask = createDocInput("text", "sub"+totalSubtaskCount, "sub"+totalSubtaskCount, false, subParent)
            formSubtasks.push(newSubtask);
            // the delete button
            const delButton = createDocElement("button", "", "-", subParent);
            delButton.type = "button";
            delButton.addEventListener("click", () => {
                formSubtasks.splice( formSubtasks.indexOf(newSubtask), 1 );
                newForm.removeChild(subParent);
                console.log(formSubtasks);
            })

            totalSubtaskCount += 1;
          }
    })




    const subBtn = createDocElement("button", "", "sub", newForm);
    subBtn.type = "submit";
}

{/*<!-- title, description, priority, category, subTasks, dueDate -->
    <!-- action="javascript:;" method="post" onsubmit="submitForm()" -->
    <!-- label: for=(input id), input= (?required) type id name -->
    <form action="">
        <!-- PROBABLY generating this from the JS because of the projects/subtasks? -->
            <!-- <label for="taskTitle"></label> -->
        <input required type="text" id="taskTitle" name="title">

        <!-- <label for="taskDate"></label> -->
        <input required type="date" id="taskDate" name="date">

        <!-- category needs to pick FROM a specific pool of projects -->
            <!-- <label for="taskCategory"></label> -->
        <select id="taskCategory" name="category">
            <option value="x">Example Projecttttttttt</option>
            <option value="y">Example Project</option>
        </select>

        <!-- priority should have a default, but what format?? -->
            <!-- <label for="taskPriority"></label> -->
        <select id="taskPriority" name="priority">
            <option value="0">Low</option>
            <option value="1">Medium</option>
            <option value="2">High</option>
        </select>

            <!-- <label for="taskDesc"></label> -->
        <textarea id="taskDesc" name="desc" cols="30" rows="4">

        </textarea>


        

        <!-- subtasks is gonna be a PAIN because it needs to like.
        you can put in one. but then if you do, new input for another one
        up to like, a cap, maybe -->
            <!-- <label for="taskSubtask0"></label> -->
        <input type="" id="taskSub0" name="sub0">

        <button type="submit">sub</button>
    </form>
*/}



{/* <div class="content">
        <header>
            <div class="branding"><img src="../src/graphics/land-plots.svg" width="10" height="auto" alt="logo">
                Taskadoo</div>
            <div dateNow>the date maybe?</div>
        </header>
        
        <div class="sidebar">
            <div class="projectGroup">
                <h2>Upcoming</h2>
                <div>Today</div>
                <div>This Week</div>
            </div>
            <div class="projectGroup">
                <h2>Projects</h2>
                <div>General</div>
                <div>Personal</div>
            </div>
</div> */}
{/*
        <div class="mainContent">
            <h1>Personal</h1>
            <div class="taskObject">
                <div class="taskMain">
                    <img src="../src/graphics/checkbox-blank-circle-outline.svg" width="10" height="auto" alt="">
                    <div class="taskTitle" >Do Something</div>
                    <div>Mon, 7/4/2057</div>
                </div>
                <div class="taskExtra">
                    <div>Description text, elaborating on the thing to do, which can be sort of long. Some sort of maxiumum character limit, though.</div>
                    <div class="subTask">
                        <img src="../src/graphics/checkbox-blank-outline.svg" width="10" height="auto" alt="">
                        <div>Subtask name</div>
                    </div>
                    <div class="subTask">
                        <img src="../src/graphics/checkbox-blank-outline.svg" width="10" height="auto" alt="">
                        <div>Subtask name</div>
                    </div>
                    <div class="subTask">
                        <img src="../src/graphics/checkbox-blank-outline.svg" width="10" height="auto" alt="">
                        <div>Subtask name</div>
                    </div>
                </div>
            </div>

            <div class="taskObject">
                <div class="taskMain">
                    <img src="../src/graphics/checkbox-blank-circle-outline.svg" width="10" height="auto" alt="">
                    <div class="taskTitle" >Do Something</div>
                    <div>Mon, 7/4/2057</div>
                </div>
                <div class="taskExtra">
                    <div>Description text, elaborating on the thing to do, which can be sort of long. Some sort of maxiumum character limit, though.</div>
                    <div class="subTask">
                        <img src="../src/graphics/checkbox-blank-outline.svg" width="10" height="auto" alt="">
                        <div>Subtask name</div>
                    </div>
                </div>
            </div>
        </div>
    </div> */}