<template>
  <SearchBar :routeParams="routeParams"></SearchBar>
  <RouterView />
  <NavBar></NavBar>
</template>

<script>
import { ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const routeParams = ref(null);

    watchEffect(() => {
      if (route) {
        routeParams.value = route.params;
      }
    });

    if (router) {
      router.beforeEach((to, from, next) => {
        if (!to.query.search) {
          to.query.search = [];
        }
        next();
      });
    }

    return {
      routeParams
    };
  }
};
</script>

<style scoped></style>
