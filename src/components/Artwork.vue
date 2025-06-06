<!-- ArtModal.vue -->
<template>
    <div class="modal" @click.self="$emit('close')">
      <div class="modal-content">
        <button class="close-btn" @click="$emit('close')">Close</button>
        <img :src="artCover" alt="Artwork">
        <p>{{ artTitle }} by {{ artAuthor }}</p>
      </div>
    </div>
  </template>

  <script setup>

  const { artTitle, artAuthor, artCover } = defineProps(['artTitle', 'artAuthor', 'artCover']);
  </script>

  <style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
  }

  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
  </style>
