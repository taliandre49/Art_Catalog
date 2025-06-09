import { createRouter, createWebHistory } from 'vue-router'
import ContactView from '@/views/ContactView.vue';
import DisplayView from '@/views/DisplayView.vue';
import ReadingView from '@/views/ReadingView.vue';
import ViewAllView from '@/views/ViewAllView.vue';
import ToDoView from '@/views/ToDoView.vue';
import PostView from '@/views/PostView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'contact',
      component: ContactView
    },
    {
      path: '/:type',
      name: 'display',
      component: DisplayView
    },
    {
      path: '/:type/:category/:url',
      name: 'display-reading',
      component: ReadingView
    },
    {
      path: '/view-all/:type/:category',
      name: 'display-all',
      component: ViewAllView
    },
    {
      path: '/todo',
      name: 'todo',
      component: ToDoView
    },

    {
      path: '/post/:type/:category/:url',
      name: 'post',
      component: PostView
    }
  ]
})

export default router
