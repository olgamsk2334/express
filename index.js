import {router as movieRouter} from './movie/index.js';
import express from 'express';
// система логирования http-запросов - morgan
import morgan from 'morgan';
// взаимодействие с файловой системой
import {createWriteStream} from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import expressHandlebars  from 'express-handlebars';


const app = express ();
//Чтобы установить Handlebars в качестве движка представлений в Express
app.engine('handlebars', expressHandlebars());
//view engine устанавливает используемый движок предстfвлений, и views, 
//которая устанавливает путь к папке с представлениями внутри проекта
app.set('view engine', 'handlebars');
app.set('views', [`${dirname(fileURLToPath(import.meta.url))}/views/list`]);

// статичесая ф-ция принимает имя директории со статич файлом
app.use(express.static(`${dirname(fileURLToPath(import.meta.url))}/public`));
//function log(request, response, next)
//{
//    console.log(request.url );
//    next();
//}
//app.use(log);
app.set('view engine', 'pug');
const accessLogStream = createWriteStream('access.log', {flags: 'a'});


//Morgan — это система логирования HTTP-запросов.
app.use(morgan('common',{
     immediate: true,
     stream: accessLogStream
}));

//для получения отправленных данных необходимо создать парсер
app.use(express.urlencoded({extended: false}));
app.use('/movie', movieRouter );

app.get('/', (request, response) => 
    response.redirect('/movie'));

app.listen(8080, () => {
    console.log('Server is listerning to http://localhost:8080');
});