<template>
    <div class="calendar-container">
        <v-app>
            <v-row class="fill-height mx-0">
                <v-col cols="2">
                    <v-sheet class="date-picker-container">
                        <v-date-picker 
                            v-model="selectedDate"
                            @input="onDateChange"
                            flat
                            full-width
                            no-title
                            class="custom-date-picker"
                        />
                    </v-sheet>
                </v-col>
                <v-divider vertical></v-divider> 
                <v-col>
                    <v-sheet height="64">
                        <v-toolbar flat color="white">
                            <v-toolbar-title>{{ title }}</v-toolbar-title>
                            <v-btn fab text small color="grey darken-2" @click="prev">
                                <v-icon small>mdi-chevron-left</v-icon>
                            </v-btn>
                            <v-btn fab text small color="grey darken-2" @click="next">
                                <v-icon small>mdi-chevron-right</v-icon>
                            </v-btn>
                            <v-menu bottom right>
                                <template v-slot:activator="{ on }">
                                    <v-btn class="custom-transparent-btn" v-on="on">
                                        <span>{{ typeToLabel[type] }}</span>
                                        <v-icon right>mdi-menu-down</v-icon>
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item @click="type = 'day'">
                                        <v-list-item-title>Dia</v-list-item-title>
                                    </v-list-item>
                                    <v-list-item @click="type = 'week'">
                                        <v-list-item-title>Semana</v-list-item-title>
                                    </v-list-item>
                                    <v-list-item @click="type = 'month'">
                                        <v-list-item-title>Mês</v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                            <v-spacer></v-spacer>
                            <button class="search-button">
                                <v-icon>mdi-magnify</v-icon>
                            </button>
                            <button class="add-button" @click="showAddEvent" v-if="activeTab === 'meu'">
                                <v-icon left>mdi-plus</v-icon>
                                <span>Adicionar</span>
                            </button>
                        </v-toolbar>
                    </v-sheet>
                    <v-sheet height="600">
                        <v-calendar ref="calendar" v-model="focus" color="primary" :events="events"
                            :event-color="getEventColor" :first-interval="dailyFirstInterval" :type="type"
                            @click:event="showEvent" @click:more="viewDay" @click:date="viewDay"
                            @change="changeMonth"></v-calendar>
                        <v-menu v-model="selectedOpen" :close-on-content-click="false" :activator="selectedElement"
                            offset-x>
                            <v-card color="grey lighten-4" min-width="350px" flat>
                                <v-toolbar :color="selectedEvent.color" dark>
                                    <v-btn icon>
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                    <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                                    <v-spacer></v-spacer>
                                    <v-btn icon>
                                        <v-icon>mdi-heart</v-icon>
                                    </v-btn>
                                    <v-btn icon>
                                        <v-icon>mdi-dots-vertical</v-icon>
                                    </v-btn>
                                </v-toolbar>
                                <v-card-text>
                                    <span v-html="selectedEvent.details"></span>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn text color="secondary" @click="selectedOpen = false">
                                        Cancel
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-menu>
                    </v-sheet>
                    <modal-details 
                        v-if="modalType === 'details'"
                        :modalVisible="modalVisible"
                        :selectedEvent="selectedEvent"
                        @closeModal="closeDialog" 
                        />
                    <modal-share-content
                        v-if="modalType === 'share'"
                        :modalVisible="modalVisible"
                        :selectedEvent="selectedEvent"
                        @closeModal="closeDialog" 
                    />
                    <modal-add-event
                        :modalVisible="modalAddEvent"
                        @closeModal="closeAddEvent" 
                    />
                </v-col>
            </v-row>
        </v-app>
    </div>
</template>


<script>
    import ModalDetails from './components/ModalDetails/ModalDetails.vue';
    import ModalShareContent from './components/ModalShareContent/ModalShareContent.vue';
    import ModalAddEvent from './components/ModalAddEvent/ModalAddEvent.vue';
    import { months } from '@/assets/months';
    import concursos from '../../../concursos.json'
    import meusConcursos from '../../../meus_concursos.json';

    export default {
        // eslint-disable-next-line vue/multi-word-component-names
        name: 'Calendar',
        components: {
            ModalDetails,
            ModalShareContent,
            ModalAddEvent
        },
        props: {
            activeTab: {
                type: String,
                required: true,
            },
        },
        data: () => ({
            focus: '',
            type: 'month',
            typeToLabel: {
                month: 'Mês',
                week: 'Semana',
                day: 'Dia',
            },
            start: null,
            end: null,
            selectedEvent: {},
            selectedElement: null,
            selectedOpen: false,
            selectedDate: null,
            modalType: null,
            modalVisible: false,
            modalAddEvent: false,
            events: [],
            dailyFirstInterval: 8,
        }),
        computed: {
            title() {
                const { start, end } = this
                if (!start || !end) {
                    return ''
                }

                const startMonth = this.monthFormatter(start)
                const endMonth = this.monthFormatter(end)
                const suffixMonth = startMonth === endMonth ? startMonth : endMonth

                const startYear = start.year
                const endYear = end.year
                const suffixYear = startYear === endYear ? startYear : endYear

                const startDay = start.day 
                const endDay = end.day

                switch (this.type) {
                    case 'month':
                        return `${months[startMonth]} ${startYear}`
                    case 'week':
                        return `${startDay} ${months[startMonth]} ${startYear} - ${endDay} ${months[suffixMonth]} ${suffixYear}`
                    case 'day':
                        return `${startDay} ${months[startMonth]} ${startYear}`
                }
                return ''
            },
            monthFormatter() {
                return this.$refs.calendar.getFormatter({
                    timeZone: 'UTC', month: 'long',
                })
            },
        },
        mounted() {
            let tipoConcurso = this.activeTab === "todas" ? concursos : meusConcursos;

            this.events = tipoConcurso.map(event => ({
                name: event.name,
                start: event.start,
                color: event.color,
                link: event.link,
            }));
        },
        methods: {
            viewDay({ date, weekday }) {
                if (weekday === 0 || weekday === 6) {
                    this.dailyFirstInterval = 11
                }
                this.focus = date
                this.type = 'day'
            },
            getEventColor(event) {
                return event.color
            },
            setToday() {
                this.focus = this.today
            },
            prev() {
                this.$refs.calendar.prev()
            },
            next() {
                this.$refs.calendar.next()
            },
            showEvent({ nativeEvent, event }) {
                this.selectedEvent = event;
                this.modalVisible = true;

                if (this.activeTab === 'todas') {
                    this.modalType = 'details';
                } else {
                    this.modalType = 'share';
                }
                nativeEvent.stopPropagation();
            },
            showAddEvent() {
                console.log('aqui')
                console.log('addEvent antes abrir', this.modalAddEvent);
                this.modalAddEvent = true;
                console.log('addEvent depois abrir', this.modalAddEvent);
            },
            closeAddEvent() {
                console.log('aqui')
                console.log('addEvent antes fechar', this.modalAddEvent);
                this.modalAddEvent = false;
                console.log('addEvent depois fechar', this.modalAddEvent);
            },
            closeDialog() {
                this.modalVisible = false;
            },
            changeMonth({ start, end }) {
                this.start = start;
                this.end = end;
            },
        },
    }
</script>

<style lang="scss" scoped>
    .calendar-conatainer {
        display: flex;
    }

    .custom-date-picker {
        background-color: transparent !important; 
        box-shadow: none !important; 
        border: none; 
    }

    .custom-transparent-btn {
        background: transparent;
        color: inherit;
        border: none;
        position: relative;
        padding-bottom: 5px;
        box-shadow: none !important;
        background-color: #FFFFFF !important;
    }

    .custom-transparent-btn::after {
        content: '';
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: #B9BBC3;
        transition: background-color 0.3s ease;
    }

    .search-button {
        width: 40px;
        height: 40px;
        flex-shrink: 0;
        border-radius: 1000px;
        border: 2px solid #F55B1F;
        background: #FFF;
        margin-right: 10px;

        .v-icon {
            color: #F55B1F;
        }
    }

    .add-button {
        display: flex;
        padding: 8px 20px;
        justify-content: center;
        align-items: center;
        border-radius: 12px;
        border: 2px solid #F55B1F;
        background: #FFF;
        box-shadow: 0px 1px 4px 0px rgba(65, 64, 66, 0.25);

        .v-icon {
            color: #F55B1F;
        }

        span {
            color: #F55B1F;
            color: #F55B1F;
            font-family: Poppins;
            font-size: 16px;
            font-style: normal;
            font-weight: 600;
            line-height: normal;
        }
    }
</style>
  
