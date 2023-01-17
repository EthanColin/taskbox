import React from "react";
import Task from "./Task";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { updateTaskState } from "../lib/store"; // connect to the Redux store and render tasks we are interested in

export default function TaskList() {
	//     {
	// 	loading,
	// 	tasks,
	// 	onPinTask,
	// 	onArchivedTask,
	// }

	// retrieving state from the store
	const tasks = useSelector(state => {
		const tasksInOrder = [
			...state.taskbox.tasks.filter(t => t.state === "TASK_PINNED"),
			...state.taskbox.tasks.filter(t => t.state !== "TASK_PINNED"),
		];

		const filteredTasks = tasksInOrder.filter(
			t => t.state === "TASK_INBOX" || "TASK_PINNED"
		);

		return filteredTasks;
	});

	const { status } = useSelector(state => state.taskbox);

	const dispatch = useDispatch();

	const pinTask = value => {
		// dispatching pinned event back to store
		dispatch(updateTaskState({ id: value, newTaskState: "TASK_PINNED" }));
	};

	const archiveTask = value => {
		// dispatching archived event back to store
		dispatch(updateTaskState({ id: value, newTaskState: "TASK_ARCHIVED" }));
	};

	const LoadingRow = (
		<div className="loading-item">
			<span className="glow-checkbox" />
			<span className="glow-text">
				<span>Loading</span> <span>cool</span> <span>state</span>
			</span>
		</div>
	);

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

	const taskInOrder = [
		...tasks.filter(t => t.state === "TASK_PINNED"),
		...tasks.filter(t => t.state !== "TASK_PINNED"),
	];

	return (
		<div className="list-items">
			{taskInOrder.map(task => (
				<Task
					key={task.id}
					task={task}
					onPinTask={task => pinTask(task)}
					onArchiveTask={archiveTask(task)}
				/>
			))}
		</div>
	);
}

TaskList.propTypes = {
	loading: PropTypes.bool,
	tasks: PropTypes.arrayOf(Task.propTypes.task).isRequired,
	onPinTask: PropTypes.func,
	onArchivedTask: PropTypes.func,
};

TaskList.defaultProps = {
	loading: false,
};
