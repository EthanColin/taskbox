import "../src/index.css";
import { initialize, mswDecorator } from "msw-storybook-addon"; // registers msw addon

// initialize MSW
initialize();

// provide MSW addon decorator globally
export const decorators = [mswDecorator];

export const parameters = {
	actions: { argTypesRegex: "^on[A-Z].*" },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
};
