<template>
  <main class="pokemon">
    <span class="return" @click="goToHome">Retour</span>
    <section class="pokemon-container">
      <PokemonInfos />
    </section>
  </main>
</template>

<script>
import router from '../router';
import PokemonInfos from '../components/Pokemon/PokemonInfos.vue';

export default {
  name: 'Pokemon',
  components: {
    PokemonInfos,
  },
  methods: {
    goToHome() {
      router.push({ path: "/" });
    }
  }
}
</script>

<style>
.return {
  text-decoration: underline;
  cursor: pointer;
}
</style>
