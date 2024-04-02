class ToDoList {
    constructor(appElement) {
        this.app =  appElement;
        this.taskList = [];
        this.pendingList = this.app.querySelector(".pending");
    }

    startOperation() {
        this.addTask();
        this.showPendingList();
    }

    showPendingList() {
        this.pendingList.innerHTML = ""; // Clear the existing list

        this.taskList.forEach(task => {
            if (task.taskState === "pending") {
                const taskItem = document.createElement("div");
                taskItem.classList.add("task-item");
                
                taskItem.innerHTML = `
                    <span class="task-name">${task.taskName}</span>
                    <span class="deadline">${task.deadline}</span>
                    <div class="buttons">
                        <button class="delete-button">Delete</button>
                        <button class="start-button">Start</button>
                    </div>
                `;
                
                this.pendingList.appendChild(taskItem);
            }
        });
    }

    addTask() {
        const addButton = this.app.querySelector("#add-button");

        addButton.addEventListener("click", () => {
            const taskNameInput = this.app.querySelector("#task-name");
            const deadlineInput = this.app.querySelector("#deadline");
            const reminderInput = this.app.querySelector("#reminder-minute");

            this.taskList.push({
                taskName: taskNameInput.value,
                deadline: deadlineInput.value,
                reminderBeforeMinute: reminderInput.value,
                taskState: "pending"
            });

            taskNameInput.value = "";
            deadlineInput.value = "";
            reminderInput.value = "";

            this.showPendingList(); // Refresh the pending list
        });
    }
}

const appElement = document.querySelector(".main");
const app = new ToDoList(appElement);
app.startOperation();
