<template>
  <Spinner v-if="loading" />
  <div v-else class="pokemon">
    <span class="name">{{ pokemon.name }}</span>
    <CardImage :pokeData="pokemon" />
    <ul class="abilities">
      <li v-for="(ability, index) in pokemon.abilities" :key="index">
        <span class="ability__name">{{ ability.abilityName }}</span>
        <button @click="toggleShowEffect(index)" class="ability__detail">
          <span v-if="!ability.isShownEffect">détail</span>
          <span v-else>réduire</span>
        </button>
        <span v-show="$store.state.pokemon.abilities[index].isShownEffect" class="ability__effect">{{ ability.shortEffect }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CardImage from "../PokemonList/CardImage.vue";
import Spinner from "../utils/Spinner.vue";

export default {
  name: "PokemonInfos",
  components: {
    CardImage,
    Spinner
  },
  computed: {
    ...mapGetters(["pokemon", "loading"])
  },
  methods: {
    ...mapActions(["fetchPokemon", "setLoading", "handleAbilityShown"]),
    toggleShowEffect(id) {
      this.handleAbilityShown(id);
    }
  },
  mounted() {
    this.fetchPokemon(this.$route.params.id);
    this.setLoading(true);
  }
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
