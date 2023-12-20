<script setup lang="ts">
import { pinyin } from 'pinyin-pro';
import { ref, onUnmounted } from 'vue';
import Button from 'ant-design-vue/es/button';
import 'ant-design-vue/es/button/style';
import Input from 'ant-design-vue/es/input';
import 'ant-design-vue/es/input/style';
import Speech from 'speak-tts';

const text = ref('');
const textPinyin = ref('');
const handleChange = () => {
  textPinyin.value = pinyin(text.value, { nonZh: 'consecutive' });
}
// const handleBtn = () => {
//   textPinyin.value = pinyin(text.value, { nonZh: 'consecutive' });
//     console.log('value',text.value)
//   if(textPinyin.value === '') {
//     textPinyin.value = '请输入汉字'
//   }
// }
// const _addVoicesList = voices => {
//   const list = window.document.createElement("div");
//   let html =
//     '<h2>Available Voices</h2><select id="languages"><option value="">autodetect language</option>';
//   voices.forEach(voice => {
//     html += `<option value="${voice.lang}" data-name="${voice.name}">${
//       voice.name
//     } (${voice.lang})</option>`;
//   });
//   list.innerHTML = html;
//   window.document.body.appendChild(list);
// };

// function _init() {
const speech = new Speech();
speech
  .init({
    volume: 0.8,//0.5,
    lang: "zh-CN", // en-GB
    rate: 1,
    pitch: 1,
    //'voice':'Google UK English Male',
    //'splitSentences': false,
    listeners: {
      onvoiceschanged: voices => {
        console.log("Voices changed", voices);
      }
    }
  })
  .then(data => {
    console.log("Speech is ready", data);
    // if(document.getElementById("languages")) 
    // _addVoicesList(data.voices);
    _prepareSpeakButton(speech);
  })
  .catch(e => {
    console.error("An error occured while initializing : ", e);
  });
// const text = speech.hasBrowserSupport()
//   ? "Hurray, your browser supports speech synthesis"
//   : "Your browser does NOT support speech synthesis. Try using Chrome of Safari instead !";
// document.getElementById("support").innerHTML = text;
// }

function _prepareSpeakButton(speech) {
  const speakButton = document.getElementById("play");
  const pauseButton = document.getElementById("pause");
  // const resumeButton = document.getElementById("resume");
  // const textarea = text;// document.getElementById("text");
  const languages = document.getElementById("languages");
  // console.log('=====languages',languages)
  speakButton.addEventListener("click", () => {
    // const language = languages.value;
    // const voice = languages.options[languages.selectedIndex].dataset.name || 'Tingting';
    // console.log('3333', language, voice)
    // if (language) speech.setLanguage('zh-CN'); // languages.value
    // if (voice) speech.setVoice(voice); // voice
    speech.setLanguage('zh-CN');
    speech.setVoice('Tingting');
    if (text.value === '') return;
    speech
      .speak({
        text: text.value,
        queue: false,
        listeners: {
          onstart: () => {
            console.log("Start utterance");
          },
          onend: () => {
            console.log("End utterance");
          },
          onresume: () => {
            console.log("Resume utterance");
          },
          onboundary: event => {
            console.log(
              event.name +
              " boundary reached after " +
              event.elapsedTime +
              " milliseconds."
            );
          }
        }
      })
      .then(data => {
        console.log("Success !", data);
      })
      .catch(e => {
        console.error("An error occurred :", e);
      });
  });

  pauseButton.addEventListener("click", () => {
    speech.pause();
  });

  // resumeButton.addEventListener("click", () => {
  //   speech.resume();
  // });
}
// _init();
onUnmounted(() => {
  speakButton.removeEventlistener("click");
  pauseButton.removeEventlistener("click");
})
</script>

<template>
  <div class="wrapper">
  <h1>输入汉字查拼音</h1>
  <div class="input-btn">
    <!-- <input  v-model="text" /> -->
    <Input class="input" v-model:value="text" size="large" placeholder="请输入需要转拼音的汉字" @change="handleChange" />
    <!-- <Button type="primary" @click="handleBtn" size="large">拼音</Button> -->
  </div>
  <div class="pinyin" :class="{ border: textPinyin }">{{ textPinyin }}</div>
  <div class="btns" >
    <Button id="pause" size="large">暂停</Button>
    <Button id="play" size="large" type="primary"
    :style="{display: 'flex','flex-direction': 'row', 'align-items': 'center','margin-left':'10px',padding:'0 60px' }">
      <svg t="1701088109460" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="1672" width="18" height="18">
        <path
          d="M257.493333 322.4l215.573334-133.056c24.981333-15.413333 57.877333-7.914667 73.493333 16.746667 5.301333 8.373333 8.106667 18.048 8.106667 27.914666v555.989334C554.666667 819.093333 530.784 842.666667 501.333333 842.666667c-9.994667 0-19.786667-2.773333-28.266666-8L257.493333 701.6H160c-41.237333 0-74.666667-33.013333-74.666667-73.738667V396.138667c0-40.725333 33.429333-73.738667 74.666667-73.738667h97.493333z m26.133334 58.4a32.298667 32.298667 0 0 1-16.96 4.8H160c-5.888 0-10.666667 4.714667-10.666667 10.538667v231.733333c0 5.813333 4.778667 10.538667 10.666667 10.538667h106.666667c5.994667 0 11.872 1.664 16.96 4.8L490.666667 770.986667V253.013333L283.626667 380.8zM800.906667 829.653333a32.288 32.288 0 0 1-45.248-0.757333 31.317333 31.317333 0 0 1 0.768-44.693333c157.653333-150.464 157.653333-393.962667 0-544.426667a31.317333 31.317333 0 0 1-0.768-44.682667 32.288 32.288 0 0 1 45.248-0.757333c183.68 175.306667 183.68 460.010667 0 635.317333z m-106.901334-126.186666a32.288 32.288 0 0 1-45.248-1.216 31.328 31.328 0 0 1 1.237334-44.672c86.229333-80.608 86.229333-210.56 0-291.178667a31.328 31.328 0 0 1-1.237334-44.672 32.288 32.288 0 0 1 45.248-1.216c112.885333 105.546667 112.885333 277.418667 0 382.965333z"
          fill="#ffffff" p-id="1673"></path>
      </svg><span>&nbsp;播放</span></Button>
    <!-- <Button id="resume">play</Button> -->
  </div>
</div>
</template>

<style scoped>
.wrapper{ height: 400px;}
.input-btn {
  display: flex;
}

.input {
  margin-right: 4px;
  text-align: center;
  font-size: 26px;
  font-weight: bold;
}

.pinyin {
  font-size: 30px;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  margin-bottom:10px;
  border: 1px solid #eee;
}
.btns { display:flex; justify-content:center; }
</style>
