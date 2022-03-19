<template>
  <Header class="sky"></Header>
  <section>
    <div class="attr-banner bg-cover" :style="{ backgroundImage: 'url(' + require('@/assets/images/banner04.jpg') + ')' }">
    </div>
  </section>
  <section class="container pt-3 mb-5 px-4 px-md-8 spot-info">
    <div class="page-tags mb-5">
      <a href="#" class="link-darkgray">首頁</a>
      <i class="fa-solid fa-angle-right mx-3"></i>
      <a :href="`#/spots?county=Taipei&page=1`" class="link-darkgray">景點查詢</a>
      <i class="fa-solid fa-angle-right mx-3"></i>
      <a href="#" @click.prevent="scrollTop" v-if="spotInfo.ScenicSpotName">{{spotInfo.ScenicSpotName}}</a>
    </div>
    <div class="row justify-content-between gx-5" v-if="spotInfo.ScenicSpotName">
      <div class="col-md-5 order-1 order-md-0 position-relative">
        <div class="d-flex align-items-center mb-4">
          <h1 class="fs-5 fw-bold text-primary me-4">{{spotInfo.ScenicSpotName}}</h1>
          <span class="badge rounded-pill bg-gold" v-if="spotInfo.Class1">{{spotInfo.Class1}}</span>
        </div>
        <div class="ps-4">
          <div>
            <h2 class="mb-4">景點資訊</h2>
            <ul>
              <li class="info-list-item" v-if="spotInfo.Address">
                <i class="fa-solid fa-map info-icon"></i>
                <span>{{spotInfo.Address}}</span>
              </li>
              <li class="info-list-item" v-if="spotInfo.Phone">
                <i class="fa-solid fa-phone info-icon"></i>
                <span>{{spotInfo.Phone}}</span>
              </li>
              <li class="info-list-item" v-if="spotInfo.OpenTime">
                <i class="fa-solid fa-clock info-icon"></i>
                <span>{{spotInfo.OpenTime}}</span>
              </li>
              <li class="info-list-item" v-if="spotInfo.TravelInfo">
                <i class="fa-solid fa-car info-icon"></i>
                <span>{{spotInfo.TravelInfo}}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="two-dots">
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="col-md-7 order-0 order-md-1 mb-4 mb-md-0">
        <div class="spot-info-img bg-cover" v-if="spotInfo.Picture.PictureUrl1" :style="`background-image:url(${spotInfo.Picture.PictureUrl1})`">
        </div>
        <div class="spot-info-img bg-cover" v-else style="background-image:url(https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80)">
        </div>
      </div>
      <div class="col-12 order-2 mt-5">
        <div class="ps-4">
          <h2 class="mb-4">景點介紹</h2>
          <p class="spot-info-des">{{spotInfo.DescriptionDetail}}</p>
        </div>
      </div>
    </div>
  </section>
  <Footer></Footer>
  <ScrollTop></ScrollTop>
</template>

<script>
// @ is an alias to /src
import { inject, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollTop from '@/components/SrollTop';
import Pagination from '@/components/Pagination.vue';
import apiHeader from '@/methods/apiHeader';

export default {
  components: {
    Header,
    Footer,
    Pagination,
    ScrollTop
  },
  setup() {
    // 路由
    const router = useRouter()
    const route = useRoute()
    // 狀態
    const spotId = ref('');
    const spotInfo = ref({});
    // api
    const axios = inject('axios');
    const { getAuthorizationHeader } = apiHeader();
    const getSingleSpot = () => {
      let api = `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$filter=contains(ScenicSpotID,'${spotId.value}')&$format=JSON`;
      axios.get(
         api,
          {
             headers: getAuthorizationHeader()
          }
       )
       .then(function (response) {
         spotInfo.value = response.data[0];
       })
       .catch(function (error) {
         console.log(error);
       }); 
    }

    // scrolltop
    const scrollTop = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }

    //created
    spotId.value = route.params.spotId;
    getSingleSpot();

    return {
      spotId,
      spotInfo,
      getSingleSpot,
      scrollTop
    };
  },
}
</script>