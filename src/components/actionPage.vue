<template>
  <div class="">
    <el-card class="my-4 mx-2">
      <el-row class="m-0 p-0 justify-center">
        <el-col cols="24" :md="11" class="col-class">
          <el-form
            ref="formRef"
            :model="form"
            label-width="auto"
            class="demo-ruleForm m-1"
          >
            <el-form-item
              label="number"
              prop="number"
            >
<!--              :rules="[-->
<!--                { required: true, message: 'number is required' },-->
<!--                { min: 13, message: 'number must be a number' },-->
<!--              ]"-->
              <el-input clearable
                v-model="form.number"
                @input="form.number = numberMethod(form.number)"
                placeholder="999999999"
                type="text"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item
              label="email"
              prop="email"
              :rules="[
                { required: true, message: 'email is required' },
                { type: 'email', message: 'email must be a email' },
              ]"
            >
              <el-input
                  clearable
                v-model="form.email"
                type="text"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item class="ml-14">
              <el-button @click="submitForm(formRef)">Search</el-button>
            </el-form-item>
          </el-form>
            <el-button @click="restart" size="small" text type="danger">Restart</el-button>
            <el-table v-loading="loading" :data="searchDataVal" border style="width: 100%">
              <el-table-column prop="email" label="Email" width="277" />
              <el-table-column prop="number" label="Number" width="277" />
            </el-table>
        </el-col>
        <el-col cols="24" :md="11" class="col-class">
          <el-card>
            <el-table :data="mainData" border style="width: 100%">
              <el-table-column prop="email" label="Email" width="256" />
              <el-table-column prop="number" label="Number" width="256" />
            </el-table>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import {onMounted, reactive, ref} from 'vue'
import {ElNotification, FormInstance} from "element-plus";
import {useCounterStore} from '@/stores/counter';
import formatPhoneNumberMixin from '@/mixins/number';
const numberMethod = formatPhoneNumberMixin.methods.formatPhoneNumber;

const useCounter = useCounterStore();
const formRef = ref<FormInstance>();
const form = reactive({
  number: '',
  email: '',
});
const loading = ref(false);

const mainData = ref([]);
const searchDataVal = ref([]);

function restart (){
  searchDataVal.value = [];
  form.number = '';
  form.email = '';
}
const submitForm = async (formEl) => {
  if (!formEl) return
  try {
    await formEl.validate();
    loading.value = true;
      const res = await useCounter.searchData(form);
      if (res.data.length){
        searchDataVal.value = res.data;
        loading.value = false;
        ElNotification.success({
          title: 'done',
          message: 'submit !',
          showClose: true
        })
      }else {
        searchDataVal.value = [];
        loading.value = false;
        ElNotification.warning({
          title: 'warning',
          message: `not-found`,
          showClose: true
        })
      }
  }catch(err){
      searchDataVal.value = [];
      loading.value = false;
      ElNotification.warning({
        title: 'error',
        message: `${err}`,
        showClose: true
      })
  }
}

async function getData(){
  try {
    const res = await useCounter.getData();
    mainData.value = res.data;
  }catch (err){
    alert(err);
  }
}
onMounted(async () => {
  await getData();
})
</script>
<style scoped>
.col-class{
  border: 1px solid #2b2d30;
  border-radius: 7px;
  margin: 0 2px;
}
</style>
