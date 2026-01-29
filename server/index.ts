import { serve } from "bun";
import index from "../public/index.html";
import services from "../public/services.html";
import contact from "../public/contact.html";

const server = serve({
	routes: {
		"/": index,
		"/services": services,
		"/contact": contact,
        "/sitemap.xml": () => { return new Response(Bun.file('sitemap.xml')) },
        "/robots.txt": () => { return new Response(Bun.file('robots.txt')) },
        "/llms.txt": () => { return new Response(Bun.file('llms.txt')) },
		"/submit": {
			async POST(req) {
				const formData = await req.formData();
				let message = "";

				for (const [key, value] of formData.entries()) {
					message += `${key}: ${value}\n`;
				}

				try {
					const response = await fetch("https://ntfy.mercury.rs/web-form", {
						method: "POST",
						body: message,
						headers: {
							Authorization: `Bearer ${Bun.env.NTFY_TOKEN || ""}`,
							Title: "New Enquiry",
							Tags: "loudspeaker",
						},
					});

					if (!response.ok) throw new Error(`Response status: ${response.status}`);

					// Redirect with success parameter
					return Response.redirect("/contact?success=true", 303);
				} catch (err) {
					// Redirect with error parameter
					return Response.redirect("/contact?error=true", 303);
				}
			},
		},
	},

	fetch(req) {
		return new Response("Not Found", { status: 404 });
	},
});

console.log(`Listening on ${server.url}`);
