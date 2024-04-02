
class ToDoList {

    constructor(appElement) {
        this.app =  appElement;
        this.taskList = [];
    }

    startOperation() {

        this.addTask();
        this.deleteTask();
        // setInterval(this.addTask(), 1000);
        
        
    }


    deleteTaskFromOnProgress() {

        const deleteButtons = this.app.querySelectorAll(".on-progress .delete-button");

        deleteButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const taskItem = button.closest(".task-item");
                const taskName = taskItem.querySelector(".task-name").textContent;
                const index =  this.taskList.findIndex(obj => obj["taskName"] === taskName);
            
                this.taskList.splice(index, 1);

                this.showOnProgressList();

            })
        })

    }

    deleteTaskFromPending() {

        const deleteButtons = this.app.querySelectorAll(".pending .delete-button");

        deleteButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const taskItem = button.closest(".task-item");
                const taskName = taskItem.querySelector(".task-name").textContent;
                const index =  this.taskList.findIndex(obj => obj["taskName"] === taskName);
            
                this.taskList.splice(index, 1);

                this.showPendingList();

            })
        })

    }

    deleteTaskFromComplete() {

        const deleteButtons = this.app.querySelectorAll(".complete .delete-button");

        deleteButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const taskItem = button.closest(".task-item");
                const taskName = taskItem.querySelector(".task-name").textContent;
                const index =  this.taskList.findIndex(obj => obj["taskName"] === taskName);
            
                this.taskList.splice(index, 1);

                this.showCompleteList();
                this.showOnProgressList();

            })
        })

    }


    startTask() {
        const startButtons = this.app.querySelectorAll(".start-button");

        startButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const taskItem = button.closest(".task-item");
                const taskName = taskItem.querySelector(".task-name").textContent;
                const index = this.taskList.findIndex(obj => obj["taskName"] === taskName);

                this.taskList[index]["taskState"] = "on-progress";
                
                this.showOnProgressList();
                this.showPendingList();

            })
        })
    }

    CompleteTask() {
        const startButtons = this.app.querySelectorAll(".done-button");

        startButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const taskItem = button.closest(".task-item");
                const taskName = taskItem.querySelector(".task-name").textContent;
                const index = this.taskList.findIndex(obj => obj["taskName"] === taskName);

                this.taskList[index]["taskState"] = "complete";
                
                this.showOnProgressList();
                this.showCompleteList();

            })
        })
    }


    showCompleteList() {
        let onProgressTask = this.app.querySelector(".complete");
        onProgressTask.innerHTML = " ";
        onProgressTask.innerHTML = `<h2> Complete </h2>`


        this.taskList.forEach((task) => {
            if(task["taskState"] === "complete") {
                const taskItem = document.createElement("div");
                taskItem.classList.add("task-item");


                taskItem.innerHTML = `
                <span class="task-name">${task["taskName"]}</span>
                <span class="deadline"> ${task["deadline"]} </span> <br>
                <div class="buttons">
                    <button class="delete-button">Delete </button> 
                </div>
                `;

                onProgressTask.appendChild(taskItem);
            }
        })

        this.deleteTaskFromComplete();
    }


    showOnProgressList() {
        let onProgressTask = this.app.querySelector(".on-progress");
        onProgressTask.innerHTML = " ";
        onProgressTask.innerHTML = `<h2> On Progress </h2>`


        this.taskList.forEach((task) => {
            if(task["taskState"] === "on-progress") {
                const taskItem = document.createElement("div");
                taskItem.classList.add("task-item");


                taskItem.innerHTML = `
                <span class="task-name">${task["taskName"]}</span>
                <span class="deadline"> ${task["deadline"]} </span> <br>
                <div class="buttons">
                    <button class="delete-button">Delete </button> 
                    <button class="done-button">Done</button> 
                </div>
                `;

                onProgressTask.appendChild(taskItem);
            }
        })

        this.deleteTaskFromOnProgress();
        this.CompleteTask();
    }

    

    showPendingList() {
        let pendingTask = this.app.querySelector(".pending");
        pendingTask.innerHTML = " ";
        pendingTask.innerHTML = `<h2> Pending </h2>`



        
        this.taskList.forEach((task) => {
            if (task["taskState"] == "pending") {
                const taskItem = document.createElement("div");
                taskItem.classList.add("task-item");

                taskItem.innerHTML = `
                <span class="task-name">${task["taskName"]}</span>
                <span class="deadline"> ${task["deadline"]} </span> <br>
                <div class="buttons">
                    <button class="delete-button">Delete </button> 
                    <button class="start-button">Start</button> 
                </div>
                `;

                pendingTask.appendChild(taskItem);

            
            }

            
        })

        this.deleteTaskFromPending();
        this.startTask();
    }

    addTask() {
       
        let addButton = this.app.querySelector("#add-button");

        addButton.addEventListener("click", () => {
            let taskName = this.app.querySelector("#task-name");
            let deadline = this.app.querySelector("#deadline");
            let reminderBeforeMinutes = this.app.querySelector("#reminder-minute");

            this.taskList.push({
                taskName: taskName.value,
                deadline: deadline.value,
                reminderBeforeMinute: reminderBeforeMinutes.value,
                taskState: "pending",
            


            })

            taskName.value = "";
            deadline.value = "";
            reminderBeforeMinutes.value = "";

            this.showPendingList();
            // this.showOnProgressList();

            
        })
    }
}


const appElement = document.querySelector(".main")
const app = new ToDoList(appElement);
app.startOperation();