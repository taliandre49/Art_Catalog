<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { inject } from 'vue';
const authenticated = inject('authenticated');
import Artwork from '@/components/Artwork.vue';
// import fixtures from '@/fixtures.json';

const router = useRouter();

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  keyy: {
    type: String,
    required: true
  },
  routePath: {
    type: String,
    required: true
  },
  readable: {
    type: Boolean,
    required: false,
    default: true
  }
})
const route = useRoute();
const showComments = ref(false);

const toggleContent = () => {
  showComments.value = !showComments.value;
};

const editContent = (id, routePath, keyy) => {
  if (id) {
    router.push(`/post/${routePath}/${keyy}`);
  }
}
const emit = defineEmits(['delete-fixture']);

const deleteContent = (keyy, routePath) => {
  emit('delete-fixture', keyy, routePath);
};

const menu = ref();
const menuItems = ref([
  {
    items: [
      {
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: () => {
          editContent(props.data.id, props.routePath, props.keyy);
        }
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => {
          deleteContent(props.keyy, props.routePath);
        }
      }
    ]
  }
]);

const toggle = (event) => {
  menu.value.toggle(event);
  console.log('toggle', menu.value);
};

</script>


<template>

  <div class="cards">
    <div class="d-flex justify-content-end">
      <Button v-if="authenticated" type="button" icon="pi pi-ellipsis-h" @click="toggle" aria-haspopup="true"
        aria-controls="overlay_menu" class="p-0 tg-btn" />
      <Menu class="ellip-menu" ref="menu" id="overlay_menu" :model="menuItems" :popup="true" />
      <!-- <BButton v-if="authenticated" @click="() => deleteContent(keyy, routePath)">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash"
          viewBox="0 0 16 16">
          <path
            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
          <path
            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
        </svg>
      </BButton>
      <BButton v-if="authenticated" @click="() => editContent(data.id, routePath, keyy)">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square"
          viewBox="0 0 16 16">
          <path
            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
          <path fill-rule="evenodd"
            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
        </svg>
      </BButton> -->
    </div>

    <div v-if="route.params.category !== 'artworks'">
      <BLink class="no-decoration" :disabled="!readable" :to="`/${routePath}/${keyy}`">
        <b-card :img-src="`${baseDir}cover-imgs/${data[`cover-img`]}`" class="cards">
          <div class="text-body d-flex flex-column align-items-center">
            <p class="title">{{ data.title }}</p>
            <p class="author">By {{ data.author }}</p>
          </div>
        </b-card>
      </BLink>
    </div>
    <div v-if="route.params.category === 'artworks'">
      <b-card :img-src="`${baseDir}cover-imgs/${data['cover-img']}`" v-b-modal="`modal-${data['cover-img']}-${keyy}`">
        <div class="text-body d-flex flex-column align-items-center">
          <p class="title">{{ data.title }}</p>
          <p class="author">By {{ data.author }}</p>
        </div>
        <BModal :id="`modal-${data['cover-img']}-${keyy}`" size="xl" :title="data.title + ' by ' + data.author"
          class="art-modal" hide-footer>
          <div class="image-container d-flex flex-column">
            <BCard no-body class="modal-image">
              <BCardImg :src="`${baseDir}cover-imgs/${data['cover-img']}`" alt="Image" class="rounded-0" ref="image" />
            </BCard>
            <b-button class="my-2" @click="toggleContent">View Comments</b-button>
          </div>
        </BModal>
      </b-card>
    </div>
  </div>
  <Sidebar v-model:visible="showComments">
    <template #header>
      <div class="flex align-items-center gap-2">
        <span class="comments-header">Comments</span>
      </div>
    </template>
    <div :style="{ 'overflow-y': 'auto' }">
      <span v-if="data.comments.length === 0">No Comments</span>
      <BCard v-for="comment in data.comments" id="comment-sections" bg-variant="light" class="my-4">
        <p class="my-4">
          <span class="author-comment-title">{{ comment.author }}: </span>
          <span class="comment-text">{{ comment.content }}</span>
        </p>
      </BCard>
    </div>
  </Sidebar>
</template>

<style scoped>
.text-body {
  max-width: 13rem;
}

.title {
  display: block;
  font-size: 1rem;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  margin-bottom: 0px;
  margin-top: 1rem;
}

.author {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}

.no-decoration {
  text-decoration: none;
}
</style>

<style>
.tg-btn {
  border-radius: 5px;
  background: #efc883;
  color: #535659;
  border: none;
  margin-bottom: 3px;
}

.ellip-menu {
  .p-menu-list {
    padding: 0px;
    margin-bottom: 0px;
  }

  .p-submenu-header {
    padding: 0px;
  }
}

.p-menuitem-link {
  color: black;
  text-decoration: none;
}

.p-menu {
  min-width: 0px;
}

.cards {
  width: 15em;
  /* height: 25em; */
  /* gap: 1em; */
  justify-content: center;
  align-items: center;
}

.cards a {
  text-decoration: none;
}

.cards img {
  /* width: 230px; */
  height: 245px;
  object-fit: cover;
  overflow: hidden;
}

.author-comment-title {
  font-size: 1rem;
  font-weight: bold;
}

.comments-header {
  font-size: 1.5em;
  font-weight: 700;
}

.butt {
  color: white !important;
  size: larger;
}

.img {
  max-height: 100px;
}

.image-container {
  max-width: 100%;
  max-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-image {
  max-height: 80vh;
  /* Adjust this value as needed */
  max-width: 100%;
  object-fit: contain;
}

.card-img {
  max-height: 60vh;
  max-width: 70vh;
}

.cards {
  .card-body {
    width: 100%;
    display: flex;
    justify-content: start;
    padding: 0px;
    padding-left: 10px;
    background: #f0c783;
  }
}

.art-modal {
  .modal-dialog {
    justify-content: center;
    display: flex;
  }

  .modal-content {
    width: fit-content !important;
  }

  .card-text {
    overflow: scroll;
  }

  .card-body {
    height: 50%;
    display: flex;
    overflow-y: auto;
    flex-direction: column;
    width: 100%;
  }
}

/* .img{
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;

}
.image-container {
  max-width: 100%;
  max-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
} */
/* .card-content {
  flex: 1;
} */
</style>
