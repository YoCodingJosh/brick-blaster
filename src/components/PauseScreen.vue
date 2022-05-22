<template>
  <div>
    <div class="fadeMe"></div>
    <div class="pauseMenu">
      <h2>Paused</h2>
      <ul class="menuList">
        <li><a href="#" @click.prevent="props.resumeGameFunction!()">Resume</a></li>
        <li><a href="#" @click.prevent="props.mainMenuFunction!()">Quit Game</a></li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  resumeGameFunction: Function,
  mainMenuFunction: Function,
});
</script>

<style scoped>
.fadeMe {
  opacity: 0.5;
  background: #000;
  width: 100%;
  height: 100%;
  z-index: 10;
  top: 0;
  left: 0;
  position: fixed;
}

.pauseMenu {
  position: fixed;
  left: 50%;
  top: 50%;
  width: 400px;
  height: 300px;
  margin-left: -200px;
  margin-top: -150px;
  background: darkslategray;
  border-radius: 10px;
  padding: 10px;
  z-index: 11;
}

.pauseMenu h2 {
  text-align: center;
  margin-top: 15px;
}

.menuList {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.menuList li {
  padding-bottom: 15px;
}

.menuList li a {
  text-decoration: none;
  font-size: xx-large;
}

.menuList li a:hover {
  color: violet;
}
</style>
