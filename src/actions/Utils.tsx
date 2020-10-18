const base = 'http://localhost:9000'
interface guess {
    name: string;
    password: string;
}
// Checks password and returns next level if correct
// {correct: boolean, nextLevel: string}
export function checkPassword(input: guess){
    var url = new URL(base+'/levels'),
        params = input
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    fetch(url.toString())
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(e => {
            console.log(e)
        })
}

