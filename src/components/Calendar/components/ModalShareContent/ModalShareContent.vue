<template>
    <v-dialog v-model="localModalVisible" max-width="600px">
        <v-card>
            <div class="modal-header">
                <div class="modal-header-content">
                    <h1>{{ selectedEvent.name }}</h1>
                    <span>
                        {{ formatDate(selectedEvent.start) }} | <a href="passeidireto.com">Ler Edital</a>
                    </span>
                    <div class="reminder">
                        <img src="./assets/bell.svg" alt="bell"/>
                        <span>1 dia antes | <a href="passeidireto.com">Editar</a></span>
                    </div>
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
            <hr class="divider">
            <div class="content-section">
                <div class="modal-content">
                    <h2>
                        Comece a estudar agora
                    </h2>
                    <span>
                        Confira os materiais da PD relacionados com essa prova
                    </span>
                </div>
                <div class="recomendation">
                    <div class="links">
                        <img src="./assets/add-check.svg" alt="add-check"/>
                        <a class="recomendation-links" href="passeidireto.com">Materiais Recomendados</a>
                    </div>
                    <div class="links">
                        <img src="./assets/book.svg" alt="book"/>
                        <a class="recomendation-links" href="passeidireto.com">Questões Recomendadas</a>
                    </div>
                </div>
            </div>
            <hr class="divider">
            <div class="share-section">
                <div class="share-text">
                    <h2>Compartilhar</h2>
                    <span>Compartilhe o seu calendário e receba recompensas</span>
                </div>
                <div class="share-icons">
                    <div class="share-icon">
                        <div class="icon">
                        <img src="./assets/whatsapp.svg" alt="whatsapp" class="icon-image" />
                        </div>
                        <span class="icon-text">WhatsApp</span>
                    </div>
                    <div class="share-icon">
                        <div class="icon">
                        <img src="./assets/email.svg" alt="email" class="icon-image" />
                        </div>
                        <span class="icon-text">E-mail</span>
                    </div>
                </div>
            </div>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'ModalShare',
    props: {
        modalVisible: Boolean,
        selectedEvent: Object,
    },
    data() {
        return {
            localModalVisible: this.modalVisible,
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
            const hours = String(d.getHours()).padStart(2, '0');
            const minutes = String(d.getMinutes()).padStart(2, '0');
            
            return `${day}/${month}/${year} - ${hours}:${minutes}`;
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

        .reminder {
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-top: 8px;
            gap: 4px
        }
    }

    .modal-content {
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 16px 24px 16px 24px;

        span {
            color: #414042;
            font-family: Poppins;
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
        }

        h2 {
            color: #414042;
            font-family: Poppins;
            font-size: 18px;
            font-style: normal;
            font-weight: 600;
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

    .recomendation {
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 16px 24px 16px 24px;

        .links {
            display: flex;
            gap: 10px;
        }

        .recomendation-links {
            color: #7F4ECC;
            font-family: Poppins;
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            text-decoration: none
        }
    }

    .share-section {
        display: flex;
        flex-direction: column;
        padding: 16px 24px 16px 24px;
        gap: 12px;

        .share-text {
            span {
                color: #414042;
                font-family: Poppins;
                font-size: 16px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
            }

            h2 {
                color: #414042;
                font-family: Poppins;
                font-size: 18px;
                font-style: normal;
                font-weight: 600;
                line-height: normal;
            }
        }

        .share-icons {
            display: flex;
            gap: 16px; 
            justify-content: center;

            .share-icon {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
            }

            .icon {
                width: 70px;
                height: 70px;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 50%; 
                background-color: #EDEDED; 
            }
        }
    }

    .divider {
        margin: 0 24px 0 24px;
    }
</style>