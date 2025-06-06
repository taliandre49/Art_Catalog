<script setup>
import { ref, watchEffect } from 'vue';
import fixtures from '@/fixtures';
import ToDoDialog from '@/components/TodoDialog.vue';
import TaskRow from '@/components/TaskRow.vue';
import { useRoute } from 'vue-router';
const route = useRoute();
var tasks = ref(fixtures.tasks);
const modalShown = ref(false);
const modalContent = ref({});
const modalFunction = ref("");

watchEffect(() => {
    tasks.value = fixtures['tasks'];
  var temp = {};
  if(route.query.search === 'no-result') {
    tasks.value = {};
    return;
  }
  if(route.query.search.length !== 0) {
    for (let key of route.query.search) {
      temp[key] = fixtures['tasks'][key];
    }
    tasks.value = temp;
  } else {
    tasks.value = fixtures['tasks'];
  }
});


function completeTask(task) {
    task.completed = !task.completed;
    tasks.value[task.id] = task;
}

function removeTask(task) {
    delete tasks.value[task.id];
}

function editTask(task) {
    modalFunction.value = "Edit";
    modalShown.value = !modalShown.value;
    modalContent.value = JSON.parse(JSON.stringify(task));;
}

function addTask() {
    modalFunction.value = "Add";
    var keys = Object.keys(tasks.value);
    var maxId = Math.max(...keys);
    var taskId = maxId + 1;
    modalShown.value = !modalShown.value;
    modalContent.value = {title: "", description: "", completed: false, id: taskId};
}

function saveTask(task) {
    if (modalFunction.value === "Edit") {
        tasks.value[task.id] = task;
    } else {
        tasks.value[task.id] = task;
    }
}

</script>

<template>
    <div class="content-body">
        <b-tabs content-class="mt-3" class="task-tabs">
            <b-tab title="Pending" active>
                <div v-if="route.query.search === 'no-result'">No results found.</div>
                <div v-for="(task, index) in tasks">
                    <TaskRow class="my-1 px-2" :key="index" :task="task" v-if="!task.completed" status="pending"
                        @complete="(item) => { completeTask(item) }" @edit="(item) => { editTask(item) }"
                        @remove="(item) => { removeTask(item) }" />
                </div>

            </b-tab>
            <b-tab title="Completed">
                <div v-if="route.query.search === 'no-result'">No results found.</div>
                <div v-for="(task, index) in tasks">
                    <TaskRow class="my-1 px-2" :key="index" :task="task" v-if="task.completed" status="completed"
                        @complete="(item) => { completeTask(item) }" @edit="(item) => { editTask(item) }"
                        @remove="(item) => { removeTask(item) }" />
                </div>
            </b-tab>

        </b-tabs>
        <b-button class="add-task-btn" variant="primary" @click="addTask">Add task</b-button>
        <BModal scrollable v-model="modalShown" id="modal-center" centered :title="`${modalFunction} Task`"
            okTitle="Save" @ok="saveTask(modalContent)" :ok-disabled="modalContent.title?.length === 0">
            <ToDoDialog :modalContent="modalContent"></ToDoDialog>
        </BModal>
    </div>
</template>
<style>
.task-tabs{
    position: relative;
    height: 80%;
}
.add-task-btn{
    position: fixed;
    right: 50px;
    background-color: #e0900d !important;
    border: 1px solid #e0900d;
    color: white;
}
.add-task-btn:hover,
.add-task-btn:active {
    position: fixed;
    right: 50px;
    background-color: #f1ae41 !important;
    border: 1px solid #f1ae41 !important;
    color: white !important;
}
.nav-link {
    height: 50px;
    width: 100px;
}
.tab-content{
    height: 80%;
}
.tab-pane{
    height: inherit;
    overflow-y: auto;
}
</style>
