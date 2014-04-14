/**
 * css-chunks
 * ==========
 *
 * Из *css*-файлов по deps'ам, собирает `css-chunks.js`-файл, обрабатывая инклуды, ссылки.
 *
 * `css-chunks.js`-файлы нужны для создания bembundle-файлов или bembundle-страниц.
 * Технология bembundle активно используется в bem-tools для выделения из проекта
 * догружаемых кусков функционала и стилей (js/css).
 *
 * **Опции**
 *
 * * *String* **target** — Результирующий таргет. По умолчанию `?.css-chunks.js`.
 * * *String* **filesTarget** — files-таргет, на основе которого получается список исходных файлов
 *   (его предоставляет технология `files`). По умолчанию — `?.files`.
 * * *String* **sourceSuffixes** — суффиксы файлов, по которым строится `files`-таргет. По умолчанию — 'css'.
 *
 * **Пример**
 *
 * ```javascript
 * nodeConfig.addTech(require('enb/techs/css-chunks'));
 * ```
 */
var path = require('path');
var CssPreprocessor = require('../lib/preprocess/css-preprocessor');

module.exports = require('../lib/tech/chunks').buildFlow()
    .name('css-chunks')
    .target('target', '?.css-chunks.js')
    .useFileList('css')
    .methods({
        processChunkData: function (sourceFilename, data) {
            var _this = this;
            var preprocessCss = new CssPreprocessor();
            preprocessCss.setCssRelativeUrlBuilder(function (url, filename) {
                var urlFilename = path.resolve(path.dirname(filename), url);
                return _this.node.wwwRootPath(urlFilename);
            });
            return preprocessCss.preprocess(data, sourceFilename);
        }
    })
    .createTech();
