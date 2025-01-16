<template>
    <div>
        <v-dialog v-model="localModalVisible" max-width="500px">
            <v-card>
                <div class="modal-header">
                    <div class="modal-header-content">
                        <h1>{{ selectedEvent.name }}</h1>
                        <span>
                            {{ formatDate(selectedEvent.start) }} | <a :href="selectedEvent.link">Ler Edital</a>
                        </span>
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
                    <div v-if="!selectedEvent.name">
                        Nenhum evento selecionado.
                    </div>
                    <div v-else>
                        <div class="modal-content">
                            <span>
                                Adicione o evento ao seu calendário e ganhe:
                                <ul>
                                    <li>Lembretes customizáveis</li>
                                    <li>Materiais de estudo direcionado</li>
                                    <li>Questões relacionadas à prova</li>
                                    <li>E muito mais</li>
                                </ul>
                            </span>
                            <button
                                class="save-button" 
                                @click="addToMyCalendar"
                            >
                                Adicionar ao Meu Calendário
                            </button>
                        </div>
                    </div>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-snackbar v-model="snackbarVisible" color="success" timeout="3000" bottom center>
            <v-icon left>mdi-check</v-icon>
            Evento adicionado ao "Meu Calendário".
        </v-snackbar>
    </div>
</template>

<script>
export default {
    name: 'ModalDetails',
    props: {
        modalVisible: Boolean,
        selectedEvent: Object,
    },
    data() {
        return {
            localModalVisible: this.modalVisible,
            snackbarVisible: false
        };
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
        formatDate(date) {
            const d = new Date(date);
            const day = String(d.getDate()).padStart(2, '0');
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const year = String(d.getFullYear()).slice(2);
            
            return `${day}/${month}/${year}`;
        },
        addToMyCalendar() {
            this.snackbarVisible = true;
            this.localModalVisible = false;
        }
 
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

        span {
            color: #414042;
            font-family: Poppins;
            font-size: 13px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
        }

        a {
            color: #7F4ECC;
            font-family: Poppins;
            font-size: 13px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            text-decoration: none;
        }
    }

    .modal-content {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 4px 16px 24px 8px;

        span {
            color: #414042;
            font-family: Poppins;
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
        }

        .save-button {
            background: #f55b1f;
            color: #ffffff;
            border-radius: 12px;
            width: 286px;
            height: 40px;
            padding: 8px;
            font-family: Poppins;
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
        }   
    }
</style>


  