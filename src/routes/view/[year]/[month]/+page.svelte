<script>
	import {goto} from '$app/navigation';
	import {page} from '$app/stores';
	import Projects from "./Projects.svelte";
	import Timesheet from "./Timesheet.svelte";
	import Debug from "./Debug.svelte";


	let year = $derived(parseInt($page.params.year));
	let month = $derived(parseInt($page.params.month));

	let data = $state(JSON.parse(localStorage.getItem("timesheets")) ?? {"projects": [], "timesheets": {}});
	let timesheetKey = $derived(String(year).padStart(2, "0") + "-" + String(month).padStart(2, "0"));

	function navigate(delta) {
		if (delta === 0) {
			const today = new Date();
			const year = today.getFullYear()
			const month = String(today.getMonth() + 1).padStart(2, "0");
			goto(`/view/${year}/${month}`);

		} else {
			let year = parseInt($page.params.year);
			let month = parseInt($page.params.month);

			if (delta < 0) {
				month--;
				if (month < 1) {
					year--;
					month = 12;
				}
			} else if (delta > 0) {
				month++;
				if (month > 12) {
					year++;
					month = 1;
				}
			}

			goto(`/view/${year}/${String(month).padStart(2, "0")}`);
		}
	}

	function save(name = "timesheets") {
		localStorage.setItem(name, JSON.stringify(data))
	}

	function backup() {
		const today = new Date().toISOString().slice(0, 10);
		save(`timesheets_${today}`);
	}

	function copy(event) {
		event.clipboardData.setData('text/plain', JSON.stringify(data.timesheets[timesheetKey]));
		event.preventDefault();
		console.log("Copied to clipboard");
	}

	function paste(event) {
		data.timesheets[timesheetKey] = JSON.parse(event.clipboardData.getData('text/plain'));
	}
</script>

<button onclick={() => navigate(0)}>Current</button>
<button onclick={() => navigate(-1)}>Prev</button>
<button onclick={() => navigate(+1)}>Next</button>
<button onclick={() => save()}>Save</button>
<button onclick={() => backup()}>Backup</button>
Year: {year} Month: {month}

<Timesheet {year} {month} bind:timesheets={data.timesheets} bind:projects={data.projects}/>
<Projects bind:projects={data.projects}/>

<svelte:document oncopy={copy} onpaste={paste}/>

<Debug value={data}/>
