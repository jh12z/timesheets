<script>
	import {randomId} from "$lib/util/id.js";

	let {
		year,
		month,
		timesheets = $bindable(),
		projects = $bindable()
	} = $props();

	let timesheetKey = $derived(String(year).padStart(2, "0") + "-" + String(month).padStart(2, "0"));
	let timesheet = $derived(timesheets[timesheetKey] ?? {lines:[]});

	let daysInMonth = $derived(new Date(year, month, 0).getDate());

	let dates = $derived([...Array(daysInMonth)].map((_, i) => {
		const day = i + 1;
		const d = new Date(year, month - 1, day);
		const date = d.toISOString().slice(0, 10);
		const dayOfWeek = d.toDateString().slice(0, 3);
		const weekend = dayOfWeek.slice(0, 1) === "S";
		return {date, day: String(day).padStart(2, "0"), label: dayOfWeek, weekend};
	}));

	let totalPerDay = $derived(dates.map((_, i) => sum(timesheet.lines.map(line => line.hours[i] ?? 0))));

	let total = $derived(sum(totalPerDay));

	let activeProjects = $derived(projects.filter(b => b.active));
	let projectsMap = $derived(projects.reduce((result, project) => ({...result,[project.id]:project}), {}));

	$effect(() => {
		timesheet.lines.forEach(line => {
			line.total = sum(line.hours);
		});
	});

	function sum(array) {
		return array.reduce((acc, n) => acc + n ?? 0, 0) || null;
	}

	function addLine() {
		if (!timesheets[timesheetKey]) {
			timesheets[timesheetKey] = {lines: []}
		}
		timesheet.lines = [...timesheet.lines, {id: randomId(), hours: []}]
	}

	function deleteLine(index) {
		timesheet.lines = [...timesheet.lines.slice(0,index), ...timesheet.lines.slice(index + 1)];
	}
</script>

<h3>Timesheet</h3>

<table class="timesheet-table">
	<thead>
		<tr>
			<th rowspan="2"></th>
			<th rowspan="2"></th>
			<th rowspan="2">Project</th>
			<th rowspan="2">Total</th>
			{#each dates as date (date.day)}
				<th>{date.label}</th>
			{/each}
		</tr>
		<tr>
			{#each dates as date, i (i)}
				<th>{date.day}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each timesheet.lines as line, i (line.id)}
			{@const project = projectsMap[line.projectId]}
			<tr>
				<td><button onclick={() => deleteLine(i)}>delete</button></td>
				<td>{#if project}<input type="checkbox" bind:checked={project.active}>{/if}</td>
				<td>
					<select bind:value={line.projectId}>
						<option value={null}></option>
						{#each activeProjects as project (project.id)}
							<option value={project.id}>{project.name}</option>
						{/each}
						{#if project && !project.active}
							<option value={line.projectId} disabled>{project.name}</option>
						{/if}
					</select>
				</td>
				<td><input class="hours" value={line.total} disabled></td>
				{#each dates as _, i (i)}
					<td><input class="hours" type="number" bind:value={line.hours[i]} step="0.5" min="0" max="24"></td>
				{/each}
				<td><input bind:value={line.comment}></td>
			</tr>
		{/each}
		<tr>
			<td><button onclick={addLine}>add</button></td>
			<td colspan="3"></td>
			<td><input class="hours" value={total} disabled/></td>
			{#each dates as _, i (i)}
				<td><input class="hours" value={totalPerDay[i]} disabled/></td>
			{/each}
		</tr>
	</tbody>
</table>

<style>
    input.hours {
        min-width: 25px;
        max-width: 25px;
		text-align: center;
    }

    input.hours::-webkit-outer-spin-button,
    input.hours::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
</style>