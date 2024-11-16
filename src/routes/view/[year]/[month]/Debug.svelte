<script>
	const { value } = $props();
</script>
<pre>{JSON.stringify(value, (key, value) => (key === "hours" && !value) ? 0 : value, 2)}</pre>
