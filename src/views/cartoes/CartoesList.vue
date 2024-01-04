<template>
  <v-container fluid>
    <s-pagebar
      page-title="Cartões"
      :breadcrumbs="breadcrumbs"
    >
      <v-btn
        color="blue-grey darken-4"
        dark
        fab
        small
        @click="cadastrar"
      >
        <v-icon>add</v-icon>
      </v-btn>
    </s-pagebar>
    <v-card flat>
      <v-card-text>
        <div class="d-flex align-center">
          <div style="max-width: 200px">
            <v-text-field
              v-model="filtro.nome_titular"
              label="Nome do Titular"
              class="mr-3"
            />
          </div>
          <div style="max-width: 500px">
            <v-text-field
              v-model="filtro.numero"
              v-mask="['################']"
              label="Numero Cartão"
              class="mr-3"
            />
          </div>
          <v-btn
            outlined
            color="blue-grey darken-4"
            @click="limparFiltros"
          >
            Limpar filtros
          </v-btn>
        </div>
        <v-data-table
          :headers="headers"
          :items="items"
          :options.sync="options"
          :server-items-length="totalItems"
          :items-per-page="10"
          :footer-props="{
            'items-per-page-options': [10, 20, 30]
          }"
        >
          <template #[`item.action`]="{ item }">
            <v-toolbar-items>
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    icon
                    v-on="on"
                    @click="editar(item.id)"         
                  >
                    <v-icon class="material-icons-outlined">
                      visibility
                    </v-icon>
                  </v-btn>
                </template>
                <span>Editar</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    icon
                    v-on="on"
                    @click="excluir(item.id)"         
                  >
                    <v-icon class="material-icons-outlined">
                      delete
                    </v-icon>
                  </v-btn>
                </template>
                <span>Deletar</span>
              </v-tooltip>
            </v-toolbar-items>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <ConfirmDialog ref="confirm" />
  </v-container>
</template>
  
  <script>
  import ConfirmDialog from '@/components/ConfirmDialog.vue'
  import SPagebar from '@/layout/SPagebar.vue'
  export default {
    name: 'CartoesList',
    components: { SPagebar, ConfirmDialog },
    data: () => ({
      breadcrumbs: [
        {
          'text': 'Cartões',
          'to': '/cartoes',
          'exact': true
        }
      ],
      headers: [
        {text: 'Numero', value: 'numero'},
        {text: 'Tipo', value: 'tipo'},
        {text: 'Nome do Titular', value: 'nome_titular'},
        {text: 'Data de Validade', value: 'data_validade'},
        {text: 'Ações', value: 'action'},
      ],
      totalItems: 0,
      items: [],
      options: {},
      filtro: {
        nome_titular: '',
        numero: '',
      },
      filtroAnterior: {
        nome_titular: null,
        numero: null,
      },
    }),
    watch: {
      'filtro.nome_titular'() {
          this.getCartoes();
        },
        'filtro.numero'() {
          this.getCartoes();
        },
        options: {
            handler() {
                this.getCartoes();
            },
            deep: true
        },
    },
    methods: {
      async getCartoes() {
        const { sortBy, sortDesc, page, itemsPerPage } = this.options
        
        let resetPage = false;
        let ordering = sortBy[0];
        if (sortDesc[0]) {
          ordering = `-${ordering}`;
        }

        if (
          this.filtro.nome_titular !== this.filtroAnterior.nome_titular ||
          this.filtro.numero !== this.filtroAnterior.numero
        ) {
          resetPage = true;
          this.options.page = 1;
          this.filtroAnterior = { ...this.filtro };
        }
        
        ordering = `${sortDesc && sortDesc[0] ? '-' : ''}${sortBy}`;
        
        const query = {
          page: resetPage ? 1 : page,
          page_size: itemsPerPage,
          ordering: ordering,
          nome_titular: this.filtro.nome_titular,
          numero: this.filtro.numero,
        }
        const response = await this.$api.list({
          resource: this.$endpoints.CARTAO,
          query: query
        })
        this.items = response.data.results
        this.totalItems = response.data.count
      },
      cadastrar() {
        this.$router.push('/cartoes/cadastrar')
      },
      editar(id) {
        this.$router.push(`/cartoes/${id}`)
      },
      async excluir(id) {
          const res = await this.$refs.confirm.open(
            'Confirmar exclusão',
            'Tem certeza que deseja excluir este registro?'
          )
          if (res) {
            const response = this.$api.destroy({
              resource: this.$endpoints.CARTAO,
              id: id
            })
            response.then(()=>this.getCartoes())
          }
      },
    }
  }
  </script>