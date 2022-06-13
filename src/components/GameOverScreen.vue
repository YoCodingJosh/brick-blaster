<template>
  <div>
    <div class="fadeMe"></div>
    <div class="gameOverMenu">
      <h2 class="pop-outin">Game Over!</h2>
      <ul class="menuList">
        <li><a href="#" @click.prevent="props.restartGameFunction!()">Restart</a></li>
        <li><a href="#" @click.prevent="props.mainMenuFunction!()">Back to Main Menu</a></li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  restartGameFunction: Function,
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

.gameOverMenu {
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

.gameOverMenu h2 {
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

/* subtle zoom to attention and then back */
.pop-outin {
  animation: 2s anim-popoutin ease;
}

@keyframes anim-popoutin {
  0% {
    color: white;
    transform: scale(0);
    opacity: 0;
    text-shadow: 0 0 0 rgba(0, 0, 0, 0);
  }

  25% {
    color: orange;
    transform: scale(2);
    opacity: 1;
    text-shadow: 3px 10px 5px rgba(0, 0, 0, 0.5);
  }

  50% {
    color: red;
    transform: scale(1);
    opacity: 1;
    text-shadow: 1px 0 0 rgba(0, 0, 0, 0);
  }

  100% {
    /* animate nothing to add pause at the end of animation */
    transform: scale(1);
    opacity: 1;
    text-shadow: 1px 0 0 rgba(0, 0, 0, 0);
  }
}

@media (prefers-color-scheme: light) {
  .gameOverMenu {
    background: lightgray;
  }

  @keyframes anim-popoutin {
    0% {
      color: black;
      transform: scale(0);
      opacity: 0;
      text-shadow: 0 0 0 rgba(0, 0, 0, 0);
    }

    25% {
      color: orange;
      transform: scale(2);
      opacity: 1;
      text-shadow: 3px 10px 5px rgba(0, 0, 0, 0.5);
    }

    50% {
      color: red;
      transform: scale(1);
      opacity: 1;
      text-shadow: 1px 0 0 rgba(0, 0, 0, 0);
    }

    100% {
      /* animate nothing to add pause at the end of animation */
      transform: scale(1);
      opacity: 1;
      text-shadow: 1px 0 0 rgba(0, 0, 0, 0);
    }
  }
}
</style>
