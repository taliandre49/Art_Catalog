<script setup>
import { ref, watchEffect, watch } from 'vue';
import fixtures from '@/fixtures.json';
import { useRoute } from 'vue-router';
import CardCover from '@/components/CardCover.vue';
import { inject } from 'vue';
const authenticated = inject('authenticated');
const route = useRoute();
const previousPath = ref(null);

var postedContent = ref(null);

watch(route, (to, from) => {
  //check if there is any posted content
  if (sessionStorage.getItem(route.params.category)) {
    postedContent.value = JSON.parse(sessionStorage.getItem(route.params.category));
  }

  previousPath.value = JSON.parse(sessionStorage.getItem('reading')) || false;
  if (previousPath.value) {
    route.query.search = [];
    sessionStorage.setItem('reading', false);
  }
}, { immediate: true });

var filteredFixtures = ref({});
filteredFixtures.value = fixtures['content-material'][route.params.type][route.params.category];
postedContent.value = JSON.parse(sessionStorage.getItem(route.params.category));
if (postedContent.value) {
  filteredFixtures.value = { ...filteredFixtures.value, ...postedContent.value };
}

watchEffect(() => {
  filteredFixtures.value = fixtures['content-material'][route.params.type][route.params.category];
  postedContent.value = JSON.parse(sessionStorage.getItem(route.params.category));
  if (postedContent.value) {
    filteredFixtures.value = { ...postedContent.value, ...filteredFixtures.value };
  }
  var temp = {};
  if (route.query.search === 'no-result') {
    filteredFixtures.value = {};
    return;
  }
  if (route.query.search.length !== 0) {
    for (let key of route.query.search) {
      temp[key] = fixtures['content-material'][route.params.type][route.params.category][key];
    }
    filteredFixtures.value = temp;
  } else {
    filteredFixtures.value = fixtures['content-material'][route.params.type][route.params.category];
    if (postedContent.value) {
      filteredFixtures.value = { ...postedContent.value, ...filteredFixtures.value };
    }
  }
});

const deleteFixture = (keyy,routePath) => {
  console.log(routePath);
  if (filteredFixtures.value && filteredFixtures.value[keyy]) {
    delete filteredFixtures.value[keyy];
  }

  // Check if the key exists in postedContent
  if (postedContent.value && postedContent.value[keyy]) {
    delete postedContent.value[keyy];
    sessionStorage.setItem(route.params.category, JSON.stringify(postedContent.value));
  }

  // Check if the key exists in fixtures
  if (fixtures['content-material'][route.params.type][route.params.category][keyy]) {
    delete fixtures['content-material'][route.params.type][route.params.category][keyy];
  }
};

</script>

<template>
  <div class="content-body">
    <div class="d-flex flex-row justify-content-between">
      <div class="title">
        <h2 class='pagetitle' value=${route.params.category} severity="secondary">{{ route.params.category.charAt(0).toUpperCase() + route.params.category.slice(1) }}
        </h2>
      </div>
      <div class="view">
        <BButton v-if="authenticated" class="city-button-add mb-3 btn btn-secondary mx-2"
          :to="`/post/${route.params.type}/${route.params.category}/create`">Add
        </BButton>
      </div>
    </div>
    <div v-if="route.query.search !== 'no-result' && route.query.search.length !== 0">Search results found...</div>
    <div v-if="route.query.search === 'no-result'">No results found.</div>
    <div class="flexing">
      <CardCover v-for="(item, key) in filteredFixtures" :data="item" :keyy="key" :routePath="`${route.params.type}/${route.params.category}`"
        :readable="item.id ? true : false"  @delete-fixture="deleteFixture"/>
    </div>
    <!-- <Artwork/> -->
  </div>

  <div style="display: flex; justify-content: center;">
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous">
          <span style="color: black;" aria-hidden="true">&laquo;</span>
          <span class="sr-only"></span>
        </a>
      </li>
      <li class="page-item"><a class="page-link" href="#" style="color: black;">1</a></li>
      <li class="page-item"><a class="page-link" href="#" style="color: black;">2</a></li>
      <li class="page-item"><a class="page-link" href="#" style="color: black;">3</a></li>
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Next">
          <span style="color: black;" aria-hidden="true">&raquo;</span>
          <span class="sr-only"></span>
        </a>
      </li>
    </ul>
  </nav>
</div>


</template>
<style>
.flexing {
  display: flex;
  flex-direction: row;
  padding: 2em;
  gap: 1em;
  flex-wrap: wrap;
}

@media (max-width: 600px) {
  .flexing {
    justify-content: center;
  }
}

.title {
  display: flex;
  justify-content: flex-right;
}

.p-tag {
  font-size: 2rem;
}

.view {
  display: flex;
  justify-content: flex-end;
}
.city-button-add {
  background-color: #e0900d !important;
  border: 1px solid #e0900d;
  color: whitesmoke;
}
.city-button-add:hover,
.city-button-add:active {
    background-color: #f1ae41 !important;
    border: 1px solid #f1ae41 !important;
    color: white !important;
}
</style>
