//Seleção dos elementos
const notesContainer = document.querySelector("#notes-container");
const noteInput = document.querySelector("#note-content");
const addNoteBtn = document.querySelector(".add-note");

//Funções
function showNotes(){ //exibir as notas na área de trabalho

    getNotes().forEach((note) => { //receber a lista de notas
        
        const noteElement = createNote(note.id, note.content, note.fixed); //criar o elemento na dom a partir dos dados recebidos do objeto
        
        notesContainer.appendChild(noteElement);
    });
}

function addNote(){ //ativar o botão de adicionar nota

    const notes = []; //criar uma função que vai adicionar as notas no localStorage
    
    const noteObject = { //conteúdo de dentro da nota
        id: generateId(), //número de identificação da nota, verificar que foi criada uma função para gerar este id
        content: noteInput.value, //conteúdo da nota
        fixed: false, //se está fixada ou não
    };

    const noteElement = createNote(noteObject.id, noteObject.content);  //criar o elemento "nota" com um id e contúdo

    notesContainer.appendChild(noteElement); //pegar a nota que foi gerada pela função createNote e adicionar ela dentro do html, a nota já vai aparecer no projeto

    notes.push(noteObject); //???????????????????????????????????????????????????????????

    saveNotes (notes); // função que vai receber as notas

    noteInput.value = ""; //limpar o campo do input depois que a nota já foi adicionada
}

function generateId(){//função para garantir que o id da nota não se repita
    return Math.floor(Math.random() * 5000); //vai gerar um novo id de 1 até 5000
}

function createNote(id, content, fixed){ //criar o elemento "nota"

    const element = document.createElement("div"); //criar um elemento, uma div

    element.classList.add("note"); //adicionar a classe "note" ao elemento div

    const textarea = document.createElement("textarea"); //criar uma textarea

    textarea.value = content; // valor da textarea como o do conteúdo recebido da função

    textarea.placeholder = "Adicione algum texto..."; //definir um placeholder

    element.appendChild(textarea); //adicionar o textarea ao elemento, div note

    return element;
}; 

//Local Storage

function getNotes() { //pegar as notas que estão no local storage
    const notes = JSON.parse(localStorage.getItem("notes"));
}
function saveNotes(notes){ //salvar as notas no localStorage
    localStorage.setItem("notes", JSON.stringify(notes) || "[]"); //??????????????? o || "[]" serve para pegar um array vazio, pra não começar vazio
    
    return notes;
}

//Eventos
addNoteBtn.addEventListener("click", () => addNote()); //ativar o botão de adicionar nota

//Inicialização
showNotes();