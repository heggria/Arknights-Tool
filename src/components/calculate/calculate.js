/* eslint-disable */
/*
    function:计算最终攻击力
    props:基础攻击力，友方技能最终攻击力，+A%攻击/数组，造成相当于B%攻击力的伤害，攻击力提升至C%攻击力的伤害
    return:最终攻击力
*/
function countAtk(base_atk, friend_atk, atk_plus, atk_multiply, atk_finally_multiply) {
  let final_atk = 0;
  let atk_plus_sum = sum(atk_plus);
  final_atk = (base_atk * (1 + atk_plus_sum) + friend_atk) * atk_multiply * atk_finally_multiply
  return final_atk >= 0 ? final_atk : 0;
}
/*
    function:计算最终攻击间隔
    props:基础攻击间隔，攻速加成/数组，间隔减少数/数组
    return:最终攻击间隔
*/
function countAtkInterval(base_atk_interval, atk_speed_plus, attack_interval_plus) {
  let final_atk_interval = 0;
  let atk_speed_sum = sum(atk_speed_plus);
  if (100 + atk_speed_sum < 10) atk_speed_sum = 10;
  if (100 + atk_speed_sum > 600) atk_speed_sum = 600;
  let attack_interval_sum = sum(attack_interval_plus);
  if (base_atk_interval + attack_interval_sum <= 0) attack_interval_sum = 0.01 - base_atk_interval;
  //console.log(atk_speed_sum,attack_interval_sum)
  final_atk_interval = 1 / (((100 + atk_speed_sum) / (base_atk_interval + attack_interval_sum)) / 100);
  return final_atk_interval;
}
/*
    function:计算最终防御
    props:基础防御，-A防御/数组，-B%防御/数组
    return:最终防御
*/
function countDef(base_def, def_plus, def_plus_per) {
  let final_def = 0;
  let def_plus_sum = sum(def_plus);
  let def_plus_per_multiply = multiply(def_plus_per);
  //console.log(final_def+def_plus_sum, def_plus_per_multiply)
  base_def = (base_def + def_plus_sum) * def_plus_per_multiply;
  return base_def >= 0 ? base_def : 0;
}
/*
    function:计算最终防御
    props:基础防御，-A防御/数组，-B%防御/数组
    return:最终防御
*/
function countSpellR(spellR, spellRPlus, spellRPlusPer) {
  let finalSpellR = 0;
  let spellRPlusSum = sum(spellRPlus);
  let spellRPlusPerMultiply = multiply(spellRPlusPer);
  //console.log(final_def+def_plus_sum, def_plus_per_multiply)
  finalSpellR = (spellR + spellRPlusSum) * spellRPlusPerMultiply;
  return finalSpellR >= 0 ? (finalSpellR <= 100 ? finalSpellR : 100) : 0;
}
/*
    function:计算单次攻击过程最终伤害
    props:攻击类型，攻击，防御，法抗，物理易伤，法术易伤
    return:伤害
*/
function countHurt(magicAtk, atk, def, spellR, phySuscep, spellSuscep) {
  let hurt = 0;
  if (magicAtk === false) {
    let suscepMultiply = multiply(phySuscep);
    hurt = (atk - def) > (atk * 0.05) ? (atk - def) * suscepMultiply : (atk * 0.05) * suscepMultiply;
  }
  else if (magicAtk === true) {
    let suscepMultiply = multiply(spellSuscep);
    hurt = spellR < 95 ? (100 - spellR) / 100 * atk * suscepMultiply : (atk * 0.05) * suscepMultiply;
  }
  return hurt;
}
/*
    function:单次攻击过程
    props:攻击方，防御方
    return:攻击方与防御方对象
*/
function atkAction(a, d) {
  let hurt = countHurt(a.magicAtk, a.atk, d.def, d.magicResistance, [0], [0]);
  if (hurt >= d.maxHp) {
    d.maxHp = 0;
    //死亡
    return { atkP: a, defP: d }
  } else {
    //未死亡
    d.maxHp -= hurt;
    return { atkP: a, defP: d }
  }
}
/*
    function:攻击前生效的效果
    props:对象
    return:对象
*/
function beforeAtk(atkP) {
}
/*
    function:攻击后生效的效果
    props:对象
    return:对象
*/
function afterAtk(atkP) {
}
function sum(x) {
  let s = 0;
  for (let i in x) {
    s += x[i];
  }
  return s;
}
function multiply(x) {
  let s = 1;
  for (let i in x) {
    s *= 1 + x[i];
  }
  return s;
}
function clone(obj){
  return JSON.parse(JSON.stringify(obj));
}
export {
  atkAction,
  countAtk,
  countAtkInterval,
  countDef,
  countHurt,
  countSpellR,
  clone,
}