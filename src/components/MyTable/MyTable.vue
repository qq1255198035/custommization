<template>
  <div id="table">
    <a-table
      :columns="colmons"
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
          placeholder="Select Size"
        >
          <a-select-option
            v-for="(sitem,index) in targetList.sizess"
            :key="index"
            :value="sitem"
          >{{sitem}}</a-select-option>
        </a-select>
        <!-- <Stepper :num="record.number" @onPropsChange="change(record.key,col,)" v-if="col == 'number'" :key="col"></Stepper> -->
        <div id="steppers" v-if="col == 'number'" :key="col">
          <button class="left" @click="clickLeftbtn(record.key,col)">-</button>
          <input type="number" min="1" max="Infinity" class="stepper-input" :value="record.number" disabled/>
          <button class="right" @click="clickRightbtn(record.key,col)">+</button>
        </div>
        <a-input
          class="text-cen btn-width"
          v-if="col == 'price'"
          :key="col"
          :value="record.price"
          style="background-color: rgba(255,255,255,0); border:none;"
        >
          <a-icon slot="prefix" type="dollar" />
        </a-input>
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
      :title="'Add'"
      :height="'45px'"
      :padding="'10px'"
      :radio="'12px'"
      :fontsize="'18px'"
      :top="'20px'"
    ></commonBtn>
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
    dataList: [],
    dataSize: {},
    dataSizeText: {
      type: Array
    },
    columns: {
      type: Array
    }
  },
  components: {
    commonBtn
  },
  created() {
    this._price();
  },
  mounted() {},
  data() {
    return {
      // table
      sizes: [],
      dataLists: ["size", "number", "total_price"],
      targetList: [],
      memberLoading: false,
      colmons: [
        {
          title: "SIZE",
          dataIndex: "size",
          width: "25%",
          align: "center",
          scopedSlots: { customRender: "size" }
        },
        {
          title: "Quantity",
          dataIndex: "number",
          key: "number",
          width: "25%",
          align: "center",
          scopedSlots: { customRender: "number" }
        },
        {
          title: "Total Price($)",
          dataIndex: "price",
          key: "price",
          width: "25%",
          align: "center",
          scopedSlots: { customRender: "price" }
        },
        {
          title: "Delete",
          width: "25%",
          key: "action",
          align: "center",
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
      let dataList = [];
      dataList = this.dataSize;
      this.data = dataList;
      this.sizes = this.data[0].sizes;
      this.data[0].total_price = this.data[0].price;
      this.targetList = {
        price: this.data[0].price,
        number: this.data[0].number,
        printName: this.data[0].printName,
        printNumber: this.data[0].printNumber,
        sizess: this.data[0].sizes,
        goods_id: this.data[0].goods_id,
        des_id: this.data[0].des_id,
        positive_pic_url: this.data[0].positive_pic_url,
        back_pic_url: this.data[0].back_pic_url,
        left_pic_url: this.data[0].left_pic_url,
        right_pic_url: this.data[0].right_pic_url,
        color: this.data[0].color,
        weight: this.data[0].weight,
        name: this.data[0].name
      };
    },
    handleChange(key, column, value) {
      let newData = [...this.data];
      let target = newData.filter(item => key == item.key)[0];
      if (target) {
        target.size = value;
        target.price = target.number * target.total_price;
      }
      this.data = newData;
      this.$emit("getList", this.data);
    },
    /** 减**/
    clickLeftbtn(key, column) {
      let newData = [...this.data];
      let target = newData.filter(item => key == item.key)[0];
      if (target) {
        if (target[column] > 0) {
          target[column]--;
        } else {
          target[column] = 0;
        }
        target.price = target[column] * target.total_price;
      }
      this.data = newData;
      this.$emit("getList", this.data);
    },
    /** 加**/
    clickRightbtn(key, column) {
      let newData = [...this.data];
      let target = newData.filter(item => key == item.key)[0];
      if (target) {
        target[column]++;
        target.price = target[column] * target.total_price;
      }
      this.data = newData;
      this.$emit("getList", this.data);
    },
    /** 添加**/
    newMember() {
      const length = this.data.length;
      this.data.push({
        key:
          length === 0
            ? "1"
            : (parseInt(this.data[length - 1].key) + 1).toString(),
        price: this.targetList.price,
        number: this.targetList.number,
        printName:this.targetList.printName,
        printNumber:this.targetList.printNumber,
        size: '',
        goods_id: this.targetList.goods_id,
        des_id: this.targetList.des_id,
        total_price: this.targetList.price,
        positive_pic_url: this.targetList.positive_pic_url,
        back_pic_url: this.targetList.back_pic_url,
        left_pic_url: this.targetList.left_pic_url,
        right_pic_url: this.targetList.right_pic_url,
        color: this.targetList.color,
        weight: this.targetList.weight,
        name: this.targetList.name
      });
    },

    remove(key) {
      let newData = [...this.data]
      newData = this.data.filter(item => item.key !== key);
      let newData1 = [...this.data]
      let target = newData1.filter(item => key == item.key)[0];
      if(target) {
        target.price = 0;
      }
      this.data = newData;
      this.data1 = newData1
      this.$emit("getList", this.data1);
    }
  },
  watch: {
    number(val) {
      if (val) {
        return val * this.data[0].price;
      } else {
        return 0;
      }
    }
  },
  filters: {
    addDollar(val){
      return '$' + val
    }
  }
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
