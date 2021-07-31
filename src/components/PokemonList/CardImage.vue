<template>
  <img 
      :src="imageUrl + pokeData.id + '.png'" 
      :alt="pokeData.name" />
</template>

<script>
export default {
    name: 'CardImage',
    props: {
        imageUrl: String,
        pokeData: Object
    }
}
</script>

<style>

</style>