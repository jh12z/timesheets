<script>
	import {randomId} from "$lib/util/id.js";

	let {
		projects = $bindable()
	} = $props();

	function addProject() {
		projects = [...projects, {id: randomId(), active: true}];
	}

	function deleteProject(index) {
		projects = [...projects.filter((_, i) => i !== index)]
	}
</script>

<h3>Projects</h3>

<table>
	<thead>
		<tr>
			<th><button onclick={addProject}>add</button></th>
<!--			<th>ID</th>-->
			<th>Project</th>
			<th>Chargeable</th>
			<th>Non-Chargeable</th>
			<th>Type</th>
			<th>Active</th>
		</tr>
	</thead>
	<tbody>
		{#each projects as project, i (project.id)}
			<tr>
				<td class="actions">
					<button onclick={() => deleteProject(i)}>delete</button>
				</td>
<!--				<td><input bind:value={project.id}/></td>-->
				<td><input bind:value={project.name}/></td>
				<td><input bind:value={project.chargeable}/></td>
				<td><input bind:value={project.nonChargeable}/></td>
				<td><input bind:value={project.type}/></td>
				<td><input type="checkbox" bind:checked={project.active}/></td>
			</tr>
		{/each}
	</tbody>
</table>
