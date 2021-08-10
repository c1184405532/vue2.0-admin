<template>
  <div
    class="table-filter-box"
    :style="{ paddingTop: `${top}px`}"
  >
    <a-spin :spinning="loading">
      <a-form :form="form">
        <a-row :gutter="24">
          <a-col
            v-for="(rowItem, rowKey) in items"
            v-bind="computedColAttr(rowItem, rowKey)"
            :key="rowKey"
          >
            <a-form-item
              v-bind="computedFormItemAttr(rowItem, rowKey)"
            >
              <a-input
                v-if="rowItem.type === 'input'"
                v-decorator="createDecorator(rowItem, rowKey)"
                v-bind="computedRowAttr(rowItem, rowKey)"
                @change="v => { handleChange(v, rowItem, rowKey) }"
              />
              <a-select
                v-if="rowItem.type === 'select'"
                v-decorator="createDecorator(rowItem, rowKey)"
                @change="v => { handleChange(v, rowItem, rowKey) }"
                v-bind="computedRowAttr(rowItem, rowKey)"
                :show-search="rowItem.showSearch"
                :labelInValue="false"
              >
                <a-select-option
                  v-for="option in rowItem.selectOptions"
                  :value="option.value"
                  :key="option.value"
                >
                  {{ option.label }}
                </a-select-option>
              </a-select>
              <!-- <a-input
                v-if="column.type === 'input'"
                v-decorator="[
                  columnKey,
                  { initialValue: column.defaultValue, rules: column.rules }
                ]"
                @change="
                  value => {
                    handleChange(value, columnKey);
                  }
                "
                :disabled="column.disabled"
                :placeholder="column.placeholder || `请输入`"
              />
              <a-select
                v-if="column.type === 'select'"
                v-decorator="[
                  columnKey,
                  { initialValue: column.defaultValue, rules: column.rules }
                ]"
                @change="
                  value => {
                    handleChange(value, columnKey);
                  }
                "
                :disabled="column.disabled"
                :show-search="column.showSearch"
                :labelInValue="false"
                :placeholder="column.placeholder || `请选择`"
              >
                <a-select-option
                  v-for="option in column.selectOptions"
                  :value="option.value"
                  :key="option.value"
                >
                  {{ option.label }}
                </a-select-option>
              </a-select>

              <a-date-picker
                v-if="column.type === `datePicker`"
                v-decorator="[
                  columnKey,
                  { initialValue: column.defaultValue, rules: column.rules }
                ]"
                :format="column.format"
                :valueFormat="column.format"
                :show-time="column.showTime || false"
                :disabled="column.disabled"
                :placeholder="column.placeholder"
              />
              <a-range-picker
                v-if="column.type === `rangePicker`"
                v-decorator="[
                  columnKey,
                  { initialValue: column.defaultValue, rules: column.rules }
                ]"
                :format="column.format"
                :valueFormat="column.format"
                :show-time="column.showTime || false"
                :disabled="column.disabled"
                :placeholder="column.placeholder"
              />
              <a-tree-select
                v-if="column.type === `a-tree-select`"
                v-decorator="[
                  columnKey,
                  { initialValue: column.defaultValue, rules: column.rules }
                ]"
                @change="
                  value => {
                    handleChange(value, columnKey);
                  }
                "
                :treeData="column.selectOptions || []"
                :allowClear="true"
                :disabled="column.disabled"
                :placeholder="column.placeholder || `请选择`"
              /> -->
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <div class="btn-box">
        <div class="table-btn">
          <a-button
            v-for="btn in actionBtns"
            @click="actionClick(btn)"
            :key="btn.name"
            :type="btn.type || `primary`"
            class="left-btn"
          >
            {{ btn.name }}
          </a-button>
        </div>
        <div class="search-btn">
          <a-button type="primary" @click="handSearch">查询</a-button>
          <a-button class="reset" @click="handReset">重置</a-button>
        </div>
      </div>
    </a-spin>
  </div>
</template>

<script>
import moment from "moment";
export default {
  components: {},
  /**
   * @onSearch { onSearch } 点击搜索  回调参数 Function({key:value})
   *
   * @onChange { onChange } 内容改变 回调参数 Function({key:key,value:value,label:label}) label在下拉选择会出现
   *
   * @onReset { onReset } 点击重置 回调参数 Function(undefined)
   */
  props: {
    /**
     * 筛选条件
     * @param { Object }，columns:{
     *  province:{ title:"省/直辖市",type:"select",defaultValue:"1011",placeholder:"请选择省/直辖市",selectOptions:[{label:"四 川省 ",value:'1011'},{label:"北京市",value:'1012'}] },
     *  title也可以设置为label，这里是当时写组件时考虑不周，用了title字段，为了保持兼容，所以label 和title都可以
     * }
     * 对象名=查询返回的ke。
     * @param { String } title：显示的标题名。
     * @param { String } type：筛选项类型，目前支持（input & select）。
     * @param { String|Number } defaultValue：String|Number，默认值。
     * @param { Object } rules：规则，具体信息查看 https://1x.antdv.com/components/form-cn/#%E6%A0%A1%E9%AA%8C%E8%A7%84%E5%88%99
     * @param { String } placeholder：""，
     * @param { Array[Obj] } selectOptions：type === select时需要的下拉选择数据。
     * ****@param { selectOptions：Obj } 格式为{label:"名称",value:"名称对应的实际value（）"}
     */
    items: {
      type: Object,
      default: function() {
        return {};
      }
    },
    /**
     * @param { String } name 按钮名。
     * @param { String } type 按钮类型 同antd button type。
     */
    actionBtns: {
      type: Array,
      default: function() {
        return [];
      }
    },
    top: {
      type: Number
    },
    /**
     * 加载中，用于处理需要从后端接口获取数据的loading状态
     */
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      moment,
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "tableFilter" }),
      dateFormat: "YYYY/MM/DD",
      monthFormat: "YYYY/MM",
      dateFormatList: ["DD/MM/YYYY", "DD/MM/YY"],
      rangePickerFirstChangeDate: "",
      layout: {
        xl: 6,
        xxl: 6,
        labelCol: { span: 5 }
      }
    };
  },
  computed: {
  },
  created() {},
  mounted() {
    console.log("computedColAttr", this.computedColAttr({ name: 1 }, 5));
  },
  watch: {},
  destroyed() {},
  methods: {
    handSearch() {
      const fieldsValue = this.form.getFieldsValue();
      this.$emit("onSearch", fieldsValue);
    },

    handReset() {
      const resetKeys = {};
      for (const key in this.columns) {
        resetKeys[key] = this.columns[key].defaultValue
          ? this.columns[key].defaultValue
          : undefined;
      }
      this.form.setFieldsValue({
        ...resetKeys
      });
      this.rangePickerFirstChangeDate = "";
      this.$emit("onReset");
    },

    handleChange(value, rowItem, rowKey) {
      const { type, selectOptions } = rowItem;
      value = type === "input" ? value.target.value : value; // 如果是input 取target下的值
      let label = value;
      if (type === "select") {
        label = selectOptions.filter(option => value === option.value)[0].label // 下拉框获取label值
      }
      this.$emit("onChange", { key: rowKey, label, value });
    },

    actionClick(params) {
      this.$emit("actionClick", params);
    },

    rangePickerCalendarChange(dates) {
      const [startDate] = dates;
      this.rangePickerFirstChangeDate = startDate;
    },

    rangePickerChange(dates) {
      if (dates.length === 0) {
        this.rangePickerFirstChangeDate = "";
      }
    },

    rangePickerDisabledDate(current) {
      if (this.rangePickerFirstChangeDate) {
        const oldDate = moment(this.rangePickerFirstChangeDate).subtract(
          30,
          "days"
        );
        const newDate = moment(this.rangePickerFirstChangeDate).add(30, "days");
        return current < oldDate || current > newDate;
      }
    },

    setLabelWidth(item, key) {
      this.$nextTick(() => {
        const firstLabelDoms = document.querySelectorAll(
          `div._table-filter-row-first-label-${key} > div.ant-form-item > div.ant-form-item-label`
        );
        const labelDoms = document.querySelectorAll(
          `div._table-filter-row-label-${key} > div.ant-form-item > div.ant-form-item-label`
        );
        try {
          firstLabelDoms.forEach(label => {
            //  if(item.firstLabelWidth){
            label.style.width = (item.firstLabelWidth || 60) + "px";
            //  }
          });
          labelDoms.forEach(label => {
            //  if(item.labelWidth){
            label.style.width = (item.labelWidth || 60) + "px";
            //  }
          });
        } catch (error) {
          console.error(error);
        }
      });
    },

    computedColAttr(rowItem, rowKey) {
      const colOptions = {
        xs: 6,
        sm: 6,
        md: 6,
        lg: 6,
        xl: 6,
        xxl: 6
      }
      return {
        ...colOptions,
        class: `_table-filter-row-label-${rowKey}`,
        style: this.setLabelWidth(rowItem, rowKey)
      }
    },

    computedFormItemAttr(rowItem, rowKey) {
      return {
        label: rowItem.label,
        labelCol: rowItem.labelCol || { span: 5 }
      }
    },

    computedRowAttr(rowItem, rowKey) {
      const { type, disabled, placeholder, label } = rowItem;
      const defaultPlaceholder = type === "input" ? "请输入" : "请选择"
      return {
        disabled,
        placeholder: placeholder || `${defaultPlaceholder}${label}`
      }
    },

    createDecorator(rowItem, rowKey) {
      const { defaultValue, rules } = rowItem;
      return [rowKey, { initialValue: defaultValue, rules: rules }];
    }
  }
};
</script>
<style lang="less">
.table-filter-box {
  .ant-form-item,
  .ant-form-item-children {
    display: flex;
    //align-items: center;
  }
  .ant-form-item-control-wrapper,
  .ant-calendar-picker {
    flex: 1 !important;
  }
  .ant-form-item {
    height: 30px;
    display: flex;
    align-items: center;
    margin-bottom: 18px;
  }
  .ant-input,
  .ant-select {
    font-size: 12px;
  }
  .ant-form-item-label {
    overflow: hidden;
  }
  .ant-form-explain {
    margin-bottom: 6px;
  }
}
</style>
<style scoped lang="less">
.table-filter-box {
  background: #fff;
  padding: 24px 0px 0px;
  padding-bottom: 10px;
  border-radius: 4px;
  .btn-box {
    display: flex;
    justify-content: space-between;
    margin-top: 6px;
    .table-btn {
      .left-btn {
        margin-right: 20px;
      }
    }
    .reset {
      margin-left: 20px;
      margin-right: 12px;
    }
  }
}
</style>
