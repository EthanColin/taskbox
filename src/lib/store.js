/**  Redux store that responds to actions that change the task's state
 * A real app would be complex and separated into different files
 * Simple redux store/action/reducer implementation
 */
import { configureStore, createSlice } from "@reduxjs/toolkit";

const defaultTasks = [
	{ id: "1", title: "Something", state: "TASK_INBOX" },
	{ id: "2", title: "Something more", state: "TASK_INBOX" },
	{ id: "3", title: "Something else", state: "TASK_INBOX" },
	{ id: "4", title: "Something again", state: "TASK_INBOX" },
];

const TaskBoxData = {
	tasks: defaultTasks,
	status: "idle",
	error: null,
};

/**
 * Creating the store
 */
const TasksSlice = createSlice({
	name: "taskbox",
	initialState: TaskBoxData,
	reducers: {
		updateTaskState: (state, action) => {
			const { id, newTaskState } = action.payload;
			const task = state.tasks.findIndex(task => task.id === id);
			if (task >= 0) {
				state.tasks[task].state = newTaskState;
			}
		},
	},
});

// action contained in the slice are exported for usage in our components
export const { updateTaskState } = TasksSlice.actions;

/**
 * App's store configuration goes here
 */

const store = configureStore({
	reducer: {
		taskbox: TasksSlice.reducer,
	},
});

export default store;
