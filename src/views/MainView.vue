<template>
    <div>
    <div class="header">
        <h1>Calendário de provas divulgados</h1>
        <span>Calendário colaborativo com as datas das principais provas do ano.</span>
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
</div>
</template>
  
  <script>
  import Calendar from '../components/Calendar/Calendar.vue';
  
  export default {
    name: 'MainView',
    components: {
      Calendar,
    },
    data() {
      return {
        selectedTab: 'todas',
      };
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