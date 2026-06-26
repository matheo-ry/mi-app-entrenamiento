/* ==========================================
   GYM APP - LÓGICA DE APLICACIÓN (v1-visual-base)
   Navegación, Steppers, Cronómetro y Gestos
   ========================================== */

// 1. ESTRUCTURA DE DATOS MOCK DE RUTINAS Y EJERCICIOS
const ROUTINE_DATA = {
    "pecho-espalda": {
        title: "Pecho / Espalda",
        exercises: [
            {
                name: "Press Horizontal",
                history: "Sesión 1: 90kg x 8 | Sesión 2: 90kg x 8 | Sesión 3: 90kg x 7",
                notes: "Mantener el codo a 45 grados. RPE 9 en la última serie. Incrementar a 92.5kg si se consiguen todas las repeticiones.",
                weight: 90,
                reps: 8,
                rir: 2
            },
            {
                name: "Dominadas Lastradas",
                history: "Sesión 1: +15kg x 6 | Sesión 2: +15kg x 6 | Sesión 3: +10kg x 8",
                notes: "Tracción completa hasta el pecho. Controlar la fase excéntrica (bajada lenta y controlada de 3 segundos).",
                weight: 15,
                reps: 6,
                rir: 1
            },
            {
                name: "Press Inclinado c/ Mancuernas",
                history: "Sesión 1: 36kg x 10 | Sesión 2: 34kg x 10 | Sesión 3: 34kg x 9",
                notes: "Puntas de las mancuernas ligeramente rotadas hacia adentro. Foco en el estiramiento máximo del pectoral.",
                weight: 34,
                reps: 10,
                rir: 2
            },
            {
                name: "Remo con Barra",
                history: "Sesión 1: 80kg x 8 | Sesión 2: 80kg x 8 | Sesión 3: 75kg x 10",
                notes: "Mantener la espalda paralela al suelo. Llevar la barra hacia el ombligo y apretar escápulas.",
                weight: 80,
                reps: 8,
                rir: 2
            }
        ]
    },
    "brazo-pierna-1": {
        title: "Brazo / Pierna 1",
        exercises: [
            {
                name: "Sentadilla Búlgara",
                history: "Sesión 1: 24kg x 10 | Sesión 2: 24kg x 9 | Sesión 3: 20kg x 12",
                notes: "Torso ligeramente inclinado al frente para mayor estímulo de glúteos. Mancuernas a los costados.",
                weight: 24,
                reps: 10,
                rir: 1
            },
            {
                name: "Curl de Bíceps Inclinado",
                history: "Sesión 1: 16kg x 10 | Sesión 2: 16kg x 8 | Sesión 3: 14kg x 10",
                notes: "Codos fijos detrás de la línea del cuerpo. Movimiento estricto, evitar el balanceo de hombros.",
                weight: 16,
                reps: 10,
                rir: 2
            },
            {
                name: "Extensión Tríceps en Polea",
                history: "Sesión 1: 30kg x 12 | Sesión 2: 30kg x 11 | Sesión 3: 25kg x 15",
                notes: "Hombros fijos abajo. Extensión completa de codos. Enfocar en apretar el tríceps al final.",
                weight: 30,
                reps: 12,
                rir: 1
            },
            {
                name: "Peso Muerto Rumano",
                history: "Sesión 1: 100kg x 8 | Sesión 2: 95kg x 8 | Sesión 3: 90kg x 10",
                notes: "Empujar la cadera hacia atrás. Barra rozando las piernas. Sentir tensión pura en isquiotibiales.",
                weight: 95,
                reps: 8,
                rir: 2
            }
        ]
    },
    "espalda-pecho": {
        title: "Espalda / Pecho",
        exercises: [
            {
                name: "Jalón al Pecho",
                history: "Sesión 1: 75kg x 10 | Sesión 2: 70kg x 11 | Sesión 3: 70kg x 10",
                notes: "Pensar en llevar los codos hacia las caderas. No tirarse hacia atrás en exceso.",
                weight: 70,
                reps: 10,
                rir: 2
            },
            {
                name: "Fondos en Paralelas",
                history: "Sesión 1: BW+20kg x 8 | Sesión 2: BW+20kg x 7 | Sesión 3: BW x 12",
                notes: "Inclinarse ligeramente adelante. Rango de movimiento profundo con control del hombro.",
                weight: 20,
                reps: 8,
                rir: 1
            },
            {
                name: "Remo Unilateral c/ Mancuerna",
                history: "Sesión 1: 40kg x 10 | Sesión 2: 40kg x 9 | Sesión 3: 38kg x 10",
                notes: "Apoyo en banco. Llevar la mancuerna en diagonal hacia la cadera.",
                weight: 40,
                reps: 10,
                rir: 2
            },
            {
                name: "Cruces en Polea Alta",
                history: "Sesión 1: 15kg x 15 | Sesión 2: 15kg x 14 | Sesión 3: 12kg x 15",
                notes: "Contracción máxima en el centro cruzando las manos ligeramente. Fase negativa controlada.",
                weight: 15,
                reps: 15,
                rir: 1
            }
        ]
    },
    "brazo-pierna-2": {
        title: "Brazo / Pierna 2",
        exercises: [
            {
                name: "Prensa de Piernas",
                history: "Sesión 1: 200kg x 10 | Sesión 2: 200kg x 9 | Sesión 3: 180kg x 12",
                notes: "Bajar controlado hasta donde la pelvis no se retrovierta (buttwink). Empuje sólido.",
                weight: 200,
                reps: 10,
                rir: 2
            },
            {
                name: "Curl Scott c/ Barra Z",
                history: "Sesión 1: 35kg x 8 | Sesión 2: 30kg x 10 | Sesión 3: 30kg x 9",
                notes: "Apoyo completo de axilas en el banco. No extender los codos hiperlaxamente abajo.",
                weight: 30,
                reps: 10,
                rir: 2
            },
            {
                name: "Press Francés",
                history: "Sesión 1: 30kg x 10 | Sesión 2: 30kg x 9 | Sesión 3: 25kg x 12",
                notes: "Llevar la barra hacia la coronilla, no hacia la frente, para mantener tensión en tríceps.",
                weight: 30,
                reps: 10,
                rir: 1
            },
            {
                name: "Elevación de Talones de Pie",
                history: "Sesión 1: 60kg x 15 | Sesión 2: 60kg x 15 | Sesión 3: 50kg x 18",
                notes: "Pausa de 2 segundos en el estiramiento máximo (abajo) y 1 segundo arriba.",
                weight: 60,
                reps: 15,
                rir: 1
            }
        ]
    }
};

// 2. ESTADO GLOBAL DE LA APLICACIÓN
const state = {
    currentTab: 'screen-entreno',
    currentRoutineKey: null,
    currentExerciseIndex: 0,
    isFirstTimeFoco: true
};

// 3. REFERENCIAS DEL DOM
const dom = {
    // Pantallas principales
    screens: {
        entreno: document.getElementById('screen-entreno'),
        metricas: document.getElementById('screen-metricas'),
        general: document.getElementById('screen-general'),
        foco: document.getElementById('screen-foco')
    },
    // Elementos de Navegación
    navBar: document.getElementById('main-nav'),
    navItems: document.querySelectorAll('.nav-item'),
    
    // Vista General
    btnBackToHome: document.getElementById('btn-back-to-home'),
    routineGeneralTitle: document.getElementById('routine-general-title'),
    exerciseListContainer: document.getElementById('exercise-list-container'),
    btnStartWorkout: document.getElementById('btn-start-workout'),
    
    // Vista Foco (Zona de Guerra)
    btnBackToGeneral: document.getElementById('btn-back-to-general'),
    focoExerciseName: document.getElementById('foco-exercise-name'),
    focoExerciseIndex: document.getElementById('foco-exercise-index'),
    btnToggleNotes: document.getElementById('btn-toggle-notes'),
    notesPanel: document.getElementById('notes-panel'),
    notesText: document.getElementById('notes-text'),
    gestureHelp: document.getElementById('gesture-help'),
    
    // Steppers de Vista Foco
    inputs: {
        weight: document.getElementById('input-weight'),
        reps: document.getElementById('input-reps'),
        rir: document.getElementById('input-rir')
    },
    buttons: {
        weightMinus: document.getElementById('btn-weight-minus'),
        weightPlus: document.getElementById('btn-weight-plus'),
        repsMinus: document.getElementById('btn-reps-minus'),
        repsPlus: document.getElementById('btn-reps-plus'),
        rirMinus: document.getElementById('btn-rir-minus'),
        rirPlus: document.getElementById('btn-rir-plus')
    },
    
    // Cronómetro
    timerDisplay: document.getElementById('timer-display'),
    timerStatus: document.getElementById('timer-status'),
    timerManual: document.getElementById('timer-manual'),
    btnTimerPlay: document.getElementById('btn-timer-play'),
    btnTimerReset: document.getElementById('btn-timer-reset'),
    timerPresets: document.querySelectorAll('.btn-preset')
};

// 4. CRONÓMETRO VARIABLES
let timerInterval = null;
let timerSecondsLeft = 0;
let timerInitialSeconds = 90; // Default 1:30
let isTimerRunning = false;

// 5. INICIALIZADOR DE ICONOS
function initIcons() {
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

// 6. GESTIÓN DE NAVEGACIÓN PRINCIPAL
function switchTab(targetTabId) {
    if (state.currentTab === targetTabId) return;
    
    // Apagar la activa
    document.querySelectorAll('.screen').forEach(screen => {
        if (screen.id !== 'screen-general' && screen.id !== 'screen-foco') {
            screen.classList.remove('active');
        }
    });
    
    // Encender la seleccionada
    const targetScreen = document.getElementById(targetTabId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
    
    // Actualizar nav items
    dom.navItems.forEach(item => {
        if (item.dataset.target === targetTabId) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    state.currentTab = targetTabId;
    
    // Si volvemos al Home de entrenamientos, aseguramos cerrar sub-pantallas
    if (targetTabId === 'screen-entreno') {
        dom.screens.general.classList.remove('active');
        dom.screens.foco.classList.remove('active');
        dom.navBar.style.display = 'flex';
    } else {
        dom.screens.general.classList.remove('active');
        dom.screens.foco.classList.remove('active');
    }
}

// 7. FUNCIONES DE VISTA GENERAL (RUTINAS)
function openRoutineGeneral(routineKey) {
    const routine = ROUTINE_DATA[routineKey];
    if (!routine) return;
    
    state.currentRoutineKey = routineKey;
    dom.routineGeneralTitle.textContent = routine.title;
    
    // Poblar la lista de ejercicios dinámicamente
    dom.exerciseListContainer.innerHTML = '';
    
    routine.exercises.forEach((ex, index) => {
        const card = document.createElement('div');
        card.className = 'card-exercise';
        card.innerHTML = `
            <div class="exercise-title-row">
                <span class="exercise-name">${ex.name}</span>
                <i data-lucide="chevron-right" class="arrow-right-icon"></i>
            </div>
            <div class="history-block">
                <span class="history-title">Últimas 3 sesiones</span>
                <span class="history-content">${ex.history}</span>
            </div>
        `;
        
        // Al tocar un ejercicio abrir Vista Foco
        card.addEventListener('click', () => {
            openExerciseFoco(index);
        });
        
        dom.exerciseListContainer.appendChild(card);
    });
    
    // Mostrar pantalla general
    dom.screens.general.classList.add('active');
    // Ocultar barra inferior para dar foco
    dom.navBar.style.display = 'none';
    
    initIcons();
}

function closeRoutineGeneral() {
    dom.screens.general.classList.remove('active');
    dom.navBar.style.display = 'flex';
}

// 8. FUNCIONES DE VISTA FOCO (ZONA DE GUERRA)
function openExerciseFoco(index) {
    const routine = ROUTINE_DATA[state.currentRoutineKey];
    if (!routine || index < 0 || index >= routine.exercises.length) return;
    
    state.currentExerciseIndex = index;
    const exercise = routine.exercises[index];
    
    // Cargar datos en pantalla
    dom.focoExerciseName.textContent = exercise.name;
    dom.focoExerciseIndex.textContent = `Ejercicio ${index + 1} de ${routine.exercises.length}`;
    dom.notesText.textContent = exercise.notes;
    
    // Asignar inputs desde el modelo o mantener
    dom.inputs.weight.value = exercise.weight;
    dom.inputs.reps.value = exercise.reps;
    dom.inputs.rir.value = exercise.rir;
    
    // Resetear/detener cronómetro si cambia el ejercicio
    resetTimer();
    
    // Ocultar panel de notas al entrar
    dom.notesPanel.style.display = 'none';
    dom.btnToggleNotes.classList.remove('active');
    
    // Mostrar pantalla foco
    dom.screens.foco.className = 'screen active screen-foco'; // Limpiar clases de animación previas
    
    // Mostrar la guía de gestos la primera vez que se abre la vista Foco
    if (state.isFirstTimeFoco) {
        setTimeout(() => {
            dom.gestureHelp.classList.add('show');
        }, 300);
    }
    
    initIcons();
}

function closeExerciseFoco() {
    dom.screens.foco.classList.remove('active');
    resetTimer();
}

// Cambiar de ejercicio (Navegación vertical dentro de Foco)
function navigateExercise(direction) {
    const routine = ROUTINE_DATA[state.currentRoutineKey];
    if (!routine) return;
    
    let newIndex = state.currentExerciseIndex + direction;
    
    // Validar límites
    if (newIndex >= 0 && newIndex < routine.exercises.length) {
        // Animaciones de transición
        const focoScreen = dom.screens.foco;
        
        // Agregar clase para animación visual
        if (direction > 0) {
            focoScreen.classList.add('swipe-up-anim'); // Siguiente (deslizar arriba)
        } else {
            focoScreen.classList.add('swipe-down-anim'); // Anterior (deslizar abajo)
        }
        
        // Cargar datos tras delay corto de animación
        setTimeout(() => {
            openExerciseFoco(newIndex);
            focoScreen.classList.remove('swipe-up-anim', 'swipe-down-anim');
        }, 150);
    } else {
        // Alerta de feedback táctil suave si llega al final
        const borderGlow = direction > 0 ? 'top' : 'bottom';
        const indicator = document.querySelector(`.swipe-indicator.${borderGlow}`);
        if (indicator) {
            indicator.style.backgroundColor = 'var(--accent-purple-bright)';
            indicator.style.boxShadow = '0 0 10px var(--accent-purple-bright)';
            setTimeout(() => {
                indicator.style.backgroundColor = 'var(--border-subtle)';
                indicator.style.boxShadow = 'none';
            }, 300);
        }
    }
}

// 9. LÓGICA DE LOS INPUTS HÍBRIDOS (STEPPERS)
function setupSteppers() {
    // PESO (Step: 2.5 kg)
    dom.buttons.weightMinus.addEventListener('click', () => {
        let val = parseFloat(dom.inputs.weight.value) || 0;
        val = Math.max(0, val - 2.5);
        dom.inputs.weight.value = val % 1 === 0 ? val.toFixed(0) : val.toFixed(1);
        updateStateData();
    });
    dom.buttons.weightPlus.addEventListener('click', () => {
        let val = parseFloat(dom.inputs.weight.value) || 0;
        val += 2.5;
        dom.inputs.weight.value = val % 1 === 0 ? val.toFixed(0) : val.toFixed(1);
        updateStateData();
    });
    
    // REPETICIONES (Step: 1)
    dom.buttons.repsMinus.addEventListener('click', () => {
        let val = parseInt(dom.inputs.reps.value) || 0;
        val = Math.max(0, val - 1);
        dom.inputs.reps.value = val;
        updateStateData();
    });
    dom.buttons.repsPlus.addEventListener('click', () => {
        let val = parseInt(dom.inputs.reps.value) || 0;
        val += 1;
        dom.inputs.reps.value = val;
        updateStateData();
    });
    
    // RIR (Reps in Reserva, Clamp: 0 a 5)
    dom.buttons.rirMinus.addEventListener('click', () => {
        let val = parseInt(dom.inputs.rir.value) || 0;
        val = Math.max(0, val - 1);
        dom.inputs.rir.value = val;
        updateStateData();
    });
    dom.buttons.rirPlus.addEventListener('click', () => {
        let val = parseInt(dom.inputs.rir.value) || 0;
        val = Math.min(5, val + 1);
        dom.inputs.rir.value = val;
        updateStateData();
    });
    
    // Escuchar cambios directos en los inputs
    Object.values(dom.inputs).forEach(input => {
        input.addEventListener('change', () => {
            // Clampear RIR en manual
            if (input.id === 'input-rir') {
                let val = parseInt(input.value) || 0;
                input.value = Math.max(0, Math.min(5, val));
            }
            updateStateData();
        });
    });
}

// Sincronizar inputs manuales con el estado mock
function updateStateData() {
    const routine = ROUTINE_DATA[state.currentRoutineKey];
    if (!routine) return;
    const exercise = routine.exercises[state.currentExerciseIndex];
    if (!exercise) return;
    
    exercise.weight = parseFloat(dom.inputs.weight.value) || 0;
    exercise.reps = parseInt(dom.inputs.reps.value) || 0;
    exercise.rir = parseInt(dom.inputs.rir.value) || 0;
}

// 10. LÓGICA DEL CRONÓMETRO
function formatTime(totalSeconds) {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateTimerDisplay() {
    dom.timerDisplay.textContent = formatTime(timerSecondsLeft);
}

function startTimer(seconds) {
    clearInterval(timerInterval);
    timerSecondsLeft = seconds;
    updateTimerDisplay();
    
    dom.timerStatus.textContent = "Descansando...";
    dom.timerStatus.style.color = "var(--accent-purple-bright)";
    isTimerRunning = true;
    
    dom.btnTimerPlay.innerHTML = '<i data-lucide="pause"></i>';
    initIcons();
    
    timerInterval = setInterval(() => {
        if (timerSecondsLeft > 0) {
            timerSecondsLeft--;
            updateTimerDisplay();
        } else {
            // Completado
            clearInterval(timerInterval);
            isTimerRunning = false;
            dom.timerStatus.textContent = "¡Tiempo completado!";
            dom.timerStatus.style.color = "var(--accent-red)";
            dom.btnTimerPlay.innerHTML = '<i data-lucide="play"></i>';
            initIcons();
            
            // Animación de flash rojo
            dom.timerDisplay.style.color = "var(--accent-red)";
            setTimeout(() => {
                dom.timerDisplay.style.color = "var(--text-primary)";
            }, 1000);
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
    dom.timerStatus.textContent = "Descanso pausado";
    dom.timerStatus.style.color = "var(--text-secondary)";
    dom.btnTimerPlay.innerHTML = '<i data-lucide="play"></i>';
    initIcons();
}

function resetTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
    timerSecondsLeft = timerInitialSeconds;
    updateTimerDisplay();
    dom.timerStatus.textContent = "Descanso listo";
    dom.timerStatus.style.color = "var(--text-muted)";
    dom.btnTimerPlay.innerHTML = '<i data-lucide="play"></i>';
    
    // Limpiar presets activos
    dom.timerPresets.forEach(btn => btn.classList.remove('active'));
    
    initIcons();
}

function setupTimer() {
    // Cargar visual inicial
    timerSecondsLeft = timerInitialSeconds;
    updateTimerDisplay();
    
    // Play / Pause
    dom.btnTimerPlay.addEventListener('click', () => {
        if (isTimerRunning) {
            pauseTimer();
        } else {
            if (timerSecondsLeft <= 0) {
                timerSecondsLeft = timerInitialSeconds;
            }
            startTimer(timerSecondsLeft);
        }
    });
    
    // Reset
    dom.btnTimerReset.addEventListener('click', () => {
        resetTimer();
    });
    
    // Botones rápidos (Presets)
    dom.timerPresets.forEach(btn => {
        btn.addEventListener('click', () => {
            dom.timerPresets.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const secs = parseInt(btn.dataset.seconds);
            timerInitialSeconds = secs;
            startTimer(secs);
        });
    });
    
    // Entrada Manual
    dom.timerManual.addEventListener('change', () => {
        const val = dom.timerManual.value.trim();
        // Acepta formato MM:SS o número de segundos
        if (val.includes(':')) {
            const parts = val.split(':');
            const mins = parseInt(parts[0]) || 0;
            const secs = parseInt(parts[1]) || 0;
            timerInitialSeconds = (mins * 60) + secs;
        } else {
            timerInitialSeconds = parseInt(val) || 90;
        }
        
        dom.timerManual.value = ''; // Limpiar input
        resetTimer();
        startTimer(timerInitialSeconds);
    });
}

// 11. SISTEMA DE GESTOS (SWIPES) EN PANTALLA FOCO
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

function setupGestures() {
    const target = dom.screens.foco;
    
    // Soporte táctil
    target.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });
    
    target.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipeGesture();
    }, { passive: true });
    
    // Soporte de ratón (para pruebas en escritorio)
    let isMouseDown = false;
    
    target.addEventListener('mousedown', (e) => {
        touchStartX = e.screenX;
        touchStartY = e.screenY;
        isMouseDown = true;
    });
    
    target.addEventListener('mouseup', (e) => {
        if (!isMouseDown) return;
        touchEndX = e.screenX;
        touchEndY = e.screenY;
        isMouseDown = false;
        handleSwipeGesture();
    });
}

function handleSwipeGesture() {
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;
    
    const threshold = 70; // Umbral de swipe en pixeles
    
    if (Math.abs(diffX) > Math.abs(diffY)) {
        // Deslizamiento Horizontal
        if (diffX > threshold) {
            // Swipe Derecha (deslizar de izquierda a derecha -> Volver)
            closeExerciseFoco();
        }
    } else {
        // Deslizamiento Vertical
        if (diffY > threshold) {
            // Swipe Abajo (deslizar de arriba a abajo -> Ejercicio Anterior)
            navigateExercise(-1);
        } else if (diffY < -threshold) {
            // Swipe Arriba (deslizar de abajo a arriba -> Siguiente Ejercicio)
            navigateExercise(1);
        }
    }
}

// Soporte de atajos de teclado para facilitar pruebas de desarrollo
function setupKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
        // Solo actuar si la pantalla Foco está visible
        if (dom.screens.foco.classList.contains('active')) {
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                navigateExercise(-1); // Ejercicio anterior
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                navigateExercise(1); // Siguiente ejercicio
            } else if (e.key === 'Escape' || e.key === 'ArrowRight') {
                e.preventDefault();
                closeExerciseFoco(); // Volver
            }
        }
    });
}

// 12. EVENT BINDINGS GENERALES
function bindEvents() {
    // Toggles de pestañas principales (Navbar inferior)
    dom.navItems.forEach(item => {
        item.addEventListener('click', () => {
            const target = item.dataset.target;
            switchTab(target);
        });
    });
    
    // Rutinas en Home
    document.querySelectorAll('.btn-routine').forEach(btn => {
        btn.addEventListener('click', () => {
            const routineKey = btn.dataset.routine;
            openRoutineGeneral(routineKey);
        });
    });
    
    // Botones de vuelta atrás
    dom.btnBackToHome.addEventListener('click', closeRoutineGeneral);
    dom.btnBackToGeneral.addEventListener('click', closeExerciseFoco);
    
    // Mostrar/Ocultar notas de ejercicio
    dom.btnToggleNotes.addEventListener('click', () => {
        const isVisible = dom.notesPanel.style.display === 'block';
        if (isVisible) {
            dom.notesPanel.style.display = 'none';
            dom.btnToggleNotes.classList.remove('active');
        } else {
            dom.notesPanel.style.display = 'block';
            dom.btnToggleNotes.classList.add('active');
        }
    });
    
    // Cerrar superposición de ayuda gestos al tocarla
    dom.gestureHelp.addEventListener('click', () => {
        dom.gestureHelp.classList.remove('show');
        state.isFirstTimeFoco = false;
    });

    // Botón decorativo de tema
    document.getElementById('btn-theme-info').addEventListener('click', () => {
        alert("WARZONE LOG: Estricto Dark Mode activo. Acentos en Morado Eléctrico.");
    });
    
    // Botón mock "Iniciar Entreno" en Vista General
    dom.btnStartWorkout.addEventListener('click', () => {
        alert("¡Entrenamiento iniciado! Toca cualquier ejercicio para ingresar a la Zona de Guerra.");
    });
}

// 13. BOOTSTRAP DE LA APLICACIÓN
function init() {
    bindEvents();
    setupSteppers();
    setupTimer();
    setupGestures();
    setupKeyboardShortcuts();
    initIcons();
    console.log("WARZONE STRENGTH LOG - Frontend cargado con éxito.");
}

// Arrancar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);
