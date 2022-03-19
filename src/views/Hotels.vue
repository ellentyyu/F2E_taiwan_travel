<template>
  <Header class="transparent-black"></Header>
  <section class="home-banner position-relative">
    <div class="vh-100 bg-cover banner-img px-5 pb-3 pb-md-7" :style="{ backgroundImage: 'url(' + require('@/assets/images/banner03.jpg') + ')' }">
      <img src="@/assets/images/taiwan_logo_black.svg" class="tw-logo" alt="taiwan travel logo">
      <div id="scroll" class="position-relative">
        <span></span>
      </div>
    </div>
    <div class="shade-layer"></div>
  </section>
  <section class="container py-6 px-4 px-md-3 hotel-intro">
    <div class="row g-6 justify-content-center">
      <div class="d-none d-md-block col-md-6 col-lg-4">
        <div class="intro-img bg-cover position-relative" style="background-image: url(https://images.unsplash.com/photo-1586611292717-f828b167408c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80)">
          <div class="shade-layer"></div>
        </div>
      </div>
      <div class="col-md-6 col-lg-4">
        <h1 class="fs-5 fw-bold mt-md-6 mb-4 font-ch"><i class="fa-solid fa-hotel me-3"></i>找尋所在縣市的住宿點</h1>
        <form class="hotel-form">
          <select class="form-select" aria-label="Default select example" v-model="areaSelected">
            <option value="North">北部地區</option>
            <option value="Central">中部地區</option>
            <option value="South">南部地區</option>
            <option value="East">東部地區</option>
            <option value="Islands">離島地區</option>
          </select>
          <select class="form-select mb-4" aria-label="Default select example" v-model="countySelected">
            <option v-for="item in countiesList" :key="item.en" :value="item.en">{{item.ch}}</option>
          </select>
          <button type="button" class="btn btn-gold font-en fs-s px-4 d-block mx-auto" @click="searchHotels">SEARCH</button>
        </form>
      </div>
    </div>
  </section>
  <section class="container py-5 px-4 px-md-3 hotel-gallery">
    <div class="row g-4">
      <div class="col-12 col-sm-6 col-md-4 col-lg-3" v-for="item in hotels" :key="item.HotelID">
        <div class="custom-radius custom-shadow h-100 hotel-card">
          <div v-if="item.Picture.PictureUrl1" class="hotel-img bg-cover" :style="`background-image:url(${item.Picture.PictureUrl1})`"></div>
          <div v-else class="hotel-img bg-cover" style="background-image:url(https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)"></div>
          <div class="px-3 py-4">
            <div class="d-flex justify-content-between align-items-start mb-3">
              <h3 class="text-primary fw-bold">{{item.HotelName}}</h3>
              <span class="badge rounded-pill bg-gold ms-1" v-if="item.Class">{{item.Class}}</span>
            </div>
            <ul>
              <li class="hotel-list-item">
                <i class="fa-solid fa-location-dot me-2 text-primary"></i>
                <span>{{item.Address}}</span>
              </li>
              <li class="hotel-list-item">
                <i class="fa-solid fa-phone me-2 text-primary"></i>
                <span>{{item.Phone}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
  <Footer></Footer>
  <ScrollTop></ScrollTop>
</template>

<script>
// @ is an alias to /src
 import Header from '@/components/Header'
 import Footer from '@/components/Footer';
import ScrollTop from '@/components/SrollTop';
 import { watch, inject, ref } from 'vue';
 import { useRouter, useRoute } from 'vue-router' 
 import locationsData from '@/methods/locationsData';
 import apiHeader from '@/methods/apiHeader';
export default {
  components: {
    Header,
    Footer,
    ScrollTop
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
    // 搜尋
    const searchHotels = () => {
      router.push(`/hotels?county=${countySelected.value}`);
    }
    // api
    const axios = inject('axios');
    const { getAuthorizationHeader } = apiHeader();
    const getHotels = () => {
      let api = `https://ptx.transportdata.tw/MOTC/v2/Tourism/Hotel/${route.query.county}?$top=24&$format=JSON`;

      axios.get(
         api,
          {
             headers: getAuthorizationHeader()
          }
       )
       .then(function (response) {
         hotels.value = response.data;
       })
       .catch(function (error) {
         console.log(error);
       }); 
    }
    // 網址改變發送請求
    watch(() => route.query.county, () => {
      if(!route.query.county || route.path !== '/hotels') {
        return;
      }
      getHotels();
    })

    // 狀態處理
    const hotels = ref([]);

    // created
    areaSelected.value = 'Central'
    router.push(`/hotels?county=${countySelected.value}`);
    getHotels();

    return{
      areaSelected,
      countiesList,
      countySelected,
      searchHotels,
      hotels,
    }
  }
}
</script>
