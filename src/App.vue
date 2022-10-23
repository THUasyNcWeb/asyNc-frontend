<template>
  <body>
    <n-message-provider>
      <router-view />
    </n-message-provider>
  </body>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from './components/HelloWorld.vue';
import { NMessageProvider } from 'naive-ui';

@Options({
  components: {
    HelloWorld,
    NMessageProvider,
  },
})
export default class App extends Vue {}
</script>

<!-- <style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #504f2c;
}
</style> -->
