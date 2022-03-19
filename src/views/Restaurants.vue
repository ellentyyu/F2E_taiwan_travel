<template>
  <Header class="transparent-black"></Header>
  <section class="home-banner position-relative">
    <div class="vh-100 bg-cover banner-img px-5 pb-3 pb-md-7" :style="{ backgroundImage: 'url(' + require('@/assets/images/banner02.jpg') + ')' }">
      <img src="@/assets/images/taiwan_logo_black.svg" class="tw-logo" alt="taiwan travel logo">
      <div id="scroll" class="position-relative">
        <span></span>
      </div>
    </div>
    <div class="shade-layer"></div>
  </section>
  <section class="container py-6 px-4 px-md-3 res-intro">
    <div class="row justify-content-center">
      <div class="col-8">
        <div class="intro-text mb-6">
          <p>民以食為天的臺灣，幾乎是三步一小吃，五步一餐廳，各樣美食應有盡有。臺灣飲食文化除了獨特的傳統飲食，近年也快速發展出生機飲食、小吃新風味、複合式料理，創造出健康、創意的臺灣料理新風貌。</p>
          <p>世界文化在臺灣匯流，各國美食也廣受歡迎。美國的漢堡、義大利的披薩、日本的壽司、德國的豬腳、印度的咖哩...讓臺灣成為饕客天堂。而滷肉飯、小籠包、珍珠奶茶等臺式的本土料理也都是風靡全球的經典料理，嚐味一次，必將永生難忘。</p>
        </div>
        <img src="@/assets/images/taiwan_logo_black.svg" class="res-tw-logo" alt="taiwan travel logo">
        <div class="res-search-wrap mt-6">
          <h2 class="fs-5 fw-bold text-center mb-3 font-ch">您想找哪個地方的美食呢？</h2>
          <form class="res-form">
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
            <button type="button" class="btn btn-gold font-en fs-s px-3" @click="searchRestaurants">SEARCH</button>
          </form>
        </div>
      </div>
    </div>
  </section>
  <section class="container py-5 px-4 px-md-3 res-gallery">
    <div class="row g-4">
      <div class="col-12 col-sm-6 col-md-4" v-for="item in resTruncated" :key="item.RestaurantID">
        <div class="gallery-card custom-radius custom-shadow h-100">
          <div class="px-3 py-4 gallery-text-wrap" :class="{'open':isOpen}">
            <h3 class="text-primary fw-bold mb-2">{{item.RestaurantName}}</h3>
            <p class="mb-3"><i class="fa-solid fa-location-dot text-primary me-2"></i>{{item.Address}}</p>
            <p class="d-inline-block gallery-text" v-if="!isOpen || openId !== item.RestaurantID">
              {{item.DescriptionTruncated}}
              <a href="#" class="d-inline-block ms-2 text-decoration-underline" :class="{'d-none':item.lessText}" @click.prevent="isOpen=true; openId = item.RestaurantID">了解更多</a>
            </p>
            <p class="d-inline-block gallery-text" v-if="isOpen && openId == item.RestaurantID">
              {{item.Description}}
              <a href="#" class="d-inline-block ms-2 text-decoration-underline" @click.prevent="isOpen=false">收起</a>
            </p>
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
 import { watch, inject, ref, computed } from 'vue';
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
    //搜尋
    const searchRestaurants = () => {
      router.push(`/restaurants?county=${countySelected.value}`);
    }
    //api
    const axios = inject('axios');
    const { getAuthorizationHeader } = apiHeader();
    const getRestaurants = () => {
      let api = `https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant/${route.query.county}?$top=12&$format=JSON`;

      axios.get(
         api,
          {
             headers: getAuthorizationHeader()
          }
       )
       .then(function (response) {
         restaurants.value = response.data;
       })
       .catch(function (error) {
         console.log(error);
       }); 
    }
    // 網址改變發送請求
    watch(() => route.query.county, () => {
      if(!route.query.county) {
        return;
      }
      getRestaurants();
    })
    // 狀態處理
    const restaurants = ref([]);
    const resTruncated = computed(() => {
      let ary = JSON.parse(JSON.stringify(restaurants.value));
      ary.forEach((item) => {
        if (item.Description.length <= 60) {
          item.DescriptionTruncated = item.Description;
          item.lessText = true;
        }
        if(item.Description.length > 60) {
          item.DescriptionTruncated = item.Description.substr(0, 59) + '...';
        }
      });
      return ary;
    });
    const isOpen = ref(false);
    const openId = ref('');

    // created
    areaSelected.value = 'South'
    router.push(`/restaurants?county=${countySelected.value}`);
    getRestaurants();

    return{
      areaSelected,
      countiesList,
      countySelected,
      // 狀態
      searchRestaurants,
      restaurants,
      resTruncated,
      isOpen,
      openId
    }
  }
}
</script>
