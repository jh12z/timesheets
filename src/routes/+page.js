import { redirect } from "@sveltejs/kit";

export function load() {
	const today = new Date();
	const year = today.getFullYear()
	const month = String(today.getMonth() + 1).padStart(2, "0");
	const url = `/view/${year}/${month}`;
	redirect(307, url);
}
