<template>
  <div id="table">
    <a-table
      :columns="columns"
      :dataSource="data1"
      :pagination="false"
      :loading="memberLoading"
      :rowClassName="function(){return 'table-row'}"
    >
      <template v-for="col in dataList1" :slot="col" slot-scope="text, record">
        <a-select
          @change="handleChange(record.key,col,$event)"
          v-if="col == 'size'"
          :key="col"
          style="min-width: 120px;"
          placeholder="请选择尺码"
        >
          <a-select-option v-for="(sitem,index) in sizes" :key="index" :value="sitem">{{sitem}}</a-select-option>
        </a-select>
        <!-- <Stepper :num="record.number" @onPropsChange="change(record.key,col,)" v-if="col == 'number'" :key="col"></Stepper> -->
        <a-input
          @change="e =>changeName(e.target.value, record.key, col)"
          v-if="col == 'printName'"
          :key="col"
          :value="record.printName"
          style="background-color: rgba(255,255,255,0); border:none;"
        />
        <a-input
          @change="e =>changeNum(e.target.value, record.key, col)"
          v-if="col == 'printNumber'"
          :key="col"
          :value="record.printNumber"
          style="background-color: rgba(255,255,255,0); border:none;"
        />
        <a-input
          v-if="col == 'total_price'"
          :key="col"
          :value="record.total_price"
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
    dataSizes: {},
    dataSizeTexts: {
      type: Array
    },
    sizes: {
      type: Array
    }
  },
  components: {},
  created() {
    this.data1 = this.dataSizes;
  },
  data() {
    return {
      dataList1: ["size", "printName", "printNumber", "total_price"],
      // table
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
          title: "名字",
          dataIndex: "printName",
          key: "printName",
          width: "30%",
          scopedSlots: { customRender: "printName" }
        },
        {
          title: "号码",
          dataIndex: "printNumber",
          key: "printNumber",
          width: "20%",
          scopedSlots: { customRender: "printNumber" }
        },
        {
          title: "合计价格",
          dataIndex: "total_price",
          key: "total_price",
          width: "30%",
          scopedSlots: { customRender: "total_price" }
        },

        {
          title: "操作",
          key: "action",
          scopedSlots: { customRender: "operation" }
        }
      ],
      data1: "",

      errors: []
    };
  },
  methods: {
    handleChange(key, column, value) {
      console.log(key, column, value);
      let newData = [...this.data1];
      console.log(newData);
      let target = newData.filter(item => key == item.key)[0];
      console.log(target);
      if (target) {
        console.log(target.size.length);
        target.size = value;
      }
      this.data = newData;
      this.$emit("getList", this.data1);
    },

    changeName(value, key, column) {

      console.log(value, key, column)
      let newData = [...this.data1];
      console.log(newData);
      let target = newData.filter(item => key == item.key)[0];
      console.log(target);
      if (target) {
        target.printName = value;
      }
      this.data1 = newData;
      this.$emit("getList", this.data1);
    },

    changeNum(value, key, column) {
      console.log(value, key, column)
      let newData = [...this.data1];
      console.log(newData);
      let target = newData.filter(item => key == item.key)[0];
      console.log(target);
      if (target) {
        target.printNumber = value;
      }
      this.data1 = newData;
      this.$emit("getList", this.data1);
    },
    newMember() {
      const length = this.data1.length;
      this.data1.push({
        key:
          length === 0
            ? "1"
            : (parseInt(this.data1[length - 1].key) + 1).toString(),
            price: this.dataSizeTexts[0].price,
        total_price: this.dataSizeTexts[0].price,
        name: this.dataSizeTexts[0].printName,
        num: this.dataSizeTexts[0].printNumber,
        size: this.sizes,
        goods_id: this.dataSizeTexts[0].goods_id,
        des_id: this.dataSizeTexts[0].des_id
      });
    },

    remove(key) {
      const newData = this.data1.filter(item => item.key !== key);
      this.data1 = newData;
      this.$emit("getList", this.data1);
    }
  },
  watch: {},
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
