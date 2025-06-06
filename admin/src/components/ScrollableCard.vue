<script setup>
import CardCover from '@/components/CardCover.vue';
import { ref, watchEffect, watch, reactive, nextTick } from 'vue';
import fixtures from '@/fixtures.json';
import { useRoute } from 'vue-router';
const authenticated = inject('authenticated');
const previousPath = ref(null);
import { inject } from 'vue';


const route = useRoute();

const props = defineProps({
  fixture: Object,
  routePath: String,
  category: String,
  deleteFixture: Function,
  keyy: String // Ensure 'keyy' is defined as a prop


})

const state = reactive({
  fixtureUpdate: {},
  forceUpdate: 0,
});

var postedContent = ref(null);

if (sessionStorage.getItem(props.category)) {
  postedContent.value = JSON.parse(sessionStorage.getItem(props.category));
}
var filteredFixtures = ref({});
filteredFixtures.value = props.fixture;
postedContent.value = JSON.parse(sessionStorage.getItem(props.category));
if (postedContent.value) {
  filteredFixtures.value = { ...postedContent.value, ...filteredFixtures.value };
}

const fixtureArray = ref(Object.values(filteredFixtures.value));
const fixtureKeys = ref(Object.keys(filteredFixtures.value));

const responsiveOptions = ref([
  {
    breakpoint: '1400px',
    numVisible: 3,
    numScroll: 1
  },
  {
    breakpoint: '1199px',
    numVisible: 3,
    numScroll: 1
  },
  {
    breakpoint: '767px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '575px',
    numVisible: 1,
    numScroll: 1
  }
]);

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
const getCategory = (routePath) => {
  let splitted = routePath.split('/');
  return splitted[1];
};

const deleteFixture = (keyy, routePath) => {
  let category = getCategory(routePath);
  state.fixtureUpdate = fixtures['content-material'][route.params.type][category];
  state.forceUpdate++;

  nextTick().then(() => {
    if (state.fixtureUpdate) {
      fixtureArray.value = Object.values(state.fixtureUpdate);
      fixtureKeys.value = Object.keys(state.fixtureUpdate);
    }
  });

  if (filteredFixtures.value && filteredFixtures.value[keyy]) {
    delete filteredFixtures.value[keyy];
  }

  // Check if the key exists in postedContent
  if (postedContent.value && postedContent.value[keyy]) {
    delete postedContent.value[keyy];
    sessionStorage.setItem(category, JSON.stringify(postedContent.value));
  }

  // Check if the key exists in fixtures
  if (fixtures['content-material'][route.params.type][category][keyy]) {
    delete fixtures['content-material'][route.params.type][category][keyy];
  }
};


</script>

<template>
  <Carousel :value="fixtureArray" :numVisible="4" :numScroll="1" :responsiveOptions="responsiveOptions">
    <p> {{ filteredFixtures }}</p>
    <template #item="slotProps">
      <div class="carouseldiv">
        <CardCover :data="slotProps.data" :keyy="`${fixtureKeys[slotProps.index]}`" :routePath="routePath"
          :readable="slotProps.data.id ? true : false" @delete-fixture="deleteFixture" />
      </div>
    </template>
  </Carousel>

</template>
<!--border-1 surface-border border-round m-2  p-3 d-flex justify-content-center-->

<style scoped>
.carouseldiv {
  border: 1ch;
  justify-content: center;
  display: flex;
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
</style>
<style>
.p-carousel-prev-icon {
  height: 2rem !important;
  width: 2rem !important;
}
.p-carousel-next-icon {
  height: 2rem !important;
  width: 2rem !important;
}
</style>
