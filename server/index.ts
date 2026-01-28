import { serve } from "bun";
import index from "../public/index.html";
import services from "../public/services.html";
import contact from "../public/contact.html";

const server = serve({
	routes: {
		"/": index,
		"/services": services,
		"/contact": contact,
		"/api/contact": {
			POST: async (req) => {
				const body = await req.body?.json();

				try {
					const response = await fetch("https://ntfy.mercury.rs", {
						method: "POST",
						body,
						headers: {
							Authorization: `Bearer ${Bun.env.NTFY_TOKEN || ""}`,
							Title: "New Enquiry",
							Tags: "loudspeaker",
						},
					});

					if (!response.ok) throw new Error(`Response status: ${response.status}`);

					return Response.json({ created: true, status: 200 });
				} catch (err) {
					return Response.json({ created: false, status: 400 });
				}
			},
		},
	},
});

console.log(`Listening on ${server.url}`);
