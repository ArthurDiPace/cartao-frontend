<template>
  <v-container fluid>
    <s-pagebar
      page-title="Cadastrar Cartão"
      :breadcrumbs="breadcrumbs"
    />
    <v-card flat>
      <v-card-text>
        <v-row dense>
          <v-col
            cols="12"
            sm="12"
          >
            <v-text-field
              v-model="cartao.numero"
              v-mask="['####################']"
              label="Numero do Cartão"
              :error-messages="errors.numero"
            />
          </v-col>
          <v-col
            cols="12"
            sm="12"
          >
            <v-text-field
              v-model="cartao.nome"
              label="Nome"
              :error-messages="errors.nome"
              @input="uppercaseFields('nome')"
            />
          </v-col>
          <v-col
            cols="12"
            sm="12"
          >
            <v-text-field
              v-model="cartao.data"
              v-mask="['##/##/####']"
              label="Data"
              :error-messages="errors.data"
            />
          </v-col>
          <v-col
            cols="12"
            sm="12"
          >
            <v-text-field
              v-model="cartao.lote"
              label="Lote"
              :error-messages="errors.lote"
              @input="uppercaseFields('lote')"
            />
          </v-col>
          <v-col
            cols="12"
            sm="12"
          >
            <v-text-field
              v-model="cartao.numero_lote"
              label="Numero Lote"
              :error-messages="errors.numero_lote"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          outlined
          color="blue-grey darken-4"
          @click="$router.back()"
        >
          Voltar
        </v-btn>
        <v-btn
          color="blue-grey darken-4"
          dark
          @click="salvar"
        >
          Salvar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
  
<script>
import SPagebar from '@/layout/SPagebar.vue'
export default {
  name: 'CartoesCreate',
  components: { SPagebar },
  data: () => ({
    breadcrumbs: [
      {
        'text': 'Cartões',
        'to': '/cartoes',
        'exact': true
      },
      {
        'text': 'Cadastrar',
        'disabled': true
      }
    ],
    cartao: {
      numero:'',
      nome:'',
      data:'',
      lote:'',
      qtd_registro:'1',
      numero_lote:'',
      identificador_linha:"C1"
    },
    errors: {}
  }),
  methods: {
    salvar() {
      const response = this.$api.create({
        resource: this.$endpoints.CARTAO,
        data: this.cartao
      })
      response
        .then(()=>{
          this.$toast.open({
              message: 'Serviço salvo com sucesso',
              type: 'success',
          })
          this.$router.back()
        })
        .catch(error=>this.errors = this.handleError(error))
    },
    uppercaseFields(field) {
      this.cartao[field] = this.cartao[field].toUpperCase();
    },
  }
}
</script>