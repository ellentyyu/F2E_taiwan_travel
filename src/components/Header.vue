<template>
  <nav class="navbar navbar-expand-md position-fixed" :class="{'open-bg':isShow && !isPC}">
    <div class="container-fluid px-4 px-sm-5 px-md-8">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" @click="isShow=!isShow">
        <i class="fa-solid fa-bars" v-if="!isShow"></i>
        <i class="fa-solid fa-xmark" v-else></i>
      </button>
      <a class="navbar-brand" href="#">TAIWAN TRAVEL</a>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" :href="`#/spots?county=Taipei&page=1`">景點查詢</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#/restaurants?county=Tainan">美食推薦</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#/hotels?county=Taichung">旅宿資訊</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref } from 'vue';
export default {
  setup() {
    const isShow = ref(false);
    const isPC = ref(true);
    const handleWidth = () => {
      if(screen.width >= 768){
        isPC.value = true;
      }else{
        isPC.value = false;
      }
    }
    // created
    window.addEventListener("resize", handleWidth);
    return{
      isShow,
      isPC
    }
  }
}
</script>