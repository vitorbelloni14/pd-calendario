<template>
    <div class="header">
        <h1>Calendário de provas divulgados</h1>
        <span>Calendário colaborativo com as datas das principais provas do ano.</span>
    </div>
</template>
  
<script>
  
  export default {
    name: 'calendar-header',
  }
</script>
  
<style>
    .header {
        display: flex;
        padding: 24px 38px 2px 90px;
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
        align-self: stretch;
        margin-bottom: 30px;
    }
</style>