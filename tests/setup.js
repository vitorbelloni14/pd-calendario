import '@testing-library/jest-dom'; 
import Vue from 'vue'; 
import { config } from '@vue/test-utils';

if (config) {
  config.mocks = {
    $t: (msg) => msg,
    $vuetify: {},
  };
}

