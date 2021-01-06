<template></template>
<script>
  export default {
    name: 'XdLoadPdfScript',
    props: {
      pdf: {
        type: String,
        default: 'https://cdn.bootcdn.net/ajax/libs/pdf.js/2.0.288/pdf.min.js',
      },
      worker: {
        type: String,
        default: 'https://cdn.bootcdn.net/ajax/libs/pdf.js/2.0.288/pdf.worker.min.js',
      }
    },
    watch:{
      pdfStatus(val) {
        if (val && this.workerStatus) {
          this.$emit('load')
        }
      },
      workerStatus(val) {
        if (val && this.pdfStatus) {
          this.$emit('load')
        }
      }
    },
    data(){
      return {
        pdfStatus : false,
        workerStatus: false,
      }
    },
    created() {
      this.$loadGetApi();
      this.$loadGetscript();
    },
    methods:{
      $loadGetApi() {
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = this.pdf;
        document.body.appendChild(s);
        s.onload = () => {
          this.pdfStatus = true;
        }
      },

      $loadGetscript() {
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = this.worker;
        document.body.appendChild(s);
        s.onload = () => {
          this.workerStatus = true;
        }
      },
    }

  }
</script>
