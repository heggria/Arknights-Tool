import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const state = {
    enemyData:{
        'maxHp': 10000,
        'atk': 1000,
        'baseAttackTime': 2,
        'atkTimes': 1,
        'def': 200,
        'magicResistance': 40,
        'moveSpeed': 1,
        'hpRecoveryPerSec': 0,
        'massLevel': 0,
        'magicAtk': false,
        'stunImmune': true,
        'silenceImmune': true,
    }
};
const getters = {
    getEnemyData() {  //承载变化的changebleNum的值
        return state.enemyData
    }
};
const mutations = {
    newEnemyData(state, enemyData) { //同上，这里面的参数除了state之外还传了需要增加的值sum
        state.enemyData = enemyData;
    }
};
const actions = {
    setNewEnemyData(context, num) {   //同上注释，num为要变化的形参
        context.commit('newEnemyData', num)
    }
};
const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});

export default store;