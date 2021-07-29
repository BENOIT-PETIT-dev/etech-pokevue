<template>
  <div class="pokemon">
		<span v-if="loading">
			loading
		</span>
		<span v-else>
			{{ pokemon.abilities }}
		</span>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PokemonInfos",
  data() {
    return {
      pokemon: "",
			currentPokemonUrl: "",
			loading: true
    };
  },
  methods: {
    fetchPokemon(id) {
      axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => {
        this.pokemon = res.data;
				this.loading = false;
      });
    },
    setCurrentPokemonUrl() {
			this.currentPokemonUrl = this.$route.params.id
		},
  },
  mounted() {
		this.currentPokemonUrl = this.$route.params.id
    this.fetchPokemon(this.currentPokemonUrl);
  },
};
</script>