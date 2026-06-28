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
                history: [],
                notes: "3 series.",
                totalSets: 3,
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Press Inclinado",
                history: [],
                notes: "2 series.",
                totalSets: 2,
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Aperturas en polea sentado",
                history: [],
                notes: "2 series.",
                totalSets: 2,
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Remo en T",
                history: [],
                notes: "3 series.",
                totalSets: 3,
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Jalón Dorsal Plano Frontal",
                history: [],
                notes: "2 series.",
                totalSets: 2,
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Jalón Dorsal Plano Sagital",
                history: [],
                notes: "2 series.",
                totalSets: 2,
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Laterales en polea (Hombro)",
                history: [],
                notes: "2 series.",
                totalSets: 2,
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Hombro Posterior",
                history: [],
                notes: "1 serie.",
                totalSets: 1,
                weight: 0, reps: 0, rir: 0
            }
        ]
    },
    "brazo-pierna-1": {
        title: "Brazo / Pierna 1",
        exercises: [
            {
                name: "Press Francés",
                history: [],
                notes: "2 series.",
                totalSets: 2,
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Extensión de tríceps en polea",
                history: [],
                notes: "3 series.",
                totalSets: 3,
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Curl Banco Scott Unilateral",
                history: [],
                notes: "3 series.",
                totalSets: 3,
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Martillo en polea",
                history: [],
                notes: "2 series.",
                totalSets: 2,
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Elevaciones laterales",
                history: [],
                notes: "2 series.",
                totalSets: 2,
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Extensión de cuádriceps",
                history: [],
                notes: "3 series.",
                totalSets: 3,
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Sentadilla Péndulo",
                history: [],
                notes: "2 series.",
                totalSets: 2,
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Curl Femoral Sentado",
                history: [],
                notes: "2 series.",
                totalSets: 2,
                weight: 0, reps: 0, rir: 0
            }
        ]
    },
    "espalda-pecho": {
        title: "Espalda / Pecho",
        exercises: [
            {
                name: "Remo en T",
                history: [],
                notes: "3 series.",
                totalSets: 3,
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Jalón Dorsal Plano Frontal",
                history: [],
                notes: "2 series.",
                totalSets: 2,
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Jalón Dorsal Plano Sagital",
                history: [],
                notes: "2 series.",
                totalSets: 2,
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Press Horizontal en máquina",
                history: [],
                notes: "2 series.",
                totalSets: 2,
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Press Inclinado",
                history: [],
                notes: "2 series.",
                totalSets: 2,
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Aperturas en polea sentado",
                history: [],
                notes: "2 series.",
                totalSets: 2,
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Laterales en polea (Hombro)",
                history: [],
                notes: "2 series.",
                totalSets: 2,
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Hombro Posterior",
                history: [],
                notes: "1 serie.",
                totalSets: 1,
                weight: 0, reps: 0, rir: 0
            }
        ]
    },
    "brazo-pierna-2": {
        title: "Brazo / Pierna 2",
        exercises: [
            {
                name: "Press Francés",
                history: [],
                notes: "2 series.",
                totalSets: 2,
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Extensión de tríceps en polea",
                history: [],
                notes: "3 series.",
                totalSets: 3,
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Curl Banco Scott Unilateral",
                history: [],
                notes: "3 series.",
                totalSets: 3,
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Martillo en polea",
                history: [],
                notes: "2 series.",
                totalSets: 2,
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Elevaciones laterales",
                history: [],
                notes: "2 series.",
                totalSets: 2,
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Extensión de cuádriceps",
                history: [],
                notes: "3 series.",
                totalSets: 3,
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Sentadilla Péndulo",
                history: [],
                notes: "2 series.",
                totalSets: 2,
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Curl Femoral Sentado",
                history: [],
                notes: "2 series.",
                totalSets: 2,
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
    isWorkoutActive: false,
    currentSet: 1,
    // Estructura: focoData[exerciseIndex] = { notes: '', sets: { 1: {weight, reps, rir}, 2: {}, 3: {} } }
    focoData: {}
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
    
    // Nueva UX Vista Foco
    btnInfoModal: document.getElementById('btn-info-modal'),
    infoModal: document.getElementById('info-modal'),
    btnCloseInfoModal: document.getElementById('btn-close-info-modal'),
    infoModalText: document.getElementById('info-modal-text'),
    btnSets: document.querySelectorAll('.btn-set'),
    inputDailyNotes: document.getElementById('input-daily-notes'),
    
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
        if (screen.id !== 'screen-general' && screen.id !== 'screen-foco' && screen.id !== 'screen-metric-details') {
            screen.classList.remove('active');
        }
    });
    
    // Cerrar métricas detalles si cambiamos de pestaña
    const detailScreen = document.getElementById('screen-metric-details');
    if (detailScreen) detailScreen.classList.remove('active');
    
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
    
    // Determinar ID de sesión en formato DIA_X/RUTINA
    const todayStr = new Date().toISOString().split('T')[0];
    const sessionID = "DIA_" + todayStr.replace(/-/g, '_') + "/" + routineKey.toUpperCase().replace(/-/g, '_');
    
    // Intentar restaurar la sesión activa guardada
    const hasActiveSession = loadActiveSessionState();
    
    if (hasActiveSession && state.currentRoutineKey === routineKey) {
        console.log("Se mantiene la sesión de entrenamiento activa:", state.focoData);
    } else {
        // Al entrar en un Día sin sesión activa para esta rutina, este estado es false por defecto
        state.isWorkoutActive = false;
        
        const saved = localStorage.getItem(sessionID);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (parsed && parsed.completed) {
                    state.focoData = {};
                    console.log("Sesión de hoy ya completada. Iniciando limpio.");
                } else {
                    state.focoData = parsed || {};
                    console.log("Cargada persistencia atómica para:", sessionID, state.focoData);
                }
            } catch (e) {
                console.error("Error al cargar persistencia:", e);
                state.focoData = {};
            }
        } else {
            state.focoData = {};
            console.log("No hay sesión activa para hoy en DB_WORKOUTS. Inicializado limpio.");
        }
    }
    
    // Poblar la lista de ejercicios dinámicamente
    dom.exerciseListContainer.innerHTML = '';
    
    routine.exercises.forEach((ex, index) => {
        const card = document.createElement('div');
        card.className = 'card-exercise';
        const realHistory = getHistoryForExercise(routineKey, index, ex);
        card.innerHTML = `
            <div class="exercise-title-row">
                <span class="exercise-name">${ex.name}</span>
                <i data-lucide="chevron-right" class="arrow-right-icon"></i>
            </div>
            <div class="history-block" style="${realHistory.length === 0 ? 'display:none;' : ''}">
                ${realHistory.map(row => {
                    const setsStr = row.split('|')[0].trim();
                    const setsArr = setsStr.split(/\s+/);
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
    
    // Sincronizar estado visual de los botones Iniciar/Terminar Entreno
    const btnStart = document.getElementById('btn-start-workout');
    const btnEnd = document.getElementById('btn-end-workout');
    if (state.isWorkoutActive) {
        if (btnStart) btnStart.style.display = 'none';
        if (btnEnd) btnEnd.style.display = 'flex';
    } else {
        if (btnStart) btnStart.style.display = 'flex';
        if (btnEnd) btnEnd.style.display = 'none';
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

function updateFocoUIInteractiveState() {
    const isWorkoutActive = state.isWorkoutActive;
    
    // Deshabilitar inputs
    if (dom.inputs && dom.inputs.weight) dom.inputs.weight.disabled = !isWorkoutActive;
    if (dom.inputs && dom.inputs.reps) dom.inputs.reps.disabled = !isWorkoutActive;
    if (dom.inputs && dom.inputs.rir) dom.inputs.rir.disabled = !isWorkoutActive;
    
    // Deshabilitar botones de steppers
    if (dom.buttons) {
        if (dom.buttons.weightMinus) dom.buttons.weightMinus.disabled = !isWorkoutActive;
        if (dom.buttons.weightPlus) dom.buttons.weightPlus.disabled = !isWorkoutActive;
        if (dom.buttons.repsMinus) dom.buttons.repsMinus.disabled = !isWorkoutActive;
        if (dom.buttons.repsPlus) dom.buttons.repsPlus.disabled = !isWorkoutActive;
        if (dom.buttons.rirMinus) dom.buttons.rirMinus.disabled = !isWorkoutActive;
        if (dom.buttons.rirPlus) dom.buttons.rirPlus.disabled = !isWorkoutActive;
    }
    
    // Si no está activo, bloquear contenedor
    const container = document.querySelector('.data-inputs-container');
    if (container) {
        if (!isWorkoutActive) {
            container.style.opacity = '0.5';
            container.style.pointerEvents = 'none';
        } else {
            container.style.opacity = '1';
            container.style.pointerEvents = 'auto';
        }
    }
}

// 8. FUNCIONES DE VISTA FOCO (ZONA DE GUERRA)
function openExerciseFoco(index) {
    const routine = ROUTINE_DATA[state.currentRoutineKey];
    if (!routine || index < 0 || index >= routine.exercises.length) return;
    
    state.currentExerciseIndex = index;
    const exercise = routine.exercises[index];
    const focoKey = `${state.currentRoutineKey}-${index}`;
    
    // Inicializar focoData para este ejercicio si no existe con totalSets dinámicos (iniciar vacíos)
    if (!state.focoData[focoKey]) {
        const sets = {};
        for (let i = 1; i <= exercise.totalSets; i++) {
            sets[i] = { weight: "", reps: "", rir: "" };
        }
        state.focoData[focoKey] = {
            notes: '',
            setupTechnical: dbSetups[exercise.name] || exercise.setupTechnical || exercise.notes || "",
            sets: sets
        };
    }
    
    // Resetear a Serie 1
    state.currentSet = 1;
    
    // Cargar datos en pantalla
    dom.focoExerciseName.textContent = exercise.name;
    dom.focoExerciseIndex.textContent = `Ejercicio ${index + 1} de ${routine.exercises.length}`;
    
    // Cargar Notas Generales y Setup Técnico (Editable Textarea)
    dom.infoModalText.value = state.focoData[focoKey].setupTechnical;
    dom.inputDailyNotes.value = state.focoData[focoKey].notes;
    
    // Deshabilitar/Habilitar inputs según el estado del entrenamiento
    updateFocoUIInteractiveState();
    
    // Cargar Historial Reciente (los últimos 3 entrenamientos)
    const historyList = document.getElementById('foco-history-list');
    if (historyList) {
        historyList.innerHTML = '';
        const rawHistory = getHistoryForExercise(state.currentRoutineKey, index, exercise);
        const last3 = rawHistory.slice(-3).reverse();
        
        // Generar etiquetas de fecha de forma representativa (Hoy/Previo, Hace 7 días, Hace 14 días...)
        const relativeDates = ["Hoy (Previo)", "Hace 7 días", "Hace 14 días"];
        
        if (last3.length === 0) {
            historyList.innerHTML = `<div style="color: #666; font-size: 13px; font-style: italic; padding: 4px 0;">No hay historial registrado.</div>`;
        } else {
            last3.forEach((sessionStr, idx) => {
                const parts = sessionStr.split('|');
                const setsStr = parts[0].trim();
                const noteText = parts[1] ? parts[1].trim() : '';
                
                const setsArr = setsStr.split(/\s+/);
                
                const itemDiv = document.createElement('div');
                itemDiv.className = 'history-item-foco';
                
                // Fila principal
                const mainRow = document.createElement('div');
                mainRow.className = 'history-row-main';
                
                // Fecha y campanita
                const dateWrapper = document.createElement('div');
                dateWrapper.className = 'history-date-wrapper';
                
                const dateSpan = document.createElement('span');
                dateSpan.className = 'history-date';
                dateSpan.textContent = relativeDates[idx] || "Sesión Pasada";
                dateWrapper.appendChild(dateSpan);
                
                if (noteText) {
                    const bellBtn = document.createElement('button');
                    bellBtn.className = 'history-bell-btn';
                    bellBtn.innerHTML = `<i data-lucide="bell"></i>`;
                    bellBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const noteDiv = itemDiv.querySelector('.history-note-expanded');
                        noteDiv.classList.toggle('show');
                    });
                    dateWrapper.appendChild(bellBtn);
                }
                mainRow.appendChild(dateWrapper);
                
                // Resumen de series
                const setsSummary = document.createElement('div');
                setsSummary.className = 'history-sets-summary';
                
                setsArr.forEach(setVal => {
                    const pill = document.createElement('span');
                    pill.className = 'history-set-pill';
                    pill.textContent = setVal;
                    setsSummary.appendChild(pill);
                });
                mainRow.appendChild(setsSummary);
                itemDiv.appendChild(mainRow);
                
                // Nota desplegable
                if (noteText) {
                    const noteDiv = document.createElement('div');
                    noteDiv.className = 'history-note-expanded';
                    noteDiv.textContent = noteText;
                    itemDiv.appendChild(noteDiv);
                }
                
                historyList.appendChild(itemDiv);
            });
        }
    }
    
    // Renderizado dinámico de selector de series (Set 1, Set 2...)
    const container = document.querySelector('.set-selector-container');
    container.innerHTML = '';
    for (let i = 1; i <= exercise.totalSets; i++) {
        const btn = document.createElement('button');
        btn.className = `btn-set ${i === 1 ? 'active' : ''}`;
        btn.dataset.set = i;
        btn.textContent = `Set ${i}`;
        btn.addEventListener('click', () => {
            // Guardar datos actuales de la serie antes de cambiar
            updateStateData();
            
            // Cambiar serie activa
            state.currentSet = i;
            
            // Actualizar UI de botones
            container.querySelectorAll('.btn-set').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Cargar datos de la nueva serie
            const exerciseData = state.focoData[focoKey];
            const currentSetData = exerciseData.sets[i];
            dom.inputs.weight.value = currentSetData.weight;
            dom.inputs.reps.value = currentSetData.reps;
            dom.inputs.rir.value = currentSetData.rir;
        });
        container.appendChild(btn);
    }
    
    // Asignar inputs desde la serie 1
    const currentSetData = state.focoData[focoKey].sets[1];
    dom.inputs.weight.value = currentSetData.weight;
    dom.inputs.reps.value = currentSetData.reps;
    dom.inputs.rir.value = currentSetData.rir;
    
    // Resetear/detener cronómetro si cambia el ejercicio
    resetTimer();
    
    // Mostrar pantalla foco
    dom.screens.foco.className = 'screen active screen-foco'; // Limpiar clases de animación previas
    
    initIcons();
}

function closeExerciseFoco() {
    dom.screens.foco.classList.remove('active');
    resetTimer();
    flushSaveWorkout();
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
        let val = dom.inputs.rir.value.trim().toUpperCase();
        if (val === 'F') {
            // Ya está en Fallo
        } else if (val === '0' || val === '' || parseInt(val) === 0) {
            dom.inputs.rir.value = 'F';
        } else {
            let num = parseInt(val) || 0;
            dom.inputs.rir.value = Math.max(0, num - 1);
        }
        updateStateData();
    });
    dom.buttons.rirPlus.addEventListener('click', () => {
        let val = dom.inputs.rir.value.trim().toUpperCase();
        if (val === 'F') {
            dom.inputs.rir.value = '0';
        } else {
            let num = parseInt(val) || 0;
            dom.inputs.rir.value = num + 1;
        }
        updateStateData();
    });
    
    // Escuchar cambios directos en los inputs
    Object.values(dom.inputs).forEach(input => {
        input.addEventListener('input', () => {
            if (input.id === 'input-rir') {
                let val = input.value.trim().toUpperCase();
                if (val !== 'F') {
                    let num = parseInt(val) || 0;
                    if (num < 0) input.value = 0;
                }
            } else {
                let val = parseFloat(input.value) || 0;
                if (val < 0) input.value = 0;
            }
            updateStateData();
        });

        input.addEventListener('change', () => {
            if (input.id === 'input-rir') {
                let val = input.value.trim().toUpperCase();
                if (val === 'F') {
                    input.value = 'F';
                } else {
                    let num = parseInt(val) || 0;
                    input.value = Math.max(0, Math.min(5, num));
                }
            } else {
                let val = parseFloat(input.value) || 0;
                if (val < 0) input.value = 0;
            }
            updateStateData();
        });
        
        input.addEventListener('focus', () => {
            if (input.value === "0" || parseFloat(input.value) === 0) {
                input.value = '';
            } else {
                input.select();
            }
        });
        
        input.addEventListener('blur', () => {
            if (input.value.trim() === '') {
                input.value = "0";
            }
            updateStateData();
            flushSaveWorkout();
        });
    });
}

// Sincronizar inputs manuales con el estado mock y persistir localmente
function updateStateData() {
    if (!state.isWorkoutActive) return; // Evitar cambios si no está activo
    const focoKey = `${state.currentRoutineKey}-${state.currentExerciseIndex}`;
    const exerciseData = state.focoData[focoKey];
    if (!exerciseData) return;
    
    const set = state.currentSet;
    const wVal = dom.inputs.weight.value.trim();
    const rVal = dom.inputs.reps.value.trim();
    const rirVal = dom.inputs.rir.value.trim().toUpperCase();
    
    exerciseData.sets[set].weight = wVal === "" ? "" : (parseFloat(wVal) || 0);
    exerciseData.sets[set].reps = rVal === "" ? "" : (parseInt(rVal) || 0);
    
    if (rirVal === 'F') {
        exerciseData.sets[set].rir = 'F';
    } else {
        exerciseData.sets[set].rir = rirVal === "" ? "" : (parseInt(rirVal) || 0);
    }
    saveWorkout();
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
    }
}

// Soporte de atajos de teclado para facilitar pruebas de desarrollo
function setupKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
        // Solo actuar si la pantalla Foco está visible
        if (dom.screens.foco.classList.contains('active')) {
            if (e.key === 'Escape' || e.key === 'ArrowRight') {
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
    
    // Nueva UX Vista Foco: Abrir/Cerrar Modal de Info
    dom.btnInfoModal.addEventListener('click', () => {
        dom.infoModal.classList.add('show');
    });
    
    dom.btnCloseInfoModal.addEventListener('click', () => {
        dom.infoModal.classList.remove('show');
    });
    
    // Nueva UX Vista Foco: Guardar Notas Diarias (Notas Generales)
    dom.inputDailyNotes.addEventListener('input', (e) => {
        const focoKey = `${state.currentRoutineKey}-${state.currentExerciseIndex}`;
        const exerciseData = state.focoData[focoKey];
        if (exerciseData) {
            exerciseData.notes = e.target.value;
            saveWorkout();
        }
    });

    // Nueva UX Vista Foco: Guardar Setup Técnico Editable
    dom.infoModalText.addEventListener('input', (e) => {
        const focoKey = `${state.currentRoutineKey}-${state.currentExerciseIndex}`;
        const exerciseData = state.focoData[focoKey];
        if (exerciseData) {
            exerciseData.setupTechnical = e.target.value;
            
            // Guardar en DB_SETUPS diccionario global
            const routine = ROUTINE_DATA[state.currentRoutineKey];
            if (routine && routine.exercises[state.currentExerciseIndex]) {
                const exName = routine.exercises[state.currentExerciseIndex].name;
                dbSetups[exName] = e.target.value;
                localStorage.setItem('DB_SETUPS', JSON.stringify(dbSetups));
                
                // Notificar al puente AsyncStorage nativo
                if (window.ReactNativeWebView) {
                    window.ReactNativeWebView.postMessage(JSON.stringify({
                        action: 'save',
                        key: 'DB_SETUPS',
                        value: JSON.stringify(dbSetups)
                    }));
                }
            }
            saveWorkout();
        }
    });

    // Botón Sincronizar Google Sheets Manual Premium
    const btnSyncSheets = document.getElementById('btn-sync-sheets-manual');
    if (btnSyncSheets) {
        btnSyncSheets.addEventListener('click', () => {
            syncToGoogleSheets();
        });
    }
    


    // Botón decorativo de tema
    const btnThemeInfo = document.getElementById('btn-theme-info');
    if (btnThemeInfo) {
        btnThemeInfo.addEventListener('click', () => {
            alert("WARZONE LOG: Estricto Dark Mode activo. Acentos en Morado Eléctrico.");
        });
    }
    
    // Botón Iniciar Entreno en Vista General
    const btnStart = document.getElementById('btn-start-workout');
    const btnEnd = document.getElementById('btn-end-workout');
    
    if (btnStart) {
        btnStart.addEventListener('click', () => {
            state.isWorkoutActive = true;
            if (btnStart) btnStart.style.display = 'none';
            if (btnEnd) btnEnd.style.display = 'flex';
            alert("¡Entrenamiento iniciado! Toca cualquier ejercicio para ingresar a la Zona de Guerra.");
            saveActiveSessionState();
            initIcons();
        });
    }
    
    if (btnEnd) {
        btnEnd.addEventListener('click', () => {
            const routineKey = state.currentRoutineKey;
            
            // Guardar en el array de la base de datos local (APPEND)
            const savedDb = localStorage.getItem('DB_WORKOUTS_' + routineKey);
            let historyArray = [];
            if (savedDb) {
                try {
                    historyArray = JSON.parse(savedDb);
                    if (!Array.isArray(historyArray)) historyArray = [];
                } catch (e) {
                    historyArray = [];
                }
            }
            
            const newSession = {
                date: new Date().toISOString().split('T')[0],
                completed: true,
                focoData: state.focoData,
                syncPending: true
            };
            
            historyArray.push(newSession);
            const updatedDbStr = JSON.stringify(historyArray);
            localStorage.setItem('DB_WORKOUTS_' + routineKey, updatedDbStr);
            
            if (window.ReactNativeWebView) {
                window.ReactNativeWebView.postMessage(JSON.stringify({
                    action: 'save',
                    key: 'DB_WORKOUTS_' + routineKey,
                    value: updatedDbStr
                }));
            }
            
            // Eliminar de active session
            localStorage.removeItem('CURRENT_ACTIVE_SESSION');
            if (window.ReactNativeWebView) {
                window.ReactNativeWebView.postMessage(JSON.stringify({
                    action: 'delete',
                    key: 'CURRENT_ACTIVE_SESSION'
                }));
            }
            
            alert("Entreno finalizado y guardado");
            
            // Limpiar estado
            state.focoData = {};
            state.isWorkoutActive = false;
            
            // Resetear botones en la UI
            if (btnStart) btnStart.style.display = 'flex';
            if (btnEnd) btnEnd.style.display = 'none';
            
            // Resetear inputs en la UI
            dom.inputs.weight.value = "";
            dom.inputs.reps.value = "";
            dom.inputs.rir.value = "";
            
            initIcons();
        });
    }

    // Rutinas en Métricas
    document.querySelectorAll('.btn-metric-routine').forEach(btn => {
        btn.addEventListener('click', () => {
            const routineKey = btn.dataset.routine;
            openMetricDetails(routineKey);
        });
    });
    
    // Back from metrics details
    const btnBackToMetrics = document.getElementById('btn-back-to-metrics');
    if (btnBackToMetrics) {
        btnBackToMetrics.addEventListener('click', () => {
            document.getElementById('screen-metric-details').classList.remove('active');
        });
    }
    
    // Import Backup click
    const btnImportBackup = document.getElementById('btn-import-backup');
    if (btnImportBackup) {
        btnImportBackup.addEventListener('click', () => {
            alert("Función de Importación de Backup (UI preparada).");
        });
    }
    
    // Close edit log modal
    const btnCloseEditModal = document.getElementById('btn-close-edit-modal');
    if (btnCloseEditModal) {
        btnCloseEditModal.addEventListener('click', () => {
            document.getElementById('edit-log-modal').classList.remove('show');
        });
    }
    
    // Save edit log
    const btnSaveEditLog = document.getElementById('btn-save-edit-log');
    if (btnSaveEditLog) {
        btnSaveEditLog.addEventListener('click', () => {
            const routineKey = state.activeEditRoutineKey;
            const sessionIndex = state.activeEditSessionIndex;
            const focoKey = state.activeEditFocoKey;
            const exerciseMeta = state.activeEditExerciseMeta;
            
            if (!routineKey || sessionIndex === undefined || !focoKey) return;
            
            const saved = localStorage.getItem('DB_WORKOUTS_' + routineKey);
            if (!saved) return;
            
            const array = JSON.parse(saved);
            const sessionData = array[sessionIndex];
            if (!sessionData) return;
            
            if (!sessionData.focoData) sessionData.focoData = {};
            if (!sessionData.focoData[focoKey]) {
                sessionData.focoData[focoKey] = { sets: {} };
            }
            
            const exerciseData = sessionData.focoData[focoKey];
            
            // Leer valores de los inputs
            const weightInputs = document.querySelectorAll('.edit-input-weight');
            const repsInputs = document.querySelectorAll('.edit-input-reps');
            const rirInputs = document.querySelectorAll('.edit-input-rir');
            
            weightInputs.forEach(input => {
                const s = input.dataset.set;
                const val = input.value.trim();
                if (!exerciseData.sets[s]) exerciseData.sets[s] = {};
                exerciseData.sets[s].weight = val === "" ? "" : (parseFloat(val) || 0);
            });
            
            repsInputs.forEach(input => {
                const s = input.dataset.set;
                const val = input.value.trim();
                if (!exerciseData.sets[s]) exerciseData.sets[s] = {};
                exerciseData.sets[s].reps = val === "" ? "" : (parseInt(val) || 0);
            });
            
            rirInputs.forEach(input => {
                const s = input.dataset.set;
                const val = input.value.trim().toUpperCase();
                if (!exerciseData.sets[s]) exerciseData.sets[s] = {};
                if (val === 'F') {
                    exerciseData.sets[s].rir = 'F';
                } else {
                    exerciseData.sets[s].rir = val === "" ? "" : (parseInt(val) || 0);
                }
            });
            
            // Marcar para volver a sincronizar
            sessionData.syncPending = true;
            
            const updatedStr = JSON.stringify(array);
            localStorage.setItem('DB_WORKOUTS_' + routineKey, updatedStr);
            
            // WebView Post
            if (window.ReactNativeWebView) {
                window.ReactNativeWebView.postMessage(JSON.stringify({
                    action: 'save',
                    key: 'DB_WORKOUTS_' + routineKey,
                    value: updatedStr
                }));
            }
            
            // Cerrar modal
            document.getElementById('edit-log-modal').classList.remove('show');
            
            // Recargar Metrics Details
            openMetricDetails(routineKey);
        });
    }
}

// 13. BOOTSTRAP DE LA APLICACIÓN
function init() {
    // Purga de desarrollo una sola vez para base de datos limpia
    const hasCleared = localStorage.getItem('DEV_CLEARED_ONCE');
    if (!hasCleared) {
        localStorage.clear();
        localStorage.setItem('DEV_CLEARED_ONCE', 'true');
        console.log("LocalStorage purgado para desarrollo.");
    }

    bindEvents();
    setupSteppers();
    setupTimer();
    setupGestures();
    setupKeyboardShortcuts();
    loadSetups();
    loadActiveSessionState();
    initIcons();
    console.log("WARZONE STRENGTH LOG - Frontend cargado con éxito.");
}

// 14. SISTEMA DE PERSISTENCIA LOCAL Y SINCRONIZACIÓN DE GOOGLE SHEETS
let dbSetups = {};

function loadSetups() {
    const saved = localStorage.getItem('DB_SETUPS');
    if (saved) {
        try {
            dbSetups = JSON.parse(saved);
            console.log("WARZONE: Cargados setups técnicos:", dbSetups);
        } catch (e) {
            console.error("WARZONE: Error al cargar setups:", e);
            dbSetups = {};
        }
    }
}

let saveTimeout = null;
function saveWorkout() {
    if (!state.currentRoutineKey) return;
    
    // Marcar en memoria de inmediato
    state.focoData.syncPending = true;
    
    // Debounce de guardado físico (500ms)
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
        flushSaveWorkout();
    }, 500);
}

function flushSaveWorkout() {
    if (!state.currentRoutineKey) return;
    clearTimeout(saveTimeout);
    const todayStr = new Date().toISOString().split('T')[0];
    const sessionID = "DIA_" + todayStr.replace(/-/g, '_') + "/" + state.currentRoutineKey.toUpperCase().replace(/-/g, '_');
    
    const dataStr = JSON.stringify(state.focoData);
    localStorage.setItem(sessionID, dataStr);
    console.log("WARZONE: Guardada persistencia física (flushed/debounced):", sessionID);
    
    if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify({
            action: 'save',
            key: sessionID,
            value: dataStr
        }));
    }
    
    if (state.isWorkoutActive) {
        saveActiveSessionState();
    }
}

function getAllSessionKeys() {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("DIA_")) {
            keys.push(key);
        }
    }
    return keys;
}

function getHorizontalRowForSession(dateStr, routineKey, workoutData) {
    const routine = ROUTINE_DATA[routineKey];
    if (!routine) return [dateStr, routineKey];
    
    const row = [dateStr, routine.title];
    routine.exercises.forEach((exercise, idx) => {
        const focoKey = `${routineKey}-${idx}`;
        const exerciseData = workoutData[focoKey];
        
        for (let s = 1; s <= exercise.totalSets; s++) {
            if (exerciseData && exerciseData.sets[s]) {
                const setData = exerciseData.sets[s];
                row.push(setData.weight !== undefined ? setData.weight : "");
                row.push(setData.reps !== undefined ? setData.reps : "");
                row.push(setData.rir !== undefined ? setData.rir : "");
            } else {
                row.push("", "", "");
            }
        }
        row.push(exerciseData ? (exerciseData.notes || "") : "");
    });
    return row;
}

async function syncToGoogleSheets() {
    const btnSync = document.getElementById('btn-sync-sheets-manual');
    if (btnSync) {
        btnSync.classList.add('loading');
        btnSync.innerHTML = '<div class="spinner"></div>';
    }
    
    const sessionKeys = getAllSessionKeys();
    const dataToSync = [];
    const keysToUpdate = [];
    
    sessionKeys.forEach(key => {
        const saved = localStorage.getItem(key);
        if (saved) {
            try {
                const sessionData = JSON.parse(saved);
                if (sessionData.syncPending) {
                    const parts = key.split('/');
                    const dateStr = parts[0].replace("DIA_", "").replace(/_/g, "-");
                    const routineKey = parts[1].toLowerCase().replace(/_/g, "-");
                    
                    const row = getHorizontalRowForSession(dateStr, routineKey, sessionData);
                    dataToSync.push(row);
                    keysToUpdate.push({ key, data: sessionData });
                }
            } catch (e) {
                console.error("Error parsing key during sync:", key, e);
            }
        }
    });
    
    if (dataToSync.length === 0) {
        restoreSyncButton('success');
        return;
    }
    
    console.log("WARZONE: Sincronizando entrenamientos con Google Sheets:", dataToSync);
    
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbxoKN58eAj0bFaBJ_jZaqsjFdH5GZbR5aMNf4r8mAghHiwWvSlFl097MCGbVJVrwydp/exec', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSync)
        });
        
        // Google Apps Script a veces devuelve CORS redirects, pero con no-cors o si se completa,
        // cambiamos el estado de syncPending. Asumimos éxito si la petición POST finaliza.
        keysToUpdate.forEach(item => {
            item.data.syncPending = false;
            const updatedStr = JSON.stringify(item.data);
            localStorage.setItem(item.key, updatedStr);
            if (window.ReactNativeWebView) {
                window.ReactNativeWebView.postMessage(JSON.stringify({
                    action: 'save',
                    key: item.key,
                    value: updatedStr
                }));
            }
        });
        
        restoreSyncButton('success');
    } catch (e) {
        console.error("Sync fetch error:", e);
        restoreSyncButton('error');
    }
}

function restoreSyncButton(status) {
    const btnSync = document.getElementById('btn-sync-sheets-manual');
    if (btnSync) {
        btnSync.classList.remove('loading');
        btnSync.innerHTML = '<i data-lucide="refresh-cw"></i>';
        initIcons();
        
        if (status === 'success') {
            btnSync.classList.add('success');
            btnSync.classList.remove('error');
            setTimeout(() => {
                btnSync.classList.remove('success');
            }, 2000);
        } else if (status === 'error') {
            btnSync.classList.add('error');
            btnSync.classList.remove('success');
            setTimeout(() => {
                btnSync.classList.remove('error');
            }, 2000);
        }
    }
}

// Arrancar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);

// 15. MÉTRICAS LOGS Y HISTORIAL DETALLADO
function openMetricDetails(routineKey) {
    const routine = ROUTINE_DATA[routineKey];
    if (!routine) return;
    
    document.getElementById('metric-detail-title').textContent = routine.title;
    
    const container = document.getElementById('metric-log-container');
    container.innerHTML = '';
    
    const completedSessions = getSessionsForRoutine(routineKey);
    const N = completedSessions.length;
    
    const mappedSessions = completedSessions.map((session, index) => {
        return {
            ...session,
            label: `DIA${index + 1}`,
            isActive: false,
            sessionIndex: index
        };
    });
    
    if (state.isWorkoutActive && state.currentRoutineKey === routineKey) {
        mappedSessions.push({
            label: `DIA${N + 1}`,
            isActive: true,
            focoData: state.focoData
        });
    }
    
    routine.exercises.forEach((exercise, exerciseIdx) => {
        const exSection = document.createElement('div');
        exSection.className = 'metric-exercise-section';
        exSection.style = "margin-bottom: 24px; border-bottom: 1px dashed var(--border-subtle); padding-bottom: 16px;";
        
        const header = document.createElement('h3');
        header.style = "font-family: var(--font-heading); font-size: 15px; font-weight: 800; text-transform: uppercase; color: var(--accent-purple-bright); margin-bottom: 10px;";
        header.textContent = exercise.name.toUpperCase();
        exSection.appendChild(header);
        
        let hasLogs = false;
        
        mappedSessions.forEach(session => {
            const focoKey = `dots;${routineKey}-dots;${exerciseIdx}`.replace(/\dots;/g, '');
            const workoutData = session.isActive ? state.focoData : session.focoData;
            const exerciseData = workoutData ? workoutData[focoKey] : null;
            const setsStr = formatSetsString(exerciseData, exercise);
            
            if (setsStr) {
                hasLogs = true;
                const logLine = document.createElement('button');
                logLine.className = 'metric-log-line-btn';
                
                const color = session.isActive ? '#FF3333' : 'var(--text-primary)';
                logLine.style = `background: none; border: none; padding: 4px 0; width: 100%; text-align: left; display: block; font-family: monospace; font-size: 13px; color: dots;${color}dots;; cursor: pointer;`.replace(/\dots;/g, '');
                
                const labelColor = session.isActive ? '#FF3333' : 'var(--text-secondary)';
                logLine.innerHTML = `<span style="color: dots;${labelColor}dots;; margin-right: 8px;">dots;${session.label}dots;:</span> dots;dots;${setsStr}dots;dots;`.replace(/\dots;/g, '');
                
                // Al tocar, abrir el modal de edición
                if (!session.isActive) {
                    logLine.addEventListener('click', () => {
                        openEditLogModal(routineKey, session.sessionIndex, exerciseIdx, exercise);
                    });
                } else {
                    logLine.addEventListener('click', () => {
                        switchTab('screen-entreno');
                        openRoutineGeneral(routineKey);
                        openExerciseFoco(exerciseIdx);
                    });
                }
                
                exSection.appendChild(logLine);
            }
        });
        
        if (!hasLogs) {
            const noLogs = document.createElement('div');
            noLogs.style = "font-size: 12px; color: var(--text-muted); font-style: italic;";
            noLogs.textContent = "Sin registros.";
            exSection.appendChild(noLogs);
        }
        
        container.appendChild(exSection);
    });
    
    document.getElementById('screen-metric-details').classList.add('active');
}

function getSessionsForRoutine(routineKey) {
    const saved = localStorage.getItem('DB_WORKOUTS_' + routineKey);
    if (saved) {
        try {
            const array = JSON.parse(saved);
            if (Array.isArray(array)) {
                return array;
            }
        } catch (e) {
            console.error("Error parsing DB_WORKOUTS for routine", routineKey, e);
        }
    }
    return [];
}

function formatSetsString(exerciseData, exerciseMeta) {
    if (!exerciseData || !exerciseData.sets) return "";
    
    const setsParts = [];
    for (let s = 1; s <= exerciseMeta.totalSets; s++) {
        const set = exerciseData.sets[s];
        if (set && (set.weight !== "" || set.reps !== "" || set.rir !== "")) {
            const weight = set.weight !== "" ? set.weight : "0";
            const reps = set.reps !== "" ? set.reps : "0";
            let rir = set.rir !== undefined ? set.rir : "0";
            if (rir === 'F') {
                rir = 'F';
            }
            setsParts.push(`${weight}X${reps}(${rir})`);
        }
    }
    return setsParts.join(" / ");
}

function openEditLogModal(routineKey, sessionIndex, exerciseIdx, exerciseMeta) {
    const saved = localStorage.getItem('DB_WORKOUTS_' + routineKey);
    if (!saved) return;
    
    const array = JSON.parse(saved);
    const sessionData = array[sessionIndex];
    if (!sessionData) return;
    
    const focoKey = `${routineKey}-${exerciseIdx}`;
    if (!sessionData.focoData) sessionData.focoData = {};
    if (!sessionData.focoData[focoKey]) {
        sessionData.focoData[focoKey] = { sets: {} };
    }
    
    const exerciseData = sessionData.focoData[focoKey];
    const container = document.getElementById('edit-log-fields-container');
    container.innerHTML = '';
    
    // Guardar referencias temporales
    state.activeEditRoutineKey = routineKey;
    state.activeEditSessionIndex = sessionIndex;
    state.activeEditFocoKey = focoKey;
    state.activeEditExerciseMeta = exerciseMeta;
    
    const title = document.querySelector('#edit-log-modal .modal-title');
    if (title) title.textContent = `Editar: ${exerciseMeta.name}`;
    
    for (let s = 1; s <= exerciseMeta.totalSets; s++) {
        if (!exerciseData.sets[s]) {
            exerciseData.sets[s] = { weight: "", reps: "", rir: "" };
        }
        const setData = exerciseData.sets[s];
        
        const setRow = document.createElement('div');
        setRow.className = 'edit-set-row';
        setRow.style = "display: flex; gap: 10px; align-items: center; margin-bottom: 12px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px;";
        setRow.innerHTML = `
            <span style="font-weight: bold; width: 50px; font-size: 13px;">Set dots;${s}dots;</span>
            <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                <span style="font-size: 11px; color: var(--text-secondary);">Peso (kg)</span>
                <input type="number" class="edit-input-weight" data-set="dots;${s}dots;" value="dots;${setData.weight !== undefined ? setData.weight : ""}dots;" style="background: #161618; border: 1px solid var(--border-subtle); padding: 8px; border-radius: 6px; color: #fff; width: 100%;">
            </div>
            <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                <span style="font-size: 11px; color: var(--text-secondary);">Repes</span>
                <input type="number" class="edit-input-reps" data-set="dots;${s}dots;" value="dots;${setData.reps !== undefined ? setData.reps : ""}dots;" style="background: #161618; border: 1px solid var(--border-subtle); padding: 8px; border-radius: 6px; color: #fff; width: 100%;">
            </div>
            <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                <span style="font-size: 11px; color: var(--text-secondary);">RIR</span>
                <input type="text" class="edit-input-rir" data-set="dots;${s}dots;" value="dots;${setData.rir !== undefined ? setData.rir : ""}dots;" style="background: #161618; border: 1px solid var(--border-subtle); padding: 8px; border-radius: 6px; color: #fff; width: 100%;">
            </div>
        `.replace(/\dots;/g, '');
        container.appendChild(setRow);
    }
    
    document.getElementById('edit-log-modal').classList.add('show');
}

function saveActiveSessionState() {
    const sessionObj = {
        isWorkoutActive: state.isWorkoutActive,
        routineKey: state.currentRoutineKey,
        focoData: state.focoData
    };
    const dataStr = JSON.stringify(sessionObj);
    localStorage.setItem('CURRENT_ACTIVE_SESSION', dataStr);
    
    if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify({
            action: 'save',
            key: 'CURRENT_ACTIVE_SESSION',
            value: dataStr
        }));
    }
}

function loadActiveSessionState() {
    const saved = localStorage.getItem('CURRENT_ACTIVE_SESSION');
    if (saved) {
        try {
            const sessionObj = JSON.parse(saved);
            if (sessionObj && sessionObj.isWorkoutActive) {
                state.isWorkoutActive = sessionObj.isWorkoutActive;
                state.currentRoutineKey = sessionObj.routineKey;
                state.focoData = sessionObj.focoData;
                return true;
            }
        } catch (e) {
            console.error("Error al restaurar sesión activa:", e);
        }
    }
    return false;
}

function getHistoryForExercise(routineKey, exerciseIdx, exerciseMeta) {
    const completedSessions = getSessionsForRoutine(routineKey);
    const historyStrings = [];
    completedSessions.forEach(session => {
        const focoKey = `${routineKey}-dots;${exerciseIdx}`.replace(/\dots;/g, '');
        const exerciseData = session.focoData ? session.focoData[focoKey] : null;
        if (exerciseData && exerciseData.sets) {
            const setsParts = [];
            for (let s = 1; s <= exerciseMeta.totalSets; s++) {
                const set = exerciseData.sets[s];
                if (set && (set.weight !== "" || set.reps !== "" || set.rir !== "")) {
                    const weight = set.weight !== "" ? set.weight : "0";
                    const reps = set.reps !== "" ? set.reps : "0";
                    let rir = set.rir !== undefined ? set.rir : "0";
                    setsParts.push(`${weight}x${reps}(${rir})`);
                }
            }
            if (setsParts.length > 0) {
                let sessionStr = setsParts.join(" ");
                if (exerciseData.notes) {
                    sessionStr += ` | ${exerciseData.notes}`;
                }
                historyStrings.push(sessionStr);
            }
        }
    });
    return historyStrings;
}
