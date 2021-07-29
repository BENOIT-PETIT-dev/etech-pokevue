<template>
  <main class="pokemon">
    <Link path="/" />
    <section class="pokemon-container">
      <PokemonInfos />
    </section>
  </main>
</template>

<script>
import PokemonInfos from '../components/Pokemon/PokemonInfos.vue';
import Link from '../components/utils/Link/Link.vue';

export default {
  name: 'Pokemon',
  components: {
    PokemonInfos,
    Link
  }
}
</script>

<style>
</style>
