<template>
  <Header class="sky"></Header>
  <section>
    <div class="attr-banner bg-cover" :style="{ backgroundImage: 'url(' + require('@/assets/images/banner04.jpg') + ')' }">
    </div>
  </section>
  <section class="container pt-3 mb-5 px-4 px-md-3">
    <div class="page-tags">
      <a href="#" class="link-darkgray">首頁</a>
      <i class="fa-solid fa-angle-right mx-3"></i>
      <a href="#" class="to-attr" @click.prevent="scrollTop">景點查詢</a>
    </div>
    <h1 class="fs-5 fw-bold text-primary">熱門景點</h1>
    <swiper
    :modules="modules"
    :slides-per-view="slidesNum"
    :space-between="100"
    :slides-offset-before="0"
    navigation
    :loop="true"
    :centeredSlidesBounds="true"
    :draggable="true"
    :centeredSlides="true"
    id="attr-swiper"
    class="py-4"
    >
    <template v-if="spots.length">
      <swiper-slide v-for="item in spots" :key="item.ScenicSpotID">
        <div v-if="item.Picture.PictureUrl1" class="bg-cover slide-item" :style="`background-image:url(${item.Picture.PictureUrl1})`">
          <div class="text-wrap">
            <h4 class="fs-s">{{item.ScenicSpotName}}</h4>
            <a href="#" class="text-white fs-xs" @click.prevent="viewSpot(item.ScenicSpotID)">了解更多<i class="fa-solid fa-arrow-right-long ms-2"></i></a>
          </div>
        </div>
        <!-- 沒有圖片的fallback -->
        <div v-else class="bg-cover slide-item" style="background-image:url(https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)">
          <div class="text-wrap"> 
            <h4 class="fs-s">{{item.ScenicSpotName}}</h4>
            <a href="#" class="text-white fs-xs" @click.prevent="viewSpot(item.ScenicSpotID)">了解更多<i class="fa-solid fa-arrow-right-long ms-2"></i></a>
          </div>
        </div>
        <div class="shade-layer"></div>
      </swiper-slide>
    </template>
    <!-- 沒有資料的fallback -->
    <template v-else>
      <swiper-slide>
        <div class="bg-cover slide-item" :style="{ backgroundImage: 'url(' + require('@/assets/images/banner01.jpg') + ')' }">
          <div class="text-wrap">
            <h4 class="fs-s">探索更多景點</h4>
            <a href="#" class="text-white fs-xs">了解更多<i class="fa-solid fa-arrow-right-long ms-2"></i></a>
          </div>
        </div>
        <div class="shade-layer"></div>
      </swiper-slide>
      <swiper-slide>
        <div class="bg-cover slide-item" :style="{ backgroundImage: 'url(' + require('@/assets/images/banner02.jpg') + ')' }">
          <div class="text-wrap">
            <h4 class="fs-s">探索台灣美食</h4>
            <a href="#" class="text-white fs-xs">了解更多<i class="fa-solid fa-arrow-right-long ms-2"></i></a>
          </div>
        </div>
        <div class="shade-layer"></div>
      </swiper-slide>
      <swiper-slide>
        <div class="bg-cover slide-item" :style="{ backgroundImage: 'url(' + require('@/assets/images/banner03.jpg') + ')' }">
          <div class="text-wrap">
            <h4 class="fs-s">尋找優質旅宿</h4>
            <a href="#" class="text-white fs-xs">了解更多<i class="fa-solid fa-arrow-right-long ms-2"></i></a>
          </div>
        </div>
        <div class="shade-layer"></div>
      </swiper-slide>
    </template>
    </swiper>
  </section>
  <section class="container mb-5 px-4 px-md-3">
    <div class="row">
      <div class="col-md-3">
        <div class="mb-4">
          <input class="form-control custom-shadow key-input" type="text" placeholder="關鍵字查詢" v-model="keyword">
        </div>
        <form class="custom-shadow custom-radius attr-form p-3">
          <h3 class="mb-3">篩選內容</h3>
          <h3 class="fs-5 fw-bold text-primary mb-2">地區 / 縣市</h3>
          <select class="form-select mb-2" aria-label="area select" v-model="areaSelected">
            <option value="North">北部地區</option>
            <option value="Central">中部地區</option>
            <option value="South">南部地區</option>
            <option value="East">東部地區</option>
            <option value="Islands">離島地區</option>
          </select>
          <select class="form-select" aria-label="county select" v-model="countySelected">
            <option v-for="item in countiesList" :key="item.en" :value="item.en">{{item.ch}}</option>
          </select>
          <hr>
          <h3 class="fs-5 fw-bold text-primary mb-2">類別</h3>
          <div class="mb-3">
            <div class="form-check">
              <input class="form-check-input" type="radio" name="class" id="all" value="all" v-model="classSelected">
              <label class="form-check-label" for="all">
                全部
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="class" id="nature" value="自然風景類" v-model="classSelected">
              <label class="form-check-label" for="nature">
                自然風景
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="class" id="reserve" value="生態類" v-model="classSelected">
              <label class="form-check-label" for="reserve">
                生態保育
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="class" id="recreation" value="遊憩類" v-model="classSelected">
              <label class="form-check-label" for="recreation">
                休閒遊憩
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="class" id="nationalpark" value="國家風景區類" v-model="classSelected">
              <label class="form-check-label" for="nationalpark">
                國家風景區
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="class" id="culture" value="文化類" v-model="classSelected">
              <label class="form-check-label" for="culture">
                文化瑰寶
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="class" id="history" value="古蹟類" v-model="classSelected">
              <label class="form-check-label" for="history">
                歷史古蹟
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="class" id="art" value="藝術類" v-model="classSelected">
              <label class="form-check-label" for="art">
                藝術文化
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="class" id="hotspring" value="溫泉類" v-model="classSelected">
              <label class="form-check-label" for="hotspring">
                泡湯之旅
              </label>
            </div>
            <!-- <div class="form-check">
              <input class="form-check-input" type="radio" name="class" id="others" value="其他" v-model="classSelected">
              <label class="form-check-label" for="others">
                其他
              </label>
            </div> -->
          </div>
          <button type="button" class="btn btn-gold font-en fs-s px-4 py-2 d-block mx-auto" @click="searchSpots">SEARCH</button>
        </form>
      </div>
      <div class="col-md-9">
        <h2 class="fs-5 fw-bold text-primary attr-title-p mb-4">搜尋結果</h2>
        <ul v-if="spots.length">
          <li class="custom-shadow custom-radius attr-item mb-4" v-for="item in spotsDisplayed" :key="item.ScenicSpotID">
            <div class="row gx-2">
              <div class="d-none d-md-block col-md-4">
                <div v-if="item.Picture.PictureUrl1" class="attr-img bg-cover" :style="`background-image:url(${item.Picture.PictureUrl1})`"></div>
                <div v-else class="attr-img bg-cover" style="background-image:url(https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)"></div>
              </div>
              <div class="col-md-8">
                <div class="p-3 d-flex flex-column h-100">
                  <div class="mb-3 d-flex justify-content-between align-items-center">
                    <h3 class="fs-5 fw-bold text-primary">{{item.ScenicSpotName}}</h3>
                    <span class="badge rounded-pill bg-gold" v-if="item.Class1">{{item.Class1}}</span>
                  </div>
                  <p class="d-inline-block attr-des mb-4 mb-md-3 mb-lg-0">{{item.DescriptionDetail}}
                    <a href="#" class="d-inline-block ms-2 text-decoration-underline" @click.prevent="viewSpot(item.ScenicSpotID)">了解更多</a>
                  </p> 
                  <div class="d-flex justify-content-between align-items-center mt-auto">
                    <div class="me-3">
                      <i class="fa-solid fa-location-dot text-primary me-1"></i>
                      <span>{{item.City}}</span>
                    </div>
                    <div v-if="item.OpenTime">
                      <i class="fa-solid fa-clock text-primary me-1"></i>
                      <span>{{item.OpenTime}}</span>
                    </div>
                    <div class="ms-auto">
                      <i class="fa-solid fa-hand-pointer text-gold me-1"></i>
                      <span>1239</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- <div class="col-3">
              <div class="attr-img bg-cover" :style="{ backgroundImage: 'url(' + require('@/assets/images/banner04.jpg') + ')' }"></div>
            </div>
            <div class="col-9"></div> -->
          </li>
        </ul>
        <div class="text-center no-result" v-else>
          <i class="fa-solid fa-triangle-exclamation"></i>
          <p class="text-primary fs-l mb-2">很抱歉，查無資料</p>
          <p class="text-darkgray">我們無法找到相符內容，請重新搜尋</p>
        </div>
      </div>
    </div>
    <Pagination class="mt-4" :pages="pageData" v-if="spots.length" @emit-pages="switchPage"></Pagination>
  </section>
  <Footer></Footer>
  <ScrollTop></ScrollTop>
</template>

<script>
// @ is an alias to /src
import { inject, ref, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollTop from '@/components/SrollTop';
import Pagination from '@/components/Pagination.vue';
import locationsData from '@/methods/locationsData';
import apiHeader from '@/methods/apiHeader';

// import Swiper core and required modules
import { Navigation } from 'swiper';
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

export default {
  components: {
    Header,
    Footer,
    Swiper,
    SwiperSlide,
    Pagination,
    ScrollTop
  },
  setup() {
    // 路由
    const router = useRouter()
    const route = useRoute()
    // swiper
    const slidesNum = ref(2.6);
    const handleWidth = () => {
      if(screen.width >= 768){
        slidesNum.value = 2.6;
      }
      else if(screen.width < 768 && screen.width >= 576){
        slidesNum.value = 1.6;
      }
      else if(screen.width < 576){
        slidesNum.value = 1.2;
      }
    }
    // 縣市
    const { areaSelected, countiesList, countySelected} = locationsData();
    watch(countiesList, (val) => {
      let [first] = val;
      countySelected.value = first.en;
    })
    // 搜尋
    const keyword = ref('');
    const classSelected = ref('all');
    const filter = ref('')
    const searchSpots = () => {
      // 處理表單
      filter.value = '';
      keyword.value = keyword.value.trim();
      if(keyword.value) {
        filter.value = `filter=contains(ScenicSpotName,'${keyword.value}')`;
        if(classSelected.value !== 'all') {
          filter.value += `%20and%20contains(Class1,'${classSelected.value}')`
        }
      } 
      if(!keyword.value && classSelected.value !== 'all') {
        filter.value = `filter=contains(Class1,'${classSelected.value}')`;
      }
      // 網址
      if (filter.value){
        router.push(`/spots?county=${countySelected.value}&${filter.value}&page=1`);
      }else{
        router.push(`/spots?county=${countySelected.value}&page=1`);
      }
      keyword.value = '';
    }
    // api
    const axios = inject('axios');
    const { getAuthorizationHeader } = apiHeader();
    const getSpots = () => {
      let api = `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/${route.query.county}?$top=30&$format=JSON`;

      if (filter.value) {
        api += `&$${filter.value}`;
      }

      axios.get(
         api,
          {
             headers: getAuthorizationHeader()
          }
       )
       .then(function (response) {
         spots.value = response.data;
       })
       .catch(function (error) {
         console.log(error);
       }); 
    }
    // 網址改變發送請求
    watch([() => route.query.filter, () => route.query.county], () => {
      if(!route.query.county || route.path !== '/spots') {
        return;
      }
      getSpots();
    })

    // 狀態處理
    const spots = ref([]);
    const spotsTruncated = computed(() => {
      let ary = JSON.parse(JSON.stringify(spots.value));
      ary.forEach((item) => {
        if(item.DescriptionDetail.length > 75) {
          item.DescriptionDetail = item.DescriptionDetail.substr(0, 74) + '...';
        }
        if(item.OpenTime && item.OpenTime.length > 10) {
          item.OpenTime = '請見詳細資訊';
        }
      });
      return ary;
    });
    const spotsDisplayed = computed(() => {
      let ary = JSON.parse(JSON.stringify(spotsTruncated.value));
      return ary.splice((currPage.value - 1) * 10, 10);
    })
    const viewSpot = (id) => {
      router.push(`/spot/${id}`);
    }
    // 頁碼
    const currPage = computed(() => parseInt(route.query.page));
    const pageData = computed(() => {
      let total_pages, has_next, has_pre;
      // 總頁數
      if(Number.isInteger(spotsTruncated.value.length / 10)) {
        total_pages = spotsTruncated.value.length / 10;
      }else {
        total_pages = Math.trunc(spotsTruncated.value.length / 10) + 1;
      }
      // 樣式
      if(total_pages === 1) {
        has_pre = false;
        has_next = false;
      }else if(currPage.value === 1){
        has_pre = false;
      }else if(total_pages === currPage.value){
        has_next = false;
      }else{
        has_pre = true;
        has_next = true;
      }
      return {
        current_page: currPage.value,
        has_next: has_next,
        has_pre: has_pre,
        total_pages: total_pages
      };
    });
    const switchPage = (page) => {
       // parseInt(currPage);
       // let currRoute = route.fullPath;
       if (filter.value){
        router.push(`/spots?county=${countySelected.value}&${filter.value}&page=${page}`);
       }else{
        router.push(`/spots?county=${countySelected.value}&page=${page}`);
       }
    }
    // scrollTop
    const scrollTop = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
    // created
    router.push(`/spots?county=${countySelected.value}&page=1`);
    getSpots();
    window.addEventListener("resize", handleWidth);
    handleWidth();
    return {
      modules: [Navigation],
      areaSelected,
      countiesList,
      countySelected,
      slidesNum,
      // 搜尋
      classSelected,
      keyword,
      searchSpots,
      // 狀態處理
      spots,
      spotsDisplayed,
      viewSpot,
      // 頁碼
      pageData,
      switchPage,
      // scrolltop
      scrollTop
    };
  },
}
</script>