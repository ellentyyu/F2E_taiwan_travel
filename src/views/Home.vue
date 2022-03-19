<template>
  <Header class="transparent-white"></Header>
  <section class="home-banner position-relative">
    <div class="vh-100 bg-cover banner-img px-5 pb-3 pb-md-7" :style="{ backgroundImage: 'url(' + require('@/assets/images/banner01.jpg') + ')' }">
      <img src="@/assets/images/taiwan_logo_white.svg" class="tw-logo" alt="taiwan travel logo">
      <form action="" class="home-form">
        <select class="form-select me-md-3" aria-label="Default select example" v-model="areaSelected">
          <option value="North">北部地區</option>
          <option value="Central">中部地區</option>
          <option value="South">南部地區</option>
          <option value="East">東部地區</option>
          <option value="Islands">離島地區</option>
        </select>
        <select class="form-select me-md-4" aria-label="Default select example" v-model="countySelected">
          <option v-for="item in countiesList" :key="item.en" :value="item.en">{{item.ch}}</option>
        </select>
        <button type="button" class="btn btn-gold font-en fs-s px-3" @click="goSearch">SEARCH</button>
      </form>
    </div>
    <div class="shade-layer"></div>
  </section>
</template>

<script>
// @ is an alias to /src
 import Header from '@/components/Header'
 import { watch } from 'vue';
 import { useRouter, useRoute } from 'vue-router' 
 import locationsData from '@/methods/locationsData'; 
export default {
  components: {
    Header
  },
  setup() {
    // 路由
    const router = useRouter()
    const route = useRoute()
    // 縣市
    const { areaSelected, countiesList, countySelected} = locationsData();
    watch(countiesList, (val) => {
      let [first] = val;
      countySelected.value = first.en;
    })
    //搜尋
    const goSearch = () => {
      console.log(123);
      router.push(`/spots?county=${countySelected.value}&page=1`);
    }
    return{
      areaSelected,
      countiesList,
      countySelected,
      goSearch
    }
  }
}
</script>
