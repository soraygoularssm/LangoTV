<template>
<!-- https://video.playphrase.me/5b18326b8079eb4cd4a49e6f/5e8df87024aa9a0025eddab3.mp4 -->
  

  <div class="column window-height items-center">
      <div class="col-7 q-ma-md">
        <video class="col-md-9 col-12" autoplay style="height:100%;width:100%;" :key="videoSrc">
            <source :src="videoSrc">
        </video>
      </div>
      <div class="col q-pa-md">
        <q-input filled bottom-slots v-model="text" label="" counter :dense="dense">

        <template v-slot:append>
          <q-icon v-if="text !== ''" name="close" @click="text = ''" class="cursor-pointer" />
        </template>

        <template v-slot:hint>
           {{hint}}
        </template>

        <template v-slot:after>
          <q-btn round dense flat icon="send" @click="send"/>
        </template>
      </q-input>
      </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { ref } from 'vue';

export default defineComponent({
  name: 'PageEntry',
  setup() {
    return {
      text: ref(''),
      ph: ref(''),
      dense: ref(false),
      hint: ref('ایمیل خود را وارد کنید'),
      videoSrc: ref('https://video.playphrase.me/5b18326b8079eb4cd4a49e6f/5e8df87024aa9a0025eddab3.mp4'),
    }
  },
  methods: {
    send() {
      if (this.text !== '') {
        this.ph = this.text;
        this.text = '';
        this.videoSrc = "https://video.playphrase.me/5b1833468079eb4cd4a4b63a/5e83ab0424aa9a0035e977ae.mp4";
        this.hint = "کد ارسال شده را وراد کنید";
      }
    }
  }
})
</script>

<style scoped>
video {
  border-radius: 5px;
}
q-input {
  width:100%;
}
</style>
