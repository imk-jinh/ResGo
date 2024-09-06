import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";
import MainPage from '../pages/MainPage.vue'
import SearchResult from '../pages/SearchResult.vue'
import SearchDetail from '../pages/SearchDetail.vue'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: MainPage
    },
    {
        path: '/result',
        component: SearchResult
    },
    {
        path: '/detail/:query',
        component: SearchDetail
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router