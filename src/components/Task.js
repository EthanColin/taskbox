import React from "react";
import PropTypes from "prop-types"; // library for defining prop types

export default function Task({
	// parameters a Task object takes in
	task: { id, title, state },
	onArchiveTask, // called when a task is checked
	onPinTask, // called when a task is pinned
}) {
	return (
		<div className={`list-item ${state}`}>
			<label
				htmlFor="checked"
				aria-label={`archiveTask-${id}`}
				className="checkbox"
			>
				<input
					type="checkbox"
					disabled={true}
					value={title}
					readOnly={true}
					name="checked"
					id={`archiveTask-${id}`}
					checked={state === "TASK_ARCHIVED"}
				/>
				<span
					className="checkbox-custom"
					onClick={() => onArchiveTask(id)}
				/>
			</label>

			<label htmlFor="title" aria-label={title} className="title">
				<input
					type="text"
					value={title}
					readOnly={true}
					name="title"
					placeholder="Input title"
					style={{ background: "red" }}
				/>
			</label>

			{/* archived task does have show the pin button */}
			{state !== "TASK_ARCHIVED" && (
				<button
					className="pin-button"
					onClick={() => onPinTask(id)}
					id={`pinTask-${id}`}
					aria-label={`pinTask-${id}`}
					key={`pinTask-${id}`}
				>
					<span className={`icon-star`} />
				</button>
			)}
		</div>
	);
}

// setting data types
Task.propTypes = {
	task: PropTypes.shape({
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		state: PropTypes.string.isRequired,
	}),
	onArchiveTask: PropTypes.func,
	onPinTask: PropTypes.func,
};
