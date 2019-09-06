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
        <a-select
          class="btn-width"
          @change="handleChange(record.key,col,$event)"
          v-if="col == 'size'"
          :key="col"
          placeholder="请选择尺码"
        >
          <a-select-option v-for="(sitem,index) in size" :key="index" :value="sitem">{{sitem}}</a-select-option>
        </a-select>
        <!-- <Stepper :num="record.number" @onPropsChange="change(record.key,col,)" v-if="col == 'number'" :key="col"></Stepper> -->
        <div id="steppers" v-if="col == 'quantity'" :key="col">
          <button class="left" @click="clickLeftbtn(record.key,col)">-</button>
          <input
            type="number"
            min="1"
            max="Infinity"
            class="stepper-input"
            :value="record.quantity"
          />
          <button class="right" @click="clickRightbtn(record.key,col)">+</button>
        </div>
        <a-input
          class="text-cen btn-width"
          v-if="col == 'total_price'"
          :key="col"
          :value="record.total_price"
          style="background-color: rgba(255,255,255,0); border:none;"
        />
      </template>
      <template slot="operation" slot-scope="text, record">
        <span>
          <a @click="remove(record.key)">
            <a-icon type="delete" style="font-size: 18px;color: #999" />
          </a>
        </span>
      </template>
    </a-table>
    <commonBtn
      :icon="'plus'"
      @newMember="newMember"
      :width="'100%'"
      :title="'添加'"
      :height="'45px'"
      :padding="'10px'"
      :radio="'12px'"
      :fontsize="'18px'"
      :top="'20px'"

    >
    
    </commonBtn>
    <!--<a-button
      style="width: 100%; margin-top: 20px;height:45px"
      icon="plus"
      @click="newMember"
    >添加</a-button>-->
  </div>
</template>
<script>
import commonBtn from "@/components/commonBtn/commonBtn";
export default {
  props: {
    dataList: {},
    dataSize: {},
    dataSizeText: {
      type: Array
    },
    size: {
      type: Array
    }
  },
  components: {
    commonBtn
  },
  created() {
    this._price();
  },
  data() {
    return {
      // table
      dataLists: ["size", "quantity", "total_price"],

      memberLoading: false,
      columns: [
        {
          title: "尺码",
          dataIndex: "size",
          key: "size",
          width: "25%",
          align: 'center',
          scopedSlots: { customRender: "size" }
        },
        {
          title: "数量",
          dataIndex: "quantity",
          key: "quantity",
          width: "25%",
          align: 'center',
          scopedSlots: { customRender: "quantity" }
        },
        {
          title: "合计价格",
          dataIndex: "total_price",
          key: "total_price",
          width: "25%",
          align: 'center',
          scopedSlots: { customRender: "total_price" }
        },
        {
          title: "操作",
          width: "25%",
          key: "action",
          align: 'center',
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
      this.data = this.dataSize;
      console.log(this.dataSize);
    },
    handleChange(key, column, value) {
      console.log(key, column, value);
      let newData = [...this.data];
      console.log(newData);
      let target = newData.filter(item => key == item.key)[0];
      console.log(target);
      if (target) {
        console.log(target.size.length);
        target.size = value;
      }
      this.data = newData;
      this.$emit("getList", this.data);
    },
    /** 减**/
    clickLeftbtn(key, column) {
      let newData = [...this.data];
      console.log(newData);
      let target = newData.filter(item => key == item.key)[0];
      console.log(target);
      if (target) {
        if (target[column] > 1) {
          target[column]--;
        } else {
          target[column] = 1;
        }
        target.total_price = target[column] * this.dataSizeText[0].price;
      }
      this.data = newData;
      this.$emit("getList", this.data);
    },
    /** 加**/
    clickRightbtn(key, column) {
      console.log(this.dataSize);
      console.log(this.data);
      let newData = [...this.data];
      let target = newData.filter(item => key == item.key)[0];
      console.log(target);
      if (target) {
        target[column]++;
        target.total_price = target[column] * this.dataSizeText[0].price;
      }
      this.data = newData;
      console.log(this.data);
      this.$emit("getList", this.data);
    },
    /** 添加**/
    newMember() {
      const length = this.data.length;
      console.log(this.dataSizeText[0]);
      console.log(this.dataSize);
      this.data.push({
        key:
          length === 0
            ? "1"
            : (parseInt(this.data[length - 1].key) + 1).toString(),
        price: this.dataSizeText[0].price,
        total_price: this.dataSizeText[0].price,
        quantity: this.dataSizeText[0].number,
        size: this.size,
        goods_id: this.dataSizeText[0].goods_id,
        des_id: this.dataSizeText[0].des_id
      });
    },

    remove(key) {
      console.log(key);
      const newData = this.data.filter(item => item.key !== key);
      console.log(newData);
      this.data = newData;
      this.$emit("getList", this.data);
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
.ant-table-placeholder {
  color: #5ba997;
}

.btn-width {
  width: 100%;
}
.btn-height {
  height: 56px;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0;
}
#steppers {
  .stepper-input {
    box-sizing: border-box;
    width: 32px;
    height: 28px;

    padding: 0;
    color: #999;
    font-size: 14px;
    text-align: center;
    vertical-align: middle;
    background-color: rgba(255, 255, 255, 0.5);
    border: 0;
    border-width: 1px 0;
    border-radius: 0;
    -webkit-appearance: none;
    outline: none;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
  }
  .left {
    position: relative;
    box-sizing: border-box;
    width: 28px;
    height: 28px;
    margin: 0;
    padding: 5px;
    color: #999;
    vertical-align: middle;
    background-color: rgba(255, 255, 255);
    border: 0;
    border-radius: 4px 0 0 4px;
    border: 1px solid #eee;
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
    color: #999;
    vertical-align: middle;
    background-color: rgba(255, 255, 255);
    border: 0;
    border-radius: 0 4px 4px 0;
    border: 1px solid #eee;
    outline: none;
    cursor: pointer;
    line-height: 14px;
  }
}
</style>
