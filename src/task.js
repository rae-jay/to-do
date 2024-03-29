import { Project } from "./project";
import { createUniqueTag, storeTask } from "./master";
import { changeSomething } from "./storage";

export class Task{
    /*
    title is a string with a character cap
    description is a string with a larger character cap
    priority is a number 0-2 (low medium high)
    category is some means of storing a group, that it will be sorted into
    dueDate is optional, and probably a Date, unfortunately

    the checks for length and such probably happen in whatever takes data from the page
    and hands it off to here, so by here it should be clean
    */
    // 'subtasks' input should be an array of string names
    constructor(uniqueTag, title, dueDate, project, priority, description, subtasks){
        this.title = title;
        this.date = dueDate;
        this.description = description;
        this.priority = priority;
        this.project = project;
        
        project.addTask(this);
        // console.log("Task constructor: ");
        // console.log(category);

        // const testDate = new Date(dueDate);
        // console.log("date testing: ");
        // console.log(testDate);
        
        this.subtasks = [];
        if(subtasks){
            subtasks.forEach( (task) =>{
                this.subtasks.push(new SubTask(task.title, task.complete, this));
            })
        }

        this.uniqueTag = uniqueTag;
    }

    // otherDate is generally just 'today', i just wanted to handle that in master.js
    // and compareAgainst should be [] of other dates
    compareDates(compareAgainst){
        // same day / same week
        const results = [];

        // console.log("task date: ");
        // console.log(this.date);

        compareAgainst.forEach( (cDate) => {
            // console.log("against: ");
            // console.log(cDate);
            if(this.date < cDate){
                results.push(true);
            }
            else{
                results.push(false);
            }
        })

        

        return results;

        // returns 'same day yes/no', 'same week yes/no'
    }



    


    testDisplay(){
        console.log("s~~~~~~~");
        console.log(this.title);
        console.log(this.date);
        console.log(this.description);
        console.log("Priority: " + this.priority);
        console.log(this.project);
        console.log("e~~~~~~~");
        // subtasks/dueDate
    }
}

class SubTask{
    constructor(title, complete, parentTask){
        this.title = title;
        this.complete = complete;

        this.parentTask = parentTask;
    }

    setCompletion(){
        this.complete ? this.complete = false : this.complete = true;

        changeSomething(this.parentTask);

        return this.complete;
    }
}