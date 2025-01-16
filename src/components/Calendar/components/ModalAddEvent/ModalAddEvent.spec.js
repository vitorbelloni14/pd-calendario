import { mount } from '@vue/test-utils';
import ModalAddEvent from './ModalAddEvent.vue';

describe('ModalAddEvent.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(ModalAddEvent, {
      propsData: {
        modalVisible: true,
      }
    });
  });

  it('should render title correctly', () => {
    const title = wrapper.find('h1');
    expect(title.text()).toBe('Adicionar Nova Prova');
  });

  it('should close modal on button click and clear all the input fields', async () => {
    const closeButton = wrapper.find('.close-button');
    await closeButton.trigger('click');

    expect(wrapper.emitted().closeModal).toBeTruthy();

    expect(wrapper.vm.titulo).toBe('');
    expect(wrapper.vm.data).toBe('');
    expect(wrapper.vm.universidade).toBe('');
  });

  it('should show button only when title and date are written', async () => {
    const inputTitulo = wrapper.find('#titulo');
    const inputData = wrapper.find('#data');
    const addButton = wrapper.find('.adicionar');

    expect(addButton.element.disabled).toBe(true);

    await inputTitulo.setValue('Título Teste');
    await inputData.setValue('10122025');

    expect(addButton.element.disabled).toBe(false);
  });

  it('should close modal o cancel button click and clear all fields', async () => {
    const cancelarButton = wrapper.find('.cancelar');
    await cancelarButton.trigger('click');

    expect(wrapper.emitted().closeModal).toBeTruthy();

    expect(wrapper.vm.titulo).toBe('');
    expect(wrapper.vm.data).toBe('');
    expect(wrapper.vm.universidade).toBe('');
  });
});
