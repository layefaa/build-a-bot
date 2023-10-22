<script>
import parts from '@/data/parts';
import { toCurrency } from '@/shared/formatter';

function getNextValidIndex(index, length) {
  const incrementedIndex = index + 1;
  return incrementedIndex > length - 1 ? 0 : incrementedIndex;
}

function getPrevValidIndex(index, length) {
  const incrementedIndex = index - 1;
  return incrementedIndex < 0 ? length - 1 : incrementedIndex;
}

export default {
  name: 'RobotBuilder',
  data() {
    return {
      availableParts: parts,
      selectedHeadIndex: 0,
      selectedTorsoIndex: 0,
      selectedBaseIndex: 0,
      selectedLeftArmIndex: 0,
      selectedRightArmIndex: 0,
      cart: [],
    };
  },
  methods: {
    toCurrency,
    addToCart() {
      const robot = this.selectedRobot;
      const cost = robot.head.cost +
        robot.left.cost +
        robot.right.cost +
        robot.base.cost +
        robot.torso.cost;
      this.cart.push({ ...robot, cost });
    },
    selectNextHead() {
      this.selectedHeadIndex = getNextValidIndex(this.selectedHeadIndex, parts.heads.length);
    },
    selectPrevHead() {
      this.selectedHeadIndex = getPrevValidIndex(this.selectedHeadIndex, parts.heads.length);
    },
    selectNextTorso() {
      this.selectedTorsoIndex = getNextValidIndex(this.selectedTorsoIndex, parts.torsos.length);
    },
    selectPrevTorso() {
      this.selectedTorsoIndex = getPrevValidIndex(this.selectedTorsoIndex, parts.torsos.length);
    },
    selectNextBase() {
      this.selectedBaseIndex = getNextValidIndex(this.selectedBaseIndex, parts.bases.length);
    },
    selectPrevBase() {
      this.selectedBaseIndex = getPrevValidIndex(this.selectedBaseIndex, parts.bases.length);
    },
    selectNextLeftArm() {
      this.selectedLeftArmIndex = getNextValidIndex(this.selectedLeftArmIndex, parts.arms.length);
    },
    selectPrevLeftArm() {
      this.selectedLeftArmIndex = getPrevValidIndex(this.selectedLeftArmIndex, parts.arms.length);
    },
    selectNextRightArm() {
      this.selectedRightArmIndex = getNextValidIndex(this.selectedRightArmIndex, parts.arms.length);
    },
    selectPrevRightArm() {
      this.selectedRightArmIndex = getPrevValidIndex(this.selectedRightArmIndex, parts.arms.length);
    },

  },
  computed: {
    selectedRobot() {
      return {
        head: this.availableParts.heads[this.selectedHeadIndex],
        left: this.availableParts.arms[this.selectedLeftArmIndex],
        right: this.availableParts.arms[this.selectedRightArmIndex],
        torso: this.availableParts.torsos[this.selectedTorsoIndex],
        base: this.availableParts.bases[this.selectedBaseIndex],
      };
    },
  },
};

</script>

<template>
  <div class="content">
    <button class="add-to-cart" @click="addToCart">Add to Cart</button>
    <div class="top-row">

      <div class="top part">
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
</style>
