


export class Project{
    constructor(title){
        this.title = title;
        // this.color = color;
        
        this.tasks = [];
    }


    addTask(task){
        //i'm really going back and forth on if i want to sort EVERY TIME or just when adding
        //on one hand, dumb to sort everything every time
        //on the other, that means if something goes wrong for some reason the sort order
        //does get periodically re-examined
        //AND there's probably never going to be THAT MANY tasks to sort through


        let success = false;
        let i = 0;
        while(i < this.tasks.length && success == false){
            success = sortTasks(task, this.tasks[i]);
            if(success == false){
                i += 1;
            }
        }
        this.tasks.splice(i, 0, task);

        this.testDisplay();
    }



    // given the number position within the []
        /* (question i had related to this was that if the buttons on the task page
            store a number, then WHEN a task gets removed, if they all just move up, 
            they'll now have the wrong number
            BUT that probably means THEY shouldn't be responsible, but the thing that
            contains them should. so when the visual component is removed from the group
            at the same time that the task is, that like. works. or whatever.)
        */
    removeTask(taskPosition){
        this.tasks.splice(taskPosition, 1);

        this.testDisplay();
    }


    testDisplay(){
        console.log("-----");
        this.tasks.forEach( (taskskssk) => console.log(taskskssk.title));
        console.log("-----");
    }


    /*
    has the ability to sort tasks (first by date, then by priority, then by name, in
    that order)
    can add a new task, which triggers a re-sort, or slots it in where it fits, or
    whatever
    can remove a task

    can also fetch tasks within a certain date range (probably by feeding a date to the task
    and having the task say if it matches or not)
    */
}




function sortTasks(task1, task2){
    // task1 is always the new task being slotted in, task2 is what it is compared against
    // so i could just return 'true' if 1 comes first, 'false' if 1 needs to keep moving down


    // return "date" === "date"
    // && task1.priority > task2.priority
    // && task1.title.toLowerCase() < task2.title.toLowerCase()

    let success = false;

    if("date" > "date"){
        // console.log("compare: date sooner");
        success = true;
    }
    else if("date" === "date"){
        if(task1.priority > task2.priority){
            // console.log("compare: priority higher");
            success = true;
        }
        else if(task1.priority == task2.priority){
            if(task1.title.toLowerCase() < task2.title.toLowerCase()){
                // console.log("compare: name comes first");
                success = true;
            }
        }
    }

    return success;
}

