<script lang="ts">
	import InputForm from '$lib/components/InputForm/InputForm.svelte';
	import LookupTables from '$lib/components/LookupTables/LookupTables.svelte';
	import Results from '$lib/components/Results/Results.svelte';
	import Visualization from '$lib/components/Visualization/Visualization.svelte';
</script>

<InputForm />
<Results />
<Visualization />
<LookupTables asciiTableChunkSize={32} base64TableChunkSize={26} />
