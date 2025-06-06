<script setup>
import { ref } from 'vue';
import fixtures from '@/fixtures.json';
import { useRoute } from 'vue-router';
import ScrollableCard from '@/components/ScrollableCard.vue';
import { inject } from 'vue';
const authenticated = inject('authenticated');

const route = useRoute();

const deleteFixture = (category, keyy) => {
  // Check if the key exists in fixtures
  if (fixtures['content-material'][route.params.type][category][keyy]) {
    delete fixtures['content-material'][route.params.type][category][keyy];
  }
};

</script>

<template>
    <div class="content-body">
        <div v-for="(fixture, fixture_key) in fixtures['content-material'][route.params.type]">
            <div class="d-flex flex-row justify-content-between">
                <div class="title">
                <h2 value=${fixture} severity="secondary">{{ fixture_key.charAt(0).toUpperCase() + fixture_key.slice(1) }}</h2>
            </div>
            <div class="view">
                <BButton v-if="authenticated" class="city-button mb-3 btn mx-2"
                    :to="`post/${route.params.type}/${fixture_key}/create`">Add
                </BButton>
                <BButton class="city-button mb-3 btn" :to="`/view-all/${route.params.type}/${fixture_key}`">View All
                </BButton>
            </div>
            </div>

            <ScrollableCard :fixture="fixture" :routePath="`${route.params.type}/${fixture_key}`" :category="fixture_key" :deleteFixture="deleteFixture"/>
        </div>
    </div>
</template>

<style scoped>
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

:deep(.city-button) {
  background-color: #e0900d !important;
  border: 1px solid #e0900d;
  color: whitesmoke;
}
:deep(.city-button:hover,
.city-button:active) {
    background-color: #f1ae41 !important;
    border: 1px solid #f1ae41 !important;
    color: white !important;
}
</style>
