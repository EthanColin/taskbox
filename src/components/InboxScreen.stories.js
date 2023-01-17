import React from "react";

import InboxScreen from "./InboxScreen";
import store from "../lib/store";

// include a parameter that mocks the remote API calls
import { rest } from "msw";
import { MockedState } from "./TaskList.stories";

// adding interactions
import {
	fireEvent,
	within,
	waitFor,
	waitForElementToBeRemoved,
} from "@storybook/testing-library";

import { Provider } from "react-redux";

export default {
	component: InboxScreen,
	title: "InboxScreen",
	decorators: [story => <Provider store={store}>{story()}</Provider>],
};

const Template = () => <InboxScreen />;

export const Default = Template.bind({});
Default.parameters = {
	msw: {
		handlers: [
			rest.get(
				"https://jsonplaceholder.typicode.com/todos?userId=1",
				(req, res, ctx) => {
					return res(ctx.json(MockedState.tasks));
				}
			),
		],
	},
};

Default.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);
	// waits for component to transition from the loading state
	await waitForElementToBeRemoved(await canvas.findAllByTestId("loading"));

	// waits for component to be updated on the store
	await waitFor(async () => {
		// simulates pinning the first task
		await fireEvent.click(canvas.getByLabelText("pinTask-1"));
		// simulates pinning the third task
		await fireEvent.click(canvas.getByLabelText("pinTask-3"));
	});
};

export const Error = Template.bind({});
Error.parameters = {
	msw: {
		handlers: [
			rest.get(
				"https://jsonplaceholder.typicode.com/todos?userId=1",
				(req, res, ctx) => {
					return res(ctx.status(403));
				}
			),
		],
	},
};
