<template>
  <v-container fluid>
    <s-pagebar
      page-title="Editar Item Serviço"
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
              v-mask="['################']"
              label="Numero do Cartão"
              :error-messages="errors.numero"
            />
          </v-col>
          <v-col
            cols="12"
            sm="12"
          >
            <v-text-field
              v-model="cartao.nome_titular"
              label="Nome do titular"
              :error-messages="errors.nome_titular"
              @input="uppercaseFields('nome_titular')"
            />
          </v-col>
          <v-col
            cols="12"
            sm="12"
          >
            <v-text-field
              v-model="cartao.data_validade"
              v-mask="['##/##/####']"
              label="Data de Validade"
              :error-messages="errors.data_validade"
            />
          </v-col>
          <v-col
            cols="12"
            sm="12"
          >
            <v-text-field
              v-model="cartao.codigo_seguranca"
              label="Codigo Seguranca"
              :error-messages="errors.codigo_seguranca"
            />
          </v-col>
          <v-col
            cols="12"
            sm="12"
          >
            <v-text-field
              v-model="cartao.tipo"
              label="Tipo"
              :error-messages="errors.tipo"
              @input="uppercaseFields('nome_titular')"
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
  name: 'CartoesEdit',
  components: { SPagebar },
  data: () => ({
    breadcrumbs: [
      {
        'text': 'Cartão',
        'to': '/cartoes',
        'exact': true
      },
      {
        'text': 'Editar',
        'disabled': true
      }
    ],
    cartao: {},
    errors: {}
  }),
  created(){
    this.getCartoes(this.$route.params.id)
  },
  methods: {
    async getCartoes(id) {
      const response = await this.$api.get({
        resource: this.$endpoints.CARTAO,
        id: id
      })
      this.cartao = response.data
    },
    uppercaseFields(field) {
      this.cartao[field] = this.cartao[field].toUpperCase();
    },
    async salvar() {
      const response = this.$api.update({
        resource: this.$endpoints.CARTAO,
        id: this.cartao.id,
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
    
  }
}
</script>