<template>
    <div >
        <div>
           <h3>Empresa: Imagenes del mundo</h3>
           <h4>Factura perteneciente a: {{this.arrayInvoice[0].seller.name}}</h4>
           <b-table striped hover :items="sellersS"></b-table>
           <h6>{{this.arrayInvoice[0].anotation}}</h6>
           <h5>Puntos totales: {{this.arrayInvoice[0].items[0].quantity}}</h5>
        </div>
    </div>
  
</template>

<script>
import search from './search.vue'
  export default {
  components: { search },
  data() {
      return {
        winnerId:null,
        sellersS:[],
        invoiceSize:null,
      }
    },
    props:{
        arrayInvoice: Array,
    },
     methods: {
       winner: function(){
         this.invoiceSize = this.arrayInvoice.length-1;
       },
       sellersList(){
    

        this.sellersS=[{
          Producto:this.arrayInvoice[0].items[0].name, PuntosAcumulados: this.arrayInvoice[0].items[0].quantity}]
    },
     },

     beforeMount(){
       this.winner();
       this.sellersList();
     },
     mounted(){
      console.log(this.sellersS)
     }
  }
 
</script>
