import { getAll, remove, save, get } from "./model.js";
import { render } from "./view.js";
import {  render as form } from "./form.js";
import {dirname} from 'path';
import { fileURLToPath } from 'url';

//  async - функция всегда возвращает промис
export async function listAction(request, response) {
  
    let movies = await getAll();
    response.render(`${dirname(fileURLToPath(import.meta.url))}/views/list`, {movies,});
    
}

export async function removeAction(request, response) {
    const id = parseInt(request.params.id, 10);
    await remove(id);
    response.redirect(request.baseUrl);
}


export async function formAction(request, response) {

    let movie = {id:'', title:'', year:''};
    if (request.params.id) {
      movie = await get(parseInt(request.params.id, 10));
    }
    let  body = form (movie);

   response.send(body);
}


export async function saveAction(request, response) {
    const movie = {
        id: request.body.id,
        title: request.body.title,
        year: request.body.year
    };
    await save(movie);
    // Задает новый URL-адрес и условия прекращения выполнения текущей страницы
    response.redirect(request.baseUrl);
}