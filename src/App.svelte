<script lang="ts">
	import {
		Canvas,
		EventNet,
		VectorEvaluator,
		CollisionChecker,
	} from './components';
</script>

<Canvas />
<EventNet />
<VectorEvaluator />
<CollisionChecker />

<style>
	:global(body), :global(document) {
		padding: 0;
		margin: 0;
	}
</style>