<template>
  <div class="scroll-top position-fixed">
    <a href="#" class="fa-solid fa-arrow-up-long scroll-top-arrow fs-s text-center text-white" @click.prevent="scrollTop"></a>
  </div>
</template>
<script>
export default {
  setup() {
    const scrollTop = () => {
        window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
    return{
      scrollTop
    }
  }
}
</script>