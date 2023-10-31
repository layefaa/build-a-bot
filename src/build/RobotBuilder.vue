<script setup>
import { computed, ref } from 'vue';
import useCartStore from '@/stores/cartStore';
import usePartsStore from '@/stores/partsStore';
import PartSelector from '@/build/PartSelector.vue';
import CollapsibleSection from '@/shared/CollapsibleSection.vue';

const cartStore = useCartStore();
const partsStore = usePartsStore();

const selectedRobot = ref({
  head: {},
  left: {},
  right: {},
  torso: {},
  base: {},
});

console.log(partsStore.parts);
partsStore.getParts();

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
  cartStore.cart.push({ ...robot, cost });
};
</script>

<template>
  <div class="content" v-if="partsStore.part">
    <div class="preview">
      <CollapsibleSection>
        <div class="preview-content">
          <div class="top-row">
            <img :src="selectedRobot.head.imageUrl" alt="part" />
          </div>
          <div class="middle-row">
            <img :src="selectedRobot.left.imageUrl" alt="part" class="rotate-left" />
            <img :src="selectedRobot.torso.imageUrl" alt="part" />
            <img :src="selectedRobot.right.imageUrl" alt="part" class="rotate-right" />
          </div>
          <div class="bottom-row">
            <img :src="selectedRobot.base.imageUrl" alt="part" />
          </div>
        </div>
      </CollapsibleSection>

      <button class="add-to-cart" @click="addToCart">Add to Cart</button>
    </div>
    <div class="top-row">

      <div :class="[classOnSale, 'top', 'part']">
        <div class="robot-name">
          {{ selectedRobot.head.title }}
          <span class="sale" v-if="selectedRobot.head.onSale">
            Sale!
          </span>
        </div>
        <PartSelector :parts="partsStore.part.heads" position="top"
                      @partSelected="part => selectedRobot.head = part"/>
      </div>
    </div>
    <div class="middle-row">
      <PartSelector :parts="partsStore.part.arms" position="left"
                    @partSelected="part => selectedRobot.left = part"/>
      <PartSelector :parts="partsStore.part.torsos" position="center"
                    @partSelected="part => selectedRobot.torso = part"/>
      <PartSelector :parts="partsStore.part.arms" position="right"
                    @partSelected="part => selectedRobot.right = part"/>
    </div>
    <div class="bottom-row">
      <PartSelector :parts="partsStore.part.bases" position="bottom"
                    @partSelected="part => selectedRobot.base = part"/>
    </div>
  </div>
</template>

<style scoped>
.preview {
  position: absolute;
  top: -20px;
  right: 0;
  width: 310px;
  height: 310px;
  padding: 5px;
}

.preview-content {
  border: 1px solid #999;
}

.preview img {
  width: 70px;
  height: 70px;
}

.rotate-right {
  transform: rotate(90deg);
}

.rotate-left {
  transform: rotate(-90deg);
}
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
  width: 310px;
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
