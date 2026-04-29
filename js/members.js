// Exemplo de manipulação do formulário de membros
const memberForm = document.querySelector('form');
const STORAGE_KEY = 'maconaria_membros';

// Função para renderizar a lista de membros
function renderMembers() {
    const listContainer = document.querySelector('#lista-membros');
    if (!listContainer) return;

    const membros = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    
    if (membros.length === 0) {
        listContainer.innerHTML = '<p class="text-center text-gray-500 italic">Nenhum membro cadastrado ainda.</p>';
        return;
    }

    listContainer.innerHTML = membros.map((m, index) => `
        <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg border-l-4 border-slate-900 shadow-sm">
            <div>
                <p class="font-bold text-slate-900">${m.nome}</p>
                <p class="text-xs text-gray-600">${m.grau}</p>
            </div>
            <div class="flex items-center gap-3">
                <span class="text-[10px] text-gray-400 uppercase font-medium">${m.dataCadastro}</span>
                <button onclick="deleteMember(${index})" class="text-red-500 hover:text-red-700 transition-colors p-1" title="Excluir Membro">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
        </div>
    `).join('');
}

// Função para excluir membro
window.deleteMember = function(index) {
    if (confirm("Deseja realmente excluir este membro?")) {
        const membros = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        membros.splice(index, 1);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(membros));
        renderMembers();
    }
};

if (memberForm) {
    memberForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nomeInput = e.target.querySelector('input[placeholder*="Nome"]');
        const grauInput = e.target.querySelector('input[placeholder*="Grau"]');

        if (!nomeInput.value.trim() || !grauInput.value.trim()) {
            alert("Por favor, preencha todos os campos corretamente.");
            return;
        }

        const novoMembro = {
            nome: nomeInput.value.trim(),
            grau: grauInput.value.trim(),
            dataCadastro: new Date().toLocaleDateString('pt-BR')
        };

        // Salvar no LocalStorage (Persistência)
        const membrosAtuais = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        membrosAtuais.push(novoMembro);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(membrosAtuais));

        alert(`Membro "${novoMembro.nome}" cadastrado com sucesso!`);
        e.target.reset();
        renderMembers(); // Atualiza a lista na tela
    });
}

// Carregar a lista ao abrir a página
document.addEventListener('DOMContentLoaded', renderMembers);