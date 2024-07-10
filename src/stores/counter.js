import http from "@/plugins/axios.js";
import {defineStore} from "pinia";

export const useCounterStore = defineStore('counterStore', {
  actions: {
    async getData(){
      return await http.get('/all')
    },
    async searchData(request){
      return await http.post('/search', request)
    }
  }
})
