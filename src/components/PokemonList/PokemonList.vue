<template>
	<div class="grid-container">
		<Card 
			v-for="pokemon in pokemons" 
			:key="pokemon.id" 
			:pokeData="pokemon"
			@click="goToPokemon(pokemon.id)" />
	</div>
</template>

<script>
import axios from "axios";
import router from '../../router';
import Card from "./Card.vue";

export default {
  name: "PokemonList",
  components: {
    Card,
  },
  data() {
    return {
      pokemons: [],
    };
  },
  methods: {
    fetchPokemons() {
      axios.get("https://pokeapi.co/api/v2/pokemon?limit=151").then((res) => {
        res.data.results.forEach((pokemon) => {
          pokemon.id = pokemon.url
            .replace("https://pokeapi.co/api/v2/pokemon/", "")
            .replace("/", "");
          this.pokemons.push(pokemon);
        });
      });
    },
		goToPokemon(pokeId) {
			router.push({ path: `/pokemon/${pokeId}` })
		}
  },
  mounted() {
    this.fetchPokemons();
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