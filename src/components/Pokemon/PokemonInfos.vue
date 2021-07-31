<template>
  <span v-if="loading">Loading...</span>
  <div v-else class="pokemon">
    <span class="name">{{ pokemon.name }}</span>
    <CardImage :imageUrl="imageUrl" :pokeData="pokemon" />
    <ul class="abilities">
      <li v-for="(ability, index) in abilities" :key="index">
        <span class="ability__name">{{ ability.abilityName }}</span>
        <button @click="toggleShowEffect(index)" class="ability__detail">
          <span v-if="!ability.isShownEffect">détail</span>
          <span v-else>réduire</span>
        </button>
        <span v-show="ability.isShownEffect" class="ability__effect">{{ ability.shortEffect }}</span>
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
        const abilities = res.data.abilities;

        abilities.forEach((abilityParam) => {
          axios.get(abilityParam.ability.url).then((res) => {
            const abilityName = abilityParam.ability.name.replace("-", " ");
            const shortEffect = res.data.effect_entries[1].short_effect;

            this.abilities.push({abilityName, shortEffect, isShownEffect: false});

            if (this.abilities.length >= abilities.length) {
              this.loading = false;
            }
          });
        });
      });
    },
    setCurrentPokemonUrl() {
			this.currentPokemonUrl = this.$route.params.id
		},
    toggleShowEffect(id) {
      this.abilities[id].isShownEffect = !this.abilities[id].isShownEffect;
    }
  },
  mounted() {
		this.currentPokemonUrl = this.$route.params.id
    this.fetchPokemon(this.currentPokemonUrl);
  },
};
</script>

<style lang="scss">
.pokemon-container {
  margin-top: 30px;
  width: 100%;
}

.pokemon {
  margin: 0 auto;
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .name {
    font-size: 26px;
    font-weight: 600;
    text-transform: capitalize;
  }

  img {
    width: 200px;
  }

  ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    text-align: left;
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      font-size: 18px;

      .ability__name {
        display: block;
        font-weight: 600;
        
        &::first-letter {
          text-transform: capitalize;
        }
      }
    }
  }
}
</style>