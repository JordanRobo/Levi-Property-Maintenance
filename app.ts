import { serve } from "bun";
import homepage from "./src/index.html";
import services from "./src/services.html";
import contact from "./src/contact.html";

const server = serve({
	routes: {
		"/": homepage,
		"/services": services,
		"/contact": contact,
	},
	development: true,
});

console.log(`Listening on ${server.url}`);
