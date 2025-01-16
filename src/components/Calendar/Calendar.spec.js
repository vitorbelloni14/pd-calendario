import { shallowMount } from '@vue/test-utils'
import { describe, beforeEach, it, expect } from '@jest/globals'
import Calendar from './Calendar.vue'

describe('PdCalendar', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(Calendar, {
            propsData: {
                activeTab: 'meu',
            }
        })
    })

    it('should render the calendar component', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it('should correctly change the view when clicking on date', async () => {
        await wrapper.vm.viewDay({ date: '2025-01-01', weekday: 1 })
        expect(wrapper.vm.type).toBe('day')
        expect(wrapper.vm.focus).toBe('2025-01-01')
    })

    it('should display the modal to add event when clicking "Adicionar"', async () => {
        const showAddEventButton = wrapper.find('.add-button')
        await showAddEventButton.trigger('click')
        expect(wrapper.vm.modalAddEvent).toBe(true)
    })

    it('should change the calendar type when changing view type', async () => {
        await wrapper.vm.$set(wrapper.vm, 'type', 'week')
        expect(wrapper.vm.type).toBe('week')
    })

    it('should display events correctly', async () => {
        const events = wrapper.vm.events
        expect(events.length).toBeGreaterThan(0)  // Depende dos eventos em seus arquivos JSON
    })

    it('should close the event modal when clicking close', async () => {
        await wrapper.vm.closeDialog()
        expect(wrapper.vm.modalVisible).toBe(false)
    })
})
