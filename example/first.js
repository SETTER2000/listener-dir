/**
 * Created by PhpStorm.
 * Company: Appalachian Ltd.
 * Developer: SETTER
 * Suite: appalachi.ru
 * Email: info@appalachi.ru
 * Date: 01.06.2017
 * Time: 22:55
 */
const fs = require('fs');
const Watcher = require('../listener-dir');

// После определения класса Watcher можно воспользоваться им, создав объект Watcher
var watcher = new Watcher('watch', 'done');

/**
 * В только что созданном объекте Watcher можно использовать метод on,
 * унаследованный от класса генератора событий, чтобы создать
 * логику обработки каждого файла,
 */
watcher.on('process', function process(file) {
    var watchFile = this.watchDir + '/' + file;
    var processedFile = this.processedDir + '/' + file.toLowerCase();
    fs.rename(watchFile, processedFile, (err)=> {
        if (err) throw err;
    });
});

/**
 * Теперь, после создания всего необходимого кода, инициировать мониторинг
 * папки можно с помощью такой команды:
 */
watcher.start();