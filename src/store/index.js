import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state: {
    allPokemons: [],
    pokemon: [],
    loading: true,
  },
  getters: {
    allPokemons: state => state.allPokemons,
    pokemon: state => state.pokemon,
    loading: state => state.loading,
  },
  actions: {
    setLoading({ commit }, action) {
      commit('setLoading', action);
    },
    async fetchAllPokemons({ commit }) {
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=151");
        const pokemons = [];
        
        response.data.results.forEach((pokemon) => {
          pokemon.id = pokemon.url
            .replace("https://pokeapi.co/api/v2/pokemon/", "")
            .replace("/", "");
          pokemons.push(pokemon);
        });
  
        commit('setAllPokemons', pokemons);
        commit('setLoading', false);
      }
      catch(error) {
        commit('setLoading', false);
      }
    },
    async fetchPokemon({ commit }, id) {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const completeAbilities = response.data.abilities;
        const filteredAbilities = await fetchPokemonAbilities(completeAbilities);        
        const pokemon = {id: id, name: response.data.name, abilities: filteredAbilities};
        
        commit('setPokemon', pokemon);
        commit('setLoading', false);
      }
      catch(error) {
        commit('setLoading', false);
      }
    },
    handleAbilityShown({ commit }, id) {
      commit('setAbilityShow', id);
    }
  },
  mutations: {
    setAllPokemons: (state, pokemons) => (state.allPokemons = pokemons),
    setPokemon: (state, pokemon) => (state.pokemon = pokemon),
    setLoading: (state, boolean) => (state.loading = boolean),
    setAbilityShow: (state, id) => (state.pokemon.abilities[id].isShownEffect = !state.pokemon.abilities[id].isShownEffect)
  }
});

async function fetchPokemonAbilities(abilities) {
  let filteredAbilities = [];
    
  for (let abilitySet of abilities) {
    const abilitiesResponse = await axios.get(abilitySet.ability.url);
    const abilityName = abilitySet.ability.name.replace("-", " ");
    const shortEffect = await abilitiesResponse.data.effect_entries[1].short_effect;
    
    filteredAbilities.push({abilityName, shortEffect, isShownEffect: false});
  }

  return filteredAbilities;
}

export default store;
