const meetingForm = document.getElementById('meeting-form');
const MEETING_STORAGE_KEY = 'maconaria_reunioes';

// Função para renderizar a lista de reuniões
function renderMeetings() {
    const listContainer = document.getElementById('lista-reunioes');
    if (!listContainer) return;

    const meetings = JSON.parse(localStorage.getItem(MEETING_STORAGE_KEY) || '[]');
    
    if (meetings.length === 0) {
        listContainer.innerHTML = '<p class="text-center text-gray-500 italic">Nenhuma reunião agendada.</p>';
        return;
    }

    // Ordenar por data (opcional, mas recomendado)
    listContainer.innerHTML = meetings.map((m, index) => `
        <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg border-l-4 border-gold shadow-sm">
            <div>
                <p class="font-bold text-slate-900">${m.assunto}</p>
                <p class="text-sm text-gray-600 italic">${m.local}</p>
            </div>
            <div class="flex items-center gap-3">
                <div class="text-right">
                    <p class="text-xs font-bold text-slate-700">${m.data.split('-').reverse().join('/')}</p>
                    <p class="text-xs text-gray-500">${m.hora}h</p>
                </div>
                <button onclick="shareMeeting(${index})" class="text-gold hover:text-slate-900 transition-colors p-1" title="Compartilhar">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                </button>
                <button onclick="deleteMeeting(${index})" class="text-red-500 hover:text-red-700 transition-colors p-1" title="Excluir Reunião">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
        </div>
    `).join('');
}

// Função para compartilhar a reunião
window.shareMeeting = function(index) {
    const meetings = JSON.parse(localStorage.getItem(MEETING_STORAGE_KEY) || '[]');
    const m = meetings[index];
    if (!m) return;

    const shareText = `🏛️ *Reunião Maçônica*\n📌 *Assunto:* ${m.assunto}\n📍 *Local:* ${m.local}\n📅 *Data:* ${m.data.split('-').reverse().join('/')}\n⏰ *Hora:* ${m.hora}h`;

    if (navigator.share) {
        navigator.share({
            title: 'Agenda de Reunião',
            text: shareText
        }).catch(console.error);
    } else {
        // Fallback: Copiar para o clipboard caso o navegador não suporte Web Share (Desktop)
        navigator.clipboard.writeText(shareText).then(() => {
            alert('Detalhes da reunião copiados para a área de transferência!');
        });
    }
};

// Função para excluir reunião
window.deleteMeeting = function(index) {
    if (confirm("Deseja realmente excluir esta reunião agendada?")) {
        const meetings = JSON.parse(localStorage.getItem(MEETING_STORAGE_KEY) || '[]');
        meetings.splice(index, 1);
        localStorage.setItem(MEETING_STORAGE_KEY, JSON.stringify(meetings));
        renderMeetings();
    }
};

if (meetingForm) {
    meetingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const localInput = document.getElementById('m-local');
        const dataInput = document.getElementById('m-data');
        const horaInput = document.getElementById('m-hora');
        const assuntoInput = document.getElementById('m-assunto');

        const novaReuniao = {
            local: localInput.value.trim(),
            data: dataInput.value,
            hora: horaInput.value,
            assunto: assuntoInput.value.trim()
        };

        const meetingsAtuais = JSON.parse(localStorage.getItem(MEETING_STORAGE_KEY) || '[]');
        meetingsAtuais.push(novaReuniao);
        localStorage.setItem(MEETING_STORAGE_KEY, JSON.stringify(meetingsAtuais));

        alert(`Reunião sobre "${novaReuniao.assunto}" agendada com sucesso!`);
        e.target.reset();
        renderMeetings();
    });
}

document.addEventListener('DOMContentLoaded', renderMeetings);