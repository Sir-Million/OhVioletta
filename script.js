function setupNotesRotation() {
    const notes = document.querySelectorAll('.note');
    let currentIndex = 0;
    
    function updateNote() {
        notes.forEach(note => note.classList.remove('active'));
        notes[currentIndex].classList.add('active');
        
        // Actualizar título de la página
        const currentNote = notes[currentIndex].textContent;
        document.title = `Guía Oh Violeta! - ${currentNote}`;
        
        currentIndex = (currentIndex + 1) % notes.length;
    }

    // Establecer la primera nota
    updateNote();
    
    // Rotar notas cada 5 segundos
    setInterval(updateNote, 5000);
}

function setupFooterToggle() {
    const toggleBtn = document.getElementById('toggleFooter');
    const footer = document.querySelector('footer');
    let isFooterVisible = true;

    toggleBtn.addEventListener('click', () => {
        isFooterVisible = !isFooterVisible;
        footer.classList.toggle('hidden', !isFooterVisible);
        toggleBtn.classList.toggle('footer-hidden', !isFooterVisible);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Cargar contenido inicial
    loadContent();

    // Configurar navegación
    setupNavigation();

    // Iniciar rotación de notas
    setupNotesRotation();

    // Configurar toggle del footer
    setupFooterToggle();
});

function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover clase active de todos los botones
            navButtons.forEach(btn => btn.classList.remove('active'));
            // Agregar clase active al botón clickeado
            button.classList.add('active');

            // Ocultar todas las secciones
            const sections = document.querySelectorAll('.content-section');
            sections.forEach(section => section.classList.remove('active'));

            // Mostrar la sección correspondiente
            const targetSection = button.dataset.section;
            document.getElementById(targetSection).classList.add('active');
        });
    });
}

async function loadContent() {
    try {
        // Cargar guía de escritura
        const guiaResponse = await fetch('guiadeescritura.md');
        const guiaText = await guiaResponse.text();
        const guiaHtml = marked.parse(guiaText);
        document.querySelector('#guia .content-container').innerHTML = guiaHtml;

        // Cargar escena 1
        const escena1Response = await fetch('escena1.md');
        const escena1Text = await escena1Response.text();
        const escena1Html = marked.parse(escena1Text);
        document.querySelector('.scene-card:first-child .content-container').innerHTML = escena1Html;

        // Cargar fragmento descartado
        const fragmentoResponse = await fetch('escena4-fragmento.md');
        const fragmentoText = await fragmentoResponse.text();
        const fragmentoHtml = marked.parse(fragmentoText);
        document.querySelector('.scene-card:last-child .content-container').innerHTML = fragmentoHtml;

    } catch (error) {
        console.error('Error cargando el contenido:', error);
    }
}