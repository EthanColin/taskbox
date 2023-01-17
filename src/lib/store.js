/**  Redux store that responds to actions that change the task's state
 * A real app would be complex and separated into different files
 * Simple redux store/action/reducer implementation
 */
import {
	configureStore,
	createSlice,
	createAsyncThunk, // connect to a remote API and handle the various states for the applcation
} from "@reduxjs/toolkit";

const TaskBoxData = {
	tasks: [],
	status: "idle",
	error: null,
};

/**
 * Creates an asyncThunk to fetch tasks from a remote endpoint
 */
export const fetchTasks = createAsyncThunk("todos/fetchTodos", async () => {
	const response = await fetch(
		"https://jsonplaceholder.typicode.com/todos?userId=1"
	);
	const data = await response.json();
	const result = data.map(task => ({
		id: `${task.id}`,
		title: task.title,
		state: task.completed ? "TASK_ARCHIVED" : "TASK_INBOX",
	}));

	return result;
});

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
	// extending reducer for async function
	extraReducers(builder) {
		// add case to handle a single exact action type
		builder
			.addCase(fetchTasks.pending, state => {
				state.status = "loading";
				state.error = null;
				state.tasks = [];
			})
			.addCase(fetchTasks.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.error = null;
				console.log(action);
				state.tasks = action.payload;
			})
			.addCase(fetchTasks.rejected, state => {
				state.status = "failed";
				state.error = "Something went wrong";
				state.tasks = [];
			});
	},
});

// actions contained in the slice are exported for usage in our components
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
