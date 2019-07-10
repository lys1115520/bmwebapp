<template>
  <div>
    <van-nav-bar title="地址信息" left-text="返回" left-arrow @click-left="onClickLeft"/>
    <van-address-edit
      :area-list="areaList"
      show-postal 
      show-delete
      show-set-default
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
      v-model="addInfo"
    />
    <van-popup @confirm="onAddconfirm" v-model="show" position="bottom" :style="{ height: '100%' }"/>
  </div>
</template>
<script>
import AddressInfo from "../../../assets/js/area.js";
import { Popup } from 'vant';
import { AddressEdit } from "vant";
import { Toast } from 'vant';
export default {
  data() {
    return {
      areaList: AddressInfo,
      showAddpopup: true,
      searchResult: [],
      show: false,
      addInfo:" ",
    };
  },
  methods: {
    onSave(content) {
      let addr = new Array;
      addr = [{
        name:content.name,
        tel:content.tel,
        address:content.province+content.city+content.county+content.addressDetail
      }];
      console.log(addr.address)
      console.log(addr.name)
      console.log(addr)
      localStorage.addressInfo=[];//清空缓存的数据
      localStorage.addressInfo=JSON.stringify(addr);
      this.$router.push("/order");
    },
    onDelete() {
      Toast("确定删除改地址？");
      this.showAddpopup=false;
    },
    onChangeDetail(val) {
      this.showAddpopup = true;
    },
    onClickLeft() {
      this.$router.push("/order");
    },
    onAddconfirm(val){ 
      this.showAddpopup=false;
    },
   

  }
};
</script>

<style scoped>

</style>

