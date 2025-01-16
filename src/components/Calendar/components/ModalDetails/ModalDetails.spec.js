import { mount } from '@vue/test-utils';
import ModalDetails from './ModalDetails.vue';

describe('ModalDetails', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(ModalDetails, {
      propsData: {
        modalVisible: true,
        selectedEvent: {
          name: 'Evento Teste',
          start: '2025-01-08',
          link: 'https://www.example.com'
        }
      }
    });
  });

  it('should render the modal with correct data', () => {
    const title = wrapper.find('h1');
    expect(title.text()).toBe('Evento Teste');
    const dateText = wrapper.find('span').text();
    expect(dateText).toContain('08/01/25');
  });

  it('should close modal on button close click', async () => {
    const closeButton = wrapper.find('[aria-label="Fechar"]');
    await closeButton.trigger('click');
    expect(wrapper.emitted().closeModal).toBeTruthy();
  });

});
