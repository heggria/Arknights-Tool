import Vue from 'vue'
import Router from 'vue-router'

//组件模块
import character from './components/character'
import skill from './components/skill'
import test from './components/test'
import enemy from './components/enemy'
import data from './components/data'
import battleSetting from './components/battleSetting'
import lineChart from './components/draw/lineChart'
import test2 from './components/test2'

Vue.use(Router)

export default new Router({
    routes: [
        { path: '/character', name: 'character', component: character },
        { path: '/skill', name: 'skill', component: skill },
        { path: '/test', name: 'test', component: test },
        { path: '/enemy', name: 'enemy', component: enemy },
        { path: '/data', name: 'data', component: data },
        { path: '/battleSetting', name: 'battleSetting', component: battleSetting },
        { path: '/lineChart', name: 'lineChart', component: lineChart },
        { path: '/test2', name: 'test2', component: test2 },
    ]
})