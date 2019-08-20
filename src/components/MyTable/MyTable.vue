<template>
  <div id="table">
    <a-table
      :columns="columns"
      :dataSource="data"
      :pagination="false"
      :loading="memberLoading"
      :rowClassName="function(){return 'table-row'}"
    >
      <template v-for="col in dataLists" :slot="col" slot-scope="text, record">
        <a-select @change="handleChange(record.key,col,$event)" v-if="col == 'size'" :key="col" style="min-width: 120px;" placeholder="请选择尺码">
          <a-select-option
            v-for="(sitem,index) in size"
            :key="index"
            :value="sitem"
            
          >{{sitem}}
            
          </a-select-option>
        </a-select>
        <!-- <Stepper :num="record.number" @onPropsChange="change(record.key,col,)" v-if="col == 'number'" :key="col"></Stepper> -->
        <div id="stepper" v-if="col == 'number'" :key="col">
          <button class="left" @click="clickLeftbtn(record.key,col)">-</button>
          <input type="number" min="1" max="Infinity" class="stepper-input" :value="record.number" />
          <button class="right" @click="clickRightbtn(record.key,col)">+</button>
        </div>
        <a-input
          v-if="col == 'price'"
          :key="col"
          :value="record.price"
          style="background-color: rgba(255,255,255,0); border:none;"
        />
      </template>
      <template slot="operation" slot-scope="text, record">
        <span>
          <a @click="remove(record.key)">
            <a-icon type="delete" style="font-size: 30px;" />
          </a>
        </span>
      </template>
    </a-table>
    <a-button
      style="width: 100%; margin-top: 16px; margin-bottom: 8px"
      icon="plus"
      @click="newMember"
    >添加</a-button>
  </div>
</template>
<script>
export default {
  props: {
    dataList: {},
    dataSize: {},
    dataSizeText:{
      type:Array
    },
    size: {
      type: Array
    }
  },
  components: {},
  created() {
        
        this._price()
  },
  data() {
    return {
      // table
      dataLists: ["size", "number", "price"],
      quantity: 1,
      memberLoading: false,
      columns: [
        {
          title: "尺码",
          dataIndex: "size",
          key: "size",
          width: "30%",
          scopedSlots: { customRender: "size" }
        },
        {
          title: "数量",
          dataIndex: "number",
          key: "number",
          width: "30%",
          scopedSlots: { customRender: "number" }
        },
        {
          title: "合计价格",
          dataIndex: "price",
          key: "price",
          width: "30%",
          scopedSlots: { customRender: "price" }
        },
        {
          title: "操作",
          key: "action",
          scopedSlots: { customRender: "operation" }
        }
      ],
      data: [],
      reseList: [],
      errors: []
    };
  },
  methods: {
    _price() {
      this.data = this.dataSize
    },
    handleChange(key, column,value) {
      console.log(key, column,value)
      let newData = [...this.data];
      console.log(newData)
      let target = newData.filter(item => key == item.key)[0];
      console.log(target)
      if (target) {
        console.log(target.size.length)
        target.size = value
      }
      this.data = newData
      this.$emit('getList',this.data)
    },
    /** 减**/
    clickLeftbtn(key, column) {
      let newData = [...this.data];
      console.log(newData)
      let target = newData.filter(item => key == item.key)[0];
      console.log(target)
      if (target) {
        if (target[column] > 1) {
          target[column]--;
        } else {
          target[column] = 1;
        }
        target.price = target[column] * this.dataSizeText[0].price;
      }
      this.data = newData;
      this.$emit('getList',this.data)
    },
    /** 加**/
    clickRightbtn(key, column) {
      console.log(this.dataSize)
      console.log(this.data)
      let newData = [...this.data];
      let target = newData.filter(item => key == item.key)[0];
       console.log(target)
      if (target) {
        target[column]++;
        target.price = target[column] * this.dataSizeText[0].price;
      }
      this.data = newData;
      console.log(this.data)
      this.$emit('getList',this.data)
    },
    /** 添加**/
    newMember() {
      const length = this.data.length;
      console.log(this.data)
      console.log(this.dataSize)
        this.data.push({
        key:
          length === 0
            ? "1"
            : (parseInt(this.data[length - 1].key) + 1).toString(),
        price: this.dataSizeText[0].price,
        number: this.dataSizeText[0].number,
        size: this.size
      });
    },

    remove(key) {
          console.log(key)
      const newData = this.data.filter(item => item.key !== key);
      console.log(newData)
      this.data = newData;
      this.$emit('getList',this.data)
    }
  },
  watch: {
    number(val) {
      if (val) {
        return val * this.dataSizeText[0].price;
      } else {
        return 0;
      }
    }
  },
  computed: {}
};
</script>
<style lang="less">
@import "./../index.less";
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0;
}
#stepper {
  .stepper-input {
    box-sizing: border-box;
    width: 32px;
    height: 28px;

    padding: 0;
    color: #fff;
    font-size: 14px;
    text-align: center;
    vertical-align: middle;
    background-color: rgba(255, 255, 255, 0.5);
    border: 0;
    border-width: 1px 0;
    border-radius: 0;
    -webkit-appearance: none;
    outline: none;
  }
  .left {
    position: relative;
    box-sizing: border-box;
    width: 28px;
    height: 28px;
    margin: 0;
    padding: 5px;
    color: #fff;
    vertical-align: middle;
    background-color: rgba(255, 255, 255, 0.5);
    border: 0;
    border-radius: 4px 0 0 4px;
    border-right: 1px solid #fff;
    outline: none;
    cursor: pointer;
    line-height: 14px;
  }
  .right {
    position: relative;
    box-sizing: border-box;
    width: 28px;
    height: 28px;
    margin: 0;
    padding: 5px;
    color: #fff;
    vertical-align: middle;
    background-color: rgba(255, 255, 255, 0.5);
    border: 0;
    border-radius: 0 4px 4px 0;
    border-left: 1px solid #fff;
    outline: none;
    cursor: pointer;
    line-height: 14px;
  }
}
</style>
