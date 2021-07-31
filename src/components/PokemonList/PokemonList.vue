<template>
  <Spinner v-if="loading" />
	<div v-else class="grid-container">
		<Card 
			v-for="pokemon in allPokemons" 
			:key="pokemon.id" 
			:pokeData="pokemon"
			@click="goToPokemon(pokemon.id)" />
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import router from '../../router';
import Card from "./Card.vue";
import Spinner from "../utils/Spinner.vue";

export default {
  name: "PokemonList",
  components: {
    Card,
    Spinner
  },
  computed: {
    ...mapGetters(["allPokemons", "loading"])
  },
  methods: {
    ...mapActions(["fetchAllPokemons"]),
		goToPokemon(pokeId) {
			router.push({ path: `/pokemon/${pokeId}` })
		}
  },
  created() {
    this.fetchAllPokemons();
  },
};
</script>

<style>
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
	gap: 10px;
}
</style>