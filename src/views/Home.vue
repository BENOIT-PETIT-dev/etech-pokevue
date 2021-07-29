<template>
  <main class="home">
    <section class="pokemons-container">
      <PokemonList />
    </section>
  </main>
</template>

<script>
import PokemonList from '../components/PokemonList/PokemonList.vue';

export default {
  name: 'Home',
  components: {
    PokemonList
  }
}
</script>

<style>
</style>
