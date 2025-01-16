import { mount } from '@vue/test-utils';
import { describe, beforeEach, it, expect } from '@jest/globals'
import ModalShareContent from './ModalShareContent.vue';

describe('ModalShareContet', () => {
  
  let wrapper;

  const selectedEvent = {
    name: 'Sample Event',
    start: '2025-01-15',
    link: 'http://example.com',
  };

  beforeEach(() => {
    wrapper = mount(ModalShareContent, {
      propsData: {
        modalVisible: true,
        selectedEvent,
      },
    });
  });

  it('should render the modal with correct data', () => {
    expect(wrapper.find('h1').text()).toBe('Sample Event');
    expect(wrapper.find('span').text()).toContain('15/01/25 | Ler Edital');
    expect(wrapper.find('a').attributes('href')).toBe('http://example.com');
  });

  it('should correctly display the reminder section', () => {
    expect(wrapper.find('.reminder span').text()).toBe('1 dia antes | Editar');
    expect(wrapper.find('.reminder img').attributes('alt')).toBe('bell');
  });

  it('should format date correctly', () => {
    const formattedDate = wrapper.vm.formatDate(selectedEvent.start);
    expect(formattedDate).toBe('15/01/25');
  });

  it('should display share options correctly', () => {
    const shareIcons = wrapper.findAll('.share-icon');
    expect(shareIcons.length).toBe(2);
    expect(shareIcons.at(0).find('img').attributes('alt')).toBe('whatsapp');
    expect(shareIcons.at(1).find('img').attributes('alt')).toBe('email');
  });

  it('should update modal visibility when prop changes', async () => {
    await wrapper.setProps({ modalVisible: false });
    expect(wrapper.vm.localModalVisible).toBe(false);
  });

});
