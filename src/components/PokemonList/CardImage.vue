<template>
  <img 
      :src="image" 
      :alt="pokeData.name" />
</template>

<script>
export default {
    name: 'CardImage',
    props: {
        pokeData: Object
    },
    data() {
        return {
            imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"
        }
    },
    computed: {
        image() {
            return `${this.imageUrl}${this.pokeData.id}.png`
        }
    }
}
</script>

<style>

</style>