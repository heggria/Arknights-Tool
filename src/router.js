import Vue from 'vue'
import Router from 'vue-router'

//组件模块
import character from './components/character'
import skill from './components/skill'
import test from './components/test'
import enemy from './components/part/enemy'

Vue.use(Router)

export default new Router({
    routes: [
        { path: '/', name: 'character', component: character },
        { path: '/character', name: 'character', component: character },
        { path: '/skill', name: 'skill', component: skill },
        { path: '/test', name: 'test', component: test },
        { path: '/enemy', name: 'enemy', component: enemy },
    ]
})