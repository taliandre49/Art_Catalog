<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { inject } from 'vue';
const authenticated = inject('authenticated');

var icons = [
  { icon: 'mail', name: 'Contact', route: '/' },
  { icon: 'writing', name: 'Writings', route: '/writings' },
  { icon: 'art', name: 'Artworks', route: '/view-all/artworks/artworks' },
  { icon: 'book', name: 'Programs', route: '/view-all/programs/programs' },
  ...(authenticated ? [{ icon: 'todo', name: 'To-do', route: '/todo' }] : [])
];

// if (authenticated.value) {
//   icons.push(
//     { icon: 'todo', name: 'To-do', route: '/todo' }
//   );
// }

const clickedItem = ref(null);
const router = useRouter();

const itemClicked = (item) => {
  clickedItem.value = item;
  router.push(item.route);
};

</script>
<template>
  <b-navbar v-if="$route.name !== 'display-reading' && $route.name !== 'post'" class="navbar">
    <b-navbar-nav class="w-100 navbar">
      <template v-for="(item, index) in icons" :key="index">
        <b-nav-item :to="item.route" class="flex-fill">
          <div class="d-flex justify-content-center">
            <span @click="itemClicked(item)" :class="{ 'clicked-item': clickedItem?.name === item.name }"
              class="icon-container d-flex flex-column gap-1 align-items-center" style="width: 80px;">
              <img class="icon" :src="`${baseDir}icons/${item.icon}.svg`" alt="icon" />
              {{ item.name }}
            </span>
          </div>
        </b-nav-item>
      </template>
    </b-navbar-nav>
  </b-navbar>
</template>

<style scoped>
.icon {
  width: 30px;
  height: 30px;
}

.navbar {
  height: 75px;
  display: flex;
  justify-content:stretch;
  background-color: #e0900d;
}
.nav-item {
  display: flex;
  justify-content: center;
}

.icon-container:hover {
  background-color: #fdc76f;
  width: 80px;
  border-radius: 10px;
}

.clicked-item {
  background-color: #fdc76f;
  width: 80px;
  border-radius: 10px;
}
</style>
