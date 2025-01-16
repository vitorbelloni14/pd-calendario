<template>
    <div>
    <div class="header">
        <div class="header-information">
            <div class="information-title">
                <h1>Calendário de provas divulgados</h1>
                <span>Calendário colaborativo com as datas das principais provas do ano.</span>
            </div>
            <div class="information-action">
                <button class="share-button" @click="openShareModal">
                    <img src="./assets/share.svg" alt="share"/>
                </button>
            </div>
        </div>
        <div class="tabs">
          <button
            class="tab-button"
            :class="{ active: selectedTab === 'todas' }"
            @click="selectedTab = 'todas'"
          >
            Todas as Provas
          </button>
          <button
            class="tab-button"
            :class="{ active: selectedTab === 'meu' }"
            @click="selectedTab = 'meu'"
          >
            Meu Calendário
          </button>
        </div>
    </div>
    <v-divider></v-divider>
    <div class="tab-content">
        <Calendar v-if="selectedTab === 'todas'" :activeTab="selectedTab"/>
        <div v-else>
          <Calendar :activeTab="selectedTab"/>
        </div>
    </div>
    <modal-share-calendar
        :modalVisible="modalVisible"
        @closeModal="closeModal" 
    />
</div>
</template>
  
<script>
  import Calendar from '../components/Calendar/Calendar.vue';
  import ModalShareCalendar from '../components/ModalShareCalendar/ModalShareCalendar.vue';
  
  export default {
    name: 'MainView',
    components: {
      Calendar,
      ModalShareCalendar
    },
    data() {
      return {
        selectedTab: 'todas',
        modalVisible: false,
      };
    },
    methods: {
        openShareModal() {
            this.modalVisible = true;
        },
        closeModal() {
            this.modalVisible = false;
        },
    },
  };
</script>
  
<style scoped>
    .header {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
        align-self: stretch;
        padding: 24px 38px 2px 90px;
    }

    .header-information {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
    }

    .share-button {
        width: 40px;
        height: 40px;
        flex-shrink: 0;
        border-radius: 1000px;
        border: 2px solid #F55B1F;
        background: #FFF;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .tabs {
        display: flex;
        gap: 20px;
        margin-top: 10px;
    }
    
    .tab-button {
        padding: 10px 0;
        background-color: transparent;
        border: none;
        cursor: pointer;
        font-size: 16px;
        position: relative;
        display: flex;
        justify-content: flex-start;
    }
    
    .tab-button.active::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: #7F4ECC;
    }
    
    .tab-content {
        padding: 20px;
    }
</style>