<template>
  <div class="poke-card">
    <CardImage :pokeData="pokeData" />
    <span>{{ pokeData.name }}</span>
  </div>
</template>

<script>
import CardImage from './CardImage.vue';

export default {
  name: "Card",
  components: {
    CardImage
  },
  props: {
    pokeData: Object,
  }
};
</script>

<style lang="scss">
.poke-card {
  background-color: #fff;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem .5rem;
  width: 100%;

  &:hover {
    background-color: #f5f5f5;
    cursor: pointer;
  }

  img {
    width: 90%;
    height: auto;
  }

  span {
    font-size: 14px;
    font-weight: 500;
    text-transform: capitalize;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
  }
}
</style>