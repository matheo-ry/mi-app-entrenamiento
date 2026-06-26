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
                name: "Press Horizontal en máquina",
                history: [
                    "90x10(1) 90x10(1) 90x9(0)",
                    "95x9(1) 95x8(1) 95x8(0)",
                    "95x10(1) 95x9(1) 95x8(0)"
                ],
                notes: "3 series.",
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Press Inclinado",
                history: [
                    "70x10(1) 70x9(0)",
                    "75x8(1) 75x8(0)",
                    "75x9(1) 75x8(0)"
                ],
                notes: "2 series.",
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Aperturas en polea sentado",
                history: [
                    "15x15(1) 15x14(0)",
                    "17.5x12(1) 17.5x12(0)",
                    "17.5x13(1) 17.5x12(0)"
                ],
                notes: "2 series.",
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Remo en T",
                history: [
                    "60x10(1) 60x10(1) 60x9(0)",
                    "65x8(1) 65x8(1) 65x7(0)",
                    "65x9(1) 65x8(1) 65x8(0)"
                ],
                notes: "3 series.",
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Jalón Dorsal Plano Frontal",
                history: [
                    "50x12(1) 50x11(0)",
                    "55x10(1) 55x9(0)",
                    "55x11(1) 55x10(0)"
                ],
                notes: "2 series.",
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Jalón Dorsal Plano Sagital",
                history: [
                    "45x12(1) 45x11(0)",
                    "50x10(1) 50x9(0)",
                    "50x10(1) 50x10(0)"
                ],
                notes: "2 series.",
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Laterales en polea (Hombro)",
                history: [
                    "10x15(1) 10x15(0)",
                    "12.5x12(1) 12.5x12(0)",
                    "12.5x13(1) 12.5x12(0)"
                ],
                notes: "2 series.",
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Hombro Posterior",
                history: [
                    "10x15(0)",
                    "12.5x12(0)",
                    "12.5x13(0)"
                ],
                notes: "1 serie.",
                weight: 0, reps: 0, rir: 0
            }
        ]
    },
    "brazo-pierna-1": {
        title: "Brazo / Pierna 1",
        exercises: [
            {
                name: "Press Francés",
                history: [
                    "30x12(1) 30x11(0)",
                    "35x10(1) 35x9(0)",
                    "35x11(1) 35x10(0)"
                ],
                notes: "2 series.",
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Extensión de tríceps en polea",
                history: [
                    "20x15(1) 20x14(1) 20x14(0)",
                    "25x12(1) 25x12(1) 25x11(0)",
                    "25x13(1) 25x12(1) 25x12(0)"
                ],
                notes: "3 series.",
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Curl Banco Scott Unilateral",
                history: [
                    "15x12(1) 15x11(1) 15x10(0)",
                    "17.5x10(1) 17.5x9(1) 17.5x9(0)",
                    "17.5x11(1) 17.5x10(1) 17.5x9(0)"
                ],
                notes: "3 series.",
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Martillo en polea",
                history: [
                    "25x12(1) 25x11(0)",
                    "30x10(1) 30x9(0)",
                    "30x11(1) 30x10(0)"
                ],
                notes: "2 series.",
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Elevaciones laterales",
                history: [
                    "12x15(1) 12x14(0)",
                    "14x12(1) 14x12(0)",
                    "14x13(1) 14x12(0)"
                ],
                notes: "2 series.",
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Extensión de cuádriceps",
                history: [
                    "60x15(1) 60x14(1) 60x14(0)",
                    "65x12(1) 65x12(1) 65x11(0)",
                    "65x13(1) 65x12(1) 65x12(0)"
                ],
                notes: "3 series.",
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Sentadilla Péndulo",
                history: [
                    "100x12(1) 100x11(0)",
                    "110x10(1) 110x9(0)",
                    "110x11(1) 110x10(0)"
                ],
                notes: "2 series.",
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Curl Femoral Sentado",
                history: [
                    "50x12(1) 50x11(0)",
                    "55x10(1) 55x9(0)",
                    "55x11(1) 55x10(0)"
                ],
                notes: "2 series.",
                weight: 0, reps: 0, rir: 0
            }
        ]
    },
    "espalda-pecho": {
        title: "Espalda / Pecho",
        exercises: [
            {
                name: "Remo en T",
                history: [
                    "60x10(1) 60x10(1) 60x9(0)",
                    "65x8(1) 65x8(1) 65x7(0)",
                    "65x9(1) 65x8(1) 65x8(0)"
                ],
                notes: "3 series.",
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Jalón Dorsal Plano Frontal",
                history: [
                    "50x12(1) 50x11(0)",
                    "55x10(1) 55x9(0)",
                    "55x11(1) 55x10(0)"
                ],
                notes: "2 series.",
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Jalón Dorsal Plano Sagital",
                history: [
                    "45x12(1) 45x11(0)",
                    "50x10(1) 50x9(0)",
                    "50x10(1) 50x10(0)"
                ],
                notes: "2 series.",
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Press Horizontal en máquina",
                history: [
                    "90x10(1) 90x10(0)",
                    "95x8(1) 95x8(0)",
                    "95x9(1) 95x8(0)"
                ],
                notes: "2 series.",
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Press Inclinado",
                history: [
                    "70x10(1) 70x9(0)",
                    "75x8(1) 75x8(0)",
                    "75x9(1) 75x8(0)"
                ],
                notes: "2 series.",
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Aperturas en polea sentado",
                history: [
                    "15x15(1) 15x14(0)",
                    "17.5x12(1) 17.5x12(0)",
                    "17.5x13(1) 17.5x12(0)"
                ],
                notes: "2 series.",
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Laterales en polea (Hombro)",
                history: [
                    "10x15(1) 10x15(0)",
                    "12.5x12(1) 12.5x12(0)",
                    "12.5x13(1) 12.5x12(0)"
                ],
                notes: "2 series.",
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Hombro Posterior",
                history: [
                    "10x15(0)",
                    "12.5x12(0)",
                    "12.5x13(0)"
                ],
                notes: "1 serie.",
                weight: 0, reps: 0, rir: 0
            }
        ]
    },
    "brazo-pierna-2": {
        title: "Brazo / Pierna 2",
        exercises: [
            {
                name: "Press Francés",
                history: [
                    "30x12(1) 30x11(0)",
                    "35x10(1) 35x9(0)",
                    "35x11(1) 35x10(0)"
                ],
                notes: "2 series.",
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Extensión de tríceps en polea",
                history: [
                    "20x15(1) 20x14(1) 20x14(0)",
                    "25x12(1) 25x12(1) 25x11(0)",
                    "25x13(1) 25x12(1) 25x12(0)"
                ],
                notes: "3 series.",
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Curl Banco Scott Unilateral",
                history: [
                    "15x12(1) 15x11(1) 15x10(0)",
                    "17.5x10(1) 17.5x9(1) 17.5x9(0)",
                    "17.5x11(1) 17.5x10(1) 17.5x9(0)"
                ],
                notes: "3 series.",
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Martillo en polea",
                history: [
                    "25x12(1) 25x11(0)",
                    "30x10(1) 30x9(0)",
                    "30x11(1) 30x10(0)"
                ],
                notes: "2 series.",
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Elevaciones laterales",
                history: [
                    "12x15(1) 12x14(0)",
                    "14x12(1) 14x12(0)",
                    "14x13(1) 14x12(0)"
                ],
                notes: "2 series.",
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Extensión de cuádriceps",
                history: [
                    "60x15(1) 60x14(1) 60x14(0)",
                    "65x12(1) 65x12(1) 65x11(0)",
                    "65x13(1) 65x12(1) 65x12(0)"
                ],
                notes: "3 series.",
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Sentadilla Péndulo",
                history: [
                    "100x12(1) 100x11(0)",
                    "110x10(1) 110x9(0)",
                    "110x11(1) 110x10(0)"
                ],
                notes: "2 series.",
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Curl Femoral Sentado",
                history: [
                    "50x12(1) 50x11(0)",
                    "55x10(1) 55x9(0)",
                    "55x11(1) 55x10(0)"
                ],
                notes: "2 series.",
                weight: 0, reps: 0, rir: 0
            }
        ]
    }
};

// 2. ESTADO GLOBAL DE LA APLICACIÓN
const state = {
    currentTab: 'screen-entreno',
    currentRoutineKey: null,
    currentExerciseIndex: 0,
    isWorkoutActive: false
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
                ${ex.history.map(row => {
                    const setsArr = row.trim().split(/\s+/);
                    const setsCount = setsArr.length;
                    const sets = setsArr.map(set => `<span class="history-set">${set}</span>`).join('');
                    return `<div class="history-row" style="grid-template-columns: repeat(${setsCount}, 1fr);">${sets}</div>`;
                }).join('')}
            </div>
        `;
        
        // Al tocar un ejercicio abrir Vista Foco
        card.addEventListener('click', () => {
            openExerciseFoco(index);
        });
        
        dom.exerciseListContainer.appendChild(card);
    });
    
    // Sincronizar estado visual del botón Iniciar/Terminar Entreno
    if (state.isWorkoutActive) {
        dom.btnStartWorkout.classList.add('active-workout');
        dom.btnStartWorkout.innerHTML = '<i data-lucide="square"></i><span>Terminar Entreno</span>';
    } else {
        dom.btnStartWorkout.classList.remove('active-workout');
        dom.btnStartWorkout.innerHTML = '<i data-lucide="play"></i><span>Iniciar Entreno</span>';
    }

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
    
    // RIR (Reps in Reserva, Límite mínimo: 0)
    dom.buttons.rirMinus.addEventListener('click', () => {
        let val = parseInt(dom.inputs.rir.value) || 0;
        val = Math.max(0, val - 1);
        dom.inputs.rir.value = val;
        updateStateData();
    });
    dom.buttons.rirPlus.addEventListener('click', () => {
        let val = parseInt(dom.inputs.rir.value) || 0;
        val += 1;
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
            
            // Haptic feedback (Vibración fuerte en dispositivo)
            if (navigator.vibrate) {
                navigator.vibrate([200, 100, 200, 100, 300]);
            }
            
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
    


    // Botón decorativo de tema
    document.getElementById('btn-theme-info').addEventListener('click', () => {
        alert("WARZONE LOG: Estricto Dark Mode activo. Acentos en Morado Eléctrico.");
    });
    
    // Botón Iniciar/Terminar Entreno en Vista General
    dom.btnStartWorkout.addEventListener('click', () => {
        if (!state.isWorkoutActive) {
            state.isWorkoutActive = true;
            dom.btnStartWorkout.classList.add('active-workout');
            dom.btnStartWorkout.innerHTML = '<i data-lucide="square"></i><span>Terminar Entreno</span>';
            alert("¡Entrenamiento iniciado! Toca cualquier ejercicio para ingresar a la Zona de Guerra.");
        } else {
            state.isWorkoutActive = false;
            dom.btnStartWorkout.classList.remove('active-workout');
            dom.btnStartWorkout.innerHTML = '<i data-lucide="play"></i><span>Iniciar Entreno</span>';
            alert("¡Entrenamiento terminado y guardado en la memoria!");
        }
        initIcons();
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
