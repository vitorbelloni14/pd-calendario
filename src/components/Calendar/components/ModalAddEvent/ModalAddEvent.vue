<template>
    <div>
        <v-dialog v-model="localModalVisible" max-width="500px">
            <v-card>
                <div class="modal-header">
                    <div class="modal-header-content">
                        <h1>Adicionar Nova Prova</h1>
                    </div>
                    <v-btn
                        icon
                        @click="closeModal"
                        class="ml-auto"
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
                                placeholder="Universidade"
                            >
                                <option value="" disabled selected>Universidade</option>
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
            universidade: null,
            universidades: ['Universidade A', 'Universidade B', 'Universidade C'],  
        };
    },
    computed: {
        isFormValid() {
            return this.titulo && this.data && this.universidade;
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
    }

    .adicionar {
        border: 2px solid #f55b1f;
        background: #f55b1f;
    }

    button:disabled {
        border: 2px solid #6E6972;
        background: #6E6972;
        cursor: not-allowed;
    }
</style>