<template>
  <router-link :to="path">Retour</router-link>
</template>

<script>
export default {
    name: "Link",
    props: {
        path: String
    }
}
</script>

<style>

</style>