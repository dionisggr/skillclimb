<template>
  <div>
    <canvas ref="canvas" width="800" height="200" @mousedown="startDrawing" @mouseup="stopDrawing" @mousemove="draw"></canvas>
    <button @click="startRecording">Start Recording</button>
    <button @click="stopRecording">Stop Recording</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawing: false,
      recording: false,
      recordedActions: [],
      ctx: null
    };
  },
  mounted() {
    this.ctx = this.$refs.canvas.getContext("2d");
  },
  methods: {
    startDrawing(e) {
      this.drawing = true;
      this.ctx.beginPath();
      this.ctx.moveTo(e.offsetX, e.offsetY);
    },
    stopDrawing() {
      this.drawing = false;
      this.ctx.closePath();
    },
    draw(e) {
      if (!this.drawing) return;
      this.ctx.lineTo(e.offsetX, e.offsetY);
      this.ctx.stroke();

      if (this.recording) {
        this.recordedActions.push({ type: "draw", x: e.offsetX, y: e.offsetY });
      }
    },
    startRecording() {
      this.recordedActions = [];
      this.recording = true;
    },
    stopRecording() {
      this.recording = false;
      // This is just a basic implementation. You could replay these actions or save them somewhere.
      console.log(this.recordedActions);
    }
  }
};
</script>

<style scoped>
canvas {
  border: 1px solid black;
}
</style>
