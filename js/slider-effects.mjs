import { setImageEffect, resetImageFilters } from './photo-effects.mjs';

const SLIDER_DEFAULT = { min: 0, max: 1 };
const INITIAL_VALUE = 1;
const STEP_VALUE = 0.1;

const EFFECT_PROPERTIES = {
  chrome: { range: { min: 0, max: 1 }, step: 0.1, start: 1 },
  sepia: { range: { min: 0, max: 1 }, step: 0.1, start: 1 },
  marvin: { range: { min: 0, max: 100 }, step: 1, start: 100 },
  phobos: { range: { min: 0, max: 3 }, step: 0.1, start: 3 },
  heat: { range: { min: 1, max: 3 }, step: 0.1, start: 3 },
};

const effectRadioBtns = document.querySelectorAll('.effects__radio');
const effectSlider = document.querySelector('.effect-level__slider');
const effectValueDisplay = document.querySelector('.effect-level__value');
const effectSliderContainer = document.querySelector('.effect-level');

const initializeSlider = () => {
  noUiSlider.create(effectSlider, {
    range: SLIDER_DEFAULT,
    start: INITIAL_VALUE,
    step: STEP_VALUE,
    connect: 'lower',
    format: {
      to: (value) => value,
      from: (value) => parseFloat(value),
    },
  });
};

const updateSliderOptions = ({ range, step, start }) => {
  effectSlider.noUiSlider.updateOptions({ range, step, start });
};

const setEffectVisibility = (effect) => {
  effectSliderContainer.style.display = effect === 'none' ? 'none' : 'block';
};

const updateEffect = (effect, value) => {
  setImageEffect(effect, value);
  effectValueDisplay.value = value;
};

const getSelectedEffect = () => document.querySelector('.effects__radio:checked').value;

const handleEffectChange = () => {
  const selectedEffect = getSelectedEffect();
  setEffectVisibility(selectedEffect);

  if (selectedEffect !== 'none') {
    const settings = EFFECT_PROPERTIES[selectedEffect];
    updateSliderOptions(settings);
    updateEffect(selectedEffect, settings.start);
  } else {
    resetImageFilters();
  }
};

const handleSliderUpdate = (values) => {
  const effect = getSelectedEffect();
  const value = values[0];
  updateEffect(effect, value);
};

const addEventListeners = () => {
  effectRadioBtns.forEach((btn) => btn.addEventListener('change', handleEffectChange));
  effectSlider.noUiSlider.on('update', handleSliderUpdate);
};

initializeSlider();
addEventListeners();
