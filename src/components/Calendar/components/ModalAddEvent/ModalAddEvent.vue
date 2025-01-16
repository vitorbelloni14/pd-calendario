<template>
    <div>
        <v-dialog v-model="localModalVisible" max-width="600px">
            <v-card>
                <div class="modal-header">
                    <div class="modal-header-content">
                        <h1>Adicionar Nova Prova</h1>
                    </div>
                    <v-btn
                        icon
                        @click="closeModal"
                        class="ml-auto close-button"
                        aria-label="Fechar"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </div>
                <v-card-text>
                    <div class="modal-body">
                        <div class="input-container">
                            <input
                                id="titulo"
                                v-model="titulo"
                                type="text"
                                placeholder="Título"
                            />
                            <div class="title-info">
                                <span>Quanto mais completo for o título, mais precisas serão as recomendações</span>
                            </div>
                        </div>
                        <div class="input-container">
                            <input
                                id="data"
                                v-model="data"
                                type="text"
                                placeholder="Data"
                                maxlength="10"
                                @input="maskDate"
                            />
                        </div>
                        <div class="input-container">
                            <select
                                id="universidade"
                                v-model="universidade"
                                :class="{ placeholder: universidade === '' }"
                            >
                                <option value="" disabled>Instituição</option>
                                <option v-for="uni in universidades" :key="uni" :value="uni">
                                    {{ uni }}
                                </option>
                            </select>
                        </div>

                        <div class="buttons">
                            <button class="cancelar" @click="closeModal">Cancelar</button>
                            <button class="adicionar" :disabled="!isFormValid">Adicionar</button>
                        </div>
                    </div>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        name: 'ModalAddEvent',
        props: {
            modalVisible: Boolean,
        },
        data() {
            return {
                localModalVisible: this.modalVisible,
                snackbarVisible: false,
                titulo: '',
                data: '',
                universidade: '',
                universidades: ['Estácio', 'UNIASSELVI', 'UNINTER', 'UNIP', 'UNOPAR'],  
            };
        },
        computed: {
            isFormValid() {
                return this.titulo && this.data;
            }
        },
        watch: {
            modalVisible(newValue) {
                this.localModalVisible = newValue;
            },
            localModalVisible(newValue) {
                if (!newValue) {
                    this.$emit('closeModal');
                }
            },
        },
        methods: {
            closeModal() {
                this.localModalVisible = false;
                this.titulo = '';
                this.data = '';
                this.universidade = '';
            },
            maskDate() {
                let value = this.data.replace(/\D/g, ''); 
                if (value.length > 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2);
                }
                if (value.length > 5) {
                    value = value.substring(0, 5) + '/' + value.substring(5, 9);
                }
                this.data = value.substring(0, 10); 
            },
        },
    }
</script>

<style lang="scss" scoped> 
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding: 24px 16px 0 16px;
    }

    .modal-header-content {
        display: flex;
        flex-direction: column;
        padding: 4px 16px 24px 16px;
        gap: 4px;

        h1 {
            color: #414042;
            font-family: Poppins;
            font-size: 24px;
            font-style: normal;
            font-weight: 600;
            line-height: normal;
        }
    }

    .input-container {
        margin-bottom: 20px;
    }   

    .title-info {
        display: flex;
        padding: 8px 16px;
        align-items: center;
        gap: 10px;
        align-self: stretch;
        border-radius: 8px;
        background: rgba(223, 211, 242, 0.40);
        margin-top: 10px;
        margin-bottom: 30px;

        span {
            color: #6E6972;
            font-family: Poppins;
            font-size: 12px;
            font-style: normal;
            font-weight: 600;
            line-height: normal;
        }
    }

    .input-container input,
    .input-container select {
        width: 100%;
        padding: 8px;
        border: none;
        border-bottom: 2px solid #ccc;
        background-color: #fff;
        font-size: 16px;
    }

    .input-container input:focus,
    .input-container select:focus {
        outline: none;
        border-bottom: 2px solid;
    }

    .input-container input::placeholder {
        color: #ccc;
    }

    .input-container select.placeholder {
        color: #ccc;
    }

    .input-container select {   
        background: url('data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="6"><path fill="gray" d="M0 0l5 5 5-5z"/></svg>')
            no-repeat right 12px center;
        background-size: 10px;
        padding-right: 40px; 
    }

    .buttons {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
    }

    button {
        display: flex;
        padding: 8px 20px;
        justify-content: center;
        align-items: center;
        border-radius: 12px;
        box-shadow: 0px 1px 4px 0px rgba(65, 64, 66, 0.25);
    }

    .cancelar {
        border: 2px solid #76717B;
        background: #FFF;
        color: #6E6972;
        font-family: Poppins;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
    }

    .adicionar {
        border: 2px solid #f55b1f;
        background: #f55b1f;
        color: #FFFFFF;
        font-family: Poppins;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
    }

    button:disabled {
        border: 2px solid #6E6972;
        background: #6E6972;
        color: #87828B;
        cursor: not-allowed;
    }

    .close-button {
        box-shadow: none !important
    }
</style>