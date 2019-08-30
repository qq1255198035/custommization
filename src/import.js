import Vue from "vue";
import {
  Row,
  Col,
  Button,
  Menu,
  Icon,
  Input,
  Upload,
  Tag,
  Slider,
  Drawer,
  Switch,
  Checkbox,
  Select,
  Table,
  Steps,
  Avatar,
  Divider,
  DatePicker,
  Modal,
  Radio,
  Layout,
  List,
  Form,
  Popover,
  Progress,
  Message,
  notification,
  Pagination,
  Badge,
  LocaleProvider,
  Cascader,
  Tabs
} from "ant-design-vue";
Vue.use(Button);
Vue.use(Row);
Vue.use(Col);
Vue.use(Menu);
Vue.use(Icon);
Vue.use(Input);
Vue.use(Upload);
Vue.use(Tag);
Vue.use(Slider);
Vue.use(Drawer);
Vue.use(Switch);
Vue.use(Checkbox);
Vue.use(Select);
Vue.use(Table);
Vue.use(Steps);
Vue.use(Avatar);
Vue.use(Divider);
Vue.use(DatePicker);
Vue.use(Modal);
Vue.use(Radio);
Vue.use(Layout);
Vue.use(List);
Vue.use(Form);
Vue.use(Popover);
Vue.use(Progress);
Vue.use(notification);
Vue.use(Pagination);
Vue.use(Form);
Vue.use(Badge);
Vue.use(LocaleProvider);
Vue.use(Cascader);
Vue.use(Tabs);
Vue.prototype.$message = Message;
Vue.prototype.$confirm = Modal.confirm
Vue.prototype.$info = Modal.info
Vue.prototype.$success = Modal.success
Vue.prototype.$error = Modal.error
Vue.prototype.$warning = Modal.warning
