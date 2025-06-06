<script setup>
import { BCol } from "bootstrap-vue-next";
import { ref, computed } from "vue";
import { useRoute, useRouter } from 'vue-router';
import fixtures from '@/fixtures.json';
const route = useRoute();
var userAction = ref('Create');
const router = useRouter();
const editContent = ref(null);

var publishingContent = ref({
    "id": null,
    "title": '',
    "author": '',
    "cover-img": null,
    "file": '',
    "comments": []
});

if (route.params.url === 'create') {
    userAction.value = 'Create';
}
else {
    editContent.value = fixtures["content-material"][route.params.type][route.params.category][route.params.url];
    publishingContent.value = {
        "id": editContent.value.id,
        "title": editContent.value.title,
        "author": editContent.value.author,
        "cover-img": editContent.value["cover-img"],
        "file": editContent.value.file,
        "comments": editContent.value.comments ? editContent.value.comments : []
    }
    userAction.value = 'Edit';
}

const titleClicked = ref(false);
const titleState = computed(() => titleClicked.value ? publishingContent.value.title.length > 0 : null);

const authorClicked = ref(false);
const authorState = computed(() => authorClicked.value ? publishingContent.value.author.length > 0 : null);
const publishClicked = ref(false);
const fileState = computed(() => {
    if (publishClicked.value) {
        return publishingContent.value["cover-img"] ? true : false;
    } else {
        return publishingContent.value["cover-img"] ? true : null;
    }
});

function addComment() {
    publishingContent.value.comments.push({ author: '', content: '' });
}

function deleteComment(index) {
    publishingContent.value.comments.splice(index, 1);
}

function publishContent() {
    publishClicked.value = true;
    if (publishingContent.value.title === '') {
        titleClicked.value = true;
        return;
    }
    if (publishingContent.value.author === '') {
        authorClicked.value = true;
        return;
    }
    if (fileState.value === false && userAction.value === 'Create') {
        return;
    }
    // to check ///////////////////////////////
    if(publishingContent.value.comments.length === 1 && (publishingContent.value.comments[0].author === '' || publishingContent.value.comments[0].content === '')){
        publishingContent.value.comments = [];
    }
    publishingContent.value = {
        ...publishingContent.value,
        "comments": publishingContent.value.comments.length === 1 && route.params.category === "programs" && (publishingContent.value.comments[0].author === '' || publishingContent.value.comments[0].content === '') ? [] : publishingContent.value.comments,
        "cover-img": userAction.value === 'Create' ? "sample.jpeg" : editContent.value["cover-img"],
        "file": userAction.value === 'Create' ? "" : editContent.value.file
    }

    if (userAction.value === 'Edit') {
        fixtures["content-material"][route.params.type][route.params.category][route.params.url] = publishingContent.value;
        sessionStorage.setItem(route.params.category, JSON.stringify(fixtures["content-material"][route.params.type][route.params.category]));
        router.go(-1);
        return;
    }
    if (sessionStorage.getItem(route.params.category)) {
        var posts = JSON.parse(sessionStorage.getItem(route.params.category));
        posts[publishingContent.value.title.toLowerCase().replace(/ /g, '-')] = publishingContent.value;
        sessionStorage.setItem(route.params.category, JSON.stringify(posts));
    }
    else {
        sessionStorage.setItem(route.params.category,
            JSON.stringify({ [publishingContent.value.title.toLowerCase().replace(/ /g, '-')]: publishingContent.value }));
    }
    router.go(-1);
}

function cancel() {
    router.go(-1);
}

</script>
<template>
    <BContainer fluid class="full-size top-nav-bar">
        <BRow>
            <BCol cols="8" class="d-flex align-items-center">
                <span class="header-text">{{ userAction }} {{ route.params.category }} post!</span>
            </BCol>
            <BCol cols="4" style="justify-content: end;display: flex;">
                <BButton type="submit" class="publish-cancel-btn mx-2" @click="publishContent()">Publish</BButton>
                <BButton type="reset" class="publish-cancel-btn mx-2" @click="cancel()">Cancel</BButton>
            </BCol>
        </BRow>
    </BContainer>

    <div class="content-body">
        <BContainer fluid class="full-size ">
            <BRow>
                <BCol cols="12">
                    <BCard bg-variant="light">
                        <BForm>
                            <BFormGroup>
                                <BRow>
                                    <BCol cols="12" sm="12" md="8" lg="8">
                                        <BRow class="py-2 mr-2">
                                            <BCol cols="12">
                                                <div class="title-header">Title: </div>
                                                <BFormInput id="title" :state="titleState"
                                                    v-model="publishingContent.title" @focus="titleClicked = true" />
                                                <BFormInvalidFeedback id="title-feedback"> Please provide a title.
                                                </BFormInvalidFeedback>
                                            </BCol>
                                        </BRow>
                                        <BRow class="pb-md-3 pb-lg-3 pb-sm-2 mr-2">
                                            <BCol cols="12">
                                                <div class="title-header">Author: </div>
                                                <BFormInput id="author" :state="authorState"
                                                    v-model="publishingContent.author" @focus="authorClicked = true" />
                                                <BFormInvalidFeedback id="author-feedback"> Please provide an author.
                                                </BFormInvalidFeedback>
                                            </BCol>
                                        </BRow>
                                    </BCol>
                                    <BCol cols="12" sm="12" md="4" lg="4" class="pt-2 pb-3">
                                        <div class="title-header">Upload Cover Image: </div>
                                        <BFormFile v-model="publishingContent['cover-img']" accept=".jpg, .jpeg, .png"
                                            class="file-input" :state="fileState" />
                                    </BCol>
                                </BRow>
                                <div v-if="route.params.category !== 'artworks'" class="card">
                                    <Editor v-model="publishingContent.file" editorStyle="height: 320px" />
                                </div>

                            </BFormGroup>
                        </BForm>
                    </BCard>
                </BCol>
            </BRow>
            <div v-if="route.params.category !== 'programs'" class="title-header my-3">Comments: </div>
            <BRow v-if="route.params.category !== 'programs'" class="mx-2">
                <BCol offset='1' cols="10">
                    <BCard id="comment-sections" bg-variant="light">
                        <div v-for="(comment, index) in publishingContent.comments" :class="{ 'mt-2': index !== 0 }"
                            :key="index">
                            <BRow class="comment-section" :id="`comment-${index}`">
                                <BCol lg="11" sm="12" md="10">
                                    <BCard>
                                        <BForm>
                                            <div class="title-header mb-1">Author: </div>
                                            <BFormInput id="comment-author" v-model="comment.author" />
                                            <div class="title-header mb-1">Response: </div>
                                            <BFormTextarea id="comment-content" v-model="comment.content" />
                                        </BForm>
                                    </BCard>
                                </BCol>
                                <BCol cols="1" lg="1" sm="2" md="1" offset-sm="10" offset="10" offset-md="0"
                                    offset-lg="0" class="flex-grow-1 del-btn mt-3 mt-sm-3 mt-md-0 mt-lg-0">
                                    <Button
                                        class="delete-comment-btn post-comment-btn p-button p-component btn btn-md btn-secondary px-0" icon="pi pi-minus"
                                        type="button" @click="deleteComment(index)">
                                    </Button>
                                </BCol>
                            </BRow>
                        </div>
                    </BCard>
                </BCol>
                <BCol cols="1" class="add-btn px-0">
                    <Button class="add-comment-btn post-comment-btn p-button p-component btn btn-md btn-secondary" icon="pi pi-plus px-0"
                        type="button" @click="addComment()">
                    </Button>
                </BCol>

            </BRow>
        </BContainer>
    </div>
</template>



<style scoped>
#nested-street {
    font-size: large;
    color: aqua;
    padding-left: 4%;
}

.publish-cancel-btn {
    width: fit-content;
    display: flex;
    justify-content: center;
}

.add-comment-btn{
    padding-left: 0px;
    padding-right: 0px;
}

.header-text {
    font-size: 1.5rem;
    font-weight: bold;
}

.title-header {
    font-size: medium;
    font-weight: bold;
}

.file-input {
    grid-row: span 4;
}

.add-btn {
    justify-content: center;
    display: flex;
    height: 40px;
}

.del-btn {
    justify-content: center;
    display: flex;
    height: 40px;
}
</style>
<style>
.post-comment-btn {
    .p-button-label {
        width: 0px;
        height: 0px;
        display: flex;
    }
}
</style>
