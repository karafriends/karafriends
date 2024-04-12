export default class KarafriendsAudio {
  private gainNode: GainNode;
  private vocoderNode: AudioWorkletNode | null;

  audioContext: AudioContext;

  constructor() {
    this.audioContext = new AudioContext();
    this.gainNode = this.audioContext.createGain();
    this.gainNode.connect(this.audioContext.destination);

    this.vocoderNode = null;
    try {
      this.audioContext.audioWorklet
        .addModule(new URL("./audio/phazeAudioWorklet.ts", import.meta.url))
        .then(() => {
          try {
            // Operations that might throw synchronous errors
            this.vocoderNode = new AudioWorkletNode(
              this.audioContext,
              "phase-vocoder"
            );
            this.gainNode.disconnect();
            this.gainNode.connect(this.vocoderNode);
            this.vocoderNode.connect(this.audioContext.destination);
          } catch (error) {
            // Handle errors that occur during the audio node operations
            console.error("Error setting up audio nodes:", error);
          }
        })
        .catch((e) => {
          // Handle errors specifically related to the module loading
          console.error(
            "Could not load pitch shift audio worklet, pitch shift will not work:",
            e
          );
        });
    } catch (e) {
      // Handle other synchronous errors
      console.error("An unexpected error occurred:", e);
    }
  }

  pitchShift(semitones: number) {
    if (this.vocoderNode) {
      // @ts-expect-error i swear there's a .get method on this object.
      this.vocoderNode.parameters.get("pitchFactor").value = Math.pow(
        2,
        semitones / 12
      );
    }
  }

  gain(gain: number) {
    this.gainNode.gain.value = gain;
  }

  sink(): AudioNode {
    return this.vocoderNode || this.gainNode;
  }
}
