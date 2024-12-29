import { setImageEffect, resetImageFilters } from './image-effects.mjs';

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

const updateSliderSettings = (effect) => {
  const settings = EFFECT_PROPERTIES[effect];
  effectSlider.noUiSlider.updateOptions({
    range: settings.range,
    step: settings.step,
    start: settings.start,
  });
  setImageEffect(effect, settings.start);
};

const getSelectedEffect = () => document.querySelector('.effects__radio:checked').value;

const handleSliderVisibility = (effect) => {
  effectSliderContainer.style.display = effect === 'none' ? 'none' : 'block';
};

const onEffectRadioChange = () => {
  const selectedEffect = getSelectedEffect();
  handleSliderVisibility(selectedEffect);
  if (selectedEffect !== 'none') {
    updateSliderSettings(selectedEffect);
  } else {
    resetImageFilters();
  }
};

const onSliderUpdate = (values) => {
  const effect = getSelectedEffect();
  const value = values[0];
  effectValueDisplay.value = value;
  setImageEffect(effect, value);
};

const addEventListeners = () => {
  effectRadioBtns.forEach((btn) => btn.addEventListener('change', onEffectRadioChange));
  effectSlider.noUiSlider.on('update', onSliderUpdate);
};

addEventListeners();
