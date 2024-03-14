import { taskToObj, objToTask } from "./master";


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

        if(!localStorage.getItem("projects")){
            localStorage.setItem("projects", {});
        }
        if(!localStorage.getItem("tasks")){
            localStorage.setItem("tasks", {});
        }
    }
}


export function storeTask(task){
    if(canStorage){
        // localStorage.setItem("tasktest2", JSON.stringify({ title : "something" }));
        // console.log(localStorage.getItem("tasktest2"));

        const taskClass = taskToObj(task);
        console.log(taskClass);
        localStorage.setItem("tasktest", JSON.stringify(taskClass));
        console.log(localStorage.getItem("tasktest"));
    }
}

export function removeTask(task){
    if(canStorage){


    }
}


export function storeProj(proj){
    if(canStorage){


    }
}

export function removeProj(proj){
    if(canStorage){


    }
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
