<template>
  <div style="padding-top: 200px;">
    <a-card :bordered="false" style="display: block; width: 60%; background-color: #fff; margin: 0 auto; padding: 50px 0;">
      <a-steps class="steps" :current="currentTab">
        <a-step title="Confirm account information" />
        <a-step title="Change Password" />
        <a-step title="Completed" />
      </a-steps>
      <div class="content">
        <step1 v-if="currentTab === 0" @nextStep="nextStep1"/>
        <step2 :email="email" v-if="currentTab === 1" @nextStep="nextStep2" @prevStep="prevStep"/>
        <step3 v-if="currentTab === 2" @prevStep="prevStep" @finish="finish"/>
      </div>
    </a-card>
  </div>
</template>
<script>
  import Step1 from './Step1'
  import Step2 from './Step2'
  import Step3 from './Step3'

  export default {
    name: "passwordForm",
    components: {
      Step1,
      Step2,
      Step3
    },
    data () {
      return {
        description: '',
        currentTab: 0,
        email: ''
      }
    },
    methods: {
      nextStep1(data) {
          this.email = data
        if (this.currentTab < 2) {
          this.currentTab += 1
        }
      },
      nextStep2(){
        if (this.currentTab < 2) {
          this.currentTab += 1
        }
      },
      prevStep () {
        if (this.currentTab > 0) {
          this.currentTab -= 1
        }
      },
      finish () {
        this.currentTab = 0
      }
    }
  }
</script>
<style lang="less">
  .steps {
    max-width: 750px;
    margin: 16px auto;
  }
</style>