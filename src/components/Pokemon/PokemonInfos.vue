<template>
  <span v-if="loading">Loading...</span>
  <div v-else class="pokemon">
    <span>{{ pokemon.name }}</span>
    <CardImage :imageUrl="imageUrl" :pokeData="pokemon" />
    <ul>
      <li v-for="(set, index) in pokemon.abilities" :key="index">
        {{ set.ability }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import CardImage from "../PokemonList/CardImage.vue";

export default {
  name: "PokemonInfos",
  components: {
    CardImage
  },
  data() {
    return {
      pokemon: "",
      abilities: [],
			currentPokemonUrl: "",
			loading: true,
      imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"
    };
  },
  methods: {
    fetchPokemon(id) {
      axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => {
        this.pokemon = res.data;
				this.loading = false;

        res.data.abilities.forEach((abilityParam) => {
          axios.get(abilityParam.ability.url).then((res) => {
            const abilityName = abilityParam.ability.name;
            const shortEffect = res.data.effect_entries[1].short_effect;

            this.abilities.push(abilityName, shortEffect);
          });
        });
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

<style lang="scss">
.pokemon {
  margin: 0 auto;
  width: 100%;
  max-width: 200px;
  display: flex;
  flex-direction: column;
  align-content: center;
}
</style>