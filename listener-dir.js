// создать конструктор класса Watcher
function Watcher(watchDir, processedDir) {
    this.watchDir = watchDir;
    this.processedDir = processedDir;
}
// Далее нужно добавить логику наследования поведения генератора событий:
var events = require('events');
var fs = require('fs');
var util = require('util');
var mv = require('mv');
/**
 * Использование функции inherits, которая является
 * частью встроенного в Node модуля util. С помощью функции inherits
 * обеспечивается простой способ наследования поведения другого объекта
 * Watcher.prototype = new events.EventEmitter(); - эквивалентен код
 */
util.inherits(Watcher, events.EventEmitter);


// Расширение возможностей класса EventEmitter путем добавления метода обработки файлов
Watcher.prototype.watch = function () {
    fs.readdir(this.watchDir, {'encoding':'utf-8'},(err, files)=> {
        if (err) console.log('Ошибка! Не могу читать директорию: '+ err);
        for (var index in files) {
          if(files[index] != 'Forms'){
              // Обработка каждого файла в заданной папке
              this.emit('process', files[index]);
          }
        }
    })
};
Watcher.prototype.mov = function (file) {
    "use strict";
    mv(this.watchDir + '/' + file, this.processedDir + '/' + file, function(err) {
        if (err)console.log(err);
        console.log('file moved successfully');
    });
};
// Расширение класса EventEmitter путем добавления метода start, инициирующего просмотр
Watcher.prototype.start = function () {
    fs.watchFile(this.watchDir, ()=> {
        this.watch();
    });
};

// После определения класса Watcher можно воспользоваться им, создав объект Watcher
// var watcher = new Watcher(watchDir, processedDir);

/**
 * В только что созданном объекте Watcher можно использовать метод on,
 * унаследованный от класса генератора событий, чтобы создать
 * логику обработки каждого файла,
 */
// watcher.on('process', function process(file) {
//     var watchFile = this.watchDir + '/' + file;
//     var processedFile = this.processedDir + '/' + file.toLowerCase();
//     fs.rename(watchFile, processedFile, (err) => {
//         if (err) throw err;
//     });
// });

/**
 * Теперь, после создания всего необходимого кода, инициировать мониторинг
 * папки можно с помощью такой команды:
 */
// watcher.start();
module.exports = Watcher;