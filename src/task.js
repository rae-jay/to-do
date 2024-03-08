

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
    constructor(title, dueDate, category, priority, description, subTasks){
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.category = category;

        
        this.subTasks = [];
        if(subTasks){
            subTasks.forEach( (task) =>{
                this.subTasks.push(new SubTask(task));
            })
        }
        
        
        // this.subTasks = subTasks;

        // i don't know how we'll store dueDate in the event that there isn't one
        //so leaving blank
    }



    testDisplay(){
        console.log(this.title);
        console.log(this.description);
        console.log("Priority: " + this.priority);
        console.log("#" + this.category);
        // subtasks/dueDate
    }
}

class SubTask{
    constructor(title){
        this.title = title;
        this.complete = false;
    }
}