<script setup>
import ePub from 'epubjs';
import { ref, onMounted, watch, computed } from 'vue';
const props = defineProps({
    url: String,
    currentFontSize: Number
});
const book = ref(null);
const rendition = ref(null);
const viewer = ref(null);
const location = ref(null);
const isLastPage = computed(() => location.value && location.value.atEnd);
const isFirstPage = computed(() => location.value && location.value.atStart);

onMounted(() => {
    book.value = ePub(props.url);
    rendition.value = book.value.renderTo(viewer.value, {
        flow: "paginated",
        width: '100%',
        height: '100%',
    });
    rendition.value.on('relocated', (loc) => {
        location.value = loc;
    });
    rendition.value.display();
});

const next = () => {
    rendition.value.next();
};

const prev = () => {
    rendition.value.prev();
};

const updateFontSize = () => {
    rendition.value.themes.fontSize(`${props.currentFontSize}%`);
};

watch(() => props.currentFontSize, updateFontSize);

</script>

<template class="epub">
    <div class="controls prev">
        <!-- <Button class="epub-nav-button" @click="prev"><i class="pi pi-angle-left"
                style="font-size: 2.5rem"></i></Button> -->
        <Button class="reading-nav-btn" icon="pi pi-angle-left" severity="secondary" rounded outlined aria-label="Prev" @click="prev" :disabled="isFirstPage"/>
    </div>
    <div ref="viewer" class="epub-viewer"></div>
    <div class="controls next">
        <Button class="reading-nav-btn" icon="pi pi-angle-right" severity="secondary" rounded outlined aria-label="Prev" @click="next" :disabled="isLastPage"/>
    </div>
</template>



<style>
.reading-nav-btn {
    .p-button-icon {
    font-size: 2.5rem !important;
}
}
.epub {
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    justify-content: center;
}

.epub-nav-button {
    border: none;
    background: transparent;
}

.epub-viewer {
    width: 60%;
    height: 90%;
    flex-grow: 1;
    border: 1px solid #ccc;
}

.controls {
    display: flex;
    align-items: center;
    justify-content: center;
}

.controls.prev {
    border: none;
    .p-button {
        border: none;
    }
}

.controls.next {
    border: none;
    .p-button {
        border: none;
    }
}
</style>
