/*:
 * @plugindesc 后台自动静音 v1.0
 * @author 果冻大神
 *
 * @help
 * 后台自动静音

 */
(function () {
  const _onBlur = window.onblur;
  const _onFocus = window.onfocus;

  window.onblur = function () {
    AudioManager.masterVolume = 0;
    if (_onBlur) _onBlur();
  };

  window.onfocus = function () {
    AudioManager.masterVolume = 1;
    if (_onFocus) _onFocus();
  };
})();
