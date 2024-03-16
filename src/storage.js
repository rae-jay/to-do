import { taskToObj, objToTask, projToObj } from "./master";


export function testRun(){
    localStorage.setItem("testItem","abcde");
    console.log(localStorage.getItem("testItem"));

    let test = "";
    if(!localStorage.getItem("nope")){
        test = "something";
    }
    console.log(test);

}

export function firstSetup(){
    if(canStorage){

// temporary and for bug hunting
        // localStorage.clear();

        // i MAY want to set up a thing where i don't have to grab/reset these directly
        // every time and instead maybe have a tag list like this for tasks/projects
        // but keep the tasks/projects themselves loose, and found by ID...
        // if(!localStorage.getItem("projects")){
        //     localStorage.setItem("projects", {});
        // }
        // if(!localStorage.getItem("tasks")){
        //     localStorage.setItem("tasks", {});
        // }

        let first = false;

        if(!localStorage.getItem("projectTags")){
            localStorage.setItem("projectTags", JSON.stringify([]));
            first = true;
        }
        if(!localStorage.getItem("taskTags")){
            localStorage.setItem("taskTags", JSON.stringify([]));
            first = true;
        }

        return first;
    }
    // i kinda actually want this true not false
    // so that way if storage can't be accessed, 'general' project is still generated...
    return true;
}




export function storeSomething(thing, type){
    if(canStorage){
        // this is a Hot Mess but i'd really just like it to work so

        // console.log("storage 1");
        // convert the Thing() to a simplified object
        let converted;
        type == "proj" ? converted = projToObj(thing) 
                    : converted = taskToObj(thing);
        // converted = JSON.stringify(converted);
        // console.log(converted);

        // console.log("storage 2");
        // store that object's tag in the localStorage tag[]
        let tagArrayName;
        type == "proj" ? tagArrayName = "projectTags" : tagArrayName = "taskTags";

        const tagArray = JSON.parse(localStorage.getItem(tagArrayName));
        tagArray.push(converted.uniqueTag);
        localStorage.setItem(tagArrayName, JSON.stringify(tagArray));

        // console.log("storage 3");
        // add that simplified object to localStorage
        localStorage.setItem(converted.uniqueTag, JSON.stringify(converted));
        
        // console.log("storage 4");
    }
    
}

export function removeSomething(thing, type){
    if(canStorage){
        let tagArrayName;
        type == "proj" ? tagArrayName = "projectTags" : tagArrayName = "taskTags";
    
        const tagArray = JSON.parse(localStorage.getItem(tagArrayName));
        
        const pos = tagArray.indexOf(thing.uniqueTag);
        if(pos >= 0){
            tagArray.splice(pos, 1);
            localStorage.setItem(tagArrayName, JSON.stringify(tagArray));
        }
        else{
            console.log("something wrong in removeSomething");
        }
    
        localStorage.removeItem(thing.uniqueTag);
    }
    
}



export function fetchTasks(){
    const taskArray = JSON.parse(localStorage.getItem("taskTags"));
    const resultArray = [];

    taskArray.forEach( (taskTag) => {
        resultArray.push(JSON.parse(localStorage.getItem(taskTag)));
    })

    return resultArray;
}

export function fetchProjects(){
    const projArray = JSON.parse(localStorage.getItem("projectTags"));
    const resultArray = [];

    projArray.forEach( (projTag) => {
        resultArray.push(JSON.parse(localStorage.getItem(projTag)));
    })

    return resultArray;
}


export function changeSomething(thing, type){
    let converted;
    type == "proj" ? converted = projToObj(thing) 
                : converted = taskToObj(thing);


    localStorage.setItem(thing.uniqueTag, JSON.stringify(converted));

    console.log(JSON.stringify(converted));
}



const canStorage = checkStorage();






/* so...
    i don't know how i want to store tasks/projects?
    mostly coming down to an issue right now where they don't have any like, unique
    identifiers

    so if you're trying to remove a task from localstorage, how would you know which task
    to remove, when you could have like, two of the same name, or w/e'

    i DO probably want to put them in a larger 'project/task' object, so that they're not just
    jumbled all together

    the alternative is just like. name them 'projxyz' and 'taskxyz' and identify them
    that way


    (honestly, feels like unique identifiers as a hidden tag that just DOESNT apply to
    display could A: fix my project/index hack when translating inputs to a project
    in form processing
    and B: maybe give me two uses for like. the whole 'translate inputs into objects
    to pass into constructors to make objects' sort of system, because this also
    requires them as plain objects that are then handed to the constructor)
*/









// copying/stealing this from mozilla 'using web storage api' docs
function storageAvailable(type) {
    let storage;
    try {
      storage = window[type];
      const x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        // everything except Firefox
        (e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === "QuotaExceededError" ||
          // Firefox
          e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
      );
    }
  }

  function checkStorage(){
    if (storageAvailable("localStorage")) {
        return true;
    } else {
        return false;
    }
  }
