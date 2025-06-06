<script setup>
import { ref } from 'vue';
defineProps({
    task: Object,
    status: String
});
</script>
<template>
    <BContainer fluid class="full-size ">
        <BRow class="task-row py-2 mx-2">
            <BCol cols="9 d-flex align-items-center">
                <BAccordionItem :title="task.title">
                    <p>{{ task.description }}</p>
                </BAccordionItem>
            </BCol>
            <BCol cols="3" class="d-flex justify-content-end">
                <BButton v-if="status==='pending'" class="complete task mx-1" :pressed="false" @click="$emit('complete', task)" variant="success">
                    <i class="pi pi-check"></i>
                </BButton>
                <BButton v-if="status==='completed'" class="remove task mx-1" :pressed="false" @click="$emit('complete', task)"  variant="warning"><i
                        class="pi pi-undo warning"></i></BButton>
                <BButton class="remove task mx-1" :pressed="false" @click="$emit('remove', task)" variant="danger"><i
                        class="pi pi-trash"></i></BButton>
                <BButton class="edit task mx-1" :pressed="false" @click="$emit('edit', task)" variant="info"><i
                        class="pi pi-pencil edit"></i></BButton>
            </BCol>
        </BRow>
    </BContainer>
</template>

<style>
.task {
    border-radius: 50% !important;
    height: 37px;
    width: 40px;
    justify-content: center !important;
    display: flex !important;
    align-items: center !important;

    .p-button-label {
        height: 0px !important;
        width: 0px !important;
        display: flex;
    }
}

.complete {
    background: #0e9d6e;
    color: white;
    border: none;
}

.accordion-button {
    font-weight: 700 !important;
    font-size: large !important;
}

.accordion-body {
    padding-top: 10px !important;
}

.warning {
    color: grey;
}

.edit {
    color: white;
}

.btn-info {
    background-color: #9b74c7 !important;
    border: none !important;
}

.btn-info:hover {
    background-color: #7948b2 !important;
}

.btn-info:active {
    background-color: #7948b2 !important;
}

.task-row {
    background-color: #dedbd6;
    border-radius: 10px;
}

.accordion-button:hover {
    color: #6a6c6d !important;
    /* Change to the color you want when hovered over */
}
</style>
