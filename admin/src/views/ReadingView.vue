<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import fixtures from '@/fixtures.json';
import EpubReader from '@/components/EpubReader.vue';

// const selectedPage = ref(1);
// const selectPage = (page, pageValue) => {
//     selectedPage.value = page;
//     selectedContent.value = pageValue;
// };
const route = useRoute();
const router = useRouter();
const currentFontSize = ref(100);

const showModal = ref(false);
const increaseFontSize = () => {
    currentFontSize.value += 10;
};

const decreaseFontSize = () => {
    currentFontSize.value -= 10;
};

function goBack() {
    sessionStorage.setItem('reading', true);
    router.go(-1);
}

function showComments() {
    showModal.value = true;
}

</script>

<template class="parent">
    <div class="top-nav-bar">
        <BContainer fluid class="full-size">
            <BRow class="align-items-center">
                <BCol cols="6" class="d-flex flex-row">
                    <div class="title">
                        Title:&nbsp;<span class="title-text"> {{
                            fixtures["content-material"][route.params.type][route.params.category][route.params.url].title
                        }}</span>
                    </div>,&nbsp;
                    <div class="title">
                        By:&nbsp;<span class="title-text"> {{
                            fixtures["content-material"][route.params.type][route.params.category][route.params.url].author
                        }}</span>
                    </div>&nbsp;
                </BCol>
                <BCol cols="6" class="user-func">
                    <div v-if="route.params.type === 'writings'" class="comments-btn">
                        <img @click="showComments" :src="`${baseDir}icons/comments.svg`" width="30" height="30"
                            class="comments-btn mx-2" />
                    </div>

                    <!-- </Button> -->
                    <Button class="font-size" icon="pi pi-minus" severity="secondary" rounded outlined
                        aria-label="Decrease" @click="decreaseFontSize" :disabled="currentFontSize < 80" />
                    <img :src="`${baseDir}icons/font-adjuster-icon.svg`" width="30" height="30" class="font-adjuster">
                    <Button class="font-size" icon="pi pi-plus" severity="secondary" rounded outlined
                        aria-label="Increase" @click="increaseFontSize" :disabled="currentFontSize > 120" />
                    <div class="close-reading-btn">
                        <BButton class='close-reading-button' @click="goBack()">Close</BButton>
                    </div>
                    <!-- <BDropdown v-model="show" split :text="'Page ' + selectedPage" class="me-2 scrollable-dropdown">
                        <BDropdownHeader> Select page </BDropdownHeader>
                        <BDropdownItem v-for="section in toc" :key="section.id" :value="section.href"
                            @click="selectPage(key, page)">{{ section.label }}
                        </BDropdownItem>
                    </BDropdown> -->
                </BCol>
            </BRow>
        </BContainer>
    </div>
    <div class="reading-container">
        <EpubReader
            :url="baseDir + fixtures['content-material'][route.params.type][route.params.category][route.params.url].file"
            :currentFontSize="currentFontSize" />
    </div>
    <!-- <BModal v-if="route.params.type === 'writings'" v-model="showModal" id="modal-scrollable" scrollable
        title="Comments" hide-footer>
        <span
            v-if="fixtures['content-material'][route.params.type][route.params.category][route.params.url].comments.length === 0">No
            Comments</span>
        <BCard id="comment-sections" bg-variant="light" class="my-4"
            v-for="comment in fixtures['content-material'][route.params.type][route.params.category][route.params.url].comments"
            :key="comment">
            <p class="my-4">
                <span class="title">{{ comment.author }}: </span>
                <span class="comment-text">{{ comment.content }}</span>
            </p>
        </BCard>

    </BModal> -->
    <Sidebar v-if="route.params.type === 'writings'" v-model:visible="showModal" id="modal-scrollable">
        <template #header>
            <div class="flex align-items-center gap-2">
                <span class="comments-header">Comments</span>
            </div>
        </template>
        <div :style="{ 'overflow-y': 'auto' }">
            <span
                v-if="fixtures['content-material'][route.params.type][route.params.category][route.params.url].comments.length === 0">No
                Comments</span>
            <BCard id="comment-sections" bg-variant="light" class="my-4"
                v-for="comment in fixtures['content-material'][route.params.type][route.params.category][route.params.url].comments"
                :key="comment">
                <p class="my-4">
                    <span class="title">{{ comment.author }}: </span>
                    <span class="comment-text">{{ comment.content }}</span>
                </p>
            </BCard>
        </div>
    </Sidebar>

</template>
<style scoped>
.comment-text {
    font-style: italic;
}

.full-size {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
}

.comments-btn:hover {
    cursor: pointer;
}

.title,
.author {
    font-size: 1rem;
    font-weight: bold;
}

.title-text,
.author-text {
    font-size: 1rem;
    font-weight: normal;
}

.font-size {
    height: 30px;
    background-color: #f1f5f9 !important;
}

.user-func {
    justify-content: flex-end !important;
    display: flex;
    align-items: center;
}

.comments-btn {
    margin-right: 10px;
}

.parent {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.reading-container {
    flex-grow: 1;
    overflow: auto;
    flex-direction: row;
    display: inline-flex;
    align-items: center;
}

.font-adjuster {
    margin: 0 10px;
}

.close-reading-btn {
    margin-left: 10px;
}

.close-reading-button {
    background-color: #e0900d !important;
    border: none;
}

.font-size {
    box-shadow: none !important;
    border: 1px solid gainsboro !important;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    background-color: gainsboro;
}
</style>
