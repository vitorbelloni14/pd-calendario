import { mount } from '@vue/test-utils';
import { describe, beforeEach, it, expect } from '@jest/globals'
import MainView from './MainView.vue';
import Calendar from '../components/Calendar/Calendar.vue';

describe('MainView', () => {
  
  let wrapper;

  beforeEach(() => {
    wrapper = mount(MainView);
  });

  it('should render correctly', () => {
    expect(wrapper.find('h1').text()).toBe('Calendário de provas divulgados');
    expect(wrapper.find('span').text()).toBe('Calendário colaborativo com as datas das principais provas do ano.');
    expect(wrapper.find('.share-button').exists()).toBe(true);
    expect(wrapper.find('.tab-button').text()).toBe('Todas as Provas');
  });

  it('should display the calendar component with the correct default tab', async () => {
    expect(wrapper.findComponent(Calendar).props().activeTab).toBe('todas');
  });
});

