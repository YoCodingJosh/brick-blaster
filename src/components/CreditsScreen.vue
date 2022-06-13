<template>
  <div>
    <header>
      <a href="#" class="backButton" @click.prevent="backButtonClicked()">
        <h3>&lt; Back</h3>
      </a>
      <h1>Credits!</h1>
    </header>
    <main>
      <div class="credit">
        <p>This game is open source! View the code on <a href="https://github.com/YoCodingJosh/brick-blaster" target="_blank">GitHub</a></p>
      </div>
      <div class="credit">
        <h3>Programming, Design, and Art</h3>
        <p>Josh Kennedy</p>
      </div>
      <div class="credit">
        <h3>Technologies Used:</h3>
        <ul>
          <li><a href="https://vuejs.org/" target="_blank">Vue.js</a></li>
          <li><a href="https://simplecss.org/" target="_blank">simple.css</a></li>
        </ul>
      </div>
      <div class="credit">
        <h3>License</h3>
        <p>
          <pre>
MIT License

Copyright (c) 2022 Josh Kennedy

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
          </pre>
        </p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useGameStateStore } from '../stores/game-state';

const gameStateStore = useGameStateStore();

function backButtonClicked() {
  gameStateStore.goToMainMenu();
}
</script>

<style scoped>
.backButton {
  text-decoration: none;
}

header {
  padding-top: 25px;
}

header h3 {
  display: inline;
}

header h1 {
  display: inline;
  margin-left: 50px;
}

.credit h3 {
  margin-bottom: 10px;
}

.credit p {
  margin: 0;
}

.credit ul {
  margin: 0;
}

.credit pre {
  white-space: pre-wrap;
  font-size: smaller;
}
</style>
