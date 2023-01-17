import React from "react";
import Task from "./Task";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { updateTaskState } from "../lib/store"; // connect to the Redux store and render tasks we are interested in

export default function TaskList() {
	// retrieving state from the store
	const tasks = useSelector(state => {
		// order the tasks prioritizing the pinned tasks
		const tasksInOrder = [
			...state.taskbox.tasks.filter(t => t.state === "TASK_PINNED"),
			...state.taskbox.tasks.filter(t => t.state !== "TASK_PINNED"),
		];

		// filtering tasks in which the state of inbox and pinned
		const filteredTasks = tasksInOrder.filter(
			t => t.state === "TASK_INBOX" || "TASK_PINNED"
		);

		return filteredTasks;
	});

	// getting the status
	const { status } = useSelector(state => state.taskbox);

	const dispatch = useDispatch();

	// dispatching pinned event back to store
	const pinTask = value => {
		dispatch(updateTaskState({ id: value, newTaskState: "TASK_PINNED" }));
	};

	// dispatching archived event back to store
	const archiveTask = value => {
		dispatch(updateTaskState({ id: value, newTaskState: "TASK_ARCHIVED" }));
	};

	// creating component for loading state
	const LoadingRow = (
		<div className="loading-item">
			<span className="glow-checkbox" />
			<span className="glow-text">
				<span>Loading</span> <span>cool</span> <span>state</span>
			</span>
		</div>
	);

	// fires when it is loading
	if (status === "loading") {
		return (
			<div className="list-items" data-testid="loading" key={"loading"}>
				{LoadingRow}
				{LoadingRow}
				{LoadingRow}
				{LoadingRow}
				{LoadingRow}
				{LoadingRow}
				{LoadingRow}
				{LoadingRow}
			</div>
		);
	}

	// fires when there are no tasks
	if (tasks.length === 0) {
		return (
			<div className="list-items" key={"empty"} data-testid="empty">
				<div className="wrapper-message">
					<span className="icon-check" />
					<p className="title-message">You have no tasks</p>
					<p className="subtitle-message">Sit back and relax</p>
				</div>
			</div>
		);
	}

	// order the tasks prioritizing task in which the state of "TASK_PINNED"
	const taskInOrder = [
		...tasks.filter(t => t.state === "TASK_PINNED"),
		...tasks.filter(t => t.state !== "TASK_PINNED"),
	];

	// fires when there are tasks in the task list
	return (
		<div className="list-items">
			{taskInOrder.map(task => (
				<Task
					key={task.id}
					task={task}
					onPinTask={task => pinTask(task)}
					onArchiveTask={task => archiveTask(task)}
				/>
			))}
		</div>
	);
}

// defining props data types
TaskList.propTypes = {
	loading: PropTypes.bool,
	tasks: PropTypes.arrayOf(Task.propTypes.task).isRequired,
	onPinTask: PropTypes.func,
	onArchivedTask: PropTypes.func,
};

// setting default props
TaskList.defaultProps = {
	loading: false,
};
