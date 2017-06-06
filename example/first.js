/**
 * Created by PhpStorm.
 * Company: Appalachian Ltd.
 * Developer: SETTER
 * Suite: appalachi.ru
 * Email: info@appalachi.ru
 * Date: 01.06.2017
 * Time: 22:55
 */

const Watcher = require('../listener-dir');
const source = 'Z:/';
const target = 'done';

// После определения класса Watcher можно воспользоваться им, создав объект Watcher
var watcher = new Watcher(source, target);

/**
 * В только что созданном объекте Watcher можно использовать метод on,
 * унаследованный от класса генератора событий, чтобы создать
 * логику обработки каждого файла,
 * Метод mov перемещает файлы из папки source в папку target
 */
watcher.on('process', function process(file) {
    watcher.mov(file);
});

/**
 * Теперь, после создания всего необходимого кода, инициировать мониторинг
 * папки можно с помощью такой команды:
 */
watcher.start();