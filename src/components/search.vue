<template>
  <div class="hello">

    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
          <b-navbar-brand href="#">Imágenes del mundo</b-navbar-brand>
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
          <b-collapse id="nav-collapse" is-nav>

          </b-collapse>
        </b-navbar>
    </div>

    <div class="search">
    <h1>Busca tu imagen</h1>
      <form action="" class="needs-validation">
        <input type="text" v-model="query" @keyup.enter="search(1,true)" placeholder="Ingrese lo que deseea buscar" required> <br>
        <b-button @click="search(1,true)" class="ImgButton">Buscar imagen</b-button>
        <b-button v-b-modal.modal-1 @click="sellersList(sellers)"  class="ImgButton">Mostrar resultados</b-button>
      </form>
    </div>

    <div>
      <b-card v-if="querySearch">
        <div v-if="querySearch">
          <h5 v-if="resultT">Los vendedores te traen estas imagenes de "{{this.word}}", ¿Cúal eliges?</h5>
          <h5 v-if="resultF">Los vendedores no encontraron imagenes para "{{this.query}}"</h5>

          <div class="imgResults">
            <div v-for="item, idx in items" :key="item.title" class="imgResults">
              <h6>Imagen de {{sellers[idx].name}}</h6>
              <a :href="item.link"><img :src="item.link" :alt="item.title" target="_blank">
               <b-button variant="dark" href="#" @click="sumPoints(idx)">Elegir</b-button>
              </a>
            </div>
          </div>
  
        </div>
      </b-card>
      <div>
          <b-modal id="modal-1" title="Puntuación">
            <sellers :array-sellers="sellersLists"></sellers>
            <p class="my-4"></p>
          </b-modal>
      </div>
    </div>

    <div v-if="seeInvoice">
      <b-modal id="modal-2" title="Factura">
        <invoice :array-sellers="Invoices"></invoice>
        <p class="my-4"></p>
      </b-modal>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import sellers from './sellers.vue'
import invoice from './invoice.vue'
export default {
  components: { sellers, invoice },
  name: 'search',
  data(){
    return{
      sellers: null,
      seller: null,
      counter:0,
      items : null,
      sellersLists: [],
      itemsImg : null,
      query:'',
      querySearch : false,
      queryImgSearch : false,
      numberS:0,
      Invoices: [],
      resultF:null,
      resultT:true,
      initialize:true,
      seeInvoice:false,
      word:'',
      seeInvoice:false,
    }
  },
  methods : {

    async search(start,img){
      this.word=this.query;
      this.resultT=true;
      this.resultF=false;
      if(this.query==''){
         alert(`Campo de buscar vacio`);
      }else{
      do{
        let data = await axios.get('https://customsearch.googleapis.com/customsearch/v1?cx=a5b24d23f03933333&q='+this.query+'&key=AIzaSyCywetHcEdbqC-fhAStCW-ERvH84BLFbGA&searchType=image&num=3')
        .then( res=>{
          if(img){start++}
          return res.data.items;
        })
        this.querySearch=true
        this.items=null
        this.items=data
      }
      while(img && start<5)
      scroll(0, 0)
      }
      if(this.items==undefined){
       this.resultF=true;  
       this.resultT=false;
      }
    },

    sumPoints(idSeller){
      //Inicializar todos los vendedores con 0 puntos
      if(this.initialize){
        for(const its in this.sellers){
          this.sellers[its].points=0;
        }
        this.initialize=false;
      }
      //Sumo 3 puntos al vendedor de la imagen elegida
      this.sellers[idSeller].points = this.sellers[idSeller].points+3;
      //Si un vendedores acumulado 20 o mas puntos, es el ganador y procedemos a hacer la factura
      if(this.sellers[idSeller].points >= 20){
        alert(`Ya ganó ${this.sellers[idSeller].name}`);
        this.createInvoice(idSeller+1);
        this.consultInvoice();
        this.querySearch=false;
        this.seeInvoice=true;
      }
    },

    postEmployees: function(){
        axios.post('https://api.alegra.com/api/v1/sellers',  {
         name: "Alejandro",
        },{
         headers: {
          Authorization: "Basic Y3Jpc3RpYW5jYXN0YW5vODUyQGdtYWlsLmNvbTo4MTNkYWEyZTI5YjFmZmUwZjAxYw=="
        }
        })
        .then(response=>{
            console.log(response.data)
        })
    },

    getSellers: function(){
      axios.get('https://api.alegra.com/api/v1/sellers/', {
         headers: {
          Authorization: "Basic Y3Jpc3RpYW5jYXN0YW5vODUyQGdtYWlsLmNvbTo4MTNkYWEyZTI5YjFmZmUwZjAxYw=="
        }
        })
        .then((res) => {
          this.sellers=res.data;
          console.log(this.sellers)
        })
        .catch((error) => {
        console.error(error)
        })        
    },

    sellersList(sellers){
      this.sellersLists=sellers.map(sell=>({
        id: sell.id, Nombre: sell.name, Puntuación: sell.points||0, Restante: 20-sell.points||20 
        }))
    },

    createInvoice: function(idWinner){
        var date = new Date();
        const formatDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        let resultScore= "Los resultados quedaron asi: ";
        let finalScore=0;
        for(const its of this.sellers){
          finalScore=finalScore+its.points;
        }
        for(const its of this.sellers){
          resultScore=resultScore+its.name +" puntaje de "+its.points+","
        }
        //alert(`RESULTADOS: ${resultScore}`);
        // axios.post('https://api.alegra.com/api/v1/invoices',  {
        //   "date": formatDate,
        //   "dueDate": formatDate,
        //   "anotation": resultScore,
        //   "client": idWinner,
        //   "items" : [
        //     {
        //       "id": 1,
        //       "price" : 10,
        //       "quantity" : finalScore
        //     }
        //   ],
        //   "seller":idWinner,
        //   },{
        //  headers: {
        //   Authorization: "Basic Y3Jpc3RpYW5jYXN0YW5vODUyQGdtYWlsLmNvbTo4MTNkYWEyZTI5YjFmZmUwZjAxYw=="
        // }
        // })
        // .then(response=>{
        //     console.log(response.data)
        // })
        // .catch((error) => {
        // console.error(f)
        // })   
    },

    consultInvoice: function(){
      axios.get('https://api.alegra.com/api/v1/invoices/', {
         headers: {
          Authorization: "Basic Y3Jpc3RpYW5jYXN0YW5vODUyQGdtYWlsLmNvbTo4MTNkYWEyZTI5YjFmZmUwZjAxYw=="
        }
        })
        .then((res) => {
          this.Invoices=res.data;
          console.log(this.Invoices)
        })
        .catch((error) => {
        console.error(error)
        })        
    },

    createInvoiceBills: function(idWinner,sellersResults){
      var date = new Date();
      const formatDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      axios.post('https://api.alegra.com/api/v1/bills',  {
        "date": formatDate,
        "dueDate": formatDate,
        "client": idWinner,
        "items" : [
          {
            "id": 1,
            "price" : 10,
            "quantity" : 1
          }
        ]
        },{
        headers: {
        Authorization: "Basic Y3Jpc3RpYW5jYXN0YW5vODUyQGdtYWlsLmNvbTo4MTNkYWEyZTI5YjFmZmUwZjAxYw=="
      }
      })
      .then(response=>{
          console.log(response.data)
      })
      .catch((error) => {
      console.error(f)
      })   
    },
  },

  beforeMount(){
    this.getSellers();
  },

}

</script>

<style scoped>
h1{
  text-align: center;
}
.search{
  padding-top: auto;
  padding-bottom: auto;
  width: 100%;
  text-align: center;
}
.search input{
  height: 30px;
  width: 45%;
  padding: 5px;
  font-size: 1em;
  border-radius: 10px;
}
.search button{
  margin-top: 10px;
  padding:14px 30px;
  border: 0 solid gray;
  border-radius: 10px;
  font-weight: bold;
}
.search button:hover{
  border: 1px solid gray;
  background-color: lightskyblue;
  color: white;
  cursor: pointer;
}
.ImgButton{
  margin-left: 15px;
}
.result a{
  text-decoration: none;
}
.result a:hover{
  text-decoration: underline;
}
.result{
  width: 75%;
  margin-top: 20px;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 30px;
  font-size: .9em;
}
.result:hover{
  background-color: lightgray;
}
.imgResults{
  display:inline-block;
  padding-left: 20px;
  height: 240px;
  margin: 40px;
  align-items: flex-end;
}
.imgResults img{
  float:left;
  width: 200px;
  height: 200px;
  margin: 20px;
}
.imgResults:hover{
  background-color: lightgray;
}
.siteBaslik{
  font-size: 1.5em;
}

.navbar-brand { 
  padding-left: 650px;

}

</style>

 