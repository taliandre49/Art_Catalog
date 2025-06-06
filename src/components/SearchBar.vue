<script setup>
import { ref, watchEffect, watch, nextTick } from 'vue';
import fixtures from '@/fixtures.json';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
const props = defineProps({
  routeParams: Object
});
var pageFixture = ref({});
var searchInput = ref('');

watch(() => route.path, () => {
  searchInput.value = '';
  router.push({ query: { search: [] } });
});

watchEffect(() => {
  if (route.name === 'todo') {
    pageFixture = fixtures["tasks"];
  }
  else {
    if (props.routeParams.type && props.routeParams.category) {
      pageFixture = fixtures["content-material"][props.routeParams.type][props.routeParams.category];
    }
  }
});

function handleInput() {
  nextTick(searchFixture);
}

function searchFixture() {
  let results = [];
  if (searchInput.value !== '') {
    var keys = []
    for (let key in pageFixture) {
      if ((pageFixture[key].title.toLowerCase().startsWith(searchInput.value.toLowerCase()) ||
      (!searchInput.value.includes(' ') && pageFixture[key].title.toLowerCase().split(' ').some(word => word.startsWith(searchInput.value.toLowerCase()))))
      ||
      (pageFixture[key].author?.toLowerCase().startsWith(searchInput.value.toLowerCase()) ||
        (!searchInput.value.includes(' ') && pageFixture[key].author?.toLowerCase().split(' ').some(word => word.startsWith(searchInput.value.toLowerCase()))))
    ) {
        keys.push(key);
      }
    }
    if (keys.length > 0) {
      results = keys;
    } else {
      results = 'no-result';
    }
  }
  router.push({ query: { search: results } });
  return;

}


</script>

<template>
  <div v-if="$route.name !== 'contact' && $route.name !== 'display-reading' && $route.name !== 'display' && $route.name !== 'post'">
    <b-navbar toggleable="md" type="light" variant="light">
      <b-navbar-nav class="w-100">
        <b-input-group class="mb-2">
          <b-input-group-prepend is-text>
            <i class="pi pi-search"></i>
          </b-input-group-prepend>
          <b-form-input @input="handleInput" aria-label="Text input with checkbox" style="font-size: 20px;"
            v-model="searchInput"
            :placeholder="$route.path === '/todo' ? 'Search to-do\'s' : 'Search by title, author...'"></b-form-input>
        </b-input-group>

      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<style scoped></style>
