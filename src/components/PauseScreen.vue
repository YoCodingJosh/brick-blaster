<template>
  <div>
    <div class="fadeMe"></div>
    <div class="pauseMenu">
      <h2 class="flipY">Paused</h2>
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

/* flipY class and keyframes*/
.flipY {
  animation-name: spin, depth;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-duration: 3s;
}

@keyframes spin {
  0% {
    transform: rotateY(0deg);
  }

  100% {
    transform: rotateY(-360deg);
  }
}

@keyframes depth {
  0% {
    text-shadow: 0 0 white;
  }

  25% {
    text-shadow: 1px 0 white, 2px 0 white, 3px 0 white, 4px 0 white, 5px 0 white;
  }

  50% {
    text-shadow: 0 0 white;
  }

  75% {
    text-shadow: -1px 0 white, -2px 0 white, -3px 0 white, -4px 0 white,
      -5px 0 white;
  }

  100% {
    text-shadow: 0 0 white;
  }
}

@media (prefers-color-scheme: light) {
  .pauseMenu {
    background: lightgray;
  }

  @keyframes depth {
    0% {
      text-shadow: 0 0 black;
    }

    25% {
      text-shadow: 1px 0 black, 2px 0 black, 3px 0 black, 4px 0 black, 5px 0 black;
    }

    50% {
      text-shadow: 0 0 black;
    }

    75% {
      text-shadow: -1px 0 black, -2px 0 black, -3px 0 black, -4px 0 black,
        -5px 0 black;
    }

    100% {
      text-shadow: 0 0 black;
    }
  }
}
</style>
