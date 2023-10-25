<template>
  <div class="flex">
    <div class="w%-60 p-21-30-83-29">
      <div
        class="color-primary-grey font-size-14 font-700 line-height-21 height-36"
      >
        {{ $t('page.invoice.detail.label') }} #AA-04-19-1890
      </div>
      <div class="mt-28">
        <div class="flex justify-between items-center height-52">
          <div class="flex gap-14 items-center">
            <div
              class="flex items-center justify-center background-color-background-light"
            >
              <v-icon icon="dropbox" class="fill-primary width-18 height-18" />
            </div>
            <div
              class="color-primary-dark font-size-20 font-700 line-height-32"
            >
              Dropbox Inc.
            </div>
            <div
              class="color-primary-grey font-size-14 font-400 line-height-21"
            >
              13 Nov 2019
            </div>
          </div>
          <tag class="p-11-28-10-28" label="page.invoice.status.paid" type="success" />
        </div>
        <div
          class="mt-30 pb-27 border-bottom-1 border-bottom-solid border-bottom-color-EEE flex justify-between"
        >
          <div>
            <div
              class="color-primary-grey font-size-12 font-700 line-height-18"
            >
              {{ $t('page.invoice.detail.description.from') }}:
            </div>
            <div
              class="mt-26 color-primary-grey font-14 font-700 line-height-21"
            >
              WhiteOnWhite
            </div>
            <div class="mt-20 flex flex-col items-left gap-5">
              <div
                class="color-primary-dark font-size-14 font-400 line-height-21"
              >
                The Business Centre
              </div>
              <div
                class="color-primary-dark font-size-14 font-400 line-height-21"
              >
                61 Wellfield Road
              </div>
              <div
                class="color-primary-dark font-size-14 font-400 line-height-21"
              >
                Roath
              </div>
              <div
                class="color-primary-dark font-size-14 font-400 line-height-21"
              >
                Cardiff
              </div>
              <div
                class="color-primary-dark font-size-14 font-400 line-height-21"
              >
                CF24 3DG
              </div>
              <div
                class="color-primary-dark font-size-14 font-400 line-height-21"
              >
                mail@wonw.xyz
              </div>
              <div
                class="color-primary-dark font-size-14 font-400 line-height-21"
              >
                +1 456–980-3004
              </div>
            </div>
          </div>
          <div class="text-right">
            <div
              class="color-primary-grey font-size-12 font-700 line-height-18"
            >
              {{$t('page.invoice.detail.description.to')}}:
            </div>
            <div
              class="mt-26 color-primary-grey font-14 font-700 line-height-21"
            >
              Dropbox Inc.
            </div>
            <div class="mt-20 flex flex-col items-left gap-5">
              <div
                class="color-primary-dark font-size-14 font-400 line-height-21"
              >
                3 Edgar Buildings
              </div>
              <div
                class="color-primary-dark font-size-14 font-400 line-height-21"
              >
                George Street
              </div>
              <div
                class="color-primary-dark font-size-14 font-400 line-height-21"
              >
                Bath
              </div>
              <div
                class="color-primary-dark font-size-14 font-400 line-height-21"
              >
                England
              </div>
              <div
                class="color-primary-dark font-size-14 font-400 line-height-21"
              >
                BA1 2FJ
              </div>
              <div
                class="color-primary-dark font-size-14 font-400 line-height-21"
              >
                mail@dropdox.com
              </div>
              <div
                class="color-primary-dark font-size-14 font-400 line-height-21"
              >
                +1 736–140-1003
              </div>
            </div>
          </div>
        </div>
        <div class="mt-22">
          <div class="color-primary-dark font-size-18 font-700 line-height-27">
            {{ $t('page.invoice.detail.description._value') }}
          </div>
          <div class="mt-17">
            <div
              class="p-0-14-0-14 height-39 rounded-6 flex background-color-background-light items-center color-primary-grey font-size-12 font-700 line-height-18"
            >
              <div class="flex-grow">{{ $t('page.invoice.detail.description.item') }}</div>
              <div class="w%-14">{{ $t('page.invoice.detail.description.hour') }}</div>
              <div class="w%-14 text-center">{{ $t('page.invoice.detail.description.rate') }}</div>
              <div class="w%-14 text-right">{{ $t('page.invoice.detail.description.amount') }}</div>
            </div>
            <div class="mt-16 flex flex-col gap-16">
              <div class="flex p-0-14-0-14">
                <div class="flex-grow">CRM UI design</div>
                <div class="w%-14">356</div>
                <div class="w%-14 text-center">$10</div>
                <div class="w%-14 text-right">$3560</div>
              </div>
              <div class="flex p-0-14-0-14">
                <div class="flex-grow">CRM coding HTML & CSS</div>
                <div class="w%-14">420</div>
                <div class="w%-14 text-center">$20</div>
                <div class="w%-14 text-right">$8400</div>
              </div>
            </div>
            <div class="flex justify-end p-0-14-0-14">
              <div class="mt-30 w%-42 flex flex-col gap-16">
                <div class="flex justify-between">
                  <div
                    class="color-primary-dark font-size-14 font-700 line-height-21"
                  >
                  {{ $t('page.invoice.detail.description.subtotal') }}
                  </div>
                  <div
                    class="color-primary-dark font-size-14 font-400 line-height-21"
                  >
                    $11960
                  </div>
                </div>
                <div class="flex justify-between">
                  <div
                    class="color-primary-dark font-size-14 font-700 line-height-21"
                  >
                  {{ $t('page.invoice.detail.description.tax') }} 10%
                  </div>
                  <div
                    class="color-primary-dark font-size-14 font-400 line-height-21"
                  >
                    $1196
                  </div>
                </div>
                <div class="flex justify-between">
                  <div
                    class="color-primary-dark font-size-16 font-700 line-height-24"
                  >
                  {{ $t('page.invoice.detail.description.total') }}
                  </div>
                  <div
                    class="color-primary-dark font-size-16 font-700 line-height-24"
                  >
                    $13156
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="flex-grow background-color-FBFBFD flex flex-col justify-between"
    >
      <div class="p-21-30-30-29">
        <div class="flex justify-end items-center height-36">
          <v-icon icon="three-dot" />
        </div>
        <div class="mt-28 height-52 flex flex-start items-center">
          <div class="color-primary-dark font-size-18 font-700 line-height-27">
            {{ $t('page.invoice.detail.activity') }}
          </div>
        </div>
        <div
          class="mt-30 flex flex-col gap-21 transition"
          :style="['overflow-y: scroll', `max-height: ${chatListHeight}px`]"
          ref="chatContainerRef"
        >
          <div class="self-start flex-col gap-5">
            <div class="flex gap-8">
              <img
                class="width-24 height-24 rounded-50 mt-5"
                src="@/assets/images/avatar.png"
                alt="Avatar"
              />
              <div class="flex flex-col gap-5">
                <div
                  class="rounded-19-19-19-0 p-8-17-6-15 background-color-F6F6F6 color-primary-dark font-size-14 font-400 line-height-21"
                >
                  Created invoice #AA-04-19-1890
                </div>
                <div
                  class="color-primary-grey font-size-12 font-700 line-height-18"
                >
                  04 May 2019
                </div>
              </div>
            </div>
          </div>
          <div class="self-start flex-col gap-5">
            <div class="flex gap-8">
              <img
                class="width-24 height-24 rounded-50 mt-5"
                src="@/assets/images/avatar.png"
                alt="Avatar"
              />
              <div class="flex flex-col gap-5">
                <div
                  class="rounded-19-19-19-0 p-8-17-6-15 background-color-F6F6F6 color-primary-dark font-size-14 font-400 line-height-21"
                >
                  Set due date to 13 Nov 2019
                </div>
                <div
                  class="color-primary-grey font-size-12 font-700 line-height-18"
                >
                  05 May 2019
                </div>
              </div>
            </div>
          </div>
          <div class="self-end flex-col gap-5">
            <div class="flex gap-8">
              <div class="flex flex-col gap-5 items-end">
                <div
                  class="rounded-17-17-0-17 p-8-17-6-15 background-color-primary color-white font-size-14 font-400 line-height-21"
                >
                  Invoice paid
                </div>
                <div
                  class="color-primary-grey font-size-12 font-700 line-height-18"
                >
                  04 Sep 2019
                </div>
              </div>
              <img
                class="width-24 height-24 rounded-50 mt-5"
                src="@/assets/images/avatar.png"
                alt="Avatar"
              />
            </div>
          </div>
          <div class="self-start flex-col gap-5">
            <div class="flex gap-8">
              <img
                class="width-24 height-24 rounded-50 mt-5"
                src="@/assets/images/avatar.png"
                alt="Avatar"
              />
              <div class="flex flex-col gap-5">
                <div
                  class="rounded-19-19-19-0 p-8-17-6-15 background-color-F6F6F6 color-primary-dark font-size-14 font-400 line-height-21"
                >
                  Created invoice #AA-04-19-1890
                </div>
                <div
                  class="color-primary-grey font-size-12 font-700 line-height-18"
                >
                  04 May 2019
                </div>
              </div>
            </div>
          </div>
          <div class="self-start flex-col gap-5">
            <div class="flex gap-8">
              <img
                class="width-24 height-24 rounded-50 mt-5"
                src="@/assets/images/avatar.png"
                alt="Avatar"
              />
              <div class="flex flex-col gap-5">
                <div
                  class="rounded-19-19-19-0 p-8-17-6-15 background-color-F6F6F6 color-primary-dark font-size-14 font-400 line-height-21"
                >
                  Set due date to 13 Nov 2019
                </div>
                <div
                  class="color-primary-grey font-size-12 font-700 line-height-18"
                >
                  05 May 2019
                </div>
              </div>
            </div>
          </div>
          <div class="self-end flex-col gap-5">
            <div class="flex gap-8">
              <div class="flex flex-col gap-5 items-end">
                <div
                  class="rounded-17-17-0-17 p-8-17-6-15 background-color-primary color-white font-size-14 font-400 line-height-21"
                >
                  Invoice paid
                </div>
                <div
                  class="color-primary-grey font-size-12 font-700 line-height-18"
                >
                  04 Sep 2019
                </div>
              </div>
              <img
                class="width-24 height-24 rounded-50 mt-5"
                src="@/assets/images/avatar.png"
                alt="Avatar"
              />
            </div>
          </div>
          <div class="self-start flex-col gap-5">
            <div class="flex gap-8">
              <img
                class="width-24 height-24 rounded-50 mt-5"
                src="@/assets/images/avatar.png"
                alt="Avatar"
              />
              <div class="flex flex-col gap-5">
                <div
                  class="rounded-19-19-19-0 p-8-17-6-15 background-color-F6F6F6 color-primary-dark font-size-14 font-400 line-height-21"
                >
                  Created invoice #AA-04-19-1890
                </div>
                <div
                  class="color-primary-grey font-size-12 font-700 line-height-18"
                >
                  04 May 2019
                </div>
              </div>
            </div>
          </div>
          <div class="self-start flex-col gap-5">
            <div class="flex gap-8">
              <img
                class="width-24 height-24 rounded-50 mt-5"
                src="@/assets/images/avatar.png"
                alt="Avatar"
              />
              <div class="flex flex-col gap-5">
                <div
                  class="rounded-19-19-19-0 p-8-17-6-15 background-color-F6F6F6 color-primary-dark font-size-14 font-400 line-height-21"
                >
                  Set due date to 13 Nov 2019
                </div>
                <div
                  class="color-primary-grey font-size-12 font-700 line-height-18"
                >
                  05 May 2019
                </div>
              </div>
            </div>
          </div>
          <div class="self-end flex-col gap-5">
            <div class="flex gap-8">
              <div class="flex flex-col gap-5 items-end">
                <div
                  class="rounded-17-17-0-17 p-8-17-6-15 background-color-primary color-white font-size-14 font-400 line-height-21"
                >
                  Invoice paid
                </div>
                <div
                  class="color-primary-grey font-size-12 font-700 line-height-18"
                >
                  04 Sep 2019
                </div>
              </div>
              <img
                class="width-24 height-24 rounded-50 mt-5"
                src="@/assets/images/avatar.png"
                alt="Avatar"
              />
            </div>
          </div>
          <div class="self-start flex-col gap-5">
            <div class="flex gap-8">
              <img
                class="width-24 height-24 rounded-50 mt-5"
                src="@/assets/images/avatar.png"
                alt="Avatar"
              />
              <div class="flex flex-col gap-5">
                <div
                  class="rounded-19-19-19-0 p-8-17-6-15 background-color-F6F6F6 color-primary-dark font-size-14 font-400 line-height-21"
                  style="max-width: 255px"
                >
                  Created invoice #AA-04-19-1890
                </div>
                <div
                  class="color-primary-grey font-size-12 font-700 line-height-18"
                >
                  04 May 2019
                </div>
              </div>
            </div>
          </div>
          <div class="self-start flex-col gap-5">
            <div class="flex gap-8">
              <img
                class="width-24 height-24 rounded-50 mt-5"
                src="@/assets/images/avatar.png"
                alt="Avatar"
              />
              <div class="flex flex-col gap-5">
                <div
                  class="rounded-19-19-19-0 p-8-17-6-15 background-color-F6F6F6 color-primary-dark font-size-14 font-400 line-height-21"
                >
                  Set due date to 13 Nov 2019
                </div>
                <div
                  class="color-primary-grey font-size-12 font-700 line-height-18"
                >
                  05 May 2019
                </div>
              </div>
            </div>
          </div>
          <div class="self-end flex-col gap-5">
            <div class="flex gap-8">
              <div class="flex flex-col gap-5 items-end">
                <div
                  class="rounded-17-17-0-17 p-8-17-6-15 background-color-primary color-white font-size-14 font-400 line-height-21"
                >
                  Invoice paid
                </div>
                <div
                  class="color-primary-grey font-size-12 font-700 line-height-18"
                >
                  04 Sep 2019
                </div>
              </div>
              <img
                class="width-24 height-24 rounded-50 mt-5"
                src="@/assets/images/avatar.png"
                alt="Avatar"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex justify-between background-color-background-light items-center flex-grow"
      >
        <div
          ref="commentInputRef"
          data-text="Add your comment"
          role="textbox"
          @input="growHeight"
          style="overflow-y: auto; max-height: 100px; min-height: 20px"
          class="__textarea__ width-212 resize-none color-primary-grey font-size-14 font-700 m-10-10-10-30 transition"
          contenteditable
        ></div>
        <div class="flex gap-11 items-center pr-30">
          <div class="flex items-center gap-9 relative">
            <emoji-picker
              ref="emojiPickerRef"
              :style="[
                showEmojiPicker
                  ? 'opacity: 1; left: -126px; z-index: 1;'
                  : 'opacity: 0; left:160px; z-index: -1;',
              ]"
              style="bottom: 30px"
              class="absolute transition"
              :native="true"
              @select="onSelectEmoji"
            />
            <v-icon
              icon="emoticon"
              ref="emojiIconRef"
              @click="onClickEmotionPicker"
              class="fill-primary-grey cursor-pointer"
            />
            <v-icon icon="attach" class="fill-primary-grey" />
          </div>
          <primary-button class="p-9-33-8-34" :label="$t('button.send')" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import EmojiPicker from 'vue3-emoji-picker'
import 'vue3-emoji-picker/css'
import { useClick } from '@/hooks'
import { $t } from '@/locales'

defineOptions({ name: 'InvoiceDetail' })
const chatContainerRef: any = ref(null)
const commentInputRef: any = ref(null)
const chatListHeight = ref(570)
const showEmojiPicker = ref<boolean>(false)
const emojiPickerRef = ref()
const emojiIconRef = ref()
onMounted(() => {
  chatContainerRef.value.scrollTo(0, chatContainerRef.value.scrollHeight)
})

const { el } = useClick()

watch(el, (newValue) => {
  if (!showEmojiPicker.value) return
  const emojiPickerEl: any = emojiPickerRef.value.$el
  const emojiIconEl: any = emojiIconRef.value.$el
  if (!emojiPickerEl) return
  if (
    showEmojiPicker.value &&
    !emojiPickerEl.contains(newValue) &&
    !emojiIconEl.contains(newValue)
  ) {
    showEmojiPicker.value = false
  }
})

function growHeight(el: any) {
  const newChatListHeight = 590 - el.target.offsetHeight
  if (newChatListHeight !== chatListHeight.value) {
    chatListHeight.value = newChatListHeight
    commentInputRef.value.scrollTo(0, commentInputRef.value.scrollHeight)
  }
}

function onSelectEmoji(emoji: any) {
  commentInputRef.value.innerHTML += emoji.i
}

function onClickEmotionPicker() {
  showEmojiPicker.value = true
}
</script>
<style scoped></style>
