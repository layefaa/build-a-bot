<script setup>
import parts from '@/data/parts';
import { toCurrency } from '@/shared/formatter';
import { computed, ref } from 'vue';

const availableParts = parts;
const selectedHeadIndex = ref(0);
const selectedTorsoIndex = ref(0);
const selectedBaseIndex = ref(0);
const selectedLeftArmIndex = ref(0);
const selectedRightArmIndex = ref(0);
const cart = ref([]);

function getNextValidIndex(index, length) {
  const incrementedIndex = index + 1;
  return incrementedIndex > length - 1 ? 0 : incrementedIndex;
}
function getPrevValidIndex(index, length) {
  const incrementedIndex = index - 1;
  return incrementedIndex < 0 ? length - 1 : incrementedIndex;
}

const selectedRobot = computed(() => ({
  head: availableParts.heads[selectedHeadIndex.value],
  left: availableParts.arms[selectedLeftArmIndex.value],
  right: availableParts.arms[selectedRightArmIndex.value],
  torso: availableParts.torsos[selectedTorsoIndex.value],
  base: availableParts.bases[selectedBaseIndex.value],
}));

const classOnSale = computed(() => (
  selectedRobot.value.head.onSale ? 'onSale' : ''
));

const addToCart = () => {
  const robot = selectedRobot.value;
  const cost = robot.head.cost +
    robot.left.cost +
    robot.right.cost +
    robot.base.cost +
    robot.torso.cost;
  cart.value.push({ ...robot, cost });
};
const selectNextHead = () => {
  selectedHeadIndex.value = getNextValidIndex(selectedHeadIndex.value, parts.heads.length);
};
const selectPrevHead = () => {
  selectedHeadIndex.value = getPrevValidIndex(selectedHeadIndex.value, parts.heads.length);
};
const selectNextTorso = () => {
  selectedTorsoIndex.value = getNextValidIndex(selectedTorsoIndex.value, parts.torsos.length);
};
const selectPrevTorso = () => {
  selectedTorsoIndex.value = getPrevValidIndex(selectedTorsoIndex.value, parts.torsos.length);
};
const selectNextBase = () => {
  selectedBaseIndex.value = getNextValidIndex(selectedBaseIndex.value, parts.bases.length);
};
const selectPrevBase = () => {
  selectedBaseIndex.value = getPrevValidIndex(selectedBaseIndex.value, parts.bases.length);
};
const selectNextLeftArm = () => {
  selectedLeftArmIndex.value = getNextValidIndex(selectedLeftArmIndex.value, parts.arms.length);
};
const selectPrevLeftArm = () => {
  selectedLeftArmIndex.value = getPrevValidIndex(selectedLeftArmIndex.value, parts.arms.length);
};
const selectNextRightArm = () => {
  selectedRightArmIndex.value = getNextValidIndex(selectedRightArmIndex.value, parts.arms.length);
};
const selectPrevRightArm = () => {
  selectedRightArmIndex.value = getPrevValidIndex(selectedRightArmIndex.value, parts.arms.length);
};

</script>

<template>
  <div class="content">
    <button class="add-to-cart" @click="addToCart">Add to Cart</button>
    <div class="top-row">

      <div :class=[classOnSale,'top','part']>
        <div class="robot-name">
          {{ selectedRobot.head.title }}
          <span class="sale" v-if="selectedRobot.head.onSale">
            Sale!
          </span>
        </div>
        <img alt="head" :src="availableParts.heads[selectedHeadIndex].imageUrl"/>
        <button @click="selectPrevHead" class="prev-selector">&#9668;</button>
        <button @click="selectNextHead" class="next-selector">&#9658;</button>
      </div>
    </div>
    <div class="middle-row">
      <div class="left part">
        <img alt="left arm" :src="availableParts.arms[selectedLeftArmIndex].imageUrl"/>
        <button @click="selectPrevLeftArm" class="prev-selector">&#9650;</button>
        <button @click="selectNextLeftArm" class="next-selector">&#9660;</button>
      </div>
      <div class="center part">
        <img alt="torso" :src="availableParts.torsos[selectedTorsoIndex].imageUrl"/>
        <button @click="selectPrevTorso" class="prev-selector">&#9668;</button>
        <button @click="selectNextTorso" class="next-selector">&#9658;</button>
      </div>
      <div class="right part">
        <img alt="right arm" :src="availableParts.arms[selectedRightArmIndex].imageUrl"/>
        <button @click="selectPrevRightArm" class="prev-selector">&#9650;</button>
        <button @click="selectNextRightArm" class="next-selector">&#9660;</button>
      </div>
    </div>
    <div class="bottom-row">
      <div class="bottom part">
        <img alt="base" :src="availableParts.bases[selectedBaseIndex].imageUrl"/>
        <button @click="selectPrevBase" class="prev-selector">&#9668;</button>
        <button @click="selectNextBase" class="next-selector">&#9658;</button>
      </div>
    </div>
  </div>
  <div>
    <h1>Cart</h1>
    <table>
      <thead>
      <tr>
        <th>Robot</th>
        <th>Cost</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(robot,index) in cart" :key="index">
        <td>{{ robot.head.title }}</td>
        <td>{{ toCurrency(robot.cost) }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.part {
  position: relative;
  width: 200px;
  height: 200px;
  border: 3px solid #aaa;
}

.part img {
  width: 200px;
}

.top-row {
  display: flex;
  justify-content: space-around;
}

.middle-row {
  display: flex;
  justify-content: center;
}

.bottom-row {
  display: flex;
  justify-content: space-around;
  border-top: none;
}

.top {
  border-bottom: none;
}

.left {
  border-right: none;
}

.right {
  border-left: none;
}

.left img {
  transform: rotate(-90deg);
}

.right img {
  transform: rotate(90deg);
}

.bottom {
  border-top: none;
}

.prev-selector {
  position: absolute;
  z-index: 1;
  top: -3px;
  left: -28px;
  width: 25px;
  height: 206px;
}

.next-selector {
  position: absolute;
  z-index: 1;
  top: -3px;
  right: -28px;
  width: 25px;
  height: 206px;
}

.center .prev-selector,
.center .next-selector {
  opacity: 0.8;
}

.left .prev-selector {
  top: -28px;
  left: -3px;
  width: 179px;
  height: 25px;
}

.left .next-selector {
  top: auto;
  bottom: -28px;
  left: -3px;
  width: 179px;
  height: 25px;
}

.right .prev-selector {
  top: -28px;
  left: 24px;
  width: 179px;
  height: 25px;
}

.right .next-selector {
  top: auto;
  bottom: -28px;
  left: 24px;
  width: 179px;
  height: 25px;
  right: -3px;
}

.robot-name {
  position: absolute;
  text-align: center;
  top: -20px;
  width: 100%;
}

.sale {
  color: red;
}

.content {
  position: relative;

}

.add-to-cart {
  position: absolute;
  right: 30px;
  width: 220px;
  padding: 3px;
  font-size: 16px;
}

th, td {
  text-align: left;
  padding: 5px;
  padding-right: 20px;
}

.cost {
  text-align: right;
}

.onSale {
  border: 3px solid red;
}
</style>
