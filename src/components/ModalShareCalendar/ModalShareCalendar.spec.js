import { mount } from '@vue/test-utils';
import { describe, beforeEach, it, expect } from '@jest/globals'
import ModalShareCalendar from './ModalShareCalendar.vue';

describe('ModalShareCalendar', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(ModalShareCalendar, {
      propsData: {
        modalVisible: true,
      },
    });
  });

  it('should render the modal when modalVisible is true', () => {
    expect(wrapper.vm.localModalVisible).toBe(true);
    expect(wrapper.find('v-dialog').exists()).toBe(true);
  });

  it('should emit closeModal event when close button is clicked', async () => {
    await wrapper.find('.ml-auto').trigger('click');
    expect(wrapper.emitted().closeModal).toBeTruthy();
  });

  it('should update localModalVisible when modalVisible prop changes', async () => {
    await wrapper.setProps({ modalVisible: false });
    expect(wrapper.vm.localModalVisible).toBe(false);
  });

  it('should render share icons correctly', () => {
    expect(wrapper.findAll('.share-icon').length).toBe(2);
    expect(wrapper.find('.icon-image').attributes('src')).toBe('../Calendar/components/ModalShareContent/assets/whatsapp.svg');
    expect(wrapper.find('.icon-image').attributes('alt')).toBe('whatsapp');
  });
});
