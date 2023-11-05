<template>
  <div class="jumpy-bars">
    <div class="bar" id="bar1"></div>
    <div class="bar" id="bar2"></div>
    <div class="bar" id="bar3"></div>
    <div class="bar" id="bar4"></div>
    <div class="bar" id="bar5"></div>
    <div class="bar" id="bar6"></div>
    <div class="bar" id="bar7"></div>
  </div>
</template>
<script setup lang="ts">
defineOptions({ name: 'BarLoading'})
</script>
<style scoped>
.jumpy-bars {
  display: flex;
  justify-content: space-evenly;
  width: 4.5em;
  height: 3.5em;
  gap: 0.3em;
}
#bar1 {
  animation-delay: 0.2s;
}
#bar2 {
  animation-delay: 0.4s;
}
#bar3 {
  animation-delay: 0.6s;
}
#bar4 {
  animation-delay: 0.8s;
}
#bar5 {
  animation-delay: 1s;
}
#bar6 {
  animation-delay: 1.2s;
}
#bar7 {
  animation-delay: 1.5s;
}
.bar {
  width: 1em;
  height: auto;
  opacity: 0;
  background-color: gray;
  border-radius: 100%;
  animation: jumping-bars 1s linear infinite alternate-reverse;
}

@keyframes jumping-bars {
  0% {
    opacity: 1;
    transform: scaleY(0);
  }
  50% {
    opacity: 1;
    transform: scaleY(0.5);
  }
  100% {
    opacity: 1;
    transform: scaleY(1.8);
  }
}
</style>
