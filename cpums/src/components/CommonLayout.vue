<template>
  <div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <BottonNav/>
  </div>
</template>

<script>
import BottonNav from "./BottonNav.vue";
export default {
  name:'CommonLayout',
  components: { BottonNav },
};
</script>

