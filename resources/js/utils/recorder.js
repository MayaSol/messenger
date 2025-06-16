// Credits to https://github.com/grishkovelli/vue-audio-recorder
import { ref } from 'vue'
// import Mp3Encoder from './mp3-encoder'

export function useAudioRecorder(options = {}) {
  // State
  const isPause = ref(false)
  const isRecording = ref(false)
  const duration = ref(0)
  const volume = ref(0)
  const records = ref([])
  
  // Private state
  let _duration = 0
  let context = null
  let input = null
  let processor = null
  let stream = null
  let lameEncoder = null //!!! ???
  
  // Constants
  const bufferSize = 4096
  const encoderOptions = {
    bitRate: options.bitRate,
    sampleRate: options.sampleRate
  }

  // Methods
  const start = () => {
    console.log('[recorder.js] start');
    const constraints = {
      video: false,
      audio: {
        channelCount: 1,
        echoCancellation: false
      }
    }

    options.beforeRecording && options.beforeRecording('start recording')

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(_micCaptured)
      .catch(_micError)

    isPause.value = false
    isRecording.value = true

    // if (!lameEncoder) {
    //   lameEncoder = new Mp3Encoder(encoderOptions)
    // }
  }

  const stop = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
    }
    if (input) {
      input.disconnect()
    }
    if (processor) {
      processor.disconnect()
    }
    if (context) {
      context.close()
    }

    let record = null
    if (lameEncoder) {
      record = lameEncoder.finish()
      record.duration = duration.value
      records.value.push(record)
    }

    _duration = 0
    duration.value = 0
    isPause.value = false
    isRecording.value = false

    options.afterRecording && options.afterRecording(record)
  }

  const pause = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
    }
    if (input) {
      input.disconnect()
    }
    if (processor) {
      processor.disconnect()
    }

    _duration = duration.value
    isPause.value = true

    options.pauseRecording && options.pauseRecording('pause recording')
  }

  // Private methods
  const _micCaptured = (mediaStream) => {
    console.log('[recorder.js] _micCaptured mediaStream: ',mediaStream);
    context = new window.AudioContext();
    duration.value = _duration
    input = context.createMediaStreamSource(mediaStream)
    processor = context.createScriptProcessor(bufferSize, 1, 1)
    stream = mediaStream

    processor.onaudioprocess = ev => {
      const sample = ev.inputBuffer.getChannelData(0)
      let sum = 0.0

      if (lameEncoder) {
        lameEncoder.encode(sample)
      }

      for (let i = 0; i < sample.length; ++i) {
        sum += sample[i] * sample[i]
      }

      duration.value =
        parseFloat(_duration) +
        parseFloat(context.currentTime.toFixed(2))
      volume.value = Math.sqrt(sum / sample.length).toFixed(2)
    }

    input.connect(processor)
    processor.connect(context.destination)
  }

  const _micError = (error) => {
    options.micFailed && options.micFailed(error)
  }

  // Exposed API
  return {
    isPause,
    isRecording,
    duration,
    volume,
    records,
    start,
    stop,
    pause
  }
}