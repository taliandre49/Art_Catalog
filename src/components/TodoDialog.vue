<script setup>
import { ref, computed } from 'vue';
const props = defineProps({
    modalContent: Object
});
const titleClicked = ref(false);
const titleState = computed(() => titleClicked.value ? props.modalContent.title?.length > 0 : null);

</script>

<template>
    <div class="dialog-body">
        <BContainer fluid class="full-size">
            <BRow class="py-2 mx-2">
                <div class="dialog-header">Title: </div>
                <BCol><BFormInput id="title" :state="titleState" v-model="modalContent.title" maxlength="70" placeholder="Title for the task" @focus="titleClicked = true" />
                    <BFormInvalidFeedback id="title-feedback"> Please provide a title for the task </BFormInvalidFeedback>
                </BCol>
            </BRow>
            <BRow class="py-2 mx-2">
                <div class="descr-header">Description: </div>
                <BCol><BFormTextarea id="textarea-rows" no-resize rows="8" v-model="modalContent.description"/></BCol>
            </BRow>
        </BContainer>
    </div>

</template>
<style>
.modal-dialog {
    min-width: 60%!important;
}
.modal-content {
    width: 100%;
}
.dialog-header {
    font-weight: bold;
    font-size: large;
    align-items: center;
    display: flex;
}
.descr-header {
    font-weight: bold;
    font-size: large;
    display: flex;
}
.dialog-body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
}
</style>
