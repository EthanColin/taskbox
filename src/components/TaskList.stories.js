import React from "react";
import TaskList from "./TaskList";
import * as TaskStories from "./Task.stories";

import { Provider } from "react-redux";

import { configureStore, createSlice } from "@reduxjs/toolkit";

// simple mock of the state of the store
export const MockedState = {
	tasks: [
		{ ...TaskStories.Default.args.task, id: "1", title: "Task 1" },
		{ ...TaskStories.Default.args.task, id: "2", title: "Task 2" },
		{ ...TaskStories.Default.args.task, id: "3", title: "Task 3" },
		{ ...TaskStories.Default.args.task, id: "4", title: "Task 4" },
		{ ...TaskStories.Default.args.task, id: "5", title: "Task 5" },
		{ ...TaskStories.Default.args.task, id: "6", title: "Task 6" },
	],
	status: "idle",
	error: null,
};

// simple mock of a redux store
const MockedStore = ({ taskboxState, children }) => (
	<Provider
		store={configureStore({
			reducer: {
				taskbox: createSlice({
					name: "taskbox",
					initialState: taskboxState,
					reducers: {
						updateTaskState: (state, action) => {
							const { id, newTaskState } = action.payload;
							const task = state.tasks.findIndex(
								task => task.id === id
							);
							if (task >= 0) {
								state.tasks[task].state = newTaskState;
							}
						},
					},
				}).reducer,
			},
		})}
	>
		{children}
	</Provider>
);

export default {
	component: TaskList,
	title: "TaskList",
	decorators: [story => <div style={{ padding: "3em" }}>{story()}</div>],
	excludeStories: /.*MockedState$/,
	/**
	 *  excludeStories is a storybook configuration field that prevents
	 * our mocked state
	 */
};

const Template = () => <TaskList />;

export const Default = Template.bind({});
Default.decorators = [
	story => <MockedStore taskboxState={MockedState}>{story()}</MockedStore>,
];

export const WithPinnedTasks = Template.bind({});
WithPinnedTasks.decorators = [
	story => {
		const pinnedTasks = [
			...MockedState.tasks.slice(0, 5),
			{ id: 6, title: "Task 6 (pinned)", state: "TASK_PINNED" },
		];

		return (
			<MockedStore taskboxState={{ ...MockedState, tasks: pinnedTasks }}>
				{story()}
			</MockedStore>
		);
	},
];

export const Loading = Template.bind({});
Loading.decorators = [
	story => (
		<MockedStore taskboxState={{ ...MockedState, status: "loading" }}>
			{story()}
		</MockedStore>
	),
];

export const Empty = Template.bind({});
Empty.decorators = [
	story => (
		<MockedStore taskboxState={{ ...MockedState, tasks: [] }}>
			{story()}
		</MockedStore>
	),
];
