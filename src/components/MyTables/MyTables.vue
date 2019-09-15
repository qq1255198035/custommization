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
          style="text-align: center;width: 100%;background:#fff"
        >
          <a-select-option
            v-for="(sitem,index) in targetList.sizess"
            :key="index"
            :value="sitem"
          >{{sitem}}</a-select-option>
        </a-select>
        <!-- <Stepper :num="record.number" @onPropsChange="change(record.key,col,)" v-if="col == 'number'" :key="col"></Stepper> -->
        <a-input
          @change="e =>changeName(e.target.value, record.key, col)"
          @keyup="e => changeEn(e.target.value)"
          v-if="col == 'printName'"
          :key="col"
          :value="record.printName"
          :disabled="record.is_print_text === 0"
          style="text-align: center;background-color: rgba(255,255,255,0);"
        />
        <a-input
          @change="e =>changeNum(e.target.value, record.key, col)"
          v-if="col == 'printNumber'"
          :key="col"
          :value="record.printNumber"
          :disabled="record.is_print_number === 0"
          type="number"
          style="text-align: center;background-color: rgba(255,255,255,0);"
        />
        <a-input
          v-if="col == 'price'"
          :key="col"
          :value="record.price"
          style="text-align: center; border:none;"
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
      @newMembers="newMembers"
      :width="'100%'"
      :title="'Add'"
      :height="'40px'"
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
    dataName: {}
  },
  components: {
    commonBtn
  },
  created() {
    this._price1();
  },
  data() {
    return {
      dataList1: [
        "size",
        "printName",
        "printNumber",
        "is_print_text",
        "is_print_number",
        "total_price"
      ],
      // table
      quantity: 1,
      memberLoading: false,
      columns: [
        {
          title: "SIZE",
          dataIndex: "size",
          key: "size",
          algin: "center",
          width: "20%",
          scopedSlots: { customRender: "size" }
        },
        {
          title: "Name",
          dataIndex: "printName",
          algin: "center",
          key: "printName",
          width: "20%",
          scopedSlots: { customRender: "printName" }
        },
        {
          title: "Number",
          dataIndex: "printNumber",
          key: "printNumber",
          algin: "center",
          width: "20%",
          scopedSlots: { customRender: "printNumber" }
        },
        {
          title: "Total Price",
          dataIndex: "price",
          key: "price",
          algin: "center",
          width: "20%",
          scopedSlots: { customRender: "price" }
        },

        {
          title: "action",
          width: "20%",
          key: "action",
          algin: "center",
          scopedSlots: { customRender: "operation" }
        }
      ],
      data1: "",
      sizes: [],
      targetList: {},
      errors: []
    };
  },
  methods: {
    _price1() {
      let dataList = [];
      dataList = this.dataName;
      this.data1 = dataList;
      this.sizes = this.data1[0].sizes;
      console.log(this.dataName);
      this.data1[0].total_price = this.data1[0].price;
      this.targetList = {
        price: this.data1[0].price,
        number: this.data1[0].number,
        is_print_number: this.data1[0].is_print_number,
        is_print_text: this.data1[0].is_print_text,
        printName: this.data1[0].printName,
        printNumber: this.data1[0].printNumber,
        sizess: this.data1[0].sizes,
        goods_id: this.data1[0].goods_id,
        des_id: this.data1[0].des_id,
        positive_pic_url: this.data1[0].positive_pic_url,
        back_pic_url: this.data1[0].back_pic_url,
        left_pic_url: this.data1[0].left_pic_url,
        right_pic_url: this.data1[0].right_pic_url,
        color: this.data1[0].color,
        weight: this.data1[0].weight
        
      };
    },
    handleChange(key, column, value) {
      console.log(key, column, value);
      let newData = [...this.data1];
      console.log(newData);
      let target = newData.filter(item => key == item.key)[0];
      console.log(target);
      if (target) {
        target.size = value;
        target.price = target.number * target.total_price;
      }
      this.data = newData;
      if (value) {
        this.$emit("getList", this.data1);
      }
    },
    // 检验字段
    testLength(lengnum) {
      let stringLength = 0;
      let num = lengnum.length;
      let charCode = -1;
      for (let i = 0; i < num; i++) {
        charCode = lengnum.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) {
          stringLength += 1;
        } else {
          stringLength += 2;
        }
      }
      console.log(stringLength);
      return stringLength;
    },
    changeEn(value) {
      console.log(value);
      
    },
    changeName(value, key, column) {
      console.log(value);
      console.log(value, key, column);
      if (!/^[a-zA-Z]+$/.test(value)) {
        console.log("请输入英文");
        value = "";
      }else{
        value = value.toUpperCase()
      }
      if (this.testLength(value) >= 10) {
        this.$notification.error({
          message: "长度不能超过10"
        });
        value = value.substr(0, 9);
      }
      let newData = [...this.data1];
      console.log(newData);
      let target = newData.filter(item => key == item.key)[0];
      console.log(target);
      if (target) {
        target.printName = value;
      }
      this.data1 = newData;
      if (value) {
        this.$emit("getList", this.data1);
      }
      //callback(new Error('长度过长'))

      //callback(new Error('请输入英文'))
    },

    changeNum(value, key, column) {
      if(!/^\d{2}$/.test(value) >= 2) {
        this.$notification.error({
          message: "输入两位数字"
        });
        value = value.substr(0, 1);
      }
      value = value.substr(0, 9);
        console.log(value, key, column);
        let newData = [...this.data1];
        console.log(newData);
        let target = newData.filter(item => key == item.key)[0];
        console.log(target);
        if (target) {
          target.printNumber = value;
        }
        this.data1 = newData;
        if (value) {
          this.$emit("getList", this.data1);
        }
    },
    newMembers() {
      const length = this.data1.length;
      console.log(length);
      this.data1.push({
        key:
          length === 0
            ? "1"
            : (parseInt(this.data1[length - 1].key) + 1).toString(),
        price: this.targetList.price,
        is_print_number: this.targetList.is_print_number,
        is_print_text: this.targetList.is_print_text,
        printName: this.targetList.printName,
        printNumber: this.targetList.printNumber,
        number: this.targetList.number,
        size: this.targetList.sizess,
        goods_id: this.targetList.goods_id,
        des_id: this.targetList.des_id,
        total_price: this.targetList.price,
        positive_pic_url: this.targetList.positive_pic_url,
        back_pic_url: this.targetList.back_pic_url,
        left_pic_url: this.targetList.left_pic_url,
        right_pic_url: this.targetList.right_pic_url,
        color: this.targetList.color,
        weight: this.targetList.weight
      });
      console.log(this.data1);
    },

    remove(key) {
      let newData = [...this.data1];
      newData = this.data1.filter(item => item.key !== key);
      let newData2 = [...this.data];
      this.data1 = newData;
      let target = newData2.filter(item => key == item.key)[0];
      if (target) {
        target.price = 0;
      }
      this.data1 = newData;
      this.data2 = newData2;
      this.$emit("getList", this.data2);
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
