//Seleção dos elementos
const notesContainer = document.querySelector("#notes-container");
const noteInput = document.querySelector("#note-content");
const addNoteBtn = document.querySelector(".add-note");

//Funções
function showNotes(){ //exibir as notas na área de trabalho
    cleanNotes(); //limpar a lista de notas

    getNotes().forEach((note) => { //receber a lista de notas

        const noteElement = createNote(note.id, note.content, note.fixed); //criar o elemento na dom a partir dos dados recebidos do objeto
        
        notesContainer.appendChild(noteElement); //adicionar dentro da listagem
    });
}

function cleanNotes(){
    notesContainer.replaceChildren([]); //limpar todas as notas
}

function addNote(){ //ativar o botão de adicionar nota

    const notes = getNotes(); //criar uma função que vai adicionar as notas no localStorage
    
    const noteObject = { //conteúdo de dentro da nota
        id: generateId(), //número de identificação da nota, verificar que foi criada uma função para gerar este id
        content: noteInput.value, //conteúdo da nota
        fixed: false, //se está fixada ou não
    };

    const noteElement = createNote(noteObject.id, noteObject.content);  //criar o elemento "nota" com um id e contúdo

    notesContainer.appendChild(noteElement); //pegar a nota que foi gerada pela função createNote e adicionar ela dentro do html, a nota já vai aparecer no projeto

    notes.push(noteObject); //adicionar nota nova

    saveNotes (notes); // função que vai receber as notas, salva as notas

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

    const pinIcon = document.createElement("i"); //criar o ícone para fixar as notas

    pinIcon.classList.add(...["bi", "bi-pin"]); //colocar as classes do ícone do bootstrap

    element.appendChild(pinIcon); //os ícones já vão aparecer

    const deleteIcon = document.createElement("i"); //criar o ícone para deletar as notas

    deleteIcon.classList.add(...["bi", "bi-x-lg"]); //colocar as classes do ícone do bootstrap

    element.appendChild(deleteIcon); //os ícones já vão aparecer

    const duplicateIcon = document.createElement("i"); //criar o ícone para duplicar as notas

    duplicateIcon.classList.add(...["bi", "bi-file-earmark-plus"]); //colocar as classes do ícone do bootstrap

    element.appendChild(duplicateIcon); //os ícones já vão aparecer


    if(fixed){// fazer aparecer que a nota está fixada
        element.classList.add("fixed"); //adiciona a classe fixada
    }

    //Eventos do elemento - sendo criados após o carregamento da página
    element.querySelector(".bi-pin").addEventListener("click", () => { //fazer a tag de fixar funcionar
        toggleFixNote(id);
    });

    element.querySelector(".bi-x-lg").addEventListener("click", () =>{ // fazer a tag deletar funcionar
        deleteNote(id, element);
    });

    element.querySelector(".bi-file-earmark-plus").addEventListener("click", () =>{ // fazer a tag duplicar funcionar
        copyNote(id);
    });

    return element; 
}; 

function toggleFixNote(id){ //alterar o fixa ou desfixa no local storage também

    const notes = getNotes();

    const targetNote = notes.filter((note) => note.id === id)[0];

    targetNote.fixed = !targetNote.fixed;

    saveNotes(notes);

    showNotes();
}

function deleteNote(id, element){ //função para deletar as notas

    const notes = getNotes().filter((note) => note.id !== id);

    saveNotes(notes);

    notesContainer.removeChild(element);
};

function copyNote(id){ //função para ativar duplicar notas

    const notes = getNotes();

    const targetNote = notes.filter((note) => note.id === id)[0];

    const noteObject = { //cria um mesmo objeto com id diferente
        id:generateId(),
        content:targetNote.content,
        fixed:false,
    };

    const noteElement = createNote(noteObject.id, noteObject.content, noteObject.fixed);//criação do elemento duplicado

    notesContainer.appendChild(noteElement);//adicionar na dom

    notes.push(noteObject);//adicionar na local storage

    saveNotes(notes);

};

//Local Storage

function getNotes() { //pegar as notas que estão no local storage

    const notes = JSON.parse(localStorage.getItem("notes") || "[]"); // || = or/ou

    const orderedNotes = notes.sort((a,b) => (a.fixed > b.fixed ? -1 : 1)); //colocar as notas fixadas primeiro das não fixadas

    return orderedNotes;
}
function saveNotes(notes){ //salvar as notas no localStorage
    localStorage.setItem("notes", JSON.stringify(notes) || "[]"); // o || "[]" serve para pegar um array vazio, pra não começar vazio
    
    return notes;
}

//Eventos
addNoteBtn.addEventListener("click", () => addNote()); //ativar o botão de adicionar nota

//Inicialização
showNotes();

