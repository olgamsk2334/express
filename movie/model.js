let data = [
    {id:1, title: 'Iron man', year:'2008'},
    {id:2, title: 'Thor', year:'2011'},
    {id:3, title: 'Captain', year:'2012'},
    {id:4, title: 'BuiThor', year:'2018'},
    {id:5, title: 'Cap', year:'2012'},
];

function getNextId(){
    return Math.max(...data.map((movie)=> movie.id))+1;
}

function insert(movie){
    movie.id = getNextId();
}

function update(movie){
    movie.id = parseInt(movie.id);
    const index = data.findIndex((item) => item.id === movie.id)
    data[index] = movie;
}


export function getAll() {
    // используют, когда хотят построить асинхронную цепочку,
    //и начальный результат уже есть.
    return Promise.resolve(data);
}

export function remove(id) {
    data = data.filter(movie => movie.id !== id);
    return Promise.resolve();
}

export function get(id) {
       return Promise.resolve(data.find((movie) => movie.id === id));
}

export function save(movie) {
    if (movie.id === ''){
      insert(movie)  ;                                                                                                                                           
    } else {
        update(movie);
    }
    return Promise.resolve(data.push(movie));
}