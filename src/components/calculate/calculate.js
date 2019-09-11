/* eslint-disable */
/*
    function:计算最终攻击力
    props:基础攻击力，友方技能最终攻击力，+A%攻击/数组，造成相当于B%攻击力的伤害，攻击力提升至C%攻击力的伤害
    return:最终攻击力
*/
function countAtk(base_atk, friend_atk, atk_plus, atk_multiply, atk_finally_multiply) {
    let final_atk = 0;
    let atk_plus_sum = 0;
    for (let i in atk_plus) {
        atk_plus_sum += atk_plus[i];
    }
    final_atk = (base_atk * (1 + atk_plus_sum) + friend_atk) * atk_multiply * atk_finally_multiply
    return final_atk;
}
/*
    function:计算最终攻击间隔
    props:基础攻击间隔，攻速加成/数组，间隔减少数/数组
    return:最终攻击间隔
*/
function countAtkInterval(base_atk_interval, atk_speed_plus, attack_interval_plus) {
    let final_atk_interval = 0;
    let atk_speed_sum = 0;
    let attack_interval_sum = 0;
    for (let i in atk_speed_plus) {
        atk_speed_sum += atk_speed_plus[i];
    }
    for (let i in attack_interval_plus) {
        attack_interval_sum += attack_interval_plus[i];
    }
    console.log(atk_speed_sum,attack_interval_sum)
    final_atk_interval = 1/(((100+atk_speed_sum)/(base_atk_interval+attack_interval_sum))/100);
    return final_atk_interval;
}
/*
    function:计算最终防御
    props:基础防御，-A防御/数组，-B%防御/数组
    return:最终防御
*/
function countDef(base_def, def_, attack_interval_plus) {
    let final_atk_interval = 0;
    let atk_speed_sum = 0;
    let attack_interval_sum = 0;
    for (let i in atk_speed_plus) {
        atk_speed_sum += atk_speed_plus[i];
    }
    for (let i in attack_interval_plus) {
        attack_interval_sum += attack_interval_plus[i];
    }
    console.log(atk_speed_sum,attack_interval_sum)
    final_atk_interval = 1/(((100+atk_speed_sum)/(base_atk_interval+attack_interval_sum))/100);
    return final_atk_interval;
}
export{
    countAtk,
    countAtkInterval
}