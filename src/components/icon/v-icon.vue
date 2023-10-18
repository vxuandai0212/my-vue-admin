<template>
  <component :is="ICON[props.icon]" />
</template>
<script setup lang="ts">
import SvgBill from '@/components/svg/svg-bill.vue'
import SvgDelete from '@/components/svg/svg-delete.vue'
import SvgDescription from '@/components/svg/svg-description.vue'
import SvgFrom from '@/components/svg/svg-from.vue'
import SvgSave from '@/components/svg/svg-save.vue'
import SvgUpload from '@/components/svg/svg-upload.vue'
import SvgEmail from '@/components/svg/svg-email.vue'
import SvgFullname from '@/components/svg/svg-fullname.vue'
import SvgPassword from '@/components/svg/svg-password.vue'
import SvgRate from '@/components/svg/svg-rate.vue'
import SvgBusiness from '@/components/svg/svg-business.vue'
import SvgCaretDown from '@/components/svg/svg-caret-down.vue'
import SvgCompany from '@/components/svg/svg-company.vue'
import SvgDate from '@/components/svg/svg-date.vue'
import SvgPhone from '@/components/svg/svg-phone.vue'
import SvgInvoice from '@/components/svg/svg-invoice.vue'
import SvgCart from '@/components/svg/svg-cart.vue'
import SvgHour from '@/components/svg/svg-hour.vue'
import SvgMoney from '@/components/svg/svg-money.vue'
import SvgAdd from '@/components/svg/svg-add.vue'
import SvgThreeDot from '@/components/svg/svg-three-dot.vue'
import SvgHamburger from '@/components/svg/svg-hamburger.vue'
import SvgSearch from '@/components/svg/svg-search.vue'
import SvgNotification from '@/components/svg/svg-notification.vue'
import SvgCreate from '@/components/svg/svg-create.vue'
import SvgLaptop from '@/components/svg/svg-laptop.vue'
import SvgDiamond from '@/components/svg/svg-diamond.vue'
import SvgKeyboard from '@/components/svg/svg-keyboard.vue'

defineOptions({ name: 'VIcon' })

export type Icon =
  | 'bill'
  | 'delete'
  | 'description'
  | 'from'
  | 'save'
  | 'upload'
  | 'fullname'
  | 'email'
  | 'password'
  | 'rate'
  | 'business'
  | 'caret-down'
  | 'company'
  | 'date'
  | 'phone'
  | 'invoice'
  | 'cart'
  | 'hour'
  | 'money'
  | 'add'
  | 'three-dot'
  | 'hamburger'
  | 'search'
  | 'notification'
  | 'create'
  | 'laptop'
  | 'diamond'
  | 'keyboard'

interface Props {
  icon: Icon
}

interface IconType {
  [key: string]: any
}

const ICON: IconType = {
  bill: SvgBill,
  delete: SvgDelete,
  description: SvgDescription,
  from: SvgFrom,
  save: SvgSave,
  upload: SvgUpload,
  fullname: SvgFullname,
  email: SvgEmail,
  password: SvgPassword,
  rate: SvgRate,
  business: SvgBusiness,
  'caret-down': SvgCaretDown,
  company: SvgCompany,
  date: SvgDate,
  phone: SvgPhone,
  invoice: SvgInvoice,
  cart: SvgCart,
  hour: SvgHour,
  money: SvgMoney,
  add: SvgAdd,
  'three-dot': SvgThreeDot,
  hamburger: SvgHamburger,
  search: SvgSearch,
  notification: SvgNotification,
  create: SvgCreate,
  laptop: SvgLaptop,
  diamond: SvgDiamond,
  keyboard: SvgKeyboard
}

const props = withDefaults(defineProps<Props>(), {})
</script>
