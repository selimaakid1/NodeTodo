Help = () => {
    console.log("add \t\t\t\t To add new todo")
    console.log("remove \t\t\t\t To remove a todo")
    console.log("list \t\t\t\t To list all todos")
    console.log("read \t\t\t\t To display a todo")

}
Add = () => {
    let titleIndex = process.argv.findIndex(el => el === '--title')
    if (titleIndex === -1 || process.argv[titleIndex + 1] === undefined) {
        console.log("Options")
        console.log("--title \t\t\t Title of note")
        console.log("--body  \t\t\t Body of note\n")
        console.log("\n Missing Required Arguments: --title, --body")
        return
    } else {
        newTodo.Title = process.argv[titleIndex + 1]
    }
    let bodyIndex = process.argv.findIndex(el => el === "--body")
    if(bodyIndex === -1 || process.argv[bodyIndex+1] === undefined){
        console.log('Options:')
        console.log('--title \t\t Title of note')
        console.log('--body \t\t\t Body of note\n')
        console.log("Missing Required Arguments: --title, --body")
        return
    }else{
        newTodo.Body = process.argv[bodyIndex+1]
    }

    let todosJSON = fs.readFileSync('todos.json', 'utf8')
    let todos = JSON.parse(todosJSON)
    let allTodos = todos.concat(newTodo)
    let allTodosJSON = JSON.stringify(allTodos)
    fs.writeFileSync('todos.json', allTodosJSON)

    console.log('Note Created!')
    console.log(`Title: ${newTodo.Title}`)
    console.log(`Body: ${newTodo.Body}`)

}
Remove = () => {
    let titleIndex = process.argv.findIndex(el => el === "--title")
    if(titleIndex === -1 || process.argv[titleIndex+1] === undefined){
        console.log('Options:')
        console.log("--title \t\tTitle of note")
        console.log("help \t\t\t To show help\n")
        console.log("Missing Required Arguments: --title")
        return
    }else{
        let todosJSON = fs.readFileSync('todos.json', 'utf8')
        let todos = JSON.parse(todosJSON)
        let filteredTodos = todos.filter(el => el.Title !== process.argv[titleIndex+1])
        if(filteredTodos.length === todos.length){
            console.log('Note Not Found!')
            return
        }
        let filteredTodosJSON = JSON.stringify(filteredTodos)
        fs.writeFileSync('todos.json', filteredTodosJSON)
        console.log("Note was removed")
    }
}

List = () => {
    let todosJSON = fs.readFileSync('todos.json', 'utf8')
    let todos = JSON.parse(todosJSON)
    console.log(`Il y'a ${todos.length} note(s)`)
    console.log('----')
    todos.forEach(el => {
        console.log(`Title: ${el.Title}`)
        console.log(`Body: ${el.Body}\n`)
    });
}


switch (process.argv[2]) {
    case 'help':
        return Help()
        break;
    case 'add':
        return Add()
        break;
    case 'remove':
            return Remove()
            break;
    case 'list':
            return List()
            break;
    case 'read':
            return Read()
            break;
    default:
        return Help()
}