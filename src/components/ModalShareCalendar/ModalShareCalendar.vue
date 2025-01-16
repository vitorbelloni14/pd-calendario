<template>
    <v-dialog v-model="localModalVisible" max-width="550px">
        <v-card>
            <div class="share-section">
                <div class="share-text">
                    <div>
                        <h2>Compartilhar</h2>
                        <span>Compartilhe o seu calendário e receba recompensas</span>
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
                <div class="share-icons">
                    <div class="share-icon">
                        <button class="icon">
                            <img src="../Calendar/components/ModalShareContent/assets/whatsapp.svg" alt="whatsapp" class="icon-image" />
                        </button>
                        <span class="icon-text">WhatsApp</span>
                    </div>
                    <div class="share-icon">
                        <button class="icon">
                            <img src="../Calendar/components/ModalShareContent/assets/email.svg" alt="email" class="icon-image" />
                        </button>
                        <span class="icon-text">E-mail</span>
                    </div>
                </div>
            </div>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'ModalShareCalendar',
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
    },
}
</script>

<style lang="scss" scoped> 
    .share-text {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding: 24px 16px 0 16px;
    }

    .share-section {
        display: flex;
        flex-direction: column;
        padding: 0 16px 0 16px;
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
            padding: 16px 24px 16px 24px;

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
</style>